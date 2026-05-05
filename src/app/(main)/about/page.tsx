import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';

const AboutPage = () => {
  return (
    <div className={`${style.aboutPage} mt-5 text-justify`}>
      <p>
        <Image
          className="inline-block float-left mr-6"
          src="/mavinese.jpeg"
          alt="Mavi Neşe Gölcük"
          width={250}
          height={250}
        />

        <span>
          1975 Diyarbakır doğumlu olan yazar aslen Çermiklidir. Diyarbakır’da
          Nükhet Coşkun Akyol ilkokulunda, orta ve lise öğrenimini Ziya Gökalp
          Lisesinde tamamladı. Ege Üniversitesinde Eczacılık Fakültesi ve
          Anadolu üniversitesinde Felsefe okudu.
        </span>
      </p>
    </div>
  );
};

export default AboutPage;
