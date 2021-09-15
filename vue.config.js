module.exports = {
  publicPath: "./",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    output: {
      filename: "js/[name].js",
      chunkFilename: "js/[name].js",
    },
  },
  css: {
    extract: {
      ignoreOrder: true,
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    },

  },
};
