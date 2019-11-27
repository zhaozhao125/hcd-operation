export default [{
  type: 'labelSelectText',
  placeholder: '请输入',
  name: 'selectText',
  optionValue: 'userPhone',
  visible: true,
  options: [{
    label: '用户手机号',
    value: 'userPhone'
  }, {
    label: '流水号',
    value: 'recordSn'
  }]
}, {
  label: '发生时间',
  visible: true,
  name: 'addTime',
  type: 'daterange',
  // unixTime: true
  default: [new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), new Date()]
}, {
  label: '科目',
  name: 'actionCodes',
  type: 'select',
  placeholder: '不限',
  multiple: true,
  visible: false,
  options: []
}, {
  label: '支付方式',
  name: 'paymentType',
  type: 'select',
  visible: false,
  options: [{
    value: '',
    label: '请选择'
  }, {
    value: 'b2bBankTransfer',
    label: '公对公转账'
  }]
}]
