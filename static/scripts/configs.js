document.addEventListener('DOMContentLoaded', () => {
    // Configurações padrão
    const defaultConfigs = {
        soundEnabled: true,
        volume: 70,
        musicPlaying: false
    };

    // Carrega configurações salvas
    let configs = JSON.parse(localStorage.getItem('dbzConfigs')) || defaultConfigs;

    // Elementos DOM
    const toggleSound = document.getElementById('toggle-sound');
    const volumeSlider = document.getElementById('db-volume');
    const volumeValue = document.getElementById('db-volume-value');
    const soundStatus = document.getElementById('sound-status');
    const musicOptions = document.querySelectorAll('.music-option');
    const previewButtons = document.querySelectorAll('.preview-btn');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;
    const bgMusic = document.getElementById('bg-music');
    const uiSound = document.getElementById('ui-sound');
    let currentPreview = null;

    // Aplica configurações iniciais
    function applyConfigs() {
        // Áudio
        toggleSound.checked = configs.soundEnabled;
        updateSoundStatus();
        
        // Volume
        volumeSlider.value = configs.volume;
        volumeValue.textContent = configs.volume;
        document.querySelector('.power-fill').style.width = `${configs.volume}%`;
        bgMusic.volume = configs.volume / 100;
        
        // Música
        loadSong(configs.currentSong);
        if (configs.soundEnabled && configs.musicPlaying) {
            bgMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
        
        // Tema
        body.className = `${configs.theme}-theme`;
    }

    // Atualiza status do som
    function updateSoundStatus() {
        soundStatus.textContent = `SOM: ${configs.soundEnabled ? 'LIGADO' : 'DESLIGADO'}`;
        if (!configs.soundEnabled) {
            bgMusic.pause();
        } else if (configs.musicPlaying) {
            bgMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
    }

    // Carrega música
    function loadSong(songFile) {
        bgMusic.src = `../static/assets/sounds/${songFile}`;
        bgMusic.volume = configs.volume / 100;
        
        // Atualiza seleção visual
        musicOptions.forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.song === songFile);
        });
        
        // Atualiza botões de preview
        updatePreviewButtons();
    }

    // Atualiza botões de preview
    function updatePreviewButtons() {
        previewButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-pause', 'fa-play');
            icon.classList.add(currentPreview === btn.dataset.preview ? 'fa-pause' : 'fa-play');
        });
    }

    // Toca efeito sonoro da UI
    function playUISound() {
        if (!configs.soundEnabled) return;
        uiSound.currentTime = 0;
        uiSound.volume = configs.volume / 100;
        uiSound.play();
    }

    // Para a prévia atual
    function stopPreview() {
        if (currentPreview) {
            const btn = document.querySelector(`.preview-btn[data-preview="${currentPreview}"]`);
            if (btn) {
                const icon = btn.querySelector('i');
                icon.classList.replace('fa-pause', 'fa-play');
            }
            currentPreview = null;
        }
    }

    // Event Listeners
    toggleSound.addEventListener('change', () => {
        configs.soundEnabled = toggleSound.checked;
        configs.musicPlaying = configs.soundEnabled; // Atualiza estado de reprodução
        updateSoundStatus();
        playUISound();
        saveConfigs();
    });

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        configs.volume = volume;
        volumeValue.textContent = volume;
        document.querySelector('.power-fill').style.width = `${volume}%`;
        bgMusic.volume = volume / 100;
        if (currentPreview) {
            // Atualiza volume da prévia se estiver tocando
            document.querySelector(`audio[src="../static/assets/sounds/${currentPreview}"]`).volume = volume / 100;
        }
        playUISound();
    });

    musicOptions.forEach(option => {
        option.addEventListener('click', () => {
            const song = option.dataset.song;
            if (configs.currentSong === song) {
                // Toggle play/pause se clicar na música atual
                configs.musicPlaying = !configs.musicPlaying;
                if (configs.musicPlaying && configs.soundEnabled) {
                    bgMusic.play();
                } else {
                    bgMusic.pause();
                }
            } else {
                // Nova seleção de música
                configs.currentSong = song;
                configs.musicPlaying = true;
                loadSong(song);
                if (configs.soundEnabled) {
                    bgMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
                }
            }
            playUISound();
            saveConfigs();
        });
    });

    previewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const song = btn.dataset.preview;
            
            // Se já está tocando esta prévia, para
            if (currentPreview === song) {
                stopPreview();
                return;
            }
            
            // Para a prévia anterior
            stopPreview();
            
            // Toca nova prévia
            currentPreview = song;
            const previewAudio = new Audio(`../static/assets/sounds/${song}`);
            previewAudio.volume = configs.volume / 100;
            previewAudio.play();
            
            // Atualiza ícone
            const icon = btn.querySelector('i');
            icon.classList.replace('fa-play', 'fa-pause');
            
            previewAudio.onended = stopPreview;
            updatePreviewButtons();
        });
    });

    // Salva configurações
    function saveConfigs() {
        localStorage.setItem('dbzConfigs', JSON.stringify(configs));
    }

    // Inicializa
    applyConfigs();
    
    // Atualiza estado da música quando terminar
    bgMusic.addEventListener('ended', () => {
        configs.musicPlaying = false;
        saveConfigs();
    });
});

// Adicione no início do arquivo:
let keySequence = [];
const secretCode = 'tauz';

// Adicione esta função após as outras:
function checkEasterEgg(key) {
    keySequence.push(key.toLowerCase());
    if (keySequence.length > secretCode.length) {
        keySequence.shift();
    }
    
    if (keySequence.join('') === secretCode) {
        unlockSecretMusic();
        keySequence = []; // Reseta a sequência
    }
}

function unlockSecretMusic() {
    const secretMusicOption = document.getElementById('easter-egg-music');
    
    // Mostra a opção secreta
    secretMusicOption.classList.remove('hidden');
    secretMusicOption.classList.add('secret', 'unlock-effect');
    
    // Toca efeito sonoro
    playUISound();
    
    // Remove a animação após 1 segundo
    setTimeout(() => {
        secretMusicOption.classList.remove('unlock-effect');
    }, 1000);
    
    // Adiciona aos dados de configuração
    if (!configs.unlockedSongs) {
        configs.unlockedSongs = [];
    }
    
    if (!configs.unlockedSongs.includes('tauz-theme.mp3')) {
        configs.unlockedSongs.push('tauz-theme.mp3');
        saveConfigs();
    }
}

// Adicione este event listener no final do DOMContentLoaded:
document.addEventListener('keydown', (e) => {
    checkEasterEgg(e.key);
});

// Modifique a função applyConfigs para mostrar músicas desbloqueadas:
function applyConfigs() {
    
    // Mostra músicas desbloqueadas
    if (configs.unlockedSongs && configs.unlockedSongs.includes('tauz-theme.mp3')) {
        document.getElementById('easter-egg-music').classList.remove('hidden');
    }
}

// Para adicionar uma mensagem (opcional):
function showUnlockMessage() {
    const message = document.createElement('div');
    message.textContent = 'Música secreta desbloqueada!';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.background = 'rgba(255, 0, 255, 0.8)';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    message.style.zIndex = '1000';
    message.style.animation = 'fadeOut 2s 2s forwards';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 4000);
}



