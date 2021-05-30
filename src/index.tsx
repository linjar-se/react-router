import React, { MouseEvent, useEffect, useState } from "react";
import { LinkProps, MatchedRoute, Route, RouterProps } from "./types";

let action: () => void;

export function Link({ to: path, children }: LinkProps): React.ReactElement {
    function handleClick(ev: MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault();
        history.pushState(null, "", path);
        action();
    }
    return (
        <a href={path} onClick={handleClick}>
            {children}
        </a>
    );
}

export function Router(props: RouterProps): React.ReactElement<{ params: { [key: string]: string } }> | null {
    // Initilize Router
    const [, setState] = useState(0);
    useEffect(() => {
        action = () => setState((state) => state + 1);
        function handlePopstate(event: PopStateEvent) {
            event.preventDefault();

            if (!event.state) setState((state) => state + 1);
        }

        addEventListener("popstate", handlePopstate);
        return () => {
            removeEventListener("popstate", handlePopstate);
        };
    }, []);

    const route = matchRoute(
        props.routes.map((route) => {
            const routeSegments = destructurePath(route.path);
            return {
                path: route.path,
                endpoints: routeSegments.map((endpoint) => {
                    const dynamic = endpoint.startsWith(":");
                    return { endpoint: dynamic ? endpoint.slice(1) : endpoint, dynamic };
                }),
                component: route.component,
            };
        }),
    );
    if (route) {
        return route.component;
    } else if (props.fallback) return props.fallback;
    else return null;
}

function destructurePath(route: string) {
    const path = route.endsWith("/") && route !== "/" ? route.slice(0, -1) : route;
    return path.slice(1).split("/");
}

function matchRoute(routes: Route[]): MatchedRoute | null {
    const pathnameSegments = destructurePath(location.pathname);
    let params: { [key: string]: string } = {};

    const route = routes.find((route) => {
        params = {};
        return route.endpoints.every(({ endpoint, dynamic }, index) => {
            return route.endpoints.length === pathnameSegments.length && dynamic
                ? !!pathnameSegments[index] && !!(params[endpoint] = pathnameSegments[index])
                : endpoint === pathnameSegments[index];
        });
    });

    if (route) {
        const Component = route.component;
        const component = <Component params={params} />;
        return { ...route, component };
    } else return null;
}
