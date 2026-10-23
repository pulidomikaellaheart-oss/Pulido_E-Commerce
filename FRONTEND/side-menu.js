document.addEventListener('DOMContentLoaded', function() {
    const allMenuItems = document.querySelectorAll('.menu-item');

    allMenuItems.forEach(function(item) {
        if (item.id === 'menu-logout') return;
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            allMenuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
     
            document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
            
            const sectionId = this.id.replace('menu-', '');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    const logoutItem = document.getElementById('menu-logout');
    if (logoutItem) {
        logoutItem.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                saveUserData();
                alert('Logged out successfully! See you again at HEARTIE! 💜');
                window.location.href = 'index.html';
            }
        });
    }

    loadUserData();
    updateUserProfile();
    updateCartUI();
    updateWishlistUI();
    renderOrders();
});

function getCurrentUserEmail() {
    return localStorage.getItem('heartieActiveUser') || 'user@example.com';
}

let cart = [];
let orders = [];
let wishlist = [];

function loadUserData() {
    let email = getCurrentUserEmail();
    let savedCart = localStorage.getItem('heartie_cart_' + email);
    let savedOrders = localStorage.getItem('heartie_orders_' + email);
    let savedWishlist = localStorage.getItem('heartie_wishlist_' + email);

    cart = savedCart ? JSON.parse(savedCart) : [];
    orders = savedOrders ? JSON.parse(savedOrders) : [];
    
    wishlist = savedWishlist ? JSON.parse(savedWishlist) : [
        { name: 'Beaded Phone Charm', price: 50, desc: 'Pastel beaded wrist strap — secure & cute!', img: 'Beaded Phone Charm.jpg' },
        { name: 'Couple Bracelet Set', price: 120, desc: 'Matching beaded bracelets for you & your special someone!', img: 'Couple Bracelet Set.jpg' }
    ];
}

function updateUserProfile() {
    let email = getCurrentUserEmail();
    let savedUser = JSON.parse(localStorage.getItem('heartieRegisteredUser'));

    const nameDisplay = document.getElementById('profile-display-name');
    const emailDisplay = document.getElementById('profile-display-email');
    const courseDisplay = document.getElementById('profile-display-course');
    const yearDisplay = document.getElementById('profile-display-year');
    const phoneDisplay = document.getElementById('profile-display-phone');
    const locationDisplay = document.getElementById('profile-display-location');

    if (savedUser && savedUser.email === email) {
        if (nameDisplay) nameDisplay.textContent = savedUser.name;
        if (emailDisplay) emailDisplay.textContent = savedUser.email;
        if (courseDisplay) courseDisplay.textContent = savedUser.course || 'Bachelor of Science in Information Technology';
        if (yearDisplay) yearDisplay.textContent = savedUser.year || '2nd Year';
        if (phoneDisplay) phoneDisplay.textContent = savedUser.phone || '+63 910-688-3273';
        if (locationDisplay) locationDisplay.textContent = savedUser.location || 'Camiling, Tarlac';
    } else {
        if (nameDisplay) nameDisplay.textContent = (email === 'seller@example.com') ? 'HEARTIE Seller' : 'Mikai Lla';
        if (emailDisplay) emailDisplay.textContent = email;
    }
}

function saveUserData() {
    let email = getCurrentUserEmail();
    localStorage.setItem('heartie_cart_' + email, JSON.stringify(cart));
    localStorage.setItem('heartie_orders_' + email, JSON.stringify(orders));
    localStorage.setItem('heartie_wishlist_' + email, JSON.stringify(wishlist));
    
    updateBadges();
}

function updateBadges() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        let totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = totalCartCount;
    }

    const ordersBadge = document.getElementById('orders-badge');
    if (ordersBadge) {
        ordersBadge.textContent = orders.length;
    }

    const wishlistBadge = document.getElementById('wishlist-badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
    } else {
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-left');
    }
}

