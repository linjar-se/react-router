const path = require("path");
const webpack = require("webpack");
webpack;
module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: ["./src/index.ts"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        clean: true,
        library: {
            type: "umd",
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/i,
                use: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
        },
        ReactDOM: {
            commonjs: "react-dom",
            commonjs2: "react-dom",
        },
    },
};
