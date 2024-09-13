class OrderStatus:
    def __init__(self, code, OrderStatus):
        self.code = code
        self.orderStatus = OrderStatus


STATUS = {
    0: OrderStatus(0, "Processing"),
    1: OrderStatus(1, "Sent"),
    2: OrderStatus(2, "Delivered"),
    3: OrderStatus(3, "Canceled"),
    4: OrderStatus(4, "Refunded")
}