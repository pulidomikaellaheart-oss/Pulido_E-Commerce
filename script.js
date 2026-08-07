function setActiveNav(link) {
    event.preventDefault();
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
}

const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');

form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    emailErr.textContent = '';
    passErr.textContent = '';

    if(email.value.trim() === '') {
        emailErr.textContent = 'Please enter your email.';
        valid = false;
    }
    if(password.value === '') {
        passErr.textContent = 'Please enter your password.';
        valid = false;
    }
    else if(password.value.length < 6) {
        passErr.textContent = 'Password must be at least 6 characters.';
        valid = false;
    }

    if(valid) alert('Sign in successful!');
});
