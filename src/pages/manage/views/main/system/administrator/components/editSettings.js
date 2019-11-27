export default [
  {
    label: '',
    items: [
      {
        label: '角色',
        name: 'roleId',
        type: 'select',
        required: true,
        options: []
      },
      {
        label: '状态',
        name: 'statusVal',
        required: true,
        type: 'switch',
        trueValue: 1
      }
    ]
  }
]
