import React from "react";
import { Link } from "../../src/";
import { RouteProps } from "../../src/types";

export default function Posts({ params }: RouteProps): React.ReactElement {
    return (
        <div>
            <div>Dynamic Param: {params["postId"]}</div>
            <Link to="/">Home</Link>
        </div>
    );
}
