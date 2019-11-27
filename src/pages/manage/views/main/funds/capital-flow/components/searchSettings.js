export default [
  {
    type: 'text',
    placeholder: '请输入',
    name: 'userPhone',
    optionValue: 'userPhone',
    label: '手机号',
    visible: true
  },
  {
    label: '发生时间',
    visible: true,
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate',
    optionValue: 'registerTime'
  },
  {
    label: '科目',
    name: 'actionCodes',
    type: 'select',
    placeholder: '请选择',
    multiple: true,
    options: []
  }
]
