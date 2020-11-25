const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const localHost = 'http://localhost:4001';

module.exports = {
  entry: './src/main/front/index.js',
  output: {
    path: path.resolve(__dirname + '/src/main/back/', 'static'),
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|svg|ttf|ico)([\?]?.*)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: localHost,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/main/front/index.html'
    }),
  ]
};
