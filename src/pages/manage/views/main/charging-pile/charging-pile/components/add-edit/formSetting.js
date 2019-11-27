export default [
  {
    label: '',
    items: [
      {
        label: '桩编号',
        name: 'operatorEquipmentId',
        type: 'text',
        required: true,
        placeholder: '请输入运营商自带桩编号'
      },
      {
        label: '所属充电站',
        name: 'stationId',
        required: true,
        type: 'slot',
        placeholder: '请选择'
      },
      // {
      //   label: '运营商',
      //   name: 'operatorId',
      //   required: true,
      //   type: 'select',
      //   placeholder: '请选择',
      //   options: [],
      //   disabled: false
      // },
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
        label: '枪数量',
        name: 'connectorCount',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            label: '单枪',
            value: 1
          },
          {
            label: '双枪',
            value: 2
          }
        ]
      },
      {
        label: '额定电流',
        name: 'current',
        type: 'text',
        placeholder: '请输入额定电流',
        append: 'A'
      },
      {
        label: '额定功率',
        name: 'power',
        type: 'text',
        placeholder: '请输入额定功率',
        append: 'KW'
      },
      {
        label: '充电桩描述',
        name: 'description',
        type: 'textarea',
        placeholder: '请输入充电桩描述'
      }
    ]
  }
]
