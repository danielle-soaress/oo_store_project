<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form action="/login_page" method="post" id="login_form">
        <label for="username">Nome:</label>
        <input id="username" name="username" type="text" required /><br>

        <label for="password">Senha:</label>
        <input id="password" name="password" type="password" required /><br>

        <input value="Login" type="submit" />
    </form>
    
    %if error_message:
        <p style="color:red;">{{ error_message }}</p>
    %end

    <form action="/logout" method="post">
        <button type="submit">Logout</button>
        <span>Have an account? <a href="#" onclick="window.location.href='register';">Sign Up</a></span>
    </form>
</body>
</html>
