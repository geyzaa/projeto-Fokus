const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')  
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica') /*# para id*/ 
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio ('/sons/luna-rise-part-one.mp3') 
const somDePlay = new Audio ('/sons/play.wav')
const pause = new Audio ('/sons/pause.mp3')
const beep = new Audio ('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 5
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
         musica.play()
    } else {
        musica.pause()
    }
})
//evento click para os botões, ao clicar muda o atributo html
focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
             Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo" :
            titulo.innerHTML =` 
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    //ao chegar em 0, toca o beep, interrompe a execução do intervalo e reseta o tempo
    if (tempoDecorridoEmSegundos <=0) {
        beep.play();
        zerar();
        alert('Tempo finalizado!')
        return;
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador:' + tempoDecorridoEmSegundos) //concatenação, string + variável
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    //se houver valor no intervaloId toca o som e interrompe a execução da contagem
    if(intervaloId){
        pause.play();
        zerar();
        return;
    }
    //toca som ao click do botão, executa a contagem -1s
    intervaloId = setInterval(contagemRegressiva, 1000) // 1000 pq o valor é recebido em milissegundos
    somDePlay.play();
}

//interrompe a execução da função 
function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}