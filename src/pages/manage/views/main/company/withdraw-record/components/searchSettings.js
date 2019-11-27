export default [
  {
    label: '流水号',
    type: 'text',
    placeholder: '请输入流水号',
    name: 'sn',
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
        label: '待处理',
        value: 'apply'
      },
      {
        label: '处理中',
        value: 'transferring'
      },
      {
        label: '已处理',
        value: 'success'
      },
      {
        label: '已取消',
        value: 'canceled'
      }
    ]
  },
  {
    label: '申请时间',
    type: 'labelSelectDateRange',
    placeholder: '请选择',
    name: 'dateType',
    optionValue: 'create',
    options: [
      {
        label: '申请时间',
        value: 'create'
      },
      {
        label: '到账时间',
        value: 'success'
      }
    ]
  }
]
