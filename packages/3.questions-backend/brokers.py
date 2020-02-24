from collections import namedtuple

Broker = namedtuple("Broker", "id email")

##Mock data
brokersIdList = [
    Broker(1, "admin@faralla.com.ar"),
    Broker(2, "admin@casebonne.com.ar"),
    Broker(3, "admin@icortese.com.ar"),
    Broker(40, "fcellini@broker.com")
]

def get_broker_by_email(email):
    if not email or not brokersIdList:
        return None
    for broker in brokersIdList:
        if broker.email.lower() == email.lower():
            return broker
    return None