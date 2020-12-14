const path = require("path");

module.exports = (env = {}) => ({
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "public/"),
        filename: "bundle.js",
    },
    mode: env.production ? "production" : "development",
    devtool: env.production ? "" : "inline-source-map",
    devServer: {
        contentBase: "./public",
    },
    module: {
        rules: [
            // js
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            // styles
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // images
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader: "file-loader",
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
            },
        ],
    },
});
