class Product:
    def __init__(self, id, name, price, category, connectivity, description, brand, colorStock, imageFileName):
        self.__id = id
        self.__name = name
        self.__price = price
        self.__category = category
        self.__connectivity = connectivity
        self.__description = description
        self.__brand = brand
        self.__colorStock = colorStock
        self.__imageFileName = imageFileName

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, value):
        self.__price = value

    @property
    def category(self):
        return self.__category

    @category.setter
    def category(self, value):
        self.__category = value

    @property
    def connectivity(self):
        return self.__connectivity

    @connectivity.setter
    def connectivity(self, value):
        self.__connectivity

    @property
    def description(self):
        return self.__description

    @description.setter
    def description(self, value):
        self.__description = value

    @property
    def brand(self):
        return self.__brand

    @brand.setter
    def brand(self, value):
        self.__brand = value

    @property
    def imageFileName(self):
        return self.__imageFileName
    
    @imageFileName.setter
    def imageFileName(self, value):
        self.__imageFileName = value


    
    def setColorStock(self, color, quantity):
        self.__colorStock[color] = quantity

    def getColorStock(self):
        return self.__colorStock

    def getStockForColor(self, color):
        return self.__colorStock.get(color, 0)
    
    
    def getColors(self): # this function gets all product colors
        colors = []
        for chave, valor in self.__colorStock.items():
            colors.append(str(chave))
        return colors
    
    def getStock(self): # this function gets the quantity of products in stock.
        quantity = 0
        for chave, valor in self.__colorStock.items():
            quantity+= valor
        return quantity
    
    def colorStockStatus(self, color):
        if self.getStockForColor(color) == 0:
            return 'Sold Out'
        else:
            return 'In Stock'
        
    def stockStatus(self):
        if self.getStock() == 0:
            return 'Sold Out'
        else:
            return 'In Stock'

    def to_dict(self):
        return {
            "id": self.__id,
            "name": self.__name,
            "price": self.__price,
            "category": self.__category,
            "connectivity": self.__connectivity,
            "description": self.__description,
            "brand": self.__brand,
            "colorStock": self.__colorStock,
            "imageFileName": self.__imageFileName,
        }
