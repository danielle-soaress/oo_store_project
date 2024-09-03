from app.controllers.application import Application
from app.models.error import ERRORS, Error
from bottle import Bottle, run, request, static_file
from bottle import redirect
from app.controllers.datarecord import DataRecord
import json

dtr = DataRecord()
app = Bottle()
ctl = Application()


#-----------------------------------------------------------------------------
# Rotas:

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')


@app.route('/db/<filepath:path>')
def serve_db(filepath):
    return static_file(filepath, root='./app/controllers/db')



#-----------------------------------------------------------------------------
# Suas rotas aqui:

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
    ctl.authenticate_user(username, password)
        

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
    

@app.route('/home', method='GET')
def home():
    return ctl.render('home')
#-----------------------------------------------------------------------------


if __name__ == '__main__':

    run(app, host='localhost', port=8080, debug=True)
