import React from 'react'
import { observable, configure, action, runInAction } from 'mobx'
import { post } from '../../../utils/request'

class RuleStore {
  @observable rules=[]
  @action setRules=v => {
    this.rules = v
  }
  // 获取规则校验
  @action.bound getRules = async (url, params = {}) => {
    console.log('规则请求参数======', params)
    let ress = []
    try {
      this.setRules([])
      let res = await post(url, { body: params })
      runInAction(() => {
        console.log('规则返回结果======', res)
        if (res) {
          for (let i = 0; i < res.length; i += 1) {
            let obj = {}
            obj.sftg = params.sp ? '0' : ''
            obj.gzmc = res[i].gzmc
            obj.key = res[i].deployment_key + res[i].gzbm
            ress.push(obj)
          }
          console.log('规则处理结果======', ress)
          this.setRules(ress)
        }
      })
    } catch (error) {
      console.log('规则获取查询失败', error)
    }
  }

  // 规则校验
  @observable ret = 1
  @observable sureid = ''
  @action.bound getValidRules = async (url, params = {}) => {
    console.log('规则校验参数======', params)
    const header = { usr: '{}' }
    try {
      let res = await post(url, params, header)
      runInAction(() => {
        this.ret = res.ret
        this.sureid = res.sureid
        console.log('规则校验成功=====', res)
      })
    } catch (error) {
      console.log('规则校验失败', error)
    }
  }

  @observable idrules=[]
  @action setIdRules=v => {
    this.idrules = v
  }
  // 根据id获取规则
  @action.bound getIdRules = async (url, params = {}) => {
    console.log('规则请求ID======', params)
    let ress = []
    try {
      this.setIdRules([])
      let res = await post(url, params)
      runInAction(() => {
        console.log('规则ID返回结果======', res)
        if (res && res.success) {
          if (res.data.ruleList) {
            for (let i = 0; i < res.data.ruleList.length; i += 1) {
              let obj = {}
              // eslint-disable-next-line no-nested-ternary
              obj.sftg = res.data.ruleList[i].kzbz === 0 ? '0' : res.data.ruleList[i].kzbz === 1 ? '1' : '1'
              obj.gzmc = res.data.ruleList[i].gzmc
              obj.key = res.data.ruleList[i].deployment_key + res.data.ruleList[i].gzbm
              ress.push(obj)
            }
          }
          console.log('规则ID处理结果======', ress)
          this.setIdRules(ress)
        }
      })
    } catch (error) {
      console.log('规则ID获取查询失败', error)
    }
  }
}
export default new RuleStore()
