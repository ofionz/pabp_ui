module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    output: {
      filename: "js/[name].js",
      chunkFilename: "js/page-[name].js",
    },
  },
  css: {
    extract: {
      ignoreOrder: true,
      filename: "css/[name].css",
      chunkFilename: "css/page-[name].css",
    },
  },
};
