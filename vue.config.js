module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://my7e1b4mje.execute-api.us-east-1.amazonaws.com/gogoads',
                changeOrigin: true,
                ws: true,
                secure: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
