"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface formType {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        fullname
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client {
      id
      username
      fullname
    }
  }
`;

const loginValidateSchema = yup.object({
  username: yup
    .string()
    .min(5, "username must be min 5 characters")
    .required("username required"),
  password: yup.string().required("password required"),
});

export const dynamic = "force-dynamic";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(loginValidateSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const client = useApolloClient();

  const [mutateFunction, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onSubmit = useCallback(
    async (data: formType) => {
      try {
        const response = await mutateFunction({
          variables: {
            username: data.username,
            password: data.password,
          },
        });
        // console.log("Login successful:", response.data);
        const { token, user } = response.data.login;
        sessionStorage.setItem("user", token);
        client.writeQuery({
          query: GET_CURRENT_USER,
          data: { currentUser: user },
        });

        router.push("/");
      } catch (err: any) {
        console.warn("Login Error: ", err.message);
      }
    },
    [mutateFunction, client, router]
  );

  return (
    <div className="w-[400px] dark:bg-primary-light bg-primary-dark p-[50px] flex-row gap-5 dark:text-primary-dark text-primary-light	">
      <form
        className="contact-form respondForm__form row y-gap-20 pt-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            className="p-2 bg-[#fcf5e5] mb-6 w-full focus:outline-none"
            {...register("username", { required: true, minLength: 5 })}
            placeholder="Username"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.username?.message}
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
        {error && (
          <p className="text-red-600 font-thin mt-2">{error.message}</p>
        )}
        <button
          className="p-2 w-full dark:text-primary-light text-primary-dark dark:bg-primary-dark bg-primary-light hover:bg-[#0e1514ac] active:bg-[#0e15148f] focus:outline-none"
          type="submit"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
