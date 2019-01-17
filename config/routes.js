const express = require('express')
const glob = require('glob')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

// 加载路由
const dir = 'server'
glob('*/route.js', {cwd: './' + dir}, function (er, files) {
  files.forEach(item => {
    const route = item.split('/')[0]
    const routeModule = require('../' + dir + '/' + item)
    router.use('/' + route, routeModule)
  })
})

module.exports = router
