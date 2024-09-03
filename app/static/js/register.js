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

    checkInputs().then((isValid) => {
        if (isValid) {
            form.submit();
        }
    });
});

function checkInputs() {
    let formIsValid = true;

    const usernameValue = username.value.trim()
    const passwordValue = password.value.trim()
    const confirm_passwordValue = confirm_password.value.trim()

    //Verifica se as senhas tem no minimo 8 caracters
    if (passwordValue.length < 8) {
        setErrorFor(password, 'A senha deve ter pelo menos 8 caracteres!');
        formIsValid = false;
    } else {
        setSuccessFor(password)
    }
            
    //Verifica se as senhas são iguais
    if (passwordValue !== confirm_passwordValue) {
        setErrorFor(confirm_password, 'As senhas não são iguais!');
        formIsValid = false;
    } else {
        setSuccessFor(confirm_password);
    }

    //Carrega o arquivo json e verifica se o username já existe
    return fetch('/db/user_accounts.json')
        .then(response => response.json())
        .then(data => {
            //Verifica se já existe um username no json
            const userExists = data.some(user => user.username === usernameValue);

            if (userExists) {
                setErrorFor(username, 'O nome de usuário já existe!')
                formIsValid = false;
            } else {
                setSuccessFor(username);
            }
            return formIsValid;
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            formIsValid = false;
        });

}
   

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form_control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_control success'
}