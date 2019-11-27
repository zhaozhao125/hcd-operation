export default [
  {
    type: 'labelSelectText',
    placeholder: '请输入',
    name: 'selectText',
    optionValue: 'userPhone',
    visible: true,
    options: [
      {
        label: '手机号',
        value: 'userPhone'
      },
      {
        label: '用户编号',
        value: 'userId'
      }
    ]
  },
  {
    label: '注册时间',
    visible: true,
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate',
    optionValue: 'registerTime'
  },
  {
    label: '用户状态',
    name: 'statusCode',
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '启用',
        value: '1'
      },
      {
        label: '禁用',
        value: '0'
      }
    ]
  }
]
