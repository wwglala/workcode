import StoreTable from 'antd/lib/table/Table'
import { observable, action, runinAction, toJS } from 'mobx'

class AppStore {
  @observable select = ''
  @action setIt(params) {
    setTimeout(() => {
      this.select = params
    }, 1000)
  }
}

const store = new AppStore()

export default store
