// import express from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/customer/**',
    createProxyMiddleware({
      "changeOrigin": true,
      "target": "http://www.opennet.link/customer.php?action=list"
    })
  )
};