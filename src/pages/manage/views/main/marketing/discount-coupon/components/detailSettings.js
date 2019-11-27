export default [
  {
    label: '基本信息',
    items: [
      {
        label: '优惠券名称',
        value: 'name'
      },
      {
        label: '优惠券编号',
        value: 'code'
      },
      {
        label: '使用说明',
        value: 'detail'
      },
      {
        label: '类型',
        value: 'type',
        type: 'slot'
      }
    ]
  },
  {
    label: '使用条件',
    items: [
      {
        label: '发行量',
        value: 'amount',
        type: 'slot'
      },
      {
        label: '每人限领',
        value: 'userGainTimes',
        type: 'slot'
      },
      {
        label: '发行有效期',
        value: 'publishTime',
        type: 'slot'
      },
      {
        label: '使用有效期',
        value: 'useTime',
        type: 'slot'
      },
      {
        label: '可用城市',
        value: 'city',
        type: 'slot'
      }
    ]
  },
  {
    label: '其他',
    items: [
      {
        label: '添加时间',
        value: 'createdOn',
        name: 'createdOn'
      },
      {
        label: '添加人',
        value: 'createdBy'
      },
      {
        label: '最后修改时间',
        value: 'modifiedOn',
        name: 'modifiedOn'
      },
      {
        label: '最后修改人',
        value: 'modifiedBy'
      }
    ]
  }
]
