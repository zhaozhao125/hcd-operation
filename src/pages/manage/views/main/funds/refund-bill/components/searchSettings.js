export default [
  {
    type: 'text',
    label: '手机号',
    placeholder: '请输入',
    name: 'payerUserPhone',
    visible: true
  },
  {
    label: '发生时间',
    visible: true,
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate',
    optionValue: 'registerTime'
  }
]
