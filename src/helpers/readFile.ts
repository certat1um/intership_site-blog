import fs from 'fs';

const createPath = require('./createPath');

const readFile = (filename: string, callback: any): any => {
  fs.readFile(createPath(filename), 'utf-8', callback);
};

module.exports = readFile;
