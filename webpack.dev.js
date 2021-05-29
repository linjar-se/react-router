const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    mode: "development",
    entry: ["./test/index.tsx"],
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/i,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./test/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./**/*.{ts,tsx}",
            },
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        port: 4000,
    },
};
