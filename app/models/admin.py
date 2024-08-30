from app.models.user_account import UserAccount
from app.models.product import Product

class Admin(UserAccount):
    def __init__(self, username, password):
        super().__init__(username, password)

    def createProduct(self):
        pass

    def editProduct(self):
        pass

    def deleteProduct(self):
        pass
    