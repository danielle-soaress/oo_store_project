document.addEventListener('DOMContentLoaded', () => {
    loadCart()
});


let currentStep = 1;

// 'previous step' and 'next step' buttons adjustments and layout changes

const steps = document.querySelectorAll('.step .circle');
const lines = document.querySelectorAll('.line');
const sections = document.querySelectorAll('.step_layout')
const nextStepButtons = document.querySelectorAll('.nextStep')
const previousStepButton = document.getElementById('previousStep')

nextStepButtons.forEach(button => {
    button.addEventListener('click', () => nextStep())
})

previousStepButton.addEventListener('click', () => previousStep())

function nextStep() {
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
        
        if (currentStep > 0) {
            lines[currentStep - 1].classList.add('active');
        }

        currentStep++;

        // step three payment simulation


        // to show the 'previous step' button on the steps > 1
        if (currentStep == 2) {
            previousStepButton.classList.remove('hide')
        } else {
            previousStepButton.classList.add('hide')
        }
        // to change the page layout to the next stage of payment process
        sections.forEach(layout => {
            layout.classList.add('hide')
        })

        // to show the correct layout
        sections[currentStep - 1].classList.remove('hide')
    }
}

function previousStep() {
    if (currentStep > 1 && currentStep <=steps.length) {
        currentStep--;
        steps[currentStep].classList.remove('active');
        lines[currentStep - 1].classList.remove('active');

        // to change the page layout to the next stage of payment process
        sections.forEach(layout => {
            layout.classList.add('hide')
        })
        sections[currentStep-1].classList.remove('hide')

        // to remove the previousStepButton from step 1
        if (currentStep == 1) {
            previousStepButton.classList.add('hide')
        }
    }
}

/* ----------- PAYMENT CHANGE: CASH OR CARD ----------------------*/
const cardOption = document.getElementById('card-option');
const cashOption = document.getElementById('cash-option');
const creditCardInfo = document.getElementById('credit-card-info');

cardOption.addEventListener('change', function() {
    creditCardInfo.style.display = 'block';
});

cashOption.addEventListener('change', function() {
    creditCardInfo.style.display = 'none';
});


/* ---- CONCLUSION STEP ------------------*/

function showOrderResult(success) {
    const orderResult = document.getElementById('orderResult');
    const resultMessage = document.getElementById('resultMessage');
    
    orderResult.classList.remove('hide', 'success', 'error');
    
    if (success) {
        orderResult.classList.add('success');
        resultMessage.innerHTML = "Order completed successfully! <br>Thank you for your purchase.";
    } else {
        orderResult.classList.add('error');
        resultMessage.innerHTML = "An error occurred while processing the order. Please try again.";
    }
}

function retryOrder() {
    document.getElementById('orderResult').classList.add('hide');
    // Aqui você pode implementar o reset ou tentar a finalização do pedido novamente
}


/* ------- load cart products ----------------*/

const productsContainer = document.querySelector("#cart_products_container"); 
let cart = []

function getCookie(name) {
    const value = `; ${document.cookie}`; 
    console.log('value = ' + value)
    const parts = value.split(`; ${name}=`); 
    console.log('parts =' + parts)
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    } else {
        return null; 
    }
} 

