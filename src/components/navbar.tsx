import React from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/logo.svg";

export default function Navbar(): React.ReactElement {
    return (
        <nav className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-white">
            <div className="container mx-auto flex items-center space-x-8 py-2 px-4">
                <Link to="/" className="focus:outline-none focus:ring-2 ring-offset-blue-600 rounded-md">
                    <span className="sr-only">Home</span>
                    <Logo className="h-12 w-12" />
                </Link>
                <NavLink
                    className="hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ring-offset-blue-600"
                    activeClassName="bg-gray-900 dark:bg-gray-600 dark:bg-opacity-40 hover:bg-gray-900 !text-white"
                    to="/"
                    exact
                >
                    Home
                </NavLink>
                <NavLink
                    className="hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ring-offset-blue-600"
                    activeClassName="bg-gray-900 dark:bg-gray-600 dark:bg-opacity-40 hover:bg-gray-900 !text-white"
                    to="/settings"
                    exact
                >
                    Settings
                </NavLink>
            </div>
        </nav>
    );
}
