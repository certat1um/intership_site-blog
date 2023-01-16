import jwt from "jsonwebtoken";

export const createToken = (user_id: string, email: string): string => {
  const token = jwt.sign(
    {
      user_id: user_id,
      email,
    },
    process.env.TOKEN_KEY ?? "",
    {
      expiresIn: process.env.EXPIRES_IN ?? "",
    }
  );

  return token;
};
