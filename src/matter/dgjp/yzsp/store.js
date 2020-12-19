import { observable, action, runInAction, toJS } from 'mobx'
import { post } from '../../../utils/request'
import API_PATH from '../../../common/apiPath'

class YzspStore {
  @observable YZdata = {}
  @observable ywlsh = null

  @action async getYZLS(params) {
    let res = await post(API_PATH.GET_YZ_LSCX, params)
    runInAction(() => {
      console.log('=================')
      console.log(res)
      this.YZdata = JSON.parse(res.results[0].bcxx[0].beizhu)
      this.ywlsh = res.results[0].ywlsh
      console.log(this.YZdata)
    })
  }
  @action yztj = async params => {
    let res = await post(API_PATH.GET_YZ_LCTJ, params)
    console.log(res)
  }

  @action getYZLC = async params => {
    let res = await post(API_PATH.GET_YZ_XXTS, params)
  }
}

const store = new YzspStore()
export default store
