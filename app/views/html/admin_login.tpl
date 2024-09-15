<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link  rel="stylesheet" href="../../static/css/login.css">
    <link  rel="stylesheet" href="../../static/css/header.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <title>Tune Wave: Admin Login</title>
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
                        <a class="header_link" href="/contact"><li class="header_nav_item">Contat us</li></a>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <section class="login_section">
            <div class="login-form">
                <h2>Admins Login</h2>
                <form action="/admin_login" method="POST">
                    <div class="form-group">
                        <i class="bi bi-person-circle"></i>
                        <input id="username" name="username" type="text" placeholder="Username" required /><br>
                    </div>
                    <div class="form-group">
                        <i class="bi bi-lock-fill"></i>
                        <input id="password" name="password" type="password" placeholder="Password" required /><br>
                    </div>
                    %if error_message:
                        <div class="message_div">
                            <p class="message_text">{{ error_message }}</p>
                        </div>
                    %end
                    <button type="submit" class="login-button">Login</button>
                </form>
            </div>
    </section>
    <script src="../../static/js/header.js"></script>
</body>
</html>
