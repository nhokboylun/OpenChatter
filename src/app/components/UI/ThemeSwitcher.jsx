"use client";
import { useTheme } from "next-themes";
import Button from "./Button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function ThemeSwitcher({ responsive }) {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === "light");

  useEffect(() => {
    theme === "system"
      ? setTheme("light") && setEnabled(false)
      : setEnabled(theme === "dark");
  }, [setTheme, theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div
      className={`rounded-full relative ${responsive} ${
        enabled ? "bg-blue-900" : "bg-yellow-200"
      }`}
    >
      <div
        className={`absolute z-0 bg-white w-1/2 h-full rounded-full shadow-md transform duration-300 ease-in-out ${
          enabled ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>

      <Button className="rounded-full flex z-10 gap-4" onClick={toggleTheme}>
        <SunIcon
          className={`rounded-full md:w-6 md:h-6 w-4 h-4 z-10 ${
            !enabled ? "opacity-100 text-yellow-400" : "opacity-0"
          }`}
        />
        <MoonIcon
          className={`rounded-full md:w-6 md:h-6 w-4 h-4 z-10 ${
            enabled ? "opacity-100 text-black" : "opacity-0"
          }`}
        />
      </Button>
    </div>
  );
}

export default ThemeSwitcher;
