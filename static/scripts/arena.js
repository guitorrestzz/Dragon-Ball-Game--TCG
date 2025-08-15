const socket = io();
// Banco de Cartas
const bancoDeCartas = [
  {   // CARTA GOKU INSTINTO SUPERIOR - JOSÉ // 0
    nome: "Goku Instinto Superior",
    vida: 1700,
    vidaMax: 1700,
    ki: 0,
    kiMax: 20000,
    lifeSteal: 0,
    imagem: "/static/assets/1Goku Instinto Superior.jpg",
    ///// debuffs
    atordoamento: false,
    rodadas: 0,
    ///// buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      esquiva: 1, // Primeira esquiva garantida por turno
      nome: "Esquiva Automática",
      descricao: "Goku gasta 1000 de ki para desviar automáticamente do primeiro golpe canalizado contra ele a cada turno (apenas uma vez por turno)"
    },
    golpes: {
      kamehameha: { nome: "Kamehameha", 
                    dano: 400, 
                    custoKi: 4000,
                    descricao:  "Goku canaliza 4000 de ki para desferir uma poderosa onda de energia concentrada que é disparada pelas mãos. Causa 400 pontos de dano"
                  },
      genkidama: { nome: "Genkidama", 
                   dano: 1000,
                   custoKi: 10000, 
                   atordoamento: 1,
                   descricao: "Goku canaliza 10.000 de ki para causar 1000 de dano a carta ativa adversária e atordoamento por 1 turno"
                  }
    }
  },
  { // CARTA GOKU SSJ BLUE - JOSÉ // 1 
    nome: "Goku SSJ Azul",
    vida: 1700,
    vidaMax: 1700,
    ki: 0,
    kiMax: 15000,
    lifeSteal: 0,
    imagem: "/static/assets/2Goku SSJ Blue.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      evolucoes: [
        { forma: "Goku Instinto Superior", turnosNecessarios: 3 },
      ],
      turnosAtivos: 0,
      acumulos: 0,
      nome: "Determinação Saiyajin",
      descricao: "Ao chegar abaixo de 50% da vida, Goku causa 100 de dano aumentado em todos os ataques e se cura em 20% do dano causado"
    },
    golpes: {
      explosaodeki: { nome: "Explosão de Ki Azul", 
                      custoKi: 6000, 
                      dano: 150, 
                      danoAleat: 150,
                      descricao: "Goku canaliza 6000 de ki para causar uma explosão ao guerreiro ativo adversário e uma explosão a um alvo aleatório adversário. Cada explosão causa 200 pontos de dano"
                    },
      kaioken: { nome: "Kaioken", 
                 custoKi: 2500, 
                 buffKi: 1000, 
                 duracao: 5, 
                 dano: 0,
                 descricao: "Goku passa a canalizar 1000 de ki a mais por turno durante 5 turnos (2500 de custo de ki)"
               }
    }
  },
  { // CARTA GOKU SSJ  - JOSÉ // 2
    nome: "Goku SSJ",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/3Goku SSJ.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs  
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    escudo: {
      tipo: "percentual",
      valor: 0.2,
      duracao: 3,
      turnosAtivos: 0
    },
    passiva: {
      evolucoes: [
        { forma: "Goku SSJ Azul", turnosNecessarios: 2 },
        { forma: "Goku Instinto Superior", turnosNecessarios: 3 }
      ],
      turnosAtivos: 0,
      nome: "Força de Vontade",
      descricao: "Ao entrar em combate pela primeira vez, recebe 20% de dano reduzido durante 3 turnos."
    },
    golpes: {
      impactoRelampago: { nome: "Impacto Relampago", 
                          custoKi: 5000, 
                          dano: 50, 
                          golpes: 4,
                          descricao: "Goku canaliza 4 golpes físicos rápidos, causando 50 de dano cada. Custa 5000 de ki"
                        }
    }
  },
  { // CARTA GOKU - JOSÉ 3
    nome: "Goku",
    vida: 1200,
    vidaMax: 1200,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/4Goku.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      evolucoes: [
        { forma: "Goku SSJ", turnosNecessarios: 1 },
        { forma: "Goku SSJ Azul", turnosNecessarios: 2 },
        { forma: "Goku Instinto Superior", turnosNecessarios: 3 }
      ],
      turnosAtivos: 0,
    },
    golpes: {
      espiritoGuerreiro: {
        nome: "Espírito do Guerreiro", 
        custoKi: 6000, 
        dano: 0,
        descricao: "Concede a goku um escudo de 100 pontos de vida por 6000 de custo de ki",
        escudo: {
          tipo: "absorvedor",
          valor: 100,
          permanente: true
        }
      },
      golpesSequenciais: { nome: "Golpes Sequências", 
                           custoKi: 2000, 
                           dano: 25, 
                           golpes: 4,
                           descricao: "Goku desfere uma sequência de 4 golpes contra um adversário, causando 25 de dano cada."
                          }
    }
  },
  {   // CARTA VEGETA ULTRA EGO - JOSÉ // 4
    nome: "Vegeta Ego Superior",
    vida: 2200,
    vidaMax: 2200,
    ki: 0,
    kiMax: 20000,
    lifeSteal: 0,
    imagem: "/static/assets/14Vegeta Ultra Ego.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      acumulos: 0, // Cada golpe sofrido aumenta o dano dos ataques em 100
      trueDamage: true, // Ataques ignoram defesa
      nome: "Aura de Destruição",
      descricao: "A cada dano sofrido por Vegeta, o dano causado em cada ataque de Vegeta aumenta em 50, até um máximo de 1000. Além disso, seus ataques ignoram quaisquer restrições de defesa/escudo."
    },
    golpes: {
      hakai: { nome: "Hakai", 
               dano: 600, 
               custoKi: 7000, 
               repetirDano: true,
               descricao: "Vegeta canaliza 7.000 de ki para causar imediatamente 600 de dano a carta ativa do adversário. Se a carta for eliminada, o dano de todos os ataques aumentam permanentemente em 100."
              },
      explosaoDaIra: { nome: "Explosão da Ira", 
                       dano: 0, 
                       danoArmazenado: 0, 
                       custoKi: 8000, 
                       contagem: 0, 
                       recarga: 5,
                       descricao: "(Só pode ser usado abaixo de 50% da vida) Vegeta causa metade de todo o dano recebido até agora ao adversário. Só pode ser usado a cada 5 rodadas, e custa 8000 de ki."
                      }
    }
  },
  { // CARTA VEGETA SSJ BLUE - [5]
    nome: "Vegeta SSJ Blue",
    vida: 2200,
    vidaMax: 2200,
    ki: 0,
    kiMax: 15000,
    lifeSteal: 0,
    imagem: "/static/assets/15Vegeta SSJ Blue.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      evolucoes: [
        { forma: "Vegeta Ego Superior", turnosNecessarios: 3 }
      ],
      turnosAtivos: 0,
      principeSayajin: true,
      nome: "Principe dos Sayajin",
      descricao: "Vegeta não pode receber nenhum debuff de dano ou efeito negativo (como atordoamento, etc)"
    },
    golpes: {
      finalflashazul: { nome: "Final Flash Azul", 
                        dano: 350, 
                        custoKi: 4500,
                        descricao: "Uma versão aprimorada do Final Flash, carregada com energia divina. causa imediatamente 350 de dano a carta ativa do adversário."
                      },
      golpedoorgulho: { nome: "Golpe do Orgulho", 
                        dano: 250, 
                        custoKi: 5500,
                        descricao: "Vegeta canaliza 5500 de ki para causar 250 de dano + 10% vida total do adversário como dano. (2000 = +200, 3000 = +300...)"
                      }
    }
  },
  { // CARTA MAJIN VEGETA - [6]
    nome: "Majin Vegeta",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/16Majin Vegeta.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Orgulho Saiyajin",
      descricao: "Concede a vegeta um escudo de 500 pontos de vida assim que sua vida cair abaixo de 50%",
      evolucoes: [
        { forma: "Vegeta SSJ Blue", turnosNecessarios: 2 },
        { forma: "Vegeta Ego Superior", turnosNecessarios: 3 }
      ],
      turnosAtivos: 0,
      orgulhoSayajin: false,
      escudo: {
        tipo: "absorvedor",
        valor: 500,
        permanente: true,
      },
    },
    golpes: {
      rajadademoniaca: { nome: "Rajada Demoniaca", 
                         dano: 50,
                         golpes: 3,
                         custoKi: 4000,
                         descricao: "Vegeta causa 3 explosões de ki ao adversário, causando 50 de dano cada."
                        },
      explosaofinal: { nome: "Explosão Final", 
                       dano: 700, 
                       custoKi: 7000,
                       descricao: "Vegeta causa 400 de dano a si mesmo para causar 700 de dano a carta ativa do adversário. Custa 7000 de ki."
                      }
    }
  },
  { // CARTA VEGETA - [7]
    nome: "Vegeta",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 5000,
    lifeSteal: 0,
    imagem: "/static/assets/17Vegeta.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      evolucoes: [
        { forma: "Majin Vegeta", turnosNecessarios: 1 },
        { forma: "Vegeta SSJ Blue", turnosNecessarios: 2 },
        { forma: "Vegeta Ego Superior", turnosNecessarios: 3 }
      ],
      turnosAtivos: 0,
    },
    golpes: {
      socopesado: { nome: "Soco Pesado", 
                    dano: 100, 
                    custoKi: 3000,
                    descricao: "Vegeta canaliza 3000 de ki para desferir um soco a carta ativa do adversário, causando 100 de dano "
                  },
    }
  },
  {    // CARTA CELL - JOSÉ // 8
    nome: "Cell",
    vida: 1800,
    vidaMax: 1800,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/26cell.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "O Ser Perfeito",
      descricao: "Sempre que derrota um inimigo, Cell se regenera 20% em de sua vida máxima e aumenta seu dano em todos os ataques em 50 permanentemente.",
      acumulos: 0, // Aumenta o dano de Cell conforme ele derrota inimigos
      regenerou: false // Evita regeneração múltipla
    },
    golpes: {
      instintoPredador: { nome: "Instinto Predador", 
                          dano: 300, 
                          custoKi: 5000,
                          descricao: "Cell canaliza 5000 de ki para causar 300 de dano a carta ativa do adversário, o dano aumenta em 50 para alvos com menos vida atual do que cell."
                        },
      regeneracaoTotal: { nome: "Regeneração Total", 
                          custoKi: 0, 
                          dano: 0,
                          descricao: "Uma vez que cell chegue abaixo de 50% de vida, pode usar esta habilidade uma única vez para regenerar sua vida completamente, desde que ele esteja vivo."
                        }
    }
  },
  { // CARTA GOKU black ssj rose - JOSÉ // 9
    nome: "Goku Black SSJ Rosê",
    vida: 1800,
    vidaMax: 1800,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/19Goku Black SSJ Rose.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Ira Divina",
      descricao: "Ao eliminar um inimigo, automaticamente carrega o seu ki em 5000 e amplifica o dano causado por ataques em 100",
      acumulos: 0
    },
    golpes: {
      espadadeenergia: { nome: "Espada de Energia Rosê", 
                         dano: 200, 
                         golpes: 2, 
                         custoKi: 5000,
                         descricao: "Goku Black realiza 2 cortes com a sua lâmina rosé, causando 200 de dano cada. Custa 5000 de ki."
                        },
      manipulacaoTempo: { nome: "Manipulação do Tempo", 
                          custoKi: 10000, 
                          dano: 0,
                          descricao: "Retorna Goku Black para a mão com a vida completamente cheia, entretanto, Goku black perderá os acúmulos de dano de “Ira Divina” e ficará inativo por 2 turnos. Custa 10.000 de ki."
                        }
    }
  },
  {  // CARTA GOKU BLACK [10]
    nome: "Goku Black",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/18Goku Black.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Energia Divina",
      descricao: "Goku Black acumula 1000 de ki a mais em seus acúmulos de ki.",
      evolucoes: [
        { forma: "Goku Black SSJ Rosê", turnosNecessarios: 1 }
      ],
      turnosAtivos: 0
    },
    golpes: {
      rosadeenergia: { nome: "Rosa de Energia", 
                       dano: 200, 
                       custoKi: 7500, 
                       atordoamento: 1,
                       descricao: "Goku Black canaliza 7500 de ki para causar 300 de dano e atordoamento por 1 turno a carta ativa do adversário."
                      },
      punicaoceleste: { nome: "Julgamento Celeste", 
                        dano: 0, 
                        custoKi: 5000,
                        descricao: "Goku Black canaliza 5000 de ki para drenar 10% da vida máxima do alvo como dano. Goku Black se cura em 100% do dano causado por este ataque."
                      }
    }
  },
  { // CARTA HITTO - JOSÉ 11
    nome: "Hitto",
    vida: 1500,
    vidaMax: 1500,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/5Hitto.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Salto Temporal",
      descricao: "Hitto sempre ignora quaisquer restrições de defesas ou escudos do adversário. Além disso, Hitto pode realizar uma ação extra por turno (acumular Ki ou atacar).",
      trueDamage: true,
      quebrarLimitador: true
    },
    golpes: {
      jauladoTempo: { nome: "Jaula do Tempo", 
                      custoKi: 4000, 
                      contagem: 0, 
                      recarga: 4, 
                      efeito: "jaulaTempo", 
                      duracao: 1,
                      descricao: "Prende a carta ativa do adversário em uma Jaula do Tempo durante 1 turno. Cartas presas na Jaula do Tempo não podem realizar nenhuma ação. Custa 4000 de ki."
                    },
      assasinatoFurtivo: { nome: "Assasinato Furtivo", 
                           custoKi: 3000, 
                           dano: 250,
                           descricao: "Hitto canaliza 3000 de ki para causar 250 de dano ao guerreiro atingido. (dano aumentado para 400 em alvos abaixo da metade da vida. "
                          }
    }
  },
  { // CARTA BULMA - JOSÉ [12]
    nome: "Bulma",
    vida: 1000,
    vidaMax: 1000,
    ki: 0,
    kiMax: 0,
    lifeSteal: 0,
    imagem: "/static/assets/6Bulma.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    cartasRoboticas: {
      mechaPilaf: {
        nome: "Mecha-Pilaf V2",
        vida: 800,
        vidaMax: 800,
        ki: 0,
        kiMax: 0,
        lifeSteal: 0,
        imagem: "/static/assets/7MechaPilafV2.jpg",
        // debuffs
        atordoamento: false,
        rodadas: 0,
        // buffs
        acumulos: 0,
        danoAument: 0,
        buffKiExtra: 0,
        duracaoKi: 0,
        energia: 5,
        escudo: {
          tipo: "fixo",
          valor: 100,
          permanente: true
        },
        passiva: {
          nome: "Máquina de Combate",
          descricao: "Reduz o dano recebido de todas as fontes em 100. Esta carta fica sem energia e é descartada em 5 rodadas."
        },
        golpes: {
          sobrecargaMech: { nome: "Sobrecarga Mech", 
                            dano: 200, 
                            custoKi: 0,
                            descricao: "Causa 200 de dano a carta ativa do adversário."
                           },
          autoDestruicao: { nome: "Auto-Destruição", 
                            dano: 600, 
                            efeito: "selfdestruction", 
                            custoKi: 0,
                            descricao: "Imediatamente se auto-destroi para causar 600 de dano a carta ativa do adversário"
                           }
        },
      },
      techEye: {
        nome: "Tech Eye",
        tipo: "Item",
        usos: 2,
        imagem: "/static/assets/8techEye.jpg",
        descricao: "Ao entrar em jogo revela a mão do oponente e compra 1 cartas do seu deck. Este item possui 2 usos.",
        efeito: {
          revelarMao: true,
          comprarCartas: 1
        }
      },
      colossusX: {
        nome: "Colossus-X",
        vida: 2000,
        vidaMax: 2000,
        ki: 0,
        kiMax: 0,
        lifeSteal: 0,
        imagem: "/static/assets/9ColossusX.jpg",
        // debuffs
        atordoamento: false,
        rodadas: 0,
        // buffs
        acumulos: 0,
        danoAument: 0,
        buffKiExtra: 0,
        duracaoKi: 0,
        energia: 10,
        escudo: {
          tipo: "absorvedor",
          valor: 600,
          valorMax: 1000,
          permanente: true
        },
        passiva: {
          nome: "Juggernaut",
          descricao: "Possui um escudo de 600 de dano antes que possa sofrer danos. Esta carta fica sem energia e é descartada após 10 rodadas"
        },
        golpes: {
          tremorTectonico: { nome: "Tremor Tectônico", 
                             dano: 75, 
                             atordoamento: 1, 
                             custoKi: 0,
                             descricao: "Imediatamente causa 75 de dano e atordoamento por um turno a carta ativa do adversário."
                             },
          abaloSismico: { nome: "Abalo Sísmico", 
                          dano: 100, 
                          custoKi: 0,
                          descricao: "Causa 100 de dano a carta ativa do adversário e destrói qualquer escudo ativo."
                        }
        }
      }
    },
    passiva: {
      nome: "Inventora Brilhante",
      descricao: "Bulma gera uma “Capsula Hoi Poi” ao início de cada turno, enquanto estiver no campo ativo.",
      capsula: {
        nome: "Capsula Hoi Poi",
        tipo: "Item",
        usos: 1,
        imagem: "/static/assets/10CapHoiPoi.jpg",
        descricao: "Aprimora o dano da carta escolhida em 25 e a sua vida máxima em 50 permanentemente.",
        efeito: {
          buff: {
            vida: 50,
            danoAument: 25
          }
        }
      }
    },
    golpes: {
      criacaoDeMaquinas: { nome: "Criação de Máquinas", 
                           contagem: 0, 
                           recarga: 5, 
                           dano: 0, 
                           custoKi: 0,
                           descricao: "Gera na mão uma carta robótica aleatória. Só pode ser conjurado uma veza a cada 5 turnos"
                          }, 
      geniaDaEngenharia: { nome: "Gênia da Engenharia", 
                           contagem: 0, 
                           recarga: 2, 
                           cura: 300, 
                           dano: 0, 
                           custoKi: 0,
                           descricao: "Uma vez a cada dois turnos, pode restaurar em 300 pontos a vida de uma carta aliada."
                          }
    }
  },
  { // CARTA BROLY - JOSÉ [13]
    nome: "Broly",
    vida: 2200,
    vidaMax: 2200,
    ki: 0,
    kiMax: 20000,
    lifeSteal: 0,
    imagem: "/static/assets/11Broly.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Fúria Evolutiva",
      descricao: "Broly se enfurece enquanto a luta se estende contra o mesmo adversário, causando 50 de dano aumentado a cada rodada no Campo Ativo.",
      alvoAnterior: null,
      iraAcumulada: 0,
    },
    golpes: {
      kiBlast: { nome: "Ki Blast", 
                 dano: 100, 
                 golpes: 3, 
                 custoKi: 5500,
                 descricao: "Broly canaliza 5500 de ki para causar 3 explosões descontroladas de energia ao guerreiro adversário, causando 100 de dano cada. "
                },
      giganticOmega: { nome: "Gigantic Omega", 
                       dano: 250, 
                       danoAleat: 250, 
                       custoKi: 6000,
                       descricao: "Broly canaliza 6000 de ki para causar 250 de dano ao guerreiro ativo adversário. A energia liberada é tão forte que causa o mesmo dano a uma carta aleatória no banco do adversário"
                      },
    }
  },
  { ///// CARTA JIREN - JOSÉ [14]
    nome: "Jiren",
    vida: 2200,
    vidaMax: 2200,
    ki: 0,
    kiMax: 15000,
    lifeSteal: 0,
    imagem: "/static/assets/12Jiren.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Aura Absoluta",
      descricao: "Ao entrar em combate, não permite que o adversário substitua o guerreiro ativo. Além disso, pode realizar uma ação extra por turno (acumular Ki ou atacar).",
      trueDamage: true,
      quebrarLimitador: true,
      desafiante: true
    },
    golpes: {
      golpedeenergia: { nome: "Golpe de Energia Pura", 
                        dano: 200, 
                        custoKi: 4000,
                        descricao: "Jiren canaliza 4000 de ki para desferir um golpe de energia pura ao guerreiro ativo adversário. Causa 200 de dano que ignora defesas e escudos."
                      },
      expansaodepoder: { nome: "Expansão de Poder Máximo", 
                         dano: 0, 
                         buffKi: 500, 
                         buffDano: 200, 
                         custoKi: 0, 
                         contagem: 0, 
                         recarga: 3, 
                         duracao: 3,
                         descricao: "Jiren passa a acumular 1000 de ki a mais por rodada, além disso, seus ataques causam 200 de dano aumentado durante 3 rodadas. Esta habilidade não possui custo, mas só pode ser usada a cada 3 rodadas."
                        }
    }
  },
  { ///// CARTA TRUNKS - JOSÉ [15]
    nome: "Trunks",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 15000,
    lifeSteal: 0,
    imagem: "/static/assets/13Trunks.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "A Esperança Sayajin",
      descricao: "Ao ser eliminado pela primeira vez, retorna a sua mão. Além disso, enquanto estiver abaixo de 50% de vida, causa 50 de dano aumentado de todas as fontes.",
      esperancaSayajin: true,
      acumulos: 0,
    },
    golpes: {
      tempestadedelaminas: { nome: "Tempestade de Lâminas", 
                             dano: 50, 
                             golpes: 4, 
                             custoKi: 4000,
                             descricao: "Trunks canaliza 4000 de ki para realizar uma sequência de 4 golpes com a espada, causando 50 de dano cada"
                            },
      finalflash: { nome: "Galick Gun", 
                    dano: 400, 
                    custoKi: 6000,
                    descricao: "Trunks canaliza 6000 de ki para causar imediatamente 400 de dano a carta ativa do adversário"
                  }
    }
  },
  { // CARTA CHI CHI - JOSÉ [16]
    nome: "Chi Chi",
    vida: 1000,
    vidaMax: 1000,
    ki: 0,
    kiMax: 0,
    lifeSteal: 0,
    imagem: "/static/assets/20Chi Chi.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    cartasAlimentos: {
      sopadearroz: {
        nome: "Sopa de Arroz",
        tipo: "Item",
        usos: 1,
        imagem: "/static/assets/21.01 Sopa de Arroz.jpg",
        descricao: "Aumenta em 300 pontos a vida máxima da carta no Campo Ativo.",
        efeito: {
          buff: {
            vida: 300
          }
        },
      },
      carneassada: {
        nome: "Carne Assada",
        tipo: "Item",
        usos: 1,
        imagem: "/static/assets/21.2Carne Assada.jpg",
        descricao: "Concede a carta no Campo Ativo 50 de dano adicional de todas as fontes durante 5 rodadas.",
        efeito: {
          aprimoramentoTemporario: {
            danoAument: 50,
            duracao: 5
          }
        },
      },
      ramen: {
        nome: "Ramen",
        tipo: "Item",
        usos: 1,
        imagem: "/static/assets/ramen.png",
        descricao: "Concede a carta escolhida imunidade a efeitos negativos permanentemente.",
        efeito: {
          buff: {
            imunidade: true
          }
        },
      }
    },
    passiva: {
      nome: "Vigilância da Mãe",
      descricao: "Chi Chi pode usar suas habilidades enquanto estiver no banco, entretanto, ainda gastará um ataque do turno.",
    },
    golpes: {
      refeicaodeemergencia: { nome: "Refeição de Emergência", 
                              contagem: 0, 
                              recarga: 3, 
                              dano: 0, 
                              custoKi: 0,
                              descricao: "Chi Chi gera um item do tipo “alimento” aleatório. Fica em recarga durante 3 rodadas."
                            },
      fortalezadedeterminacao: { nome: "Fortaleza de Determinação", 
                                 contagem: 0, 
                                 recarga: 5, 
                                 dano: 0, 
                                 custoKi: 0,
                                 descricao: "Chi Chi concede um escudo de 500 pontos de vida ao aliado no campo ativo, enquanto o escudo estiver ativo, o aliado causará 50 de dano adicional de todas as fontes. Fica em recarga durante 5 turnos."
                                }
    }
  },
  { // FREEZA DOURADO - JOSÉ [17]
    nome: "Freeza Dourado",
    vida: 1300,
    vidaMax: 1300,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/24freeza_dourado.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "O Imperador do Universo",
      descricao: "O dano causado por Freeza aumenta em 10% para cada adversário restante na arena do oponente.",
      trueDamage: true
    },
    golpes: {
      esmagandoinsetos: { nome: "Esmagando Insetos", 
                          dano: 200, 
                          custoKi: 6000,
                          descricao: "Freeza canaliza 6000 de ki para causar 200 de dano que ignora escudos/defesas (O dano aumenta para 400 em alvos abaixo de 50% de vida)." 
                        },
      juizoimperial: { nome: "Juízo Imperial", 
                       dano: 0, 
                       custoKi: 0, 
                       contagem: 0, 
                       recarga: 5, 
                       duracao: 3,
                       descricao: "Freeza passa a se curar em 50% do dano causado durante 3 turnos. (fica em recarga durante 5 turnos)."
                      }
    }
  },
  { // FREEZA - JOSÉ [18]
    nome: "Freeza",
    vida: 1200,
    vidaMax: 1200,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/25freeza.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    escudo: {
      tipo: "fixo",
      valor: 25,
      permanente: true
    },
    passiva: {
      nome: "Aura de Dominação",
      descricao: "Freeza intimida o inimigo ativo adversário, recebendo 25 de dano a menos de todas as fontes",
      evolucoes: [
        { forma: "Freeza Dourado", turnosNecessarios: 1 }
      ],
      turnosAtivos: 0
    },
    golpes: {
      golpedatirania: { nome: "Golpe da Tirania", 
                        dano: "200", 
                        custoKi: 4000,
                        descricao: "Freeza canaliza 4000 de ki para causar 200 de dano a carta ativa do adversário. "
                       },
      supernova: { nome: "Supernova", 
                   dano: 600, 
                   custoKi: 10000,
                   descricao: "Freeza canaliza 10000 de ki para reproduzir a esfera que usou pra explodir o planeta Vegeta, causando 600 de dano a carta ativa do adversário."
                  }
    }
  },
  { // CARTA MAJIN BOO - [19]
    nome: "Majin Boo",
    vida: 1400,
    vidaMax: 1400,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0.5,
    imagem: "/static/assets/21Majin Boo.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Imortalidade",
      descricao: "A cada 5 turnos, Majin Boo se transforma uma forma aleatória, recuperando completamente a sua vida",
      majinboo: true,
      turnos: 0
    },
    golpes: {
      absorcao: { nome: "Absorção", 
                  dano: 300, 
                  custoKi: 5000,
                  descricao: "Majin Boo canaliza 5000 de ki para causar 300 de dano e se curar em 50% do dano causado."
                },
      transformacaodoce: { nome: "Transformação Doce", 
                           custoKi: 0, 
                           atordoamento: 3, 
                           uso: false,
                           descricao: "Majin Boo transforma a carta ativa do adversário em um chocolate durante 3 turnos. Só pode ser utilizada uma vez enquanto nesta forma."
                          }
    }
  },
  { // CARTA SUPER BOO - [20]
    nome: "Super Boo",
    vida: 1400,
    vidaMax: 1400,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/22Super Boo.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Imortalidade",
      descricao: "A cada 5 turnos, Super Boo se transforma uma forma aleatória, recuperando completamente a sua vida.",
      superboo: true,
      turnos: 0
    },
    golpes: {
      explosaodefuria: { nome: "Explosão de Fúria", 
                         dano: 200, 
                         custoKi: 6000, 
                         stacks: 0,
                         descricao: "Super Boo canaliza 6000 de ki para causar 200 de dano a carta ativa adversária. O dano aumenta em 100 a cada uso deste golpe."
                         },
      ondamalefica: { nome: "Onda Maléfica", 
                      custoKi: 0, 
                      valor: 5000, 
                      contagem: 0, 
                      recarga: 2,
                      descricao: "Super Boo gera 5000 de ki imediatamente. Só pode ser usado a cada dois turnos."
                    }
    }
  },
  { // CARTA KID BOO - [21]
    nome: "Kid Boo",
    vida: 1400,
    vidaMax: 1400,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/23Kid Boo.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Imortalidade",
      descricao: "A cada 5 turnos, Kid Boo se transforma uma forma aleatória, recuperando completamente a sua vida.",
      kidboo: true,
      turnos: 0
    },
    golpes: {
      malencarnado: { nome: "Mal Encarnado", 
                      dano: 200, 
                      custoKi: 6000, 
                      danoAleat: 250,
                      descricao: "Kid Boo canaliza 6000 de ki para causar 200 de dano a carta ativa adversária e 250 a uma carta aleatória no banco"
                    },
      destruicaoabsoluta: { nome: "Destruição Absoluta", 
                            custoKi: 0, 
                            dano: 650,
                            descricao: "Kid Boo causa 500 de dano em si mesmo para causar imediatamente 650 de dano a carta ativa adversária. Esse golpe não possui custo de Ki."
                          }
    }
  },
  { // CARTA GOHAN SSJ 2 - [22]
    nome: "Gohan SSJ 2",
    vida: 1800,
    vidaMax: 1800,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/27Gohan SSJ.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Fúria Incontrolável",
      descricao: "Caso a carta ativa seja derrotada enquanto Gohan estiver no banco, Gohan enche-se de fúria e causará 100 de dano adicional em seus ataques. Caso sua vida caia abaixo de 50%, o dano causado por Fúria Incotrolável também aumenta em 100.",
      acumulos: 0,
      aumentou: false,
      ativou: false
    },
    golpes: {
      rajadadadeterminacao: { nome: "Rajada da Determinação", 
                              dano: 50, 
                              custoKi: 3500, 
                              stacks: 0,
                              descricao: "Gohan canaliza 3500 de ki para causar 50 de dano a carta ativa do adversário. O dano aumenta em 25 a cada uso deste ataque."
                            },
      kamehamehapaiefilho: { nome: "Kamehameha Pai e Filho", 
                             dano: 300, 
                             custoKi: 6000,
                             descricao: "Gohan canaliza 6000 de ki para causar 300 de dano a carta ativa do adversário. Kamehameha Pai e Filho: Caso Goku esteja no banco em qualquer forma, Gohan pode utilizar Kamehameha Pai e Filho, causando 300 de dano adicional."
                            }
    }
  },
  { // CARTA GOHAN - [23]
    nome: "Gohan",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/28Gohan.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Foco Mental",
      descricao: "Gohan acumula 500 de ki a mais por acúmulo de ki.",
      evolucoes: [
        { forma: "Gohan SSJ 2", turnosNecessarios: 1 }
      ],
      turnosAtivos: 0
    },
    golpes: {
      golperelampago: { nome: "Golpe Relâmpago", 
                        dano: 200, 
                        custoKi: 4000,
                        descricao: "Gohan canaliza 4000 de ki para causar 200 de dano a carta ativa do adversário"
                      },
    }
  },
  { // CARTA ANDROIDE 17 - [24]
    nome: "Androide 17",
    vida: 1500,
    vidaMax: 1500,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/29Androide 17.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Sinergia Perfeita",
      descricao: "Se a carta “Androide 18” estiver no banco, Androide 17 pode combinar ataques com ela, aprimorando os ataques utilizados."
    },
    golpes: {
      defesaperfeita: { nome: "Defesa Perfeita/Contra Ataque", 
                        dano: 0, 
                        custoKi: 8000,
                        descricao: "Androide 17 canaliza 8000 de ki para ignorar o próximo dano sofrido. Contra ataque: Caso Androide 18 esteja no banco, refletirá 100% do dano sofrido por Androide 17."
                      },
      boladeenergia: { nome: "Bola de Energia/Destruição Amplificada", 
                       dano: 200, 
                       custoKi: 5000,
                       descricao: "Androide 17 canaliza 5000 de ki para causar 200 de dano a carta ativa do adversário. Destruição Amplificada: Caso Androide 18 esteja no banco, causará 100 de dano a uma carta no banco adversário também."
                      }
    }
  },
  { // CARTA ANDROIDE 18 - [25]
    nome: "Androide 18",
    vida: 1500,
    vidaMax: 1500,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/30Androide 18.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Sinergia Perfeita",
      descricao: "Se a carta “Androide 17” estiver no banco, Androide 18 pode combinar ataques com ele, aprimorando os ataques utilizados."
    },
    golpes: {
      disparoemrajadas: { nome: "Disparo em Rajadas/Salva Energética", 
                          dano: 25, 
                          golpes: 6, 
                          custoKi: 5000,
                          descricao: "Androide 18 canaliza 5000 de ki para disparar 6 rajadas de ki contra a carta ativa do adversário, causando 25 de dano cada. Salva Energética: Caso Androide 17 esteja no banco, fortalecerá a rajada de energia de Androide 18, causando agora 50 de dano."
                        },
      punhodeluz: { nome: "Punho de Luz/Impacto do Caos", 
                    dano: 350, 
                    custoKi: 6000,
                    descricao: "Androide 18 canaliza 6000 de ki para causar 350 de dano a carta ativa do adversário. Impacto do Caos: Caso Androide 17 esteja no banco, Androide 17 irá recuperar 2500 de ki de ambos os personagens e recuperar a vida de Androide 18 em 35% do dano causado."
                  }
    }
  },
  { // CARTA KURIRIN - [26]
    nome: "Kuririn",
    vida: 1600,
    vidaMax: 1600,
    ki: 0,
    kiMax: 10000,
    lifeSteal: 0,
    imagem: "/static/assets/31Kuririn.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    escudo: {
      tipo: "fixo",
      valor: 50,
      permanente: true,
    },
    passiva: {
      nome: "Resiliência Inabalável",
      descricao: "Kuririn recebe 50 de dano a menos de todas as fontes, que aumenta para 100 enquanto estiver abaixo de 50% de vida.",
      trueDamage: true
    },
    golpes: {
      kienzan: { nome: "Kienzan", 
                 dano: 250, 
                 custoKi: 6000, 
                 danoAleat: 250,
                 descricao: "Kuririn conjura um disco de energia altamente preciso, causando 250 de dano que ignora defesas/escudos a carta ativa e a uma carta aleatória do adversário. Custa 6000 de ki."
                },
      taiyoken: { nome: "Taiyoken", 
                  dano: 0, 
                  custoKi: 7500, 
                  atordoamento: 2,
                  descricao: "Kuririn utiliza sua técnica de brilho solar para ofuscar seus inimigos, causando atordoamento por 2 turnos. Custa 7500 de ki." 
                }
    }
  },
  { // CARTA BILLS - [27]
    nome: "Bills",
    vida: 2200,
    vidaMax: 2200,
    ki: 0,
    kiMax: 20000,
    lifeSteal: 0,
    imagem: "/static/assets/32Bills.jpg",
    // debuffs
    atordoamento: false,
    rodadas: 0,
    // buffs
    acumulos: 0,
    danoAument: 0,
    buffKiExtra: 0,
    duracaoKi: 0,
    passiva: {
      nome: "Deus da Destruição",
      descricao: "Bills causa dano adicional com base na vida perdida do adversário (a cada 1% = 4+). Porém, adormece por 3 rodadas ao eliminar o inimigo no Campo Ativo.",
    },
    golpes: {
      hakaianiquilacaototal: { nome: "Hakai Aniquilação Total", 
                               dano: 600, 
                               custoKi: 8000,
                               descricao: "Bills canaliza energia de pura destruição no inimigo ativo adversário, causando 600 de dano. Custa 8000 de ki."
                              },
      esferadadestruicao: { nome: "Esfera da Destruição", 
                            dano: 300, 
                            custoKi: 12000, 
                            danoGlobal: 75,
                            descricao: "Bills cria uma esfera de energia roxa, que causa 300 de dano a carta ativa do adversário e 75 de dano a TODAS as cartas no banco do adversário. Custa 12.000 de ki."
                          }
    }
  },
  ////////////////////////////////////
  //////////////ITENS////////////////
  ///////////////////////////////////
  { //  CARTA - [0] Anel do Tempo
    nome: "Anel do Tempo",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/33Anel do Tempo.jpg",
    descricao: "Retorna uma carta a mão, restaurando completamente sua vida. A carta selecionada fica inativa por 3 turnos.",
    efeito: {
      retornarMao: true
    }
  },
  { //  CARTA - [1] Medidor de Poder
    nome: "Medidor de Poder",
    tipo: "Item",
    usos: 3,
    imagem: "/static/assets/34Medidor de Poder.jpg",
    descricao: "Revela todas as cartas da mão do oponente. Este item possui 3 usos.",
    efeito: {
      revelarMao: true
    }
  },
  { //  CARTA - [2] Espada de Trunks
    nome: "Espada de Trunks",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/35Espada de Trunks.jpg",
    descricao: "Concede ao usuário 50 de dano adicional de todas as fontes permanentemente.",
    efeito: {
      buff: {
        danoAument: 50
      }
    }
  },
  { //  CARTA - [3] Semente dos Deuses
    nome: "Semente dos Deuses",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/36Semente dos Deuses.jpg",
    descricao: "Restaura em 30% o Ki total e a vida da carta escolhida",
    efeito: {
      restaurarStatus: {
        ki: 0.3,
        vida: 0.3
      }
    }
  },
  { //  CARTA - [4] Nuvem Voadora
    nome: "Nuvem Voadora",
    tipo: "Item",
    usos: 2,
    imagem: "/static/assets/37Nuvem Voadora.jpg",
    descricao: "Concede a você uma substituição extra no turno. Este item possui 2 usos.",
    efeito: {
      acaoTurno: {
        trocasTurno: 1
      }
    }
  },
  { //  CARTA - [5] Torre Karin
    nome: "Torre Karin",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/38Torre Karin.jpg",
    descricao: "Gere na mão 2 cartas “Semente dos Deuses”.",
    efeito: {
      torrekarin: true
    }
  },
  { //  CARTA - [6] Sala do Tempo
    nome: "Sala do Tempo", 
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/39Sala do Tempo.jpg",
    descricao: "Fortalece os ataques da carta escolhida em 100 durante 3 turnos.",
    efeito: {
      aprimoramentoTemporario: {
        danoAument: 100,
        temporizador: 3
      }
    }
  },
  { //  CARTA - [7] Esferas do Dragão
    nome: "Esferas do Dragão",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/40Esferas do Dragão.jpg",
    descricao: "Gera 2 itens aleatórios na sua mão.",
    efeito: {
      esferasdodragao: true
    }
  },
  { //  CARTA - [8] Yamcha
    nome: "Yamcha",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/41Yamcha.jpg",
    descricao: "Descarte uma carta da mão do oponente.",
    efeito: {
      godYamcha: true
    }
  },
  { //  CARTA - [9] Arena do Torneio do Poder
    nome: "Arena do Torneio do Poder",
    tipo: "Item",
    usos: 2,
    imagem: "/static/assets/42Arena do Torneio do Poder.jpg",
    descricao: "Isola as duas cartas ativas em combate. Nenhuma das duas pode ser substituída. Este item possui 2 usos.",
    efeito: {
      arena: true
    }
  },
  { //  CARTA - [10] Traje Pesado de Piccolo
    nome: "Traje Pesado de Piccolo",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/43Traje Pesado de Piccolo.jpg",
    descricao: "O usuário recebe -25 de dano de qualquer ataque recebido.",
    efeito: {
      escudo: {
        tipo: "fixo",
        valor: 25,
        permanente: true
      },
    }
  },
  { //  CARTA - [11] Botão do Zeno-sama
    nome: "Botão do Zeno-sama",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/44Botão do Zeno Sama.jpg",
    descricao: "Concede um ataque extra neste turno.",
    efeito: {
      acaoTurno: {
        acoesTurno: 1,
      }
    }
  },
  { //  CARTA - [12] Máquina do Tempo
    nome: "Máquina do Tempo",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/45Maquina do Tempo.jpg",
    descricao: "Retorna uma ao banco com a vida completamente cheia. A carta selecionada fica inativa por 3 turnos.",
    efeito: {
      retornarBanco: true
    }
  },
  { //  CARTA - [13] Casa do Mestre Kame
    nome: "Casa do Mestre Kame",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/46Casa do Mestre Kame.jpg",
    descricao: "Concede mais 1000 de ki por turno durante 5 turnos a carta ativa.",
    efeito: {
      aprimoramentoTemporario: {
        buffKiExtra: 1000,
        temporizador: 5
      }
    }
  },
  { //  CARTA - [14] Câmara de Gravidade
    nome: "Câmara de Gravidade",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/47Camara de Gravidade.jpg",
    descricao: "Após 4 turnos, concede 75 de dano permanente em todos os ataques a carta ativa.",
    efeito: {
      timingBuff: {
        dano: 75,
        timing: 4
      }
    }
  },
  { //  CARTA - [15] Escudo de Ki
    nome: "Escudo de Ki",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/48Escudo de Ki.jpg",
    descricao: "Concede a Carta Ativa um escudo de 650 pontos de vida.",
    efeito: {
      escudo: {
        tipo: "absorvedor",
        valor: 650,
        permanente: true
      },
    }
  }
];

                    //////////////////////////////
                    ////////FUNÇÕES WEBSOCKET//////
                    ////////////////////////////
                    //////////////////////////////
                    ////////FUNÇÕES WEBSOCKET//////
                    ////////////////////////////

