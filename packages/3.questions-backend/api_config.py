

authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

config = dict(version='1.0', title='Questions API',
             description='A simple Questions API',
             validate=True,
             authorizations=authorizations,
             security='apikey'
             )

