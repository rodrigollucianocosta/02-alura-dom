const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner =document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
//criando array de botoes
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector("#timer")

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')

//audios
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

musica.loop = true;
musica.volume = 0.1;

let tempoDecorridoEmSegundos = 1500;

let intervaloId = null;


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
tempoDecorridoEmSegundos = 1500
    alteraContexto('foco');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alteraContexto('descanso-curto')

    //altera o estilo
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
tempoDecorridoEmSegundos = 900
    alteraContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alteraContexto(contexto){
mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
        break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície?,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;

    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
    console.log('Tempo:' + tempoDecorridoEmSegundos)
    console.log('ID: ' + intervaloId)
}

startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
if(intervaloId){
    audioPausa.play();
    zerar()
    return
    }
    intervaloId = setInterval(contagemRegressiva,1000)
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Iniciar"
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-bt',{minute: '2-digit',second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()