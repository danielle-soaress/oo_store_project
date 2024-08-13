<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha segunda página com o BMVC</title>
</head>
<body>

    <h1>Minha página com interação de modelos :)</h1>

    % if transfered:

        <div>
            <h2>Dados do Usuário:</h2>
            <p>Username: {{current_user.username}} </p>
            <p>Password: {{current_user.password}} </p>
            <h3>Para LOGOUT, acesse novamente a rota '/portal'</h3>
        </div>

    % else:

        <h2>Realize o LOGIN para ter acesso aos seus dados pessoais. Acesse nosso portal em '/portal' :) </h2>

    % end

</body>
</html>
