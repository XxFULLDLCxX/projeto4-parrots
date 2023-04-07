// Primeiro Limpar o cards = '', mas antes obter o card modelo. 
// Depois Perguntar O Numero de Cards numeros pares 4 à 14. Loop até o numero permitido
// Embalharar as img dos Cards Gerados.
// Iniciar o Conômetro.
// Fazer a Lógica de virar os Cards quando ele tiverem img iguais.
// 

// Váriaveis, e Limpeza de cards, além de um remover o .hidden do card modelo.
const cards = document.querySelector('.cards');
const card = document.querySelector('.card');

window.oncontextmenu = (event) => {
    event.preventDefault();
    return false;
};

cards.innerHTML = '';
cards.classList.remove('hidden');

const timer_content = document.querySelector('.timer-content');

let cards_pressed = 0;
let timer_running = false;
let timer_count = 0;

const msg = "Quantas cartas quer jogar? (pares de 4 à 14) ";
const number_cards = 4;

const images = [];
const sliced_random_images = [
    'metalparrot.gif', 'fiestaparrot.gif', 'bobrossparrot.gif', 'explodyparrot.gif',
    'unicornparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif',
].sort(() => { return (Math.random() - 0.5); }).slice(0, number_cards / 2);

for (let i = 0; i < sliced_random_images.length; i++) {
    images.push(sliced_random_images[i]);
    images.push(sliced_random_images[i]);
}

const random_images = images.sort(() => { return (Math.random() - 0.5); });

for (let i = 0; i < number_cards; i++) {
    card.querySelector('.front-face img').setAttribute('src', './assets/' + random_images[i]);
    cards.innerHTML += card.outerHTML;
}

const start_timer = () => {
    if (timer_running) {
        timer_count++;
        if (timer_count < 10) {
            timer_content.textContent = '0' + timer_count;
        } else {
            timer_content.textContent = timer_count;
        }
        setTimeout(start_timer, 1000);
    }
};


function getCard(card_press) {
    `
    O getCard é chamado, sempre que um card é pressionado.
    ... Descrição do Fluxo de Execução (Análise do Metódo).
    Comece o Timer se ele não estiver rodando.
    Casos de Desconsideração de Click: 
        Se o card a ser pressionado já foi pressionado.
        Se a sessão de cards está bloqueada (a animação está acontencendo).
    Atualiza o Contador de Jogadas.
    Quando Dois Cards são Virados:
        Verifica se eles tem 'img src' diferentes:
            Se sim, bloqueia a sessão de cards até eles serem, automaticamente, Desvirados.
            Se não, ficaram como estão e serão congelados no tempo (poético).
    Condição de finalização:
        Se o Valor Total de Cards Congelados é exatamente igual a Quantidade de Cards na Partida.
    Finalização de Partida:
        Espere um pouco a animação terminar e chame o Alerta de Vitória.
        Limpe a Sessão de Cards
        Reset o Timer
        Reset o Contandor de Jogadas.
        Chame a Função Responsável por Começar o Jogo.
    `;
    if (!timer_running) {
        timer_running = true;
        start_timer();
    }
    if (!card_press.classList.contains('pressed') && !cards.classList.contains('block')) {
        card_press.classList.add('pressed');
        cards_pressed++;
        // Seleciona os cards pressionados, mas não os que já estão congelados.
        const card_pressed = document.querySelectorAll('.pressed:not(.freeze)');

        const images_front_face = document.querySelectorAll('.pressed:not(.freeze) .front-face img');
        if (card_pressed.length % 2 === 0) {
            if (images_front_face[0].getAttribute('src') !== images_front_face[1].getAttribute('src')) {
                // Inicia o Processo de Desvirar os Cards com Imagens Diferentes.
                cards.classList.add('block');
                setTimeout(() => {
                    card_pressed[0].classList.remove('pressed');
                    card_pressed[1].classList.remove('pressed');
                    cards.classList.remove('block');
                }, 1000);
            } else {
                // Congela os Cards Virados com Imagens Iguais.
                card_pressed[0].classList.add('freeze');
                card_pressed[1].classList.add('freeze');
            }
        }
        if (document.querySelectorAll('.freeze').length === number_cards) {
            timer_running = false;
            setTimeout(() => {
                alert(`Você ganhou em ${cards_pressed} jogadas! A duração do jogo foi de ${timer_count} segundos!`);
            }, 100);
        }
    }
}

// card.textContent = card.outerHTML;

// console.log(cards.innerHTML);


//Test para desligar o Game;
function switchBtn(btn) {
    btn.classList.toggle('on');
    btn.classList.toggle('off');
    timer_running = btn.classList.contains('on');
    console.log(timer_running, "game_running");
    start_timer();
}
