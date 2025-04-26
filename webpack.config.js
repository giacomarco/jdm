const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "jdm.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        library: "Jdm",
        libraryTarget: "umd",
        globalObject: "this",
    },
    experiments: {
        outputModule: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackShellPluginNext({
            onAfterBuild: {
                scripts: ["npm run docs:markdown", "npm run docs"],
                blocking: false,
                parallel: false,
            },
        }),
    ],
    devServer: {
        static: "./dist",
        port: 3000,
        open: true,
    },
    mode: "production",
    devtool: "source-map",
};
