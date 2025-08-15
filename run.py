from flask import Flask, request, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room
import random
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'segredo!'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
# Estrutura para armazenar salas, jogadores e informações completas
salas = {}
jogadores_globais = {}  # Novo: armazena informações completas dos jogadores

@app.route('/')
def index():
    return render_template('index.html')  # Isso procura em /templates/index.html

@app.route('/tutorial')
def tutorial():
    return render_template('tutorial.html')

@app.route('/configs')
def configs():
    return render_template('configs.html')

@app.route('/jogar')
def jogar():
    return render_template('escolha.html')

@app.route('/fulldeck')
def fulldeck():
    return render_template('fulldeck.html')

@app.route('/arena')
def arena():
    return render_template('arena.html')

#---------------------------------------------------------------------------#
                    # CONEXÃO E DESCONECÃO DOS JOGADORRES
#---------------------------------------------------------------------------#

@socketio.on('conectar')
def handle_conexao(data):
    """Lida com a conexão inicial de um jogador"""
    sala_id = data.get('sala_id', 'default')
    nome_jogador = str(data['nome'])
    sid = request.sid  # ID único da conexão SocketIO
    
    # Cria a sala se não existir
    if sala_id not in salas:
        salas[sala_id] = {
            'jogadores': {},
            'estado_jogo': None,
            'jogador1': None,
            'jogador2': None
        }
    
    # Adiciona jogador à sala
    sala = salas[sala_id]
    
    # Verifica se há espaço na sala (máximo 2 jogadores)
    if len(sala['jogadores']) >= 2:
        emit('erro', {'mensagem': 'Sala cheia!'})
        return
    
    # Atribui o jogador como jogador1 ou jogador2
    if not sala['jogador1']:
        sala['jogador1'] = sid
        papel = 'jogador1'
    else:
        sala['jogador2'] = sid
        papel = 'jogador2'
    
    sala['jogadores'][sid] = {
        'nome': nome_jogador,
        'papel': papel,
        'pronto': False
    }
    
    # Novo: Armazena informações básicas no registro global
    jogadores_globais[sid] = {
        'nome': nome_jogador,
        'sala': sala_id,
        'dados_completos': None  # Será preenchido quando o jogador for criado
    }
    
    join_room(sala_id)
    
    # Notifica o jogador sobre seu papel
    emit('papel_atribuido', {'papel': papel, 'sala_id': sala_id})
    
    # Notifica todos na sala sobre o novo jogador
    emit('jogador_conectado', {
        'jogador': nome_jogador,
        'papel': papel,
        'total_jogadores': len(sala['jogadores'])
    }, room=sala_id)
    
    if len(sala['jogadores']) == 1:
        emit('tela_aguardo', room=sid)
    
    # Se dois jogadores estiverem conectados, inicia o jogo
    if len(sala['jogadores']) == 2:
        emit('jogo_pronto', room=sala_id)

@socketio.on('jogador_criado')
def handle_jogador_criado(data):
    sid = request.sid

    if sid not in jogadores_globais:
        emit('erro', {'mensagem': 'Jogador não encontrado'})
        return

    sala_id = jogadores_globais[sid]['sala']
    sala = salas.get(sala_id)
    if not sala:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    # Armazena os dados completos do jogador atual
    jogadores_globais[sid]['dados_completos'] = data

    # Confirma ao próprio jogador que foi registrado
    emit('jogador_registrado', {
        'nome': data['nome'],
        'papel': sala['jogadores'][sid]['papel']
    })

    # Determina o SID do oponente
    oponente_sid = (
        sala['jogador1'] if sala.get('jogador2') == sid
        else sala['jogador2']
    )

    # Envia os dados do jogador atual para o oponente (se existir)
    # Envia os dados do jogador atual ao oponente
    if oponente_sid and oponente_sid in jogadores_globais:
        papel_atual = sala['jogadores'][sid]['papel']
        emit('oponente_registrado', {
            'jogador': data,
            'papel': papel_atual
        }, room=oponente_sid)

        # 🔁 Envia também os dados do oponente para o jogador atual (caso o oponente já tenha enviado antes)
        dados_oponente = jogadores_globais[oponente_sid].get('dados_completos')
        if dados_oponente:
            papel_oponente = sala['jogadores'][oponente_sid]['papel']
            emit('oponente_registrado', {
                'jogador': dados_oponente,
                'papel': papel_oponente
            }, room=sid)

    # Marca o jogador como pronto
    sala['jogadores'][sid]['pronto'] = True

    # Verifica se os dois jogadores estão prontos
    jogadores = list(sala['jogadores'].values())
    jogadores_prontos = [j for j in jogadores if j.get('pronto')]

    if len(jogadores_prontos) == 2:
        emit('ambos_prontos', room=sala_id)

