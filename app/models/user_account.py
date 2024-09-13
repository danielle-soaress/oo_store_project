<<<<<<< HEAD
class UserAccount():
    def __init__(self, firstname, lastname, username, email, address, password, userID):
        self.__firstname = firstname
        self.__lastname = lastname
        self.__username = username
        self.__email = email
        self.__address = address
        self.__password = password
        self.__userID = userID
        self.__cart = []
=======
#==============================================CPF e telefone===================================================
class UserAccount():
    def __init__(self, firstname, lastname, username, cpf, telefone, email, address, password, userID):
        self.firstname = firstname
        self.lastname = lastname
        self.username= username
        self.cpf = cpf
        self.telefone = telefone
        self.email = email
        self.address = address
        self.password= password
        self.userID = userID
        self.cart = []
>>>>>>> 259e9f7af19468d60c589b5c3ae69ebe8675cd77

    # Getters
    @property
    def firstname(self):
        return self.__firstname

    @property
    def lastname(self):
        return self.__lastname

    @property
    def username(self):
        return self.__username

    @property
    def email(self):
        return self.__email

    @property
    def address(self):
        return self.__address

    @property
    def password(self):
        return self.__password

    @property
    def userID(self):
        return self.__userID

    @property
    def cart(self):
        return self.__cart

    # Setters
    @firstname.setter
    def firstname(self, value):
        self.__firstname = value

    @lastname.setter
    def lastname(self, value):
        self.__lastname = value

    @username.setter
    def username(self, value):
        self.__username = value

    @email.setter
    def email(self, value):
        self.__email = value

    @address.setter
    def address(self, value):
        self.__address = value

    @password.setter
    def password(self, value):
        self.__password = value

    @cart.setter
    def cart(self, value):
        self.__cart = value

    # Convert object to dictionary
    def toDict(self):
<<<<<<< HEAD
        return {
            'firstname': self.__firstname,
            'lastname': self.__lastname,
            'username': self.__username,
            'email': self.__email,
            'address': self.__address,
            'password': self.__password,
            'userID': self.__userID,
            'cart': self.__cart
        }
=======
            return {
                'firstname': self.firstname,
                'lastname': self.lastname,
                'username': self.username,
                'cpf': self.cpf,
                'telefone': self.telefone,
                'email': self.email,
                'address': self.address,
                'password': self.password,
                'userID': self.userID,
                'cart': self.cart
            }
>>>>>>> 259e9f7af19468d60c589b5c3ae69ebe8675cd77
