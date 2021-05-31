# Linears React Router

A small yet effective React router.

# Getting Started

## Install

You can install the package using:

```
npm i @linears/react-router

# Or using yarn

yarn add @linears/react-router

```

## Router Component

`Router` takes the routes infomration in `routes` prop. Every route is required to have a path and component. The path is the url where the `component` is rendered. The component should be a reference and shouldn't be called.

```tsx
import { Router } from "@linears/react-router";
import About from "./routes/about";
import Home from "./routes/home";

const App = () => (
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
        ]}
        fallback={<div>404 - page not found</div>}
    />
);
```

## Link Component

The `Link` takes the path in `to` prop and whenever it is clicked, it will navigate to the path without refreshing the page.

```tsx
import { Link } from "@linears/react-router";

const MyLink = () => <Link to="/path/to/other/router">About</Link>;
```

## useRouter hook

The `useRouter` allows you to change the route.

```tsx
import { useRouter } from "@linears/react-router";

const Component = () => {
    const router = useRouter();
    return <button onClick={() => router.push("/path/to/somewhere")} />;
};
```

# Use cases

## Rendering pages conditionally

To render page conditionally you need add a `condition` property to a route. If condition is met, the component is rendered.

If you set `loading` property to `true`, the `loadingComponent` component will be rendered as long as it is `true`.

Finally if both `loading` and `condition` is `falsy` the component will redirect to `redirectPath`;

```tsx
import { Router } from "@linears/react-router";
import Profile from "./routes/Profile";

const App = () => (
    <Router
        routes={[
            /* ... */
            {
                path: "/profile",
                component: Profile,
                condition: false,
                loading: false,
                loadingComponent: <div>Loading</div>,
                redirectPath: "/about",
            },
        ]}
        fallback={<div>404 - page not found</div>}
    />
);
```

The example aboce will redirect to `/about`, because the route condition has not been met and it is not loading.

## Rendering dynamic routes

If you add `:` at a begnning of an "endpoint", it will be considered dynamic and will match any value.

Both the endpoint and the value will be passed to component's props as params. Take look at the example:

```tsx
import { Router } from "@linears/react-router";

const App = () => (
    <Router
        routes={[
            /* ... */
            {
                path: "/posts/:userId/:postId", // Will match e.g. /posts/abc/xyz
                component: Profile,
            },
        ]}
        fallback={<div>404 - page not found</div>}
    />
);

const Profile = ({ params }) => {
    const postId = params["postId"];

    return; // render something
};
```
