import { observable, computed, configure, action, runInAction, extendObservable } from 'mobx'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable pagination={ current: 1, pageSize: 10 }
  @observable value=undefined
  // 定义请求id防止加载错数据
  @observable lastFetchId=0
  // 更新store
  @action setStore=(param = {}) => {
    Object.keys(param).map(v => {
      if (v in this) {
        this[v] = param[v]
      } else {
        const temp = {}
        temp[v] = param[v]
        extendObservable(this, temp)
      }
    })
  }

 // 加载远程数据
 @action.bound loadData= async ({ url = '', params = {}, onError = () => {} }) => {
   this.setStore({ loading: true, dataSource: [] })
   try {
     let { current = 1, pageSize = 10 } = this.pagination
     let { page: p, size: s, ...paramss } = params
     params = { page: current, size: pageSize, ...params }
     let res = await post(url, params)
     runInAction(() => {
       let { results: dataSource, totalcount: total } = res
       total = total || 0
       let pagination = {
         ...this.pagination,
         total,
         current: params.page ? params.page : current,
         pageSize: params.size ? params.size : pageSize }
       if (res.count != null && res.count > 0) {
         let i = 1
         res.results.forEach(item => {
           item.numberer = i + (pagination.current - 1) * pagination.pageSize
           i += 1
         })
       }
       this.setStore({ dataSource, pagination, params: paramss })
     })
   } catch (error) {
     console.error(error)
     onError(error)
   }
   this.setStore({ loading: false })
 }
}

export default Store

