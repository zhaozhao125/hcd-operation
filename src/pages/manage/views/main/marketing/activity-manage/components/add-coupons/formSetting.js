export default [
  {
    label: '添加优惠券',
    items: [
      {
        label: '优惠券名',
        name: 'couponName',
        type: 'slot',
        required: true
      },
      {
        label: '数量',
        name: 'couponCount',
        type: 'text',
        placeholder: '请输入配券张数',
        append: '张',
        required: true
      }
    ]
  }
]
