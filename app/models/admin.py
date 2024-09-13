
# OS admins precisam ser cadastrados diretamente no banco de dados.

class Admin():
    def __init__(self, adminId, username, password):
        self.__adminID = adminId
        self.__username = username
        self.__password = password

    @property
    def adminID(self):
        return self.__adminID
    
    @adminID.setter
    def adminID(self, value):
        self.__adminID = value

    @property
    def username(self):
        return self.__username
    
    @username.setter
    def username(self, value):
        self.__username = value
    
    @property
    def password(self):
        return self.__password