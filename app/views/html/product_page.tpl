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
</head>
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
                    <i class="bi bi-caret-right-fill"></i>
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
    <section id="product_info_section">
        <div id="product_info_div">
            <img src="../../static/img/6a75e89f-89db-4c71-b465-5aa139dce1f5_61kd0kZDgcL._AC_SX679_.jpg" alt="" class="product_info_image">
            <div class="product_info_text">
                <div class="tags_div">
                    <div class="tag">{{ category }}</div>
                    <div class="tag">{{ connect }}</div>
                </div>
                <h1 id="product_info_name">{{ name }}</h1>
                <div id="product_info_availability_div" style="background-color: {{ 'green' if availability == 'In Stock' else '#EA0000' }}">
                    <p id="product_info_availability">{{ availability }}</p>
                </div>
                <p id="product_info_brand" class="product_info_paragraph"><span class="strong">Brand:</span> {{ brand }}</p>
                <div class="product_info_colors">
                    <p class="product_info_colors_title product_info_paragraph">Available colors:</p>
                    <div id="product_info_colors_container" data-colors="{{ colors }}">
                        
                    </div>
                </div>
                <div id="product_info_price">
                    <div id="product_info_payment_div">
                        <span>
                            <p id="product_info_price_in_cash">{{ cash_price }}</p>
                            <p class="product_info_payment_info product_info_paragraph">
                                <span class="strong">Cash</span> with up to <span class="strong">7% OFF</span>
                            </p>
                            <p id="product_info_price_credit">{{ credit_price }}</p>
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
    <script>
        const colorContainer = document.querySelector('#product_info_colors_container');
        const colors = JSON.parse(colorContainer.getAttribute('data-colors'));
        console.log(colors);
        colors.forEach(color => {
            const div = document.createElement('div');
            div.className = 'product_info_color';
            div.style.backgroundColor = color;
            colorContainer.appendChild(div);
        });
    </script>


    
    <script src="../../static/js/page_buy.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.min.js"></script>
</body>
</html>