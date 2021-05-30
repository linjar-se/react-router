import { Link, RouteProps } from "@linears/react-router";
import React from "react";

export default function Posts({ params }: RouteProps): React.ReactElement {
    return (
        <div>
            <div>Dynamic Param: {params["postId"]}</div>
            <Link to="/">Home</Link>
        </div>
    );
}
