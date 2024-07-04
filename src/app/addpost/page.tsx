"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { error } from "console";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface formType {
  title: string;
  content: string;
}

const postValidateSchema = yup.object({
  title: yup
    .string()
    .min(5, "Title must be min 5 chracter")
    .required("Must be a title"),
  content: yup
    .string()
    .min(200, "Content must be min 200 chracter")
    .required("Must be a content"),
});

const AddPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(postValidateSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmitForm = useCallback(async (data: formType) => {
    try {
      await console.log(data);
    } catch (err: any) {}
  }, []);

  return (
    <div className="container mt-5 ">
      <h2 className="mt-5 mb-5 text-center">Add new blog post</h2>
      <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="relative">
          <input
            {...register("title")}
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
            {...register("content")}
            className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
            name="content"
            placeholder="Content"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.content?.message}
          </p>
        </div>
        <div className="relative">
          <button>Post It</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
