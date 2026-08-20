// ===== ACTIVE NAVIGATION =====
function setActiveNav(link) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

// ===== RESET ACTIVE — BACK TO LOGIN =====
function resetActiveNav() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

// ===== SWITCH PAGES =====
function showPage(pageId) {
    // Itago lahat ng page
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    // Ipakita ang napiling page
    document.getElementById(pageId).classList.add('active');
}

// ===== LOGIN FORM VALIDATION =====
const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailErr = document.getElementById('emailErr');
const passErr = document.getElementById('passErr');

loginForm.addEventListener('submit', e => {
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

// ===== SIGN UP FORM VALIDATION — BAGONG DAGDAG! =====
const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPass = document.getElementById('signupConfirmPass');
const signupNameErr = document.getElementById('signupNameErr');
const signupEmailErr = document.getElementById('signupEmailErr');
const signupPassErr = document.getElementById('signupPassErr');
const signupConfirmErr = document.getElementById('signupConfirmErr');
const signupSuccess = document.getElementById('signupSuccess');

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    
    // Clear errors
    signupNameErr.textContent = '';
    signupEmailErr.textContent = '';
    signupPassErr.textContent = '';
    signupConfirmErr.textContent = '';
    signupSuccess.classList.remove('show');

    // Name validation
    if(signupName.value.trim() === '') {
        signupNameErr.textContent = 'Please enter your full name.';
        valid = false;
    }

    // Email validation
    if(signupEmail.value.trim() === '') {
        signupEmailErr.textContent = 'Please enter your email.';
        valid = false;
    }

    // Password validation
    if(signupPassword.value === '') {
        signupPassErr.textContent = 'Please create a password.';
        valid = false;
    }
    else if(signupPassword.value.length < 6) {
        signupPassErr.textContent = 'Password must be at least 6 characters.';
        valid = false;
    }

    // Confirm password
    if(signupConfirmPass.value === '') {
        signupConfirmErr.textContent = 'Please confirm your password.';
        valid = false;
    }
    else if(signupPassword.value !== signupConfirmPass.value) {
        signupConfirmErr.textContent = 'Passwords do not match!';
        valid = false;
    }

    // ✅ SUCCESS — KUNG TAMA LAHAT!
    if(valid) {
        signupSuccess.classList.add('show');
        // Clear form
        signupForm.reset();
        // Auto balik sa Login after 4 seconds
        setTimeout(() => {
            signupSuccess.classList.remove('show');
            showPage('login-page');
        }, 4000);
    }
});

// ===== SEND MESSAGE — CONTACT FORM =====
function sendMessage() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const successMsg = document.getElementById('successMsg');

    // Check kung may laman
    if(name === '' || email === '' || message === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Ipakita success message
    successMsg.classList.add('show');

    // I-clear form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';

    // Maglalaho sa 5 segundo
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}