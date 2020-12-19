import { observable, action, runInAction } from 'mobx'
import { Button, message, List } from 'antd'
import API_PATH from '../../../common/apiPath'
import { get, post } from '../../../utils/request'
import { closePCTab, openNewWindow } from '../../../utils/utils'

class YzfqStore {
  @observable YZdata = {}
  @observable ywlsh = null
  @observable xmbh = ''
  @observable xmmc = ''
  @action getXmbh = async params => {
    try {
      let res = await post(API_PATH.GET_XMBH_FQ, params)
      runInAction(() => {
        if (res.success) {
          /** *
           * todo
           * res.result 为空
           */
          console.log(res)
        }
      })
    } catch (error) {
      console.log('xmbh查询失败', error)
    }
  }

  /**
   * 提交
   * @param {*} params
   */
  @action yztj = async params => {
    let res = await post(API_PATH.GET_YZ_LCTJ, params)
    console.log(res)
  }

  /**
   * 用章历史
   * @param {*} params
   */
  @action async getYZLS(params) {
    let res = await post(API_PATH.GET_YZ_LSCX, params)
    runInAction(() => {
      this.YZdata = JSON.parse(res.results[0].bcxx[0].beizhu)
      console.log('++++++++++')
      console.log(this.YZdata)
      this.ywlsh = res.results[0].ywlsh
    })
  }
}

const store = new YzfqStore()

export default store
