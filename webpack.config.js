const HtmlWebpackPlugin = require("html-plugin-webpack");
const path = require("path");

module.exports = {
    mode:"development",
  entry: "./src/index.js",
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

plugins: [
    new HtmlWebpackPlugin({
        template: "./src/template.html",
    })
],
module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(mp3|wav)$/, // Match audio files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Custom name format for output
              outputPath: 'audio/', // Output directory for audio files
            },
          },
        ],
      },
    ],
  
    
  },
};

