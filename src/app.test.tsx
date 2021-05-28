import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import React from "react";

import App from "./app";

test("Render currectly", () => {
    render(<App />);
});
