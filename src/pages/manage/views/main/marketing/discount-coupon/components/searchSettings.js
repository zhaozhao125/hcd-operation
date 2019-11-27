export default [
  {
    type: 'text',
    label: '券名',
    placeholder: '请输入',
    name: 'name',
    optionValue: 'name',
    visible: true
  },
  {
    label: '添加时间',
    visible: true,
    type: 'daterange',
    placeholder: '请选择',
    name: 'selectDate',
    optionValue: 'registerTime'
  },
  {
    label: '城市',
    type: 'city',
    placeholder: '请选择',
    name: 'cityId'
  }
]
