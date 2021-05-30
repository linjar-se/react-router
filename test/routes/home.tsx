import { Link } from "@linears/react-router";
import React from "react";

export default function Home(): React.ReactElement {
    return (
        <div>
            <div>Home Page</div>
            <Link to="/about">About</Link>
        </div>
    );
}
