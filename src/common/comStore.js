/*
 * @Date: 2020-04-27 20:25:35
 * @LastEditTime: 2020-04-27 20:25:37
 * @Description: file content
 */
import { observable, action, toJS, extendObservable } from 'mobx'
import { get, post } from 'Util/request'

class Store {
  @action.bound sendRequest = async (req = []) => {
    if (req.length === 0) {
      return new Promise(resolve => {
        resolve('请传入正确的参数...')
      })
    }
    let promises = req.map(item => {
      const interfaceName = this.getProjectPrefix(item.url)
      return this.createAxios(item.url, item.plug, interfaceName)
    })
    await Promise.all(promises)
  }

  @action.bound createAxios = async (path, obj = {
    method: 'POST',
    params: {},
    headers: {}
  }, interfaceName) => {
    let res
    try {
      if (obj.method === 'POST') {
        res = await post(path, obj.params, obj.headers)
      } else if (obj.method === 'GET') {
        res = await get(path, obj.params, obj.headers)
      }
      if (res.success) {
        if (res.totalcount) {
          extendObservable(this, {
            [interfaceName]: {
              ...res.results
            }
          })
        } else {
          extendObservable(this, {
            [interfaceName]: {
              ...res.data
            }
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  @action getProjectPrefix(url) {
    const backslashIndex = url.lastIndexOf('/') || 0
    const $mIndex = url.lastIndexOf('$m=') || -1
    const interfaceName = url.slice(backslashIndex + 1, $mIndex)
    return interfaceName
  }
}

export default new Store()
