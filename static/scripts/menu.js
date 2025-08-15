// Variáveis de controle
let indexAtual = null;
let tipoAtual = null;
let cartasSelecionadas = [];
let itensSelecionados = [];
let pontosRestantes = 24;

const personagens = [
    { src: "../static/assets/cartas/goku.png", valor: 1, tipo: "personagem", nome: "Goku" },
    { src: "../static/assets/cartas/kuririn.png", valor: 3, tipo: "personagem", nome: "Kuririn" },
    { src: "../static/assets/cartas/majinboo-gordo.png", valor: 5, tipo: "personagem", nome: "Majin Boo" },
    { src: "../static/assets/cartas/vegetta.png", valor: 1, tipo: "personagem", nome: "Vegeta" },
    { src: "../static/assets/cartas/trunks.png", valor: 4, tipo: "personagem", nome: "Trunks" },
    { src: "../static/assets/cartas/jiren.png", valor: 6, tipo: "personagem", nome: "Jiren" },
    { src: "../static/assets/cartas/hitto.png", valor: 4, tipo: "personagem", nome: "Hitto" },
    { src: "../static/assets/cartas/goku-black.png", valor: 2, tipo: "personagem", nome: "Goku Black" },
    { src: "../static/assets/cartas/freeza.png", valor: 3, tipo: "personagem", nome: "Freeza" },
    { src: "../static/assets/cartas/bulma.png", valor: 4, tipo: "personagem", nome: "Bulma" },
    { src: "../static/assets/cartas/cell.png", valor: 4, tipo: "personagem", nome: "Cell" },
    { src: "../static/assets/cartas/gohan.png", valor: 2, tipo: "personagem", nome: "Gohan" },
    { src: "../static/assets/cartas/broly.png", valor: 6, tipo: "personagem", nome: "Broly" },
    { src: "../static/assets/cartas/chichi.png", valor: 4, tipo: "personagem", nome: "Chi Chi" },
    { src: "../static/assets/cartas/bills.png", valor: 6, tipo: "personagem", nome: "Bills" },
    { src: "../static/assets/cartas/android17.png", valor: 3, tipo: "personagem", nome: "Androide 17" },
    { src: "../static/assets/cartas/android18.png", valor: 3, tipo: "personagem", nome: "Androide 18" },
];

const itens = [
    { id: 1, src: "../static/assets/itens/anel-do-tempo.png", tipo: "item", nome: "Anel do Tempo" },
    { id: 2, src: "../static/assets/itens/arena-torneio-do-poder.png", tipo: "item", nome: "Arena do Torneio do Poder" },
    { id: 3, src: "../static/assets/itens/botao-zeno-sama.png", tipo: "item", nome: "Botão do Zeno-sama" },
    { id: 4, src: "../static/assets/itens/camara-de-gravidade.png", tipo: "item", nome: "Câmara de Gravidade" },
    { id: 5, src: "../static/assets/itens/casa-do-mestre-kame.png", tipo: "item", nome: "Casa do Mestre Kame" },
    { id: 6, src: "../static/assets/itens/escudo-de-ki.png", tipo: "item", nome: "Escudo de Ki" },
    { id: 7, src: "../static/assets/itens/esferas-do-dragao.png", tipo: "item", nome: "Esferas do Dragão" },
    { id: 8, src: "../static/assets/itens/espada-trunks.png", tipo: "item", nome: "Espada de Trunks" },
    { id: 9, src: "../static/assets/itens/maquina-do-tempo.png", tipo: "item", nome: "Máquina do Tempo" },
    { id: 10, src: "../static/assets/itens/medidor-de-poder.png", tipo: "item", nome: "Medidor de Poder" },
    { id: 11, src: "../static/assets/itens/nuvem-voadora.png", tipo: "item", nome: "Nuvem Voadora" },
    { id: 12, src: "../static/assets/itens/sala-do-tempo.png", tipo: "item", nome: "Sala do Tempo" },
    { id: 13, src: "../static/assets/itens/semente-dos-deuses.png", tipo: "item", nome: "Semente dos Deuses" },
    { id: 14, src: "../static/assets/itens/torrekarin.png", tipo: "item", nome: "Torre Karin" },
    { id: 15, src: "../static/assets/itens/traje-pesado-piccolo.png", tipo: "item", nome: "Traje Pesado de Piccolo" },
    { id: 16, src: "../static/assets/itens/yamcha.png", tipo: "item", nome: "Yamcha" }
];

// Funções para abas
function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    document.getElementById(`${tabName}-tab`).classList.add("active");
    event.currentTarget.classList.add("active");
}

