import bcrypt from "bcryptjs";
import { handleAPIError } from "../helpers/handleAPIError";
import { Request, Response } from "express";
import { User } from "../models/User";

const registerUser = async (
  req: Request,
  res: Response
): Promise<Request | void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All inputs are required");
      return;
    }

    const oldUser = await User.findByEmail(email);

    if (oldUser !== null) {
      res.status(409).send("User already exists. Please login");
      return;
    }

    const userData = {
      fullname: `${first_name} ${last_name}`,
      email,
      password,
    };

    const user = await new User().create(userData);

    res.status(201).json(user);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const loginUser = async (
  req: Request,
  res: Response
): Promise<Request | void> => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All inputs are required");
      return;
    }

    const user = await User.findByEmail(email);

    if (user === null) {
      res.status(404).send("User not found");
      return;
    }

    if (!(await bcrypt.compare(password, user.password)) || user === null) {
      res.status(400).send("Invalid Credentials");
      return;
    }

    const result = await User.refreshUserToken(user._id, user.email);

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const welcomeUser = async (
  req: Request,
  res: Response
): Promise<Request | void> => {
  try {
    res.status(200).send("Welcome!");
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { registerUser, loginUser, welcomeUser };
