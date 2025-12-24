import dbConnect from '@/utils/dbconnect';
import BlogPost from '@/models/Blog';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Next.js 14'te params Promise olabilir
    const resolvedParams = await Promise.resolve(params);
    console.log('Like API - Blog ID:', resolvedParams.id);
    
    await dbConnect();
    
    const blog = await BlogPost.findById(resolvedParams.id);
    if (!blog) {
      console.log('Like API - Blog bulunamadı:', resolvedParams.id);
      return Response.json({ error: 'Blog bulunamadı' }, { status: 404 });
    }

    // Like sayısını artır
    const currentLikes = blog.like ?? 0;
    blog.like = currentLikes + 1;
    blog.updatedAt = new Date();
    
    console.log('Like API - Mevcut like:', currentLikes);
    console.log('Like API - Yeni like:', blog.like);
    
    await blog.save();
    
    // Kayıt sonrası tekrar kontrol et
    const savedBlog = await BlogPost.findById(resolvedParams.id);
    const finalLikeCount = savedBlog?.like ?? blog.like;
    
    console.log('Like API - Kaydedilen like:', finalLikeCount);

    const updatedBlog = savedBlog?.toJSON() || blog.toJSON();

    return Response.json(
      { 
        blog: updatedBlog, 
        like: finalLikeCount
      }, 
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || 'Like eklenirken bir hata oluştu' },
        { status: 500 }
      );
    } else {
      return Response.json(
        { error: error || 'Like eklenirken bir hata oluştu' },
        { status: 500 }
      );
    }
  }
}

