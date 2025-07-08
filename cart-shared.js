// Shared cart functionality for all pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const TAX_RATE = 0.08; // 8% tax

// Book database - in a real app, this would come from a server
const books = {
  'book1': { id: 'book1', title: 'Anna Karenina', price: 500, image: 'images/Book 1.jpg' },
  'book2': { id: 'book2', title: 'The Great Gatsby', price: 450, image: 'images/Book 2.jpg' },
  'book3': { id: 'book3', title: 'To Kill a Mockingbird', price: 400, image: 'images/Book 3.jpg' },
  'book4': { id: 'book4', title: '1984', price: 550, image: 'images/Book 4.jpg' },
  'book5': { id: 'book5', title: 'Pride and Prejudice', price: 480, image: 'images/Book 5.jpg' },
  'book6': { id: 'book6', title: 'The Catcher in the Rye', price: 420, image: 'images/Book 6.jpg' },
  'book7': { id: 'book7', title: 'Lord of the Flies', price: 380, image: 'images/Book 7.jpg' },
  'book8': { id: 'book8', title: 'The Hobbit', price: 520, image: 'images/Book 8.jpg' },
  'book9': { id: 'book9', title: 'Fahrenheit 451', price: 460, image: 'images/Book 9.jpg' },
  'book10': { id: 'book10', title: 'Jane Eyre', price: 490, image: 'images/Book 10.jpg' },
  'book11': { id: 'book11', title: 'Wuthering Heights', price: 470, image: 'images/Book 11.jpg' },
  'book12': { id: 'book12', title: 'The Picture of Dorian Gray', price: 440, image: 'images/Book 12.jpg' },
  'book13': { id: 'book13', title: 'Brave New World', price: 510, image: 'images/Book 13.jpg' },
  'book14': { id: 'book14', title: 'The Lord of the Rings', price: 650, image: 'images/Book 14.jpg' },
  'book15': { id: 'book15', title: 'Harry Potter', price: 580, image: 'images/Book 15.jpg' },
  'book16': { id: 'book16', title: 'War and Peace', price: 700, image: 'images/Book 16.jpg' }
};

// Function to add item to cart
function addToCart(bookId, quantity = 1) {
  const existingItem = cart.find(item => item.id === bookId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: bookId, quantity: quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  
  // Show confirmation message
  const book = books[bookId];
  if (book) {
    showNotification(`${book.title} added to cart!`);
  }
}

// Function to show notification
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.cart-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;

  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Function to update cart icon
function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Check if cart badge exists, if not create it
  let cartBadge = document.querySelector('.cart-badge');
  if (!cartBadge && totalItems > 0) {
    cartBadge = document.createElement('span');
    cartBadge.className = 'cart-badge';
    cartBadge.style.cssText = `
      position: absolute;
      top: 10px;
      right: -8px;
      background: #ff523b;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 12px;
      font-weight: bold;
      min-width: 18px;
      text-align: center;
    `;
    
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
      cartLink.style.position = 'relative';
      cartLink.appendChild(cartBadge);
    }
  }
  
  if (cartBadge) {
    if (totalItems > 0) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = 'block';
    } else {
      cartBadge.style.display = 'none';
    }
  }
}

// Initialize cart icon when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartIcon();
});

// Menu toggle functionality (shared across all pages)
function menutoggle() {
  var MenuItems = document.getElementById("MenuItems");
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "200px";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}

// Initialize menu
document.addEventListener('DOMContentLoaded', function() {
  var MenuItems = document.getElementById("MenuItems");
  if (MenuItems) {
    MenuItems.style.maxHeight = "0px";
  }
});
