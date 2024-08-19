const { _save, listSelect } = require('../database')

const demoList = [
	{
		id: 1,
		name: '华为',
		label: 'HW'
	},
	{
		id: 2,
		name: '荣耀',
		label: 'RY'
	},
	{
		id: 3,
		name: '锤子',
		label: 'CZ'
	},
	{
		id: 4,
		name: '小米',
		label: 'XM'
	},
	{
		id: 5,
		name: '苹果',
		label: 'PG'
	}
]

_save('brand', demoList)

module.exports = [
	// 列表查询
	{
		url: '/mock/brand',
		type: 'get',
		response: (config) => {
			const r = listSelect('brand', config.query)
			return {
				code: 0,
				data: r
			}
		}
	}
]
