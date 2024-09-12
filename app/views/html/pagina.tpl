<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="stylesheet" href="../../static/css/perfil.css">
    <link rel="stylesheet" href="../../static/css/header.css">
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
                <a class="header_link"><button class="login_button" onclick="redirectToLogin()">Sign In</button></a>
                <i class="bi bi-search"></i>
                <i class="bi bi-moon-fill"></i>
            </div>
        </div>
    </header>

    

    % if transfered:
        
        <div class="userDates" id="userDates">
            <h3>Dados do Usuário</h3>
            <div class="paragraph">

                <p data-label="Firstname" id="display-firstname"> {{current_user.firstname}} </p>
                <p data-label="Lastname" id="display-lastname"> {{current_user.lastname}} </p>
                <p data-label="Username" id="display-username"> {{current_user.username}} </p>
<!-------------------------------------------CPF e telefone-------------------------------------------------------->
                <p data-label="cpf" id="display-cpf"> {{current_user.cpf}} </p>
                <p data-label="telefone" id="display-telefone"> {{current_user.telefone}} </p>
<!----------------------------------------------------------------------------------------------------------------->
                <p data-label="Email" id="display-email"> {{current_user.email}} </p>
                <p data-label="Address" id="display-address"> {{current_user.address}} </p>
                <p data-label="Password" id="display-password"> {{current_user.password}} </p>
            
            </div>
            <div class="buttons">

                <button id="edit_button" class="edit_button" onclick="">Edit</button>
                <button id="delete_button" class="delete_button" onclick="">Delete Account</button>

            </div>

        </div>


            


    
<!---------------------------------------------------Edit perfil--------------------------------------------------------->
    <div id="edit_perfil" class="hide">
        <div class="editPerfil">
            <div class="top_information_box">
            <button id="close_editForm" class="close_window_button">Close</button>
            <h1 class="information_box_title">Edit Perfil</h1>
            <br>
        </div>
        <form id="editDatesForm">

            <div class="label_div">
                <label for="firstname">Firstname:</label>
                <input id="firstname_editForm" class="firstname type="text" name="firstname" required>
                <br>
            </div>

            <div class="label_div">
                <label for="lastname">Lastname:</label>
                <input id="lastname_editForm"  class="lastname type="text" name="lastname" required>
                <br>
            </div>

            <div class="label_div">
                <label for="username">Username: </label>
                <input id="username_editForm" class="username" type="text" name="username" required>
                <br>
            </div>
<!----------------------------------------------CPF e telefone--------------------------------------------------->
            <div class="label_div">
                <label for="cpf">CPF:</label>
                <input type="text" name="cpf" id="cpf" class="cpf" autocomplete="cpf"><br>
            </div>

            <div class="label_div">
                <label for="telefone">Telefone:</label>
                <input type="text" name="telefone" id="telefone" class="telefone" autocomplete="telefone"><br>
            </div>
<!------------------------------------------------------------------------------------------------------------------->
            <div class="label_div">
                <label for="email">Email: </label>
                <input id="email_editForm" class="email" type="email" name="email" required>
                <br>
            </div>

            <div class="label_div">
                <label for="address">Address:</label>
                <input id="address_editForm" class="address" type="text" name="address" required>
                <br>
            </div>

            <div class="label_div">
                <label for="password">Password:</label>
                <input id="password_editForm" class="password" type="password" name="password" required>
                <br>
            </div>

            <div class="label_div">
                <label for="confirm_password">Confirm Password:</label>
                <input id="confirm_password_editForm" class="confirm_password" type="password" name="confirm_password" required>
                <br>
            </div>

            <button style="width: 100%;" class="updateDates" id="updateDates" type="submit">Update Dates</button>
        </form>
        </div>
        
    </div>


    % end

    <script>
        function redirectToLogin() {
            window.location.href = '/login_page';
        }
    </script>
    <script src="../../static/js/perfil.js"></script>
</body>
</html>
