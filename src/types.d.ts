import React, { HTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export interface Route<E> extends E {
//     path: string;
//     endpoints: {
//         endpoint: string;
//         dynamic: boolean;
//     }[];
//     component: React.ReactElement;
// }

export type Route<T = unknown> = T & {
    path: string;
    endpoints: {
        endpoint: string;
        dynamic: boolean;
    }[];
    component: React.ComponentType<RouteProps>;
};

export interface MatchedRoute {
    path: string;
    component: React.ReactElement;
}

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}

export interface Endpoints {
    endpints?: {
        endpoint: string;
        dynamic: boolean;
    }[];
}

export interface RouteProps {
    params: { [key: string]: string };
}
export interface RouterProps {
    routes: {
        path: string;
        component: React.ComponentType<RouteProps>;
    }[];
    fallback?: React.ReactElement;
}
