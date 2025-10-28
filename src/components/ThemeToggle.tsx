"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Tooltip from './Tooltip';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<string | null>(null);

    // Initialize theme after hydration
    useEffect(() => {
        // Get theme from localStorage or default to dark
        const storedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
        const initialTheme = storedTheme || "dark";

        // Apply theme class to html element
        const htmlElement = document.documentElement;
        if (initialTheme === "dark") {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }

        // Save to localStorage if not already set
        if (typeof window !== 'undefined' && !localStorage.getItem("theme")) {
            localStorage.setItem("theme", initialTheme);
        }

        // Only set state once with the initial theme
        // This setState is necessary for SSR hydration with localStorage
        // eslint-disable-next-line
        setTheme(initialTheme);
    }, []);

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        // Apply theme class to html element
        const htmlElement = document.documentElement;
        if (newTheme === "dark") {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    };

    // Prevent flash of unstyled content
    if (theme === null) {
        return null;
    }

    return (
        <Tooltip content="Toggle Light/Dark">
            <button
                aria-label="Theme-Toggle"
                className="p-2 rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                onClick={changeTheme}
            >
                {theme === "light" && <FiSun className="text-black w-6 h-6 xs:w-5 xs:h-5" />}
                {theme === "dark" && <FiMoon className="text-white w-6 h-6 xs:w-5 xs:h-5" />}
            </button>
        </Tooltip>
    );
};

export default ThemeToggle;
