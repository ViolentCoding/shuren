/*
 * @Author: 赵新朋
 * @Date: 2020-01-08 17:42:38
 * @LastEditors  : 赵新朋
 * @LastEditTime : 2020-01-09 16:54:50
 * @Description: 
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  perms: state => state.user.perms,
  permission_routers: state => state.permission.routers,  //路由列表
  addRouters: state => state.permission.addRouters
}
export default getters
