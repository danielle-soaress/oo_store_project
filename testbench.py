from app.models.order import Order
from app.models.product import Product
from app.controllers.datarecord import DataRecord

def workspace():
    
    dtr = DataRecord()
    info = dtr.adminsInfo()
    
    print(info)


if __name__ == '__main__':
    workspace()