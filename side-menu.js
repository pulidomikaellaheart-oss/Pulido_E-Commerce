document.addEventListener('DOMContentLoaded', function() {

    // ===== ACTIVE MENU + PAGE SWITCHING =====
    const allMenuItems = document.querySelectorAll('.menu-item');

    allMenuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active from all
            allMenuItems.forEach(function(i) {
                i.classList.remove('active');
            });

            // Add active to clicked
            this.classList.add('active');

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(function(sec) {
                sec.classList.remove('active');
            });

            // Show selected section
            const sectionId = this.id.replace('menu-', '');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // ===== LOGOUT CONFIRMATION =====
    const logoutItem = document.getElementById('menu-logout');
    logoutItem.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully! See you again at HEARTIE! 💜');
        }
    });

});

// ✅ TOGGLE SIDEBAR FUNCTION — PININDOT ANG ARROW!
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    // Add/remove collapsed class
    sidebar.classList.toggle('collapsed');
    
    // Change arrow direction
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
    } else {
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-left');
    }
}

// ===== ADD TO CART FUNCTION =====
function addToCart(productName, price) {
    alert('Added to Cart:\n' + productName + '\nPrice: ₱' + price + '\n\nHappy shopping at HEARTIE!');
}

// ===== SET ACTIVE =====
function setActive(link) {
    document.querySelectorAll('.menu-item').forEach(function(i) {
        i.classList.remove('active');
    });
    link.classList.add('active');
}

// ===== SHOW SECTION =====
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(function(sec) {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// ===== CONFIRM LOGOUT =====
function confirmLogout() {
    if (confirm('Are you sure you want to log out?')) {
        alert('Logged out successfully! See you again at HEARTIE! 💜');
    }
}