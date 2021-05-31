import { useContext } from "react";
import RouterContext from "./routerContext";

export interface RedirectProps {
    to: string;
}
export function useRouter(): { push: (path: string) => void } {
    const { forceUpdate } = useContext(RouterContext);

    function push(path: string) {
        history.pushState(null, "", path);
        forceUpdate();
    }

    return { push };
}
