class Product:
    def __init__(self, id, name, price, productType, description, brand):
        self.__id = id
        self.__name = name
        self.__price = price
        self.__type = productType
        self.__description = description
        self.__brand = brand

    def getId(self):
        return self.__id
    
    def getName(self):
        return self.__name
    
    def setPrice(self, price):
        self.__price = price

    def getPrice(self):
        return self.__price
    
    def setType(self, tipo):
        self.__type = tipo
    
    def getType(self):
        return self.__type
    
    def setDescription(self, description):
        self.__description = description
    
    def getDescription(self):
        return self.__description
    
    def setBrand(self, brand):
        self.__brand = brand
    
    def getBrand(self):
        return self.__brand