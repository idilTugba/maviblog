import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';
import { getAuthUser } from '@/utils/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  await dbConnect();
  try {
    // En yeni yazılar en üstte olacak şekilde sırala (createdAt'e göre azalan)
    const data = await BlogPost.find().sort({ createdAt: -1 });
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
  // Authentication kontrolü
  const user = getAuthUser(req);
  if (!user) {
    return Response.json(
      { error: 'Yetkilendirme gerekli. Lütfen giriş yapın.' },
      { status: 401 }
    );
  }

  await dbConnect();
  const data = await req.json();
  try {
    const newBlog = new BlogPost({
      title: data.title,
      content: data.content,
      category: data.category,
      featured: data.featured || false,
      images: data.images && data.images.length > 0 ? data.images : undefined,
      videos: data.videos || undefined,
      like: 0,
    });
    const savedBlog = await newBlog.save();

    // On-demand revalidation: Yeni blog eklendiğinde sayfaları yeniden oluştur
    try {
      // Ana sayfayı yeniden oluştur
      revalidatePath('/');
      
      // Blog listesi sayfasını yeniden oluştur
      revalidatePath('/blog');
      
      // Yeni blog sayfasını yeniden oluştur
      revalidatePath(`/blog/${savedBlog._id}`);

      console.log('✅ Revalidation triggered for new blog:', savedBlog._id);
    } catch (revalidateError) {
      // Revalidation hatası blog kaydını engellemesin
      console.error('⚠️ Revalidation error (non-blocking):', revalidateError);
    }

    return Response.json({ blog: savedBlog.toJSON() }, { status: 201 });
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