let jaConectado = false;
let jogadorTemporario = null;
let jogadorSelecionado = null;
let adversario = null;
let telaAguardando = null
let videoConcluido = false;

socket.on('papel_atribuido', ({ papel, sala_id }) => {
  console.log(`⚔️  Papel atribuído: ${papel} na sala ${sala_id}`);
  jogadorSelecionado = papel;

  // ✅ Armazena o jogador local corretamente
  if (papel === 'jogador1') {
    jogador1 = jogadorTemporario;
  } else {
    jogador2 = jogadorTemporario;
  }

  // Envia jogador completo somente agora
  if (jogadorTemporario) {
    socket.emit('jogador_criado', jogadorTemporario);
    jogadorTemporario = null;
  }
});

function conectarASala(nomeJogador, salaId = 'sala1') {
    socket.emit('conectar', {
        nome: nomeJogador,
        sala_id: salaId
    });
}

socket.on('jogador_conectado', (data) => {
  // Atualiza o nome do jogador corretamente
  if (data.papel === 'jogador1') {
    nomeJogador1 = data.jogador;
  } else {
    nomeJogador2 = data.jogador;
  }
  console.log(`🎮 ${data.jogador} se conectou como ${data.papel}. Total na sala: ${data.total_jogadores}`);
});

socket.on('tela_aguardo', () => {
  mostrarTelaEsperaJogador2(jogador1);
});

socket.on('jogo_pronto', () => {
    console.log('Dois jogadores conectados! O jogo pode começar.');
    // Aqui você pode chamar a função para mostrar a seleção de cartas iniciais
});

socket.on('ambos_prontos', () => {
  console.log('Ambos jogadores enviaram seus decks! Iniciando jogo...');

  // determina quem é o adversário
  const adversario = (jogadorSelecionado === 'jogador1') 
    ? jogador2 
    : jogador1;

  // mostra a tela de partida encontrada
  mostrarTelaPartidaEncontrada(adversario);

  // e só aí, após o countdown, inicia o jogo
  setTimeout(() => {
    iniciarJogo();
  }, 3500);
});

socket.on('oponente_registrado', (data) => {
    const oponente = data.jogador;
    const papelDoOponente = data.papel;

    // Se eu sou o jogador1, recebi o jogador2
    if (jogadorSelecionado === 'jogador1') {
        jogador2 = oponente;
        console.log(`🎯 Jogador 2 (oponente) registrado: ${jogador2.nome}`);
    }
    // Se eu sou o jogador2, recebi o jogador1
    else if (jogadorSelecionado === 'jogador2') {
        jogador1 = oponente;
        console.log(`🎯 Jogador 1 (oponente) registrado: ${jogador1.nome}`);
    }

    console.log(`🧍‍♂️ Oponente recebido: ${oponente.nome} (${papelDoOponente})`);
});

socket.on('oponente_registrado', (data) => {
    const oponente = data.jogador;
    const papelDoOponente = data.papel;

    if (jogadorSelecionado === 'jogador1') {
        jogador2 = oponente;
    } else {
        jogador1 = oponente;
    }

    console.log(`🎯 Oponente registrado: ${oponente.nome} (${papelDoOponente})`);
});

socket.on('finalizar_turno', () => {
    faseFimTurno(); // sempre chamada
    atualizarInterfaceTurno();
    habilitarBotoesJogador(jogadorAtual);
});

socket.on('ki_acumulado', (data) => {
  console.log("Ki recebido, atualizando...");

  // Só atualiza se o personagem for do oponente
  if (data.jogador.nome !== jogadorSelecionado.nome) {
    const personagemAtualizado = data.personagem;

    // Descobre de qual jogador se trata (adversário)
    const jogadorAlvo = adversario;

    // Busca o personagem no campoAtivo
    let personagemInterface = jogadorAlvo.campoAtivo.find(p => p.nome === personagemAtualizado.nome);

    // Se não encontrar no campoAtivo, busca no bancoLuta
    if (!personagemInterface) {
      personagemInterface = jogadorAlvo.bancoLuta.find(p => p.nome === personagemAtualizado.nome);
    }

    if (personagemInterface) {
      // Atualiza os valores relevantes
      personagemInterface.ki = personagemAtualizado.ki;
      showNotification(`${jogadorAlvo.nome} acumulou ki com ${personagemInterface.nome}.`, 'error');
      const audio = new Audio('/static/assets/Voicy_Small Aura Burst (DBZ Sound Effect).mp3');
      audio.play().catch(e => console.log("Autoplay não permitido:", e));

      // Se houver outros campos como buffs temporários, atualize também
      personagemInterface.buffKiExtra = personagemAtualizado.buffKiExtra || 0;
      personagemInterface.KiTemporario = personagemAtualizado.KiTemporario || 0;
    } else {
      console.warn("Personagem não encontrado na interface para atualizar KI");
    }

    atualizarCartasNaInterface();
  }
});

socket.on('trocar_personagem', (data) => {
  console.log("Personagem trocado, atualizando...");

  if (data.jogador.nome !== jogadorSelecionado.nome) {
    const personagemAtualizado = data.personagem;

    // Descobre de qual jogador se trata (adversário)
    const jogadorAlvo = adversario;

    // Busca o personagem no campoAtivo
    let personagemInterface = jogadorAlvo.bancoLuta.find(p => p.nome === personagemAtualizado.nome);

    if (personagemInterface) {
      // Atualiza os valores relevantes
      trocarPersonagemAtivo(personagemInterface, jogadorAlvo);
      showNotification(`${jogadorAlvo.nome} enviou ${personagemInterface.nome} para o combate.`, 'error');
      const audio = new Audio('/static/assets/Voicy_Instant transmission re-upload.mp4');
      audio.play().catch(e => console.log("Autoplay não permitido:", e));

    } else {
      console.warn("Personagem não encontrado na interface para atualizar KI");
    }

    atualizarCartasNaInterface();
  }
});

socket.on('uso_item', (data) => {
  console.log("Item usado, atualizando...");

  if (data.jogador.nome !== jogadorSelecionado.nome) {
    const itemUsado = data.item;
    const efeitos = data.efeitos || {};
    const jogadorAlvo = jogadorSelecionado;
    const oponente = adversario

    // 📦 CASOS ESPECIAIS COM DADOS RECEBIDOS DO OUTRO JOGADOR (como sorteios)
    if (itemUsado.efeito?.esferasdodragao && efeitos.sorteados) {
      oponente.mao.push(...efeitos.sorteados);
      showNotification(`${adversario.nome} recebeu dois itens das Esferas do Dragão.`, 'error');
    }

    else if (itemUsado.efeito?.godYamcha && efeitos.descartada) {
      jogadorAlvo.mao = jogadorAlvo.mao.filter(carta => carta.nome !== efeitos.descartada.nome);
      showNotification(`💢 ${data.jogador.nome} descartou ${efeitos.descartada.nome} da sua mão com Yamcha!`, 'error');
    }

    // ✅ CASO PADRÃO (sem efeito especial, lógica antiga permanece)
    else {
      let itemNaMao = oponente.mao.find(i => i.nome === itemUsado.nome);

      if (itemNaMao) {
        usarItem(itemNaMao, oponente);
        showNotification(`${oponente.nome} usou ${itemNaMao.nome}.`, 'error');

        const audio = new Audio('/static/assets/Voicy_Black Gokus Time Ring Sound Effect.mp3');
        audio.play().catch(e => console.log("Autoplay não permitido:", e));
      } else {
        console.warn("Item não encontrado na mão do adversário.");
      }
    }

    atualizarCartasNaInterface();
  }
});

socket.on('solicitar_substituicao', (data) => {
  const nomeJogador = data?.jogador;

  if (!nomeJogador) {
    console.warn("Evento solicitar_substituicao recebido sem jogador definido!");
    return;
  }

  if (nomeJogador === jogadorSelecionado.nome) {
    substituirCartaDerrotada(jogadorSelecionado);
  } else {
    mostrarTelaAguardandoSubstituicao(nomeJogador);
    telaAguardando = mostrarTelaAguardandoSubstituicao(nomeJogador);
  }
});


socket.on('sincronizar_banco', (data) => {
    console.log(adversario.mao)
  let jogadorLocal, jogadorRemoto;

  if (jogadorSelecionado.nome === data.jogador.nome) {
    jogadorLocal = jogadorSelecionado;
    jogadorRemoto = adversario;
  } else {
    jogadorLocal = adversario;
    jogadorRemoto = jogadorSelecionado;
  }

  // Atualiza os objetos globais corretamente com base na identidade real do local
  if (jogador1.nome === jogadorLocal.nome) {
    jogador1 = jogadorLocal;
    jogador2 = jogadorRemoto;
  } else {
    jogador1 = jogadorRemoto;
    jogador2 = jogadorLocal;
  }
  console.log(adversario.mao)
  const jogadorAlvo = adversario; // sempre o oponente

  // Remove da mão
  const index = jogadorAlvo.mao.findIndex(c => c.nome === data.carta.nome);
  if (index !== -1) {
    const carta = jogadorAlvo.mao.splice(index, 1)[0];
    jogadorAlvo.bancoLuta.push(carta);

    // Atualiza a UI
    if (jogadorAlvo === jogador1) {
        mostrarBanco(jogador1.bancoLuta, "banco-cartas");
    } else {
        mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
    }

    showNotification(`${carta.nome} foi movido para o banco por ${data.jogador}`, "error");
  } else {
    console.warn("Carta não encontrada na mão do oponente.");
  }
});

socket.on('exibir_modal_substituicao', ({ jogador, cartas }) => {
  // Verifica se quem deve exibir o modal é o jogador local
  if (jogadorSelecionado.nome === jogador) {
    pausarJogoParaSubstituicao(jogadorSelecionado, cartas);
  } else {
    // Adversário apenas mostra a tela de espera
    if (!telaAguardando) {
      telaAguardando = mostrarTelaAguardandoSubstituicao(jogador);
    }
  }
});


socket.on('abrir_tela_substituicao', ({ jogador }) => {
  telaAguardando = mostrarTelaAguardandoSubstituicao(jogador);
});

socket.on('sincronizar_substituicao', ({ jogador, novaCarta }) => {
  const jogadorAlvo = jogador1.nome === jogador ? jogador1 : jogador2;

  jogadorAlvo.campoAtivo = [novaCarta];

  // Atualização robusta da interface
  const containerId = jogadorAlvo === jogador1 ? "player1-card" : "player2-card";
  const bancoId = jogadorAlvo === jogador1 ? "banco-cartas" : "banco-cartas-jogador2";
  exibirCarta(novaCarta, containerId);
  mostrarBanco(jogadorAlvo.bancoLuta, bancoId);

  atualizarCartasNaInterface();

  if (telaAguardando) {
    telaAguardando.close();
    telaAguardando = null;
  }

  console.log(`Substituição sincronizada para ${jogadorAlvo.nome}.`);
});

socket.on('atualizar_carta_ativa', ({ jogador, novaCarta, bancoLuta }) => {
  const jogadorAlvo = jogador1.nome === jogador ? jogador1 : jogador2;
  jogadorAlvo.campoAtivo = [novaCarta];
  jogadorAlvo.bancoLuta = bancoLuta

  showNotification(`${jogadorAlvo.nome} enviou ${novaCarta.nome} para o campo ativo.`, "error");

  const containerId = jogadorAlvo === jogador1 ? "player1-card" : "player2-card";
  const bancoId = jogadorAlvo === jogador1 ? "banco-cartas" : "banco-cartas-jogador2";
  console.log(bancoLuta);
  console.log(jogadorAlvo.bancoLuta);
  exibirCarta(novaCarta, containerId);
  mostrarBanco(jogadorAlvo.bancoLuta, bancoId);
  atualizarCartasNaInterface();
});

socket.on('boo_transformado', ({ novaForma, jogador, estadoAtual }) => {
  const boo = (jogador1.nome === jogador ? jogador1 : jogador2)
    .bancoLuta.concat((jogador1.nome === jogador ? jogador1 : jogador2).campoAtivo)
    .find(c => ["Majin Boo", "Super Boo", "Kid Boo"].includes(c.nome));

  const novaFormaData = bancoDeCartas.find(c => c.nome === novaForma);
  if (!boo || !novaFormaData) return;

  Object.assign(boo, {
    ...JSON.parse(JSON.stringify(novaFormaData)),
    ...estadoAtual,
    vida: novaFormaData.vidaMax,
    passiva: { ...novaFormaData.passiva, turnos: 0 }
  });

  if (boo.nome === "Majin Boo") boo.golpes.transformacaodoce.uso = false;
  if (boo.nome === "Super Boo") boo.golpes.explosaodefuria.stacks = 0;

  showNotification(`🌀 ${boo.nome} se transformou e recuperou toda a vida!`);
  atualizarCartasNaInterface();
});

socket.on('sincronizar_mao_trunks', (data) => {
  if (data.nomeJogador === jogador1.nome) {
    jogador1.mao = data.novaMao.map(c => ({ ...c }));
  } else {
    jogador2.mao = data.novaMao.map(c => ({ ...c }));
  }

  showNotification(`Trunks retornou à mão de ${data.nomeJogador} após ser derrotado!`, "warning");
  mostrarMao(data.nomeJogador === jogador1.nome ? jogador1 : jogador2);
});

socket.on('atualizar_banco', (data) => {
  const jogadorAlvo = adversario;

  // Atualiza o banco e campo ativo, removendo a carta derrotada da interface
  jogadorAlvo.bancoLuta = data.novoBanco.filter(c => c.vida > 0);
  jogadorAlvo.campoAtivo = data.campoAtivo;

  atualizarCartasNaInterface();
});

