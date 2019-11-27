export default [
  {
    label: '站点名称',
    type: 'text',
    placeholder: '请输入',
    name: 'stationName',
    visible: true
  },
  // {
  //   label: '运营商',
  //   name: 'operatorId',
  //   type: 'select',
  //   visible: true,
  //   options: []
  // },
  {
    label: '城市',
    type: 'city',
    name: 'cityId',
    visible: true,
    placeholder: '请选择',
    visible: true
  },
  {
    label: '添加时间',
    name: 'datetimerange',
    type: 'daterange',
    visible: false
  }
]
