export default [
  {
    label: '桩编号',
    type: 'text',
    placeholder: '请输入',
    name: 'sn',
    visible: true
  },
  {
    label: '类别',
    name: 'connectorStatus',
    type: 'select',
    placeholder: '请选择',
    visible: true,
    options: [
      {
        label: '空闲',
        value: 'IDLE'
      },
      {
        label: '占用未充电',
        value: 'USED_UNCHARGE'
      },
      {
        label: '充电中',
        value: 'USED_CHARGING'
      },
      {
        value: 'PARKING',
        label: '待拔枪'
      },
      {
        label: '故障',
        value: 'ERROR'
      },
      {
        label: '离线',
        value: 'OFFLINE'
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
  },
  {
    label: '设备商',
    name: 'operatorId',
    type: 'select',
    placeholder: '请选择',
    options: [],
    events: {
      change: 'operationChange'
    }
  }
]
