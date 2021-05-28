declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    import React = require("react");

    const ReactComponent: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    export default ReactComponent;
}

declare module "*.module.css";
declare module "*.css";
