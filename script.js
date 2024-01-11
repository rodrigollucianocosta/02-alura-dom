const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner =document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
//criando array de botoes
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')

musica.loop = true;
musica.volume = 0.1;

let tempoDecorridoEmSegundos = 5;

let intervaloId = null;


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alteraContexto('foco');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alteraContexto('descanso-curto')

    //altera o estilo
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alteraContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alteraContexto(contexto){
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
    zerar()
        alert('Tempo Finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador:' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
if(intervaloId){
    zerar()
    return
}
    intervaloId = setInterval(contagemRegressiva,1000)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}