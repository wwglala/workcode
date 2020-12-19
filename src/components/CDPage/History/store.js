import { observable, action, runInAction } from 'mobx'
import { post } from '../../../utils/request'

class Store {
  @observable dataSource = []

  // 从后台获取数据
  @action getDataSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
      runInAction(() => {
        if (res.success) {
          this.dataSource = res.results
          this.dataSource.map(item => {
            if (item.bm1 === '02') {
              // eslint-disable-next-line no-useless-call
              this.dataSource.push.apply(this.dataSource, [{ ...item, bbb: '03' }, { ...item, bbb: '04' }])
            }
          })
          this.dataSource.map((item, index) => {
            // eslint-disable-next-line no-prototype-builtins
            this.dataSource = this.dataSource.filter(item => !((item.bm1 === '02') && (!item.hasOwnProperty('bbb'))))
          })
          console.log('获取数据源成功', res)
        } else {
          this.dataSource = []
          console.log('获取数据源 失败', res)
        }
      })
    } catch (error) {
      runInAction(() => {
        this.dataSource = []
        console.log('获取数据源 失败', error)
      })
    }
  }
}
export default new Store()
