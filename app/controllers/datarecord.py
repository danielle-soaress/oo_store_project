from app.models.user_account import UserAccount
from bottle import redirect
import json
import uuid
import os


class DataRecord():
    """Banco de dados JSON para o recurso Usuários"""

    def __init__(self):
        self.__user_accounts = []
        self.__admins = []
        self.__authenticated_users = {}
        self.read()
        self.adminsInfo()

    def read(self):
        try:
            with open("app/controllers/db/user_accounts.json", "r") as arquivo_json:
                user_data = json.load(arquivo_json)
                self.__user_accounts = [UserAccount(**data) for data in user_data]
        except FileNotFoundError:
            self.__user_accounts.append(UserAccount('Guest', '000000', uuid.uuid4()))
        except json.JSONDecodeError:
            self.__user_accounts = []
    
    def adminsInfo(self):
        try:
            with open("app/controllers/db/admins.json", "r") as arquivo_json:
                admins_data = json.load(arquivo_json)
                admins = []
                for item in admins_data:
                    admins.append(item["id"])
                self.__admins = admins
        except FileNotFoundError:
            self.__admins.append(UserAccount('Guest', '000000', uuid.uuid4()))
    
    def generate_unique_id(self):
        #Gera um UUID único e garante que ele não se repita no banco de dados
        while True:
            new_id = str(uuid.uuid4())
            if not any(user.userID == new_id for user in self.__user_accounts):
                return new_id

    def book(self,firstname, lastname, username, email, address, password):
        #Se não existir, cria e adiciona o novo usuario
        id = self.generate_unique_id()
        new_user= UserAccount(firstname, lastname, username, email, address, password, id)
        self.__user_accounts.append(new_user)

        #Salva no arquivo.json
        with open("app/controllers/db/user_accounts.json", "w") as arquivo_json:
            user_data = [vars(user_account) for user_account in
            self.__user_accounts]
            json.dump(user_data, arquivo_json)
        return True #Usuario registrado com sucesso
    

    def getCurrentUser(self,session_id):
        if session_id in self.__authenticated_users:
            return self.__authenticated_users[session_id]
        else:
            return None

    def checkUser(self, username, password):
        self.read()
        for user in self.__user_accounts:
            print(user.username)
            if user.username == username and user.password == password:
                session_id = str(uuid.uuid4())  # Gera um ID de sessão único
                self.__authenticated_users[session_id] = user
                return session_id  # Retorna o ID de sessão para o usuário
        return None

    def checkAdmin(self, session_id):
        current_user = self.getCurrentUser(session_id)
        print(current_user)
        print('admins ')
        print(self.__admins)
        if current_user:
            for adminID in self.__admins:
                if adminID == current_user.userID:
                    return True
            return False
        return None

    def logout(self, session_id):
        if session_id in self.__authenticated_users:
            del self.__authenticated_users[session_id] # Remove o usuário logado
