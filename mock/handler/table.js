const { Random } = require('mockjs')

const { _save, _delete, _edit, listSelect, pageSelect } = require('../database')

function getRandomPics(count = 10) {
	const arr = []
	for (let i = 0; i < count; i++) {
		arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()))
	}
	return arr
}

const demoList = (() => {
	const result = []
	for (let index = 0; index < 200; index++) {
		result.push({
			id: `${index}`,
			name: `文章正文${index + 1}`,
			mimeType: index % 2 === 0 ? 'text/html' : 'image/png',
			extension: index % 2 === 0 ? '.html' : '.png',
			imgPath: getRandomPics(Math.ceil(Math.random() * 3) + 1)
		})
	}
	return result
})()

_save('bt-table', demoList)

module.exports = [
	// 分页列表查询
	{
		url: '/mock/bt-table-page',
		type: 'get',
		response: (config) => {
			const r = pageSelect('bt-table', config.query)
			return {
				code: 0,
				data: r
			}
		}
	},
	// 列表查询
	{
		url: '/mock/bt-table',
		type: 'get',
		response: (config) => {
			const r = listSelect('bt-table', config.query)
			return {
				code: 0,
				data: r
			}
		}
	},

	// 新增
	{
		url: '/mock/bt-table',
		type: 'post',
		response: (config) => {
			const r = config.body
			let typeR = Object.prototype.toString.call(r).replace(/\[object |]/g, '')
			const s = _save('bt-table', typeR === 'Array' ? r : [r])
			return {
				code: s ? 0 : -1
			}
		}
	},

	// 编辑
	{
		url: '/mock/bt-table',
		type: 'put',
		response: (config) => {
			const r = config.body
			const s = _edit('bt-table', r)
			return {
				code: s ? 0 : -1
			}
		}
	},

	// 删除
	{
		url: '/mock/bt-table',
		type: 'delete',
		response: (config) => {
			const { ids } = config.body
			const s = _delete('bt-table', (e) => ids && String(ids).split(',').indexOf(String(e.id)) > -1)
			return {
				code: s ? 0 : -1
			}
		}
	}
]
