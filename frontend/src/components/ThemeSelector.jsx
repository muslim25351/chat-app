import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    // Initialize theme-change library
    themeChange(false);

    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
        Theme
        <svg
          width="12px"
          height="12px"
          className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="m1799 349 242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-52 overflow-y-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 gap-3 p-3">
          {themes.map((theme) => (
            <div
              key={theme}
              className={`outline-base-content text-start outline-offset-4 outline-2 ${
                currentTheme === theme ? "outline" : ""
              }`}
              data-set-theme={theme}
              data-act-class="outline"
            >
              <div
                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                data-set-theme={theme}
                onClick={() => handleThemeChange(theme)}
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>
                  <div className="bg-base-300 col-start-1 row-start-3"></div>
                  <div className="bg-primary col-start-2 row-span-2 row-start-1"></div>
                  <div className="bg-primary-focus col-start-2 row-start-3"></div>
                  <div className="bg-secondary col-start-3 row-span-2 row-start-1"></div>
                  <div className="bg-secondary-focus col-start-3 row-start-3"></div>
                  <div className="bg-accent col-start-4 row-span-2 row-start-1"></div>
                  <div className="bg-accent-focus col-start-4 row-start-3"></div>
                  <div className="bg-neutral col-start-5 row-span-2 row-start-1"></div>
                  <div className="bg-neutral-focus col-start-5 row-start-3"></div>
                </div>
                <div className="bg-base-100 text-base-content col-start-1 col-span-5 row-start-1 row-span-3 flex flex-col gap-1 p-2">
                  <div className="font-bold text-sm capitalize">{theme}</div>
                  <div className="flex flex-wrap gap-1">
                    <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                      <div className="text-primary-content text-sm font-bold">
                        A
                      </div>
                    </div>
                    <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                      <div className="text-secondary-content text-sm font-bold">
                        A
                      </div>
                    </div>
                    <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                      <div className="text-accent-content text-sm font-bold">
                        A
                      </div>
                    </div>
                    <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                      <div className="text-neutral-content text-sm font-bold">
                        A
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
