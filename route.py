from app.controllers.application import Application
from app.models.error import ERRORS, Error
from bottle import Bottle, run, request, static_file, response
from bottle import redirect
from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord
import json
import os
import re
import uuid


dtr = DataRecord()
app = Bottle()
ctl = Application()
prc = ProductRecord()


#-----------------------------------------------------------------------------
# Rotas:

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')


@app.route('/db/<filepath:path>')
def serve_db(filepath):
    return static_file(filepath, root='./app/controllers/db')



#-----------------------------------------------------------------------------
@app.route('/login_page', method='GET')
def login(error_message = None):
    error_code = request.query.get('error_code', None)
    if error_code:
        error_message = ERRORS.get(int(error_code), 0).message
    return ctl.render('login_page', error_message = error_message)


@app.route('/login_page', method='POST')
def action_login():
    username = request.forms.get('username')
    password = request.forms.get('password')

    return ctl.authenticate_user(username, password)
        

@app.route('/logout', method='POST')
def logout():
    ctl.logout_user()
    return redirect('/login_page')


@app.route('/register', method='GET')
def signUp():
    return ctl.render('register')


@app.route('/register', method='POST')
def action_register():
    firstname = request.forms.get('firstname')
    lastname = request.forms.get('lastname')
    #=============================================================================================================
    cpf = request.forms.get('cpf')
    telefone = request.forms.get('telefone')
    #=============================================================================================================
    username = request.forms.get('username')
    email = request.forms.get('email')
    address = request.forms.get('address')
    password = request.forms.get('password')
    

    #Registrar o usuario e os dados
    #==========================================Telefone e CPF===========================================================
    sucess = dtr.book(firstname, lastname, username, cpf, telefone, email, address, password)
    #===================================================================================================================
    if sucess:
        print('success')
        return ctl.render("login_page")
    
#------------------------------------------------PERFIL---------------------------------------------------------------
@app.route('/pagina/<userID>', method='GET')
def action_pagina(userID=None):
    return ctl.render('pagina',userID = userID)


@app.route('/api/pagina/<userID>', method='DELETE')
def delete_account(userID):
    try:
        dtr.delete_account(userID)
        response.status = 204
        return json.dumps({"message": "Account deleted successfully"})
    except Exception as e:
        response.status = 500
        return json.dumps({"error": str(e)})
    
@app.route('/api/pagina/<userID>', method='PATCH')
def edit_account(userID):
    try:
        print('chegou aqui 0')
        firstname = request.forms.get('firstname')
        lastname = request.forms.get('lastname')
        username = request.forms.get('username')
#=======================================================CPF e telefone==============================================
        cpf = request.forms.get('cpf')
        telefone = request.forms.get('telefone')
#=======================================================CPF e telefone==============================================
        email = request.forms.get('email')
        address = request.forms.get('address')
        password = request.forms.get('password')

        dtr.updateDates(userID, firstname, lastname, username, cpf, telefone, email, address, password)
        response.status = 200
        return json.dumps({"message": "Account updated successfully"})
    except Exception as e:
        response.status = 500
        return json.dumps({"error": str(e)})


@app.route('/authenticate', methods='GET')
def check_auth():
    session_id = request.get_cookie('session_id')
    print(f"Session ID: {session_id}")  
    print(f"Tipo de session_id: {type(session_id)}")
    user = dtr.getCurrentUser(session_id)
    print(f"Usuário retornado: {user}")
    
    if user:
        print(f"User found: {user.userID}") 
        return {'authenticated': True, 'userID': user.userID}
    else:
        print("No user found") 
        return {'authenticated': False}

    
#----------------------------------- HOME, STORE AND PRODUCTS PAGES ------------------------------------------
@app.route('/home', method='GET')
def home():
    return ctl.render('home')



@app.route('/viewProducts', method='GET')
def viewProducts():
    return ctl.render('viewProducts')

#=======================Cart routes========================

@app.route('/save-cart', method='POST')
def save_cart():
    data = request.json
    userID = data['userID']
    cart = data['cart']

    if not userID:
        response.status = 400
        return {'status': 'error', 'message': 'userID is required'}
    
    if cart is None:  # Verifica se cart não é None (mesmo se estiver vazio, é válido)
        response.status = 400
        return {'status': 'error', 'message': 'Cart data is required'}

    if not (dtr.saveUserCart(userID, cart)):
        response.status = 500 
        return {'status': 'error', 'message': 'Failed to save cart'}
    
    response.status = 200
    return {'status': 'success', 'message': 'Cart saved successfully'}


@app.route('/get-cart', method= 'GET')
def get_cart():
    userID = request.get_cookie('userID')

    if not userID:
        response.status = 400
        return json.dumps({"status": "error", "message": "userID não fornecido"})

    cart = dtr.getUserCart(userID)

    if not cart:
        response.status = 400
        return json.dumps({"status": "error", "message": "User or Cart not Found"})
    
    detailed_cart = prc.get_cart_products(cart)

    print(detailed_cart)
    response.content_type = 'application/json'
    return json.dumps({"status": "success", "cart": detailed_cart})


# -------- filter store routes ---------- 

def filter_products_by_category(products, category):
    return [product for product in products if product["category"].lower() == category.lower()]

def filter_products_by_connect(products, connect):
    return [product for product in products if product["connectivity"].lower() == connect.lower()]

