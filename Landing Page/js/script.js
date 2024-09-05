console.log("Conecting");

// Shopping Cart //
const cart = {};
let totalAmount = 0; // Initialize the total amount

function addToCart(productName, price) {
    if (!cart[productName]) {
        cart[productName] = { quantity: 1, price: price };
    } else {
        cart[productName].quantity += 1;
    }

    totalAmount += price; // Increase the total with the price of the new item.
    updateCartDisplay();
}

function removeFromCart(productName) {
    if (cart[productName]) {
        totalAmount -= cart[productName].price; // Subtract the price of the removed item from the total
        cart[productName].quantity -= 1;

        if (cart[productName].quantity === 0) {
            delete cart[productName];
        }
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const totalElement = document.getElementById('totalAmount');

    cartItems.innerHTML = ''; // Clear the list of items

    let totalItems = 0;

    for (const [productName, productDetails] of Object.entries(cart)) {
        const li = document.createElement('li');
        li.textContent = `${productName} - $${productDetails.price} x ${productDetails.quantity}`;

        // Create the Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(productName);

        // Add styles to make the button rounded and add a click effect
        removeButton.style.padding = '5px 10px';
        removeButton.style.borderRadius = '12px'; // Rounded corners
        removeButton.style.border = 'none';
        removeButton.style.backgroundColor = '#f44336'; // Button color
        removeButton.style.color = 'white';
        removeButton.style.cursor = 'pointer';
        removeButton.style.transition = 'background-color 0.3s'; // Smooth transition effect

        // Change color on hover
        removeButton.onmouseover = () => {
            removeButton.style.backgroundColor = '#d32f2f'; // Darker shade on hover
        };
        removeButton.onmouseout = () => {
            removeButton.style.backgroundColor = '#f44336'; // Original color on mouse out
        };

        li.appendChild(removeButton);
        cartItems.appendChild(li);
        totalItems += productDetails.quantity; // Count the total number of products
    }

    cartCount.textContent = totalItems; // Update cart counter
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`; // Update cart total
}


// HTML total of the cart
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart');
    const totalElement = document.createElement('div');
    totalElement.id = 'totalAmount';
    totalElement.style.marginTop = '10px';
    totalElement.style.fontWeight = 'bold';
    cartContainer.appendChild(totalElement);
    updateCartDisplay(); // Initialize the contents of the cart
});



