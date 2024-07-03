import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogPost from "@/models/Blog";
export async function POST(req: NextRequest) {
  await mongoose.connect(
    "mongodb+srv://mavinese:mavikezogego@maviblog.voaf4zo.mongodb.net/mydatabase"
  );

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
    return NextResponse.json({ message: "Blog added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding blog", details: error },
      { status: 500 }
    );
  } finally {
    mongoose.connection.close();
  }
}
