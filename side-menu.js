document.addEventListener('DOMContentLoaded', function() {

    const allMenuItems = document.querySelectorAll('.menu-item');

    allMenuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
  
            allMenuItems.forEach(function(i) {
                i.classList.remove('active');
            });
            
            this.classList.add('active');
     
            document.querySelectorAll('.content-section').forEach(function(sec) {
                sec.classList.remove('active');
            });
            
            const sectionId = this.id.replace('menu-', '');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    const logoutItem = document.getElementById('menu-logout');
    logoutItem.addEventListener('click', function(e) {
        e.preventDefault();
  
        if (confirm('Are you sure you want to log out?')) {
    
            alert('Logged out successfully! See you again at HEARTIE! 💜');
        }
    });
});

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

let cartCount = 0;

function addToCart(productName, price) {

    alert('Added to Cart:\n' + productName + '\nPrice: ₱' + price + '\n\nHappy shopping at HEARTIE! 💜');

    cartCount++;
    updateCartCountDisplay();
}

function updateCartCountDisplay() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

function setActive(link) {
    document.querySelectorAll('.menu-item').forEach(function(i) {
        i.classList.remove('active');
    });
    link.classList.add('active');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(function(sec) {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function confirmLogout() {
    if (confirm('Are you sure you want to log out?')) {
        alert('Logged out successfully! See you again at HEARTIE! 💜');
    }
}

let isDarkMode = false;
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    alert(isDarkMode ? '🌙 Dark Mode ON' : '☀️ Light Mode ON');
}