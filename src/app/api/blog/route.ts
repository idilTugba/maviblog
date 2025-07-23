import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';

export async function GET() {
  await dbConnect();
  try {
    const data = await BlogPost.find();
    // console.log('Blog data:', data);
    return Response.json({ blogs: data }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || 'Data alınamadı' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: error || 'Data alınamadı' },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  try {
    const newBlog = new BlogPost({
      title: data.title,
      content: data.content,
      category: data.category,
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