function calcularEfeitos(efeitos, atacante, defensor, Jatacante, Jdefensor, golpe) {
  if (!efeitos) return

  if (atacante.nome === jogadorSelecionado.nome) return;

  if (efeitos.itemAdicionado) {
    adversario.mao = efeitos.itemAdicionado.Jmao
    showNotification(`${atacante.nome} gerou uma carta robótica na mão de ${Jatacante.nome}!`, 'error')
  }

  if (efeitos.itemAdicionado2) {
    adversario.mao = efeitos.itemAdicionado2.Jmao
    showNotification(`Chi Chi acaba de preparar uma refeição na mão de ${Jatacante.nome}!`, 'error')
  }

  if (efeitos.debuffs) {
    if (efeitos.debuffs.jaulaTempo) {
      defensor.jaulaTempo = efeitos.debuffs.duracao;
      showNotification(`⏳ ${atacante.nome} prendeu ${defensor.nome} na Jaula do Tempo durante ${defensor.jaulaTempo} turno!`, "error");
    }
    if (efeitos.debuffs.chocolate) {
      defensor.chocolate = true;
      defensor.chocolateDuracao = efeitos.debuffs.duracao;
      showNotification(`${defensor.nome} foi transformado em chocolate por 3 turnos!`, "error");
    }
    if (efeitos.debuffs.abaloSismico) {
      if (defensor.escudo) {
        delete defensor.escudo
        showNotification(`${atacante.nome} destruiu o escudo de ${defensor.nome}!`, "error");
      }
    }
    if (efeitos.debuffs.atordoamento) {
      defensor.atordoamento = true;
      defensor.rodadas = efeitos.debuffs.atordoamento;
      showNotification(`${defensor.nome} foi atordoado por ${efeitos.debuffs.atordoamento} turno(s)!`, "error");
    }
  }

  if (efeitos.bloqueadosImunidade) {
    showNotification(`${atacante.nome} tentou usar ${golpe.nome}, mas ${efeitos.bloqueadosImunidade} é imune!`, 'success')
  }

  if (efeitos.buffs) {
    if (efeitos.buffs.escudo) {
      atacante.escudo = {
        tipo: efeitos.buffs.escudo.tipo,
        valor: efeitos.buffs.escudo.valor, // Valor total (ex.: 500)
        valorMax: efeitos.buffs.escudo.valor,
        vidaAtual: efeitos.buffs.escudo.valor // Vida atual do escudo (começa cheia)
    };
      showNotification(`${atacante.nome} recebeu um escudo de ${efeitos.buffs.escudo.valor} pontos de vida!`, 'error')
    }
    if (efeitos.buffs.defesaperfeita) {
      atacante.absorvido = 0;
      showNotification(`${atacante.nome} absorverá o próximo ataque recebido!`, "error");
      if (!efeitos.buffs.contraAtaque) {
        atacante.contraAtaque = false;
      } else {
        atacante.contraAtaque = true
        showNotification(`Androide 18 aprimora a defesa perfeita de Androide 17!`, "error");
        showNotification(`Androide 17 agora refletirá 100% do próximo ataque recebido.`);
      }
    }
    if (efeitos.buffs === "regenTotal") {
      atacante.vida = atacante.vidaMax;
      showNotification(`A forma perfeita de ${atacante.nome} se regenerou completamente!`, "error");
    }
    if (efeitos.buffs.restaurarKi) {
      atacante.ki = efeitos.buffs.restaurarKi
      showNotification(`${atacante.nome} gerou ${efeitos.buffs.kiGanho} com ${golpe.nome}!`, "error");
    }
    if (efeitos.buffs.juizoimperial) {
      atacante.lifeSteal = efeitos.buffs.lifeSteal
      atacante.duracaoJuizo = efeitos.buffs.duracaoJuizo
      showNotification(`Freeza Dourado passa a se curar em 50% do dano causado durante 3 turnos!`, "error");
    }
    if (efeitos.buffs.androide18) {
      atacante.ki = efeitos.buffs.androide18
      const android17 = Jatacante.bancoLuta.find(carta => carta.nome === "Androide 17");
      android17.ki = efeitos.buffs.androide17
      showNotification(`Androide 17 aprimora o Punho de Luz de Androide 18!`, "error");
      showNotification(`+2500 de Ki para ambos e cura em 50% do dano causado.`, "error");
    }
  }

  if (efeitos.buffStatus) {
    if (efeitos.buffStatus.buffKiExtra) {
      atacante.buffKiExtra = efeitos.buffStatus.buffKiExtra
      atacante.duracaoKi = efeitos.buffStatus.duracaoKi
        showNotification(`${atacante.nome} aumentou seus ganhos em acumulos de ki em ${golpe.buffKi} durante ${golpe.duracao} turnos!`, "error");
      if (efeitos.buffStatus.buffDanoExtra > 0) {
        atacante.buffDanoExtra = efeitos.buffStatus.buffDanoExtra
        atacante.duracaoDano = efeitos.buffStatus.duracaoDano
        showNotification(`${atacante.nome} aumentou seu dano em ${golpe.buffDano} durante ${golpe.duracao} turnos!`, "error");
      }
    }
  }

  if (efeitos.manipulacaoTempo) {
    adversario.mao = efeitos.manipulacaoTempo.Jmao
    showNotification(`${atacante.nome} manipulou o tempo e sai do campo ativo com a vida completamente cheia!`, 'error')
  }

  if (efeitos.esquivaInstinto) {
    if (efeitos.esquivaInstinto.golpesAnulados === "todos") {
      showNotification(`${defensor.nome} esquivou se esquivou de todos os golpes!`, 'success')
    } else {
      showNotification(`${defensor.nome} se esquivou de ${efeitos.esquivaInstinto.golpesAnulados} golpes!`, 'success')
    }
  }

  if (efeitos.defesaAndroide) {
    if (efeitos.defesaAndroide.contraAtaque === false) {
      showNotification(`${defensor.nome} defendeu-se de ${golpe.nome} completamente!`, 'success')
    } else {
      atacante.vida -= efeitos.defesaAndroide.danoRefletido
      showNotification(`${defensor.nome} defendeu-se de ${golpe.nome} e refletiu ${efeitos.defesaAndroide.danoRefletido} de dano!`, 'success')
    }
  }

  if (efeitos.buffVegeta) {
    defensor.passiva.acumulos = efeitos.buffVegeta.passiva
    defensor.golpes.explosaoDaIra.danoArmazenado = efeitos.buffVegeta.danoArmazenado
    showNotification(`${defensor.nome} sofreu dano! o dano de seus ataques aumenta em 50. dano atual: ${defensor.passiva.acumulos}`, "warning");
    showNotification(`${defensor.nome} sofreu dano! metade do dano sofrido é armazenado. dano atual: ${defensor.golpes.explosaoDaIra.danoArmazenado}`, "warning");
  }

  if (efeitos.curaBlack) {
    atacante.vida += efeitos.curaBlack.cura
    showNotification(`${atacante.nome} curou-se em ${efeitos.curaBlack.cura} pontos de vida.`, "error");
  }

  if (efeitos.lifeSteal) {
    atacante.vida = Math.min(atacante.vida + efeitos.lifeSteal.cura, atacante.vidaMax);
    showNotification(`${atacante.nome} curou-se em ${efeitos.lifeSteal.cura} pontos de vida.`, "error");
  }

  if (efeitos.orgulhoSayajin) {
    const escudo = efeitos.orgulhoSayajin.escudo
    defensor.escudo = escudo
    showNotification(`${defensor.nome} está abaixo de 50% de vida, e recebe um escudo de ${defensor.escudo.valor} pontos!`, "warning");
  }

  if (efeitos.recuo) {
    atacante.vida -= efeitos.recuo.dano
    showNotification(`${atacante.nome} causou ${efeitos.recuo.dano} de dano em si mesmo!`, "warning");
  }

  if (efeitos.buffCell) {
    atacante.vida = efeitos.buffCell.vidaCell
    showNotification(`${atacante.nome} acaba de caçar um inimigo, aumentando seu dano em 50 e restaurando 20% de sua vida.`, "error");
  }

  if (efeitos.ssjBlue) {
    defensor.lifeSteal = efeitos.ssjBlue.lifeSteal
    defensor.passiva.acumulos = 100
    showNotification(`${defensor.nome} está abaixo de 50% de vida, sua Determinação Sayajin está ativa!`, "warning");
    showNotification("Dano aumentado em 100 e cura em 20% do dano causado.", "warning");
  }

  if (efeitos.iraDivina) {
    atacante.ki = efeitos.iraDivina.blackKi
    showNotification(`${atacante.nome} mostra a sua Ira Divina ao eliminar o inimigo. Ki restaurado em 5000 e dano aumentado em 100.`, "error");
  }

  if (efeitos.selfDestruction) {
    atacante.vida = 0
    showNotification(`${atacante.nome} se auto-destruiu!`, 'warning')
  }

  if (efeitos.trunks) {
    console.log('efeito trunks recebido!')
    defensor.passiva.acumulos = 50
    showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em 50!`, "warning");
  }

  if (efeitos.gohan) {
    defensor.passiva.acumulos += efeitos.gohan.gohanAcumulos
    showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em 100!`, "warning");
  }

  if (efeitos.kuririn) {
    defensor.escudo.valor = 100
    showNotification(`${defensor.nome} esta abaixo de 50% de vida, a sua resistência aumenta para 100!`, "warning");
  }

  if (efeitos.bills) {
    showNotification(`${atacante.nome} adormecerá pos 3 rodadas após eliminar seu inimigo.`, "warning");
  }

  if (efeitos.gohan2) {
    const gohan = Jdefensor.bancoLuta.find(carta => carta.nome === "Gohan SSJ 2");
    gohan.passiva.acumulos += efeitos.gohan2.gohanAcumulos
    showNotification(`Gohan enfurece-se com a morte de seu aliado, e anseia por vingá-lo. recebe 100 de dano adicional`, "warning");
  }

  if (efeitos.esperancaSayajin) {
    defensor.passiva.esperancaSayajin = false;
    defensor.marcarParaRetorno = true;

    showNotification(`${efeitos.esperancaSayajin.nome} retrocede no tempo antes de sua morte e retorna a mão do adversário!`, "error");
  }

  if (efeitos.danoAleat) {
    const alvo = jogadorSelecionado.bancoLuta.find(c => c.nome === efeitos.danoAleat.alvo);
      if (alvo) {
        const danoReal = calcularDanoComEscudo(atacante, alvo, efeitos.danoAleat.dano);
        console.log(alvo);
        alvo.vida -= danoReal;
        showNotification(`${atacante.nome} causou ${danoReal} de dano em ${alvo.nome} no banco. vida atual:(${alvo.vida}/${alvo.vidaMax})`, "error");
    } else {
      console.log(`alvo invalido. alvo:${alvo}`);
    }
  }

  if (efeitos.danoGlobal) {
    const defensores = jogadorSelecionado.bancoLuta
    defensores.forEach(defensor => {
      const danoReal = calcularDanoComEscudo(atacante, defensor, efeitos.danoGlobal.dano);
      defensor.vida -= danoReal;
      showNotification(`${atacante.nome} causou ${danoReal} de dano em ${defensor.nome} no banco. vida atual:(${defensor.vida}/${defensor.vidaMax})`, "error");
    })
  }

  if (efeitos.cura) {
    jogadorCerto = adversario
    if (atacante.nome === efeitos.carta) {
      atacante.vida += efeitos.cura;
      showNotification(`${atacante.nome} curou ${efeitos.cura} de dano em si mesma.`, "error");
    } else {
    const cartaCurada = jogadorCerto.bancoLuta.find(c => c.nome === efeitos.carta);
    cartaCurada.vida += efeitos.cura;
    showNotification(`${atacante.nome} curou ${efeitos.cura} de dano em ${cartaCurada.nome} no banco.`, "error");
    }
  }

  if (efeitos.escudoChiChi) {
    efeitos.escudoChiChi.alvo.escudo = efeitos.escudoChiChi.Jescudo
    showNotification(`🛡️ ${efeitos.escudoChiChi.alvo.nome} ganhou 500 pontos de escudo e +50 de dano enquanto o escudo estiver ativo!`, "error");
  }
}

socket.on('sincronizar_ataque', (data) => {
  if (data.jogador !== jogadorSelecionado.nome) {
    // Aplique os efeitos exatamente como foram recebidos
    const jogadorAtacante = data.JogadorAtacante
    const jogadorDefensor = data.JogadorDefensor
    const atacante = adversario.campoAtivo[0];
    const defensor = jogadorSelecionado.campoAtivo[0]; // ou busca pelo nome
    const efeitos = data.efeitos;
    const golpe = data.golpe

    atacante.ki -= golpe.custoKi
    calcularEfeitos(efeitos, atacante, defensor, jogadorAtacante, jogadorDefensor, golpe)

    
    if (data.danoCausado) {
      if (!efeitos.defesaAndroide) {
      const danoReal = calcularDanoComEscudo(atacante, defensor, data.danoCausado);
      defensor.vida -= danoReal;
      showNotification(`${atacante.nome} atacou com ${golpe.nome}, causando ${danoReal} de dano em ${defensor.nome}!`, "error");     
     }
    } else {
      if (efeitos.escudoChiChi) {
        showNotification("Chi Chi usou Fortaleza de Determinação!", 'error')
      } 
      else if (efeitos.itemAdicionado2) {
        showNotification("Chi Chi usou Refeição de Emergência!", 'error')
      }
      else {
      showNotification(`${atacante.nome} usou ${golpe.nome}!`, "error");
      }
    }
      if (defensor.vida <= 0) {
        setTimeout(() => {
          animacoesAtaques(golpe, defensor, verificarCampoVazio(), atualizarCartasNaInterface());
        }, 1500);
      }
      atualizarCartasNaInterface()
  }
});

                    ///////////////////////////
                    ////// CAMPO DE J0GO /////
                    /////////////////////////
// Banco de cartas completo (externo)

const deckCompleto = {
  cartas: [...bancoDeCartas], // Todas as cartas do jogo
  itens: bancoDeCartas.filter(carta => carta.tipo === "Item") // Filtra só itens
};

const indexCartas = []
const indexItens = []
let nomeJogador1 = null
let nomeJogador2 = null
let jogador1 = null
let jogador2 = null


document.addEventListener('DOMContentLoaded', () => {
  const deckData = JSON.parse(localStorage.getItem('deckEscolhido'));
  
  deckData.cartas.forEach(cartaSelecionada => {
    // Encontra o índice da carta no deckCompleto
    const index = deckCompleto.cartas.findIndex(carta => 
      carta.nome === cartaSelecionada.nome
    );
    
    // Se encontrou, adiciona ao array de índices
    if (index !== -1) {
      indexCartas.push(index);
    } else {
      console.warn(`Carta "${cartaSelecionada.nome}" não encontrada no deck completo!`);
    }
  });

  deckData.itens.forEach(cartaSelecionada => {
    // Encontra o índice da carta no deckCompleto
    const index = deckCompleto.itens.findIndex(carta => 
      carta.nome === cartaSelecionada.nome
    );
    
    // Se encontrou, adiciona ao array de índices
    if (index !== -1) {
      indexItens.push(index);
    } else {
      console.warn(`Carta "${cartaSelecionada.nome}" não encontrada no deck completo!`);
    }
  });

  if (deckData) {
    console.log("Cartas recebidas:", deckData.cartas);
    console.log("Itens recebidos:", deckData.itens);
    

  } else {
    console.error("Nenhum dado de deck encontrado!");
    window.location.href = 'selecao.html';
  }

  selecionarNomeJogador()
});

// Variável global para controlar o estado do modal
let modalNomeJogadorAtivo = false;

/**
 * Exibe um modal obrigatório para seleção do nome do jogador
 * @param {function} callback - Função chamada ao confirmar com nome válido
 */
function selecionarNomeJogador(callback) {
  // Bloqueia outros event listeners
  modalNomeJogadorAtivo = true;
  
  // Cria os elementos do modal
    
  // Elementos do modal
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const conteudo = document.createElement('div');
  const texto = document.createElement('h2');
  const input = document.createElement('input');
  const btnConfirmar = document.createElement('button');
  const aviso = document.createElement('p');

  // Estilização simplificada com background-image
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  modal.style.cssText = `
    width: 80%;
    height: 70%;
    max-width: 800px;
    background-image: url('/static/assets/fundoModal.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.4s ease-out;
    border: 3px solid #d72323;
    position: relative;
  `;

  // Overlay escuro sobre a imagem para melhor contraste
  const fundoEscuro = document.createElement('div');
  fundoEscuro.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  `;
  modal.appendChild(fundoEscuro);

  // Container do conteúdo (sobrepõe a imagem)
  conteudo.style.cssText = `
    width: 80%;
    text-align: center;
    z-index: 1;
    color: white;
  `;
  // Mensagem
  texto.textContent = 'ANTES DE COMEÇAR...';
  texto.style.color = '#f5ed00';
  texto.style.fontSize = '2rem';
  texto.style.marginBottom = '2rem';
  texto.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
  texto.style.fontFamily = '"Arial Black", sans-serif';
  
  // Input
  input.type = 'text';
  input.placeholder = 'Digite seu nome de jogador';
  input.style.width = '100%';
  input.style.padding = '15px';
  input.style.marginBottom = '1.5rem';
  input.style.border = '2px solid #d72323';
  input.style.borderRadius = '8px';
  input.style.fontSize = '1.2rem';
  input.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  input.style.color = 'white';
  input.style.outline = 'none';
  
  // Aviso
  aviso.textContent = 'Você deve inserir um nome para continuar';
  aviso.style.color = '#FFF';
  aviso.style.marginBottom = '1.5rem';
  aviso.style.opacity = '0';
  aviso.style.transition = 'opacity 0.3s';
  aviso.style.fontSize = '1.2rem';
  
  // Botão de confirmação
  btnConfirmar.textContent = 'CONFIRMAR';
  btnConfirmar.style.padding = '15px 30px';
  btnConfirmar.style.background = '#d72323';
  btnConfirmar.style.color = '#FFFFFF';
  btnConfirmar.style.border = 'none';
  btnConfirmar.style.borderRadius = '8px';
  btnConfirmar.style.cursor = 'pointer';
  btnConfirmar.style.fontSize = '1.2rem';
  btnConfirmar.style.fontWeight = 'bold';
  btnConfirmar.style.transition = 'all 0.3s ease';
  btnConfirmar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
  
  // Efeitos hover
  btnConfirmar.onmouseover = () => {
    btnConfirmar.style.transform = 'scale(1.05)';
    btnConfirmar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
    btnConfirmar.style.backgroundColor = '#f5ed00';
    btnConfirmar.style.color = '#000';
  };
  btnConfirmar.onmouseout = () => {
    btnConfirmar.style.transform = 'scale(1)';
    btnConfirmar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    btnConfirmar.style.backgroundColor = '#d72323';
    btnConfirmar.style.color = '#FFFFFF';
  };
  
  // Montagem da estrutura
  conteudo.appendChild(texto);
  conteudo.appendChild(input);
  conteudo.appendChild(aviso);
  conteudo.appendChild(btnConfirmar);
  modal.appendChild(conteudo);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Desabilita scroll da página
  document.body.style.overflow = 'hidden';
  
  // Animação de entrada
  setTimeout(() => {
    modal.style.transform = 'translateY(0)';
    modal.style.opacity = '1';
  }, 10);
  
  // Foco automático no input
  input.focus();
  
  // Função para validar e fechar
  const validarEFechar = () => {
    const nome = input.value.trim();
    if (nome.length < 3) {
      aviso.style.opacity = '1';
      input.style.borderColor = '#d72323';
      setTimeout(() => {
        aviso.style.opacity = '0';
      }, 2000);
      return false;
    }
    
    modal.style.transform = 'translateY(100px)';
    modal.style.opacity = '0';
    
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
      modalNomeJogadorAtivo = false;
      if (callback) callback(nome);
    }, 400);
    
    console.log('Nome do jogador:', nome);

    if (!jaConectado) {
      jaConectado = true;
      adicionarNovoJogador(nome, indexCartas, indexItens);
    }
    
    return true;
  };
  
  // Evento de clique no botão
  btnConfirmar.addEventListener('click', validarEFechar);
  
  // Evento de tecla Enter
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      validarEFechar();
    }
  });
  
  // Impede fechar clicando fora
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      // Feedback visual que não pode sair
      modal.style.transform = 'translateX(10px)';
      setTimeout(() => modal.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => modal.style.transform = 'translateX(0)', 200);
    }
  });
}

function adicionarNovoJogador(nome, cartas, itens) {
  if (jogador1 === null) {
        setTimeout(() => {
      mostrarMenuSelecaoInicial(jogador1, cartas, itens, nome, (jogador) => {
      });
    }, 400);
  } else {
    setTimeout(() => {
      mostrarMenuSelecaoInicial(jogador2, cartas, itens, nome, (jogador) => {
      });
    }, 400);
  }
}

function mostrarTelaEsperaJogador2(jogador1) {
  // Cria os elementos do modal
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const conteudo = document.createElement('div');
  const texto = document.createElement('h2');
  const mensagem = document.createElement('p');
  const spinner = document.createElement('div');
  const btnCancelar = document.createElement('button');

  // Estilização do overlay (fundo escuro)
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  // Estilização do modal principal
  modal.style.cssText = `
    width: 80%;
    height: 60%;
    max-width: 800px;
    background-image: url('/static/assets/fundoModal.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #d72323;
    position: relative;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.4s ease-out;
  `;

  // Overlay escuro sobre a imagem para melhor contraste
  const fundoEscuro = document.createElement('div');
  fundoEscuro.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  `;
  modal.appendChild(fundoEscuro);

  // Container do conteúdo
  conteudo.style.cssText = `
    width: 80%;
    text-align: center;
    z-index: 1;
    color: white;
  `;

  // Texto principal
  texto.textContent = 'AGUARDANDO OPONENTE';
  texto.style.color = '#f5ed00';
  texto.style.fontSize = '2rem';
  texto.style.marginBottom = '1.5rem';
  texto.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
  texto.style.fontFamily = '"Arial Black", sans-serif';

  // Mensagem personalizada
  mensagem.innerHTML = `Olá <span style="color: #f5ed00;">${jogador1.nome}</span>, aguarde enquanto procuramos um oponente para você...`;
  mensagem.style.fontSize = '1.2rem';
  mensagem.style.marginBottom = '2rem';

  // Spinner de carregamento
  spinner.style.cssText = `
    border: 5px solid #f3f3f3;
    border-top: 5px solid #d72323;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
  `;

  // Botão de cancelar
  btnCancelar.textContent = 'CANCELAR';
  btnCancelar.style.padding = '12px 25px';
  btnCancelar.style.background = 'transparent';
  btnCancelar.style.color = '#FFFFFF';
  btnCancelar.style.border = '2px solid #d72323';
  btnCancelar.style.borderRadius = '8px';
  btnCancelar.style.cursor = 'pointer';
  btnCancelar.style.fontSize = '1rem';
  btnCancelar.style.fontWeight = 'bold';
  btnCancelar.style.transition = 'all 0.3s ease';

  // Efeitos hover do botão
  btnCancelar.onmouseover = () => {
    btnCancelar.style.background = '#d72323';
    btnCancelar.style.transform = 'scale(1.05)';
  };
  btnCancelar.onmouseout = () => {
    btnCancelar.style.background = 'transparent';
    btnCancelar.style.transform = 'scale(1)';
  };

  // Montagem da estrutura
  conteudo.appendChild(texto);
  conteudo.appendChild(mensagem);
  conteudo.appendChild(spinner);
  conteudo.appendChild(btnCancelar);
  modal.appendChild(conteudo);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Animação de entrada
  setTimeout(() => {
    modal.style.transform = 'translateY(0)';
    modal.style.opacity = '1';
  }, 10);

  // Adiciona animação do spinner
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Função para verificar se o jogador 2 entrou
  function verificarJogador2() {
    if (jogador2 !== null) {
      // Jogador 2 entrou, remove a tela de espera
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    } else {
      // Continua verificando a cada segundo
      setTimeout(verificarJogador2, 1000);
    }
  }

  // Inicia a verificação
  verificarJogador2();

  // Botão de cancelar
  btnCancelar.addEventListener('click', () => {
    location.href = "/fulldeck";
    // Aqui você pode adicionar lógica para cancelar a partida
  });

  // Impede fechar clicando fora
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      // Feedback visual que não pode sair
      modal.style.transform = 'translateX(10px)';
      setTimeout(() => modal.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => modal.style.transform = 'translateX(0)', 200);
    }
  });

  // Retorna a função para remover o modal manualmente se necessário
  return {
    close: () => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    }
  };
}

function mostrarTelaPartidaEncontrada(jogadorOponente) {
  // Cria os elementos do modal
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const conteudo = document.createElement('div');
  const texto = document.createElement('h2');
  const subtitulo = document.createElement('p');
  const timer = document.createElement('div');
  const btnCancelar = document.createElement('button');

  // Estilização do overlay (fundo escuro)
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  // Estilização do modal principal
  modal.style.cssText = `
    width: 80%;
    height: 60%;
    max-width: 800px;
    background-image: url('/static/assets/fundoModal.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #d72323;
    position: relative;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.4s ease-out;
  `;

  // Overlay escuro sobre a imagem para melhor contraste
  const fundoEscuro = document.createElement('div');
  fundoEscuro.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  `;
  modal.appendChild(fundoEscuro);

  // Container do conteúdo
  conteudo.style.cssText = `
    width: 80%;
    text-align: center;
    z-index: 1;
    color: white;
  `;

  // Texto principal
  texto.textContent = 'PARTIDA ENCONTRADA!';
  texto.style.color = '#f5ed00';
  texto.style.fontSize = '2rem';
  texto.style.marginBottom = '1.5rem';
  texto.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
  texto.style.fontFamily = '"Arial Black", sans-serif';

  // Subtítulo com nome do oponente
  subtitulo.innerHTML = `Seu adversário é: <span style="color: #f5ed00;">${jogadorOponente.nome}</span>`;
  subtitulo.style.fontSize = '1.5rem';
  subtitulo.style.marginBottom = '2rem';

  // Timer
  timer.textContent = 'A partida começará em 3...';
  timer.style.fontSize = '1.5rem';
  timer.style.marginBottom = '2rem';
  timer.style.color = '#d72323';
  timer.style.fontWeight = 'bold';

  // Botão de cancelar (opcional)
  btnCancelar.textContent = 'CANCELAR';
  btnCancelar.style.padding = '12px 25px';
  btnCancelar.style.background = 'transparent';
  btnCancelar.style.color = '#FFFFFF';
  btnCancelar.style.border = '2px solid #d72323';
  btnCancelar.style.borderRadius = '8px';
  btnCancelar.style.cursor = 'pointer';
  btnCancelar.style.fontSize = '1rem';
  btnCancelar.style.fontWeight = 'bold';
  btnCancelar.style.transition = 'all 0.3s ease';

  // Efeitos hover do botão
  btnCancelar.onmouseover = () => {
    btnCancelar.style.background = '#d72323';
    btnCancelar.style.transform = 'scale(1.05)';
  };
  btnCancelar.onmouseout = () => {
    btnCancelar.style.background = 'transparent';
    btnCancelar.style.transform = 'scale(1)';
  };

  // Montagem da estrutura
  conteudo.appendChild(texto);
  conteudo.appendChild(subtitulo);
  conteudo.appendChild(timer);
  conteudo.appendChild(btnCancelar);
  modal.appendChild(conteudo);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Animação de entrada
  setTimeout(() => {
    modal.style.transform = 'translateY(0)';
    modal.style.opacity = '1';
  }, 10);

  // Tocar efeito sonoro
  const audio = new Audio('/static/assets/Voicy_Surprised (DBZ Sound Effect).mp3');
  audio.play().catch(e => console.log("Autoplay não permitido:", e));

  // Contagem regressiva
  let count = 3;
  const countdown = setInterval(() => {
    count--;
    if (count > 0) {
      timer.textContent = `A partida começará em ${count}...`;
    } else {
      clearInterval(countdown);
      timer.textContent = 'Iniciando partida...';
      // Fechar o modal após um pequeno delay
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500);
    }
  }, 1000);

  // Botão de cancelar
  btnCancelar.addEventListener('click', () => {
    clearInterval(countdown);
    location.href = "/fulldeck";
  });

  // Impede fechar clicando fora
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      // Feedback visual que não pode sair
      modal.style.transform = 'translateX(10px)';
      setTimeout(() => modal.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => modal.style.transform = 'translateX(0)', 200);
    }
  });

  // Retorna a função para remover o modal manualmente se necessário
  return {
    close: () => {
      clearInterval(countdown);
      document.body.removeChild(overlay);
    }
  };
}

function mostrarTelaAguardandoSubstituicao(nomeJogador) {
  // Criação dos elementos principais
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const conteudo = document.createElement('div');
  const texto = document.createElement('h2');
  const mensagem = document.createElement('p');
  const spinner = document.createElement('div');

  // Overlay escurecido com blur
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  // Modal com fundo temático e entrada animada
  modal.style.cssText = `
    width: 80%;
    height: 60%;
    max-width: 800px;
    background-image: url('/static/assets/fundoModal.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 3px solid #d72323;
    position: relative;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.4s ease-out;
  `;

  // Escurecimento sobre imagem de fundo
  const fundoEscuro = document.createElement('div');
  fundoEscuro.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  `;
  modal.appendChild(fundoEscuro);

  // Conteúdo
  conteudo.style.cssText = `
    width: 80%;
    text-align: center;
    z-index: 1;
    color: white;
  `;

  texto.textContent = 'AGUARDANDO SUBSTITUIÇÃO';
  texto.style.cssText = `
    color: #f5ed00;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: "Arial Black", sans-serif;
  `;

  mensagem.innerHTML = `Aguardando <span style="color: #f5ed00;">${nomeJogador}</span> escolher uma nova carta ativa...`;
  mensagem.style.cssText = `
    font-size: 1.2rem;
    margin-bottom: 2rem;
  `;

  spinner.style.cssText = `
    border: 5px solid #f3f3f3;
    border-top: 5px solid #d72323;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  `;

  // Montagem
  conteudo.appendChild(texto);
  conteudo.appendChild(mensagem);
  conteudo.appendChild(spinner);
  modal.appendChild(conteudo);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Animação suave de entrada
  setTimeout(() => {
    modal.style.transform = 'translateY(0)';
    modal.style.opacity = '1';
  }, 10);

  // Spinner animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Retorno com controle manual de fechamento
  return {
    close: () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }
  };
}

function mostrarMenuSelecaoInicial(jogador, indexCartas, indexItens, nome, callback) {
  // Verifica se há índices de cartas válidos
  if (!indexCartas || indexCartas.length === 0) {
    showNotification("Erro: Nenhuma carta disponível no deck!", "error");
    return;
  }

  // Cria o overlay do modal
  const overlay = document.createElement('div');
  overlay.className = 'modal-selecao-inicial';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  // Estrutura do modal
  overlay.innerHTML = `
    <div style="
      background: #1a1a1a;
      padding: 20px;
      border-radius: 10px;
      border: 3px solid #f0c000;
      max-width: 90%;
      max-height: 90vh;
      overflow: hidden;
      text-align: center;
    ">
      <h2 style="color: #f0c000; margin-top: 0;">Selecione sua Carta Inicial</h2>
      <p style="color: #aaa;">Escolha o personagem que iniciará no campo ativo</p>
      
      <div style="margin: 15px 0;">
        <input type="text" id="filtro-cartas" placeholder="Buscar..." style="
          padding: 8px 12px;
          width: 80%;
          border-radius: 5px;
          border: 1px solid #444;
          background: #333;
          color: white;
        ">
      </div>
      
      <div id="cartas-container" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 15px;
        margin: 20px 0;
        max-height: 60vh;
        overflow-y: auto;
        padding: 10px;
      "></div>
    </div>
  `;

  const cartasContainer = overlay.querySelector('#cartas-container');
  const filtroInput = overlay.querySelector('#filtro-cartas');

  // Função para filtrar cartas enquanto o usuário digita
  filtroInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const cards = cartasContainer.querySelectorAll('.carta-item');
    
    cards.forEach(card => {
      const nomeCarta = card.getAttribute('data-nome').toLowerCase();
      card.style.display = nomeCarta.includes(termo) ? 'block' : 'none';
    });
  });

  // Adiciona cada carta do deck ao container
  indexCartas.forEach(index => {
    // Verifica se o índice é válido
    if (index < 0 || index >= bancoDeCartas.length) {
      console.warn(`Índice inválido: ${index}`);
      return;
    }

    const carta = bancoDeCartas[index];
    const card = document.createElement('div');
    card.className = 'carta-item';
    card.setAttribute('data-nome', carta.nome);
    
    card.style.cssText = `
      background: #2a2a2a;
      border: 2px solid #f0c000;
      border-radius: 8px;
      padding: 12px;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
    `;

    // Efeitos hover
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 5px 15px rgba(240, 192, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
      card.style.boxShadow = 'none';
    });

    // Conteúdo da carta
    card.innerHTML = `
      <h3 style="margin: 0 0 8px 0; color: #f0c000;">${carta.nome}</h3>
      <p style="margin: 5px 0; font-size: 0.9em;">Vida: ${carta.vida}/${carta.vidaMax}</p>
      ${carta.kiMax !== undefined ? `<p style="margin: 5px 0; font-size: 0.9em;">KI: ${carta.ki || 0}/${carta.kiMax}</p>` : ''}
      <div style="
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #444;
        font-size: 0.8em;
        color: #bbb;
      ">
        ${carta.passiva?.nome ? `<p><strong>Passiva:</strong> ${carta.passiva.nome}</p>` : ''}
      </div>
    `;

    // Ao clicar na carta
   card.addEventListener('click', () => {
  // Obtém o índice correto da carta selecionada no bancoDeCartas
      const indexSelecionado = bancoDeCartas.findIndex(c => c.nome === carta.nome);
    
      if (indexSelecionado === -1) {
        showNotification("Erro: Carta não encontrada no banco!", "error");
        return;
      }
      document.body.removeChild(overlay);
      if (jogador === jogador1) {
        jogador1 = criarJogador(
                  nome, 
                  indexCartas,
                  indexSelecionado,
                  indexItens
              );
      }
      else {
        jogador2 = criarJogador(
                  nome, 
                  indexCartas,
                  indexSelecionado,
                  indexItens
              );
      }
    });
    cartasContainer.appendChild(card);
  });

  // Adiciona o modal ao body
  document.body.appendChild(overlay);
}

