const path = require('path')
// vite.config.js # or vite.config.ts

module.exports = {
    alias: {
        // 键必须以斜线开始和结束
        '@/': path.resolve(__dirname, './src')
    },
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: '/',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: 'dist',
    // 反向代理
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
}
