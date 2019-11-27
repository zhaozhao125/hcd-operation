export default [
  {
    items: [
      {
        label: '用户名',
        name: 'username',
        type: 'text',
        required: true,
        placeholder: '请输入用户名'
      },
      {
        label: '密码',
        name: 'password',
        type: 'text',
        required: true,
        placeholder: '请输入密码'
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
      },
      {
        label: '邮箱',
        name: 'email',
        type: 'text',
        placeholder: '请输入邮箱'
      },
      {
        label: '运营商',
        name: 'operatorId',
        type: 'select',
        required: true,
        placeholder: '请输入运营商',
        options: [
        ]
      }
    ]
  }
]