// Função para criar jogador
function criarJogador(nome, indicesPersonagens, indiceCartaInicial, indicesItens = []) {
  // 1. Função de cópia profunda (mantida igual)
  const copiaProfunda = (obj) => {
    const copia = JSON.parse(JSON.stringify(obj));
    if (obj.golpes) {
      Object.keys(obj.golpes).forEach(nomeGolpe => {
        if (typeof obj.golpes[nomeGolpe].efeito === 'function') {
          copia.golpes[nomeGolpe].efeito = obj.golpes[nomeGolpe].efeito;
        }
      });
    }
    return copia;
  };

  // 2. Função de embaralhamento (mantida igual)
  const embaralharArray = (array) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  // 3. Processar PERSONAGENS (cartas não-itens)
  const cartasPersonagens = indicesPersonagens
    .map(i => copiaProfunda(deckCompleto.cartas[i]))
    .filter(carta => carta.tipo !== "Item");

  // 4. Processar ITENS (selecionados ou aleatórios)
  const itensValidos = indicesItens.length > 0
    ? indicesItens.map(i => {
      // Verifica se o índice é válido
      if (i >= 0 && i < deckCompleto.itens.length) {
        return copiaProfunda(deckCompleto.itens[i]);
      }
      console.warn(`Índice de item ${i} inválido!`);
      return null;
    }).filter(Boolean)
    : deckCompleto.itens
      .map(copiaProfunda)
      .filter(Boolean)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

  const deck = embaralharArray(itensValidos)

  // 5. Criar banco de luta (apenas personagens, excluindo a inicial)
  const bancoLuta = embaralharArray(
    cartasPersonagens.filter(carta =>
      carta.nome !== deckCompleto.cartas[indiceCartaInicial].nome
    )
  );

  // 6. Carta inicial
  const cartaInicial = copiaProfunda(deckCompleto.cartas[indiceCartaInicial]);

  const jogador = {
    nome,
    campoAtivo: [cartaInicial],
    bancoLuta,
    mao: [],
    deck: deck, // Itens escolhidos ou sorteados
        // Adiciona informações adicionais para o servidor
    personagens: indicesPersonagens,
    cartaInicial: indiceCartaInicial,
    itens: indicesItens,
    timestamp: Date.now()
  };

  conectarASala(jogador.nome);
  jogadorTemporario = jogador;
    
    // Atualiza a variável local imediatamente
    if (!jogador1) {
        jogador1 = jogador;
    } else {
        jogador2 = jogador;
    }
  
  // Opcional: escute a confirmação do servidor
  socket.on('jogador_registrado', (data) => {
    console.log(`Jogador ${data.nome} registrado com sucesso no servidor!`);
  });
  
  socket.on('erro', (erro) => {
    console.error("Erro no servidor:", erro);
  });

  return jogador;
}
/** 
const jogador1 = criarJogador(
  "brazilian tenz",
  [1, 17, 22, 24, 3],
  3,
  [],
);

// Jogador 2 começa com Goku Instinto no campo e Cell/Hit no banco
const jogador2 = criarJogador(
  "joao of gremio",
  [24, 25, 9, 8, 14, 21], // Índices das cartas
  26,
  [],
);
*/

function animacoesAtaques(golpe, defensor, func1, func2) {
  const animacaoDiv = document.getElementById("animacaoFinal");
  const fade = document.getElementById("fadeTela");
  const video = document.getElementById("videoAnimacao");

  // Define qual vídeo usar com base no nome do golpe
  let caminhoVideo = "";

  if (golpe.nome === "Assasinato Furtivo" && defensor.nome.includes("Vegeta")) {
    caminhoVideo = "/static/assets/animations/hittto eliminando vegeta.mp4";
    videoConcluido = true
  } 
  else if (golpe.nome === "Genki Dama" && defensor.nome.includes("Jiren")) {
    caminhoVideo = '/static/assets/animations/genkidama x jiren.mp4'
    videoConcluido = true
  }
  else if(golpe.nome === "Golpe de Energia Pura" && defensor.nome.includes("Hitto")) {
    caminhoVideo = '/static/assets/animations/jiren eliminando hitto.mp4'
    videoConcluido = true
  }
  else if(golpe.nome === 'Tempestade de Lâminas' && defensor.nome.includes('Freeza')) {
    caminhoVideo = '/static/assets/animations/trunks tempestade de laminas.mp4'
      videoConcluido = true
  }
  else if(golpe.nome === 'Galick Gun' && defensor.nome.includes('Black')) {
    caminhoVideo = '/static/assets/animations/galick gun trunks.mp4'
      videoConcluido = true
  }
  else if(golpe.nome === "Espada de Energia Rosê" && defensor.nome.includes("Goku")) {
    caminhoVideo = '/static/assets/animations/execução goku black.mp4'
      videoConcluido = true
  }
  else if (golpe.nome === "Kamehameha Pai e Filho" && defensor.nome.includes("Cell")) {
    caminhoVideo = '/static/assets/animations/kamehameha pai e filho.mp4'
      videoConcluido = true
  }
  else {
    func1()
    func2()
    return; // Sem animação definida para esse golpe
  }

  // Configura o vídeo e mostra a tela
  video.src = caminhoVideo;

  // Inicia com a tela preta visível (fade-in para preto)
  fade.style.opacity = "1";

  // Espera o fade escurecer, então exibe o vídeo com fade-out (fade-in para vídeo)
  setTimeout(() => {
    animacaoDiv.style.display = "flex";
    fade.style.opacity = "0";
  }, 500); // ajuste se quiser mais ou menos tempo de fade-in

  // Quando o vídeo terminar
  video.onended = () => {
    // Faz fade-out da tela novamente
    fade.style.opacity = "1";

    // Depois do fade, esconde tudo
    setTimeout(() => {
      animacaoDiv.style.display = "none";
      video.src = "";
      fade.style.opacity = "0"; // limpa o fade para o próximo uso
    }, 1500); // tempo do fade-out
    func1()
    func2()
  };
}


