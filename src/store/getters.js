const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  showRoutes: state => state.permissionRouter.showRoutes,
  initialRoutes: state => state.permissionRouter.initialRoutes
}
export default getters
