import path from 'path';

const createPath = (file: string) => path.resolve(__dirname, '../views', `${file}.ejs`);

module.exports = createPath;
