'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

interface formType {
  title: string;
  content: string;
}

const postValidateSchema = yup.object({
  title: yup
    .string()
    .min(5, 'Title must be min 5 chracter')
    .required('Must be a title'),
  content: yup
    .string()
    .min(200, 'Content must be min 200 chracter')
    .required('Must be a content'),
});

const AddPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(postValidateSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const handleSubmitForm: SubmitHandler<formType> = useCallback(
    async (data: formType) => {
      setLoading(true);
      try {
        console.log(data);
        const res = await axios.post(
          `${window.location.origin}/api/blog`,
          data
        );

        const blog = res.data;
        console.log(blog);
        setError('');
      } catch (err: any) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    },
    []
  );

  if (error) return `Submission error! ${error}`;

  return (
    <div className="container mt-5 ">
      <h2 className="mt-5 mb-5 text-center">Add new blog post</h2>
      <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="relative">
          <input
            {...register('title')}
            className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
            type="text"
            name="title"
            placeholder="Title"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.title?.message}
          </p>
        </div>
        <div className="relative">
          <textarea
            {...register('content')}
            className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
            name="content"
            placeholder="Content"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.content?.message}
          </p>
        </div>
        <div className="relative">
          <button>{loading ? 'Submitting...' : 'Post It'}</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
