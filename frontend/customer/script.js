let cart = [];
let cartSidebar, cartItemsContainer, cartTotalElement, overlay;
let checkoutModal, checkoutForm, checkoutItems, checkoutTotalAmount;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    cartSidebar = document.getElementById('cart-sidebar');
    cartItemsContainer = document.getElementById('cart-items');
    cartTotalElement = document.getElementById('cart-total');
    overlay = document.getElementById('overlay');
    checkoutModal = document.getElementById('checkout-modal');
    checkoutForm = document.getElementById('checkout-form');
    checkoutItems = document.getElementById('checkout-items');
    checkoutTotalAmount = document.getElementById('checkout-total-amount');

    console.log('Cart initialized');

    // Open/Close Cart
    const orderLink = document.querySelector('.order-link a');
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
            checkoutModal.classList.remove('active');
            console.log('Modal closed via overlay');
        });
    }

    // Checkout button click
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items first.');
                return;
            }
            openCheckoutModal();
        });
    }

    // Close checkout modal
    const closeCheckoutBtn = document.getElementById('close-checkout');
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Handle checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
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
    const orderLink = document.querySelector('.order-link a');
    if (orderLink) {
        orderLink.innerText = `📋 My Order (${cart.length})`;
    }
    console.log('Cart updated. Items:', cart.length, 'Total:', total);
}

// Open Checkout Modal
function openCheckoutModal() {
    if (!checkoutModal || !checkoutItems || !checkoutTotalAmount) {
        console.error('Checkout elements not initialized');
        return;
    }

    // Populate checkout items
    checkoutItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>KES ${item.price}</span>
        `;
        checkoutItems.appendChild(itemElement);
    });

    checkoutTotalAmount.innerText = `KES ${total.toFixed(2)}`;

    // Show modal
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
    console.log('Checkout modal opened');
}

// Handle Checkout Form Submission
function handleCheckoutSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items first.');
        return;
    }

    // Get form data
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const location = document.getElementById('customer-location').value;
    const notes = document.getElementById('customer-notes').value;

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Create order object
    const order = {
        id: Date.now(),
        customer: {
            name: name,
            phone: phone,
            location: location
        },
        items: cart,
        notes: notes,
        total: total,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    console.log('Order submitted:', order);

    // Here you would typically send this to your backend
    // For now, we'll store it in localStorage and alert the user
    const existingOrders = JSON.parse(localStorage.getItem('meghawatt_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('meghawatt_orders', JSON.stringify(existingOrders));

    // Clear cart and close modals
    cart = [];
    updateCartUI();
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
    cartSidebar.classList.remove('active');

    // Reset form
    checkoutForm.reset();

    // Show success message
    alert(`Order placed successfully!\n\nOrder ID: ${order.id}\nTotal: KES ${total.toFixed(2)}\n\nYour order will be delivered to: ${location}`);
}
