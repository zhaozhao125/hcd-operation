export default [
  {
    type: 'text',
    placeholder: '请输入',
    name: 'operatorEquipmentId',
    optionValue: 'userTelephone',
    label: '桩编号',
    visible: true,
    default: ''
  },
  {
    label: '运营商',
    name: 'operatorId',
    type: 'select',
    placeholder: '请选择',
    visible: true,
    events: {
      change: 'operationChange'
    },
    options: []
  },
  {
    label: '城市',
    type: 'city',
    name: 'cityId',
    placeholder: '请选择'
  },
  {
    label: '完成时间',
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate'
  },
  {
    label: '充电站',
    type: 'slot',
    placeholder: '请输入',
    name: 'stationId',
    default: ''
  }
]
