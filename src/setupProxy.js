/*
 * @Date: 2020-04-27 21:36:57
 * @LastEditTime: 2020-07-03 15:06:48
 * @Description: 设置接口代理
 */

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use('/group1', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/dossier-server', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/EAMS', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/PT', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/DM', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/Zzjg', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/matter', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/api-auth/', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/api/', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/app-web', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/swgl', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/apm/rlzy', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/ywcx', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/apm/common', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/getSqlData$m=query.service', createProxyMiddleware({
    target: 'http://113.125.201.130:32212',
    changeOrigin: true,
  }))
  app.use('/pt-web', createProxyMiddleware({
    target: 'http://113.125.201.130:32030',
    changeOrigin: true,
  }))
}

