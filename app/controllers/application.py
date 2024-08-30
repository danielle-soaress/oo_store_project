from app.controllers.datarecord import DataRecord
from bottle import template, redirect, request, response


class Application():

    def __init__(self):

        self.pages = {
            'pagina': self.pagina,
            'login_page': self.login_page,
            'login': self.login,
            'register': self.register,
            'home': self.home            
        }
        self.__model= DataRecord()


    def render(self, page, **kwargs):
        print(f'Essa É A PAGINA: {page}, parâmetros: {kwargs}')
        content = self.pages.get(page, self.home)

        print(kwargs)
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


    def authenticate_user(self, username, password):
        session_id = self.__model.checkUser(username, password)
        if session_id:
            response.set_cookie('session_id', session_id, httponly=True, secure=True, max_age=3600)
            return redirect(f'/pagina/{username}')
        return redirect('/login_page?error_code=1')


    def logout_user(self):
        session_id = request.get_cookie('session_id')
        self.__model.logout(session_id)
        response.delete_cookie('session_id')
        redirect('/login')

    def register(self):
        print("Register page requested")
        return template('app/views/html/register')
    

    def home(self):
        print("Home page requested")
        return template('app/views/html/index')
    
    def login_page(self, **args):
        error_message = args.get('error_message', None)
        return template('app/views/html/login_page', error_message=error_message)