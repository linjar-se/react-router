import React from "react";
import { Link } from "../../src";
export default function About(): React.ReactElement {
    return (
        <div>
            <div>About Page</div>
            <Link to="/posts/xyz/abc">Dynamic Route</Link>
        </div>
    );
}
