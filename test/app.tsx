import { Router } from "@linears/react-router";
import React from "react";
import About from "./routes/about";
import Home from "./routes/home";
import Posts from "./routes/posts";

export default function App(): React.ReactElement {
    return (
        <Router
            routes={[
                {
                    path: "/",
                    component: Home,
                },
                {
                    path: "/about",
                    component: About,
                },
                {
                    path: "/posts/:userId/:postId",
                    component: Posts,
                },
            ]}
            fallback={<div>404 - page not found</div>}
        />
    );
}
