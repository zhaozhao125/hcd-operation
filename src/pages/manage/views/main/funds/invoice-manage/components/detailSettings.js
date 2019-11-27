export const detailSettings = [
  {
    label: '基本信息',
    items: [
      {
        name: '流水号',
        fieldName: 'sn'
      },
      {
        name: '状态',
        fieldName: 'statusName'
      },
      {
        name: '手机号',
        fieldName: 'userPhone'
      }
    ]
  },
  {
    label: '开票信息',
    items: [
      {
        name: '发票金额',
        fieldName: 'money',
        type: 'slot'
      },
      {
        name: '抬头类型',
        fieldName: 'titleType'
      },
      {
        name: '发票抬头',
        fieldName: 'title'
      },
      {
        name: '税号',
        fieldName: 'taxNumber'
      },
      {
        name: '发票内容',
        fieldName: 'content'
      },
      {
        name: '电子邮箱',
        fieldName: 'email'
      }
    ]
  },
  {
    label: '其他信息',
    items: [
      {
        name: '申请时间',
        fieldName: 'applyTime',
        type: 'slot'
      },
      {
        name: '处理人',
        fieldName: 'operator'
      },
      {
        name: '处理时间',
        fieldName: 'handleTime',
        type: 'slot'
      }
    ]
  }
]
