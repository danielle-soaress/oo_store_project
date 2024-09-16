import uuid
import json
from app.models.order import Order
from app.controllers.datarecord import DataRecord
from app.controllers.productrecord import ProductRecord

class OrderRecord:
    dtr = DataRecord()
    prc = ProductRecord()

    def __init__(self):
        self.__orders = []
        self.loadOrders()


    def loadOrders(self):
        try:
            with open("app/controllers/db/orders.json", "r") as arquivo_json:
                order_data = json.load(arquivo_json)
                self.__orders = [Order(**data) for data in order_data]
        except FileNotFoundError:
            # Handle the case when the file does not exist
            self.__orders = []
        except json.JSONDecodeError:
            # Handle JSON decoding errors
            self.__orders = []

    def addUserOrder(self, cart, userID, statusCode, totalPayment, payment):
        user = OrderRecord.dtr.getUserByID(userID)
        print('entrou aqui')
        if user:
            order_id = str(uuid.uuid4())
            order = Order(id=order_id, 
                          ownerID=userID,
                          status_code=statusCode, 
                          productsList=cart,
                          total=totalPayment,
                          paymentMethod=payment)
            
            self.__orders.append(order)
            OrderRecord.dtr.addOrder(userID, order_id)
            OrderRecord.dtr.saveUserCart(userID, [])
            self.saveOrders()

            with open("app/controllers/db/orders.json", "w") as arquivo_json:
                order_data = [vars(order) for order in self.__orders]
                json.dump(order_data, arquivo_json, indent=4)
            
            #==
            return order_id
        return False
    
    def saveOrders(self):
        with open("app/controllers/db/orders.json", "w") as arquivo_json:
            order_data = [vars(order) for order in self.__orders]
            json.dump(order_data, arquivo_json, indent=4)

    def getUserOrders(self, userID):
        user_orders = OrderRecord.dtr.getOrders(userID)
        print(user_orders)
        if user_orders:
            orders = []
            for user_order in user_orders:
                for order in self.__orders:
                    if order.id == user_order:
                        order_dict = order.toDict()
                        products = []
                        for product in order_dict['productsList']:
                            pcr = OrderRecord.prc.get_product(product['productId'])
                            product_dict = pcr.to_dict()
                            product_dict['quantity'] = product['quantity']
                            products.append(product_dict)
                        order_dict['productsList'] = products
                        orders.append(order_dict)
            print(orders)
            return orders
        return [] 