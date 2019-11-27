export default [
  {
    type: 'text',
    label: '搜索',
    placeholder: '请输入用户名',
    name: 'username',
    optionValue: 'username',
    visible: true
  },
  {
    label: '状态',
    name: 'status',
    visible: true,
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '启用',
        value: 'valid'
      },
      {
        label: '禁用',
        value: 'invalid'
      }
    ]
  },
  {
    label: '运营商',
    name: 'operatorId',
    type: 'select',
    placeholder: '请选择',
    options: []
  }
]
