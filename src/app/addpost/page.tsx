'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

interface formType {
  title: string;
  content: string;
  category: string;
  images?: string[];
  videos?: string;
  featured?: boolean;
}

const postValidateSchema = yup.object({
  title: yup
    .string()
    .min(5, 'Başlık en az 5 karakter olmalıdır')
    .required('Başlık gereklidir'),
  content: yup
    .string()
    .min(50, 'İçerik en az 50 karakter olmalıdır')
    .required('İçerik gereklidir'),
  category: yup.string().required('Kategori seçiniz'),
  images: yup.array().of(yup.string()).optional().default([]),
  videos: yup.string().optional().default(''),
  featured: yup.boolean().optional().default(false),
}) as yup.ObjectSchema<formType>;

const AddPost = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formType>({
    resolver: yupResolver(postValidateSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
      images: [],
      videos: '',
      featured: false,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Authentication kontrolü
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmitForm: SubmitHandler<formType> = useCallback(
    async (data: formType) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        // Boş olmayan resim URL'lerini filtrele
        const validImages = imageUrls.filter((url) => url.trim() !== '');

        const formData = {
          ...data,
          images: validImages.length > 0 ? validImages : undefined,
          videos: data.videos?.trim() || undefined,
        };

        console.log('Form data:', formData);

        // Token'ı header'a ekle
        const token = sessionStorage.getItem('token');
        if (!token) {
          setError('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          router.push('/admin/login');
          return;
        }

        const res = await axios.post(
          `${window.location.origin}/api/blog`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const blog = await res.data;
        console.log('Blog eklendi:', blog);

        setSuccess('Blog yazısı başarıyla eklendi!');
        reset();
        setImageUrls(['']);

        // 2 saniye sonra ana sayfaya yönlendir
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err: any) {
        console.error('Hata:', err);
        setError(err.response?.data?.error || err.message || 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    },
    [imageUrls, reset, router]
  );

  // Loading state - authentication kontrolü yapılırken
  if (isCheckingAuth) {
    return (
      <div className="container mt-5 max-w-4xl mx-auto px-4">
        <div className="text-center py-10">
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Authentication yoksa hiçbir şey render etme (zaten redirect olacak)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mt-5 max-w-4xl mx-auto px-4">
      <h2 className="mt-5 mb-8 text-3xl font-bold text-center">
        Yeni Blog Yazısı Ekle
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
        {/* Başlık */}
        <div className="relative">
          <label className="block mb-2 font-semibold">Başlık *</label>
          <input
            {...register('title')}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            type="text"
            placeholder="Blog yazısının başlığını girin"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* İçerik */}
        <div className="relative">
          <label className="block mb-2 font-semibold">İçerik *</label>
          <textarea
            {...register('content')}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white min-h-[300px]"
            placeholder="Blog yazısının içeriğini girin (paragraflar için çift satır sonu kullanın)"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Kategori */}
        <div className="relative">
          <label className="block mb-2 font-semibold">Kategori *</label>
          <select
            {...register('category')}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Kategori seçiniz</option>
            <option value="Makale">Makale</option>
            <option value="Alıntı">Alıntı</option>
            <option value="Soğuk Ses">Soğuk Ses</option>
            <option value="Kar Beyrut Kar">Kar Beyrut Kar</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Resim URL'leri */}
        <div className="relative">
          <label className="block mb-2 font-semibold">
            Resim URL&apos;leri
          </label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Resim URL ${index + 1} (örn: /resim.jpg)`}
                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImageField(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageField}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            + Resim Ekle
          </button>
        </div>

        {/* Video URL */}
        <div className="relative">
          <label className="block mb-2 font-semibold">Video URL</label>
          <input
            {...register('videos')}
            type="text"
            placeholder="YouTube embed URL (örn: https://www.youtube.com/embed/VIDEO_ID)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Featured Checkbox */}
        <div className="relative">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('featured')}
              type="checkbox"
              className="w-5 h-5"
            />
            <span className="font-semibold">Özel Seçki Olarak İşaretle</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="relative">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Kaydediliyor...' : 'Blog Yazısını Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
