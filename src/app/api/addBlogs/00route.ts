// import mongoose from 'mongoose';
// import BlogPost from '@/models/Blog';
// import dbConnect from '@/utils/dbconnect';

// export const POST = async (req: Request, res: Response) => {
//   await dbConnect();

//   try {
//     const blog = new BlogPost({
//       title: 'Lorem Ipsum Data Convert',
//       content: 'string',
//       authorId: new mongoose.Types.ObjectId('6680461f6c6d9d539de0910b'),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       images: [
//         'https://www.istanbulsanatevi.com/wp-content/uploads/2015/12/vincent-van-gogh-yildizli-gece-tablosu.jpg',
//       ],
//       videos: ['video'],
//     });

//     await blog.save();
//     return new Response(
//       JSON.stringify({ message: 'Blog added successfully' }),
//       {
//         status: 201,
//       }
//     );
//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({ error: 'Error adding blog', details: error.message }),
//       { status: 500 }
//     );
//   } finally {
//     mongoose.connection.close();
//   }
// };

// export const GET = async () => {
//   return new Response('Method GET Not Allowed', { status: 405 });
// };
