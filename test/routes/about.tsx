import { Link } from "@linears/react-router";
import React from "react";

export default function About(): React.ReactElement {
    return (
        <div>
            <div>About Page</div>
            <Link to="/posts/xyz/abc">Dynamic Route</Link>
        </div>
    );
}
