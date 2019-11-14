'use strict';

const commons = require('../commons');
const { get } = commons.repository('properties');

const masterLogger = commons.logger.child({ controller: 'properties' });

module.exports = function propertiesController(req, res) {
  const logger = masterLogger.child({ fn: 'propertiesController' });
  logger.debug('received request')
  const datasource = get();
  const body = {};

  const onError = (err) => { logger.error(err); res.status(500).send('oopsie') };
  const onFinished = () => { res.json(body); };

  datasource.subscribe((property) => {
    logger.trace(property);
    body[property.id] = property;
  }, onError, onFinished);
};
