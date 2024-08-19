const { _save, listSelect } = require('../database')

const demoList = [
	{
		id: 1,
		name: '神马技术',
		parent_id: 0,
		children: [
			{
				id: 2,
				name: '研发部门',
				parent_id: 1
			},
			{
				id: 3,
				name: '测试部门',
				parent_id: 1
			},
			{
				id: 4,
				name: '产品部门',
				parent_id: 1,
				children: [
					{
						id: 9,
						name: '产品一组',
						parent_id: 4
					}
				]
			}
		]
	}
]

_save('dept', demoList)

module.exports = [
	// 列表查询
	{
		url: '/mock/dept',
		type: 'get',
		response: (config) => {
			const r = listSelect('dept', config.query)
			return {
				code: 0,
				data: r
			}
		}
	}
]
