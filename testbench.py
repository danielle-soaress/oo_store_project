from app.models.order import Order
from app.models.product import Product
from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord

def workspace():
    
    dtr = ProductRecord()
    

    dtr.update_product('124', name = 'VISHHHH')

    product = dtr.get_product('124')
    print(product.name)


if __name__ == '__main__':
    workspace()