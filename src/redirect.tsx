import { useContext, useEffect } from "react";
import RouterContext from "./routerContext";

export interface RedirectProps {
    to: string;
}
export function Redirect({ to: path }: RedirectProps): null {
    const { forceUpdate } = useContext(RouterContext);
    useEffect(() => {
        history.pushState(null, "", path);
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);
    return null;
}
