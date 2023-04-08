const cards = document.querySelector('.cards');
const card = document.querySelector('.card');
cards.innerHTML = "";
cards.classList.remove('hidden');

const timer_content = document.querySelector('.timer-content');

let cards_pressed = 0;
let timer_running = false;
let timer_count = 0;
let num_cards;
let images = [];

const num_cards_message = "Quantas cartas quer jogar? (números pares entre 4 à 14) ";
const play_again_message = "";

const generate_card = () => {
    `Conceitos de Recursividade`;
    num_cards = Number(prompt(num_cards_message));
    //if (isNaN(num_cards) && num_cards !== null && num_cards % 2 === 0 && num_cards >= 4 && num_cards <= 14) 
    if (isNaN(num_cards) || num_cards === null || num_cards % 2 !== 0 || num_cards < 4 || num_cards > 14) {
        generate_card();
    } else {
        const sliced_random_images = [
            'metalparrot.gif', 'fiestaparrot.gif', 'bobrossparrot.gif', 'explodyparrot.gif',
            'unicornparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif',
        ].sort(() => { return (Math.random() - 0.5); }).slice(0, num_cards / 2);
        
        for (let i = 0; i < sliced_random_images.length; i++) {
            images.push(sliced_random_images[i]);
            images.push(sliced_random_images[i]);
        }
        const random_images = images.sort(() => { return (Math.random() - 0.5); });
        for (let i = 0; i < num_cards; i++) {
            card.querySelector('.front-face img').setAttribute('src', './assets/' + random_images[i]);
            cards.innerHTML += card.outerHTML;
        }
    }
};

generate_card();


const start_timer = () => {
    `Conceitos de Recursividade`;
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

const play_again = () => {
    let play_again_response = prompt(play_again_message);

    if (play_again_response !== "sim") {
        if (play_again_response !== "não") {
            play_again();
        }
    } else {
        cards.innerHTML = '';
        cards_pressed = 0;
        timer_count = 0;
        timer_content.textContent = 0;
        images = [];
        generate_card();
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
        // Seleciona os imagens pressionados, mas não os que já estão congelados.
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
        if (document.querySelectorAll('.freeze').length === num_cards) {
            timer_running = false;
            setTimeout(() => {
                alert(`Você ganhou em ${cards_pressed} jogadas! A duração do jogo foi de ${timer_count} segundos!`);
                play_again();
            }, 100);
        }
    }
}