@socketio.on('disconnect')
def handle_disconnect():
    """Lida com a desconexão de um jogador"""
    sid = request.sid
    
    # Remove do registro global
    if sid in jogadores_globais:
        del jogadores_globais[sid]
    
    # Encontra a sala do jogador
    for sala_id, sala in salas.items():
        if sid in sala['jogadores']:
            jogador = sala['jogadores'][sid]
            
            # Remove o jogador
            del sala['jogadores'][sid]
            
            # Limpa a referência como jogador1 ou jogador2
            if sala['jogador1'] == sid:
                sala['jogador1'] = None
            elif sala['jogador2'] == sid:
                sala['jogador2'] = None
            
            # Notifica os outros jogadores
            emit('jogador_desconectado', {
                'jogador': jogador['nome'],
                'papel': jogador['papel']
            }, room=sala_id)
            
            # Se a sala ficar vazia, remove ela
            if len(sala['jogadores']) == 0:
                del salas[sala_id]
            
            break

#---------------------------------------------------------------#
#                        ROTAs PRINCIPAis                          #  
#---------------------------------------------------------------#
@socketio.on('end-turn')
def handle_end_turn(data):

    sala_id = data.get('sala_id')
    sid = request.sid

    sala = salas.get(sala_id)
    if not sala:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    # Envia o evento para ambos os jogadores — o que iniciou e o que receberá o turno
    for jogador_sid in sala['jogadores']:
        emit('finalizar_turno', room=jogador_sid)

@socketio.on('acumular_ki')
def handle_acumular_ki(data):
    sala_id = data.get('sala_id')
    origem_sid = request.sid  # quem enviou originalmente

    sala = salas.get(sala_id)
    if not sala:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    jogador = data.get('jogador')
    personagem = data.get('personagem')

    print("Acumular Ki recebido de:", jogador.get('nome'))

    for jogador_sid in sala['jogadores']:
        if jogador_sid != origem_sid:
            emit('ki_acumulado', {
                'jogador': jogador,
                'personagem': personagem
            }, room=jogador_sid)
            
@socketio.on('personagem_trocado')
def handle_personagem_trocado(data):
    sala_id = data.get('sala_id')
    origem_sid = request.sid  # quem enviou originalmente

    sala = salas.get(sala_id)
    if not sala:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    jogador = data.get('jogador')
    personagem = data.get('personagem')

    print("Personagem trocado recebido de:", jogador.get('nome'))

    for jogador_sid in sala['jogadores']:
        if jogador_sid != origem_sid:
            emit('trocar_personagem', {
                'jogador': jogador,
                'personagem': personagem
            }, room=jogador_sid)
            
@socketio.on('item_usado')
def handle_item_usado(data):
    sala_id = data.get('sala_id')
    origem = data.get('origem')

    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    item = data.get('item', {})
    efeito = item.get('efeito', {})

    # Envia para todos (menos quem usou) o uso do item
    emit('uso_item', data, room=sala_id, include_self=False)

@socketio.on('carta_movida_para_banco')
def handle_movimentar_para_banco(data):

    sala_id = data.get('sala_id')
    origem = data.get('origem')

    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala inválida'})
        return

    emit('sincronizar_banco', {
        'jogador': data['jogador'],
        'carta': data['carta']
    }, room=sala_id, include_self=False)

@socketio.on('solicitar_substituicao')
def handle_substituicao(data):
    sala_id = data.get('sala_id')
    origem = data.get('origem')

    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    # Envia o evento SOMENTE para quem solicitou
    emit('exibir_modal_substituicao', {
        'jogador': data['jogador'],
        'cartas': data['cartas']
    }, room=origem)

@socketio.on('sincronizar_substituicao')
def handle_sincronizar_substituicao(data):
    sala_id = data.get('sala_id')
    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return
    
    emit('atualizar_carta_ativa', {
        'jogador': data['jogador'],
        'novaCarta': data['novaCarta'],
        'bancoLuta': data['bancoLuta']
    }, room=sala_id, include_self=False)

@socketio.on('transformacao_boo')
def handle_transformacao_boo(data):
    sala_id = data.get('sala_id')
    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    # Envia apenas para o adversário
    emit('boo_transformado', data, room=sala_id, include_self=False)
    
@socketio.on('ataque_realizado')
def handle_ataque_realizado(data):
    sala_id = data.get('sala_id')
    origem = data.get('origem')

    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return
    
    print('Ataque recebido! Sincronizando...')

    # Envia ataque para o adversário apenas
    emit('sincronizar_ataque', data, room=sala_id, include_self=False)
 
@socketio.on('atualizar_mao_trunks')
def handle_atualizar_mao_trunks(data):
    sala_id = data.get('sala_id')
    emit('sincronizar_mao_trunks', data, room=sala_id, include_self=False)

@socketio.on('atualizar_banco')
def handle_atualizar_banco(data):
    sala_id = data.get('sala_id')
    origem = data.get('origem')

    if not sala_id or sala_id not in salas:
        emit('erro', {'mensagem': 'Sala não encontrada'})
        return

    # Envia a atualização do banco para o adversário
    emit('atualizar_banco', data, room=sala_id, include_self=False)

@socketio.on('solicitar_tela_substituicao')
def handle_solicitar_tela_substituicao(data):
    sala_id = data.get('sala_id')
    origem = data.get('origem')
    jogador = data.get('jogador')

    if not sala_id:
        return

    # Envia para todos na sala, exceto quem originou o evento (quem está substituindo)
    emit('abrir_tela_substituicao', {'jogador': jogador}, room=sala_id, include_self=False)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)