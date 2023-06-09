/**
 * @description 示例项目的NodeJS服务器（接口）
 */
const express = require('express')
const init = require('./src/init')
const router = require('./router')
const uploadRouter = require('./src/upload')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

init()

app.use(function (req, res, next) {
  console.log('\x1b[90m', (new Date).toLocaleTimeString(), '\x1b[37m', 'path:', '\x1b[34m', req.path, '\x1b[37m',
    ' method:', "\x1b[33m", req.method, '\x1b[37m', ' query:', req.query)
  next()
})

app.use(uploadRouter)
app.use(router)

const PORT = 8360

app.listen(PORT, () => {
  console.log('Express server running at http://127.0.0.1:' + PORT)
})
