export default [{
  label: '',
  items: [{
    label: '用户名',
    type: 'text',
    name: 'username',
    required: true
  }, {
    label: '密码',
    type: 'password',
    name: 'password',
    required: true
  }, {
    label: '姓名',
    type: 'text',
    name: 'cnName',
    required: true
  }, {
    label: '手机号',
    type: 'text',
    name: 'mobilePhone',
    required: true
  }, {
    label: '邮箱',
    type: 'text',
    name: 'email'
  }, {
    label: '角色',
    type: 'select',
    name: 'roleId',
    options: [],
    required: true
  }]
}]
