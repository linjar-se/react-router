import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

// Style
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "./global.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("SW has be registered");
            })
            .catch(() => {
                console.log("SW failed");
            });
    });
}
