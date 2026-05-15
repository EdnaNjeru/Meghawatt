let cart = [];
let cartSidebar, cartItemsContainer, cartTotalElement, overlay;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    cartSidebar = document.getElementById('cart-sidebar');
    cartItemsContainer = document.getElementById('cart-items');
    cartTotalElement = document.getElementById('cart-total');
    overlay = document.getElementById('overlay');

    console.log('Cart initialized');

    // Open/Close Cart
    const orderLink = document.querySelector('.order-link');
    if (orderLink) {
        orderLink.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            console.log('Cart opened');
        });
    }

    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            console.log('Cart closed');
        });
    }

    // Close cart when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            console.log('Cart closed via overlay');
        });
    }

    // Checkout button handler
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const locationInput = document.getElementById('delivery-location').value;

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            if (!locationInput.trim()) {
                alert("Please enter your location or desk number so we know where to bring the food!");
                return;
            }

            // Calculate total price
            let total = cart.reduce((sum, item) => sum + item.price, 0);

            // Create a structured order object
            const newOrder = {
                orderId: "MGT-" + Math.floor(1000 + Math.random() * 9000),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                items: cart.map(item => item.name),
                location: locationInput,
                total: total,
                status: "Pending"
            };

            // Pull existing orders from localStorage, push the new one, and resave
            let existingOrders = JSON.parse(localStorage.getItem('restaurantOrders')) || [];
            existingOrders.push(newOrder);
            localStorage.setItem('restaurantOrders', JSON.stringify(existingOrders));

            // Clear cart and give feedback
            cart = [];
            document.getElementById('delivery-location').value = '';
            updateCartUI();
            
            // Close the cart sidebar
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');

            alert("Order successfully placed! The kitchen has received it.");
        });
    }
});

// Add Item Function
function addToCart(name, price) {
    console.log('Adding to cart:', name, price);
    cart.push({ name, price });
    updateCartUI();
}

// Remove Item Function
function removeFromCart(index) {
    console.log('Removing from cart:', index);
    cart.splice(index, 1);
    updateCartUI();
}

// Update the Cart Display
function updateCartUI() {
    if (!cartItemsContainer || !cartTotalElement) {
        console.error('Cart elements not initialized');
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your tray is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <small>KES ${item.price}</small>
                </div>
                <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    cartTotalElement.innerText = `KES ${total.toFixed(2)}`;
    const orderLink = document.querySelector('.order-link');
    if (orderLink) {
        orderLink.innerText = `My Order (${cart.length})`;
    }
    console.log('Cart updated. Items:', cart.length, 'Total:', total);
}
