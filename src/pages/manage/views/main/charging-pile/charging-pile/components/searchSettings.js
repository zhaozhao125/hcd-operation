export default [
  {
    label: '充电桩编号',
    type: 'text',
    placeholder: '请输入',
    name: 'sn',
    visible: true
  },
  {
    label: '接口状态',
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
    label: '城市',
    type: 'city',
    name: 'cityId',
    placeholder: '请选择'
  },
  {
    label: '桩类型',
    name: 'equipmentType',
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '快充',
        value: 'DC'
      },
      {
        label: '慢充',
        value: 'AC'
      }
    ]
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
    label: '在线状态',
    name: 'online',
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '在线',
        value: true
      },
      {
        label: '离线',
        value: false
      }
    ]
  },
  {
    label: '站点名称',
    type: 'slot',
    placeholder: '请输入',
    name: 'stationId'
  },
  //  {
  //   type: 'labelSelectRemote',
  //   placeholder: '请输入',
  //   name: 'selectDateRemote',
  //   optionValue: 'takeStationId',
  //   options: [
  //     {
  //       label: '取车网点',
  //       value: 'takeStationId'
  //     },
  //     {
  //       label: '还车网点',
  //       value: 'returnStationId'
  //     }
  //   ]
  // }
  {
    label: '添加时间',
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate'
  }
]
