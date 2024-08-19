import React from 'react';
import Input from '../formElements/input';

const Footer = () => {
  return (
    <footer className="p-5 mb-5 border-t-2 border-b-2 border-solid border-primary-dark dark:border-primary-light">
      <div>
        <p>Bülten üyeliği için</p>
        <div className="mt-3">
          <Input placeholder="E-posta yaz" />
          <button>Gönder</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
