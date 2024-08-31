const form = document.getElementById('register');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');

form.addEventListener('submit', (e) => {
    //Prevenir o comportamento padrão do html
    e.preventDefault();

    checkInputs();

})


function checkInputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const confirm_passwordValue = confirm_password.value.trim();

    //Carrega o arquivo JSON e verifica se o username já existe
    fetch('/db/user_accounts.json')
        .then(response => response.json())
        .then(data => {
            //Verifica se já existe um username no JSON
            const userExists = data.some(user => user.username === usernameValue);

            if (userExists) {
                setErrorFor(username, 'O nome de usuário já existe!');
            }else {
                setSuccessFor(username);
            }

        })
        .catch(error => console.error('Ero ao carregar o arquivo JSON:', error));

    validatePassword(password, passwordValue, confirm_password, confirm_passwordValue);
}

function validatePassword(passwordInput, passwordValue, confirmPasswordInput, confirmPasswordValue) {
    if (passwordValue === '') {
        setErrorFor(passwordInput, 'Password cannot be empty');
    } else if (passwordValue.length < 6) {
        setErrorFor(passwordInput, 'Password must be at least 6 characters');
    } else {
        setSuccessFor(passwordInput);
    }

    if (confirmPasswordValue === '') {
        setErrorFor(confirmPasswordInput, 'Password confirmation cannot be empty');
    } else if (passwordValue !== confirmPasswordValue) {
        setErrorFor(confirmPasswordInput, 'Passwords do not match');
    } else {
        setSuccessFor(confirmPasswordInput);

    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = 'form_control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = ''; // Limpa a mensagem de erro, se houver
    formControl.className = 'form_control success';
}
