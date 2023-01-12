import { handleAPIError } from "../helpers/handleAPIError";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(first_name && last_name && email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const oldUser = await User.findByEmail(email);

    if (oldUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      fullname: `${first_name} ${last_name}`,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    const user = await new User(userData);

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY ?? "",
      {
        expiresIn: process.env.EXPIRES_IN ?? "",
      }
    );

    user.token = token;
    user.create();

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

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(400).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY ?? "",
      {
        expiresIn: process.env.EXPIRES_IN ?? "",
      }
    );

    user.token = token;
    user.refreshToken();

    res.status(400).json(user);
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
