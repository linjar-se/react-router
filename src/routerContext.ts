import { createContext } from "react";

interface ContextProps {
    forceUpdate: () => void;
}

const RouteContext = createContext<ContextProps>({
    forceUpdate: () => null,
});

export default RouteContext;
