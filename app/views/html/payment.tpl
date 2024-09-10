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
                        <a class="header_link" href=""><li class="header_nav_item">Home</li></a>
                        <a class="header_link" href=""><li class="header_nav_item">Loja</li></a>
                        <a class="header_link" href=""><li class="header_nav_item">Contato</li></a>
                    </ul>
                </nav>
            </div>
            <div class="header_right_container">
                <div id="search_bar">
                    <i class="bi bi-search"></i>
                    <input id="search_input" type="text" placeholder="headset gaming"/>
                    <i class="bi bi-caret-right-fill search_arrow"></i>
                </div>
                <!--------------ICON PERFIL------------->
                <div class="perfil_icon" id="perfil_icon">
                    <i class="bi bi-person-circle"></i>
                </div>

                <!--------------ICON BAG--------------->
                <div class="bag_icon" id="bag_icon">
                    <i class="bi bi-bag"></i>
                </div>

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
                <i class="bi bi-moon-fill"></i>
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
                    <div class="product_card">
                        <img class="product_card_image"src="" alt="">
                        <div class="section_text">
                            <h3 class="product_card_name"></h3>
                            <h3 class="product_card_prices">
                                <p class="product_card_prices_text section_text">Cash payment: <span class="strong section_text"></span></p>
                                <p class="product_card_prices_text section_text">Installments in x interest-free installments: <span class="strong section_text"></span></p>
                            </h3>
                        </div>
                        <div class="product_card_qt_div">
                            <p class="section_text">Quantity</p>
                            <div class="product_card_qt">
                                <i class="bi bi-caret-left-fill arrow"></i>
                                <input required type="number" class="product_card_qt_input"/>
                                <i class="bi bi-caret-right-fill arrow"></i>
                            </div>
                        </div>
                        <div class="product_card_remove_div">
                            <i class="bi bi-trash-fill "></i>
                            <p class="remove_button_text">Remove</p>
                        </div>
                    </div>
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
                <p class="section_text" id="purcahse_total"><span class="strong">Total Products Value: R$ {{ totalCash[0] }}</span></p>
                <hr>
                <p class="section_text"><span class="strong">Freight: R$ {{ freight }} </span></p>
                <hr>
                <p class="section_text"><span class="strong">Coupon Discounts: R$ 0.00 </span></p>
                <hr>
                <p class="section_text" id="final_order_value"><span class="strong">Final Order Value: R$ {{ totalCash[1] }} </span></p>
                <div class="total_div total_div_installments">
                    <p class="total_div_text">Total in Installments: </p>
                    <div  class="total_div_subdiv">
                        <p id="total_in_installments">{{ totalCreditCard[1] }}</p>
                        <p class="total_div_text">
                            Up to <span class="total_div_text" id="installments_total">12x</span> 
                            interest-free installments 
                        </p>
                    </div>
                </div>
                <div class="total_div total_div_cash">
                    <p class="total_div_text">Total in Cash: </p>
                    <div class="total_div_subdiv">
                        <p id="total_in_cash"> {{ totalCash[1] }}</p>
                        <p class="total_div_text">4% discount</p>
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
                        <p class="identify_step_text strong">Full Name: </p>
                        <p class="identify_setp_text" id="identify_info_name"></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text strong">CPF: </p>
                        <p class="identify_setp_text" id="identify_info_name"></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text strong">Phone Number: </p>
                        <p class="identify_setp_text" id="identify_info_cel"></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text strong">Email: </p>
                        <p class="identify_setp_text" id="identify_info_cel"></p>
                    </div>
                    <div class="info_group">
                        <p class="identify_step_text strong">Adress: </p>
                        <p class="identify_setp_text" id="identify_info_cel"></p>
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
                    <p class="total_div_text strong">Total in Installments: </p>
                    <div  class="total_div_subdiv">
                        <p id="total_in_installments">4234</p>
                        <p class="total_div_text">
                            Up to <span class="total_div_text" id="installments_total">423</span> 
                            interest-free installments 
                        </p>
                    </div>
                </div>
                <div class="total_div total_div_cash">
                    <p class="total_div_text strong">Total in Cash: </p>
                    <div class="total_div_subdiv">
                        <p id="total_in_cash">423</p>
                        <p class="total_div_text">7% discount</p>
                    </div>
                </div>
                <h2 class="subtitle_text">Escolha sua forma de pagamento</h2>
                <form class="payment-form">
                    <div class="payment-options">
                        <label>
                            <input type="radio" name="paymentMethod" value="cash" id="cash-option" required checked> Dinheiro
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="credit-card" id="card-option"> Cartão de Crédito
                        </label>
                    </div>
                    <div class="credit-card-info" id="credit-card-info" style="display: none;">
                        <div class="form-group">
                            <label for="card-number">Número do Cartão</label>
                            <input type="text" id="card-number" name="cardNumber" placeholder="Digite o número do cartão" required>
                        </div>
                        <div class="form-group">
                            <label for="card-name">Nome no Cartão</label>
                            <input type="text" id="card-name" name="cardName" placeholder="Digite o nome como no cartão" required>
                        </div>
                        <div class="form-group">
                            <label for="card-expiry">Data de Validade</label>
                            <input type="text" id="card-expiry" name="cardExpiry" placeholder="MM/AA" required>
                        </div>
                        <div class="form-group">
                            <label for="card-cvc">CVC</label>
                            <input type="text" id="card-cvc" name="cardCVC" placeholder="Código de segurança" required>
                        </div>
                    </div>
                    <div id="total_payment_info">
                        <p class="subtitle_text" class="section_text strong">Total:</p>
                        <p id="total_payment" class="section_text strong">4234</p>
                    </div>
                    <button type="submit" class="generic_button nextStep">Confirmar Pagamento</button>
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
    <script src="../../static/js/payment.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.min.js"></script>
</body>
</html>