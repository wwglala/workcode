/*
 * @Date: 2019-09-16 10:25:48
 * @LastEditTime: 2020-04-27 20:21:44
 * @Description: file content
 */
import axios from 'axios'
import qs from 'qs'
import { notification } from 'antd'

const $axios = axios.create({
  timeout: 30000, // 30秒
  responseType: 'json'
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  const errortext = codeMessage[response.status] || response.statusText
  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: errortext,
  })
}

// 请求拦截器
axios.interceptors.request.use(config => {
  // ...统一修改请求头
  return config
}, error => {
  // ...网络错误
  Promise.reject(error)
})

// 响应拦截
$axios.interceptors.response.use(response => {
  console.log(`${response.config.url} ${response.status} -->`, response)
  return checkStatus(response)
}, e => {
  if (e.config) {

    // console.error(`${e.config.url} ${e.response.status} -->`, e)
  } else {
    console.error(e)
  }
  return Promise.reject(e)
})


export const get = (url, params, headers) => new Promise((resolve, reject) => {
  $axios({
    method: 'GET',
    url,
    params,
    paramsSerializer(params) {
      return qs.stringify(params)
    },
    headers: {
      ...headers
    }
  }).then(result => {
    resolve(result)
  }).catch(error => {
    reject(error)
  })
})
export const postToCentralPlatform = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    console.log('请求中台的url', url)
    console.log('请求中台的params', params)
    console.log('请求中台的头信息', headers)
    console.log('请求中台的data', qs.stringify(params))
    $axios({
      method: 'POST',
      url,
      data: qs.stringify(params),
      paramsSerializer: function (params) {
        return qs.stringify(params)
      },
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded', // 指定消息格式
        // 'Authorization': sessionStorage.getItem('token')
      },
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
export const post = (url, params, headers) => new Promise((resolve, reject) => {
  $axios({
    method: 'POST',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
      ...headers
    },
  }).then(result => {
    resolve(result)
  }).catch(error => {
    reject(error)
  })
})

export const postToken = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url: url,
      data: qs.stringify(params),
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', // 指定消息格式
        'Authorization': sessionStorage.getItem('token')
      },
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const request = (url, config) => new Promise((resolve, reject) => {
  $axios({
    url,
    paramsSerializer(params) {
      return qs.stringify(params)
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
    },
    ...config
  }).then(result => {
    resolve(result)
  }).catch(error => {
    reject(error)
  })
})

export default $axios
export const { put } = $axios
export const del = (url, params) => $axios.delete(url, { params })

export const postToCentralPlatform1 = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: qs.stringify(params),
      paramsSerializer: function (params) {
        return qs.stringify(params)
      },
      headers: {
        ...headers,
        'M-Sy-Service': 'shineyue',
        'Content-Type': 'application/x-www-form-urlencoded', // 指定消息格式
        // // eslint-disable-next-line
        // "M-Sy-AppId":window.ztConfigValue.M-Sy-AppId,//AppKey
        // // eslint-disable-next-line
        // "M-Sy-Service":qycode,//服务标识传qycode
        // // eslint-disable-next-line
        // "M-Sy-Version":window.ztConfigValue.M-Sy-Version,//1.0.1
        // 'Authorization': sessionStorage.getItem('token')
      },
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}
