export default [
  {
    label: '',
    items: [
      {
        label: '账号名',
        name: 'username',
        type: 'text',
        required: true,
        placeholder: '请输入字母、数字或字符'
      },
      {
        label: '密码',
        name: 'password',
        type: 'text',
        required: true,
        placeholder: '6-20位字母、数字或字符'
      },
      {
        label: '用户角色',
        name: 'operatorId',
        required: true,
        type: 'slot',
        placeholder: '请选择'
      },
      {
        label: '姓名',
        name: 'cnName',
        type: 'text',
        required: true,
        placeholder: '请输入姓名'
      },
      {
        label: '手机号',
        name: 'mobilePhone',
        type: 'text',
        required: true,
        placeholder: '请输入手机号'
      }
    ]
  }
]
