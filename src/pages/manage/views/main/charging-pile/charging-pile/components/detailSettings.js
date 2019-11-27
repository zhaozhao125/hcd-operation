export default [
  {
    label: '基本信息',
    items: [
      {
        label: '充电桩编号',
        value: 'operatorEquipmentId',
        name: 'operatorEquipmentId'
      },
      {
        label: '充电桩',
        value: 'connectorList',
        type: 'slot'
      },
      // {
      //   label: '接口状态',
      //   type: 'slot',
      //   name: 'status'
      // },
      {
        label: '运营商',
        name: 'operatorName',
        value: 'operatorName'
      },
      {
        label: '桩类型',
        value: 'equipmentType',
        type: 'slot'

      },
      {
        label: '额定电流',
        value: 'current'
      },
      {
        label: '额定功率',
        value: 'power'
      },
      // {
      //   label: '桩数量',
      //   value: 'connectorCount'
      // }
    ]
  },
  {
    label: '创建信息',
    items: [
      {
        label: '创建人',
        value: 'createdBy',
        type: 'slot',
        name: 'createdBy'
      },
      {
        label: '创建人时间',
        type: 'slot',
        name: 'createdOn'
      },
      {
        label: '桩来源',
        value: 'equipmentSourceName'
      },
      {
        label: '描述',
        value: 'description'
      }
    ]
  }
]
