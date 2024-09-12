
class UserAccount():
    def __init__(self, firstname, lastname, username, email, address, password, userID):
        self.firstname = firstname
        self.lastname = lastname
        self.username= username
        self.email = email
        self.address = address
        self.password= password
        self.userID = userID
        self.cart = []

    def toDict(self):
            return {
                'firstname': self.firstname,
                'lastname': self.lastname,
                'username': self.username,
                'email': self.email,
                'address': self.address,
                'password': self.password,
                'userID': self.userID,
                'cart': self.cart
            }