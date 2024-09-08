from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord
from bottle import template, redirect, request, response
from app.controllers.datarecord import DataRecord
import json

dtr = DataRecord()


class Application():

    def __init__(self):
#============removi a pagina================
        self.pages = {
            'login_page': self.login_page,
            'login': self.login,
            'register': self.register,
            'home': self.home,
            'management': self.management,
            'viewProducts': self.viewProducts
        }
        self.__model= DataRecord()
       
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


    def viewProducts(self):
        return template('app/views/html/page_buy')

    '''def viewProducts(self, **args):
        username = args.get('username', None)
        if self.is_authenticated(username):
            session_id= request.get_cookie('session_id')
            user = self.__model.getCurrentUser(session_id)
            #===============Adicionado================
            userBag = self.__model.getUserBag(username)
            #============Precisa modificar o pagina=============
            return template('app/views/html/page_buy', \
            transfered=True, current_user=user, bag=userBag)
        else:
            return template('app/views/html/page_buy', \
            transfered=False)'''


    def is_authenticated(self, username):
        session_id = request.get_cookie('session_id')
        current_user = self.__model.getCurrentUser(session_id)
        return username == current_user.username
    

#===========================Modificado=========================
    def authenticate_user(self, username, password): #login function
        session_id = self.__model.checkUser(username, password)
        if session_id:
            response.set_cookie('session_id', session_id, httponly=True, secure=True, max_age=3600)
            response.set_cookie('username', username, secure=True, max_age=3600)
            return redirect('/viewProducts')
        return redirect('/login_page?error_code=1')


    '''def authenticate_user(self, username, password): #login function
        #=====================================================
        tempBag = json.loads(request.forms.get('bag'))
        #=====================================================
        session_id = self.__model.checkUser(username, password)
        userAccountDates = dtr.getUserAccountDates(username)

        if session_id:
            response.set_cookie('session_id', session_id, httponly=True, secure=True, max_age=3600)

            #==============inserido===================
            userBag = userAccountDates.get('bag', [])
            updateBag = dtr.sync_bags(userBag, tempBag)

            userAccountDates['bag'] = updateBag
            dtr.saveUserAccount(username, userAccountDates)
            #========================================

#================Precisa arrumar=====================
            return redirect(f'/page_buy/{username}')
        return redirect('/login_page?error_code=1')'''
#==============================================================
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
        return template('app/views/html/product_management')
        """session_id = request.get_cookie('session_id')
        if self.__model.checkAdmin(session_id):
            return template('app/views/html/product_management')
        return template('app/views/html/index')"""
