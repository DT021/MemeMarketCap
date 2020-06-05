import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app: any): void {
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