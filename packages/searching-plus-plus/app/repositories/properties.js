'use strict';

const Rx = require('rx');
const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const commons = require('../commons');
const logger = commons.logger.child({ repository: 'properties' });
const parseExtrasString = require('../extras-parser');

module.exports = {}

function fromRecord(record) {
  return {
    id: record[0],
    state: record[1],
    operation: record[2],
    bldgType: record[3],
    valuation: record[4],
    province: record[5],
    area: record[6],
    county: record[7],
    street: record[8],
    number: record[9],
    date: record[10],
    surface: record[11],
    extra: parseExtrasString(record[12])
  };
}

function readFile(filename) {
  const subject = new Rx.Subject();
  const parser = parse();

  parser.on('readable', function () {
    let record;
    while (record = parser.read()) {
      subject.onNext(fromRecord(record));
    }
  });

  parser.on('error', function (err) {
    logger.error(err);
  });

  parser.on('finish', function () {
    logger.debug({ msg: 'finished loading file', filename: filename });
    subject.onCompleted();
  });

  fs.createReadStream(filename).pipe(parser);
  return subject.asObservable();
}

module.exports.get = function get() {
  const filename = path.join(__dirname, '../datasets/properties.csv')
  return readFile(filename);
}
