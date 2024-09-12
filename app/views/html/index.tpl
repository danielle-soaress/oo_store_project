<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link  rel="stylesheet" href="../../static/css/index.css">
    <link  rel="stylesheet" href="../../static/css/header.css">
    <link  rel="stylesheet" href="../../static/css/footer.css">
    <title>Tune Wave - Home</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
</head>
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
                <a style="{{'display: none;' if authenticated else 'display: block;'}}" class="header_link">
                    <button class="login_button" onclick="redirectToLogin()">Sign In</button>
                </a>
                <a style="{{'display: none;' if authenticated else 'display: block;'}}" class="header_link">
                    <button class="register_button" onclick="redirectToRegister()">Sign Up</button>
                </a>
                <a style="{{'display: block;' if authenticated else 'display: none;'}}" class="header_link">
                    <div class="perfil_icon" id="perfil_icon">
                        <i class="bi bi-person-circle"></i>
                    </div>
                </a>
                <a style="{{'display: block;' if authenticated else 'display: none;'}}" class="header_link">
                    <button class="logout_button" onclick="logout()">Log out</button>
                </a>
            </div>
        </div>
    </header>
    <section class="main_image_section">
        <div class="main_image_container">
            <div class="main_image_left">
                <h2 class="main_image_t1">HEAR EVERY DETAIL</h2>
                <h2 class="main_image_t2">FEEL THE BEAT</h2>
                <div class="main_image_text">
                    <p class="main_image_p1">It's time to feel the <span class="p1_span">difference</span>.</p>
                    <p class="main_image_p2">The perfect sound exists.<br>but you haven't found it yet.</p>
                    <button class="main_image_button" onclick="window.location.href = '/viewProducts';">Search now</button>
                </div>
            </div>
            <div class="main_image_div">
                <img id='main_image' src="../../static/img/be407fad48c9ccafcd87007eb6645d61 1.png" alt="">
            </div>
        </div>
    </section>
    <section class="cards_section">
        <div class="cards_container">
            <div class="card card_purple">
                <div class="card_left_container">
                    <h3 class="purple_card_t1">EAR<br>BUDS</h3>
                    <p class="purple_card_p1">Small and discreet.<br>Perfect for anytime.</p>
                    <button class="purple_card_button">See More</button>
                </div>
                <img class="card_image earpods" src="../../static/img/earbuds_home.png" alt="">
            </div>
            <div class="card card_black">
                <div class="card_left_container black_card_texts">
                    <h3 class="black_card_t1">WIRED</h3>
                    <h3 class="black_card_t2">WIRED</h3>
                    <p class="black_card_p1">Pure Connection.<br>Clear Sound.</p>
                    <button class="black_card_button">See More</button>
                </div>
                <img class="card_image wired_hp" src="../../static/img/wired_headphone_home.png" alt="">
            </div>
            <div class="card card_purple card_hp">
                <div class="card_left_container">
                    <h3 class="purple_card_t1">HEAD<br>PHONE</h3>
                    <p class="purple_card_p1">Pure comfort.<br>Hear with Precision.</p>
                    <button class="purple_card_button">See More</button>
                </div>
                <img class="card_image headphone" src="../../static/img/hp.png"">
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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.min.js"></script>
    <script>
        function redirectToLogin() {
            window.location.href = '/login_page';
        }
    </script>
    <script>
        function redirectToRegister() {
            window.location.href = '/register';
        }
    </script>
    <script>
        function redirectToHome() {
            window.location.href = '/home'
        }
    </script>
    <script>
        function redirectToLoja() {
            window.location.href = '/viewProducts'
        }
    </script>
</body>
</html>