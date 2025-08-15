// Recuperando seleções do Local Storage
const cartasSelecionadas = JSON.parse(localStorage.getItem('cartasSelecionadas')) || [];
const itensSelecionados = JSON.parse(localStorage.getItem('itensSelecionados')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados do localStorage - usando apenas UMA fonte
    const deckSalvo = JSON.parse(localStorage.getItem('deckSelecionado'));
    
    // Limpa os dados antigos para evitar duplicação
    localStorage.removeItem('cartasSelecionadas');
    localStorage.removeItem('itensSelecionados');

    if (!deckSalvo) {
        alert("Nenhum deck encontrado! Redirecionando...");
        window.location.href = "index.html";
        return;
    }

    // Banco de cartas (deve ser o mesmo da página anterior)
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

    // Processa as cartas selecionadas
    const cartasDoDeck = deckSalvo.cartas.map(carta => {
        const cartaCompleta = personagens.find(p => p.nome === carta.nome);
        if (!cartaCompleta) {
            console.error(`Carta não encontrada: ${carta.nome}`);
            return null;
        }
        return cartaCompleta;
    }).filter(Boolean);

    // Processa os itens selecionados
    const itensDoDeck = deckSalvo.itens.map(item => {
        const itemCompleto = itens.find(i => i.nome === item.nome);
        if (!itemCompleto) {
            console.error(`Item não encontrado: ${item.nome}`);
            return null;
        }
        return itemCompleto;
    }).filter(Boolean);

    // Armazena os dados processados (apenas uma vez)
    localStorage.setItem('deckEscolhido', JSON.stringify({
        cartas: cartasDoDeck,
        itens: itensDoDeck
    }));

    // Chama a função de exibição (APENAS UMA VEZ)
    exibirSelecoes();
});

// Elementos do Zoom
const zoomContainer = document.getElementById('zoom-container');
const cartaSelecionadaImg = document.getElementById('carta-selecionada');
const nomeCarta = document.getElementById('nome-carta');
const tipoCarta = document.getElementById('tipo-carta');
const valorCarta = document.getElementById('valor-carta');
const fecharZoomBtn = document.getElementById('fechar-zoom');

// Exibindo as cartas e itens selecionados
function exibirSelecoes() {
    const deckEscolhido = JSON.parse(localStorage.getItem('deckEscolhido')) || { cartas: [], itens: [] };
    
    const personagensContainer = document.querySelector('.cartas-selecionadas-container');
    const itensContainer = document.querySelector('.itens-selecionados-container');

    // Limpa os containers antes de renderizar
    personagensContainer.innerHTML = '';
    itensContainer.innerHTML = '';

    // Renderiza cartas (apenas uma vez)
    if (deckEscolhido.cartas.length === 0) {
        personagensContainer.innerHTML = '<p class="empty-message">Nenhum personagem selecionado</p>';
    } else {
        deckEscolhido.cartas.forEach((carta, index) => {
            const cartaDiv = document.createElement('div');
            cartaDiv.classList.add('carta-selecionada');
            cartaDiv.innerHTML = `
                <img src="${carta.src}" alt="${carta.nome}" data-index="${index}" data-tipo="personagem">
                <p>${carta.tipo.toUpperCase()}</p>
                <p>Poder: ${carta.valor}⭐</p>
            `;
            personagensContainer.appendChild(cartaDiv);
        });
    }

    // Renderiza itens (apenas uma vez)
    if (deckEscolhido.itens.length === 0) {
        itensContainer.innerHTML = '<p class="empty-message">Nenhum item selecionado</p>';
    } else {
        deckEscolhido.itens.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-selecionado');
            itemDiv.innerHTML = `
                <img src="${item.src}" alt="${item.nome}" data-index="${index}" data-tipo="item">
                <p>${item.tipo.toUpperCase()}</p>
            `;
            itensContainer.appendChild(itemDiv);
        });
    }

    // Seus event listeners originais
    document.querySelectorAll('.carta-selecionada img, .item-selecionado img').forEach(img => {
        img.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const tipo = this.getAttribute('data-tipo');
            abrirZoom(index, tipo);
        });
    });
}

// Função para abrir o zoom
function abrirZoom(index, tipo) {
    const deckEscolhido = JSON.parse(localStorage.getItem('deckEscolhido'));
    const selecao = tipo === 'personagem' ? deckEscolhido.cartas[index] : deckEscolhido.itens[index];
    
    cartaSelecionadaImg.src = selecao.src;
    
    // Extrai o nome do arquivo (removendo o caminho e extensão)
    const nomeArquivo = selecao.src.split('/').pop().split('.')[0];
    const nomeFormatado = nomeArquivo.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    nomeCarta.textContent = nomeFormatado;
    tipoCarta.textContent = `Tipo: ${selecao.tipo.toUpperCase()}`;
    
    if (tipo === 'personagem') {
        valorCarta.textContent = `Poder: ${selecao.valor}⭐`;
        valorCarta.style.display = 'block';
    } else {
        valorCarta.style.display = 'none';
    }
    
    zoomContainer.style.display = 'flex';
}

// Função para fechar o zoom
function fecharZoom() {
    zoomContainer.style.display = 'none';
}

// Evento para fechar o zoom
fecharZoomBtn.addEventListener('click', fecharZoom);

// Fechar ao clicar no overlay
document.querySelector('.zoom-overlay').addEventListener('click', fecharZoom);

// Botão voltar
document.getElementById("lutar").addEventListener("click", () => {
    location.href = "/arena";
});

// Inicializa a exibição
document.addEventListener('DOMContentLoaded', exibirSelecoes);