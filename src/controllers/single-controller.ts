import { Request, Response } from "express";

const createPath = require('../helpers/createPath');

const getHomepage = (req: Request, res: Response) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
};

const getContactsPage = (req: Request, res: Response) => {
  const title = 'Contacts';

  res.render(createPath('contacts'), { title });
};

module.exports = {
  getHomepage,
  getContactsPage,
};
