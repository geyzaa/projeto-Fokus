const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica') /*# para id*/ 
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio ('./sons/luna-rise-part-one.mp3')
const somDePlay = new Audio ('./sons/play.wav')
const somDePause = new Audio ('./sons/pause.mp3')
const beepTempoFinalizado = new Audio ('./sons/beep.mp3')


let tempoDecorridoEmSegundos = 1500
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
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
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
        beepTempoFinalizado.play();
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo ();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    //se houver valor no intervaloId toca o som e interrompe a execução da contagem
    if(intervaloId){
        somDePause.play();
        zerar();
        return;
    }
    //toca som ao click do botão, executa a contagem -1s
    somDePlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000) // 1000 pq o valor é recebido em milissegundos
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src',`./imagens/pause.png`)
}

//interrompe a execução da função 
function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent ="Começar"
    iniciarOuPausarBtIcone.setAttribute('src',`./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() 