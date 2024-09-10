// MENU MOBILE 
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})
menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})
// MENU MOBILE 

// BTN TAMANHO
const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe "selected" de todos os botões
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            // Adiciona a classe "selected" ao botão clicado
            button.classList.add('selected');
        });
    });

function changeImage(imageSrc) {
    document.getElementById('mainDisplay').src = imageSrc;
}
