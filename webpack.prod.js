const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["react-hot-loader/patch", "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        clean: true,
    },
    stats: {
        errorDetails: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                use: "babel-loader",
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                use: {
                    loader: "@svgr/webpack",
                    options: {
                        svgoConfig: {
                            plugins: {
                                removeViewBox: false,
                            },
                        },
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "./",
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: "./src/service-worker.js",
        }),
        new PreloadWebpackPlugin({
            rel: "preload",
            as: "font",
            include: "allAssets",
            fileWhitelist: [/\.(woff2?|eot|ttf|otf)(\?.*)?$/i],
        }),
    ],
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
};
