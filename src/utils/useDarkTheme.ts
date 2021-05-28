import { useState } from "react";

export default function useDarkTheme(): [boolean, (ans: boolean) => void] {
    const [state, setState] = useState(localStorage?.theme === "dark");

    function setDarkTheme(ans: boolean) {
        if (ans) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }

        setState(ans);
    }

    return [state, setDarkTheme];
}
