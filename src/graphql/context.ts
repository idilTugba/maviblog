import User from "../models/User";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
}

export const createContext = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const user = await User.findById(decoded.id);
      return { user };
    } catch (e) {
      console.warn("Unable to authenticate user with token");
    }
  }
  return {};
};
