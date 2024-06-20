"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface formType {
  userName: string;
  password: string;
}

const loginValidateSchema = yup.object({
  userName: yup
    .string()
    .min(5, "username must be min 5 characters")
    .required("username required"),
  password: yup.string().required("password required"),
});

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(loginValidateSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const onSubmit = (data: formType) => console.log(data);
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-[400px] bg-[#fbfff4] p-[50px] flex-row gap-5 text-[#0e1514]	">
        <form
          className="contact-form respondForm__form row y-gap-20 pt-30"
          onSubmit={handleSubmit(console.log)}
        >
          <div className="relative">
            <input
              className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
              {...register("userName", { required: true, minLength: 5 })}
              placeholder="Username"
            />
            <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
              {errors.userName?.message}
            </p>
          </div>
          <div className="relative">
            <input
              className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
              {errors.password?.message}
            </p>
          </div>
          <button
            className="p-2 w-full text-[#fbfff4] bg-[#0e1514c2] hover:bg-[#0e1514ac] active:bg-[#0e15148f] focus:outline-none"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