function loadCart() {
    const userID = getCookie('userID');

    fetch(`/get-cart?userID=${encodeURIComponent(userID)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                cart = data.cart;
                displayCart();
            } else {
                console.error('Erro ao carregar o carrinho:', data.message);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function displayCart() {
    productsContainer.innerHTML = '';

    if (!Array.isArray(cart)) {
        console.error('Cart is not an array');
        return;
    }

    cart.forEach((product,index)=> {

        let newCartProduct = document.createElement("div"); 
        newCartProduct.classList.add("product_card"); 

        const spanImageText = document.createElement('span');
        spanImageText.classList.add('span_image_text')

        const productImage = document.createElement('img');
        productImage.classList.add('product_card_image');
        console.log(productImage)
        productImage.src = `../../static/img/${product.productImg}`;
        productImage.alt = product.productName;

        const productName = document.createElement('h3');
        productName.classList.add('product_card_name');
        productName.textContent = product.productName;

        const cashPrice = document.createElement('p');
        cashPrice.classList.add('product_card_prices_text', 'section_text');
        cashPrice.innerHTML = `Cash payment: R$ ${product.productPrice}<span class="strong section_text"></span>`;

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('product_card_prices_text', 'section_text');
        cardPrice.innerHTML = `Credit card payment: R$ ${product.cardPrice}<span class="strong section_text"></span>`;

        const productPrices = document.createElement('h3');
        productPrices.classList.add('product_card_prices');
        productPrices.appendChild(cashPrice);
        productPrices.appendChild(cardPrice);

        const sectionText = document.createElement('div');
        sectionText.classList.add('section_text');
        sectionText.appendChild(productName);
        sectionText.appendChild(productPrices);

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('product_card_qt_div');

        const quantityLabel = document.createElement('p');
        quantityLabel.classList.add('section_text');
        quantityLabel.textContent = 'Quantity';

        const leftArrow = document.createElement('i');
        leftArrow.classList.add('bi', 'bi-caret-left-fill', 'arrow');

        const rightArrow = document.createElement('i');
        rightArrow.classList.add('bi', 'bi-caret-right-fill', 'arrow');

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.required = true;
        quantityInput.value = product.quantity;
        quantityInput.classList.add('product_card_qt_input');

        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('product_card_qt');
        quantityContainer.appendChild(leftArrow);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(rightArrow);

        quantityDiv.appendChild(quantityLabel);
        quantityDiv.appendChild(quantityContainer);

        const removeButton = document.createElement('div');
        removeButton.classList.add('product_card_remove_div');

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('bi', 'bi-trash-fill');

        const removeText = document.createElement('p');
        removeText.classList.add('remove_button_text');
        removeText.textContent = 'Remove';

        removeButton.appendChild(trashIcon);
        removeButton.appendChild(removeText);

        spanImageText.appendChild(productImage);
        spanImageText.appendChild(sectionText);
        newCartProduct.appendChild(spanImageText);
        newCartProduct.appendChild(quantityDiv);
        newCartProduct.appendChild(removeButton);

        productsContainer.append(newCartProduct); 

        rightArrow.addEventListener('click', () => {
            product.quantity += 1;
            quantityInput.value = product.quantity;
            updateCartOnServer();
        });

        leftArrow.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity -= 1;
                quantityInput.value = product.quantity;
                updateCartOnServer(); 
            }
        });

        quantityInput.addEventListener('change', () => {
            const newQuantity = parseInt(quantityInput.value);
            if (newQuantity > 0) {
                product.quantity = newQuantity;
                updateCartOnServer(); 
            } else {
                quantityInput.value = product.quantity; 
            }
        });

        // Lógica para remover o produto e atualizar o cart
        removeButton.addEventListener('click', () => {
            newCartProduct.remove();
            console.log(cart)
            cart.splice(index, 1); 
            console.log(cart)
            updateCartOnServer();
        });
    })    
} 

function validateCart(cart) {
    return cart.every(product => product.productId && product.quantity);
}

function updateCartOnServer() {
    const userID = getCookie('userID'); 
    console.log(userID) 

    if (!userID) {
        console.error('Usuário não autenticado.');
        return;
    }

    const cartProducts = cart.map(product => {
        return {
            productId: product.productId,
            quantity: product.quantity
        };
    });

    console.log(cartProducts)
    if (validateCart(cartProducts)) {
        fetch('/save-cart', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                userID: userID, 
                cart: cartProducts // Sacola com o ID e a quantidade dos produtos 
            }) 
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok');
            }
            return data;
        })
        .then(result => { 
            if (result.status === 'success') { 
                console.log('Cart saved successfully!'); 
            } else { 
                console.error('Error:', result.message); 
            } 
        })
        .catch(error => { 
            console.error('Request failed:', error); 
        });

    } else {
        console.error('Carrinho contém produtos inválidos:', cartProducts);
    }
}


/* ----- remove all products button*/

document.getElementById('remove_all').addEventListener('click', () => {
    cart = []
    displayCart()
    updateCartOnServer()
})

/* ---- carregar formulário -----*/

function paymentSimulation() {
    console.log('pay pay')
    nextStep()
    
    setTimeout(() => {
        nextStep()
    }, 4000)

    showOrderResult(true)

}

document.addEventListener('DOMContentLoaded', function() {
    const cashOption = document.getElementById('cash-option');
    const cardOption = document.getElementById('card-option');
    const cardInfo = document.getElementById('credit-card-info');
    const cardInputs = cardInfo.querySelectorAll('input');
    const paymentForm = document.getElementById('payment-form')

    // Mostra ou esconde os campos de cartão de crédito
    cardOption.addEventListener('change', function() {
        if (cardOption.checked) {
            cardInfo.style.display = 'block';
            cardInputs.forEach(input => input.required = true); // Adiciona 'required'
        }
    });

    cashOption.addEventListener('change', function() {
        if (cashOption.checked) {
            cardInfo.style.display = 'none';
            cardInputs.forEach(input => input.required = false); // Remove 'required'
        }
    });

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão

        // Verifica se o formulário está válido
        if (paymentForm.checkValidity()) {
            paymentSimulation()
        } else {
            console.log('Form incomplete')
        }
    });
});