// Função para executar um ataque
function atacar(Jatacante, Jdefensor, golpe, usarChiChi = false) {
  //#region Verificações ataques
  verificarModalAberto();
  const atacante = Jatacante.campoAtivo[0]
  const defensor = Jdefensor.campoAtivo[0]

  const jogadorAlvo = Jatacante

  if (usarChiChi) {
    return atacarComChiChi(Jatacante, golpe);
  }

    if (jogadorAtual != jogadorSelecionado) {
    showNotification(" é a vez de outro jogador!", "error");
    return;
  }

  if (golpe.cura) {
    return usarAtaqueCura(atacante, defensor, golpe);
  }

  if (!defensor) {
    showNotification("Erro: Nenhum defensor no campo!", "error");
    console.log("Erro: Nenhum defensor no campo!");
    return;
  }

  if (jogadorAlvo.acoesTurno >= 2 && !atacante.passiva?.quebrarLimitador) {
    showNotification(`[${jogadorAlvo.nome}] já usou todas as suas ações de ataque este turno.`, "warning");
    return;
  }

  if (atacante.vida <= 0) {
    showNotification(`${atacante.nome} está fora de combate e não pode atacar!`, "error");
    return;
  }

  if (defensor.vida <= 0 && !defensor.nome === "Trunks") {
    return;
  }

  if (defensor.vida <= 0 && defensor.passiva.esperancaSayajin === false) {
    return
  }

  if (!golpe) {
    showNotification(`Erro: golpe indefinido para ${atacante.nome}`, "error");
    return;
  }

  if (atacante.atordoamento === true) {
    showNotification(`${atacante.nome} está atordoado e não pode atacar este turno`, "warning");
    return;
  }

  if (atacante.jaulaTempo) {
    showNotification(`${atacante.nome} não pode atacar, pois está preso na Jaula do Tempo! ⏳`, "warning");
    return;
  }

  if (atacante.chocolate) {
    showNotification(`Um chocolate não pode atacar.`);
    return;
  }

  if (golpe.nome === "Explosão da Ira" && atacante.vida > (atacante.vidaMax / 2)) {
    showNotification(`${atacante.nome} deve estar abaixo de 50% de vida para usar ${golpe.nome}`, "warning");
    return;
  }

  if (golpe.contagem > 0) {
    showNotification(`${golpe.nome} está em recarga. Turnos restantes: ${golpe.contagem}`, "warning");
    return;
  }

  let ataqueConcluido = false;
  let efeitos = {};
  atacante.ki -= golpe.custoKi;

  function gerarCartaRobotica(bancoRobos) {  // Recebe o banco de robôs do atacante
    const robosDisponiveis = Object.keys(bancoRobos);  // Pega os nomes das cartas (ex: "mechaPilaf", "techEye")
    const roboEscolhido = robosDisponiveis[Math.floor(Math.random() * robosDisponiveis.length)];
    return { ...bancoRobos[roboEscolhido] };  // Retorna uma CÓPIA da carta
  }

  function criarMaquina(atacante, jogadorAlvo) {
    if (!atacante.cartasRoboticas) return false; // Retorna false se não puder gerar

    // Verifica se a mão está cheia
    if (jogadorAlvo.mao.length >= 10) {
      showNotification(`[${jogadorAlvo.nome}] está com a Mão cheia! (10/10) não é possível gerar cartas robóticas.`, "warning");
      return false; // Indica que a criação falhou
    }

    const novaCarta = gerarCartaRobotica(atacante.cartasRoboticas);
    jogadorAlvo.mao.push(novaCarta);
    showNotification(`${atacante.nome} criou ${novaCarta.nome} na mão de ${jogadorAlvo.nome}`, "success");
    ataqueConcluido = true;
    efeitos.itemAdicionado = {
      Jmao: jogadorAlvo.mao
    };
    return true; // Indica sucesso
  }

  // Na função atacar():
  if (golpe.nome === "Criação de Máquinas") {
    const criacaoBemSucedida = criarMaquina(atacante, jogadorAlvo);

    // Só aplica recarga se a carta foi gerada com sucesso
    if (criacaoBemSucedida && golpe.recarga > 0) {
      golpe.contagem = golpe.recarga;
      showNotification(`${golpe.nome} entrou em recarga (${golpe.contagem} turnos)`, "warning");
      jogadorAlvo.acoesTurno++
    } else {
      return
    }
  }

  // Tratamento da Jaula do Tempo
  if (golpe.efeito === "jaulaTempo") {
    if (golpe.contagem > 0) {
      showNotification(`${golpe.nome} está em recarga. Turnos restantes: ${golpe.contagem}`, "warning");
      return;
    }

    if (!defensor.passiva?.principeSayajin && !defensor.imunidade) {
      defensor.jaulaTempo = golpe.duracao;
      showNotification(`⏳ ${atacante.nome} prendeu ${defensor.nome} na Jaula do Tempo!`, "success");
      jogadorAlvo.acoesTurno++;
      efeitos.debuffs = {
        jaulaTempo: true,
        duracao: golpe.duracao
      };
    } else {
      showNotification(`${atacante.nome} usou ${golpe.nome}, mas ${defensor.nome} não pode ser afetado por isso.`, "warning");
      jogadorAlvo.acoesTurno++;
      efeitos.bloqueadosImunidade = defensor.nome
    }
    golpe.contagem = golpe.recarga
    ataqueConcluido = true;
  }

  if (golpe.nome === "Transformação Doce") {
    if (golpe.uso === true) {
      showNotification('Majin boo já utilizou transformação doce nesta forma.', "warning");
      return
    } else {
    if (!defensor.passiva?.principeSayajin && !defensor.imunidade) {
      defensor.chocolate = true
      defensor.chocolateDuracao = golpe.atordoamento
      golpe.uso = true
      jogadorAlvo.acoesTurno++;
      showNotification(`${defensor.nome} foi transformado em chocolate por 3 turnos!`, "success");
      efeitos.debuffs = {
        chocolate: true,
        chocolateDuracao: golpe.atordoamento
      };
    } else {
      showNotification(`${atacante.nome} usou ${golpe.nome}, mas ${defensor.nome} não pode ser afetado por isso.`, "warning");
      jogadorAlvo.acoesTurno++;
      efeitos.bloqueadosImunidade = defensor.nome
    }
    ataqueConcluido = true;
    }
  }

  // --- SE O GOLPE CRIA UM ESCUDO ---
  if (golpe.escudo) {
    if (atacante.escudo) {
      showNotification(`⚠️ ${atacante.nome} já tem um escudo ativo!`, "warning");
      return;
    }

    // Inicializa o escudo
    atacante.escudo = {
      tipo: golpe.escudo.tipo,
      valor: golpe.escudo.valor, // Valor total (ex.: 500)
      valorMax: golpe.escudo.valor,
      vidaAtual: golpe.escudo.valor // Vida atual do escudo (começa cheia)
    };

    const escudo = {
      tipo: golpe.escudo.tipo,
      valor: golpe.escudo.valor, // Valor total (ex.: 500)
      valorMax: golpe.escudo.valor,
      vidaAtual: golpe.escudo.valor // Vida atual do escudo (começa cheia)
    };
    showNotification(`🛡️ ${atacante.nome} ativou ${golpe.nome}! Agora possui um escudo ativo.`, "success");
    jogadorAlvo.acoesTurno++
    efeitos.buffs = { escudo: escudo };
    ataqueConcluido = true;
  }

  if (golpe.nome === "Defesa Perfeita/Contra Ataque") {
    atacante.absorvido = 0;
    atacante.contraAtaque = false;

    showNotification(`${atacante.nome} absorverá o próximo ataque recebido!`, "success");

    const android18 = Jatacante.bancoLuta.find(carta => carta.nome === "Androide 18");
    if (android18) {
      showNotification(`Androide 18 aprimora a defesa perfeita de Androide 17!`, "success");
      showNotification(`Androide 17 agora refletirá 100% do próximo ataque recebido.`);
      atacante.contraAtaque = true;
    }

    jogadorAlvo.acoesTurno++;
    ataqueConcluido = true;

    efeitos.buffs = {
      defesaperfeita: true,
      contraAtaque: atacante.contraAtaque
    };
  }

  if (golpe.nome === "Regeneração Total") {
      if (atacante.vida >= (atacante.vidaMax / 2)) {
        showNotification(`${atacante.nome} tentou usar Regeneração total, mas está acima do custo de vida necessário`, "warning");
        return;
      }
      if (atacante.passiva.regenerou === true) {
        showNotification(`${atacante.nome} já usou regeneração total, e não pode usá-la novamente.`, "warning");
        return;
      } else {
        atacante.vida = atacante.vidaMax; // Regenera a vida de Cell
        atacante.passiva.regenerou = true; // Impede regeneração múltipla
        showNotification(`${atacante.nome} usou ${golpe.nome} e regenerou toda sua vida!`, "success");
        jogadorAlvo.acoesTurno++
        efeitos.buffs = "regenTotal"
        ataqueConcluido = true;
      }
  }
  
  if (golpe.nome === "Manipulação do Tempo") {
    fecharCarta();

    atacante.vida = atacante.vidaMax;
    atacante.ki = 0;
    atacante.inativoPorTurno = 3;
    atacante.passiva.acumulos = 0;

    const gokuBlack = jogadorAlvo.campoAtivo.pop();
    jogadorAlvo.mao.push(gokuBlack);

    showNotification(`${atacante.nome} manipulou o tempo e saiu do campo com a vida cheia!`, "success");

    jogadorAlvo.acoesTurno++;
    ataqueConcluido = true;

      setTimeout(() => {
        substituirCartaDerrotada(jogadorAlvo);
      }, 500);

    efeitos.manipulacaoTempo = {
      Jmao: jogadorAlvo.mao,
      manipulacaoTempo: true
    }
  }
  
    if (golpe.nome === "Onda Maléfica") {
      atacante.ki = Math.min(atacante.ki + 5000, atacante.kiMax)
      showNotification("Super Boo gerou 5000 de ki com Onda Maléfica!", "success");
      golpe.contagem = golpe.recarga
      showNotification(`${golpe.nome} agora está em recarga durante ${golpe.contagem} turnos.`, "warning");
      jogadorAlvo.acoesTurno++
      efeitos.buffs = {
        restaurarKi: atacante.ki,
        kiGanho: 5000
      }
      ataqueConcluido = true
    }
  
    if (golpe.nome === "Juízo Imperial") {
      atacante.lifeSteal = 0.5
      atacante.duracaoJuizo = 3
      showNotification(`Freeza Dourado passa a se curar em 50% do dano causado durante 3 turnos!`, "success");
      golpe.contagem = golpe.recarga
      showNotification(`${golpe.nome} agora está em recarga durante ${golpe.contagem} turnos.`, "warning");
      jogadorAlvo.acoesTurno++
      efeitos.buffs = {
        juizoimperial: true,
        lifeSteal: atacante.lifeSteal,
        duracaoJuizo: atacante.duracaoJuizo
      };
      ataqueConcluido = true
    }
  
    if (golpe.buffKi) {
      atacante.buffKiExtra = golpe.buffKi
      atacante.duracaoKi = golpe.duracao
      showNotification(`${atacante.nome} aumentou seus acumulos de ki em ${golpe.buffKi} durante ${golpe.duracao} turnos!`, "success");
      jogadorAlvo.acoesTurno++
      if (golpe.buffDano) {
        atacante.buffDanoExtra = golpe.buffDano
        atacante.duracaoDano = golpe.duracao
        showNotification(`${atacante.nome} aumentou seu dano em ${golpe.buffDano} durante ${golpe.duracao} turnos!`, "success");
      }
      efeitos.buffStatus = {
        buffKiExtra: atacante.buffKiExtra,
        duracaoKi: atacante.duracaoKi,
        buffDanoExtra: atacante.buffDanoExtra || 0,
        duracaoDano: atacante.duracaoDano || 0
      };
      ataqueConcluido = true
      if (golpe.recarga) {
        golpe.contagem = golpe.recarga
        showNotification(`${golpe.nome} agora está em recarga durante ${golpe.contagem} turnos.`, "warning");
      }
    }

  let golpesRestantes = golpe.golpes ?? 1; // Usa 1 como padrão se golpes não existir

  if (defensor.passiva?.esquiva > 0 && defensor.ki >= 1000) {
    defensor.ki -= 1000;
    defensor.passiva.esquiva -= 1;

    efeitos.esquivaInstinto = {
      golpesAnulados: golpe.golpes ?? 1 > 1 ? 1 : golpe.golpes,
    };

    if (golpesRestantes > 1) {
      showNotification(`${defensor.nome} canalizou 1000 de ki e se esquivou do primeiro ataque de ${golpe.nome}!`, "warning");
      golpesRestantes -= 1;
    } else {
      showNotification(`${defensor.nome} canalizou 1000 de ki e se esquivou do ataque ${golpe.nome}!`, "warning");
      jogadorAlvo.acoesTurno++;
      ataqueConcluido = true;  // <- isso é importante!
      efeitos.esquivaInstinto = {
        golpesAnulados: "todos"
      };
    }
  }

    if (ataqueConcluido) {
      socket.emit('ataque_realizado', {
        jogador: Jatacante.nome,
        JogadorAtacante: Jatacante,
        JogadorDefensor: Jdefensor,
        atacante: atacante,
        defensor: defensor,
        golpe: golpe,
        efeitos: efeitos,
        kiGasto: golpe.custoKi,
        sala_id: "sala1",
        origem: socket.id
      });
      console.log("Ataque concluído! Enviando dados... (Tentativa 1)");
      return;
    }

  if (golpe.nome === "Abalo Sísmico") {
    function abaloSismico(defensor) {
      if (defensor.escudo) {
        delete defensor.escudo
        showNotification(`${atacante.nome} destruiu o escudo de ${defensor.nome}!`, "success");
      }
    }
    abaloSismico(defensor)
    efeitos.debuffs = {
      abaloSismico: true
    };
  }

  if (golpe.atordoamento) {
    if (!defensor.passiva?.principeSayajin && !defensor.imunidade) {
      defensor.atordoamento = true
      defensor.rodadas = golpe.atordoamento
      showNotification(`${defensor.nome} foi atordoado por ${golpe.atordoamento} turnos!`, "success");
      efeitos.debuffs = {
        atordoamento: golpe.atordoamento
      }
    } else {
      showNotification(`${defensor.nome} não pode ser afetado por atordoamento!`, "warning");
      efeitos.bloqueadosImunidade = defensor.nome
    }
  }

  // Se o golpe for "Explosão da Ira", verifica as condições
  if (golpe.nome === "Explosão da Ira") {
    // Usa danoArmazenado + acumulos (se existirem)
    golpe.dano = golpe.danoArmazenado;
  }

  // TRATATIVA INSTINTO PREDADOR - CELL (JOSÉ)
  if (golpe.nome === "Instinto Predador" && atacante.vida > defensor.vida) {
    atacante.acumulos += 50;
    showNotification(`${atacante.nome} caçou uma presa com menos vida que ele, aumentando seu dano em 50!`, "success");
  }

  if (golpe.nome === "Golpe do Orgulho") {
    atacante.acumulos += defensor.vidaMax * 0.1;
    showNotification(`${atacante.nome} causa ${defensor.vidaMax * 0.1} de dano adicional! (vida maxima de ${defensor.nome}: ${defensor.vidaMax})`, "success");
  }

  if (atacante.nome === "Hitto" && defensor.vida < defensor.vidaMax * 0.5) {
    atacante.acumulos += 150;
    showNotification(`Hitto anseia por executar seu alvo com menos de 50% de vida, causando 150 de dano adicional.`)
  }

  if (atacante.nome === "Freeza Dourado") {
    if (defensor.vida < defensor.vidaMax * 0.5) {
      atacante.acumulos += 200;
      atacante.acumulos += (golpe.dano + 200) * (0.1 * Jdefensor.bancoLuta.length);
      showNotification(`Freeza Dourado está próximo de esmagar um inseto, recebendo 200 de dano adicional.`, "success");
      showNotification(`Freeza Dourado recebe 10% de dano adicional por cada inimigo no banco.`, "success");
    } else {
      atacante.acumulos += golpe.dano * (0.1 * Jdefensor.bancoLuta.length);
      showNotification(`Freeza Dourado recebe 10% de dano adicional por cada inimigo no banco.`, "success");
    }
  }

  if (golpe.nome === "Explosão de Fúria") {
    atacante.acumulos += 100 * golpe.stacks
    showNotification(`Super Boo causa ${100 * golpe.stacks} de dano adicional nesta ${golpe.nome}!`, "success");
    golpe.stacks++;
  }

  if (golpe.nome === "Rajada da Determinação") {
    atacante.acumulos += 25 * golpe.stacks
    showNotification(`Gohan SSJ 2 causa ${25 * golpe.stacks} de dano adicional nesta ${golpe.nome}!`, "success");
    golpe.stacks++;
  }

  if (golpe.nome === "Kamehameha Pai e Filho") {
    const goku = Jatacante.bancoLuta.find(carta => carta.nome === "Goku" || carta.nome === "Goku Instinto Superior" || carta.nome === "Goku SSJ Azul" || carta.nome === "Goku SSJ")
    if (goku) {
      atacante.acumulos += 300
      showNotification(`Gohan usa Kamehameha Pai e Filho, causando 300 de dano adicional!`, "success");
    }
  }

  if (golpe.nome === "Disparo em Rajadas/Salva Energética") {
    const android17 = Jatacante.bancoLuta.find(carta => carta.nome === "Androide 17");
    if (android17) {
      showNotification(`Androide 17 aprimora o Disparo em Rajadas de Androide 18!`, "success");
      showNotification(`Androide 18 agora causará 25 de dano adicional em cada disparo.`, "success");
      atacante.acumulos += 25
    }
  }

  if (golpe.nome === "Punho de Luz/Impacto do Caos") {
    const android17 = Jatacante.bancoLuta.find(carta => carta.nome === "Androide 17");
    if (android17) {
      showNotification(`Androide 17 aprimora o Punho de Luz de Androide 18!`);
      showNotification(`+2500 de Ki para ambos e cura em 50% do dano causado.`);
      android17.ki = Math.min(android17.ki + 2500, android17.kiMax)
      atacante.ki = Math.min(atacante.ki + 2500, atacante.kiMax)
      atacante.lifeSteal += 0.35
      atacante.curaBuffada = true
      efeitos.buffs = {
        androide17: android17.ki,
        androide18: atacante.ki
      }
    }
  }

  if (golpe.nome === "Bola de Energia/Destruição Amplificada") {
    const android18 = Jatacante.bancoLuta.find(carta => carta.nome === "Androide 18");
    if (android18) {
      showNotification(`Androide 18 aprimora a Bola de Energia de Androide 17!`);
      golpe.danoAleat = 100;
      golpe.buffado = true;
    }
  }

  let danoBase = golpe.dano ?? 0; // Garante que danoBase não seja undefined

  if (atacante.nome === "Bills") {
    const vidaPerdida = Math.floor(defensor.vidaMax - defensor.vida);
    const percentualVidaPerdida = Math.floor((vidaPerdida / defensor.vidaMax) * 100);
    const acumulos = Math.floor(percentualVidaPerdida * 4);
    danoBase += acumulos;
  }

  if (golpe.nome === "Julgamento Celeste") {
    danoBase = defensor.vidaMax * 0.1;
  }

  // Soma acúmulos da passiva, se existirem
  if (atacante.passiva?.acumulos > 0) {
    danoBase += atacante.passiva.acumulos;
  }

  // Soma acúmulos externos, se existirem
  if (atacante.acumulos > 0) {
    danoBase += atacante.acumulos;
  }

  if (atacante.passiva.iraAcumulada > 0) {
    danoBase += atacante.passiva.iraAcumulada;
  }

  if (atacante.danoAument > 0) {
    danoBase += atacante.danoAument;
  }

  if (atacante.buffDanoExtra > 0) {
    danoBase += atacante.buffDanoExtra;
  }

  if (atacante.DanoTemporario > 0 ?? 0) {
    danoBase += atacante.DanoTemporario;
  }

  if (atacante.escudo?.buffEscudo) {
    danoBase += atacante.escudo.buffEscudo
  }

  // Multiplica pelo número de golpes (padrão é 1 se não existir)
  let danoTotal = danoBase * golpesRestantes;

  // 1. Verifica ABSORÇÃO primeiro
  if (defensor.absorvido === 0) {
    defensor.absorvido += danoTotal;

    efeitos.defesaAndroide = {
      contraAtaque: false
    }

    if (defensor.contraAtaque) {
      const danoRefletido = calcularDanoComEscudo(defensor, atacante, defensor.absorvido);
      atacante.vida -= danoRefletido;
      showNotification(`${defensor.nome} refletiu ${danoRefletido} de dano!`, "error");
      delete efeitos.defesaAndroide.absorvido
      efeitos.defesaAndroide = {
        contraAtaque: true,
        danoRefletido: danoRefletido,
      }
    } else {
      showNotification(`${defensor.nome} ignorou ${danoTotal} de dano!`, "error");
    }

    delete defensor.absorvido;
    delete defensor.contraAtaque;
  }
  // 2. Só aplica dano se NÃO absorvido
  else if (!defensor.absorvido) {
    const danoReal = calcularDanoComEscudo(atacante, defensor, danoTotal);
    defensor.vida -= danoReal;
    showNotification(`${atacante.nome} atacou com ${golpe.nome}, causando ${danoReal} de dano em ${defensor.nome}!`, "success");

    // Se Vegeta for atacado, aumenta seu dano futuro e armazena o dano sofrido
    if (defensor.nome === "Vegeta Ego Superior") {
      defensor.golpes.explosaoDaIra.danoArmazenado += danoReal * 0.5;
      defensor.passiva.acumulos = Math.min(defensor.passiva.acumulos + 50, 1000);
      showNotification(`${defensor.nome} sofreu dano! o dano de seus ataques aumenta em 50. dano atual: ${defensor.passiva.acumulos}`, "warning");
      showNotification(`${defensor.nome} sofreu dano! metade do dano sofrido é armazenado. dano atual: ${defensor.golpes.explosaoDaIra.danoArmazenado}`, "warning");
      efeitos.buffVegeta = {
        passiva: defensor.passiva.acumulos,
        danoArmazenado: defensor.golpes.explosaoDaIra.danoArmazenado
      }
    }
  }

  const audio = new Audio('/static/assets/Melee Impact.mp4');
  audio.play().catch(e => console.log("Autoplay não permitido:", e));

  if (golpe.nome === "Julgamento Celeste") {
    atacante.vida = Math.min(atacante.vida + danoReal, atacante.vidaMax);
    showNotification(`${atacante.nome} recebeu ${danoReal} de vida adicional!`, "success");
    efeitos.curaBlack = {
      cura: danoReal
    };
  }

        //#endregion

  if (golpe.danoAleat) {
    const oponente = Jdefensor

    if (oponente.bancoLuta.length > 0) {
      const defensor = oponente.bancoLuta[Math.floor(Math.random() * oponente.bancoLuta.length)];

      let danoBase = golpe.danoAleat ?? 0; // Garante que danoBase não seja undefined

      // Soma acúmulos da passiva, se existirem
      if (atacante.passiva?.acumulos > 0) {
        danoBase += atacante.passiva.acumulos;
      }

      // Soma acúmulos externos, se existirem
      if (atacante.acumulos > 0) {
        danoBase += atacante.acumulos;
      }

      if (atacante.passiva.iraAcumulada > 0) {
        danoBase += atacante.passiva.iraAcumulada;
      }

      if (atacante.danoAument > 0) {
        danoBase += atacante.danoAument;
      }

      if (atacante.DanoTemporario > 0 ?? 0) {
        danoBase += atacante.DanoTemporario;
      }

      if (atacante.escudo?.buffEscudo) {
        danoBase += atacante.escudo.buffEscudo
      }

      // Multiplica pelo número de golpes (padrão é 1 se não existir)
      let danoTotal = danoBase * golpesRestantes;

      if (defensor.absorvido === 0) {
        defensor.absorvido += danoTotal;
        showNotification(`${defensor.nome} ignorou ${danoTotal} de dano!`, "success");

            efeitos.defesaAndroide = {
              contraAtaque: false
            }

        if (defensor.contraAtaque) {
          const danoRefletido = calcularDanoComEscudo(defensor, atacante, defensor.absorvido);
          atacante.vida -= danoRefletido;
          showNotification(`${defensor.nome} refletiu ${danoRefletido} de dano!`, "success");
          delete efeitos.defesaAndroide.absorvido
          efeitos.defesaAndroide = {
            contraAtaque: true,
            danoRefletido: danoRefletido,
          }
        }

        delete defensor.absorvido;
        delete defensor.contraAtaque;
      }
      // 2. Só aplica dano se NÃO absorvido
      else if (!defensor.absorvido) {
        const danoReal = calcularDanoComEscudo(atacante, defensor, danoTotal);
        defensor.vida -= danoReal;
        showNotification(`${atacante.nome} causou ${danoReal} de dano a ${defensor.nome} no banco tambem! vida atual:(${defensor.vida}/${defensor.vidaMax})`, "success");
        efeitos.danoAleat = {
          alvo: defensor.nome,
          dano: danoTotal,
        }
      }

      // APLICA ROUBO DE VIDA DO ATACANTE
      if (atacante.lifeSteal > 0) {
        const cura = Math.floor(danoTotal * atacante.lifeSteal);
        atacante.vida = Math.min(atacante.vida + cura, atacante.vidaMax); // Não ultrapassa o máximo
        showNotification(`${atacante.nome} roubou ${cura} de vida!`, "success");
            efeitos.lifeSteal = {
      cura: cura
    }
        }

        if (defensor.nome === "Vegeta Ego Superior") {
          defensor.golpes.explosaoDaIra.danoArmazenado += danoReal * 0.5;
          defensor.passiva.acumulos = Math.min(defensor.passiva.acumulos + 50, 1000);
          showNotification(`${defensor.nome} sofreu dano! o dano de seus ataques aumenta em 50. dano atual: ${defensor.passiva.acumulos}`, "warning");
                efeitos.buffVegeta = {
        passiva: defensor.passiva.acumulos,
        danoArmazenado: defensor.golpes.explosaoDaIra.danoArmazenado
      }
        }

        if (defensor.vida <= 0 && defensor.passiva?.esperancaSayajin === true) {
          defensor.passiva.esperancaSayajin = false;
          defensor.vida = defensor.vidaMax;
          defensor.ki = 0
          showNotification(`${defensor.nome} retrocede no tempo antes de sua morte, e retorna a mão de ${Jdefensor.nome}!`, "success");
          const trunks = Jdefensor.campoAtivo.pop();
          Jdefensor.mao.push(trunks);
              efeitos.esperancaSayajin = {
      esperancaSayajin: true
    }
        }

        if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Trunks" && defensor.vida > 0) {
          defensor.passiva.acumulos = 50
          showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em 50!`, "warning");
              efeitos.trunks = {
      defensorAcumulos: defensor.passiva.acumulos 
    }
        }
      
        if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Gohan SSJ 2" && defensor.vida > 0) {
          if (defensor.passiva.aumentou === false) {
            defensor.passiva.acumulos += 100
            showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em +100!`, "warning");
            defensor.passiva.aumentou = true
                  efeitos.gohan = {
        gohanAcumulos: 100
      }
          }
        }
      
        if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.nome === "Kuririn") {
          defensor.escudo.valor = 100
          showNotification(`${defensor.nome} esta abaixo de 50% de vida, sua resistência aumenta para 100 pontos.!`);
              efeitos.kuririn = {
      valorEscudo: 100
    }
        }

        if (defensor.nome === "Goku SSJ Azul" && defensor.vida < defensor.vidaMax * 0.5) {
            if (defensor.vida > 0) {
              defensor.lifeSteal = 0.2
              defensor.passiva.acumulos = 100
              showNotification(`${defensor.nome} está abaixo de 50% de vida, sua Determinação Sayajin está ativa!`, "warning");
              showNotification("Dano aumentado em 100 e cura em 20% do dano causado.", "warning");
                    efeitos.ssjBlue = {
        lifeSteal: 0.2,
        acumulos: 100
      }
            }
          }

        if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.vida > 0 && defensor.passiva?.orgulhoSayajin === false) {
          defensor.escudo = {
            tipo: defensor.passiva.escudo.tipo,
            valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
            valorMax: defensor.passiva.escudo.valor,
            vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
          };
              efeitos.orgulhoSayajin = {
      escudo: {
              tipo: defensor.passiva.escudo.tipo,
              valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
              valorMax: defensor.passiva.escudo.valor,
              vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
      }
      }
          showNotification(`${defensor.nome} está abaixo de 50% de vida, e recebe um escudo de ${defensor.escudo.valor} pontos!`, "warning");
          defensor.passiva.orgulhoSayajin = true
        }
     
    }
  }

  if (golpe.danoGlobal) {
    oponente = adversario

    if (oponente.bancoLuta.length > 0) {
      const defensores = oponente.bancoLuta;

      let danoBase = golpe.danoGlobal ?? 0; // Garante que danoBase não seja undefined

      // Soma acúmulos da passiva, se existirem
      if (atacante.passiva?.acumulos > 0) {
        danoBase += atacante.passiva.acumulos;
      }

      // Soma acúmulos externos, se existirem
      if (atacante.acumulos > 0) {
        danoBase += atacante.acumulos;
      }

      if (atacante.danoAument > 0) {
        danoBase += atacante.danoAument;
      }

      if (atacante.DanoTemporario > 0 ?? 0) {
        danoBase += atacante.DanoTemporario;
      }

      if (atacante.escudo?.buffEscudo) {
        danoBase += atacante.escudo.buffEscudo
      }

      // Multiplica pelo número de golpes (padrão é 1 se não existir)
      let danoTotal = danoBase * golpesRestantes;

      defensores.forEach(defensor => {
        if (defensor.vida <= 0) return;
        // 1º - Verifica SE DEVE ABSORVER (prioridade máxima)
        if (defensor.absorvido === 0) {
          defensor.absorvido += danoTotal;
          showNotification(`${defensor.nome} ignorou ${danoTotal} de dano!`, "warning");

                      efeitos.defesaAndroide = {
              contraAtaque: false
            }

          // Contra-ataque (se habilitado)
          if (defensor.contraAtaque === true) {
            const danoRefletido = calcularDanoComEscudo(defensor, atacante, defensor.absorvido);
            atacante.vida -= danoRefletido;
            showNotification(`⚡ ${defensor.nome} refletiu ${danoRefletido} de dano!`, "warning");
                      efeitos.defesaAndroide = {
            contraAtaque: true,
            danoRefletido: danoRefletido,
          }
          }

          delete defensor.absorvido;
          delete defensor.contraAtaque;
        }
        // 2º - Só aplica dano se NÃO estiver absorvendo
        else if (!defensor.absorvido) {
          const vidaPerdida = Math.floor(defensor.vidaMax - defensor.vida);
          const percentualVidaPerdida = Math.floor((vidaPerdida / defensor.vidaMax) * 100);
          const acumulos = Math.floor(percentualVidaPerdida * 4);

          danoTotal += acumulos;

          const danoReal = calcularDanoComEscudo(atacante, defensor, danoTotal);

          efeitos.danoGlobal = {
            dano: danoTotal
          }

          // Aplica o dano
          defensor.vida -= danoReal;
          showNotification(`💥 ${golpe.nome} causou ${danoReal} de dano em ${defensor.nome}! (${defensor.vida}/${defensor.vidaMax})`, "success");

          // Life Steal (se houver)
          if (atacante.lifeSteal > 0) {
            const cura = Math.floor(danoReal * atacante.lifeSteal);
            atacante.vida = Math.min(atacante.vida + cura, atacante.vidaMax);
            showNotification(`❤️ ${atacante.nome} roubou ${cura} de vida!`, "success");
                        efeitos.lifeSteal = {
      cura: cura
    }
          }

          if (defensor.nome === "Vegeta Ego Superior") {
            defensor.golpes.explosaoDaIra.danoArmazenado += danoReal * 0.5;
            defensor.passiva.acumulos = Math.min(defensor.passiva.acumulos + 50, 1000);
            showNotification(`${defensor.nome} sofreu dano! o dano de seus ataques aumenta em 50. dano atual: ${defensor.passiva.acumulos}`, "warning");
                            efeitos.buffVegeta = {
        passiva: defensor.passiva.acumulos,
        danoArmazenado: defensor.golpes.explosaoDaIra.danoArmazenado
      }
          }

          if (defensor.vida <= 0 && defensor.passiva?.esperancaSayajin === true) {
            defensor.passiva.esperancaSayajin = false;
            defensor.vida = defensor.vidaMax;
            defensor.ki = 0
            showNotification(`${defensor.nome} retrocede no tempo antes de sua morte, e retorna a mão de ${Jdefensor.nome}!`, "success");
            const trunks = Jdefensor.campoAtivo.pop();
            Jdefensor.mao.push(trunks);
                          efeitos.esperancaSayajin = {
      esperancaSayajin: true
    }
          }

          if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Trunks" && defensor.vida > 0) {
            defensor.passiva.acumulos = 50
            showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em 50!`, "warning");
                          efeitos.trunks = {
      defensorAcumulos: defensor.passiva.acumulos 
    }
          }
        
          if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Gohan SSJ 2" && defensor.vida > 0) {
            if (defensor.passiva.aumentou === false) {
              defensor.passiva.acumulos += 100
              showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em +100!`, "warning");
              defensor.passiva.aumentou = true
                                efeitos.gohan = {
        gohanAcumulos: 100
      }
            }
          }

          if (defensor.nome === "Goku SSJ Azul" && defensor.vida < defensor.vidaMax * 0.5) {
            if (defensor.vida > 0) {
              defensor.lifeSteal = 0.2
              defensor.passiva.acumulos = 100
              showNotification(`${defensor.nome} está abaixo de 50% de vida, sua Determinação Sayajin está ativa!`, "warning");
              showNotification("Dano aumentado em 100 e cura em 20% do dano causado.", "warning");
            }
                  efeitos.ssjBlue = {
        lifeSteal: 0.2,
        acumulos: 100
      }
          }
        
          if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.nome === "Kuririn") {
            defensor.escudo.valor = 100
            showNotification(`${defensor.nome} esta abaixo de 50% de vida, sua resistência aumenta para 100 pontos.!`);
                          efeitos.kuririn = {
      valorEscudo: 100
    }
          }

          if (defensor.vida <= 0 && atacante.nome === "Bills") {
            atacante.atordoamento = true;
            atacante.rodadas = 4;
            showNotification(`Após eliminar seu alvo, Bills adormecerá por 3 rodadas.`, "warning");
                efeitos.bills = {
      duracaoAtordoamento: 4
    }
          }

          if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.vida > 0 && defensor.passiva?.orgulhoSayajin === false) {
            defensor.escudo = {
              tipo: defensor.passiva.escudo.tipo,
              valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
              valorMax: defensor.passiva.escudo.valor,
              vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
            };
                          efeitos.orgulhoSayajin = {
      escudo: {
              tipo: defensor.passiva.escudo.tipo,
              valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
              valorMax: defensor.passiva.escudo.valor,
              vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
      }
    }
            showNotification(`${defensor.nome} está abaixo de 50% de vida, e recebe um escudo de ${defensor.escudo.valor} pontos!`, "warning");
            defensor.passiva.orgulhoSayajin = true
          }

          danoTotal -= acumulos;
        }
      });
    }
  }

  if (golpe.recarga > 0) {
    golpe.contagem = golpe.recarga
    showNotification(`${golpe.nome} agora está em recarga durante ${golpe.contagem} turnos.`, "warning");
  }

  // APLICA ROUBO DE VIDA DO ATACANTE
  if (atacante.lifeSteal > 0) {
    const cura = Math.floor(danoTotal * atacante.lifeSteal);
    atacante.vida = Math.min(atacante.vida + cura, atacante.vidaMax); // Não ultrapassa o máximo
    showNotification(`${atacante.nome} roubou ${cura} de vida!`, "success");
    efeitos.lifeSteal = {
      cura: cura
    }
  }

  // Resetando acúmulos após o ataque
  atacante.acumulos = 0;

  // Resetando dano armazenado, se existir
  if (golpe.danoArmazenado) {
    golpe.danoArmazenado = 0;
  }

  if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.vida > 0 && defensor.passiva?.orgulhoSayajin === false) {
    defensor.escudo = {
      tipo: defensor.passiva.escudo.tipo,
      valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
      valorMax: defensor.passiva.escudo.valor,
      vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
    };
    showNotification(`${defensor.nome} está abaixo de 50% de vida, e recebe um escudo de ${defensor.escudo.valor} pontos!`, "warning");
    defensor.passiva.orgulhoSayajin = true
    efeitos.orgulhoSayajin = {
      escudo: {
              tipo: defensor.passiva.escudo.tipo,
              valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
              valorMax: defensor.passiva.escudo.valor,
              vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
      }
      }
    }

  if (golpe.nome === "Explosão Final") {
    const recuo = calcularDanoComEscudo(atacante, atacante, 400)
    atacante.vida -= recuo
    showNotification(`${atacante.nome} causou ${recuo} de dano em si mesmo!`, "warning");
    efeitos.recuo = {
      dano: recuo,
    }
    if (atacante.vida <= atacante.vidaMax * 0.5 && atacante.vida > 0 && atacante.passiva?.orgulhoSayajin === false) {
      atacante.escudo = {
        tipo: atacante.passiva.escudo.tipo,
        valor: atacante.passiva.escudo.valor, // Valor total (ex.: 500)
        valorMax: atacante.passiva.escudo.valor,
        vidaAtual: atacante.passiva.escudo.valor // Vida atual do escudo (começa cheia)
      };
      showNotification(`${atacante.nome} está abaixo de 50% de vida, e recebe um escudo de ${atacante.escudo.valor} pontos!`, "warning");
      atacante.passiva.orgulhoSayajin = true
          efeitos.orgulhoSayajin = {
            escudo: {
                    tipo: defensor.passiva.escudo.tipo,
                    valor: defensor.passiva.escudo.valor, // Valor total (ex.: 500)
                    valorMax: defensor.passiva.escudo.valor,
                    vidaAtual: defensor.passiva.escudo.valor // Vida atual do escudo (começa cheia)
            }
      }
    }
  }

  if (golpe.nome === "Destruição Absoluta") {
    const recuo = calcularDanoComEscudo(atacante, atacante, 500)
    atacante.vida -= recuo
    showNotification(`${atacante.nome} causou ${recuo} de dano em si mesmo!`, "warning");
    efeitos.recuo = {
      dano: recuo,
    }
  }

  if (atacante.nome === "Cell" && defensor.vida <= 0) {
    atacante.danoAument += 50;
    let cura = atacante.vidaMax * 0.2;
    atacante.vida = Math.min(atacante.vida + cura, atacante.vidaMax);
    showNotification(`${atacante.nome} acaba de caçar um inimigo, aumentando seu dano em 50 e restaurando 20% de sua vida.`, "success");
    efeitos.buffCell = {
      vidaCell: atacante.vida
    }
  }

  if (defensor.nome === "Goku SSJ Azul" && defensor.vida < defensor.vidaMax * 0.5) {
    if (defensor.vida > 0) {
      defensor.lifeSteal = 0.2
      defensor.passiva.acumulos = 100
      efeitos.ssjBlue = {
        lifeSteal: 0.2,
        acumulos: 100
      }
      showNotification(`${defensor.nome} está abaixo de 50% de vida, sua Determinação Sayajin está ativa!`, "warning");
      showNotification("Dano aumentado em 100 e cura em 20% do dano causado.", "warning");
    }
  }

  if (defensor.vida <= 0 && golpe.nome === "Hakai") {
    atacante.golpes.hakai.dano += 100;
    showNotification(`${atacante.nome} eliminou ${defensor.nome}. O dano de Hakai aumenta em 100.`, "success");
  }

  if (defensor.vida <= 0 && atacante.nome === "Goku Black SSJ Rosê") {
    atacante.passiva.acumulos += 100
    atacante.ki = Math.min(atacante.ki + 5000, atacante.kiMax)
    showNotification(`${atacante.nome} acaba de mostrar sua Ira Divina eliminando o adversário, aumentando seu dano em 100 e recuperando 5000 de ki.`, "success");
    efeitos.iraDivina = {
      blackKi: atacante.ki
    }
  }

  if (golpe.efeito === "selfdestruction") {
    atacante.vida = 0
    showNotification(`${atacante.nome} se autodestruiu.`, "error");
    efeitos.selfDestruction = {
      selfDestruction: true
    }
  }

  if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Trunks" && defensor.vida > 0) {
    defensor.passiva.acumulos = 50
    efeitos.trunks = {
      defensorAcumulos: defensor.passiva.acumulos 
    }
    showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em 50!`, "warning");
  }

  if (defensor.vida < defensor.vidaMax * 0.5 && defensor.nome === "Gohan SSJ 2" && defensor.vida > 0) {
    if (defensor.passiva.aumentou === false) {
      defensor.passiva.acumulos += 100
      showNotification(`${defensor.nome} esta abaixo de 50% de vida, todo o seu dano aumenta em +100!`, "warning");
      defensor.passiva.aumentou = true
      efeitos.gohan = {
        gohanAcumulos: 100
      }
    }
  }

  if (defensor.vida <= defensor.vidaMax * 0.5 && defensor.nome === "Kuririn") {
    defensor.escudo.valor = 100
    showNotification(`${defensor.nome} esta abaixo de 50% de vida, sua resistência aumenta para 100 pontos.!`);
    efeitos.kuririn = {
      valorEscudo: 100
    }
  }

  if (defensor.vida <= 0 && atacante.nome === "Bills") {
    atacante.atordoamento = true;
    atacante.rodadas = 4;
    showNotification(`Após eliminar seu alvo, Bills adormecerá por 3 rodadas.`, "warning");
    efeitos.bills = {
      duracaoAtordoamento: 4
    }
  }

  if (golpe.buffado) {
    delete golpe.buffado
    delete golpe.danoAleat
  }

  if (atacante.curaBuffada) {
    atacante.lifeSteal -= 0.35
    delete atacante.curaBuffada
  }

  if (defensor.vida <= 0 && Jdefensor.bancoLuta.find(carta => carta.nome === "Gohan SSJ 2")) {
    const gohan = Jdefensor.bancoLuta.find(carta => carta.nome === "Gohan SSJ 2");
    if (gohan.passiva.ativou === false) {
      gohan.passiva.acumulos += 100
      showNotification(`Gohan enfurece-se com a morte de seu aliado, e anseia por vingá-lo. recebe 100 de dano adicional`, "warning");
      gohan.passiva.ativou = true
      efeitos.gohan2 = {
        gohanAcumulos: 100
      }
    }
  }

  if (defensor.vida <= 0 && defensor.passiva?.esperancaSayajin === true) {
    defensor.passiva.esperancaSayajin = false;
    defensor.marcarParaRetorno = true;

    efeitos.esperancaSayajin = {
      nome: defensor.nome // usado para notificação
    };
  }

  if (atacante.passiva?.quebrarLimitador && jogadorAlvo.acoesTurno >= 2) {
    atacante.passiva.quebrarLimitador = false;
    showNotification(`${atacante.nome} usou a sua ação extra! (ataque adicional)`, "warning");
  }

  if (defensor.vida <= 0) {
    setTimeout(() => {
      animacoesAtaques(golpe, defensor);
    }, 1500);
  }

  if (Jdefensor === jogadorSelecionado) {
    verificarCampoVazio()
  }
  ataqueConcluido = true  
  fecharCarta(); // fecha o modal após usar
  jogadorAlvo.acoesTurno++
      if (ataqueConcluido) {
      socket.emit('ataque_realizado', {
        JogadorAtacante: Jatacante,
        JogadorDefensor: Jdefensor,
        atacante: atacante,
        defensor: defensor,
        golpe: golpe,
        danoCausado: danoTotal ?? 0,  // ou o valor real final
        efeitos: efeitos,
        sala_id: "sala1",
        origem: socket.id
      })
      console.log("Ataque concluído! Enviando dados... (Tentativa 2)");
    }
}

function usarAtaqueCura(jogadorAtacante, cartaCurada, golpe) {
  verificarModalAberto();

  const atacante = jogadorAtacante.campoAtivo[0];
  
  // Verifica se a carta curada está no banco OU no campo ativo
  const cartaAlvo = [...jogadorAtacante.bancoLuta, ...jogadorAtacante.campoAtivo].find(
    c => c.nome === cartaCurada.nome
  );

  if (!cartaAlvo) {
    showNotification("Carta alvo não encontrada!", "error");
    return false;
  }

  // Verifica ações do JOGADOR ATACANTE (não do alvo)
  if (jogadorAtacante.acoesTurno >= 2 && !atacante.passiva?.quebrarLimitador) {
    showNotification(`Você já usou todas as ações deste turno!`, "warning");
    return false;
  }

  if (atacante.vida <= 0) {
    showNotification(`${atacante.nome} está fora de combate e não pode atacar!`, "error");
    return false;
  }

  if (!golpe) {
    showNotification(`Erro: golpe indefinido para ${atacante.nome}`, "error");
    return false;
  }

  if (atacante.atordoamento) {
    showNotification(`${atacante.nome} está atordoado e não pode atacar este turno`, "warning");
    return false;
  }

  if (atacante.jaulaTempo) {
    showNotification(`${atacante.nome} não pode atacar (Jaula do Tempo)`, "warning");
    return false;
  }

  if (golpe.contagem > 0) {
    showNotification(`${golpe.nome} em recarga. Turnos: ${golpe.contagem}`, "warning");
    return false;
  }

  // Aplica a cura
  const vidaAnterior = cartaAlvo.vida;
  cartaAlvo.vida = Math.min(cartaAlvo.vida + golpe.cura, cartaAlvo.vidaMax);
  const curaReal = cartaAlvo.vida - vidaAnterior;

  // Consome KI e ação
  atacante.ki -= golpe.custoKi;
  jogadorAtacante.acoesTurno++;

  showNotification(
    `✨ ${atacante.nome} curou ${cartaAlvo.nome} em ${curaReal} PV!` + 
    ` (${vidaAnterior} → ${cartaAlvo.vida})`, 
    "success"
  );

  let efeitos = {
    alvo: jogadorAtacante.nome,
    carta: cartaAlvo.nome,
    cura: curaReal,
  }

  socket.emit('ataque_realizado', {
    JogadorAtacante: jogadorAtacante,
    JogadorDefensor: jogadorAtacante,
    atacante: atacante,
    defensor: cartaAlvo,
    golpe: golpe,
    efeitos: efeitos,
    sala_id: "sala1",
    origem: socket.id
  })

  //// PPPPPPPPPPPPPPPPPPPPPARRRRRRRRRRREEEEEEEEEEEEIIIIIIIIIII AQUI ////////////////

  // Atualiza a UI
  exibirCarta(jogador1.campoAtivo[0], "player1-card");
  exibirCarta(jogador2.campoAtivo[0], "player2-card");
  mostrarBanco(jogador1.bancoLuta, "banco-cartas");
  mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");

  return true;
}

function atacarComChiChi(jogadorAtacante, golpe) {
  verificarModalAberto();
  // 1. Encontra Chi Chi corretamente (campo ativo OU banco)
  const chiChi = jogadorAtacante.campoAtivo[0]?.nome === "Chi Chi" 
    ? jogadorAtacante.campoAtivo[0]
    : jogadorAtacante.bancoLuta.find(carta => carta.nome === "Chi Chi");

  if (!chiChi) {
    showNotification("Jogador não possui Chi Chi!", "error");
    return false;
  }

  // Verificações de estado
  if (jogadorAtacante.acoesTurno >= 2 && !chiChi.passiva?.quebrarLimitador) {
    showNotification(`[${jogadorAtacante.nome}] já usou todas as ações deste turno.`, "warning");
    return;
  }

  if (chiChi.vida <= 0) {
    showNotification(`${chiChi.nome} está fora de combate!`, "error");
    return;
  }

  if (chiChi.atordoamento) {
    showNotification(`${chiChi.nome} está atordoada!`, "warning");
    return;
  }

  if (chiChi.jaulaTempo) {
    showNotification(`${chiChi.nome} está presa na Jaula do Tempo!`, "warning");
    return;
  }

  if (chiChi.ki < golpe.custoKi) {
    showNotification(`KI insuficiente! Necessário: ${golpe.custoKi}`, "error");
    return;
  }

  if (golpe.contagem > 0) {
    showNotification(`${golpe.nome} em recarga. Turnos: ${golpe.contagem}`, "warning");
    return;
  }

  // 2. Processa os golpes
  const alvo = jogadorAtacante.campoAtivo[0];
  if ((golpe.nome === "Fortaleza de Determinação") && (!alvo || alvo.vida <= 0)) {
    showNotification("Nenhum aliado válido para proteger!", "error");
    return;
  }

  // Deduz KI sempre
  chiChi.ki -= golpe.custoKi;
  let efeitos = {}

  // 3. Golpe: Refeição de Emergência
  if (golpe.nome === "Refeição de Emergência") {
    if (!chiChi.cartasAlimentos) {
      showNotification("Chi Chi não tem ingredientes!", "error");
      return;
    }

    function gerarCartaAlimento(cartasAlimentos) {
      const alimentos = Object.keys(cartasAlimentos);
      const alimentoGerado = alimentos[Math.floor(Math.random() * alimentos.length)];
      return { ...cartasAlimentos[alimentoGerado] };
    }

    function criarAlimento() {
      if (jogadorAtacante.mao.length >= 10) {
        showNotification("Mão cheia! (10/10)", "warning");
        return false;
      }

      const novaCarta = gerarCartaAlimento(chiChi.cartasAlimentos);
      jogadorAtacante.mao.push(novaCarta);
      showNotification(`🍲 ${chiChi.nome} adicionou ${novaCarta.nome} a mão de ${jogadorAtacante.nome}!`, "success");
    efeitos.itemAdicionado2 = {
      Jmao: jogadorAtacante.mao
    };
      return true;
    }

    const criou = criarAlimento();
    if (criou && golpe.recarga > 0) {
      golpe.contagem = golpe.recarga;
    } else {
      return;
    }
  }

  // 4. Golpe: Fortaleza de Determinação
  if (golpe.nome === "Fortaleza de Determinação") {
    if (alvo.escudo) {
      showNotification(`${alvo.nome} já tem escudo!`, "warning");
      return;
    }

    alvo.escudo = {
      tipo: "absorvedor",
      valor: 500,
      valorMax: 500,
      permanente: true,
      buffEscudo: 50
    };

    efeitos.escudoChiChi = {
      alvo: jogadorAtacante.campoAtivo[0],
      Jescudo: alvo.escudo
    };

    showNotification(`🛡️ ${alvo.nome} ganhou 500 pontos de escudo e +50 de dano enquanto o escudo estiver ativo!`, "success");
    
    if (golpe.recarga > 0) {
      golpe.contagem = golpe.recarga;
    }
  }

  socket.emit('ataque_realizado', {
    JogadorAtacante: jogadorAtacante,
    JogadorDefensor: jogadorAtacante,
    atacante: chiChi,
    defensor: jogadorAtacante.campoAtivo[0],
    golpe: golpe,
    efeitos: efeitos,
    sala_id: "sala1",
    origem: socket.id
  })
  jogadorAtacante.acoesTurno++;
  return true;
}

// Função auxiliar para cálculo de dano com escudos
function calcularDanoComEscudo(atacante, defensor, dano) {

  if (!defensor || defensor.vida <= 0) return dano; // ⚡ Correção aqui
  if (!defensor.escudo) return dano;

  if (atacante.passiva?.trueDamage) {
    showNotification(`${atacante.nome} atravessou o escudo de ${defensor.nome}!`, "warning");
    return dano;
  }

  // Escudo percentual (ex.: 20% menos dano)
  if (defensor.escudo.tipo === "percentual") {
    const danoReduzido = dano * (1 - defensor.escudo.valor);
    showNotification(`${defensor.nome} bloqueou ${dano * defensor.escudo.valor} de dano (${defensor.escudo.valor * 100}% de redução)`, "success");
    return danoReduzido;
  }

  // Escudo fixo (ex.: 500 pontos) - Redução fixa por ataque
  if (defensor.escudo.tipo === "fixo") {
    const danoReduzido = Math.max(dano - defensor.escudo.valor, 0);
    showNotification(`${defensor.nome} absorveu ${Math.min(dano, defensor.escudo.valor)} de dano`, "success");
    return danoReduzido;
  }

  // NOVO: Escudo absorvedor (consumível) - Bloqueia 100% até quebrar
  if (defensor.escudo.tipo === "absorvedor") {
    if (dano <= defensor.escudo.valor) {
      // Dano completamente absorvido
      defensor.escudo.valor -= dano;
      showNotification(`🛡️ ${defensor.nome} bloqueou ${dano} de dano! (Escudo: ${defensor.escudo.valor}/${defensor.escudo.valorMax} restante)`, "success");
      return 0;
    } else {
      // Escudo quebrado - passa o excedente
      const danoExcedente = dano - defensor.escudo.valor;
      showNotification(`💥 Escudo de ${defensor.nome} quebrou! Bloqueou ${defensor.escudo.valor} e recebeu ${danoExcedente} de dano`, "warning");
      delete defensor.escudo; // Remove o escudo
      return danoExcedente;
    }
  }

  return dano;
}

// Função para redefinir recarga de "Explosão da Ira" para qualquer jogador
function reduzirRecargas(jogador) {
  const oponente = jogador === jogador1 ? jogador2 : jogador1;
  // Reinicia contadores de turno (global)
  // Reinicia contadores de turno
  [jogador1, jogador2].forEach(j => {
    j.acoesTurno = 0;
    j.acumulosKiTurno = 0;
    j.trocasTurno = 0;
  });

  if (jogador.campoAtivo[0]?.nome === "Broly") {
    const oponente = jogador === jogador1 ? jogador2 : jogador1;
    const alvoAtual = oponente.campoAtivo[0]?.nome;

    // Verifica se o alvo é o mesmo da rodada anterior
    if (alvoAtual && alvoAtual === jogador.campoAtivo[0].passiva.alvoAnterior) {
      jogador.campoAtivo[0].passiva.iraAcumulada += 50;
      jogador.campoAtivo[0].passiva.acumulos += jogador.campoAtivo[0].passiva.iraAcumulada;
      showNotification(`🔥 Broly (${jogador.nome}) acumula ira contra ${alvoAtual}! Dano +${jogador.campoAtivo[0].passiva.iraAcumulada}`);
    } else {
      jogador.campoAtivo[0].passiva.iraAcumulada = 0; // Reseta se mudar de alvo
    }

    // Atualiza o alvo para a próxima verificação
    jogador.campoAtivo[0].passiva.alvoAnterior = alvoAtual;
  }

  if (jogador.campoAtivo[0]?.passiva?.desafiante) {
    const oponente = jogador === jogador1 ? jogador2 : jogador1;
    if (!oponente.campoAtivo[0].passiva?.principeSayajin && !oponente.campoAtivo[0].imunidade) {
      oponente.campoAtivo[0].arena = true
      jogador.campoAtivo[0].desafiador = true

      showNotification(`${oponente.campoAtivo[0].nome} está isolado em um duelo!`)
    } else {
      showNotification(`${jogador.campoAtivo[0].nome} tenta isolar ${oponente.campoAtivo[0].nome} em um duelo, mas ele não pode ser afetado por isso.`, "warning");
    }
  }

  if (jogador.campoAtivo[0].arena && !oponente.campoAtivo[0].desafiador) {
    delete jogador.campoAtivo[0].arena
    showNotification(`${jogador.campoAtivo[0].nome} venceu o duelo e volta ao campo!`, "success");
  }

  // Reduz recargas de TODAS as cartas do jogador
  const todasCartas = [
    ...jogador.campoAtivo,
    ...jogador.bancoLuta,
  ];

  // Encontra qualquer forma do Majin Boo em campo ou no banco
  const boo = todasCartas.find(carta =>
    carta.nome === "Majin Boo" ||
    carta.nome === "Super Boo" ||
    carta.nome === "Kid Boo"
  );

  function transformarMajinBoo(boo, jogador) {
  const formasDisponiveis = ["Majin Boo", "Super Boo", "Kid Boo"].filter(f => f !== boo.nome);
  const novaFormaNome = formasDisponiveis[Math.floor(Math.random() * formasDisponiveis.length)];
  const novaForma = bancoDeCartas.find(c => c.nome === novaFormaNome);

  if (!novaForma) return;

  const estadoAtual = {
    ki: boo.ki,
    atordoamento: boo.atordoamento,
    rodadas: boo.rodadas,
    jaulaTempo: boo.jaulaTempo || null
  };

  Object.assign(boo, {
    ...JSON.parse(JSON.stringify(novaForma)),
    ...estadoAtual,
    vida: novaForma.vidaMax,
    passiva: { ...novaForma.passiva, turnos: 0 }
  });

  if (boo.nome === "Majin Boo") boo.golpes.transformacaodoce.uso = false;
  if (boo.nome === "Super Boo") boo.golpes.explosaodefuria.stacks = 0;

  showNotification(`🌀 ${boo.nome} se transformou e recuperou toda a vida!`);

  // 🔁 Envia para o servidor
  if (jogador === jogadorSelecionado) {
    socket.emit("transformacao_boo", {
      novaForma: boo.nome,
      jogador: jogador.nome,
      estadoAtual,
      sala_id: "sala1"
    });
  }
}


  if (boo) {
    boo.passiva.turnos++;
    showNotification(`Majin Boo (${jogador.nome}) - Turno ${boo.passiva.turnos}/5`, "success");


    if (boo.passiva.turnos >= 5 && jogador === jogadorSelecionado) {
      transformarMajinBoo(boo, jogador); // apenas o jogador da vez faz a transformação
    }
  }

  jogador.bancoLuta.forEach(carta => {
    if (carta.inativoPorTurno > 0) {
        carta.inativoPorTurno -= 1;
        if (carta.inativoPorTurno === 0) {
            showNotification(`🔄 ${carta.nome} está pronto para combate!`);
        }
    }
  });

  jogador.mao.forEach(carta => {
    if (carta.inativoPorTurno > 0) {
        carta.inativoPorTurno -= 1;
        if (carta.inativoPorTurno === 0) {
            showNotification(`🔄 ${carta.nome} está pronto para combate!`);
        }
    }
  });

  todasCartas.forEach(carta => {
    if (!carta.golpes) return;

    if (carta.chocolate) {
      if (carta.chocolateDuracao > 0) {
        carta.chocolateDuracao -= 1;
        showNotification(`${carta.nome} é um chocolate durante: ${carta.chocolateDuracao} turno(s).`);
      }
      if (carta.chocolateDuracao <= 0) {
        showNotification(`${carta.nome}: Não é mais um chocolate`);
        delete carta.chocolate
        delete carta.chocolateDuracao
      }
    }

    if (carta.inativoPorTurno > 0) {
      carta.inativoPorTurno -= 1;
      if (carta.inativoPorTurno === 0) {
        showNotification(`🔄 ${carta.nome} está pronto para combate!`);
      }
    }

    if (carta.energia) {
      if (carta.energia > 0) {
        carta.energia -= 1;
        showNotification(`🔋 ${carta.nome}: Possui ${carta.energia} turno(s) restates.`);
      }
      if (carta.energia <= 0) {
        showNotification(`🔋 ${carta.nome}: Energia esgotada!`, "error");
        carta.vida = 0;
      }
    }

    if (carta.passiva?.esquiva === 0) {
      carta.passiva.esquiva = 1;
    }

    if (carta.timingBuff > 0) {
      carta.timingBuff -= 1;
      showNotification(`Em ${carta.timingBuff} rodadas, ${carta.nome} receberá +${carta.buff} de dano!`);
      if (carta.timingBuff <= 0) {
        delete carta.timingBuff
        carta.danoAument = carta.buff;
        showNotification(`${carta.nome} recebeu ${carta.buff} de dano permanente!`)
      }
    }

    if (carta.jaulaTempo > 0) {
      carta.jaulaTempo -= 1;
      showNotification(`${carta.nome} se libertou da Jaula do Tempo!`);
      if (carta.jaulaTempo <= 0) {
        delete carta.jaulaTempo
      }
    }

    if (carta.temporizadorKi > 0 ?? undefined) {
      carta.temporizadorKi -= 1;
      showNotification(`${carta.nome} canaliza +${carta.KiTemporario} de KI a cada acumulo. ${carta.temporizadorKi} turnos restantes`)
      if (carta.temporizadorKi <= 0) {
        delete carta.KiTemporario
        delete carta.temporizadorKi
        showNotification(`${carta.nome} perdeu o Ki Aumento de Ki!`, "error")
      }
    }

    if (carta.duracaoJuizo > 0 ?? undefined) {
      carta.duracaoJuizo -= 1
      showNotification(`${carta.nome} se cura em 50% do dano causado. turnos restantes: ${carta.duracaoJuizo}`)
      if (carta.duracaoJuizo <= 0) {
        delete carta.duracaoJuizo
        carta.lifeSteal -= 0.5
        showNotification("Efeito de Juízo Imperial expirou!", "error")
      }
    }

    if (carta.temporizadorDano > 0 ?? undefined) {
      carta.temporizadorDano -= 1;
      showNotification(`${carta.nome} possui ${carta.DanoTemporario} de dano adicional em seus ataques. ${carta.temporizadorDano} turnos restantes`)
      if (carta.temporizadorDano <= 0) {
        delete carta.DanoTemporario
        delete carta.temporizadorDano
        showNotification(`${carta.nome} perdeu o aumento de dano!`, "error")
      }
    }

    if (carta.passiva?.quebrarLimitador === false) {
      carta.passiva.quebrarLimitador = true;
    }

    if (carta.buffKiExtra > 0) {
      carta.duracaoKi -= 1;
      showNotification(`${carta.nome} canaliza +${carta.buffKiExtra} de KI a cada acumulo. ${carta.duracaoKi} turnos restantes`);
      if (carta.duracaoKi <= 0) carta.buffKiExtra = 0;
    }

    if (carta.buffDanoExtra > 0) {
      carta.duracaoDano -= 1;
      showNotification(`${carta.nome} possui ${carta.buffDanoExtra} de dano adicional em seus ataques. ${carta.duracaoDano} turnos restantes`);
      if (carta.duracaoDano <= 0) carta.buffDanoExtra = 0;
    }

    Object.values(carta.golpes).forEach(golpe => {
      if ('contagem' in golpe && 'recarga' in golpe && golpe.contagem > 0) {
        golpe.contagem -= 1;
        showNotification(
          golpe.contagem > 0
            ? `🔄 ${carta.nome}: ${golpe.nome} recarrega em ${golpe.contagem} turno(s)`
            : `✅ ${carta.nome}: ${golpe.nome} pronto!`
        );
      }
    });
  });
}

// Função dedicada para verificar evoluções
function verificarEvolucao(jogador) {
  // Verifica se há carta no campo ativo
  if (jogador.campoAtivo.length === 0) return false;

  const cartaAtiva = jogador.campoAtivo[0];

  // Verifica se a carta tem potencial de evolução
  if (!cartaAtiva.passiva?.evolucoes) return false;

  // Incrementa contador de turnos ativos
  cartaAtiva.passiva.turnosAtivos++;
  showNotification(`🕒 ${cartaAtiva.nome} completou ${cartaAtiva.passiva.turnosAtivos} turnos no campo ativo`);

  // Encontra a próxima evolução disponível
  const proximaEvolucao = cartaAtiva.passiva.evolucoes.find(evo =>
    evo.turnosNecessarios === cartaAtiva.passiva.turnosAtivos
  );

  // Se encontrou uma evolução válida
  if (proximaEvolucao) {
    evoluirCarta(cartaAtiva, proximaEvolucao.forma, jogador);
    return true;
  }

  return false;
}

function evoluirCarta(cartaAtual, novaFormaNome, jogador) {
  const novaForma = bancoDeCartas.find(c => c.nome === novaFormaNome);
  if (!novaForma) {
    console.error(`Forma ${novaFormaNome} não encontrada no banco de cartas!`);
    return;
  }

  let vidaPerdida = cartaAtual.vidaMax - cartaAtual.vida;
  let estadoVida = novaForma.vidaMax - vidaPerdida;

  // Preserva apenas os status que queremos manter
  const estadoAtual = {
    vida: estadoVida,
    vidaMax: novaForma.vidaMax, // Atualiza o máximo mas mantém a vida atual
    ki: cartaAtual.ki,
    kiMax: novaForma.kiMax,
    atordoamento: cartaAtual.atordoamento,
    rodadas: cartaAtual.rodadas,
    jaulaTempo: cartaAtual.jaulaTempo,
    // NÃO preserva o escudo atual intencionalmente
    acumulos: cartaAtual.acumulos || 0,
    lifeSteal: cartaAtual.lifeSteal || 0
  };

  showNotification(`✨ ${cartaAtual.nome} evoluiu para ${novaFormaNome}!`);

  // Copia todos os atributos da nova forma
  Object.assign(cartaAtual, JSON.parse(JSON.stringify(novaForma)));

  // Restaura os status que queremos manter
  Object.assign(cartaAtual, estadoAtual);

  // Mantém o contador de turnos ativos para próximas evoluções
  cartaAtual.passiva = {
    ...novaForma.passiva,
    turnosAtivos: cartaAtual.passiva.turnosAtivos // Mantém o progresso
  };

  if (cartaAtual.nome.includes("Freeza") && novaFormaNome.includes("Dourado")) {
    // Remove explicitamente qualquer escudo existente
    delete cartaAtual.escudo;
  }

  if (cartaAtual.nome.includes("Goku SSJ") && novaFormaNome.includes("SSJ Azul")) {
    // Remove explicitamente qualquer escudo existente
    delete cartaAtual.escudo;
  }

}

// Verifica e aplica o estado de atordoamento
function verificarAtordoamento(jogador) {
  // Verifica todas as cartas do jogador (campo ativo, banco e mão)
  const todasCartas = [
    ...jogador.campoAtivo,
    ...jogador.bancoLuta,
    ...jogador.mao.filter(c => c.tipo !== "Item")
  ];

  todasCartas.forEach(carta => {
    carta.atordoamento = carta.rodadas > 0;
    if (carta.atordoamento) {
      showNotification(`🌀 ${carta.nome} está atordoado por ${carta.rodadas} turno(s)`);
    }
  });
}

// Reduz a duração do atordoamento
function reduzirAtordoamento(jogador) {
  const todasCartas = [
    ...jogador.campoAtivo,
    ...jogador.bancoLuta,
    ...jogador.mao.filter(c => c.tipo !== "Item")
  ];

  todasCartas.forEach(carta => {
    if (carta.rodadas > 0) {
      carta.rodadas -= 1;
      if (carta.rodadas === 0) {
        carta.atordoamento = false;
        showNotification(`🌟 ${carta.nome} se recuperou do atordoamento!`);
      }
    }
  });
}

// Gera cápsulas no início do turno
let ultimoTurnoCapsulas = 0;
function gerarCapsulas() {
      // Verifica se já gerou cápsulas neste turno
      if (turnoAtual === ultimoTurnoCapsulas) return;
      ultimoTurnoCapsulas = turnoAtual;
  // Verifica primeiro se Bulma está em campo antes de processar
  const jogadoresComBulma = [jogador1, jogador2].filter(jogador => 
    jogador.campoAtivo.some(carta => carta.nome === "Bulma")
  );

  if (jogadoresComBulma.length === 0) return;

  jogadoresComBulma.forEach(jogador => {
    const bulma = jogador.campoAtivo.find(carta => carta.nome === "Bulma");
    
    if (jogador.mao.length >= 10) {
      if (jogador === jogadorSelecionado) {
      showNotification(`[${jogador.nome}] já está com a mão cheia! (limite de 10 cartas). Não é possível gerar cápsula Hoi Poi`, "error");
    }
      return; // Agora este return só afeta o jogador atual
    }

    if (bulma?.passiva?.capsula) {
      const novaCapsula = { ...bulma.passiva.capsula };
      jogador.mao.push(novaCapsula);
            if (jogador === jogadorSelecionado) {
      showNotification(`[${jogador.nome}] recebeu: ${novaCapsula.nome} de Bulma!`);
            }
    }
  });
}

// VARIÁVEIS GLOBAIS DE AÇÕES
if (jogador1 != null && jogador2 != null) {
  jogador1.acoesTurno = 0;
  jogador1.acumulosKiTurno = 0;
  jogador1.trocasTurno = 0;
  jogador1.usoItens = 0;
  jogador2.acoesTurno = 0;
  jogador2.acumulosKiTurno = 0;
  jogador2.trocasTurno = 0;
  jogador1.usoItens = 0;
}

function acumularKi(personagem, jogador) {
  verificarModalAberto();
  if (personagem.kiMax === 0) {
    showNotification(`${personagem.nome} não utiliza ki em seus ataques.`, "warning");
    console.log(`${personagem.nome} não utiliza ki em seus ataques.`);
    return;
  }

  const jogadorAlvo = jogador === 1 ? jogador1 : jogador2;

  if (jogadorAlvo.acumulosKiTurno >= 2 && !personagem.passiva?.quebrarLimitador) {
    showNotification(`${personagem.nome} já usou todos os acúmulos de ki este turno.`, "warning");
    console.log(`${personagem.nome} já acumulou o máximo de ki este turno.`);
    return;
  }

  if (personagem.chocolate) {
    showNotification("Um chocolate não pode acumular Ki.");
    return
  }

  if (personagem.jaulaTempo) {
    showNotification(`${personagem.nome} não pode acumular Ki, pois está preso na Jaula do Tempo! ⏳`, "error");
    console.log(`${personagem.nome} não pode acumular Ki, pois está preso na Jaula do Tempo! ⏳`);
    return;
  }

  if (personagem.ki >= personagem.kiMax) {
    showNotification(`${personagem.nome} já está com KI máximo!`, "warning");
    return;
  }

  personagem.ki = Math.min(personagem.ki + 2500, personagem.kiMax);

  const audio = new Audio('/static/assets/Voicy_Small Aura Burst (DBZ Sound Effect).mp3');
  audio.play().catch(e => console.log("Autoplay não permitido:", e));
  // Adicionar verificação extra:

  if (personagem.buffKiExtra > 0) {
    personagem.ki = Math.min(personagem.ki + personagem.buffKiExtra, personagem.kiMax);
    console.log(`${personagem.nome} recebeu ${personagem.buffKiExtra} de Ki adicional.`);
  }

  if (personagem.KiTemporario > 0) {
    personagem.ki = Math.min(personagem.ki + personagem.KiTemporario, personagem.kiMax);
    console.log(`${personagem.nome} recebeu ${personagem.KiTemporario} de Ki adicional.`);
  }

  if (personagem.nome === "Goku Black") {
    personagem.ki = Math.min(personagem.ki + 1000, personagem.kiMax);
    console.log(`${personagem.nome} recebeu 1000 de Ki adicional.`);
  }

  if (personagem.nome === "Gohan") {
    personagem.ki = Math.min(personagem.ki + 500, personagem.kiMax);
    console.log(`${personagem.nome} recebeu 500 de Ki adicional.`);
  }

  if (jogador === jogadorSelecionado) {
      showNotification(`${personagem.nome} acumulou Ki. Agora tem ${personagem.ki} de Ki.`);
  } else {
      showNotification(`${jogador.nome} acumulou ki com ${personagem.nome}.`, 'error');
  }

  if (personagem.passiva?.quebrarLimitador && jogadorAlvo.acumulosKiTurno >= 2) {
    personagem.passiva.quebrarLimitador = false;
    showNotification(`${personagem.nome} usou a sua ação extra! (acumulou ki)`);
  }

  jogadorAlvo.acumulosKiTurno++;
    socket.emit('acumular_ki', {
      jogador: window._jogadorSelecionado, 
      personagem: window._cartaSelecionada, 
      sala_id: "sala1",
      origem: socket.id  // importante!
    });
  fecharCarta(); // fecha o modal após usar
}

function trocarPersonagemAtivo(personagemSelecionado, jogador) {
  verificarModalAberto();
  // ========== VERIFICAÇÕES INICIAIS ==========
  if (!jogador.campoAtivo?.[0]) {
    showNotification("Erro: Nenhum personagem ativo no campo!", "error");
    return false;
  }

  if (jogador.campoAtivo[0].jaulaTempo) {
    showNotification(`${jogador.campoAtivo[0].nome} está preso na Jaula do Tempo! ⏳`, "error");
    return false;
  }

  if (jogador.campoAtivo[0].chocolate) {
    showNotification("Um chocolate não pode se mover.");
    return false;
  }

  if (jogador.campoAtivo[0].arena) {
    showNotification(`${jogador.campoAtivo[0].nome} está isolado em um confronto e não pode ser substituído!`, "error");
    return false;
  }

  if (!Array.isArray(jogador.bancoLuta)) {
    showNotification("Erro: Banco de luta inválido!", "error");
    return false;
  }

  if (jogador.trocasTurno >= 1) {
    showNotification(`${jogador.nome} já usou todas as ações de troca este turno`, "warning");
    return false;
  }

  // ========== TRATA PARÂMETRO (OBJETO OU STRING) ==========
  let personagemAlvo;

  if (typeof personagemSelecionado === 'string') {
    personagemAlvo = jogador.bancoLuta.find(c => c?.nome === personagemSelecionado);
    if (!personagemAlvo) {
      showNotification(`"${personagemSelecionado}" não encontrado no banco!`, "error");
      return false;
    }
  }
  else if (personagemSelecionado?.nome) {
    personagemAlvo = personagemSelecionado;
  }
  else {
    showNotification("Erro: Personagem deve ser um objeto ou nome (string)", "error");
    return false;
  }

  // ========== VERIFICAÇÕES ADICIONAIS ==========
  const indexNoBanco = jogador.bancoLuta.findIndex(c => c === personagemAlvo);
  if (indexNoBanco === -1) {
    showNotification(`${personagemAlvo.nome} não está disponível no banco!`, "error");
    return false;
  }

  if (personagemAlvo.vida <= 0) {
    showNotification(`${personagemAlvo.nome} está derrotado e não pode entrar em combate!`, "error");
    return false;
  }

  // ========== EXECUTA A TROCA ==========
  try {
    const [personagemSaindo] = jogador.campoAtivo;
    const personagemEntrando = jogador.bancoLuta[indexNoBanco];

    // Atualiza arrays
    jogador.bancoLuta.splice(indexNoBanco, 1);
    jogador.bancoLuta.push(personagemSaindo);
    jogador.campoAtivo[0] = personagemEntrando;

    // Atualiza estados
    jogador.trocasTurno++;

    socket.emit('personagem_trocado', {
      jogador: jogador, 
      personagem: personagemSelecionado, 
      sala_id: "sala1",
      origem: socket.id  // importante!
    });

    // Notificação visual melhorada
    if (jogador === jogadorSelecionado) {
          showNotification(
      `⚡ ${personagemSaindo.nome} → ${personagemEntrando.nome}`,
      "success",
      3000
    );
    }

      const audio = new Audio('/static/assets/Voicy_Instant transmission re-upload.mp4');
      audio.play().catch(e => console.log("Autoplay não permitido:", e));

    // Atualiza a UI imediatamente
    if (jogador === jogador1) {
      exibirCarta(jogador1.campoAtivo[0], "player1-card");
      mostrarBanco(jogador1.bancoLuta, "banco-cartas");
    } else {
      exibirCarta(jogador2.campoAtivo[0], "player2-card");
      mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
    }

    return true;
  } 
  catch (error) {
    console.error(`Falha na troca: ${error.message}`);
    showNotification("Erro durante a troca de personagens!", "error");
    return false;
  }
}

function usarItem(itemParam, jogador, alvo = jogador.campoAtivo[0]) {
  verificarModalAberto();


  const substituicaoAtiva = document.querySelector('.modal-substituicao');
  if (substituicaoAtiva && !itemParam.efeito.retornarBanco && !itemParam.efeito.retornarMao) {
    showNotification("Complete a substituição pendente primeiro!", "error");
    return false;
  }
  // ========== TRATAMENTO DO PARÂMETRO ==========
  let item;
  let indexItem;

  // Se for número (índice)
  if (typeof itemParam === 'number') {
    indexItem = itemParam;
    item = jogador.mao[indexItem];

    // Validação do índice
    if (indexItem < 0 || indexItem >= jogador.mao.length) {
      console.log("Erro: Índice de item inválido!");
      return false;
    }
  }
  // Se for string (nome do item)
  else if (typeof itemParam === 'string') {
    indexItem = jogador.mao.findIndex(i => i?.nome === itemParam);
    if (indexItem === -1) {
      console.log(`Item "${itemParam}" não encontrado na mão!`);
      return false;
    }
    item = jogador.mao[indexItem];
  }
  // Se for objeto item
  else if (itemParam?.nome && itemParam?.tipo) {
    indexItem = jogador.mao.findIndex(i => i === itemParam);
    if (indexItem === -1) {
      console.log(`Item ${itemParam.nome} não está na mão do jogador!`);
      return false;
    }
    item = itemParam;
  }
  // Tipo inválido
  else {
    console.log("Erro: Parâmetro deve ser índice (number), nome (string) ou objeto item");
    return false;
  }

  // ========== VALIDAÇÕES DO ITEM ==========
  if (!item || item.tipo !== "Item") {
    console.log("Erro: Não é um item válido!");
    return false;
  }

  if (item.usos <= 0) {
    console.log(`Erro: ${item.nome} não tem mais cargas disponíveis!`);
    return false;
  }

  console.log(`${jogador.nome} usou ${item.nome}!`);

  const jogadorAlvo = alvo === jogador1.campoAtivo[0] ? jogador1 : jogador2;
  if (jogadorAlvo === jogador1) oponente = jogador2
  else oponente = jogador1

  let efeitosSincronizados = {}

  // Verifica e aplica efeitos de forma segura
  if (item.efeito) {
    // Efeito de buff (verifica existência das propriedades)
    if (item.efeito.esferasdodragao) {
      if (jogador.mao.lenght >= 9) {
        showNotification("Não é possível usar as esferas do dragão, espaço insuficiente na mão", "warning");
      }
      const itens = bancoDeCartas.filter(carta => carta.tipo === "Item")

      const item1 = itens[Math.floor(Math.random() * itens.length)]
      const item2 = itens[Math.floor(Math.random() * itens.length)]

      jogador.mao.push(item1, item2)
      if (jogador === jogadorSelecionado) {
        showNotification(`${jogador.nome} usou as Esferas do Dragão! foram adicionados a mão: ${item1.nome} e ${item2.nome}!`, "success");
      }
     efeitosSincronizados.sorteados = [item1, item2]
    }

    if (item.efeito.godYamcha) {
      if (!oponente.mao || oponente.mao.length === 0) {
        showNotification("Não foi possível usar Yamcha: a mão do oponente está vazia.", "error");
        return false;
      }

      // Escolhe e remove aleatoriamente uma carta da mão do oponente
      const indiceAleatorio = Math.floor(Math.random() * oponente.mao.length);
      const [cartaRemovida] = oponente.mao.splice(indiceAleatorio, 1);

      if (jogador === jogadorSelecionado) {
      if (cartaRemovida.tipo === "Item" ?? undefined) {
        showNotification(`💢 God Yamcha descartou ${cartaRemovida.nome} da mão de ${oponente.nome}!`, "success");
      }
    } else {
      showNotification(`💢 God Yamcha descartou ${cartaRemovida.nome} de sua mão!`, 'error')
    }

    if (jogador != jogadorSelecionado) {
      if (!cartaRemovida.tipo) {
        showNotification(`🥱 God Yamcha solou ${cartaRemovida.nome} que estava em sua mão...`, "error");
      }
    }

    efeitosSincronizados.descartada = cartaRemovida
    }

    if (item.efeito.escudo) {
      if (alvo.escudo) {
        showNotification(`⚠️ Não foi possível usar ${item.nome}: ${alvo.nome} já tem um escudo ativo!`, "error");
        return;
      }

      // Inicializa o escudo
      alvo.escudo = {
        tipo: item.efeito.escudo.tipo,
        valor: item.efeito.escudo.valor, // Valor total (ex.: 500)
        valorMax: item.efeito.escudo.valor,
        duracao: item.efeito.escudo.permanente // Vida atual do escudo (começa cheia)
      };
    if (jogador === jogadorSelecionado) {
      showNotification(`🛡️ ${alvo.nome} agora possui um escudo ativo.`, "success");
    }
    }

    if (item.efeito.arena) {
      if (!oponente.campoAtivo[0].passiva?.principeSayajin && !oponente.campoAtivo[0].imunidade) {
        alvo.arena = true
        alvo.desafiador = true
        oponente.campoAtivo[0].arena = true
        oponente.campoAtivo[0].desafiador = true
      
      if (jogador === jogadorSelecionado) {
        showNotification(`${alvo.nome} e ${oponente.campoAtivo[0].nome} isolaram-se em um confronto!`, "success");
      }
      } else {
        showNotification(`${oponente.campoAtivo[0].nome} não pode ser afetado pela arena!`, "error");
      }
    }

    if (item.efeito.buff) {
      if (!alvo) {
        console.log("Erro: Alvo inválido!");
        return false;
      }
      if (item.efeito.buff.vida && alvo.vida !== undefined) {
        alvo.vida = alvo.vida + item.efeito.buff.vida
        alvo.vidaMax = alvo.vidaMax + item.efeito.buff.vida
        showNotification(`+${item.efeito.buff.vida} de vida para ${alvo.nome}!`, "info");
      }

      if (item.efeito.buff.danoAument && alvo.danoAument !== undefined) {
        alvo.danoAument += item.efeito.buff.danoAument;
        showNotification(`+${item.efeito.buff.danoAument} de dano de todas as fontes para ${alvo.nome}!`, "info");
      }

      if (item.efeito.buff.imunidade) {
        if (alvo.imunidade || alvo.passiva.principeSayajin) {
          showNotification(`Não foi possível usar ${item.nome}: ${alvo.nome} ja possui uma imunidade ativa!`, "error");
          return;
        }
        alvo.imunidade = true
        showNotification(`${alvo.nome} agora possui imunidade a efeitos negativos!`, "info");
      }
    }

    if (item.efeito.aprimoramentoTemporario) {
      if (item.efeito.aprimoramentoTemporario.buffKiExtra) {
        alvo.KiTemporario = item.efeito.aprimoramentoTemporario.buffKiExtra;
        alvo.temporizadorKi = item.efeito.aprimoramentoTemporario.duracao;
        showNotification(`+${item.efeito.aprimoramentoTemporario.buffKiExtra} de ki extra para ${alvo.nome} por ${item.efeito.aprimoramentoTemporario.temporizador} rodadas!`, "info");
      }
      if (item.efeito.aprimoramentoTemporario.danoAument) {
        if (alvo.DanoTemporario) {
          showNotification(`Não foi possível usar ${item.nome}: O alvo já possui um buff de dano ativo.`, "info");
          return;
        }
        alvo.DanoTemporario = item.efeito.aprimoramentoTemporario.danoAument;
        alvo.temporizadorDano = item.efeito.aprimoramentoTemporario.temporizador;
        showNotification(`+${item.efeito.aprimoramentoTemporario.danoAument} de dano de todas as fontes para ${alvo.nome} por ${item.efeito.aprimoramentoTemporario.temporizador} rodadas!`, "info");
      }
    }

    if (item.efeito.timingBuff) {
      alvo.timingBuff = item.efeito.timingBuff.timing;
      alvo.buff = item.efeito.timingBuff.dano
      showNotification(`Em ${item.efeito.timingBuff.timing} rodadas, ${alvo.nome} receberá +${item.efeito.timingBuff.dano} de dano!`, "info");
    }

    // Efeito de revelar mão
    if (item.efeito.revelarMao) {
      if (jogador === jogadorSelecionado) {
      if (oponente.mao.length === 0) {
          showNotification("A mão do oponente está vazia!", "warning");
          return false;
      }
      
      // Criar modal para mostrar a mão do oponente
     const modal = document.createElement('div');
modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
    flex-direction: column;
`;

