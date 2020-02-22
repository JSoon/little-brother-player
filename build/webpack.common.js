const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publicDate = require('./date'); // 发布日期
const banner = require('./banner');
const constants = require('./constants');

const ENV = process.env.NODE_ENV || 'development'; // 当前环境变量
const INPUT_NAME = 'app.js'; // 播放器js源
const OUTPUT_NAME = 'little.brother.player'; // 播放器js最终文件

console.log('当前运行环境:', ENV);

module.exports = {
  // mode对webpack的一些内建优化配置项的开启有关系，必须指定，否则会导致一些功能在不同模式下不起作用
  // https://webpack.js.org/configuration/mode/#root
  mode: ENV,
  entry: {
    [OUTPUT_NAME]: path.resolve(constants.srcPath, INPUT_NAME)
  },
  output: {
    filename: '[name].js',
    path: path.resolve(constants.publicPath, publicDate),
    publicPath: '/', // chunks resources base path
    // https://webpack.js.org/configuration/output/#outputlibrarytarget
    library: 'littleBrother', // window.littleBrother
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    openPage: 'src/test',
    contentBase: constants.rootPath,
    watchContentBase: false,
    compress: true,
    port: 9000,
    watchOptions: {
      ignored: [
        'node_modules',
        'bower_components',
        'utils/**/*'
      ],
      aggregateTimeout: 1000
    }
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/,
        // 注：同一规则下，use中的loader会依照数组索引顺序执行
        use: [
          // // Creates `style` nodes from JS strings
          // {
          //     loader: 'style-loader',
          //     options: {
          //         injectType: 'singletonStyleTag'
          //     },
          // },
          // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: constants.publicPath,
              hmr: ENV === 'development',
            },
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              // https://github.com/webpack-contrib/sass-loader/issues/46
              // https://github.com/webpack-contrib/css-loader#url
              // url解析交给postcss-url来执行，避免冲突
              url: false,
              // Allows you to configure how many loaders before css-loader should be applied to @imported resources
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // parser: 'sugarss',
              // exec: true,
              ident: 'postcss',
              plugins: (loader) => [
                // 解析@import
                // require('postcss-import')({
                //     // root: loader.resourcePath
                //     // root: constants.rootPath
                // }),
                // 解析url()
                require('postcss-url')([
                  // 压缩字体图标
                  {
                    filter: /icons\/flowplayer\./,
                    url: 'inline',
                    encodeType: 'base64'
                  },
                  // 压缩图片，并复制不需要压缩的图片
                  {
                    filter: /\/img\/.*\.(jpe?g|png|gif|svg)$/,
                    url: 'inline',
                    encodeType: 'base64',
                    maxSize: 10,
                    fallback: 'copy',
                    assetsPath: path.resolve(constants.publicPath, publicDate, 'img'),
                    useHash: true
                  },
                  // 重写样式表中的图片url路径（自定义）
                  {
                    multi: true,
                    filter: /\/img\/.*\.(jpe?g|png|gif|svg)$/,
                    url: (asset) => {
                      // console.log(asset);
                      // xxx/yyy/img/foo.gif -> img/foo.gif
                      var parsedUrl = asset.url.replace(/.*\/(img\/.*)/, '$1');
                      return parsedUrl;
                    }
                  }
                ]),
                require('postcss-preset-env')(),
                // 压缩css
                // ENV === 'production' ? require('cssnano')() : ''
              ]
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: ENV === 'production' ? {
                fiber: false,
                outputStyle: 'compressed'
              } : {
                fiber: false
              },
            },
          }
        ],
      }
    ]
  },
  resolve: {
    alias: {
      '@': constants.rootPath,
      '~': constants.srcPath
    }
  },
  externals: {
    $: 'jQuery',
    jquery: 'jQuery',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 200 * 1024, // kb
      // minRemainingSize: 0, // introduced in webpack 5
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        hls: {
          test: /[\\/]node_modules[\\/]_?hls\.js(.*)/, // in order to adapt to cnpm
          name: `${OUTPUT_NAME}.hls`, // split chunk into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
        },
        // defaultVendors: {
        // 	test: /[\\/]node_modules[\\/]/,
        // 	priority: -10
        // },
        // default: {
        // 	minChunks: 2,
        // 	priority: -20,
        // 	reuseExistingChunk: true
        // }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin(
      // https://webpack.js.org/plugins/provide-plugin/
      // Automatically load modules instead of having to import or require them everywhere.
      Object.assign(providePlugin())
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.BannerPlugin({
      banner: (yourVariable) => {
        return banner;
      }
    })
  ]
};

//#region ProvidePlugin
function providePlugin() {
  // const plugins = Object.assign(utilsPlugin(), {
  //   ENUMS: '~/js/enums/index'
  // })

  const plugins = {
    Utils: ['~/js/utils/index', 'default'],
    Enums: '~/js/enums/index',
    Coms: ['~/js/components/index', 'default'],
    Global: ['~/js/global', 'default']
  }

  console.log(plugins)

  return plugins
}

function utilsPlugin() {
  let files = []
  let plugin = {}

  files = fs.readdirSync(path.resolve(constants.srcPath, 'js/utils'))

  files.forEach(file => {
    if (/\.js$/.test(file)) {
      let fileName = file
      let pluginName = file.replace('.js', '').toLocaleUpperCase()
      plugin[pluginName] = `~/js/utils/${fileName}`
    }
  });

  return plugin
}
//#endregion