from app.controllers.datarecord import DataRecord
from bottle import template, redirect, request, response


class Application():

    def __init__(self):

        self.pages = {
            'pagina': self.pagina,
            'portal': self.portal,
            'register': self.register
        }
        self.__model= DataRecord()


    def render(self,page,parameter=None):
        content = self.pages.get(page, self.helper)
        if not parameter:
            return content()
        else:
            return content(parameter)


    def helper(self):
        return template('app/views/html/helper')


    def portal(self):
        session_id= request.get_cookie('session_id')
        current_user= self.__model.getCurrentUser(session_id)
        if current_user:
            return template('app/views/html/portal', \
            username= current_user.username)
        return template('app/views/html/portal', \
        username= None)


    def pagina(self,username):
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
            response.set_cookie('session_id', session_id, httponly=True, \
            secure=True, max_age=3600)
            redirect(f'/pagina/{username}')
        redirect('/portal')


    def logout_user(self):
        session_id = request.get_cookie('session_id')
        self.__model.logout(session_id)
        response.delete_cookie('session_id')
        redirect('/portal')

    def register(self):
        print("Register page requested")
        return template('app/views/html/register')