import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import { Redirect } from "./redirect";
import RouterContext from "./routerContext";

export interface RouteProps {
    params: { [key: string]: string };
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type Route<T = {}> = T & {
    path: string;
    component: ComponentType<RouteProps>;
    condition?: boolean;
    loadingComponent?: ReactElement;
    loading?: boolean;
    redirectPath?: string;
};

// if condition is false -> if loading is false -> redirect;
// if condition is false -> if loading is true -> render loadingComponent
// if condition is true -> if loading is false -> render component
// if condition is true -> if loading is true -> render loadingComponent

export interface RouterProps {
    routes: Route[];
    fallback?: ReactElement;
}
export function Router(props: RouterProps): ReactElement<RouterProps> {
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
            {route ? <CondtionalRoute route={route} /> : props.fallback ? props.fallback : null}
        </RouterContext.Provider>
    );
}

function destructurePath(route: string) {
    const path = route.endsWith("/") && route !== "/" ? route.slice(0, -1) : route;
    return path.slice(1).split("/");
}

function matchRoute(routes: Route[]): Route<RouteProps> | null {
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

    if (route) return { ...route, params };
    else return null;
}

function CondtionalRoute({ route }: { route: Route<RouteProps> }): ReactElement | null {
    const { component: Component, loadingComponent } = route;
    // If condtion is specified or it is true and not loading
    if (route.condition == null || (route.condition && !route.loading)) return <Component params={route.params} />;
    else if (route.loading) return loadingComponent ? loadingComponent : null;
    else if (!route.condition && route.redirectPath) return <Redirect to={route.redirectPath} />;
    else return null;
}
