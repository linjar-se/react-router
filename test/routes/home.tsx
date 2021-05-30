import React from "react";
import { Link } from "../../src/";

export default function Home(): React.ReactElement {
    return (
        <div>
            <div>Home Page</div>
            <Link to="/about">About</Link>
        </div>
    );
}
