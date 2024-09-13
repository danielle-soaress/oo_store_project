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
                <a style="{{'display: block;' if authenticated else 'display: none;'}}" class="header_link">
                    <button class="logout_button" id="logout_b">Log out</button>
                </a>
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
        </div>
        <form id="editDatesForm">

            <div class="label_div">
                <label for="firstname">Firstname:</label>
                <input id="firstname_editForm" class="perfilForm_input" type="text" name="firstname" required>
                <br>
            </div>

            <div class="label_div">
                <label for="lastname">Lastname:</label>
                <input id="lastname_editForm"  class="perfilForm_input" type="text" name="lastname" required>
                <br>
            </div>

            <div class="label_div">
                <label for="username">Username:</label>
                <input id="username_editForm" class="perfilForm_input" type="text" name="username" required>
                <br>
            </div>

            <div class="label_div">
                <label for="email">Email:</label>
                <input id="email_editForm" class="perfilForm_input" type="email" name="email" required>
                <br>
            </div>

            <div class="label_div">
                <label for="address">Address:</label>
                <input id="address_editForm" class="perfilForm_input" type="text" name="address" required>
                <br>
            </div>

            <div class="label_div">
                <label for="password">Password:</label>
                <input id="password_editForm" class="perfilForm_input" type="password" name="password" required>
                <br>
            </div>

            <div class="label_div">
                <label for="confirm_password">Confirm Password:</label>
                <input id="confirm_password_editForm" class="perfilForm_input" type="password" name="confirm_password" required>
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
    <script src="../../static/js/header.js"></script>
</body>
</html>
