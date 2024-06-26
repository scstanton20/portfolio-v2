import { useEffect, useState, } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Tippy from '@tippyjs/react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as string;

        if (!storedTheme) {
            localStorage.setItem("theme", theme);
        } else {
            setTheme(storedTheme);
            storedTheme === "light" ? document.querySelector("html")?.classList.remove("dark") : null;
            storedTheme === "dark" ? document.querySelector("html")?.classList.add("dark") : null;
        }
    }, []);

    const changeTheme = (theme: string) => {
        const newTheme = theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        newTheme === "light"
            ? document.querySelector("html")?.classList.remove("dark")
            : document.querySelector("html")?.classList.add("dark");
    };

    return (
        <Tippy content={"Toggle Light/Dark"} interactive={true} placement={"bottom"} trigger={"mouseenter"}>
            <button
                aria-label="Theme-Toggle"
                className="p-2 rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                onClick={() => changeTheme(theme)}
            >
                {theme === "light" && <FiSun className="text-black w-6 h-6 xs:w-5 xs:h-5" />}
                {theme === "dark" && <FiMoon className="text-white w-6 h-6 xs:w-5 xs:h-5" />}
            </button>
        </Tippy>
    );
};

export default ThemeToggle;
