export default [
  {
    type: 'text',
    placeholder: '请输入',
    name: 'userPhone',
    label: '手机号',
    optionValue: 'userPhone',
    visible: true,
    options: [
      {
        label: '手机号',
        value: 'userPhone'
      }
    ]
  },
  {
    label: '发票状态',
    name: 'status',
    visible: true,
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '已处理',
        value: 'processed'
      },
      {
        label: '待处理',
        value: 'pending'
      }
    ]
  },
  {
    type: 'labelSelectDateRange',
    placeholder: '请选择',
    name: 'selectDate',
    optionValue: 'applyTime',
    options: [
      {
        label: '申请时间',
        value: 'applyTime'
      },
      {
        label: '处理时间',
        value: 'handleTime'
      }
    ]
  }
]
