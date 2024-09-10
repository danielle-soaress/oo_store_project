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
                self.__user_accounts = [
                    UserAccount(
                        firstname=data.get('firstname'),
                        lastname=data.get('lastname'),
                        username=data.get('username'),
                        email=data.get('email'),
                        address=data.get('address'),
                        password=data.get('password'),
                        userID=data.get('userID')
                    )
                    for data in user_data
                ]
        except FileNotFoundError:
            # Cria um usuário 'Guest' se o arquivo não for encontrado
            self.__user_accounts = [UserAccount('Guest', 'Guest', 'guest', 'guest@example.com', 'N/A', '000000', uuid.uuid4().hex)]
        except json.JSONDecodeError:
            # Define a lista de usuários como vazia em caso de erro de decodificação JSON
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

#=============================Inserido=========================

    def getUserAccountDates(self, username):
        try:
            with open("app/controllers/db/user_accounts.json", "r") as arquivo_json:
                data = json.load(arquivo_json)

            for user in data:
                if user["username"] == username:
                    return user
            return None
        except FileNotFoundError:
            return None
    

    def saveUserCart(self, username, cart):
        try:
            with open("app/controllers/db/user_accounts.json", "r+") as arquivo_json:
                data = json.load(arquivo_json)
                
                user_found = False

                for user in data:
                    if user['username'] == username:
                        user['cart'] = cart
                        user_found = True
                        break

                if not user_found:
                    print(f"Usuário '{username}' não encontrado.")
                    return False

                arquivo_json.seek(0)
                json.dump(data, arquivo_json, indent=4)
                arquivo_json.truncate()
                return True

        except FileNotFoundError:
            print("Arquivo não encontrado.")
        except json.JSONDecodeError:
            print("Erro ao decodificar o JSON.")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")

    def getUserCart(self, username):
        try:
            user = self.getUserAccountDates(username)
            print('entrou no getusertCart')
            if user:
                return user.get('cart', [])
            else:
                print(f"Usuário '{username}' não encontrado.")
                return False

        except FileNotFoundError:
            print("Arquivo não encontrado.")
        except json.JSONDecodeError:
            print("Erro ao decodificar o JSON.")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")

    '''def syncBags(userBag, tempBag):
        for tempItem in tempBag:
            found = False
            for item in userBag:
                if item['id'] == tempItem['id']:
                    item['quantity'] += tempItem['quantity']
                    found = True
                    break
            if not found:
                userBag.append(tempItem)
        return userBag'''
    