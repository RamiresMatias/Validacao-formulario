const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/script.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          context: __dirname,
          configFile: require.resolve('./tsconfig.json'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src', 'assets', 'js'),
  },
  devtool: 'source-map',
}
