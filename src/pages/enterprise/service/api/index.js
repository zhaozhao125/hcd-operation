import user from './user'
import home from './home/home'
import order from './order/order'
import employees from './enterprise/employees'
import enterpriseFlow from './enterprise/enterpriseFlow'

export default {
  ...user,
  ...home,
  ...order,
  ...employees,
  ...enterpriseFlow
}
