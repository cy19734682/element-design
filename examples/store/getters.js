const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  nickname: state => state.user.nickname,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  perms: state => state.user.perms
}
export default getters
