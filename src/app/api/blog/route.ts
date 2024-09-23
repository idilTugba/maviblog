import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';

export async function GET(req: Request) {
  await dbConnect();
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  console.log(data);
  try {
    const newBlog = new BlogPost({
      title: data.title,
      content: data.content,
    });
    newBlog.save();
    return Response.json({ blog: data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || 'Blog bilinmeyen bir sebepten eklenemedi' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: error || 'Blog bilinmeyen bir sebepten eklenemedi' },
        { status: 500 }
      );
    }
  }
}
