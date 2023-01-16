import { handleAPIError } from "../helpers/handleAPIError";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const oldUser = await User.findByEmail(email);

    if (oldUser === null) {
      return res.status(409).send("User already exists. Please login");
    }

    const fullname = `${first_name} ${last_name}`;
    const user = await new User().create([fullname, email, password]);

    res.status(201).json(user);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findByEmail(email);

    if (
      !(
        user &&
        ((await bcrypt.compare(password, user.password)) || user === null)
      )
    ) {
      return res.status(400).send("Invalid Credentials");
    }

    const result = await User.refreshUserToken(user._id, user.email);

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const welcomeUser = async (req: Request, res: Response) => {
  try {
    res.status(200).send("Welcome!");
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { registerUser, loginUser, welcomeUser };
