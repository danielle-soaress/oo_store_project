<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="../../static/css/header.css">
    <link rel="stylesheet" href="../../static/css/loader.css">
    <link rel="stylesheet" href="../../static/css/payment.css">

<body>
    <header class="header">
        <div class="header_container">
            <div class="header_left_container">
                <img src="../../static/img/logo.png" alt="Tune Wave Logo" id="header_logo">
                <nav class="header_nav_left">
                    <ul class="header_nav_left_list">
                        <a class="header_link" href="/home"><li class="header_nav_item">Home</li></a>
                        <a class="header_link" href="/viewProducts"><li class="header_nav_item">Loja</li></a>
                        <a class="header_link" href="/contact"><li class="header_nav_item">Contato</li></a>
                    </ul>
                </nav>
            </div>
            <div class="header_right_container">
                <div id="search_bar">
                    <i class="bi bi-search"></i>
                    <input id="search_input" type="text" placeholder="headset"/>
                    <i class="bi bi-caret-right-fill search_arrow"></i>
                </div>
                <!--------------ICON PERFIL------------->
                <a id="user_b" class="header_link">
                    <div class="perfil_icon" id="perfil_icon">
                        <i class="bi bi-person-circle"></i>
                    </div>
                </a>

                <!-------Painel lateral da bolsa--------->
                <div class="side_bag" id="side_bag">
                    <h2>Your Bag</h2>

                    <div id="bag_itens">
                        <!--------Itens do carrinho------->
                    </div>

                    <!------------Botão Buy---------------->
                    <button id="buy_bag" class="buy_bag">Buy</button>

                    <!------------Botão Close-------------->
                    <button id="close_bag" class="close_bag">Close</button>
                </div> 

                <a class="header_link">
                    <button class="logout_button" id="logout_b">Log out</button>
                </a>
            </div>
        </div>        
    </header>
    <section id="payment_progress">
        <button id="previousStep" class="hide">Return</button>
        <div class="checkout_steps">
            <div class="step">
                <div class="circle active">1</div>
                <p>Cart</p>
            </div>
            <div class="line"></div>
            <div class="step">
                <div class="circle">2</div>
                <p>Payment</p>
            </div>
            <div class="line"></div>
            <div class="step">
                <div class="circle">3</div>
                <p>Confirmation</p>
            </div>
            <div class="line"></div>
            <div class="step">
                <div class="circle">4</div>
                <p>Conclusion</p>
            </div>
        </div>
    </section>
    <section id="purchase_step" class="step_layout step_1">
        <div id="left_purchase_section">
            <div class="subsection" id=" cart_products">
                <div id="cart_products_title">
                    <span class="section_title_span">
                        <i class="bi bi-bag title_icon"></i><h2 class="section_title">Your Cart</h2>
                    </span>
                    <div class="cart_products_remove_all">
                        <i class="bi bi-trash-fill"></i>
                        <p id="remove_all" class="remove_button_text">Remove All Products</p>
                    </div>
                </div>
                <div id="cart_products_container">
                </div>
            </div>
        </div>
        <div id="right_purchase_section">
            <div  class="subsection" id="cupom_area_div">
                <span class="section_title_span">
                    <i class="bi bi-ticket-detailed title_icon"></i>
                    <h3 class="section_title">Coupon</h3>
                </span>
                <div class="cupom_div">
                    <input type="text" id="coupon_input"/>
                    <button class="generic_button"id="coupon_button">Apply</button>
                </div>
            </div>
            <div  class="subsection" id="purchase_summary">
                <span class="section_title_span">
                    <i class="bi bi-journal-text title_icon"></i>
                    <h3 class="section_title">Purchase Summary</h3>
                </span>
                <hr>
                <p class="section_text" id="purcahse_total"><span class="strong">Total Products Value:</span> R$ {{ totalCash[0] }}</p>
                <hr>
                <p class="section_text"><span class="strong">Freight:</span> R$ {{ freight }}</p>
                <hr>
                <p class="section_text"><span class="strong">Coupon Discounts:</span> R$ 0.00</p>
                <hr>
                <p class="section_text" id="final_order_value"><span class="strong">Final Order Value:</span> R$ {{ totalCash[1] }}</p>
                <div class="total_div total_div_installments">
                    <p class="total_div_text">Total in Installments: </p>
                    <div  class="total_div_subdiv">
                        <p id="total_in_installments" class="strong">R$ {{ totalCreditCard[1] }}</p>
                        <p class="total_div_text detailment">
                            Up to <span class="total_div_text strong detailment" id="installments_total">12x</span> 
                            interest-free installments 
                        </p>
                    </div>
                </div>
                <div class="total_div total_div_cash">
                    <p class="total_div_text">Total in Cash: </p>
                    <div class="total_div_subdiv">
                        <p id="total_in_cash" class="strong">R$ {{ totalCash[1] }}</p>
                        <p class="total_div_text detailment">4% discount</p>
                    </div>
                </div>
            </div>
            <button class="nextStep">Go to Payment</button>
        </div>
    </section>
    <section id="identify_step" class="step_layout step_2 hide">
        <div class="left_identify_section">
            <div class="identify_main_div subsection">
                <span class="section_title_span">
                    <i class="bi bi-file-person-fill title_icon"></i>
                    <h2 class="section_title">Personal Information</h2>
                </span>
                <div class="identification-info">
                    <div class="info_group">
                        <p class="identify_step_text"><span class="strong" id="identify_info_name">Full Name:</span> {{ firstname }} {{ lastname }}</p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text"><span class="strong" id="identify_info_cpf">CPF: </span></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text"><span class="strong" id="identify_info_phone">Phone Number:</span></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text"><span class="strong" id="identify_info_email">Email: </span>{{ email }}</p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text"><span class="strong" id="identify_info_adress">Adress: </span>{{ address }}</p>
                    </div>
                </div>
                <button class="generic_button" id="edit_information">Edit Information</button>
            </div>
        </div>
        <div class="right_identify_section subsection">
            <span class="section_title_span">
                <i class="bi bi-wallet2 title_icon"></i>
                <h2 class="section_title">Payment Details</h2>
            </span>
            <div class="payment-section">
                <div class="total_div total_div_installments">
                    <p class="total_div_text">Total in Installments: </p>
                    <div  class="total_div_subdiv">
                        <p id="total_in_installments" class="strong">R$ {{ totalCreditCard[1] }}</p>
                        <p class="total_div_text detailment">
                            Up to <span class="total_div_text strong detailment" id="installments_total">12x</span> 
                            interest-free installments 
                        </p>
                    </div>
                </div>
                <div class="total_div total_div_cash">
                    <p class="total_div_text">Total in Cash: </p>
                    <div class="total_div_subdiv">
                        <p id="total_in_cash" class="strong">R$ {{ totalCash[1] }}</p>
                        <p class="total_div_text detailment">4% discount</p>
                    </div>
                </div>
                <h2 class="subtitle_text">Choose your payment method</h2>
                <form id="payment-form">
                    <div class="payment-options">
                        <label>
                            <input type="radio" name="paymentMethod" value="cash" id="cash-option" required checked> Cash
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="credit-card" id="card-option"> Credit Card
                        </label>
                    </div>
                    <div class="credit-card-info" id="credit-card-info" style="display: none;">
                        <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" name="cardNumber" placeholder="Enter your card number">
                        </div>
                        <div class="form-group">
                            <label for="card-name">Name on Card</label>
                            <input type="text" id="card-name" name="cardName" placeholder="Enter the name as on the card">
                        </div>
                        <div class="form-group">
                            <label for="card-expiry">Expiration Date</label>
                            <input type="text" id="card-expiry" name="cardExpiry" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label for="card-cvc">CVC</label>
                            <input type="text" id="card-cvc" name="cardCVC" placeholder="Security code">
                        </div>
                    </div>
                    <div id="total_payment_info">
                        <p class="subtitle_text" class="section_text strong">Total:</p>
                        <p id="total_payment" class="section_text strong">4234</p>
                    </div>
                    <button type="submit" class="generic_button ">Pay</button>
                </form>

            </div>
        </div>
    </section>
    <section id="payment_step" class="step_layout step_3 hide">
        <p class="strong section_text">Wait for the order payment processing...</p>
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
    <section id="conclusion_step" class="step_layout step_4 hide">
        <div id="orderResult" class="hide">
            <div id="resultMessage"></div>
            <button class="retryButton hide" onclick="retryOrder()">Tentar novamente</button>
        </div>
    </section>
    <script src="../../static/js/header.js"></script>
    <script src="../../static/js/payment.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.min.js"></script>
</body>
</html>