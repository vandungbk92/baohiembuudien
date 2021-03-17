const path = require('path');
const webpack = require('webpack');
// const isDev = process.env.NODE_ENV === 'development';
const isDev = false;

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev } },
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev } },
          { loader: 'css-loader', options: { sourceMap: isDev } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer']
              },
            },
          },
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev } },
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2|mrt)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ]),
  resolve: {
    modules: [path.resolve(__dirname, '../app'), 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      '@constants': path.resolve(__dirname, '../app/constants/CONSTANTS.js'),
      '@url': path.resolve(__dirname, '../app/constants/URL.js'),
      '@api': path.resolve(__dirname, '../app/constants/API.js'),
      '@injectSaga': path.resolve(__dirname, '../app/utils/injectSaga.js'),
      '@injectReducer': path.resolve(__dirname, '../app/utils/injectReducer.js'),

      '@commons': path.resolve(__dirname, '../app/commons/'),
      '@containers': path.resolve(__dirname, '../app/containers/'),
      'Pages': path.resolve(__dirname, '../app/containers/Pages/'),
      '@assets': path.resolve(__dirname, '../app/assets/'),
      '@services': path.resolve(__dirname, '../app/services/'),
      '@components': path.resolve(__dirname, '../app/components/'),
      '@utils': path.resolve(__dirname, '../app/utils/'),
      '@reduxApp': path.resolve(__dirname, '../app/reduxApp/'),
      '@models': path.resolve(__dirname, '../app/models/'),
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
