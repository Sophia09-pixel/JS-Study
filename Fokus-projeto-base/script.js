const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconPausarIniciar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener('change', function(){
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
});

focoBt.addEventListener('click', function() {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', function()  {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click',function(){
   tempoDecorridoEmSegundos = 900;
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
});

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch(contexto){
        case 'foco':
            texto.innerHTML = `
             Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case 'descanso-curto': 
            texto.innerHTML =`
             Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case 'descanso-longo':
            texto.innerHTML=`
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `    
            break;

            default:
                break;
    }
}

const contagemRegressiva = function(){
    if(tempoDecorridoEmSegundos <=0){
        beep.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo()
    console,console.log("Temporizador "+tempoDecorridoEmSegundos);
}

startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        pause.play();
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva,1000)
    play.play();
    
    iniciarOuPausarBt.textContent = "Pausar"
    iconPausarIniciar.setAttribute('src', '/imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconPausarIniciar.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute:'2-digit',second:'2-digit'})
    tempoNaTela.innerHTML  = `
        ${tempoFormatado}
    `
}
mostrarTempo()
