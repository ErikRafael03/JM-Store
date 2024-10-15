document.addEventListener('DOMContentLoaded', () => {
    // Busca os itens do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Verifica se há itens no carrinho
    if (cart.length === 0) {
      alert('Sua sacola está vazia!');
      return; // Se não houver itens, não continua
    }
  
    // Exibe os produtos no carrinho
    const cartList = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    let totalPrice = 0;
  
    cart.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="item-details">
            <h4>${item.title}</h4>
            <p>R$ ${item.price.toFixed(2)}</p>
            <p>Tamanho: ${item.size}</p>
            <p>Quantidade: ${item.quantity}</p>
          </div>
        </div>
        <br>
      `;
      cartList.appendChild(div);
      
      // Calcula o total
      totalPrice += item.price * item.quantity;
    });
  
    totalPriceElem.textContent = `R$ ${totalPrice.toFixed(2)}`;
  
    // Finalização da compra
    const form = document.getElementsByClassName('container');
    form.addEventListener('submit', finalizarCompra);
  
    function finalizarCompra(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;
      
        if (name && address && payment) {
          alert('Compra finalizada com sucesso!');
          
          // Esconde o formulário e exibe a confirmação
          const form = document.getElementById('checkout-form');
          const confirmation = document.getElementById('confirmation');
          form.style.display = 'none';
          confirmation.style.display = 'block';
      
          // Limpa o carrinho após a compra
          localStorage.removeItem('cart');
        } else {
          alert('Por favor, preencha todos os campos.');
        }
      }
  });
  