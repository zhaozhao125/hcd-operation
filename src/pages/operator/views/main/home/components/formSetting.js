export const completeSetting = [
  {
    items: [
      {
        label: '收款户名',
        name: 'accountName',
        required: true,
        placeholder: '请输入收款户名',
        type: 'text'
      },
      {
        label: '收款账户',
        name: 'accountNumber',
        placeholder: '请输入收款账户',
        required: true,
        type: 'text'
      },
      {
        label: '收款银行',
        name: 'bankName',
        placeholder: '请选择',
        required: true,
        type: 'text',
        options: [
          {
            label: '建行',
            value: 1
          }
        ]
      }
    ]
  }
]
export const withdrawSetting = [
  {
    items: [
      {
        label: '收款户名',
        name: 'bankName',
        placeholder: '请输入收款户名',
        type: 'slot'
      },
      {
        label: '收款账户',
        name: 'companymoney',
        placeholder: '请输入收款账户',
        type: 'slot'
      },
      {
        label: '收款银行名称',
        name: 'bankName111',
        placeholder: '请选择',
        type: 'slot'
      },
      {
        label: '提现金额',
        name: 'applyAmount',
        placeholder: '请选择',
        type: 'number',
        required: true,
        describe: '元'
      },
      {
        label: '账户余额',
        name: 'accountMoney',
        placeholder: '请选择',
        type: 'slot'
      }
    ]
  }
]
