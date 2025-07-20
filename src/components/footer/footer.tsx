'use client';

import React from 'react';
import { useState } from 'react';
import Input from '../formElements/input';
import styleText from './style.module.scss';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('Lütfen geçerli bir e-posta adresi girin.');
      return;
    } else {
      setStatus('');
    }         

     try {
      const res = await fetch('/api/subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setStatus(errorData.error || 'Abonelik sırasında bir hata oluştu.');
        return;
      }
      const data = await res.json();
      setStatus(data.message || 'Abonelik başarılı!');
      setEmail(''); // Clear the input field after successful subscription

    } catch (error) {
      console.error('Abonelik hatası:', error);
      setStatus('Abonelik sırasında bir hata oluştu.');
      return;
    } 
  };
  return (
    <footer className="p-5 mb-5 border-t-2 border-b-2 border-solid border-primary-dark dark:border-primary-light">
      <div>
        <p>Bülten üyeliği ile güncel yazılardan haberdar olun<br />
            <span className="text-primary-dark dark:text-primary-light"> e-posta adresinizi girin:</span></p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="mt-3">
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-posta" />
            <button className={'bg-primary-dark  dark:bg-primary-light text-primary-light dark:text-primary-dark '+ styleText.sub_but} type="submit" onSubmit={handleSubmit}>Gönder</button>
            {status && <p className="text-red-500">{status}</p>}
        </div>
          </form>
            <br />
      </div>
    </footer>
  );
};

export default Footer;
