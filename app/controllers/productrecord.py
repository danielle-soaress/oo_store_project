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

    def create_product(self, name, price):
        new_product = Product(name, price)
        self.__products.append(new_product)
        self.save()
        return new_product

    def get_product(self, product_id):
        for product in self.__products:
            if product.product_id == product_id:
                return product
        return None

    def update_product(self, product_id, name=None, price=None):
        product = self.get_product(product_id)
        if product:
            if name:
                product.name = name
            if price:
                product.price = price
            self.save()
            return product
        return None

    def delete_product(self, product_id):
        self.__products = [product for product in self.__products if product.product_id != product_id]
        self.save()

    def save(self):
        with open("app/controllers/db/products.json", "w") as arquivo_json:
            product_data = [product.to_dict() for product in self.__products]
            json.dump(product_data, arquivo_json)