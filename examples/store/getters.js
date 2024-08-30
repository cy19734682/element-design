const getters = {
	language: (state) => state.app.language,
	serverUrl: (state) => state.app.serverUrl,
  isDark: (state) => state.app.isDark,
  theme: (state) => state.app.theme,
	token: (state) => state.user.token,
	nickname: (state) => state.user.nickname
}
export default getters
