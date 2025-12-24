import Navbar from './navbar';

const Header = () => {
  return (
    <>
      <div className="">
        <h1 className="text-4xl md:text-6xl lg:text-9xl pb-4 pt-4 border-solid border-b-2 border-primary-dark dark:border-primary-light lin font-chomsky font-semibold">
          mavi neşe gölcük
        </h1>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
