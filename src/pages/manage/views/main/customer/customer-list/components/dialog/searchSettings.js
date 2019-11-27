export default [
  {
    label: '优惠券状态',
    name: 'userCouponStatus',
    visible: true,
    type: 'select',
    placeholder: '请选择',
    options: [
      {
        label: '未使用',
        value: 0
      },
      {
        label: '已使用',
        value: 1
      },
      {
        label: '已失效',
        value: 2
      }
    ]
  }
]
