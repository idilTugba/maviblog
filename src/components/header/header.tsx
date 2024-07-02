"use client";

import { useTheme } from "@/context/themeContext";

const Header = () => {
  const { theme, handleToggleTheme } = useTheme();

  return (
    <>
      <div className="relative">
        <button
          onClick={handleToggleTheme}
          className="p-2 font-bold absolute left-0 bg-primary-dark text-primary-light dark:bg-primary-light dark:text-primary-dark"
        >
          Toggle to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <h1 className="text-9xl pb-4 pt-4 border-solid border-b-2 border-primary-dark dark:border-primary-light lin font-chomsky font-semibold">
          mavi neşe gölcük
        </h1>
      </div>
    </>
  );
};

export default Header;
