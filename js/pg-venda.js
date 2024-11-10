// PG-VENDAS BTN TAMANHO
const sizeButtons = document.querySelectorAll('.size-btn');

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe "selected" de todos os botões
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        // Adiciona a classe "selected" ao botão clicado
        button.classList.add('selected');
    });
});
// PG-VENDAS BTN TAMANHO

// PG-VENDAS MINIATURA IMG
function changeImage(imageSrc) {
    document.getElementById('product-main-image').src = imageSrc;
}
// PG-VENDAS MINIATURA IMG

// Dados das camisas
const products = {
    "black-shirt": {
        title: "Camiseta Juventude Preta",
        price: "R$ 50,00",
        image: "../assets/camisa-preta1.png",
        thumbs: [
            "../assets/camisa-preta1.png",
            "../assets/camisa-preta-logo.png",
            "../assets/camisa-preta-fundo.png",
            "../assets/camisa-preta-frente-verso.png"
        ]
    },
    "white-shirt": {
        title: "Camiseta Juventude Branca",
        price: "R$ 50,00",
        image: "../assets/camisa-branca.png",
        thumbs: [
            "../assets/camisa-branca.png",
            "../assets/camisa-branca-logo.png",
            "../assets/camisa-branca-verso.png",
            "../assets/camisa-branca-frente-verso.jpeg"
        ]
    },
    "green-shirt": {
        title: "Camiseta Juventude Verde",
        price: "R$ 50,00",
        image: "../assets/camisa-verde.png",
        thumbs: [
            "../assets/camisa-verde.png",
            "../assets/camisa-verde-logo.png",
            "../assets/camisa-verde-fundo.png",
            "../assets/camisa-verde-frente-verso.jpeg"
        ]
    },
    "red-shirt": {
        title: "Camiseta Juventude Vermelha",
        price: "R$ 50,00",
        image: "../assets/camisa-vermelha.png",
        thumbs: [
            "../assets/camisa-vermelha.png",
            "../assets/camisa-vermelha-logo.png",
            "../assets/camisa-vermelha-verso.png",
            "../assets/camisa-vermelha-frente-verso.jpeg"
        ]
    }
};

// Função para carregar o produto na tela de compra
function loadProduct(productKey) {
    const product = products[productKey];

    // Atualizar imagem principal, título e preço do produto
    document.getElementById("product-main-image").src = product.image;
    document.getElementById("product-title").innerText = product.title;
    document.getElementById("product-price").innerText = product.price;

    // Atualizar as miniaturas
    const thumbnails = document.querySelectorAll(".thumbnail");
    product.thumbs.forEach((thumbUrl, index) => {
        thumbnails[index].src = thumbUrl;
        thumbnails[index].onclick = () => changeImage(thumbUrl); // Adiciona o clique nas miniaturas
    });
}

// Redirecionar para a página de compra com o produto certo
function redirectToBuyPage(productKey) {
    window.location.href = `../pages/pagina-venda.html?product=${productKey}`;
}
function redirectToBuyPageIndex(productKey) {
    window.location.href = `./pages/pagina-venda.html?product=${productKey}`;
}

// Capturar o parâmetro da URL
function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('product');
}

// Quando a página carregar, definir o produto correto
window.onload = function () {
    const productKey = getProductFromUrl();
    if (productKey) {
        loadProduct(productKey); // Carregar os dados do produto
    }
};

// ADICIONAR NA SACOLA

function addToCart() {
    // Obtém os dados do produto na página
    const productTitle = document.getElementById('product-title').innerText; // Nome do produto
    const productPrice = parseFloat(document.getElementById('product-price').innerText.replace('R$', '').replace(',', '.')); // Preço do produto
    const productImage = document.getElementById('product-main-image').src; // Imagem do produto

    // Verifica o tamanho selecionado
    const selectedSizeButton = document.querySelector('.size-btn.selected');
    const productSize = selectedSizeButton ? selectedSizeButton.innerText : null; // Tamanho do produto

    // Pega a quantidade
    const productQuantity = parseInt(document.getElementById('product-quantity').value); // Quantidade do produto

    // Verifica se todos os dados estão preenchidos
    if (!productSize) {
        // alert('❌ Por favor, selecione o tamanho do produto!');
        Swal.fire({
            icon: "error",
            title: "Por favor, selecione o tamanho do produto!",
            customClass: {
                confirmButton: 'custom-confirm-button',
            }
        });
        return;
    }

    if (!productQuantity || productQuantity <= 0) {
        // alert('❌ Por favor, insira uma quantidade válida!');
        Swal.fire({
            icon: "error",
            title: "Por favor, insira uma quantidade válida!",
            customClass: {
                confirmButton: 'custom-confirm-button',
            }
        });
        return;
    }

    // Cria o objeto do produto
    const product = {
        title: productTitle,
        price: productPrice,
        image: productImage,
        size: productSize,
        quantity: productQuantity
    };
    // Verifica se já existe um carrinho no localStorage, senão cria um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o produto já está no carrinho
    const existingProductIndex = cart.findIndex(item => item.title === product.title && item.size === product.size);

    if (existingProductIndex !== -1) {
        // Se o produto já está no carrinho, aumenta a quantidade
        cart[existingProductIndex].quantity += productQuantity;
    } else {
        // Caso contrário, adiciona o novo produto
        cart.push(product);
    }
    console.log(product);
    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Feedback ao usuário
    // alert('✅ Produto adicionado a sacola!');

    // NOVO ALERT
    newFunction();

    function newFunction() {
        Swal.fire({
            icon: "success",
            title: "Produto adicionado à sacola",
            confirmButtonText: "Ir para a sacola",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
            footer: '<a href="../pages/camisas.html">Continuar comprando</a>'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../pages/sacola.html"; // Substitua pelo seu link
            }
        });
    }
    // NOVO ALERT
}
// ADICIONAR NA SACOLA