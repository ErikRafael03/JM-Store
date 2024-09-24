// MENU MOBILE 
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})
menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})
// MENU MOBILE 

// MENU DESKTOP
window.addEventListener('scroll', function() {
    var header = document.querySelector('header'); // Seleciona o elemento header
    if (window.scrollY > 50) { // Altere o valor 50px conforme necessário
        header.classList.add('scrolled'); // Adiciona a classe 'scrolled' após o scroll
    } else {
        header.classList.remove('scrolled'); // Remove a classe quando o scroll for menor
    }
});
// MENU DESKTOP