function addToCart(productName, price, imgName = 'Flower Beaded Bracelet.jpg') {
    let existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, price: price, qty: 1, img: imgName });
    }
    saveUserData();
    updateCartUI();
    alert('Added to Cart:\n' + productName + '\nPrice: ₱' + price + '\n\nHappy shopping at HEARTIE! 💜');
}

function addToWishlist(productName, price, description, imgName) {
    let existing = wishlist.find(item => item.name === productName);
    if (existing) {
        alert('Nasa Wishlist mo na ang produktong ito! ❤️');
        return;
    }

    wishlist.push({
        name: productName,
        price: price,
        desc: description,
        img: imgName
    });

    saveUserData();
    updateWishlistUI();
    alert(`Nailagay na ang "${productName}" sa iyong Wishlist! ❤️`);
}

function updateCartUI() {
    const container = document.getElementById('cart-items-list');
    const totalSection = document.getElementById('cart-total-section');

    updateBadges();

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="padding: 10px; color: #ccc;">Walang laman ang iyong cart sa ngayon.</p>';
        if (totalSection) totalSection.style.display = 'none';
        return;
    }

    if (totalSection) totalSection.style.display = 'flex';
    let html = '';

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        html += `
            <div class="cart-card" style="margin-bottom: 15px;">
                <div class="card-row" style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <input type="checkbox" class="cart-checkbox" data-index="${index}" onchange="calculateSelectedTotal()" style="width: 20px; height: 20px; cursor: pointer;">
                        <img src="${item.img || 'Flower Beaded Bracelet.jpg'}" alt="${item.name}" class="card-img">
                        <div class="card-body">
                            <h3 style="color:#06eb7c;">${item.name}</h3>
                            <p class="price" style="color:#fff;">₱${item.price} × ${item.qty} = <strong>₱${subtotal}.00</strong></p>
                        </div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Alisin</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    calculateSelectedTotal();
    saveUserData();
}

function calculateSelectedTotal() {
    const checkboxes = document.querySelectorAll('.cart-checkbox');
    const totalDisplay = document.getElementById('cart-total-display');
    let selectedTotal = 0;

    checkboxes.forEach(chk => {
        if (chk.checked) {
            let index = chk.getAttribute('data-index');
            let item = cart[index];
            selectedTotal += (item.price * item.qty);
        }
    });

    if (totalDisplay) {
        totalDisplay.textContent = `Total ng Napili: ₱${selectedTotal}.00`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function proceedToCheckout() {
    const checkboxes = document.querySelectorAll('.cart-checkbox');
    const paymentSelect = document.getElementById('payment-method-select');
    let selectedPayment = paymentSelect ? paymentSelect.value : 'Cash on Delivery';

    let selectedItems = [];
    let grandTotal = 0;
    let indexesToRemove = [];

    checkboxes.forEach(chk => {
        if (chk.checked) {
            let index = parseInt(chk.getAttribute('data-index'));
            selectedItems.push(cart[index]);
            grandTotal += (cart[index].price * cart[index].qty);
            indexesToRemove.push(index);
        }
    });

    if (selectedItems.length === 0) {
        alert('Mangyaring pumili muna ng kahit isang item sa cart na nais mong i-checkout!');
        return;
    }

    let orderNumber = '000' + (orders.length + 1);
    let currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    let orderSummaryText = selectedItems.map(item => `${item.name} × ${item.qty}`).join(', ');
    let orderImg = selectedItems[0].img || 'Flower Beaded Bracelet.jpg';

    orders.unshift({
        id: orderNumber,
        items: orderSummaryText,
        img: orderImg,
        date: currentDate,
        total: grandTotal,
        paymentMethod: selectedPayment,
        status: selectedPayment === 'Cash on Delivery' ? '⏳ Processing (COD)' : '✅ Paid (' + selectedPayment + ')'
    });

    cart = cart.filter((item, index) => !indexesToRemove.includes(index));
    saveUserData();
    updateCartUI();
    renderOrders();

    alert(`Checkout successful!\nPayment Method: ${selectedPayment}\nTotal: ₱${grandTotal}.00\n\nAng iyong order ay nailipat na sa My Orders. 💜`);
    showSection('orders');
    
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
    const ordersMenu = document.getElementById('menu-orders');
    if (ordersMenu) ordersMenu.classList.add('active');
}

function renderOrders() {
    let ordersContainer = document.getElementById('orders-container');
    updateBadges();

    if (!ordersContainer) return;

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p style="padding: 10px; color: #ccc;">Wala ka pang nakaraang order sa ngayon.</p>';
        return;
    }

    let html = '';
    orders.forEach(ord => {
        let isPaid = ord.paymentMethod && ord.paymentMethod !== 'Cash on Delivery';
        let badgeClass = isPaid ? 'badge-green' : 'badge-lightgreen';

        html += `
            <div class="order-card" style="margin-bottom: 15px; border: 1px solid rgba(6,235,124,0.3); padding: 15px; border-radius: 8px; background: rgba(20,30,25,0.85);">
                <div class="card-row" style="display:flex; align-items:center; gap: 15px;">
                    <img src="${ord.img || 'Flower Beaded Bracelet.jpg'}" alt="Order Image" class="card-img">
                    <div class="card-body" style="flex: 1;">
                        <h3 style="color:#06eb7c;">Order #${ord.id}</h3>
                        <p style="color:#fff;"><strong>Items:</strong> ${ord.items}</p>
                        <p class="order-meta" style="color:#ccc;">Date: ${ord.date}</p>
                        <p class="payment-method" style="color:#06eb7c; font-weight: 500;">
                            <strong>💳 Payment Method:</strong> ${ord.paymentMethod || 'Cash on Delivery'} 
                            ${isPaid ? ' <span style="color:#85f3c5;">(Paid Online)</span>' : ' <span style="color:#ffc107;">(Pay on Delivery)</span>'}
                        </p>
                        <span class="badge ${badgeClass}">${ord.status}</span>
                        <p class="price" style="margin-top: 5px; color:#06eb7c; font-size:1.1rem;"><strong>Total: ₱${ord.total}.00</strong></p>
                    </div>
                </div>
            </div>
        `;
    });

    ordersContainer.innerHTML = html;
}

function updateWishlistUI() {
    const container = document.getElementById('wishlist-items-list');
    updateBadges();

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '<p style="padding: 10px; color: #ccc;">Walang laman ang iyong wishlist sa ngayon.</p>';
        return;
    }

    let html = '';
    wishlist.forEach((item, index) => {
        html += `
            <div class="wishlist-card" style="margin-bottom: 15px; border: 1px solid rgba(6,235,124,0.3); padding: 15px; border-radius: 8px; background: rgba(20,30,25,0.85);">
                <div class="card-row" style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${item.img}" alt="${item.name}" class="card-img">
                        <div class="card-body">
                            <h3 style="color:#06eb7c;">${item.name}</h3>
                            <p style="color:#fff;">${item.desc}</p>
                            <p class="price" style="color:#06eb7c; font-weight: bold;">₱${item.price}.00</p>
                        </div>
                    </div>
                    <button class="move-btn" onclick="moveToCartFromWishlist(${index})">🛒 Move to Cart</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function moveToCartFromWishlist(index) {
    let item = wishlist[index];
    addToCart(item.name, item.price, item.img);
    wishlist.splice(index, 1);
    saveUserData();
    updateWishlistUI();
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(function(sec) {
        sec.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        if (sectionId === 'orders') renderOrders();
        if (sectionId === 'wishlist') updateWishlistUI();
        if (sectionId === 'profile') updateUserProfile();
    }
}

let isDarkMode = false;
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    alert(isDarkMode ? '🌙 Dark Mode ON' : '☀️ Light Mode ON');
}