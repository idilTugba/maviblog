import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import BlogPost, { IBlogPost } from "../models/Blog";

interface IContext {
  user?: IUser;
}

export const resolvers: IResolvers = {
  Query: {
    allPosts: async () => {
      return await BlogPost.find();
    },
    blogPost: async (_: unknown, { id }: { id: string }) => {
      return await BlogPost.findById(id);
    },
    user: async (_: unknown, { username }: { username: string }) => {
      return await User.findOne({ username });
    },
  },
  Mutation: {
    createBlogPost: async (
      _: unknown,
      { title, content, images, videos }: IBlogPost,
      context: IContext
    ) => {
      if (!context.user) throw new Error("Not authenticated");
      const newPost = new BlogPost({
        title,
        content,
        images,
        videos,
        authorId: context.user._id,
      });
      return await newPost.save();
    },
    login: async (
      _: unknown,
      { username, password }: { username: string; password: string }
    ) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");
      const token = jwt.sign(
        { id: user._id, username: user.username, fullname: user.fullname },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      return { token, user };
    },
  },
};
