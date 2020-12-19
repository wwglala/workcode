import md5 from 'md5'
import API_PATH from '../../common/apiPath'

const { uploadConfig } = window
const Utils = {
  upDangAn: obj => {
    let md5Obj = {
      client_id: uploadConfig.clientId,
      role: uploadConfig.role,
      serviceid: uploadConfig.serviceId,
      timestamp: new Date().valueOf(),
      userid: obj.userid,
      userinfo: JSON.stringify({ a: 1 }),
    }
    return {
      type: 'files',
      downloadBoard: false,
      ipPort: window.uploadConfig.ipPort,
      status: obj.status,
      title: '材料',
      isShow: true,
      scanningUrl: API_PATH.GET_DASMFL, // 档案扫描分类地址
      tokenHeaders: { // 请求token的header参数
        'M-Sy-AppId': uploadConfig.appKey, // 目前先写死，后期可能会改
        'M-Sy-Service': uploadConfig.serviceId, // 目前先写死，后期可能会改
        'M-Sy-Version': uploadConfig.version // 目前先写死，后期可能会改
      },
      headers: { // 上传至中台请求的header参数
        spaceCode: uploadConfig.spaceCode
      },
      tokenUrl: '/api-auth/authority/user/token', // 请求token的地址
      queryUrl: '/EAMS/business/dacj$m=checkclassifyquery.service', // 档案查询分类地址
      upUrl1: '/group1/upload', // 上传至中台地址
      upUrl2: '/EAMS/business/dacj$m=imageupload.service', // 上传至后台地址
      delUrl1: '/group1/delete', // 删除中台档案地址
      delUrl2: '/EAMS/business/dacj$m=imagedelete.service', // 删除后台档案地址
      loadingUrl: '/EAMS/business/dacj$m=uploadimagl.service', // 档案图片加载地址
      tokenParams: { // 请求token的参数(示例参数值这些参数需要业务获取传参)
        ...md5Obj,
        sign: md5((`client_id${md5Obj.client_id}role${md5Obj.role}serviceid${md5Obj.serviceid}timestamp${md5Obj.timestamp}userid${md5Obj.userid}userinfo${md5Obj.userinfo}${uploadConfig.secretKey}`))
      },
      scanningParams: { // 档案扫描分类参数
        zxbm: obj.zxbm, // 中心编码
        ywfl: obj.ywfl, // 需要自己根据模块定
        ywlb: obj.ywlb, // 需要自己根据模块定
        cplx: obj.cplx, // 产品类型
        proccesskey: obj.proccesskey, // 模块流程发起时的proccesskey
        taskdefinitionkey: obj.taskdefinitionkey, // 一般不用改
      },
      queryParams: { //  档案查询分类参数
        zxbm: obj.zxbm, // 中心编码
        ywfl: obj.ywfl, // 需要自己根据模块定
        ywlb: obj.ywlb, // 需要自己根据模块定
        cplx: obj.cplx, // 产品类型
        khbh: obj.ywlsh, // 业务流水号
        ywlsh: obj.ywlsh, // 业务流水号
        userid: obj.userid,
        blqd: 'zmd',
        materialcode: obj.materialcode || '000000'
      },
      // uPparams1: { // 上传至中台参数
      // },
      uPparams2: { // 上传至后台参数
        bmbh: window.bbgrxx.bmbh,
        blqd: 'zmd',
        username: obj.username,
        userid: obj.userid,
        jgbm: obj.zxbm,
        grbh: obj.grbh,
        khbh: obj.ywlsh,
        zxbm: obj.zxbm,
        ywfl: obj.ywfl, // 需要自己根据模块定
        ywlb: obj.ywlb, // 需要自己根据模块定
        cplx: obj.cplx, // 产品类型
        ywlsh: obj.ywlsh,
      },
      // delParams1: { // 删除至中台参数
      // },
      delParams2: { // 删除至后台参数
        zxbm: obj.zxbm, // 中心编码
        blqd: 'zmd', // 办理渠道
        userid: obj.userid, // 用户id
        jgbm: obj.zxbm, // 中心编码
      },
      loadingParams: {
        zxbm: obj.zxbm, // 中心编码
        blqd: 'zmd', // 办理渠道
        userid: obj.userid, // 用户id
        khbh: obj.ywlsh, // 业务流水号
        ywlsh: obj.ywlsh, // 业务流水号
        // materialcode: '', // 材料编码
        ywfl: obj.ywfl, // 需要自己根据模块定
        ywlb: obj.ywlb, // 需要自己根据模块定
        cplx: obj.cplx, // 产品类型

      }, // 档案图片加载参数
    }
  }
}
export default Utils
