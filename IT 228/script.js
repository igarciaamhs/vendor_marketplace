// JavaScript for Shopping Cart Functionality

let cart = [];

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price} x ${item.quantity}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);

    // Attach remove event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

// Function to add an item to the cart
function addToCart(event) {
    const product = event.target.closest('.product');
    const productId = product.dataset.id;
    const productName = product.dataset.name;
    const productPrice = parseFloat(product.dataset.price);

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Function to remove an item from the cart
function removeItemFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Handle checkout process
document.getElementById('checkout-button').addEventListener('click', () => {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
});

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Purchase Complete! Thank you for your order.');
    cart = []; // Clear the cart
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
});

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});
