import fs from 'fs';

import ReactDOMServer from 'react-dom/server';
import React from 'react';

import { logger } from '../commons';
import render from '../../client/server.jsx';

module.exports = function reactMiddleware(req, res, next) {

  try {
    logger.debug('server side rendering');
    const rendered = render();
    res.send(rendered);
  } catch (err) {
    return next(err);
  }
};
