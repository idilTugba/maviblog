import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Ana sayfa</Link>
        </li>
        <li>
          <Link href="/about">Hakkında</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