modal.innerHTML = `
    <div style="
        background: #1a1a1a;
        padding: 20px;
        border-radius: 10px;
        border: 3px solid #f0c000;
        max-width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        width: 600px;
    ">
        <h2 style="color: #f0c000; text-align: center; margin-top: 0;">Mão de ${oponente.nome}</h2>
        <div id="mao-oponente" style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
            padding: 10px;
        "></div>
        <button onclick="this.parentNode.parentNode.remove()" style="
            background: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            width: 100%;
            font-weight: bold;
        ">
            Fechar
        </button>
    </div>
`;

document.body.appendChild(modal);

// Estilizar as cartas como na mão do jogador
const maoOponente = modal.querySelector('#mao-oponente');

oponente.mao.forEach(carta => {
    if (carta.tipo !== "Item") return;

    const card = document.createElement('div');
    card.style.cssText = `
      width: 160px;
      min-height: 240px;
      border-radius: 8px;
      background: #f3f3f3;
      border: 2px solid #ccc;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      transition: transform 0.2s;
    `;

    const imagem = document.createElement('div');
    imagem.style.cssText = `
      height: 140px;
      background-image: url('${carta.imagem}');
      background-size: cover;
      background-position: center;
      position: relative;
    `;

    const nome = document.createElement('div');
    nome.textContent = carta.nome;
    nome.style.cssText = `
      position: absolute;
      top: 0;
      width: 100%;
      background: rgba(237, 237, 237, 0.5); 
      color: black;
      font-weight: bold;
      font-size: 13px;
      padding: 3px 5px;
      text-align: center;
      border: 1px solid #A8A9AD;
    `;
    imagem.appendChild(nome);

    const descricao = document.createElement('div');
    descricao.innerHTML = carta.descricao || 'Sem descrição';
    descricao.style.cssText = `
      padding: 8px;
      font-size: 12px;
      color: #222;
      line-height: 1.2em;
      background: #E0E0E0;
      flex-grow: 1;
    `;

    const tipo = document.createElement('div');
    tipo.textContent = "Item";
    tipo.style.cssText = `
      text-align: right;
      font-size: 11px;
      color: #666;
      padding: 4px 8px;
      border-top: 1px solid #ddd;
      background: #E0E0E0;
    `;

    card.appendChild(imagem);
    card.appendChild(descricao);
    card.appendChild(tipo);
    maoOponente.appendChild(card);
});

      
      const maoContainer = modal.querySelector('#mao-oponente');
      
      // Adiciona cada carta do oponente
      oponente.mao.forEach(carta => {
          const card = document.createElement('div');
          card.style.cssText = `
              background: #333;
              border: 2px solid ${carta.tipo === "Item" ? '#3498db' : '#f0c000'};
              border-radius: 8px;
              padding: 10px;
              color: white;
              text-align: center;
          `;
          
          card.innerHTML = `
              <h4 style="margin: 0 0 5px 0; color: ${carta.tipo === "Item" ? '#3498db' : '#f0c000'}">
                  ${carta.nome} ${carta.tipo === "Item" ? '(Item)' : ''}
              </h4>
              ${carta.tipo !== "Item" ? `
                  <p style="margin: 3px 0; font-size: 0.9em;">Vida: ${carta.vida}/${carta.vidaMax}</p>
                  <p style="margin: 3px 0; font-size: 0.9em;">Ki: ${carta.ki}/${carta.kiMax}</p>
              ` : ''}
              ${carta.usos !== undefined ? `<p style="margin: 3px 0; font-size: 0.9em;">Usos: ${carta.usos}</p>` : ''}
          `;
          
          maoContainer.appendChild(card);
      });
      
      document.body.appendChild(modal);
      showNotification(`Mão de ${oponente.nome} revelada!`, "success");
  }
}

    if (item.efeito.torrekarin) {
      if (jogador.mao.length >= 9) {
        showNotification(`Não foi possível usar ${item.nome}: O jogador não possui espaço suficiente na mão!`, "error");
        return false;
      }
      const semente =   { //  CARTA - [3] Semente dos Deuses
    nome: "Semente dos Deuses",
    tipo: "Item",
    usos: 1,
    imagem: "/static/assets/36Semente dos Deuses.jpg",
    descricao: "Restaura em 15% o Ki total e a vida da carta escolhida em 30%",
    efeito: {
      restaurarStatus: {
        ki: 0.15,
        vida: 0.3
      }
    }
  }
      const semente1 = JSON.parse(JSON.stringify(semente));
const semente2 = JSON.parse(JSON.stringify(semente));
jogador.mao.push(semente1, semente2);
      if (jogador === jogadorSelecionado) {
      showNotification(`Foram geradas 2 Sementes dos Deuses na mão de ${jogador.nome}!`, "success");
      }
    }

    // Efeito de comprar cartas
    if (item.efeito.comprarCartas) {
      const cartasParaComprar = item.efeito.comprarCartas;
      for (let i = 0; i < cartasParaComprar && jogador.deck.length > 0; i++) {
        const cartaComprada = jogador.deck.pop();
        if (cartaComprada) {
          if (jogador.mao.length >= 10) {
                  if (jogador === jogadorSelecionado) {
            showNotification(`Não foi possível comprar ${cartaComprada.nome}: O jogador não possui espaço suficiente na mão!`, "error");
                  }
            jogador.deck.push(cartaComprada);
          } else {
            jogador.mao.push(cartaComprada);
                  if (jogador === jogadorSelecionado) {
            showNotification(`🃏 ${jogador.nome} comprou: ${cartaComprada.nome}`, "success");
                  }
          }
        }
      }
    }

    if (item.efeito?.retornarMao) {
      if (jogador.mao.length >= 10) {
        showNotification("Não foi possível retornar: não há espaço suficiente na mão! (10/10)!", "error");
        return false;
      }

      if (alvo.arena) {
        delete alvo.arena
      }
      // Verifica se há carta no campo ativo
      if (jogador.campoAtivo.length > 0) {
        const cartaRetornada = jogador.campoAtivo.pop();

        // Verifica se a carta é válida
        if (cartaRetornada) {
          // Restaura a vida se houver vidaMax definida
          if (typeof cartaRetornada.vidaMax !== 'undefined') {
            cartaRetornada.vida = cartaRetornada.vidaMax;
            cartaRetornada.inativoPorTurno = 3;
          } else {
            console.warn(`${cartaRetornada.nome} não tem vidaMax definida`);
          }
          if (typeof cartaRetornada.ki !== 'undefined') {
            cartaRetornada.ki = 0;
          }
          // Adiciona à mão
          jogador.mao.push(cartaRetornada);
          showNotification(`🔄 ${cartaRetornada.nome} retornou à mão de ${jogador.nome}`, "success");
          if ((item.efeito.retornarBanco || item.efeito.retornarMao) && jogador === jogadorSelecionado) {
  const cartasDisponiveis = jogador.bancoLuta.filter(c => c.vida > 0);
socket.emit('solicitar_substituicao', {
  jogador: jogadorSelecionado.nome, // MUITO IMPORTANTE
  cartas: cartasDisponiveis,
  sala_id: "sala1",
  origem: socket.id
});
}
        }
      } else {
        console.log("Nenhuma carta no campo ativo para retornar");
      }
    }

    if (item.efeito.retornarBanco) {
      if (jogador.bancoLuta.length >= 6) {
        showNotification("Banco cheio, não é possível retornar (6/6)!", "error");
        return false;
      }
      // Verifica se há carta no campo ativo
      if (jogador.campoAtivo.length > 0) {
        const cartaRetornada = jogador.campoAtivo.pop();

        // Verifica se a carta é válida
        if (cartaRetornada) {
          if (cartaRetornada.arena) {
            delete cartaRetornada.arena
          }
          // Restaura a vida se houver vidaMax definida
          if (typeof cartaRetornada.vidaMax !== 'undefined') {
            cartaRetornada.vida = cartaRetornada.vidaMax;
            cartaRetornada.inativoPorTurno = 3;
          } else {
            console.warn(`${cartaRetornada.nome} não tem vidaMax definida`);
          }
          // Adiciona à mão
          showNotification(`🔄 ${cartaRetornada.nome} retornou ao banco de ${jogador.nome}`, "success");
          jogador.bancoLuta.push(cartaRetornada);
          if ((item.efeito.retornarBanco || item.efeito.retornarMao) && jogador === jogadorSelecionado) {
  const cartasDisponiveis = jogador.bancoLuta.filter(c => c.vida > 0);
socket.emit('solicitar_substituicao', {
  jogador: jogadorSelecionado.nome, // MUITO IMPORTANTE
  cartas: cartasDisponiveis,
  sala_id: "sala1",
  origem: socket.id
});
}
        }
      } else {
        console.log("Nenhuma carta no campo ativo para retornar");
      }
    }

    if (item.efeito?.restaurarStatus) {
      if (item.efeito.restaurarStatus.vida) {
        const vidaRestaurada = item.efeito.restaurarStatus.vida * alvo.vidaMax;
        alvo.vida = Math.min(alvo.vida + vidaRestaurada, alvo.vidaMax);
      }
      showNotification(`+${item.efeito.restaurarStatus.vida * 100}% de vida para ${alvo.nome}!`, "info");
      if (item.efeito.restaurarStatus.ki) {
        const kiRestaurado = item.efeito.restaurarStatus.ki * alvo.kiMax;
        alvo.ki = Math.min(alvo.ki + kiRestaurado, alvo.kiMax);
      }
      showNotification(`+${item.efeito.restaurarStatus.ki * 100}% de ki para ${alvo.nome}!`, "info");
    }

    if (item.efeito?.acaoTurno) {
      if (item.efeito.acaoTurno.trocasTurno) {
        jogador.trocasTurno -= item.efeito.acaoTurno.trocasTurno;
        showNotification(`+ ${item.efeito.acaoTurno.trocasTurno} de trocas de turno para ${jogador.nome}!`, "info");
      }
      if (item.efeito.acaoTurno.acoesTurno) {
        jogador.acoesTurno -= item.efeito.acaoTurno.acoesTurno;
        showNotification(`+${item.efeito.acaoTurno.acoesTurno} de ataques esse turno para ${jogador.nome}!`, "info");
      }
      if (item.efeito.acaoTurno.acumulosKiTurno) {
        jogador.acumulosKiTurno -= item.efeito.acaoTurno.acumulosKiTurno;
        showNotification(`+${item.efeito.acaoTurno.acumulosKiTurno} de acumulos de ki esse turno para ${jogador.nome}!`, "info");
      }
    }
  }

  if (item.usos !== undefined) {
    item.usos--;
    
    // Remove o item se:
    // 1. For de uso único (mesmo que não tenha usos definido) OU
    // 2. Tiver acabado os usos
    const deveRemover = item.usos <= 0 || 
                       (item.efeito.retornarMao || item.efeito.retornarBanco); // Itens especiais
    
    if (deveRemover) {
        const indexToRemove = jogador.mao.findIndex(i => i === item);
        if (indexToRemove !== -1) {
            jogador.mao.splice(indexToRemove, 1);
            console.log(`${item.nome} foi consumido e removido da mão!`);
        }
    }
  }

  jogador.usoItens++

  const audio = new Audio('/static/assets/Voicy_Black Gokus Time Ring Sound Effect.mp3');
  audio.play().catch(e => console.log("Autoplay não permitido:", e));

      socket.emit('item_usado', {
        jogador,
        item,
        alvo,
        sala_id: "sala1",
        origem: socket.id,
        efeitos: efeitosSincronizados
      });

  atualizarCartasNaInterface()
  
  if (!item.efeito.retornarMao && !item.efeito.retornarBanco) {
  verificarCampoVazio()
  }

  return true;
}

