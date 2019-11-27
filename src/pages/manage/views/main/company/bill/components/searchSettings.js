export default [
  {
    label: '流水号',
    visible: true,
    type: 'text',
    placeholder: '请输入流水号',
    name: 'recordSn'
  },
  {
    label: '运营商',
    visible: true,
    type: 'select',
    placeholder: '请选择',
    name: 'operatorSn',
    options: []
  },
  {
    label: '科目',
    type: 'select',
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
