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
          Anadolu üniversitesinde Felsefe okudu. Sevim Burak ve Turgut Uyar’ın
          büyük kapılarından geçerken sihirlendiği edebiyatla ilişkisinin
          “yazgı” olduğuna karar vererek bu yazgıyı okumaya çalıştı. Bu ça
          lışmanın ilk sonucu olan 1997-2005 yılları arasında yazdığı öyküleri
          topladığı kitabı Kar Beyrut Kar, Agora Kitaplığı’ndan 2006’da
          yayımlandı. İkinci sonucu olan Soğuk Ses, ilk kitabında da
          gözlemlediği “kafesler” hakkında bir romandır ve 2014 yılında Duygu
          Asena roman ödülünde “özgün dili ve psikolojik derinliği “ sebebiyle
          övgüye değer roman olarak değerlendirilmiştir. Bilim, Bütüncül Tıp,
          Budizm ve Sufizm ile ilgilenen, Diyarbakır, İzmir, Londra ve
          İstanbul’da yaşamış olan yazar halen İstanbulda yaşıyor ve kafesleri
          ve gökleri gözlemeye devam ediyor.
        </span>
      </p>
    </div>
  );
};

export default AboutPage;
