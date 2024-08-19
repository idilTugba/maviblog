import Image from 'next/image';
import React from 'react';
import style from './style.module.scss';
import Items from './items';

const BlogDetail = () => {
  return (
    <div className={style.blogdetail}>
      <Image
        className=""
        src="/frankeinstein.jpeg"
        alt="image title"
        width={400}
        height={200}
      />
      <Items />
      <h1>LOREM IPSUM</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
        unde soluta omnis vero perspiciatis explicabo laboriosam facere, officia
        quo, minima quisquam ipsum repudiandae tenetur atque non sapiente et
        molestiae reprehenderit ad id, nobis commodi maxime! Odio et accusamus
        mollitia, porro, repellat dolores sint dicta vitae, ullam incidunt
        suscipit eaque quos. Sint molestias ut optio provident doloremque
        quibusdam iusto eaque corporis, voluptatum alias dolorum, est quae
        itaque earum doloribus vel harum tempora sunt nobis ea modi. Laudantium
        modi enim delectus error vitae, eaque provident, corrupti labore quam
        odio officia sint tempore iusto alias aspernatur. Quod, voluptatibus
        esse consequatur officiis voluptatum quo vero omnis rem aut? Error quod
        illo dolorem fuga nesciunt, nam illum amet! Expedita perferendis
        ducimus, quis modi incidunt eum tenetur atque sint, magni perspiciatis
        nostrum ratione ea deleniti est veniam temporibus!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
        unde soluta omnis vero perspiciatis explicabo laboriosam facere, officia
        quo, minima quisquam ipsum repudiandae tenetur atque non sapiente et
        molestiae reprehenderit ad id, nobis commodi maxime! Odio et accusamus
        mollitia, porro, repellat dolores sint dicta vitae, ullam incidunt
        suscipit eaque quos. Sint molestias ut optio provident doloremque
        quibusdam iusto eaque corporis, voluptatum alias dolorum, est quae
        itaque earum doloribus vel harum tempora sunt nobis ea modi. Laudantium
        modi enim delectus error vitae, eaque provident, corrupti labore quam
        odio officia sint tempore iusto alias aspernatur. Quod, voluptatibus
        esse consequatur officiis voluptatum quo vero omnis rem aut? Error quod
        illo dolorem fuga nesciunt, nam illum amet! Expedita perferendis
        ducimus, quis modi incidunt eum tenetur atque sint, magni perspiciatis
        nostrum ratione ea deleniti est veniam temporibus!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
        unde soluta omnis vero perspiciatis explicabo laboriosam facere, officia
        quo, minima quisquam ipsum repudiandae tenetur atque non sapiente et
        molestiae reprehenderit ad id, nobis commodi maxime! Odio et accusamus
        mollitia, porro, repellat dolores sint dicta vitae, ullam incidunt
        suscipit eaque quos. Sint molestias ut optio provident doloremque
        quibusdam iusto eaque corporis, voluptatum alias dolorum, est quae
        itaque earum doloribus vel harum tempora sunt nobis ea modi. Laudantium
        modi enim delectus error vitae, eaque provident, corrupti labore quam
        odio officia sint tempore iusto alias aspernatur. Quod, voluptatibus
        esse consequatur officiis voluptatum quo vero omnis rem aut? Error quod
        illo dolorem fuga nesciunt, nam illum amet! Expedita perferendis
        ducimus, quis modi incidunt eum tenetur atque sint, magni perspiciatis
        nostrum ratione ea deleniti est veniam temporibus!
      </p>
    </div>
  );
};

export default BlogDetail;