function exibirCartas() {
    const container = document.querySelector('.cartas-container');
    container.innerHTML = '';

    personagens.forEach((personagem, index) => {
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta');
        cartaDiv.setAttribute('data-index', index);
        cartaDiv.setAttribute('data-tipo', 'personagem');
        cartaDiv.innerHTML = `
            <img src="${personagem.src}" alt="Carta" onclick="abrirZoom(${index}, 'personagem')">
            <div class="custo">${personagem.valor}</div>
        `;
        container.appendChild(cartaDiv);
    });
}

function exibirItens() {
    const container = document.querySelector('.itens-container');
    container.innerHTML = '';

    itens.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.setAttribute('data-index', index);
        itemDiv.setAttribute('data-tipo', 'item');
        itemDiv.innerHTML = `
            <img src="${item.src}" alt="Item" onclick="abrirZoom(${index}, 'item')">
            <div class="custo">1</div>
        `;
        container.appendChild(itemDiv);
    });
}
// Função para abrir o zoom
function abrirZoom(index, tipo) {
    const carta = tipo === 'personagem' ? personagens[index] : itens[index];
    document.getElementById("carta-selecionada").src = carta.src;
    indexAtual = index;
    tipoAtual = tipo;
    document.getElementById("zoom-container").style.display = "flex";

    const botaoSelecionar = document.getElementById("selecionar-carta");
    const isSelected = tipo === 'personagem' 
        ? cartasSelecionadas.includes(index) 
        : itensSelecionados.includes(index);

    botaoSelecionar.textContent = isSelected ? "REMOVER" : "SELECIONAR";
}

// Função para fechar o zoom
function fecharZoom() {
    document.getElementById("zoom-container").style.display = "none";
}

// Função para selecionar ou desmarcar uma carta
function selecionarCarta() {
    if (indexAtual === null || tipoAtual === null) return;

    const container = tipoAtual === 'personagem' 
        ? document.querySelector(".cartas-container") 
        : document.querySelector(".itens-container");
    
    const carta = container.children[indexAtual];
    const elemento = tipoAtual === 'personagem' ? personagens[indexAtual] : itens[indexAtual];

    if (tipoAtual === 'personagem') {
        if (cartasSelecionadas.includes(indexAtual)) {
            cartasSelecionadas = cartasSelecionadas.filter(i => i !== indexAtual);
            carta.classList.remove("selecionado");
            pontosRestantes += elemento.valor;
        } else {
            if (cartasSelecionadas.length < 6 && pontosRestantes >= elemento.valor) {
                cartasSelecionadas.push(indexAtual);
                carta.classList.add("selecionado");
                pontosRestantes -= elemento.valor;
            } else {
                alert(cartasSelecionadas.length >= 6 ? "Limite de 6 personagens atingido!" : "Pontos insuficientes!");
                return;
            }
        }
    } else {
        if (itensSelecionados.includes(indexAtual)) {
            itensSelecionados = itensSelecionados.filter(i => i !== indexAtual);
            carta.classList.remove("selecionado");
        } else {
            if (itensSelecionados.length < 9) {
                itensSelecionados.push(indexAtual);
                carta.classList.add("selecionado");
            } else {
                alert("Limite de 9 itens atingido!");
                return;
            }
        }
    }

    atualizarKiBar();
    atualizarDisplayPontos();
    fecharZoom();
}

// Atualiza a barra de KI
function atualizarKiBar() {
    const porcentagem = (pontosRestantes / 24) * 100;
    document.querySelector('.ki-energy').style.width = `${porcentagem}%`;
}

// Função para atualizar a exibição dos pontos
function atualizarDisplayPontos() {
    document.querySelector(".pontos-restantes span").textContent = pontosRestantes;
}

// Botão de envio para outra página
document.getElementById("enviar-cartas").addEventListener("click", () => {
    if (cartasSelecionadas.length === 6 && itensSelecionados.length === 9) {
        // Prepara os dados para enviar
        const deckParaEnviar = {
            cartas: cartasSelecionadas.map(index => ({
                nome: personagens[index].nome,
                indexOriginal: index
            })),
            itens: itensSelecionados.map(index => ({
                nome: itens[index].nome,
                indexOriginal: index
            }))
        };

        // Armazena no localStorage
        localStorage.setItem('deckSelecionado', JSON.stringify(deckParaEnviar));
        
        // Redireciona
        location.href = "/fulldeck";
    } else {
        alert(`Selecione 6 personagens (atual: ${cartasSelecionadas.length}) e até 9 itens (atual: ${itensSelecionados.length})!`);
    }
});

// Chama as funções para exibir as cartas quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    exibirCartas();
    exibirItens();
    atualizarKiBar();
});