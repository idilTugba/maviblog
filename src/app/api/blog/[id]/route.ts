import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    console.log('BLOG ID', params.id);
    const blog = await BlogPost.findById(params.id);
    if (!blog) Response.json({ error: 'Blog bulunamadı' }, { status: 404 });
    return Response.json({ blog }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || 'Blog alınırken bir hata oluştu' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: error || 'Blog alınırken bir hata oluştu' },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const data = await req.json();
    const blog = await BlogPost.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    if (!blog) {
      return Response.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }
    return Response.json({ blog }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || 'Blog güncellenirken bir hata oluştu' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: error || 'Blog güncellenirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }
}
