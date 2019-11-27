export default [
  {
    label: '企业信息',
    items: [
      {
        label: '企业名称',
        name: 'companyName',
        required: true,
        placeholder: '请输入用户名',
        type: 'slot'
      },
      {
        label: '已开票金额',
        name: 'companymoney',
        placeholder: '请输入用户名',
        type: 'slot',
        hidden: true
      }
    ]
  },
  {
    label: '企业信息',
    items: [
      {
        label: '开票充值单',
        name: 'orderIds',
        type: 'slot',
        required: true,
        placeholder: '请输入用户名'
      },
      // {
      //   label: '发行量',
      //   name: 'amount',
      //   type: 'number',
      //   placeholder: '请输入发行量',
      //   value: 0,
      //   describe: '张（0代表不限制）',
      //   step: 1
      // },
      {
        label: '开票金额',
        name: 'inputInvoiceMoney',
        type: 'number',
        required: true,
        describe: '元',
        step: 1
      },
      {
        label: '抬头类型',
        name: 'titleType',
        type: 'radio',
        options: [
          {
            label: '企业单位',
            value: 'company'
          },
          {
            label: '个人',
            value: 'personal'
          }
        ],
        value: 'company',
        required: true,
        events: {
          change: 'change'
        }
      },
      {
        label: '发票抬头',
        name: 'title',
        type: 'text',
        required: true,
        placeholder: '请输入发票抬头'
      },
      {
        label: '税号',
        name: 'taxNumber',
        required: true,
        type: 'text',
        placeholder: '请输入税号',
        hidden: false
      },
      {
        label: '发票内容',
        required: true,
        name: 'content',
        type: 'slot',
        placeholder: '请输入发票内容',
        options: [
          {
            label: '运输',
            value: 'clean_car'
          },
          {
            label: '充电',
            value: 'charge_car'
          }
        ]
      },
      {
        label: '电子邮箱',
        name: 'email',
        type: 'text',
        required: true,
        placeholder: '请输入电子邮箱'
      }
    ]
  }
]
