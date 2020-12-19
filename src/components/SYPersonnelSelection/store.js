/*
 * @Author: wgf
 * @Date: 2020-03-21 13:32:08
 * @LastEditors: wgf
 * @LastEditTime: 2020-03-21 14:26:00
 * @Descripttion:
 */
import { observable, computed, action, runInAction, extendObservable } from 'mobx'
import { post } from '../../utils/request'

class Store {
  // 数据参数
  @observable dataSource = []
  @observable dataSourcePerson = []

  // 更新store
  @action setStore = data => {
    this.dataSource = data
  }
  // 更新store
  @action setStorePerson = data => {
    this.dataSourcePerson = data
  }
  // 删除store
  @action delStore = index => {
    const data = this.dataSource
    data.splice(index, 1)
    this.dataSource = data
  }
  // 删除store
  @action delStorePerson = index => {
    const data = this.dataSourcePerson
    data.splice(index, 1)
    this.dataSourcePerson = data
  }
}

export default new Store()

