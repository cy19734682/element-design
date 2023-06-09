/**
 * @description 示例项目的NodeJS服务器（接口）
 */

const express = require('express')
const {_save, _delete, _get, _edit} = require('./src/database')

const router = express.Router()


/**
 * 登录
 */
router.post('/login', express.json(),function (req, res) {
  const {username,password} = req.body
  if(!username || !password){
    res.send({
      code: -1,
      msg: '用户名或密码不能为空'
    })
    return
  }
  _save('em_user',[{username,password}])
  res.send({
    code: 0,
    data:{
      token: Math.random().toString(36).substr(2),
      userInfo:{username}
    },
    msg: '登录成功'
  })
})

/**
 * 退出登录
 */
router.get('/logout', function (req, res) {
  _delete('em_user', e => e.username)
  res.send({
    code: 0,
    msg: '退出登录成功'
  })
})

/**
 * get查询请求
 */
router.get('*', checkAdmin, tableManage)
/**
 * post新增请求
 */
router.post('*', checkAdmin, tableManage)
/**
 * put修改请求
 */
router.put('*', checkAdmin, tableManage)
/**
 * delete删除请求
 */
router.delete('*', checkAdmin, tableManage)


function checkAdmin (req, res, next) {
  const data = _get('em_user', 1, 1)
  if (!(data && data.data && data.data.length > 0)) {
    res.send({
      code: -999,
      msg: '未登录, 请先登录'
    })
    return
  }
  next()
}



/**
 * 操作微型数据库
 * @param req handler的req
 * @param res handler的res
 */
function tableManage(req, res) {
  const action = req.path.substring(1)
  const m = req.method
  
  if (action) {
    if (m === 'GET') {
      pageSelect(action, req, res)
    }
    else if (m === 'POST' || m === 'PUT') {
      const r = req.body
      let typeR = Object.prototype.toString.call(r).replace(/\[object |]/g, "")
      const s = m === 'POST' ? _save(action, typeR === 'Array' ? r : [r]) : _edit(action, r)
      let b = {}
      if (s) {
        b.code = 0
        b.msg = 'success'
      }
      else {
        b.code = -1
        b.msg = 'error'
      }
      res.send(b)
    }
    else if (m === 'DELETE') {
      const {ids} = req.body
      const r = _delete(action, e => ids && String(ids).split(',').indexOf(String(e.id)) > -1)
      let t = {}
      if (r) {
        t.code = 0
        t.msg = 'success'
      }
      else {
        t.code = -1
        t.msg = 'error'
      }
      res.send(t)
    }
  }
  else {
    res.send('hello')
  }
}

/**
 * 分页数据封装
 * @param action
 * @param req
 * @param res
 */
function pageSelect(action, req, res) {
  const {current, size, ...others} = req.query
  const _current = current && Number(current) || 1
  const _size = size && Number(size) || 10
  let r
  if (Object.keys(others).length > 0) {
    r = _get(action, _current, _size, e => {
      for (let k in others) {
        if (others.hasOwnProperty(k) && e[k] && others[k] && String(e[k]).indexOf(others[k]) === -1) {
          return false
        }
      }
      return true
    })
  }
  else {
    r = _get(action, _current, _size)
  }
  let t = {
    code: 0,
    data: {
      data:r.data,
      total:r.total,
      size:_size,
      pages: r.total && Math.ceil(r.total / _size) || 0
    }
  }
  res.send(t)
}


module.exports = router
