export default [{
  type: 'labelSelectText',
  placeholder: '请输入',
  name: 'selectText',
  optionValue: 'userTelephone',
  visible: true,
  options: [{
    label: '用户手机号',
    value: 'userTelephone'
  }, {
    label: '订单编号',
    value: 'sn'
  }, {
    label: '桩编号',
    value: 'equipmentSn'
  }]
},
// {
//   label: '订单状态',
//   name: 'orderStatus',
//   type: 'select',
//   visible: true,
//   placeholder: '请选择',
//   options: [{
//     label: '充电中',
//     value: 'CHARGING'
//   }, {
//     label: '已完成',
//     value: 'COMPLETED'
//   }
//   ]
// },
{
  label: '运营商',
  name: 'operatorId',
  type: 'select',
  visible: true,
  placeholder: '请选择',
  events: {
    change: 'operationChange'
  },
  options: [
  ]
}, {
  label: '下单时间',
  type: 'daterange',
  placeholder: '请选择',
  name: 'selectDate'
}, {
  label: '充电站',
  type: 'slot',
  placeholder: '请输入',
  name: 'stationId'
}]
