module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/http': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
};