@app.route('/api/products/<criterion>/<name>', method='GET')
def filtered_products(criterion, name):
    with open('app/controllers/db/products.json') as f:
        products = json.load(f)

    if criterion == 'connectivity':
        filtered_products = filter_products_by_connect(products, name)
    elif criterion == 'category':
        filtered_products = filter_products_by_category(products, name)
    else:
        return {'error': 'Invalid criterion'}, 400

    response.content_type = 'application/json'
    return json.dumps(filtered_products, indent=4)

# ---------------- 

@app.route('/viewProduct/<product_id>', method='GET')
def viewProduct(product_id):
    return ctl.render('viewProduct', product_id = product_id)



# --------------

@app.route('/payment/<userID>', method='GET')
def payment(userID):
    if ctl.is_authenticated(userID):
        return ctl.render('payment', userID = userID)
    return ctl.render('login_page', error_message = "Log in to your account to proceed with payment.")

@app.route('/contact', method='GET')
def contact():
    return ctl.render('contact')



# ----------------- PRODUCT MANAGEMENT ROUTES (API) ----------------


@app.route('/management', method='GET')
def management():
    return ctl.render('management')

@app.route('/api/products', method='GET')
def get_products():
    with open('app/controllers/db/products.json') as f:
        products = json.load(f)
    response.content_type = 'application/json'
    return json.dumps(products)

@app.route('/api/products/<product_id>', method='DELETE')
def delete_product(product_id):
    try:
        prc.delete_product(product_id)
        response.status = 204
        return json.dumps({"message": "Product deleted successfully"})
    except Exception as e:
        response.status = 500
        return json.dumps({"error": str(e)})
    
@app.route('/api/products/<product_id>', method='PATCH')
def edit_product(product_id):
    try:
        name = request.forms.get('name')
        price_str = request.forms.get('price')
        category = request.forms.get('category')
        connectivity = request.forms.get('connectivity')
        description = request.forms.get('description')
        brand = request.forms.get('brand')
        price = None

        ## price processing
        if not is_valid_float(price_str):
            response.status = 400
            return json.dumps({"error": "Insert a valid price value. For decimal numbers, use period."})
        else:
            price = float(price_str)

        prc.update_product(product_id, name, price, category, connectivity, description, brand)
        response.status = 200
        return json.dumps({"message": "Product updated successfully"})
    except Exception as e:
        response.status = 500
        return json.dumps({"error": str(e)})

@app.route('/api/products/stock/<product_id>', method='PATCH')
def edit_stock(product_id):
    try:
        quantities = request.forms.getall('quantity[]')
        colors = request.forms.getall('color[]')

        product_stock = dict(zip(colors, quantities))

        print(product_stock)
        
        result = []

        for key, value in product_stock:
            r = prc.update_product_stock(product_id, key, value)
            result.append(r)

        print(result)

        if all(x is None for x in result):
            response.status = 400
            return json.dumps({"error": "Something went wrong... Verify if the new quantity is greater or equal to 0."})

        response.status = 200
        return json.dumps({"message": "Stock updated successfully"})
    except Exception as e:
        response.status = 500
        return json.dumps({"error": str(e)})

@app.route('/api/products', method='POST')
def add_product():
    try:
        name = request.forms.get('name')
        price_str = request.forms.get('price')
        category = request.forms.get('category')
        connectivity = request.forms.get('connectivity')
        description = request.forms.get('description')
        brand = request.forms.get('brand')
        colorStock = {}
        imageFileName = None
        price = None
        print('checkpoint0')
        ## price processing
        if not is_valid_float(price_str):
            response.status = 400
            return json.dumps({"error": "Insert a valid price value. For decimal numbers, use '.'."})
        else:
            price = float(price_str)

        ## image processing
        image = request.files.get('image')
        if image:
            filename = generate_unique_filename(image.filename)
    
            if not filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                response.status = 400
                return json.dumps({"error": "Unsupported file type"})
            file_path = os.path.join('app/static/img', filename)
            image.save(file_path)
            imageFileName = filename
        
        ## color stock processing
        colors = request.forms.getall('colorStock')
        quantities = request.forms.getall('colorStockQuantity')

        if len(colors) == len(quantities):
            for color,quantity in zip(colors, quantities):
                if not is_valid_hex_color(color):
                    response.status = 400
                    return json.dumps({"error": f'Color "{color}" is not in a valid hex format'})
                colorStock[color] = int(quantity) 
        else:
            response.status = 400
            return json.dumps({"error": "All colors must have quantity information. The number of colors is not equal to the number of quantity information."})
        prc.create_product(name, price, category, connectivity, description, brand, colorStock, imageFileName)
        response.status = 204
        return json.dumps({"message": "Product created successfully"})
    except Exception as e:
        response.status = 500
        print('error ' + str(e))
        return json.dumps({"error": str(e)})

# Regex para verificar cores hexadecimais
HEX_COLOR_REGEX = re.compile(r'^#(?:[0-9A-Fa-f]{3}){1,2}$')

def is_valid_hex_color(color):
    return HEX_COLOR_REGEX.match(color) is not None

def is_valid_float(value):
    return bool(re.match(r"^\d+(\.\d+)?$", value))

def generate_unique_filename(filename):
    unique_id = str(uuid.uuid4())
    return f"{unique_id}_{filename}"
#-----------------------------------------------------------------------------


if __name__ == '__main__':
    run(app, host='localhost', port=8080, debug=True, reloader=True)
