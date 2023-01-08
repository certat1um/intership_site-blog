import { Request, Response } from "express";
import { createPath } from "../helpers/createPath";

const getHomepage = (req: Request, res: Response) => {
  const title = "Home";

  res.render(createPath("index"), { title });
};

const getContactsPage = (req: Request, res: Response) => {
  const title = "Contacts";

  res.render(createPath("contacts"), { title });
};

export { getHomepage, getContactsPage };
