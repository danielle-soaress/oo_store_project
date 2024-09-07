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

        // to show the 'previous step' button on the steps > 1
        previousStepButton.classList.remove('hide')

        // step three payment simulation
        paymentSimulation()


        // to change the page layout to the next stage of payment process
        sections.forEach(layout => {
            layout.classList.add('hide')
        })

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


/* ------------- PAYMENT SIMULATION ----------------------------*/


function paymentSimulation() {
    setTimeout(() => {
        nextStep();
    }, 4000)

    showOrderResult(true)
}


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




