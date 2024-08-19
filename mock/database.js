/**
 * @description 虚拟微型数据库
 */

let _data = {}
let idCount = {}

/**
 * 增
 * @private
 * @param table
 * @param data
 */
const _save = function (table, data) {
	if (!_data[table]) {
		_data[table] = []
		idCount[table] = 0
	}
	let b = data.map((e, i) => {
		return Object.assign(e, { id: ++idCount[table] })
	})
	b.reverse()
	_data[table].unshift(...b)
	return true
}

/**
 * 删
 * @returns {boolean} 是否成功
 * @private
 * @param table
 * @param condition
 */
const _delete = function (table, condition) {
	if (!_data[table]) {
		return false
	}
	_data[table] = _data[table].filter((e) => !condition(e))
	return true
}

/**
 * 查单条数据
 * @returns {*}
 * @private
 * @param table
 * @param condition
 */
const _getOne = function (table, condition) {
	if (!_data[table]) {
		return []
	}
	let b = _data[table]
	if (condition) {
		b = b.filter(condition)
	}
	return b
}
/**
 * 查
 * @returns {*}
 * @private
 * @param table
 * @param current
 * @param size
 * @param condition
 */
const _get = function (table, current, size, condition) {
	if (!_data[table]) {
		return {
			data: [],
			total: 0
		}
	}
	let b = _data[table]
	if (condition) {
		b = b.filter(condition)
	}
	return {
		data: size === -1 ? b : b.slice((current - 1) * size, current * size),
		total: b.length
	}
}
/**
 * 改
 * @returns {boolean} 是否成功
 * @private
 * @param table
 * @param data
 */
const _edit = function (table, data) {
	if (!_data[table] || !data.hasOwnProperty('id')) {
		return false
	}
	for (let i = 0, len = _data[table].length; i < len; i++) {
		if (_data[table][i].id === data.id) {
			_data[table][i] = data
			return true
		}
	}
	return false
}

/**
 * 列表数据封装
 * @param action
 * @param query
 */
const listSelect = function (action, query) {
	const { ...others } = query
	let r
	if (Object.keys(others).length > 0) {
		r = _getOne(action, (e) => {
			for (let k in others) {
				if (others.hasOwnProperty(k) && e[k] && others[k] && String(e[k]).indexOf(others[k]) === -1) {
					return false
				}
			}
			return true
		})
	} else {
		r = _getOne(action)
	}
	return r
}

/**
 * 分页数据封装
 * @param action
 * @param query
 */
const pageSelect = function (action, query) {
	const { current, size, ...others } = query
	const _current = (current && Number(current)) || 1
	const _size = (size && Number(size)) || 10
	let r
	if (Object.keys(others).length > 0) {
		r = _get(action, _current, _size, (e) => {
			for (let k in others) {
				if (others.hasOwnProperty(k) && e[k] && others[k] && String(e[k]).indexOf(others[k]) === -1) {
					return false
				}
			}
			return true
		})
	} else {
		r = _get(action, _current, _size)
	}
	return {
		data: r.data,
		total: r.total,
		size: _size,
		pages: (r.total && Math.ceil(r.total / _size)) || 0
	}
}

module.exports = {
	_save,
	_get,
	_delete,
	_edit,
	listSelect,
	pageSelect
}
