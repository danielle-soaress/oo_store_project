from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord
from app.models.cart import Cart
from bottle import template, redirect, request, response
import json


class Application():

    def __init__(self):
#============removi a pagina================
        self.pages = {
            'pagina': self.pagina,
            'login_page': self.login_page,
            'login': self.login,
            'register': self.register,
            'home': self.home,
            'management': self.management,
            'viewProduct': self.viewProduct,
            'viewProducts': self.viewProducts,
            'payment': self.payment,
            'contact': self.contact
        }
        self.__model= DataRecord()
        self.__product_model = ProductRecord()
       
    def render(self, page, **kwargs):
        content = self.pages.get(page, self.home)
        if kwargs:
            return content(**kwargs)
        else:
            return content()
        
    def pagina(self, **args):
        userID = args.get('userID', None)
        if self.is_authenticated(userID):
            session_id= request.get_cookie('session_id')
            user = self.__model.getCurrentUser(session_id)
            return template('app/views/html/pagina', \
            transfered=True, current_user=user)
        return template('app/views/html/pagina', \
        transfered=False)


    def login(self):
        session_id= request.get_cookie('session_id')
        current_user= self.__model.getCurrentUser(session_id)
        if current_user:
            return template('app/views/html/login', \
            username= current_user.username)
        return template('app/views/html/login', \
        transfered=False, username= None)



    def is_authenticated(self, userID):
        session_id = request.get_cookie('session_id')
        current_user = self.__model.getCurrentUser(session_id)
        return userID == current_user.userID
    

#===========================Modificado=========================
    def authenticate_user(self, username, password): #login function
        session_id = self.__model.checkUser(username, password)
        if session_id:
            userID = self.__model.getUserID(username)
            response.set_cookie('session_id', session_id, httponly=True, secure=True, max_age=3600)
            response.set_cookie('username', username, secure=True, max_age=3600)
            response.set_cookie('userID', userID, secure=True, max_age=3600)
            return redirect('/viewProducts')
        return redirect('/login_page?error_code=1')

#==============================================================

    def logout_user(self):
        session_id = request.get_cookie('session_id')
        self.__model.logout(session_id)
        response.delete_cookie('session_id')
        redirect('/login')

    def register(self):
        return template('app/views/html/register')
    
    def home(self):
        session_id = request.get_cookie('session_id')
        if self.__model.getCurrentUser(session_id):
            return template('app/views/html/index', authenticated = True)
        return template('app/views/html/index', authenticated = False)
    
    def contact(self):
        return template('app/views/html/contact')

    def login_page(self, **args):
        error_message = args.get('error_message', None)
        return template('app/views/html/login_page', error_message=error_message)
    
    def management(self, **args):
        session_id = request.get_cookie('session_id')
        if self.__model.checkAdmin(session_id):
            return template('app/views/html/product_management')
        return self.render('home')
    
    def payment(self, **args):
        username = args.get('username', None)
        user_account = self.__model.getUserAccountDates(username)
        if user_account:
            totalCash = Cart.totalCash(user_account["cart"])
            totalCreditCard = Cart.totalCreditCard(user_account["cart"])
            return template('app/views/html/payment', **user_account, totalCash = totalCash, \
                            totalCreditCard = totalCreditCard, freight = 30.00 )
        return self.render('viewProducts')

    def viewProducts(self):
        return template('app/views/html/page_buy')
    
    def viewProduct(self, **args):
        productID = args.get('product_id', None)
        product = self.__product_model.get_product(productID)
        session_id = request.get_cookie('session_id')
        if product:
            product_colors = product.getColors()
            parcels_info= product.creditCardParcels()
            if self.__model.getCurrentUser(session_id):
                return template('app/views/html/product_page', availability = product.stockStatus(), name = product.name, id = product.id, cash_price = product.price,\
                             category = product.category, brand = product.brand, connect = product.connectivity, desc= product.description, \
                             colors = json.dumps(product_colors), credit_price = product.creditCardPrice(), parcels = parcels_info[1], parcels_qt = parcels_info[0], authenticated = True)
            else:
                return template('app/views/html/product_page', availability = product.stockStatus(), name = product.name, id = product.id, cash_price = product.price,\
                             category = product.category, brand = product.brand, connect = product.connectivity, desc= product.description, \
                             colors = json.dumps(product_colors), credit_price = product.creditCardPrice(), parcels = parcels_info[1], parcels_qt = parcels_info[0], authenticated = False)
    