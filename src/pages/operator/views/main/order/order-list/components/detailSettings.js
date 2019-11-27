export const detailSettings = [
  {
    label: '基本信息',
    items: [
      {
        label: '订单编号',
        name: 'sn',
        type: 'normal'
      },
      {
        label: '订单状态',
        name: 'orderStatus',
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
        label: '桩编号',
        name: 'operatorEquipmentId',
        type: 'normal'
      },
      {
        label: '运营商',
        name: 'operator',
        type: 'normal'
      },
      {
        label: '充电站',
        name: 'stationName',
        type: 'normal'
      }
    ]
  },
  {
    label: '订单计费',
    items: [
      {
        label: '充电量',
        name: 'totalPower',
        type: 'normal'
      },
      {
        label: '充电费',
        name: 'totalElecMoney',
        type: 'normal'
      },
      {
        label: '服务费',
        name: 'totalServiceMoney',
        type: 'normal'
      },
      {
        label: '停车费',
        name: 'parkingMoney',
        type: 'normal'
      },
      {
        label: '最后计费时间',
        name: 'endTime',
        type: 'slot'
      },
      {
        label: '订单金额',
        name: 'totalMoney',
        type: 'normal'
      },
      {
        label: '优惠方式',
        name: 'discountTyep',
        type: 'slot'
      },
      {
        label: '优惠金额',
        name: 'discountAmount',
        type: 'normal'
      },
      {
        label: '应付金额',
        name: 'needPay',
        type: 'normal'
      },
      {
        label: '实付金额',
        name: 'actualPay',
        type: 'normal'
      }
    ]
  },
  {
    label: '支付信息',
    items: [
      {
        label: '支付方式',
        name: 'payWay',
        type: 'normal'
      },
      {
        label: '支付时间',
        name: 'payDate',
        type: 'slot'
      }
    ]
  },
  {
    label: '其他信息',
    items: [
      {
        label: '结束原因',
        name: 'stopReason',
        type: 'normal'
      },
      {
        label: '操作人',
        name: 'stopOperator',
        type: 'normal'
      },
      {
        label: '备注',
        name: 'stopReasonRemark',
        type: 'normal'
      }
    ]
  }
]
export const formDetailSettings = [
  {
    items: [
      {
        name: '桩编号',
        fieldName: 'connectorId',
        type: 'slot'
      },
      {
        name: '当前电压',
        fieldName: 'voltageA'
      },
      {
        name: '当前电流',
        fieldName: 'currentA'
      },
      {
        name: '当前功率',
        fieldName: 'power'
      },
      {
        name: '计费标准',
        fieldName: 'price',
        type: 'slot'
      },
      {
        name: '订单目前计费',
        fieldName: 'totalMoney',
        type: 'slot'
      },
      {
        name: '充电量',
        fieldName: 'totalPower'
      },
      {
        name: '充电费',
        fieldName: 'elecMoney'
      },
      {
        name: '服务费',
        fieldName: 'serviceMoney'
      },
      {
        name: '停车费',
        fieldName: 'parkingMoney'
      },
      {
        name: '最后计费时间',
        fieldName: 'endTime',
        type: 'slot'
      }
    ]
  }
]
