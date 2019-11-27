export default [
  {
    label: '流水号',
    visible: true,
    type: 'text',
    placeholder: '请输入流水号',
    name: 'recordSn'
  },
  {
    label: '科目',
    type: 'select',
    visible: true,
    placeholder: '请选择',
    name: 'actionCodes',
    options: []
  },
  {
    label: '发生时间',
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate'
  }
]
