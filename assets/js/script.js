const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const audioFocusInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause span');
const startPauseBtnImg = document.querySelector('.app__card-primary-button-icon');
const timeOnScreen = document.querySelector('#timer');
const audioFocus = new Audio('/assets/audio/luna-rise-part-one.mp3');
const audioPlay = new Audio('/assets/audio/play.wav');
const audioPause = new Audio('/assets/audio/pause.mp3');
const audioEnd = new Audio('/assets/audio/beep.mp3');

let elapsedTimeInSeconds = 1500;
let intervalId = null;

audioFocus.loop = true;
audioFocusInput.addEventListener('change', () => {
    if(audioFocus.paused) {
        audioFocus.play();
    } else {
        audioFocus.pause();
    }
})

focoBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 1500;
    changeContext('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 300;
    changeContext('descanso-curto');
    curtoBt.classList.add('active');
});

longBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 900;
    changeContext('descanso-longo')
    longBt.classList.add('active');
});

function changeContext(contexto) {
    showTime();
    buttons.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/assets/img/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }

}

const countdown = () => {
    if(elapsedTimeInSeconds <= 0) {
        audioEnd.play();
        alert('Tempo finalizdo');
        erase();
        return;
    }
    elapsedTimeInSeconds -= 1;
    showTime();
}

startPauseBt.addEventListener('click', startPause);

function startPause() {
    if (intervalId){
        audioPause.play();
        erase();
        return;
    }
    audioPlay.play();
    intervalId = setInterval(countdown, 1000);
    startPauseBtn.textContent = 'Parar';
    startPauseBtnImg.setAttribute('src', `/assets/img/pause.png`);
    
}

function erase() {
    clearInterval(intervalId);
    startPauseBtn.textContent = 'Começar';
    startPauseBtnImg.setAttribute('src', `/assets/img/play_arrow.png`);
    intervalId = null;
}

function showTime() {
    const time = new Date(elapsedTimeInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timeOnScreen.innerHTML = `${formattedTime}`;
}

showTime();