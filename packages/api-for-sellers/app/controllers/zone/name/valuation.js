'use strict';

/**
 * Get statistical information about a zone. Returns:
 *  - An object that contains key value pairs with operation as key and
 *    a nested object of property type and min, max, mean and std deviation.
 *
 * Example (not actual data):
 *
 *  /api/v1/zone/flores/valuation
 *     {
 *        "2": {
 *          "7": {
 *            "min": 78000,
 *            "max": 190000,
 *            "mean": 134000,
 *            "stddev": 5400
 *          },
 *          "2": {
 *            "min": 78000,
 *            "max": 190000,
 *            "mean": 134000,
 *            "stddev": 5400
 *          },
 *          ...
 *        },
 *        "1": { ... }
 *     }
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function zoneNameValuationController(req, res) {
  res.send('This is a sample controller. :)');
};
