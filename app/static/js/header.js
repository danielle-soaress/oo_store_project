
const registerButton = document.getElementById('register_b');
if (registerButton) {
    registerButton.addEventListener('click', () => {
        window.location.href = '/register';
    });
}

const loginButton = document.getElementById('login_b');
if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = '/login_page';
    });
}

const logoutButton = document.getElementById('logout_b');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        console.log('clicouu!!');
        fetch('/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/home';
            } else {
                alert('Logout failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            alert('An error occurred. Please try again.');
        });
    });
}
