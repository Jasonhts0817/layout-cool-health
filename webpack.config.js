// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: {
    coolhealth: "./src/scss/coolhealth.scss",
    "coolhealth-rwd": "./src/scss/coolhealth-rwd.scss",
    "coolhealth-sidebar": "./src/scss/coolhealth-sidebar.scss",
    "coolhealth-color-type": "./src/scss/coolhealth-color-type.scss",
  },
  optimization: {
    removeEmptyChunks: true,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: false,
      inject: !isProduction,
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/css", to: "./css" },
        { from: "src/fonts", to: "./fonts" },
        { from: "src/images", to: "./images" },
        { from: "src/js", to: "./js" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { url: false } },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: { sassOptions: { outputStyle: "expanded" } },
          },
        ],
      },
    ],
  },
  target: "web",
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
