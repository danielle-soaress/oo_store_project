class Product:
    def __init__(self, id, name, price, category, connectivity, description, brand, stock, imageFileName):
        self.__id = id
        self.__name = name
        self.__price = price
        self.__category = category
        self.__connectivity = connectivity
        self.__description = description
        self.__brand = brand
        self.__stock = stock
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

    @property
    def stock(self):
        return self.__stock
    
    @stock.setter
    def stock(self, value):
        self.__stock = value

    def stockStatus(self):
        if self.__stock > 0:
            return 'In Stock'
        elif self.__stock == 0:
            return 'Sold Out'
        else:
            return 'Undefined'
        
    def creditCardPrice(self):
        return (0.04*self.__price + self.__price)
        
    def creditCardParcels(self):
        parcels_quantity = 1
        parcels_price = self.creditCardPrice()

        while (parcels_price > 100):
            parcels_quantity+=1
            parcels_price = self.creditCardPrice()/parcels_quantity

        if parcels_quantity > 12:
            parcels_quantity = 12
            parcels_price = self.creditCardPrice()/parcels_quantity  
             
        return [parcels_quantity, f'{parcels_price:.2f}']

    def to_dict(self):
        return {
            "id": self.__id,
            "name": self.__name,
            "price": self.__price,
            "category": self.__category,
            "connectivity": self.__connectivity,
            "description": self.__description,
            "brand": self.__brand,
            "stock": self.__stock,
            "imageFileName": self.__imageFileName,
        }
