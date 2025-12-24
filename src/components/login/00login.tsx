'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';

interface formType {
  username: string;
  password: string;
}

const loginValidateSchema = yup.object({
  username: yup
    .string()
    .min(5, 'Kullanıcı adı en az 5 karakter olmalıdır')
    .required('Kullanıcı adı gereklidir'),
  password: yup.string().required('Şifre gereklidir'),
});

export const dynamic = 'force-dynamic';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: yupResolver(loginValidateSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (data: formType) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${window.location.origin}/api/auth/login`,
          {
            username: data.username,
            password: data.password,
          }
        );

        const { token, user } = response.data;
        
        // Token'ı sessionStorage'a kaydet
        sessionStorage.setItem('token', token);
        
        console.log('Login successful:', user);
        
        // Ana sayfaya yönlendir
        router.push('/');
      } catch (err: any) {
        console.error('Login Error:', err);
        setError(
          err.response?.data?.error ||
            err.message ||
            'Giriş yapılırken bir hata oluştu'
        );
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  //   password : "gogekezomavi"
  // username : "mavinese"
  return (
    <div className="w-[400px] dark:bg-primary-light bg-primary-dark p-[50px] flex-row gap-5 dark:text-primary-dark text-primary-light	">
      <form
        className="contact-form respondForm__form row y-gap-20 pt-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <input
            className="p-2 bg-[#fcf5e5] text-primary-dark mb-6 w-full focus:outline-none"
            {...register('username', { required: true, minLength: 5 })}
            placeholder="Username"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.username?.message}
          </p>
        </div>
        <div className="relative">
          <input
            className="p-2 bg-[#fcf5e5] text-primary-dark mb-6 w-full focus:outline-none"
            {...register('password', { required: true })}
            placeholder="Password"
          />
          <p className="absolute bottom-1 pl-2 text-sm text-red-600 font-thin">
            {errors.password?.message}
          </p>
        </div>
        {error && (
          <p className="text-red-600 font-thin mt-2">{error}</p>
        )}
        <button
          className="p-2 w-full dark:text-primary-light text-primary-dark dark:bg-primary-dark bg-primary-light hover:bg-[#0e1514ac] active:bg-[#0e15148f] focus:outline-none"
          type="submit"
        >
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
};

export default Login;
