export default {
  /* 管理员 */
  // 获取管理员列表
  GET_ADMIN_LIST: '/backend/admin/user/list',
  // 新建管理员
  ADD_ADMIN: '/backend/admin/user/registry',
  // 获取所有角色
  GET_ALL_ROLES: '/backend/admin/role/allRoles',
  // 更新用户权限和状态
  UPDATE_ADMIN: '/backend/admin/user/changeAuth',
  // 重置密码
  RESET_ADMIN_PASSWORD: '/backend/admin/user/resetPassword',

  /* 角色 */
  // 获取角色列表
  GET_ROLE_LIST: '/backend/admin/role/allRoles',
  // 根据角色获取对应权限
  GET_AUTH_BY_ROLE: '/backend/admin/role/info/:roleId',
  // 创建角色
  ADD_ROLE: '/backend/admin/role/create',
  // 更新角色数据（权限和基本信息）
  UPDATE_ROLE: '/backend/admin/role/update',

  /* 权限 */
  // 获取所有权限列表
  GET_ALL_AUTH: '/backend/admin/authUrl/allAuthUrls',
  // 获取角色详情
  GET_ROLE_DETAIL: '/backend/admin/authUrl/info/:urlId',
  // 增加权限信息
  ADD_AUTH: '/backend/admin/authUrl/create',
  // 更新权限
  UPDATE_AUTH: '/backend/admin/authUrl/update',
  // 删除权限
  DELETE_AUTH: '/backend/admin/authUrl/remove/:id',
  // 添加按钮权限
  CREATE_BUTTON_AUTH: '/backend/admin/authUrl/createOperate',
  // 更新按钮权限
  UPDATE_BUTTON_AUTH: '/backend/admin/authUrl/updateOperate',
  // 删除按钮权限
  DELETE_BUTTON_AUTH: '/backend/admin/authUrl/deleteOperate',

  GET_ALL_CITIES: '/backend/admin/user/allCities'
}
