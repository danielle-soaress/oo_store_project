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
        self.orders = []

    def toDict(self):
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
                'cart': self.cart,
                'orders': self.orders
            }
