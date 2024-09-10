from abc import abstractmethod, ABC
from app.controllers.productrecord import ProductRecord

class Cart(ABC):

    prc = ProductRecord()
    freight = 30.00
    
    @abstractmethod
    def totalCash(cart):
        detailed_cart = Cart.prc.get_cart_products(cart)
        total = 0
        for item in detailed_cart:
            total += item["productPrice"]*item["quantity"]
        return [total, total+30.00]
    
    @abstractmethod
    def totalCreditCard(cart):
        detailed_cart = Cart.prc.get_cart_products(cart)
        total = 0
        for item in detailed_cart:
            itemPrice = item["productPrice"]
            total += (itemPrice*0.04+ itemPrice)*item["quantity"]
        return [total, total+30.00]
    
    @abstractmethod 
    def installmentsPrice(self, numberParcels, totalCreditCard):
        return totalCreditCard/numberParcels
    
    @abstractmethod
    def totalInstallments(cart):
        detailed_cart = Cart.prc.get_cart_products(cart)
        total = 0
        for item in detailed_cart:
            total += item["productPrice"]*item["quantity"]
        return total

    @abstractmethod
    def quantityOfProducts(cart):
        return len(cart)
    
    @abstractmethod
    def productsName(cart):
        detailed_cart = Cart.prc.get_cart_products(cart)
        names = []
        for item in detailed_cart:
            names.append(item["productName"])
        return names
    
    
