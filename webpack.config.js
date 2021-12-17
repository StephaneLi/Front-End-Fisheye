const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Verification de l'environnement de developpement
const dev = process.env.NODE_ENV === "development"
console.log(__dirname + '/public/js')

let config = {
  mode: process.env.NODE_ENV,
  watch: dev,
  entry: {
    app_index: ['./scripts/index.js', './scss/style_index.scss'],
    app_profil: ['./scripts/profil.js', './scss/style_profil.scss']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/js',
  },
  devtool: dev ? "eval-cheap-module-source-map" : "source-map",
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [          
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'../css/[name].css'
    })
  ],
}

if(!dev) {
  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}

module.exports = config