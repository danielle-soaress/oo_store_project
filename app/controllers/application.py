from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord
from bottle import template, redirect, request, response
import json


class Application():

    def __init__(self):

        self.pages = {
            'pagina': self.pagina,
            'login_page': self.login_page,
            'login': self.login,
            'register': self.register,
            'home': self.home,
            'management': self.management,
            'viewProduct': self.viewProduct,
            'viewProducts': self.viewProducts
        }
        self.__model= DataRecord()
        self.__product_model = ProductRecord()
       
    def render(self, page, **kwargs):
        content = self.pages.get(page, self.home)
        if kwargs:
            return content(**kwargs)
        else:
            return content()

    def login(self):
        session_id= request.get_cookie('session_id')
        current_user= self.__model.getCurrentUser(session_id)
        if current_user:
            return template('app/views/html/login', \
            username= current_user.username)
        return template('app/views/html/login', \
        transfered=False, username= None)

    def pagina(self, **args):
        username = args.get('username', None)
        if self.is_authenticated(username):
            session_id= request.get_cookie('session_id')
            user = self.__model.getCurrentUser(session_id)
            return template('app/views/html/pagina', \
            transfered=True, current_user=user)
        return template('app/views/html/pagina', \
        transfered=False)

    def is_authenticated(self, username):
        session_id = request.get_cookie('session_id')
        current_user = self.__model.getCurrentUser(session_id)
        return username == current_user.username

    def authenticate_user(self, username, password): #login function
        session_id = self.__model.checkUser(username, password)
        if session_id:
            response.set_cookie('session_id', session_id, httponly=True, secure=True, max_age=3600)
            return redirect(f'/viewProducts')
        return redirect('/login_page?error_code=1')

    def logout_user(self):
        session_id = request.get_cookie('session_id')
        self.__model.logout(session_id)
        response.delete_cookie('session_id')
        redirect('/login')

    def register(self):
        return template('app/views/html/register')
    
    def home(self):
        print("Home page requested")
        return template('app/views/html/index')
    
    def login_page(self, **args):
        error_message = args.get('error_message', None)
        return template('app/views/html/login_page', error_message=error_message)
    
    def management(self, **args):
        session_id = request.get_cookie('session_id')
        if self.__model.checkAdmin(session_id):
            return template('app/views/html/product_management')
        self.home()
        return

    def viewProducts(self):
        return template('app/views/html/page_buy')
    
    def viewProduct(self, **args):
        productID = args.get('product_id', None)

        product = self.__product_model.get_product(productID)
        if product:
            product_colors = product.getColors()
            parcels_info= product.creditCardParcels()
            return template('app/views/html/product_page', availability = product.stockStatus(), name = product.name, id = product.id, cash_price = product.price,\
                             category = product.category, brand = product.brand, connect = product.connectivity, desc= product.description, \
                             colors = json.dumps(product_colors), credit_price = product.creditCardPrice(), parcels = parcels_info[1], parcels_qt = parcels_info[0])
    
    