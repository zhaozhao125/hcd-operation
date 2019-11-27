import enterpriseInvoice from '@/pages/manage/views/main/enterprise/enterprise-invoice'
const enterpriseList = () => import(/* webpackChunkName: "company" */ '@/pages/manage/views/main/enterprise/enterprise-list/')
const enterpriseFlow = () => import(/* webpackChunkName: "company" */ '@/pages/manage/views/main/enterprise/enterprise-flow/')

export default {
  enterpriseList,
  enterpriseFlow,
  enterpriseInvoice
}
