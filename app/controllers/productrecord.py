from app.models.product import Product
import json
import uuid

class ProductRecord:
    def __init__(self):
        self.__products = []
        self.read()

    def read(self):
        try:
            with open("app/controllers/db/products.json", "r") as arquivo_json:
                product_data = json.load(arquivo_json)
                self.__products = [Product(**data) for data in product_data]
        except FileNotFoundError:
            self.__products = []

    def generate_unique_id(self):
        while True:
            new_id = str(uuid.uuid4())
            if not any(product.id == new_id for product in self.__products):
                return new_id

    def create_product(self,name, price, category, connectivity, description, brand, colorStock, imageFileName):
        ProductID = self.generate_unique_id()
        new_product = Product(ProductID, name, price, category, connectivity, description, brand, colorStock, imageFileName)
        self.__products.append(new_product)
        self.save()
        return True

    def get_product(self, product_id):
        for product in self.__products:
            if product.id == product_id:
                return product
        return None
    
    def get_stockInfo(self, product_id):
        product = self.get_product(product_id)
        return product.stockStatus()

    def update_product(self, product_id, name=None, price=None, category = None, connectivity=None, description=None, brand=None):
        product = self.get_product(product_id)
        print(product)
        if product:
            if name:
                product.name = name
                print(product.name)
            if price:
                product.price = price
            if category:
                product.category = category
            if connectivity:
                product.connectivity = connectivity
            if description:
                product.description = description
            if brand:
                product.brand = brand
            self.save()
            return product
        return None
    
    def update_product_stock(self, product_id, color, quantitySold):
        product = self.get_product(product_id)
        if product:
            newColorStock = product.getStockForColor(color) - quantitySold
            if newColorStock >=0:
                product.setColorStock(color, newColorStock)
                self.save()
                return product
        return None

    def delete_product(self, product_id):
        self.__products = [product for product in self.__products if product.id != product_id]
        self.save()

    def save(self):
        with open("app/controllers/db/products.json", "w") as arquivo_json:
            product_data = [product.to_dict() for product in self.__products]
            json.dump(product_data, arquivo_json, indent=4)
