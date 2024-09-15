document.getElementById("edit_button").onclick = function() {
    document.getElementById("edit_perfil").classList.remove('hide');
    document.getElementById("userDates").classList.add("hide")
}

document.getElementById("close_editForm").onclick = function() {
    document.getElementById("edit_perfil").classList.add("hide");
    document.getElementById("userDates").classList.remove("hide");
}

/* ------------------- "DELETE" ACTION ---------------------------------------------*/
document.getElementById("delete_button").addEventListener("click", function() {
    const userID = getCookie('userID');
    console.log(userID)
    deleteProfile(userID);
});

function deleteProfile(userID) {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {

        fetch(`/api/pagina/${userID}`, {
                method: 'DELETE'
        })
        .then(async response => {
            let data;
            if(response.status != 204) {
                data = await response.json()
            } else {
                data = {message: "Account deleted successfully"}
            }
            return {ok: response.ok, data};
        })
        .then(({ok, data}) => {
            if (ok) {
                window.location.href = '/login_page';
            } else {
                alert(`Error:  ${data.error}`)
            }
        })
        .catch(error => {
            console.error(' Erro na comunicação com o servidor.', error);
        });
    }
}

/* --------------------------------- "EDIT"-----------------------------*/
const editDatesForm = document.getElementById('editDatesForm')

editDatesForm.addEventListener("submit", async function(e) {
    console.log('Clicou no update dates.')
    e.preventDefault();
    
    const userID = getCookie('userID');
    const formData = new FormData(this);
    const formUsername = formData.get('username')
    //========================================================================================
    const formCpf = formData.get('cpf')
    const formTelefone = formData.get('telefone')
    //========================================================================================
    const formPassword = formData.get('password')
    const formConfirPassword = formData.get('confirm_password')
//=========================================================================================================================
    const formIsValid = await checkInputs(formUsername, formCpf, formTelefone, formPassword, formConfirPassword);
//==========================================================================================================================
    
    if(!formIsValid) {
        console.log('Formulario inválido.')
        return
    }

    
    fetch(`/api/pagina/${userID}`, {
        method: 'PATCH',
        body: formData
    })
    .then(async response => {
        const data = await response.json();
        return ({ok: response.ok, data});
    })
    .then(({ok, data}) => {
        if (ok) {
            document.getElementById("display-firstname").innerText = formData.get('firstname');
            document.getElementById("display-lastname").innerText = formData.get('lastname');
            document.getElementById("display-username").innerText = formData.get('username');
//======================================================CPF e telefone============================================================
            document.getElementById("display-cpf").innerText = formData.get('cpf');
            document.getElementById("display-telefone").innerText = formData.get('telefone');
//================================================================================================================================
            document.getElementById("display-email").innerText = formData.get('email');
            document.getElementById("display-address").innerText = formData.get('address');
            document.getElementById("display-password").innerText = formData.get('password');

        } else {
            alert(`Erro: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Error: ', error);
        alert('Erro na comunicação com o servidor.')
    });


});




/* --------------------------------- -----------------------------*/
function getCookie(name) {
    const value = `; ${document.cookie}`; 
    const parts = value.split(`; ${name}=`); 
    if (parts.length === 2) return parts.pop().split(';').shift();
} 


function checkInputs(formUsername, formCpf, formTelefone, formPassword, formConfirPassword) {
    let formIsValid = true;

    const usernameC = getCookie('username');


    //Verifica se as senhas tem no minimo 8 caracters
    if (formPassword.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres!');
        formIsValid = false;
    }
            
    //Verifica se as senhas são iguais
    if (formPassword !== formConfirPassword) {
        alert('As senhas não são iguais!')
        formIsValid = false;
    }

    //=========================================================CPF e telefone=========================================================

    // Verificação de CPF
    const cpfCleaned = formCpf.replace(/[^\d]+/g, '');
    if (cpfCleaned.length !== 11 || /^(\d)\1+$/.test(cpfCleaned)) {
        alert('CPF inválido!');
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
            alert('CPF inválido!')
            formIsValid = false;
        }
    }

     // Verificação de telefone
     const telefoneCleaned = formTelefone.replace(/[^\d]+/g, '');
     if (telefoneCleaned.length !== 10 && telefoneCleaned.length !== 11) {
        alert('Telefone inválido!')
         formIsValid = false;
     }

     //===========================================================================================================================

    //Carrega o arquivo json e verifica se o username já existe
    return fetch('/db/user_accounts.json')
        .then(response => response.json())
        .then(data => {
            //Verifica se já existe um username no json
            const userExists = data.some(user => user.username === formUsername);

            if (formUsername !== usernameC) {

                if (userExists) {
                    alert('O nome de usuário já existe!')
                    formIsValid = false;
                }
            }
            if(formIsValid) {
                document.getElementById('edit_perfil').classList.add('hide');
                document.getElementById("userDates").classList.remove("hide");
            }

            return formIsValid;
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            formIsValid = false;
        });

}


async function loadUserOrders() {
    const userId = getCookie('userID');
    console.log(userId)

    if (userId) {
        try {
            const response = await fetch(`/orders/${userId}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const orders = await response.json();
            const ordersList = document.getElementById('ordersList');
            
            if (orders.length === 0) {
                ordersList.innerHTML = '<p>You don\'t have any orders.</p>';
            } else {
                ordersList.innerHTML = orders.map(order => `
                    <div class="order">
                        <p><strong>ID do Pedido:</strong> ${order.id}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <p><strong>Total:</strong> ${order.total}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                        ${order.productsList.map(product => `
                            <div class="product">
                                <img src="../../static/img/${product.imageFileName}" alt="${product.name}">
                                <div class="product-info">
                                    <h3>${product.name}</h3>
                                    <p><strong>Preço:</strong> $${product.price.toFixed(2)}</p>
                                    <p><strong>Quantidade:</strong> ${product.quantity}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            document.getElementById('ordersList').innerHTML = '<p>Some error ocurred...</p>';
        }
    }
}
