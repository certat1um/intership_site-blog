import path from 'path';

export const createPath = (file: string): string => path.resolve(__dirname, '../views', `${file}.ejs`);