function descerGuerreiroDaMao(carta, jogador, index, modalMao) {
  if (jogador.bancoLuta.length >= 6) {
      showNotification("Banco cheio! (Máx. 6 cartas)", "error");
      return;
  }

  // Remove da mão e adiciona ao banco
  jogador.mao.splice(index, 1);
  jogador.bancoLuta.push(carta);

  // Fecha o modal da mão
  if (modalMao) modalMao.remove();

  // Atualiza a UI
  if (jogador === jogador1) {
      mostrarBanco(jogador1.bancoLuta, "banco-cartas");
  } else {
      mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
  }
  
  showNotification(`${carta.nome} movido para o banco!`, "success");

  socket.emit('carta_movida_para_banco', {
    jogador: jogador.nome,
    carta: carta,
    sala_id: "sala1",
    origem: socket.id
  });
}

function comprarCarta(jogador) {
  if (jogador.deck.length === 0 && jogador.nome === jogadorSelecionado.nome) {
    showNotification(`[${jogador.nome}] está sem cartas no deck!`);
    return;
  }
  if (jogador.deck.length === 0) {
    return;
  }
  if (jogador.mao.length >= 10) {
    showNotification(`[${jogador.nome}] já está com a mão cheia! não é possível comprar mais cartas (limite de 10 cartas)`);
    return;
  }
  const cartaComprada = jogador.deck.pop();
  jogador.mao.push(cartaComprada);
  if (jogador === jogadorSelecionado) {
    showNotification(`[${jogador.nome}] comprou ${cartaComprada.nome}!`, "info");
  }
  console.log(`[${jogador.nome}] comprou ${cartaComprada.nome}!`);

}

// simulação turno
// Variáveis globais para controle de turno
let turnoAtual = 1;
let jogadorAtual = jogador1; // Jogador 1 começa
let faseAtual = "inicio"; // "inicio", "principal", "fim"
const LIMITE_TURNOS = 50;

function verificarDerrota() {
  // Verifica se o jogador1 foi derrotado
  if (jogador1.campoAtivo[0]?.vida <= 0 && jogador1.bancoLuta.length === 0) {
      // Jogador 1 perdeu
      showNotification(`${jogador1.nome} foi derrotado! ${jogador2.nome} venceu a batalha!`, "error");
      finalizarJogo(jogador2);
      return true;
  }

  // Verifica se o jogador2 foi derrotado
  if (jogador2.campoAtivo[0]?.vida <= 0 && jogador2.bancoLuta.length === 0) {
      // Jogador 2 perdeu
      showNotification(`${jogador2.nome} foi derrotado! ${jogador1.nome} venceu a batalha!`, "success");
      finalizarJogo(jogador1);
      return true;
  }

  // Verifica se a carta ativa morreu mas ainda há cartas no banco
  if (jogador1.campoAtivo[0]?.vida <= 0) {
      showNotification(`${jogador1.campoAtivo[0].nome} foi derrotado(a), substitua a carta ativa.`, "warning");
      substituirCartaDerrotada(jogador1);
  }

  if (jogador2.campoAtivo[0]?.vida <= 0) {
      showNotification(`${jogador2.campoAtivo[0].nome} foi derrotado(a), substitua a carta ativa.`, "warning");
      substituirCartaDerrotada(jogador2);
  }

  // Verifica se o campo está vazio (pode acontecer em casos específicos)
  if (jogador1.campoAtivo.length === 0 && jogador1.bancoLuta.length > 0) {
      showNotification(`${jogador1.nome}, selecione uma nova carta para o campo!`, "warning");
      substituirCartaDerrotada(jogador1);
  }

  if (jogador2.campoAtivo.length === 0 && jogador2.bancoLuta.length > 0) {
      showNotification(`${jogador2.nome}, selecione uma nova carta para o campo!`, "warning");
      substituirCartaDerrotada(jogador2);
  }

  return false; // Ninguém foi derrotado ainda
}

function finalizarJogo(vencedor) {
  // Desabilita todos os botões
  document.querySelectorAll('button').forEach(btn => {
      btn.disabled = true;
  });

  // Mostra mensagem de vitória
  const mensagemVitoria = document.createElement('div');
  mensagemVitoria.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
      padding: 30px;
      border-radius: 15px;
      border: 3px solid gold;
      color: white;
      text-align: center;
      z-index: 10001;
      box-shadow: 0 0 30px rgba(240, 192, 0, 0.7);
      max-width: 80%;
  `;
  
  mensagemVitoria.innerHTML = `
      <h1 style="color: gold; margin-top: 0;">🏆 Vitória! 🏆</h1>
      <p style="font-size: 1.5em;">${vencedor.nome} venceu a batalha!</p>
      <p>Turno final: ${turnoAtual}</p>
      <button onclick="location.reload()" style="
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 15px;
      ">
          Jogar Novamente
      </button>
  `;
  
  document.body.appendChild(mensagemVitoria);
}

// Função auxiliar para substituir carta derrotada
function substituirCartaDerrotada(jogador) {
 
  // Primeiro tenta encontrar cartas totalmente disponíveis (vivas e não inativas)
  let cartasDisponiveis = jogador.bancoLuta.filter(carta => 
      carta.vida > 0 && (!carta.inativoPorTurno || carta.inativoPorTurno <= 0)
  );

  // Se não encontrar cartas totalmente disponíveis, procura por cartas inativas
  if (cartasDisponiveis.length === 0) {
      cartasDisponiveis = jogador.bancoLuta.filter(carta => carta.vida > 0);
      
      // Se ainda não encontrar nenhuma carta válida
      if (cartasDisponiveis.length === 0) {
          showNotification("Nenhuma carta disponível no banco!", "error");
          return false;
      }
      
      // Avisa que só há cartas inativas disponíveis
      showNotification("Apenas cartas inativas disponíveis no banco!", "warning");
  }
  
  const campoVazio = jogador.campoAtivo.length === 0 || 
                    (jogador.campoAtivo[0]?.vida <= 0);

if (campoVazio && jogador.bancoLuta.length > 0) {
    const cartaAnterior = jogador.campoAtivo[0];

  // ⚠️ Se a carta anterior estava marcada para retornar
  if (cartaAnterior?.marcarParaRetorno) {
    cartaAnterior.vida = cartaAnterior.vidaMax;
    cartaAnterior.ki = 0;
    cartaAnterior.inativoPorTurno = 3;
    delete cartaAnterior.marcarParaRetorno;
    jogador.mao.push(cartaAnterior);

    showNotification(`${cartaAnterior.nome} restaurou sua vida e voltou à mão!`, 'success');

    // Limpa o campo
    jogador.campoAtivo.pop();
    socket.emit('atualizar_mao_trunks', {
      sala_id: "sala1",
      novaMao: jogador.mao.map(c => ({ ...c })),
      nomeJogador: jogador.nome
    });
  }
    socket.emit('solicitar_substituicao', {
      jogador: jogadorSelecionado.nome, // MUITO IMPORTANTE
      cartas: cartasDisponiveis,
      sala_id: "sala1",
      origem: socket.id
    });

    return true;
} 
  return false;
}

// Função principal para iniciar o jogo
function iniciarJogo() {
    console.log("🔥 Iniciando partida!");
    console.log("👤 Jogador 1:", jogador1);
    console.log("🧍 Jogador 2:", jogador2);

    if (jogadorSelecionado === "jogador1") {
      jogadorSelecionado = jogador1;
      adversario = jogador2;
    } else {
      jogadorSelecionado = jogador2;
      adversario = jogador1;
    }

    turnoAtual = 1;
    jogadorAtual = jogador1;
    faseAtual = "inicio";
    ultimoTurnoCapsulas = -1; 
    
    // Atualiza a interface
    atualizarInterfaceTurno();
    atualizarCartasNaInterface();
    
    // Inicia o primeiro turno normalmente
    iniciarTurno();
}

function iniciarTurno() {
  // 1. Resetar as variáveis de controle de turno para ambos jogadores
  resetarContadoresTurno(jogador1);
  resetarContadoresTurno(jogador2);
  
  // 2. Executar efeitos de início de turno
  executarEfeitosInicioTurno();
  
  // 3. Atualizar a interface do jogo
  atualizarInterfaceTurno();
  
  // 4. Verificar se o jogo deve continuar
  if (verificarDerrota()) {
      return;
  }
  
  // 5. Iniciar a fase principal do turno
  faseInicioTurno();
}

// Função auxiliar para resetar os contadores
function resetarContadoresTurno(jogador) {
  jogador.acoesTurno = 0;         // Número de ações realizadas
  jogador.acumulosKiTurno = 0;    // Número de acumulações de KI
  jogador.trocasTurno = 0;        // Número de trocas de personagem
  jogador.usoItens = 0;           // Número de itens usados
  jogador.jaAtacou = false;       // Flag para controle de ataque
}

// Função auxiliar para efeitos de início de turno
function executarEfeitosInicioTurno() {
  // Comprar cartas apenas no primeiro turno ou quando for o turno do jogador1
  if (jogadorAtual === jogador1 ) {
      comprarCarta(jogador1);
      comprarCarta(jogador2);

      reduzirRecargas(jogador2);
 
      gerarCapsulas();
  }

  if (jogadorAtual === jogador1 && turnoAtual != 1) {
    verificarEvolucao(jogador1);
    verificarEvolucao(jogador2);

    verificarAtordoamento(jogador2);
    reduzirAtordoamento(jogador2);  

  }

  if (jogadorAtual === jogador2 ) {
    reduzirRecargas(jogador1);

    verificarAtordoamento(jogador1);
    reduzirAtordoamento(jogador1);
  }
  
}

// Função para iniciar um novo turno
function faseInicioTurno() {
  faseAtual = "inicio";
  
  // Verificar derrota
  if (verificarDerrota()) {
      return;
  }
  
  // Atualiza a interface
  atualizarCartasNaInterface();
  
  // Passa para a fase principal
  fasePrincipal();
}

// Fase principal do turno (onde o jogador faz ações)
function fasePrincipal() {
    faseAtual = "principal";
    atualizarInterfaceTurno();
    
    // Habilita os botões para o jogador atual
    habilitarBotoesJogador(jogadorAtual);
    
    // Mostra mensagem
    if (jogadorAtual === jogadorSelecionado) {
          showNotification(`Turno ${turnoAtual} - ${jogadorAtual.nome}, é sua vez!`, "info");
    } else {
          showNotification(`Turno ${turnoAtual} - é a vez de ${adversario.nome}!`, "error");
    }
}

// Função para finalizar o turno
function finalizarTurno() {
  if (faseAtual !== "principal" || jogadorSelecionado !== jogadorAtual) {
    showNotification("Você não pode finalizar o turno agora!", "warning");
    return;
  }

  socket.emit('end-turn', { sala_id: "sala1" });
}

// Fase de fim de turno
function faseFimTurno() {
    faseAtual = "fim";
    
    // Verifica escudos temporários
    [jogador1, jogador2].forEach(jogador => {
        if (jogador.escudo && !jogador.escudo.permanente) {
            jogador.escudo.turnosAtivos++;
            if (jogador.escudo.turnosAtivos >= jogador.escudo.duracao) {
                showNotification(`Escudo de ${jogador.nome} expirou!`, "info");
                delete jogador.escudo;
            }
        }
        
        // Verifica jaula do tempo
        if (jogador.jaulaTempo !== undefined) {
            jogador.jaulaTempo -= 1;
            if (jogador.jaulaTempo <= 0) {
                showNotification(`⏳ ${jogador.nome} se libertou da Jaula do Tempo!`, "info");
                delete jogador.jaulaTempo;
            }
        }
    });
    
    // Alterna o jogador atual
    jogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1;
    
    // Se voltou para o jogador1, incrementa o turno
    if (jogadorAtual === jogador1) {
        turnoAtual++;
        
        // Verifica limite de turnos
        if (turnoAtual > LIMITE_TURNOS) {
            showNotification("A batalha terminou em empate devido ao limite de turnos!", "warning");
            return;
        }
    }
    
    // Inicia o próximo turno
    iniciarTurno();
}

// Atualiza a interface com informações do turno
function atualizarInterfaceTurno() {
    const elementoTurno = document.getElementById("info-turno");
    if (!elementoTurno) {
        // Cria o elemento se não existir
        const controls = document.getElementById("controls");
        const infoTurno = document.createElement("div");
        infoTurno.id = "info-turno";
        infoTurno.style.marginBottom = "10px";
        infoTurno.style.fontWeight = "bold";
        infoTurno.style.textAlign = "center";
        controls.insertBefore(infoTurno, controls.firstChild);
    }
    
    
    // Atualiza o botão de finalizar turno
    const btnFinalizar = document.getElementById("end-turn");
    btnFinalizar.disabled = faseAtual !== "principal";
    btnFinalizar.textContent = faseAtual === "principal" ? "Finalizar Turno" : "Aguarde...";
}

// Atualiza todas as cartas na interface
function atualizarCartasNaInterface() {
  // Verifica se o jogador selecionado é o jogador1
  if (jogadorSelecionado === jogador1) {
    exibirCarta(jogadorSelecionado.campoAtivo[0], "player1-card");
    exibirCarta(adversario.campoAtivo[0], "player2-card");
    mostrarBanco(jogadorSelecionado.bancoLuta, "banco-cartas");
    mostrarBanco(adversario.bancoLuta, "banco-cartas-jogador2");
  }
  // Caso contrário, jogadorSelecionado é o jogador2
  else {
    exibirCarta(adversario.campoAtivo[0], "player1-card");
    exibirCarta(jogadorSelecionado.campoAtivo[0], "player2-card");
    mostrarBanco(adversario.bancoLuta, "banco-cartas");
    mostrarBanco(jogadorSelecionado.bancoLuta, "banco-cartas-jogador2");
  }
}

// Habilita/desabilita botões conforme o jogador atual
function habilitarBotoesJogador(jogador) {
  // 1. Controles principais (troca e mão) - mantendo sua lógica original
  
  const btnFinalizarturno = document.getElementById("end-turn");
  
  if (jogadorAtual != jogadorSelecionado) {
    btnFinalizarturno.disabled = true;
  } else {
    btnFinalizarturno.disabled = false;
  }

  // 3. Controle SIMPLES para o modal de carta ampliada
  if (modalAtaqueAtual) {
      const { elemento } = modalAtaqueAtual;
      const botoesModal = elemento.querySelectorAll('button, .golpe-item');
      botao.classList.toggle('botao-desabilitado', jogador !== modalAtaqueAtual.jogador);
      
      botoesModal.forEach(botao => {
          // Desabilita todos os botões primeiro
          botao.disabled = true;
          botao.style.pointerEvents = 'none';
          botao.style.opacity = '0.5';
          
          // Habilita apenas se for do jogador atual
          if (jogador === modalAtaqueAtual.jogador) {
              botao.disabled = false;
              botao.style.pointerEvents = 'auto';
              botao.style.opacity = '1';
          }
      });
  }
}

// Após qualquer ação que possa derrotar uma carta:
function verificarCampoVazio() {
  substituirCartaDerrotada(jogadorSelecionado); // apenas o jogador atual
}

///////////////////////////////////////////////////////////////////////////////
/////////////////INTERAÇÃO COM HTML///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////INTERAÇÃO COM HTML///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

let modalAtaqueAtual = null; // Variável global para controlar o modal aberto

//////////////////////////////////////
///////SISTEMA DE NOTIFICAÇÕES///////
//////////////////////////////////////

// Sistema de Notificações Reutilizável
function showNotification(message, type = 'info', duration = 4000) {
  const container = document.getElementById('notification-system');
  
  // Cria a notificação
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close" style="
      background: transparent;
      border: none;
      color: white;
      font-weight: bold;
      cursor: pointer;
      margin-left: 10px;
    ">✕</button>
  `;

  // Adiciona ao container
  container.appendChild(notification);

  // Remove após a duração
  let timeout = setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s reverse forwards';
    setTimeout(() => notification.remove(), 300);
  }, duration);

  // Fechar manualmente
  notification.querySelector('.notification-close').addEventListener('click', () => {
    clearTimeout(timeout);
    notification.style.animation = 'slideIn 0.3s reverse forwards';
    setTimeout(() => notification.remove(), 300);
  });
}

