from app.models.user_account import UserAccount
from app.models.users_dates import UsersDates
import json
import uuid
import os


class DataRecord():
    """Banco de dados JSON para o recurso Usuários"""

    def __init__(self):
        self.__user_accounts = []
        self.__users_dates = []
        self.__authenticated_users = {}
        self.read()


    def read(self):
        try:
            with open("app/controllers/db/user_accounts.json", "r") as arquivo_json:
                user_data = json.load(arquivo_json)
                self.__user_accounts = [UserAccount(**data) for data in user_data]
        except FileNotFoundError:
            self.__user_accounts.append(UserAccount('Guest', '000000'))


    def book(self,username,password):
        #Verificar se username existe no arquivo.json
        for user in self.__user_accounts:
            if user.username == username:
                return False #Username já existe

        #Se não existir, cria e adiciona o novo usuario
        new_user= UserAccount(username,password)
        self.__user_accounts.append(new_user)

        #Salva no arquivo.json
        with open("app/controllers/db/user_accounts.json", "w") as arquivo_json:
            user_data = [vars(user_account) for user_account in
            self.__user_accounts]
            json.dump(user_data, arquivo_json)
        return True #Usuario registrado com sucesso

    
    def read_users_dates(self):
            try:
                with open("app/controllers/db/users_dates.json", "r") as arquivo_json:
                    dates = json.load(arquivo_json)
                    self.__users_dates = [UsersDates(**data) for data in dates]
            except FileNotFoundError:
                self.__users_dates.append(UsersDates('Guest', '000000'))


    def book_users_dates(self, firstname, lastname, username, email, address, password):
        #Cria e adiciona os dados do usuario
        new_dates = UsersDates(firstname, lastname, username, email, address, password)
        self.__users_dates.append(new_dates)

        #Salva no arquivo.json
        with open("app/controllers/db/users_dates.json", "w") as arquivo_json:
            dates = [vars(user_date) for user_date in
            self.__users_dates]
            json.dump(dates, arquivo_json)
        return True #Usuario registrado com sucesso


    def getCurrentUser(self,session_id):
        if session_id in self.__authenticated_users:
            return self.__authenticated_users[session_id]
        else:
            return None


    def checkUser(self, username, password):
        for user in self.__user_accounts:
            if user.username == username and user.password == password:
                session_id = str(uuid.uuid4())  # Gera um ID de sessão único
                self.__authenticated_users[session_id] = user
                return session_id  # Retorna o ID de sessão para o usuário
        return None


    def logout(self, session_id):
        if session_id in self.__authenticated_users:
            del self.__authenticated_users[session_id] # Remove o usuário logado
