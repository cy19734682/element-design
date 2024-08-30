const Mock = require('mockjs')
const { param2Obj } = require('./utils')
const { getStore } = require('../examples/utils/auth')

const user = require('./handler/user')
const table = require('./handler/table')
const dept = require('./handler/dept')
const brand = require('./handler/brand')

const mocks = [...user, ...table, ...dept, ...brand]

const whiteList = ['/mock/login', '/mock/logout']

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
	// mock patch
	// https://github.com/nuysoft/Mock/issues/300
	Mock.XHR.prototype.__send = Mock.XHR.prototype.send
	Mock.XHR.prototype.send = function () {
		if (this.custom.xhr) {
			this.custom.xhr.withCredentials = this.withCredentials || false
			if (this.responseType) {
				this.custom.xhr.responseType = this.responseType
			}
		}
		if (this.custom.requestHeaders) {
			const headers = {}
			for (let k in this.custom.requestHeaders) {
				headers[k.toString().toLowerCase()] = this.custom.requestHeaders[k]
			}
			this.custom.options = Object.assign({}, this.custom.options, { headers })
		}
		this.__send.apply(this, arguments)
	}
	Mock.XHR.prototype.proxy_open = Mock.XHR.prototype.open
	Mock.XHR.prototype.open = function () {
		let responseType = this.responseType
		this.proxy_open(...arguments)
		if (this.custom.xhr) {
			if (responseType) {
				this.custom.xhr.responseType = responseType
			}
		}
	}

	function XHR2ExpressReqWrap(respond) {
		return function (options) {
			let result
			if (whiteList.indexOf(options.url) === -1 && !getStore('token')) {
				result = { code: -999 }
			} else if (respond instanceof Function) {
				const { body, type, url } = options
				// https://expressjs.com/en/4x/api.html#req
				result = respond({
					method: type,
					body: JSON.parse(body),
					query: param2Obj(url)
				})
			} else {
				result = respond
			}
			return Mock.mock(result)
		}
	}

	for (const i of mocks) {
		Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
	}
}

module.exports = {
	mockXHR
}
