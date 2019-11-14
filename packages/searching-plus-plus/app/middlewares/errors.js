'use strict';

module.exports = function errorMiddleware(logger) {
  return function errorLogger(err, req, res, next) {
    if (err instanceof Error) {
      logger.error(err);
      res.status(500).json({ reason: err.name });
      return;
    }
    next(err);
  };
};
