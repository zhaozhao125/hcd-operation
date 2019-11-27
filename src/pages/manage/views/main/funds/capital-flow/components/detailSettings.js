export const detailSettings = [{
  label: '基本信息',
  items: [{
    label: '编号',
    name: 'sn',
    type: 'normal'
  }, {
    label: '城市',
    name: 'orderStatusName',
    type: 'normal'
  }, {
    label: '开始时间',
    name: 'createdTimeLong',
    type: 'normal'
  }, {
    label: '结束时间',
    name: 'startTimeLong',
    type: 'normal'
  }]
}, {
  label: '充电桩信息',
  items: [{
    label: '充电桩编号',
    name: 'userName',
    type: 'normal'
  }, {
    label: '设备商',
    name: 'userPhone',
    type: 'normal'
  }, {
    label: '充电站',
    name: 'userPhone',
    type: 'normal'
  }, {
    label: '运营商',
    name: 'userPhone',
    type: 'normal'
  }]
}, {
  label: '充电信息',
  items: [{
    label: '充电量',
    name: 'charge',
    type: 'slot'
  }]
}]

export const returnDetailSettings = [{
  label: '车辆信息',
  items: [{
    label: '车牌号',
    value: 'carNumber'
  }, {
    label: '车型',
    value: 'carGenreName'
  }, {
    label: '计费标准',
    value: 'onMinutePrice',
    type: 'slot'
  }]
}, {
  label: '实时计费',
  items: [{
    label: '租车天数计费',
    value: 'dayMoneyTotal',
    type: 'slot'
  },
  {
    label: '最后一天行驶计费',
    value: 'onMoneyTodayTotal',
    type: 'slot'
  }, {
    label: '最后一天停车计费',
    value: 'offMoneyTodayTotal',
    type: 'slot'
  }, {
    label: '不计免赔服务',
    value: 'noDeductiblesPrice',
    type: 'slot'
  }, {
    label: '还车服务费',
    value: 'returnCarPrice',
    type: 'text',
    append: '元',
    visibleControl: (data) => {
      return data.currentStationType === 'casual'
    }
  }, {
    label: '城郊服务费',
    value: 'citySuburbanMoney',
    type: 'slot'
  }, {
    label: '跨城服务费',
    value: 'cityCrossMoney',
    type: 'slot'
  }, {
    label: '订单目前计费',
    value: 'orderTotalMoney',
    type: 'slot'
  }, {
    label: '最后计费时间',
    value: 'lastBillingTime'
  }
  ]
}, {
  label: '用户信息',
  items: [{
    label: '用户姓名',
    value: 'userName'
  }, {
    label: '手机号',
    value: 'userPhone'
  }, {
    label: '余额',
    value: 'currentUserMoneyTotal',
    type: 'slot'
  }]
}]

export const currentBillSettings = [{
  label: '',
  items: [{
    label: '车牌号',
    value: 'carNumber',
    type: 'slot'
  }, {
    label: '车型',
    value: 'carModelName'
  }, {
    label: '计费标准',
    value: 'onMinutePrice',
    type: 'slot'
  }, {
    label: '订单目前计费',
    value: 'totalMoney',
    type: 'slot'
  },
  {
    label: '租车天数计费',
    value: 'dayMoneyTotal',
    type: 'slot'
  },
  {
    label: '最后一天行驶计费',
    value: 'onMoneyTodayTotal',
    type: 'slot'
  }, {
    label: '最后一天停车计费',
    value: 'offMoneyTodayTotal',
    type: 'slot'
  }, {
    label: '不计免赔服务',
    value: 'noDeductiblesPrice',
    type: 'slot'
  }, {
    label: '城郊服务费',
    value: 'citySuburbanMoney',
    type: 'slot'
  }, {
    label: '跨城服务费',
    value: 'cityCrossMoney',
    type: 'slot'
  }, {
    label: '最后计费时间',
    value: 'orderFeeDTO.lastBillingTime'
  }]
}]
