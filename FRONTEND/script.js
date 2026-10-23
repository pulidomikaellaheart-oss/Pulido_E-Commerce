document.addEventListener('DOMContentLoaded', function() {
    showPage('login-page');

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const emailErr = document.getElementById('emailErr');
            const passErr = document.getElementById('passErr');

            if (emailErr) emailErr.textContent = '';
            if (passErr) passErr.textContent = '';

            let isValid = true;

            if (!email) {
                if (emailErr) emailErr.textContent = 'Please enter your email.';
                isValid = false;
            }

            if (!password) {
                if (passErr) passErr.textContent = 'Please enter your password.';
                isValid = false;
            }

            if (!isValid) return;

            let savedUser = JSON.parse(localStorage.getItem('heartieRegisteredUser'));

            if (email === 'seller@example.com' && password === 'seller123') {
                localStorage.setItem('heartieActiveUser', email);
                alert('Logging in successfully...');
                setTimeout(() => { window.location.href = 'seller.html'; }, 500);
            } else if (
                (email === 'user@example.com' && password === 'user123') ||
                (savedUser && email === savedUser.email && password === savedUser.password)
            ) {
                localStorage.setItem('heartieActiveUser', email);
                alert('Logging in successfully...');
                setTimeout(() => { window.location.href = 'side-menu.html'; }, 500);
            } else {
                if (emailErr) emailErr.textContent = 'Invalid email or password, or account does not exist.';
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const course = document.getElementById('signupCourse').value.trim() || 'Bachelor of Science in Information Technology';
            const year = document.getElementById('signupYear').value.trim() || '2nd Year';
            const phone = document.getElementById('signupPhone').value.trim() || '+63 910-688-3273';
            const location = document.getElementById('signupLocation').value.trim() || 'Camiling, Tarlac';
            const pass = document.getElementById('signupPassword').value;
            const confirmPass = document.getElementById('signupConfirmPass').value;
            const successMsg = document.getElementById('signupSuccess');

            document.getElementById('signupNameErr').textContent = '';
            document.getElementById('signupEmailErr').textContent = '';
            document.getElementById('signupPassErr').textContent = '';
            document.getElementById('signupConfirmErr').textContent = '';

            let isValid = true;

            if (!name) {
                document.getElementById('signupNameErr').textContent = 'Name is required';
                isValid = false;
            }
            if (!email) {
                document.getElementById('signupEmailErr').textContent = 'Email is required';
                isValid = false;
            }
            if (pass.length < 6) {
                document.getElementById('signupPassErr').textContent = 'Password must be at least 6 characters';
                isValid = false;
            }
            if (pass !== confirmPass) {
                document.getElementById('signupConfirmErr').textContent = 'Passwords do not match';
                isValid = false;
            }

            if (isValid) {
                let newUser = { 
                    name: name, 
                    email: email, 
                    course: course, 
                    year: year, 
                    phone: phone, 
                    location: location, 
                    password: pass 
                };
                localStorage.setItem('heartieRegisteredUser', JSON.stringify(newUser));

                if (successMsg) successMsg.style.display = 'block';
                setTimeout(() => {
                    signupForm.reset();
                    if (successMsg) successMsg.style.display = 'none';
                    showPage('login-page');
                }, 1500);
            }
        });
    }
});

function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }
}

function setActiveNav(element) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

function resetActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
}

function sendMessage() {
    const msg = document.getElementById('successMsg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 3000);
    }
}