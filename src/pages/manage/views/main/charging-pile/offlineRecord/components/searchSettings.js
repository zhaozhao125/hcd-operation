export default [
  {
    label: '桩编号',
    type: 'text',
    placeholder: '请输入',
    name: 'equipmentSn',
    visible: true
  },
  {
    label: '类别',
    name: 'logType',
    type: 'select',
    placeholder: '请选择',
    visible: true,
    options: [
      {
        label: '上线',
        value: 'online'
      },
      {
        label: '离线',
        value: 'offline'
      },
      {
        label: '故障',
        value: 'error'
      },
      {
        value: 'error_recover',
        label: '故障恢复'
      }
    ]
  },
  {
    label: '发生时间',
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate'
  },
  {
    label: '运营商',
    name: 'operatorId',
    type: 'select',
    placeholder: '请选择',
    options: [],
    events: {
      change: 'operationChange'
    }
  }
]
