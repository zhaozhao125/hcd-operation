export const detailSettings = [
  {
    label: '基本信息',
    items: [
      {
        label: '编号',
        name: 'id',
        type: 'normal'
      },
      {
        label: '城市',
        name: 'cityName',
        type: 'normal'
      },
      {
        label: '开始时间',
        name: 'startTime',
        type: 'slot'
      },
      {
        label: '结束时间',
        name: 'endTime',
        type: 'slot'
      }
    ]
  },
  {
    label: '充电桩信息',
    items: [
      {
        label: '充电桩编号',
        name: 'operatorEquipmentId',
        type: 'normal'
      },
      {
        label: '充电站',
        name: 'stationName',
        type: 'normal'
      },
      {
        label: '运营商',
        name: 'operatorName',
        type: 'normal'
      }
    ]
  },
  {
    label: '充电信息',
    items: [
      {
        label: '充电量',
        name: 'power',
        type: 'normal'
      }
    ]
  }
]
