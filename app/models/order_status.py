class OrderStatus:
    def __init__(self, code, orderStatus):
        self.code = code
        self.orderStatus = orderStatus

    @classmethod
    def get_status(cls, code):
        return STATUS.get(code, None)

STATUS = {
    0: OrderStatus(0, "Processing"),
    1: OrderStatus(1, "Sent"),
    2: OrderStatus(2, "Delivered"),
    3: OrderStatus(3, "Canceled"),
    4: OrderStatus(4, "Refunded")
}
