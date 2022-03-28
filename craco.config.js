module.exports = {

    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // eslint-disable-next-line no-param-reassign
            webpackConfig.devServer = {
                historyApiFallback: true,
                proxy: {
                  "*": {
                    target: "https://services.admixplay.com",
                    secure: false,
                    changeOrigin: true,
                  },
                },
              }
            return webpackConfig;
        },
    },
}