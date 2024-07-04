import mongoose from "mongoose";
import BlogPost from "@/models/Blog";
import dbConnect from "@/utils/dbconnect";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    await dbConnect();

    try {
      const blog = new BlogPost({
        title: "Lorem Ipsum Data Convert",
        content: "string",
        authorId: new mongoose.Types.ObjectId("6680461f6c6d9d539de0910b"),
        createdAt: new Date(),
        updatedAt: new Date(),
        images: [
          "https://www.istanbulsanatevi.com/wp-content/uploads/2015/12/vincent-van-gogh-yildizli-gece-tablosu.jpg",
        ],
        videos: ["video"],
      });

      await blog.save();
      res.status(201).json({ message: "Blog added successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error adding blog", details: error.message });
    } finally {
      mongoose.connection.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
