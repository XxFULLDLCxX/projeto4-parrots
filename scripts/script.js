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
`
// A ordem importa. Não sei duplicar um array no JS. I'm so sorry.
const images_front_face_names_duplicate = [
    'metalparrot.gif', 'metalparrot.gif',
    'fiestaparrot.gif', 'fiestaparrot.gif',
    'bobrossparrot.gif', 'bobrossparrot.gif',
    'explodyparrot.gif', 'explodyparrot.gif',
    'unicornparrot.gif', 'unicornparrot.gif',
    'revertitparrot.gif', 'revertitparrot.gif',
    'tripletsparrot.gif', 'tripletsparrot.gif',
];
`;
const msg = "Quantas cartas quer jogar? (pares de 4 à 14) ";
const number_cards = 4;


const images = [];
const sliced_random_images = [
    'metalparrot.gif', 'fiestaparrot.gif', 'bobrossparrot.gif', 'explodyparrot.gif',
    'unicornparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif',
].sort(() => { return (Math.random() - 0.5); }).slice(0, number_cards / 2);

for (let i = 0; i < sliced_random_images.length; i++) {
    images.push(sliced_random_images[i])
    images.push(sliced_random_images[i])
}

const random_images = images.sort(() => { return (Math.random() - 0.5); });

for (let i = 0; i < number_cards; i++) {
    card.querySelector('.front-face img').setAttribute('src', './assets/' + random_images[i]);
    cards.innerHTML += card.outerHTML;
}

//Conômetro is here.
//Essa sintaxe é muito bonita. Pena que deveria ser em camelCase.
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
    // Controle do Frente e Verso
    // Lembrar de Adicionar . para classes
    if (!timer_running) {
        timer_running = true;
        start_timer();
    }
    if (!card_press.classList.contains('pressed') && !cards.classList.contains('block')) {
        card_press.classList.toggle('pressed');

        cards_pressed++;

        const card_pressed = document.querySelectorAll('.pressed:not(.freeze)');

        const img_front_face = document.querySelectorAll('.pressed:not(.freeze) .front-face img');
        if (card_pressed.length % 2 === 0) {
            cards.classList.add('block');
            console.log(img_front_face[0].getAttribute('src'), img_front_face[1].getAttribute('src'));
            if (img_front_face[0].getAttribute('src') !== img_front_face[1].getAttribute('src')) {
                setTimeout(() => {
                    card_pressed[0].classList.toggle('pressed');
                    card_pressed[1].classList.toggle('pressed');
                    cards.classList.remove('block');
                }, 1000);
            } else {
                card_pressed[0].classList.add('freeze');
                card_pressed[1].classList.add('freeze');
                cards.classList.remove('block');
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
