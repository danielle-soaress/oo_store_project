from app.models.order_status import STATUS

class Order:
    def __init__(self, id, ownerID, status_code: int, productsList, total, paymentMethod):
        self.id = id
        self.ownerID = ownerID
        self.status_code = status_code
        self.productsList = productsList
        self.total = total
        self.paymentMethod = paymentMethod

    def countProducts(self, produto_id):
        return self.productsList.get(produto_id, 0)

    def addProduct(self, product_id, quantity):
        if product_id in self.productsList:
            self.productsList[product_id] += quantity
        else:
            self.productsList[product_id] = quantity

    def removeProduct(self, product_id):
        if product_id in self.productsList:
            del self.productsList[product_id]

    def editProductQuantity(self, product_id, nova_quantidade):
        if nova_quantidade <= 0:
            self.removeProduct(product_id)
        else:
            self.productsList[product_id] = nova_quantidade

    def toDict(self):
        return {
            "id": self.id,
            "ownerID": self.ownerID,
            "status": f'{STATUS.get(self.status_code, 0 ).orderStatus}',
            "productsList": self.productsList,
            "total": self.total,
            "paymentMethod": self.paymentMethod
        }
