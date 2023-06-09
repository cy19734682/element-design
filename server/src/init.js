/**
 * @description 示例项目的NodeJS服务器（接口）
 */

const {_save} = require('./database')

const btTablePageData = require('../data/tablePage')

module.exports = function () {
  _save('bt-table-page', btTablePageData.data)
}
