import { observable, action, runInAction } from 'mobx'
import { post } from '../../../utils/request'

class Store {
  @observable dataSource = []
  @observable totalcount = 0
  // 从后台获取数据
  @action getDataSource = async (url, params = {}) => {
    try {
      let res = await post(url, params)
        runInAction(() => {
          if (res.success) {
            this.dataSource = res.results
            this.totalcount = res.totalcount
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
