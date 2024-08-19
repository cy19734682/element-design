const admin = {
	username: 'admin',
	password: '123456'
}

module.exports = [
	// user login
	{
		url: '/mock/login',
		type: 'post',
		response: (config) => {
			const { username, password } = config.body
			// mock error
			if (admin.username !== username && admin.password === password) {
				return {
					code: -1,
					message: '用户名或密码错误'
				}
			}
			const token = Math.random().toString(36).substr(2)
			return {
				code: 0,
				data: {
					token: token,
					userInfo: { username }
				},
				msg: '登录成功'
			}
		}
	},

	// user logout
	{
		url: '/mock/logout',
		type: 'get',
		response: () => {
			return {
				code: 0,
				msg: '退出登录成功'
			}
		}
	}
]
