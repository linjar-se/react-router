import React, { HTMLAttributes, MouseEvent, ReactElement, useContext } from "react";
import RouterContext from "./routerContext";

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}
export default function Link({ to: path, children }: LinkProps): ReactElement {
    const { forceUpdate } = useContext(RouterContext);
    function handleClick(ev: MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault();
        history.pushState(null, "", path);
        forceUpdate();
    }
    return (
        <a href={path} onClick={handleClick}>
            {children}
        </a>
    );
}
