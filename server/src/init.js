/**
 * @description 示例项目的NodeJS服务器（接口）
 */

const {_save} = require('./database')

const btTablePageData = require('../data/tablePage')
const cascaderData = require('../data/cascaderData')
const selectData = require('../data/selectData')

module.exports = function () {
  _save('bt-table', btTablePageData.data)
  _save('dept', cascaderData.data)
  _save('brand', selectData.data)
}
