import commonService from '@/service/'
import user from './children/user'
import home from './children/home/home'
import order from './children/order/order'
import employees from './children/enterprise/employees'
import enterpriseFlow from './children/enterprise/enterpriseFlow'
export default {
  ...commonService,
  ...user,
  ...home,
  ...order,
  ...employees,
  ...enterpriseFlow
}
