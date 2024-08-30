const PackageJson = require('../../package.json')
const storeKey = PackageJson.name + '-' + PackageJson.version

/**
 * 获取缓存数据
 * @param key
 * @returns {*}
 */
module.exports.getStore = (key) => {
	const data = JSON.parse(localStorage.getItem(storeKey) || '{}')
	if (key) {
		return data[key]
	} else {
		return data
	}
}

/**
 * 缓存数据操作
 * @param key
 * @param val
 * @returns {*}
 */
module.exports.setStore = (key, val) => {
	if (key) {
		const data = module.exports.getStore()
		data[key] = val
		localStorage.setItem(storeKey, JSON.stringify(data))
	}
}