// Modal de Confirmação Universal
function showConfirm(message, confirmCallback) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  modal.innerHTML = `
    <div style="
      background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
      padding: 25px;
      border-radius: 10px;
      border: 2px solid #f0c000;
      width: 350px;
      max-width: 90%;
      text-align: center;
      box-shadow: 0 0 20px rgba(240, 192, 0, 0.5);
    ">
      <h3 style="margin-top: 0; color: #fff;">${message}</h3>
      <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
        <button id="confirm-yes" style="
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">Sim</button>
        <button id="confirm-no" style="
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">Não</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Remove o modal após a escolha
  const removeModal = () => {
    modal.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => modal.remove(), 300);
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  modal.querySelector('#confirm-yes').addEventListener('click', () => {
    confirmCallback(true);
    removeModal();
  });

  modal.querySelector('#confirm-no').addEventListener('click', () => {
    confirmCallback(false);
    removeModal();
  });
}         

function mostrarConfirmacao(mensagem, callback) {
  const modal = document.getElementById('confirmacao-ataque');
  const texto = document.getElementById('texto-confirmacao');
  const detalhes = document.getElementById('detalhes-golpe');
  
  texto.textContent = mensagem;
  detalhes.textContent = '';
  modal.style.display = 'block';
  modal.style.zIndex = '10001'; // Acima do modal da mão (10000)

    // Remove eventos anteriores para evitar duplicação
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');
    btnConfirmar.replaceWith(btnConfirmar.cloneNode(true));
    btnCancelar.replaceWith(btnCancelar.cloneNode(true));

    modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Novo listener para "Sim"
    // Configura novos listeners
    document.getElementById('btn-confirmar').onclick = () => {
      modal.style.display = 'none';
      modal.style.zIndex = '10000'; // Restaura z-index padrão
      callback();
  };

  document.getElementById('btn-cancelar').onclick = () => {
      modal.style.display = 'none';
      modal.style.zIndex = '10000'; // Restaura z-index padrão
  };
}
//////////////////////////////////////
///////EXIBIÇÃO DAS CARTAS////////////
//////////////////////////////////////

function exibirCarta(carta, idContainer) {
  const container = document.getElementById(idContainer);
  if (!container) return;

  // Definindo jogador só para usar na ampliarCarta
  let jogador = container.id === "player1-card" ? jogador1 : jogador2;

  container.innerHTML = ""; // limpa container

  // Nome exibido: corta até 5 letras, remove espaços finais e adiciona "..."
  const nomeExibido = carta.nome.length > 5 ? carta.nome.slice(0, 5).trimEnd() + "..." : carta.nome;

  // Cria o elemento div da carta com o estilo do banco
  const cartaDiv = document.createElement("div");
  cartaDiv.classList.add("cartaDIV");
  cartaDiv.style.backgroundImage = `url('${carta.imagem}')`;
  cartaDiv.onclick = () => ampliarCarta(carta, jogador);

  cartaDiv.innerHTML = `
    <div class="conteudo-carta">
      <div class="superiorCarta">
        <h3>${nomeExibido}</h3>
        <p> ${carta.vida}HP</p>
      </div>

      <div class="inferiorCarta"> 
        <div class="info3">
          <p>Ki: ${carta.ki}<img src="/static/assets/imagem_ki.png" alt="" width="20px" style="vertical-align: middle;" ></p>
        </div>
      </div>
    </div>
  `;

  container.appendChild(cartaDiv);
}



function mostrarBanco(cartas, idContainer) {
  const container = document.getElementById(idContainer);
  container.innerHTML = "";

  let jogador = null;
  if (container.id === "banco-cartas") {
    jogador = jogador1;
  } else {
    jogador = jogador2;
  }

  cartas.forEach(carta => {
    const nomeExibido = carta.nome.length > 5
      ? carta.nome.slice(0, 5).trimEnd() + "..."
      : carta.nome;

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url('${carta.imagem}')`;
    card.onclick = () => ampliarCarta(carta, jogador);

    card.innerHTML = `
      <div class="conteudo-carta">
        <div class="superiorCarta">
          <h3>${nomeExibido}</h3>
          <p> ${carta.vida}HP</p>
        </div>

        <div class="inferiorCarta"> 
          <div class="info3">
            <p>Ki: ${carta.ki}<img src="/static/assets/imagem_ki.png" alt="" width="20px" style="vertical-align: middle;" ></p>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function ampliarCarta(carta, jogador) {
  if (modalAtaqueAtual) fecharCarta();

  const container = document.getElementById("conteudo-ampliado");
  const cartaAmpliada = document.getElementById("carta-ampliada");
  const overlay = document.getElementById("overlay");

  if (!container || !cartaAmpliada || !overlay) {
    console.error("Elemento(s) necessário(s) não encontrado(s)");
    return;
  }

  container.innerHTML = `
    <div class="chi_chi" style="background-image: url('${carta.imagem}');">
      <div class="interior-carta">
        <div class="superiorCarta">
          <h1>${carta.nome}</h1>
          <div class="vida"><h2>${carta.vida}HP</h2></div>
        </div>

        <div class="inferiorCarta">
          ${carta.passiva ? `
            <div class="ataque1">
              <div class="info">
                <a href="#" onclick="event.preventDefault();">Habilidade Passiva:</a>
                <p>${carta.passiva.nome}</p>
              </div>
              <div class="descri">
                <p>${carta.passiva.descricao}</p>
              </div>
            </div>` : ''
          }

          ${carta.golpes ? Object.entries(carta.golpes).map(([chave, golpe], i) => `
            <div class="ataque${i + 2}">
              <div class="info${i + 2}">
                <a href="#" onclick="event.preventDefault(); selecionarGolpe('${chave}')">Habilidade Ativa:</a>
                <p>${golpe.nome}</p>
              </div>
              <div class="${i === 1 ? 'descri2' : 'descri'}">
                <p>${golpe.descricao}</p>
                <p style="font-size: 12px; color: #ccc;">Dano: ${golpe.dano || 0} | Ki: ${golpe.custoKi || 0}</p>
              </div>
            </div>
          `).join('') : ''
          }

          ${(jogador.bancoLuta.includes(carta) || carta === jogador.campoAtivo[0]) ? `
            <button onclick="acumularKiSelecionado()" class="botao-ki">Acumular Ki</button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  window._cartaSelecionada = carta;
  window._jogadorSelecionado = jogador;

  cartaAmpliada.style.display = "block";
  overlay.style.display = "block";

  modalAtaqueAtual = {
    carta: carta,
    jogador: jogador,
    elemento: cartaAmpliada
  };

  if (jogador !== jogadorAtual) {
    const botoes = cartaAmpliada.querySelectorAll('button');
    botoes.forEach(botao => {
      botao.disabled = true;
      botao.style.opacity = '0.5';
      botao.style.cursor = 'not-allowed';
    });
    const linksGolpe = cartaAmpliada.querySelectorAll('.inferiorCarta a');
    linksGolpe.forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
      };
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.5';
      link.style.cursor = 'default';
    });
  }
}
function atualizarCartaAmpliada(carta) {
  const nomeEl = document.getElementById("nome-carta");
  const vidaEl = document.getElementById("vida-carta");
  const kiEl = document.getElementById("ki-carta");

  if (nomeEl && vidaEl && kiEl) {
    nomeEl.textContent = "Nome: " + carta.nome;
    vidaEl.textContent = `Vida: ${carta.vida} / ${carta.vidaMax}`;
    kiEl.textContent = `Ki: ${carta.ki} / ${carta.kiMax}`;
  }
}

function fecharCarta() {
  if (modalAtaqueAtual) {
    modalAtaqueAtual.elemento.style.display = "none";
    document.getElementById("overlay").style.display = "none";
    modalAtaqueAtual = null; // Limpa a referência
  }
}

function formatarItemParaExibicao(item) {
  let html = `
    <div style="border: 2px solid #3498db; border-radius: 10px; padding: 10px; 
                background: #222; margin-bottom: 10px; cursor: pointer;
                transition: all 0.2s ease;">
      <h4 style="margin: 0 0 5px 0; color: #3498db">${item.nome}</h4>
      <p style="margin: 5px 0; font-size: 0.9em;">Usos: ${item.usos || 1}</p>
      <p style="margin: 5px 0; font-size: 0.9em; color: #aaa;">${item.descricao || 'Sem descrição'}</p>
    </div>
  `;
  return html;
}

function verificarModalAberto() {
  if (!modalAtaqueAtual) return;

  const carta = modalAtaqueAtual.carta;
  const jogador = modalAtaqueAtual.jogador;

  // Verifica se a carta ainda está em condições de ter o modal aberto
  const cartaValida = (
    // Está no campo ativo ou é Chi Chi no banco
    (carta === jogador.campoAtivo[0]) ||
    (carta.nome === "Chi Chi" && jogador.bancoLuta.includes(carta))
  );

  if (!cartaValida) {
    fecharCarta();
  }
}

//////////////////////////////////////////
////////////INTERAÇÕES COM A LÓGICA//////
/////////////////////////////////////////

function acumularKiSelecionado() {
  verificarModalAberto();
  if (window._cartaSelecionada && window._jogadorSelecionado !== undefined) {
    if (window._jogadorSelecionado != jogadorSelecionado) {
      showNotification("Não é possível acumular ki com cartas adversárias", "error");
      console.log("Jogador da carta:" + window._jogadorSelecionado, "Jogador Selecionado:" + jogadorSelecionado);
      return;
    }

    acumularKi(window._cartaSelecionada, window._jogadorSelecionado);
    mostrarBanco(jogador1.bancoLuta, "banco-cartas"); // Jogador 1
    exibirCarta(jogador1.campoAtivo[0], "player1-card"); // Jogador 1
    mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
    exibirCarta(jogador2.campoAtivo[0], "player2-card"); // Jogador 2
  } else {
    alert("Nenhuma carta selecionada!");
  }
}

function selecionarGolpe(nomeGolpe) {
  verificarModalAberto();
  const carta = window._cartaSelecionada;
  const jogador = window._jogadorSelecionado;

  if (jogador != jogadorSelecionado) {
    showNotification("Não é possível usar golpes com cartas adversárias", "error");
    console.log("Jogador da carta:" + jogador, "Jogador Selecionado:" + jogadorSelecionado);
    return;
  }

  if (jogadorAtual != jogadorSelecionado) {
    showNotification(" é a vez de outro jogador!", "error");
    return;
  }


  // Verificação de carta no campo ativo (exceto Chi Chi)
  if (carta.nome !== "Chi Chi" && carta !== jogador.campoAtivo[0]) {
    showNotification("Apenas a carta no campo ativo pode atacar!", "error");
    return;
  }

  const golpe = carta.golpes[nomeGolpe];

  if (carta.ki < golpe.custoKi) {
    showNotification(`🔋 KI insuficiente!<br>Necessário: ${golpe.custoKi}<br>Seu KI: ${carta.ki}`, "error");
    return;
  }

  // Atualiza o modal existente
  const modal = document.getElementById('confirmacao-ataque');
  const texto = document.getElementById('texto-confirmacao');
  const detalhes = document.getElementById('detalhes-golpe');
  const btnConfirmar = document.getElementById('btn-confirmar');
  const btnCancelar = document.getElementById('btn-cancelar');

  // Configura conteúdo
  texto.innerHTML = `Usar <strong>${golpe.nome}</strong>?`;
  detalhes.textContent = `Dano: ${golpe.dano || "?"} | Custo: ${golpe.custoKi || "0"} KI`;

  // Remove event listeners antigos para evitar duplicação
  btnConfirmar.replaceWith(btnConfirmar.cloneNode(true));
  btnCancelar.replaceWith(btnCancelar.cloneNode(true));

  // Mostra o modal
  modal.style.display = 'block';

  // Configura novos listeners
  document.getElementById('btn-confirmar').onclick = () => {
    modal.style.display = 'none';
    fecharCarta(); // Fecha o modal da carta ampliada
    
    // Executa o ataque
    if (carta.nome === "Chi Chi") {
      atacarComChiChi(jogador, golpe);
    } else {
      if (golpe.cura) {
        mostrarMenuCura(jogador, golpe);
      } else {
        if (jogador === jogador1) {
          atacar(jogador, jogador2, golpe);
        } else {
          atacar(jogador, jogador1, golpe);
        }
      }
    }
    
    // Atualiza UI
    exibirCarta(jogador1.campoAtivo[0], "player1-card");
    exibirCarta(jogador2.campoAtivo[0], "player2-card");
    mostrarBanco(jogador1.bancoLuta, "banco-cartas");
    mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
  };

  document.getElementById('btn-cancelar').onclick = () => {
    modal.style.display = 'none'; // Fecha o modal sem ações
  };
}

function mostrarConfirmacaoAtaque(golpe) {
  const modal = document.getElementById('confirmacao-ataque');
  const texto = document.getElementById('texto-confirmacao');
  const detalhes = document.getElementById('detalhes-golpe');
  const btnConfirmar = document.getElementById('btn-confirmar');
  const btnCancelar = document.getElementById('btn-cancelar');

  // Atualiza o conteúdo
  texto.textContent = `Atacar com ${golpe.nome}?`;
  detalhes.textContent = `Dano: ${golpe.dano} | Custo: ${golpe.custoKi} KI`;

  // Mostra o modal
  modal.style.display = 'block';

  // Função para fechar
  function fecharModal() {
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleEscape);
    modal.removeEventListener('click', handleOutsideClick);
  }

  // Fechar com ESC
  function handleEscape(e) {
    if (e.key === 'Escape') fecharModal();
  }

  // Fechar ao clicar fora
  function handleOutsideClick(e) {
    if (!modalContent.contains(e.target)) fecharModal();
  }

  // Adiciona os event listeners
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleOutsideClick);

  // Configura os botões
  btnConfirmar.onclick = function() {
    modal.style.display = 'none';
    // Aqui você implementará o ataque depois
    mostrarAlerta(`Ataque com ${golpe.nome} confirmado!`);
  };

  btnCancelar.onclick = function() {
    modal.style.display = 'none';
  };

  // Impede a propagação do clique no conteúdo
  modalContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

function usarItemDaMao(item, jogador, index, modalMao) {
  mostrarConfirmacao(
      `Usar ${item.nome}?`,
      () => {          
          if (modalMao) modalMao.remove();
          usarItem(index, jogador);
      }
  );
}

function mostrarMenuTroca(jogador) {
  // Verifica se há cartas para trocar
  if (jogador.bancoLuta.length === 0) {
    showNotification("Não há cartas no banco para trocar!", "warning");
    return;
  }

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  container.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      max-width: 90%;
      max-height: 100vh;
      overflow-y: auto;
      border: 2px solid #f0c000;
    ">
      <h2 style="color: gold; margin-top: 0; text-align: center;">Trocar Personagem</h2>
      <p style="color: #aaa; text-align: center;">Selecione quem entrará em combate</p>
      <div id="cartas-banco" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin: 20px 0;
      "></div>
      <button onclick="document.body.removeChild(this.parentNode.parentNode)" 
        style="
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
        ">
        Cancelar
      </button>
    </div>
  `;

  const cartasContainer = container.querySelector('#cartas-banco');
  
  jogador.bancoLuta.forEach(carta => {
    const card = document.createElement('div');
    
    // Definir estados da carta
    const isDerrotada = carta.vida <= 0;
    const isInativa = carta.inativoPorTurno > 0;

    // Aplicar estilos condicionais
    card.style.cssText = `
      background: #333;
      border: 2px solid ${isDerrotada ? 'red' : (isInativa ? '#666' : '#f0c000')};
      border-radius: 8px;
      padding: 10px;
      color: white;
      background-image: url('${carta.imagem}');
      background-size: cover;
      background-position: center;
      height: 90%;
      margin-botom: 10px;
      cursor: ${(isDerrotada || isInativa) ? 'not-allowed' : 'pointer'};
      opacity: ${(isDerrotada || isInativa) ? 0.5 : 1};
      transition: all 0.2s;
    `;
    
    card.innerHTML = `
      <h3 style="margin: 0 0 5px 0; color: ${isDerrotada ? '#ff9999' : 'white'}">${carta.nome}</h3>
      <p style="margin: 2px 0; font-size: 0.9em;">Vida: ${carta.vida}/${carta.vidaMax}</p>
      <p style="margin: 2px 0; font-size: 0.9em;">KI: ${carta.ki}/${carta.kiMax}</p>
      ${isDerrotada ? '<p style="color: #ff9999; margin: 5px 0 0 0; font-size: 0.8em;">Derrotado</p>' : ''}
      ${isInativa ? `<p style="color: #ff9999; margin: 5px 0 0 0; font-size: 0.8em;">Inativo por ${carta.inativoPorTurno} turno(s)</p>` : ''}
    `;

    // Só permite clique se estiver ativa e não derrotada
    if (!isDerrotada && !isInativa) {
      card.addEventListener('click', () => {
        if (trocarPersonagemAtivo(carta, jogador)) {
          document.body.removeChild(container);
        }
      });
      
      // Efeito hover apenas para cartas válidas
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
      });
    }

    cartasContainer.appendChild(card);
  });

  document.body.appendChild(container);
}

function mostrarMenuCura(jogador, golpe) {
  // Verifica se há cartas para trocar
  if (jogador.bancoLuta.length === 0) {
    usarAtaqueCura(jogador, jogador.campoAtivo[0], golpe);
    return;
  }

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  container.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      max-width: 90%;
      max-height: 100vh;
      overflow-y: auto;
      border: 2px solid #f0c000;
    ">
      <h2 style="color: gold; margin-top: 0; text-align: center;">Usar Cura</h2>
      <p style="color: #aaa; text-align: center;">Qual personagem deseja curar?</p>
      <div id="cartas-banco" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin: 20px 0;
      "></div>
      <button onclick="document.body.removeChild(this.parentNode.parentNode)" 
        style="
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
        ">
        Cancelar
      </button>
    </div>
  `;

  const cartasContainer = container.querySelector('#cartas-banco');

  const todasCartas = jogador.bancoLuta.concat(jogador.campoAtivo);
  
  todasCartas.forEach(carta => {
    const card = document.createElement('div');
    
    // Definir estados da carta
    const isDerrotada = carta.vida <= 0;

    // Aplicar estilos condicionais
    card.style.cssText = `
      background: #333;
      border: 2px solid ${isDerrotada ? 'red' : '#f0c000'};
      color: white;
      height: 100%;
      background-image: url('${carta.imagem}');
      background-size: cover;
      background-position: center;
      cursor: ${(isDerrotada) ? 'not-allowed' : 'pointer'};
      opacity: ${(isDerrotada) ? 0.5 : 1};
      transition: all 0.2s;
    `;
    
    card.innerHTML = `
      <h3 style="margin: 0 0 5px 0; color: ${isDerrotada ? '#ff9999' : 'white'}">${carta.nome}</h3>
      <p style="margin: 2px 0; font-size: 0.9em;">Vida: ${carta.vida}/${carta.vidaMax}</p>
      <p style="margin: 2px 0; font-size: 0.9em;">KI: ${carta.ki}/${carta.kiMax}</p>
      ${isDerrotada ? '<p style="color: #ff9999; margin: 5px 0 0 0; font-size: 0.8em;">Derrotado</p>' : ''}
    `;

    // Só permite clique se estiver ativa e não derrotada
    if (!isDerrotada) {
      card.addEventListener('click', () => {
        if (usarAtaqueCura(jogador, carta, golpe)) {
          document.body.removeChild(container);
        }
      });
      
      // Efeito hover apenas para cartas válidas
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
      });
    }

    cartasContainer.appendChild(card);
  });

  document.body.appendChild(container);
}

function mostrarMaoJogador(jogador) {
  fecharCarta();
  document.getElementById('confirmacao-ataque').style.display = 'none';

  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;

  modal.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid #f0c000;
      width: 80%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
    ">
      <h2 style="color: gold; margin-top: 0;">Mão de ${jogador.nome}</h2>
      <div id="cartas-mao" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
        margin: 20px 0;
        justify-items: center;
      "></div>
      <button onclick="this.parentNode.parentNode.remove()" style="
        background: #f44336;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        font-weight: bold;
      ">
        Fechar
      </button>
    </div>
  `;

  const cartasContainer = modal.querySelector('#cartas-mao');

  jogador.mao.forEach((carta, index) => {

    const card = document.createElement('div');
    const imagem = document.createElement('div');
    const nome = document.createElement('div');
    const descricao = document.createElement('div');
    const tipo = document.createElement('div');

    if (carta.tipo != "Item") {
          card.style.cssText = `
          width: 160px;
          min-height: 240px;
          border-radius: 8px;
          background: #f3f3f3;
          border: 4px solid #000000;
          box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
          font-family: 'Arial', sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.2s;
        `;

            imagem.style.cssText = `
            height: 100%;
            background-image: url('${carta.imagem}');
            background-size: cover;
            background-position: center;
            position: relative;
          `;  

          
          nome.textContent = carta.nome;
          nome.style.cssText = `
            position: absolute;
            top: 0;
            width: 100%;
            background: rgba(237, 237, 237, 0.5); 
            color: black;
            font-weight: bold;
            font-size: 13px;
            padding: 3px 5px;
            text-align: center;
            border: 1px solid #A8A9AD;
          `;

          tipo.textContent = "Guerreiro";
          tipo.style.cssText = `
            display: none;
          `;  
          
          tipo.textContent = "Item";
          tipo.style.cssText = `
            text-align: right;
            font-size: 11px;
            color: #666;
            padding: 4px 8px;
            border-top: 1px solid #ddd;
            background: #E0E0E0;
          `;

          imagem.appendChild(nome);

    }

    else{
    card.style.cssText = `
      width: 160px;
      min-height: 240px;
      border-radius: 8px;
      background: #f3f3f3;
      border: 2px solid #ccc;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: transform 0.2s;
    `;

    
    imagem.style.cssText = `
      height: 140px;
      background-image: url('${carta.imagem}');
      background-size: cover;
      background-position: center;
      position: relative;
    `;

    
    nome.textContent = carta.nome;
    nome.style.cssText = `
      position: absolute;
      top: 0;
      width: 100%;
      background: rgba(237, 237, 237, 0.5); 
      color: black;
      font-weight: bold;
      font-size: 13px;
      padding: 3px 5px;
      text-align: center;
      border: 1px solid #A8A9AD;
    `;
    imagem.appendChild(nome);

    
    descricao.innerHTML = carta.descricao || 'Sem descrição';
    descricao.style.cssText = `
      padding: 8px;
      font-size: 12px;
      color: #222;
      line-height: 1.2em;
      background: #E0E0E0;
      flex-grow: 1;
    `;

    
    tipo.textContent = "Item";
    tipo.style.cssText = `
      text-align: right;
      font-size: 11px;
      color: #666;
      padding: 4px 8px;
      border-top: 1px solid #ddd;
      background: #E0E0E0;
    `;

  }

    card.appendChild(imagem);
    card.appendChild(descricao);
    if (carta.tipo === 'Item'){
      card.appendChild(tipo);
    }

    card.addEventListener('click', () => {
      if (jogador.usoItens >= 1  && carta.tipo === "Item") {
        showNotification("Só é possível usar um item por turno.");
        return;
      }
         if (jogadorAtual != jogadorSelecionado) {
    showNotification("É a vez de outro jogador!", "error");
    return;
 }    
      if (carta.tipo === "Item") {
      usarItemDaMao(carta, jogador, index, modal);
      } else {
        descerGuerreiroDaMao(carta, jogador, index, modal)
      }
    });

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
    });

    cartasContainer.appendChild(card);
  });

  document.body.appendChild(modal);
}

function mostrarAlerta(mensagem) {
  // Você pode substituir por um modal mais bonito depois
  alert(mensagem.replace(/<br>/g, '\n'));
}

function pausarJogoParaSubstituicao(jogador, cartasDisponiveis) {
 
  // Criar lista de botões que devem permanecer ativos
  const botoesPermitidos = [
    ...document.querySelectorAll('.btn-item'), 
    ...document.querySelectorAll('.btn-fechar-modal')
  ];
  
  // Desativa apenas botões não permitidos
  document.querySelectorAll('button').forEach(btn => {
    if (!botoesPermitidos.includes(btn)) {
      btn.disabled = true;
    }
  });

  const overlay = document.createElement('div');
  overlay.className = 'modal-substituicao';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  // Verifica se há cartas ativas disponíveis
  const cartasAtivas = cartasDisponiveis.filter(c => c.inativoPorTurno <= 0);
  const apenasInativas = cartasAtivas.length === 0;

  overlay.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid gold;
      max-width: 80%;
      text-align: center;
    ">
      <h2 style="color: gold;">Selecione um personagem para entrar em combate</h2>
      ${apenasInativas ? 
        '<p style="color: orange;">Atenção: Apenas cartas inativas disponíveis</p>' : 
        '<p style="color: lightgreen;">Cartas ativas disponíveis</p>'}
      <div id="cartas-disponiveis" style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
        margin: 20px 0;
        max-height: 60vh;
        overflow-y: auto;
      "></div>
    </div>
  `;

  const container = overlay.querySelector('#cartas-disponiveis');

  // Ordena cartas: ativas primeiro, depois inativas
  const cartasOrdenadas = [...cartasDisponiveis].sort((a, b) => {
    if (a.inativoPorTurno > 0 && b.inativoPorTurno <= 0) return 1;
    if (a.inativoPorTurno <= 0 && b.inativoPorTurno > 0) return -1;
    return 0;
  });

  cartasOrdenadas.forEach((carta) => {
    const isInativa = carta.inativoPorTurno > 0;
    const podeSelecionar = !isInativa || apenasInativas;
    
    const card = document.createElement('div');
    
    card.style.cssText = `
      background: #333;
      border: 2px solid ${podeSelecionar ? (isInativa ? '#ff9900' : '#00ff00') : '#666'};
      border-radius: 8px;
      padding: 10px;
      color: white;
      cursor: ${podeSelecionar ? 'pointer' : 'not-allowed'};
      transition: all 0.3s;
      opacity: ${podeSelecionar ? 1 : 0.5};
      position: relative;
    `;
    
    card.innerHTML = `
      <h3 style="margin: 0 0 5px 0;">${carta.nome}</h3>
      <p style="margin: 0;">Vida: ${carta.vida}/${carta.vidaMax}</p>
      <p style="margin: 0;">KI: ${carta.ki}/${carta.kiMax}</p>
      ${isInativa ? `<p style="color: #ff9999; margin: 5px 0 0 0; font-size: 0.8em;">
        Inativo por ${carta.inativoPorTurno} turno(s)</p>` : ''}
      ${!podeSelecionar ? `<div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
      ">Indisponível</div>` : ''}
    `;

    if (podeSelecionar) {
      card.addEventListener('click', () => {
        // Move a carta selecionada para o campo ativo
        const cartaIndex = jogador.bancoLuta.findIndex(c => c.nome === carta.nome);
        const [cartaSelecionada] = jogador.bancoLuta.splice(cartaIndex, 1);
        jogador.campoAtivo = [cartaSelecionada];

        // Remove o overlay
        document.body.removeChild(overlay);
        
        // Atualiza a UI
        if (jogador === jogador1) {
          exibirCarta(jogador1.campoAtivo[0], "player1-card");
          mostrarBanco(jogador1.bancoLuta, "banco-cartas");
        } else {
          exibirCarta(jogador2.campoAtivo[0], "player2-card");
          mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2");
        }
        console.log(jogador.bancoLuta);
        socket.emit('sincronizar_substituicao', {
          jogador: jogador.nome,
          novaCarta: cartaSelecionada,
          bancoLuta: jogador.bancoLuta,
          sala_id: "sala1"
        });
      
        // Reativa os botões
        document.querySelectorAll('button').forEach(btn => {
          btn.disabled = false;
        });
        
        showNotification(`${cartaSelecionada.nome} entrou em combate${isInativa ? ' (ainda inativo)' : ''}!`, 
                         isInativa ? "warning" : "success");
      });
    }

    container.appendChild(card);
  });

  document.body.appendChild(overlay);
}

if (jogador1 != null && jogador2 != null) {
  document.addEventListener("DOMContentLoaded", () => {
    mostrarBanco(jogador1.bancoLuta, "banco-cartas"); // Jogador 1  
    exibirCarta(jogador1.campoAtivo[0], "player1-card"); // Jogador 1
    mostrarBanco(jogador2.bancoLuta, "banco-cartas-jogador2"); // Jogador 2
    exibirCarta(jogador2.campoAtivo[0], "player2-card"); // Jogador 2 
  });
}
document.getElementById("end-turn").addEventListener("click", finalizarTurno);

function abrirMenuOpcoesBaralho() {
  if (jogador1.nome != jogadorSelecionado.nome) {
    showNotification("Não é possivel ver a mão do adversario", "error")
    return
  }
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid gold;
      min-width: 250px;
      text-align: center;
    ">
      <h2 style="color: gold; margin: 0 0 15px 0;">Ações</h2>
      <button onclick="mostrarMaoJogador(jogador1); fecharMenuBaralho(this)" style="
        background: #444;
        color: white;
        border: none;
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
      ">👀 Ver Mão</button>
      <button onclick="mostrarMenuTroca(jogador1, null); fecharMenuBaralho(this)" style="
        background: #444;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
      ">🔁 Trocar Personagem</button>
      <br><br>
      <button onclick="fecharMenuBaralho(this)" style="
        background: #f44336;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
      ">Fechar</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function fecharMenuBaralho(btn) {
  const modal = btn.closest('div').parentNode;
  document.body.removeChild(modal);
}

function abrirMenuOpcoesBaralho2() {
  if (jogador2.nome != jogadorSelecionado.nome) {
    showNotification("Não é possivel ver a mão do adversario", "error")
    return
  }
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="
      background: #2a2a2a;
      padding: 20px;
      border-radius: 10px;
      border: 2px solid gold;
      min-width: 250px;
      text-align: center;
    ">
      <h2 style="color: gold; margin: 0 0 15px 0;">Ações</h2>
      <button onclick="mostrarMaoJogador(jogador2); fecharMenuBaralho(this)" style="
        background: #444;
        color: white;
        border: none;
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
      ">👀 Ver Mão</button>
      <button onclick="mostrarMenuTroca(jogador2, null); fecharMenuBaralho(this)" style="
        background: #444;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
      ">🔁 Trocar Personagem</button>
      <br><br>
      <button onclick="fecharMenuBaralho(this)" style="
        background: #f44336;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
      ">Fechar</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function fecharMenuBaralho(btn) {
  const modal = btn.closest('div').parentNode;
  document.body.removeChild(modal);
}