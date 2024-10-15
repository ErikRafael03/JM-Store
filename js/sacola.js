document.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.querySelector('.quantity');
    const totalPriceElement = document.getElementById('total-price');
    const removeBtn = document.querySelector('.remove-btn');

    // Atualiza o preço total com base na quantidade
    quantityInput.addEventListener('change', function () {
        const unitPrice = 50.00; // Preço da camiseta
        const quantity = parseInt(quantityInput.value);
        const totalPrice = (unitPrice * quantity).toFixed(2);
        totalPriceElement.textContent = `R$ ${totalPrice}`;
    });

    // Remove item da sacola
    removeBtn.addEventListener('click', function () {
        const cartItem = this.closest('.cart-item');
        cartItem.remove();
        totalPriceElement.textContent = 'R$ 0,00';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalSection = document.getElementById('cart-total');

    // Verifica se há produtos no localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);  // Verifique se há itens no localStorage

    // Função para atualizar o conteúdo da sacola
    function updateCartDisplay() {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotalSection.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartTotalSection.style.display = 'block';

            cartItemsContainer.innerHTML = ''; // Limpa os itens anteriores

            let total = 0;
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <p>R$ ${item.price}</p>
                        <p>Tamanho: ${item.size}</p>
                        <p>Quantidade: ${item.quantity}</p>
            
                        <button class="remove-btn" data-index="${index}">Remover</button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItem);

                // Atualiza o total com base na quantidade e preço
                total += item.price * item.quantity;
            });

            totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
        }
    }

    // Evento para remover itens da sacola
    cartItemsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1); // Remove o item da array
            localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
            updateCartDisplay(); // Atualiza a exibição da sacola

            // Verifica se a sacola está vazia
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Sua sacola está vazia.</p>'; // Exibe mensagem de sacola vazia
                cartTotalSection.style.display = 'none'; // Esconde a seção de total
            }
        }
    });

    // Inicializa a página com o conteúdo do carrinho
    updateCartDisplay();
});

function finalizarCompra(){
    window.location.href = "../pages/finalizar-compra.html";
}

