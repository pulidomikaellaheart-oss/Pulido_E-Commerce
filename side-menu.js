// KAPAG NABASA NA ANG PAGE — MAGDAGDAG NG CLICK SA LAHAT NG MENU ITEMS
document.addEventListener('DOMContentLoaded', function() {
    
    // HANAPIN LAHAT NG MENU ITEMS
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    // BAWAT ISA — DAGDAGAN NG CLICK EVENT
    allMenuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // HUWAG I-RELOAD ANG PAGE
            e.preventDefault();
            
            // TANGGALIN ANG ACTIVE SA LAHAT
            allMenuItems.forEach(function(i) {
                i.classList.remove('active');
            });
            
            // ILAGAY ANG ACTIVE SA PININDOT
            this.classList.add('active');
        });
    });
    
    // LOGOUT CLICK
    const logoutItem = document.getElementById('menu-logout');
    logoutItem.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            alert('Logout successful.');
        }
    });
});