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

@app.route('/pagina/<username>', method='GET')
def action_pagina(username=None):
    return ctl.render('pagina',username = username)


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
    username = request.forms.get('username')
    email = request.forms.get('email')
    address = request.forms.get('address')
    password = request.forms.get('password')
    

    #Registrar o usuario e os dados
    sucess = dtr.book(firstname, lastname, username, email, address, password)
    if sucess:
        print('success')
        return ctl.render("login_page")
    
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
    username = data['username']
    cart = data['cart']

    if not username:
        response.status = 400
        return {'status': 'error', 'message': 'Username is required'}
    
    if cart is None:  # Verifica se cart não é None (mesmo se estiver vazio, é válido)
        response.status = 400
        return {'status': 'error', 'message': 'Cart data is required'}

    if not (dtr.saveUserCart(username, cart)):
        response.status = 500 
        return {'status': 'error', 'message': 'Failed to save cart'}
    
    response.status = 200
    return {'status': 'success', 'message': 'Cart saved successfully'}


@app.route('/get-cart', method= 'GET')
def get_cart():
    username = request.get_cookie('username')

    if not username:
        response.status = 400
        return json.dumps({"status": "error", "message": "Username não fornecido"})

    cart = dtr.getUserCart(username)

    if not cart:
        response.status = 400
        return json.dumps({"status": "error", "message": "User or Cart not Found"})
    
    detailed_cart = prc.get_cart_products(cart)

    print(detailed_cart)
    response.content_type = 'application/json'
    return json.dumps({"status": "success", "cart": detailed_cart})


'''@app.route('/api/userBag', method='GET')
def get_user_bag():
    username = request.query.username
    userAccountDates = dtr.getUserAccountDates(username)
    if not userAccountDates:
        return {'status': 'error', 'message': 'User not found'}
    

    bag = userAccountDates.get('bag')
    return {'bag': bag}'''


# ---------------- 

@app.route('/viewProduct/<product_id>', method='GET')
def viewProduct(product_id):
    return ctl.render('viewProduct', product_id = product_id)



# --------------

@app.route('/payment/<username>', method='GET')
def payment(username):
    if ctl.is_authenticated(username):
        return ctl.render('payment', username = username)
    return ctl.render('login_page', error_message = "Log in to your account to proceed with payment.")


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
        print('chegou aqui 0')
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
        print('checkpoint2')
        image = request.files.get('image')
        if image:
            filename = generate_unique_filename(image.filename)
    
            if not filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                response.status = 400
                return json.dumps({"error": "Unsupported file type"})
            file_path = os.path.join('app/static/img', filename)
            image.save(file_path)
            imageFileName = filename
        
        print('checkpoint1')
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
        print('deu certo')
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
    run(app, host='localhost', port=8080, debug=True)
