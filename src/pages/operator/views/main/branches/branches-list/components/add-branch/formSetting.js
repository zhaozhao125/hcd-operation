export default [
  {
    label: '基本信息',
    items: [
      {
        label: '站点名称',
        name: 'stationName',
        type: 'text',
        required: true,
        placeholder: '请输入站点名称'
      },
      {
        label: '城市',
        type: 'city',
        name: 'cityId',
        placeholder: '请选择',
        required: true
      },
      {
        label: '站点图片',
        name: 'images',
        type: 'img',
        limit: 4,
        multiple: false,
        tip: '（建议图片大小：300*300，最多可传4张）'
      }
      // {
      //   label: '所属网点',
      //   name: 'stationId',
      //   type: 'slot',
      //   placeholder: '请输入所属的网点名称'
      // },
    ]
  },
  {
    label: '营业信息',
    items: [
      // {
      //   label: '运营商',
      //   name: 'operatorId',
      //   type: 'select',
      //   required: true,
      //   placeholder: '请选择',
      //   options: []
      // },
      {
        label: '站点类型',
        name: 'stationType',
        type: 'select',
        required: true,
        placeholder: '请选择',
        options: [
          {
            label: '开放站点',
            value: 'OPEN'
          },
          {
            label: '对内站点',
            value: 'SPECIAL'
          }
        ]
      },
      {
        label: '营业时间',
        name: 'openTime',
        type: 'text',
        required: true,
        placeholder: '请输入营业时间'
      },
      {
        label: '服务电话',
        name: 'telephone',
        type: 'text',
        required: true,
        placeholder: '请输入服务电话'
      },
      {
        label: '充电费用',
        name: 'prices',
        type: 'slot'
      },
      {
        label: '站位费',
        name: 'parkingPrice',
        type: 'slot',
        placeholder: '请输入站位费',
        append: '元/小时',
        value: undefined
      }
    ]
  },
  {
    label: '地理信息',
    items: [
      {
        label: '经纬度',
        name: 'x',
        type: 'text',
        placeholder: '',
        required: true
      },
      {
        label: '地址',
        name: 'address',
        type: 'text',
        placeholder: '',
        required: true
      },
      {
        label: '',
        name: 'position',
        type: 'slot'
      }
    ]
  },
  {
    label: '其他信息',
    items: [
      {
        label: '是否启用充电站',
        name: 'enabled',
        type: 'switch',
        // activeColor: 'rgb(19, 206, 102)',
        // inactiveColor: 'rgb(220, 223, 230)',
        // activeValue: 1,
        // inactiveValue: 0,
        events: {
          change: 'isOpen'
        }
      },
      {
        label: '站点描述',
        name: 'stationIntro',
        type: 'textarea'
      }
    ]
  }
]
