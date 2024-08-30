document.getElementById('register').addEventListener('submit', function(event) {
    var password = document.getElementById('password');
    var confirm_password = document.getElementById('confirm_password');

    //Verifica se as senhas são iguais
    if (password.value != confirm_password.value) {
        //Mensagem personalizada
        confirm_password.setCustomValidity('As senhas não são iguais.');

        //Impede o envio do formulario
        event.preventDefault()
    } else {
        //Limpa a msg se as senhas forem iguais.
        confirm_password.setCustomValidity('');
    }
});