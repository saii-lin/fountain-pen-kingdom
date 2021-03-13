const path = require("path");
const vueLoader = require("vue-loader");

module.exports = {
  title: "Beanfun! 星球主頁 Style Guide",
  components: "components/**/*.vue",
  getComponentPathLine(componentPath) {
    const componentFileName = path.basename(componentPath, ".vue");
    const name =
      componentFileName.toLowerCase() === "index"
        ? path.basename(path.dirname(componentPath))
        : componentFileName;
    return `import ${name} from '~/${componentPath.replace(/\\/g, "/")}'`;
  },
  require: [path.join(__dirname, "./assets/stylesheets/styleguide.scss")],
  webpackConfig: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".css", ".scss"],
      alias: {
        "~": __dirname,
        "@": __dirname
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              scss: ["vue-style-loader", "css-loader", "sass-loader"]
            }
          }
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(css?|scss)(\?.*)?$/,
          loader: "style-loader!css-loader!sass-loader"
        }
      ]
    },
    plugins: [new vueLoader.VueLoaderPlugin()]
  },
  usageMode: "expand",
  assetsDir: "./static",
  exampleMode: "expand",
  displayOrigins: true,
  styleguideDir: "./static/styleguide"
};