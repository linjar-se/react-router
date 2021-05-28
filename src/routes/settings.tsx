import { Switch } from "@headlessui/react";
import React from "react";
import useDarkTheme from "../utils/useDarkTheme";

export default function Settings(): React.ReactElement {
    const [darkTheme, setDarkTheme] = useDarkTheme();

    return (
        <Switch.Group as="div" className="flex items-center space-x-4">
            <Switch.Label className="text-base">Switch Theme</Switch.Label>
            <Switch
                checked={darkTheme}
                onChange={setDarkTheme}
                className={`${
                    darkTheme ? "bg-blue-400" : "bg-gray-200"
                } w-14 h-6 px-1 inline-flex items-center rounded-full transition-colors ease duration-200 cursor-pointer focus:outline-none focus-visible:ring-2  dark:focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    className={`${
                        darkTheme ? "translate-x-7" : "translate-x-0"
                    } transform w-5 h-5 bg-white rounded-full transition ease duration-200`}
                ></span>
            </Switch>
        </Switch.Group>
    );
}
