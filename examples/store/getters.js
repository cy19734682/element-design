const getters = {
	language: (state) => state.app.language,
	serverUrl: (state) => state.app.serverUrl,
	token: (state) => state.user.token,
	nickname: (state) => state.user.nickname
}
export default getters
