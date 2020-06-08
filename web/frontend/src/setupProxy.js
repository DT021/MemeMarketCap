const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/refreshToken',
        createProxyMiddleware({
            target: 'http://backend:5000',
            changeOrigin: true,
        })
    );
    app.use(
        '/upload',
        createProxyMiddleware({
            target: 'http://backend:5000',
            changeOrigin: true,
        })
    );
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'http://backend:5000',
            changeOrigin: true,
        })
    );
}; 