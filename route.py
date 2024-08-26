from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response
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

@app.route('/helper')
def helper():
    return ctl.render('helper')

#-----------------------------------------------------------------------------
# Suas rotas aqui:

@app.route('/pagina/<username>', method='GET')
def action_pagina(username=None):
    return ctl.render('pagina',username)


@app.route('/portal', method='GET')
def login():
    return ctl.template('/app/views/html/portal.tpl')


@app.route('/portal', method='POST')
def action_portal():
    username = request.forms.get('username')
    password = request.forms.get('password')
    ctl.authenticate_user(username, password)

@app.route('/logout', method='POST')
def logout():
    ctl.logout_user()


@app.route('/register', method='GET')
def signUp():
    return ctl.render('register')

    
@app.route('/register', method='POST')
def action_register():
    username = request.forms.get('username')
    password = request.forms.get('password')

    users = ctl.read()

    if any(user['username'] == username for user in users):
        message = 'Nome de usuário já cadastrado!'
        return template('register', message = message)

    users.append({'username': username})
    ctl.book(users)

#-----------------------------------------------------------------------------


if __name__ == '__main__':

    run(app, host='localhost', port=8080, debug=True)
