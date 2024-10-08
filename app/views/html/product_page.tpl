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
    <link rel="stylesheet" href="../../static/css/product_page.css">
    <link rel="stylesheet" href="../../static/css/footer.css">
</head>
<body>
    <header class="header">
        <div class="header_container">
            <div class="header_left_container">
                <img src="../../static/img/logo.png" alt="Tune Wave Logo" id="header_logo">
                <nav class="header_nav_left">
                    <ul class="header_nav_left_list">
                        <a class="header_link" href="/home"><li class="header_nav_item">Home</li></a>
                        <a class="header_link" href="/viewProducts"><li class="header_nav_item">Store</li></a>
                        <a class="header_link" href="/contact"><li class="header_nav_item">Contact us</li></a>
                    </ul>
                </nav>
            </div>
            <div class="header_right_container">
                <div id="search_bar">
                    <i class="bi bi-search"></i>
                    <input id="search_input" type="text" placeholder="headset"/>

                </div>
                
                <!--------------ICON BAG--------------->
                <div style="{{'display: block;' if authenticated else 'display: none;'}}" class="bag_icon" id="bag_icon">
                    <i class="bi bi-bag"></i>
                </div>

                <!--------------ICON PERFIL------------->
                <a id="user_b" style="{{'display: block;' if authenticated else 'display: none;'}}" class="header_link">
                    <div class="perfil_icon" id="perfil_icon">
                        <i class="bi bi-person-circle"></i>
                    </div>
                </a>

                <!-------Painel lateral da bolsa--------->
                <div class="side_bag" id="side_bag">
                    <h2>Your Bag</h2>

                    <div id="bag_itens">
                    <!--------Itens do carrinho------->
                        <table class="bag_table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bag_product">
            
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div class="cart_total">
                        <p id="total">Total: R$ 0,00</p>
                    </div>

                    <!------------Botão Buy---------------->
                    <button id="buy_bag" class="buy_bag">Buy</button>

                    <!------------Botão Close-------------->
                    <button id="close_bag" class="close_bag">Close</button>
                </div>
                <a style="{{'display: block;' if authenticated else 'display: none;'}}" class="header_link">
                    <button class="logout_button" onclick="logout()">Log out</button>
                </a>
                
            </div>
        </div>        
    </header>
    <section id="product_info_section">
        <div id="product_info_div">
            <img src="../../static/img/{{img}}" alt="" class="product_info_image" id= "product_info_image">
            <div class="product_info_text">
                <div class="tags_div">
                    <div class="product_info_category" id= "product_info_category" >{{ category }}</div>
                    <div class="tag">{{ connect }}</div>
                </div>
                <h1 id="product_info_name">{{ name }}</h1>
                <div id="product_info_availability_div" style="background-color: {{ 'green' if availability == 'In Stock' else '#EA0000' }}">
                    <p id="product_info_availability">{{ availability }}</p>
                </div>

                <p id="product_info_id" class="product_info_id"><span class="strong">ID:</span> {{ id }}</p>

                <p id="product_info_brand" class="product_info_paragraph"><span class="strong">Brand:</span> {{ brand }}</p>

                <div id="product_info_price">
                    <div id="product_info_payment_div">
                        <span>
                            <p id="product_info_price_in_cash"> R$ {{ cash_price }}</p>
                            <p class="product_info_payment_info product_info_paragraph">
                                <span class="strong">Cash</span> with up to <span class="strong">7% OFF</span>
                            </p>
                            <p id="product_info_price_credit"> R$ {{ credit_price }}</p>
                            <p class="product_info_payment_info product_info_paragraph">
                                Up to <span class="strong">{{ parcels_qt }}x of R$ {{ parcels }}</span> interest-free on credit card
                            </p>
                        </span>
                        <button id="product_info_buy_button">
                            Add to Cart <i class="bi bi-bag button_bag"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="footer_container">
            <div class="footer_left">
                <img src="../../static/img/white_logo.png" alt="Tune Wave Logo" id="footer_logo">
                <p class="footer_description">Discover the perfect sound experience with TuneWave. Elevate your listening and feel every beat.</p>
            </div>
            <div class="footer_center">
                <h3 class="footer_title">Quick Links</h3>
                <ul class="footer_links">
                    <li><a href="/home" class="footer_link">Home</a></li>
                    <li><a href="/viewProducts" class="footer_link">Shop</a></li>
                    <li><a href="/contact" class="footer_link">Contact</a></li>
                </ul>
            </div>
            <div class="footer_right">
                <h3 class="footer_title">Connect with Us</h3>
                <div class="footer_social">
                    <a href="#" class="footer_social_icon"><i class="bi bi-facebook social_icon"></i></a>
                    <a href="#" class="footer_social_icon"><i class="bi bi-twitter social_icon"></i></a>
                    <a href="#" class="footer_social_icon"><i class="bi bi-instagram social_icon"></i></a>
                </div>
                <p class="footer_copyright">&copy; 2024 TuneWave. All Rights Reserved.</p>
            </div>
        </div>
    </footer>



    <script src="../../static/js/header.js"></script>
    <script src="../../static/js/cart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.min.js"></script>
</body>
</html>