export default [
  {
    type: 'text',
    placeholder: '请输入',
    name: 'userName',
    label: '企业名称',
    optionValue: 'userName',
    visible: true,
    options: [
      {
        label: '手机号',
        value: 'userPhone'
      }
    ]
  },
  {
    label: '开票时间',
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate',
    visible: true,
    optionValue: 'applyTime',
  }
]
