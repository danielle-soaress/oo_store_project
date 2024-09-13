class Message:
    def __init__(self, code, message):
        self.code = code
        self.message = message


MESSAGES = {
    0: Message(0, "Unknown Message"),
    1: Message(1, "Incorrect Credentials. Please, try again."),
    2: Message(2, "User not found"),
    3: Message(3, "You must be authenticated as an Admin to access management page."),
    4: Message(4, "You have been logged out")
}