const form = document.getElementById('register');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
//======================================================================================================================
const cpf = document.getElementById('cpf');
const telefone = document.getElementById('telefone');
//=======================================================================================================================
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
    //===================================================================================================================
    const cpfValue = cpf.value.trim();
    const telefoneValue = telefone.value.trim();
    //===================================================================================================================
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

    //==================================================================================================================

    // Verificação de CPF
    const cpfCleaned = cpfValue.replace(/[^\d]+/g, '');
    if (cpfCleaned.length !== 11 || /^(\d)\1+$/.test(cpfCleaned)) {
        setErrorFor(cpf, 'CPF inválido!');
        formIsValid = false;
    } else {
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpfCleaned.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto > 9 ? 0 : resto;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpfCleaned.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto > 9 ? 0 : resto;

        if (digito1 != cpfCleaned.charAt(9) || digito2 != cpfCleaned.charAt(10)) {
            setErrorFor(cpf, 'CPF inválido!');
            formIsValid = false;
        } else {
            setSuccessFor(cpf);
        }
    }

     // Verificação de telefone
     const telefoneCleaned = telefoneValue.replace(/[^\d]+/g, '');
     if (telefoneCleaned.length !== 10 && telefoneCleaned.length !== 11) {
         setErrorFor(telefone, 'Telefone inválido!');
         formIsValid = false;
     } else {
         setSuccessFor(telefone);
     }

     //==================================================================================================================
 

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