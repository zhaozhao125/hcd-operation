import companyList from './company-list'
import companyAccount from './company-account'
import bill from './bill'
import withdrawRecords from './withdraw-records'
export default {
  ...companyList,
  ...companyAccount,
  ...bill,
  ...withdrawRecords
}
