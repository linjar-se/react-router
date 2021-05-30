import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import RouterContext from "./routerContext";
// export type Route<T = unknown> = T & {
//     path: string;
//     endpoints: {
//         endpoint: string;
//         dynamic: boolean;
//     }[];
//     component: ComponentType<RouteProps>;
// };

export interface RouteProps {
    params: { [key: string]: string };
}
interface Route {
    path: string;
    condition: Promise<boolean> | (() => boolean) | boolean | null;
    while: ComponentType;
    component: ComponentType<RouteProps>;
}
export interface RouterProps {
    routes: Route[];
    fallback?: ReactElement;
}
export default function Router(props: RouterProps): ReactElement<RouteProps> | null {
    const [, update] = useState(0);
    // Function that change Route state for renderering
    const forceUpdate = () => update((state) => state + 1);

    useEffect(() => {
        // Listen the borwser forward and background buttons
        function handlePopstate(event: PopStateEvent) {
            event.preventDefault();

            if (!event.state) forceUpdate();
        }
        addEventListener("popstate", handlePopstate);
        return () => {
            removeEventListener("popstate", handlePopstate);
        };
    }, []);

    const route = matchRoute(props.routes);

    return (
        <RouterContext.Provider value={{ forceUpdate }}>
            {route ? route.component : props.fallback ? props.fallback : null}
        </RouterContext.Provider>
    );
}

function destructurePath(route: string) {
    const path = route.endsWith("/") && route !== "/" ? route.slice(0, -1) : route;
    return path.slice(1).split("/");
}

export interface MatchedRoute {
    path: string;
    component: ReactElement;
}
function matchRoute(routes: Route[]): MatchedRoute | null {
    const pathnameSegments = destructurePath(location.pathname);
    let params: { [key: string]: string } = {};

    const route = routes.find((route) => {
        const routeSegments = destructurePath(route.path);

        // Go through routeSegments and see if every endpoint is dynamic or not
        const endpoints = routeSegments.map((endpoint) => {
            const dynamic = endpoint.startsWith(":");
            return { endpoint: dynamic ? endpoint.slice(1) : endpoint, dynamic };
        });

        params = {};

        // return route if every static endpoint matches exactly
        // or if every dynamic endpoint exists
        // add dynamic values to params object
        return endpoints.every(({ endpoint, dynamic }, index) =>
            endpoints.length === pathnameSegments.length && dynamic
                ? !!pathnameSegments[index] && !!(params[endpoint] = pathnameSegments[index])
                : endpoint === pathnameSegments[index],
        );
    });
    if (route) {
        const Component = route.component;
        // Pas params to component
        const component = <Component params={params} />;
        return { ...route, component };
    } else return null;
}
