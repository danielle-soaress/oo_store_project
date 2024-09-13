class Order:
    def __init__(self, id, ownerID, data, status, productsList):
        self.__id = id
        self.__ownerID = ownerID
        self.__status = status
        self.__productsList = productsList  # Dictionary {produto_id: quantidade}

    @property
    def ownerID(self):
        return self.__ownerID
    
    @property
    def id(self):
        return self.__id
    
    @property
    def status(self):
        return self.__status

    def countProducts(self, produto_id):
        return self.__productsList.get(produto_id, 0)

    def addProduct(self, product_id, quantity):
        if product_id in self.__productsList: # if the product is already in order, it quantity will be incremented.
            self.__productsList[product_id] += quantity
        else: # if it does not exist in order, it will be added
            self.__productsList[product_id] = quantity

    def removeProduct(self, product_id):
        if product_id in self.__productsList:
            del self.__productsList[product_id]

    def editProductQuantity(self, product_id, nova_quantidade):
        if nova_quantidade <= 0: # if the new quantity <= 0, the product will be deleted.
            self.removeProduct(product_id)
        else:
            self.__productsList[product_id] = nova_quantidade

    def countProducts(self, produto_id):
        return self.__productsList.get(produto_id, 0) ## return 0 if the product doesnt exist.
