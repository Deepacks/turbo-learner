const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const path = require('path')
const outputPath = 'dist'
const entryPoints = {
  main: [
    path.resolve(__dirname, 'src', 'main.ts'),

    path.resolve(__dirname, 'src', 'lib', 'http.ts'),
    path.resolve(__dirname, 'src', 'lib', 'renderer.ts'),
    path.resolve(__dirname, 'src', 'lib', 'scraper.ts'),

    path.resolve(__dirname, 'css', 'main.css'),
  ],
  background: path.resolve(__dirname, 'src', 'background.ts'),
}

module.exports = {
  entry: entryPoints,
  output: {
    path: path.join(__dirname, outputPath),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(sa|sc)ss$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        use: 'url-loader?limit=1024',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv(),
  ],
}
