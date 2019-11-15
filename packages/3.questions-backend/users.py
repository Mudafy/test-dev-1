from collections import namedtuple


User = namedtuple("User", "name email password role")


BROKER = "broker"
ADMIN = "admin"


admins = [
    User("Matías B", "matias@siprop.com", "totally safe password", ADMIN),
    User("Franco F", "franco@siprop.com", "pass123", ADMIN),
]


brokers = [
    User("faralla", "admin@faralla.com.ar", "1231231", BROKER),
    User("fasebonne", "admin@casebonne.com.ar", "maybe123", BROKER),
    User("icortese", "admin@icortese.com.ar", "not123", BROKER),
]

everyone = admins + brokers


def get_user(email, database):
    if not email or not database:
        return None
    for user in database:
        if user.email.lower() == email.lower():
            return user
    return None


def save_user(name, email, pasword, role=BROKER):
    raise NotImplementedError("We didn't have enough time to code this")


def check_user(email, password):
    user = get_user(email, everyone)
    if not user:
        return None
    print(user.password, password, password == user.password)
    return user.password == password
