class Error:
    def __init__(self, code, message):
        self.code = code
        self.message = message


ERRORS = {
    0: Error(0, "Unknown Error"),
    1: Error(1, "Incorrect Credentials. Please, try again."),
    2: Error(2, "User not found"),
    
}