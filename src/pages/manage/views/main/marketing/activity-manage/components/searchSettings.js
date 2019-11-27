export default [
  {
    placeholder: '请输入',
    name: 'name',
    visible: true,
    label: '活动名称',
    type: 'text'
  },
  {
    label: '活动类型',
    name: 'type',
    type: 'select',
    visible: true,
    placeholder: '请选择',
    options: [
      {
        label: '充送',
        value: 'recharge_gift'
      },
      {
        label: '满返',
        value: 'full_reduction'
      },
      {
        label: '新用户注册',
        value: 'new_user'
      }
    ]
  },
  {
    label: '活动状态',
    name: 'status',
    type: 'select',
    visible: false,
    placeholder: '请选择',
    options: [
      {
        label: '未开始',
        value: 'waiting'
      },
      {
        label: '进行中',
        value: 'executing'
      },
      {
        label: '已结束',
        value: 'finish'
      }
    ]
  }
]
