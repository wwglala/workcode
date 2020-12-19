
import md5 from 'md5'

const { clientId, appKey, spaceCode, secretKey, version, role, ipPort } = window.uploadConfig
const serviceid = window.uploadConfig.serviceId

const Utils = {
  upDangAn: obj => {
    let md5Obj = {
      client_id: clientId,
      role: 'admin',
      serviceid,
      timestamp: new Date().valueOf(),
      userid: obj.userid,
      userinfo: JSON.stringify(obj.bbgrxx),
    }
    return {
      type: 'files',
      status: obj.status,
      title: obj.title || undefined,
      isShow: obj.isShow || true,
      ipPort: obj.ipPort || ipPort,
      accept: obj.accept || '*',
      preDel: obj.preDel || undefined, // 下载
      showUpload: obj.showUpload || undefined, // 在线预览
      createuserid: obj.createuserid,
      materialcode: obj.materialcode,
      hasHeader: obj.hasHeader,
      content: obj.content,
      downloadBoardClick: obj.downloadBoardClick,
      tokenHeaders: { // 请求token的header参数
        'M-Sy-AppId': appKey, // 目前先写死，后期可能会改
        'M-Sy-Service': serviceid, // 目前先写死，后期可能会改
        'M-Sy-Version': version // 目前先写死，后期可能会改
      },
      headers: { // 上传至中台请求的header参数
        spaceCode // 目前先写死，后期可能会改
      },
      tokenUrl: '/api-auth/authority/user/token', // 请求token的地址，组件无默认，需传值
      scanningUrl: '/EAMS/business/dacj$m=scanclassifyquery.service', // 档案扫描分类地址，组件库默认此接口，可不传
      queryUrl: '/EAMS/business/dacj$m=checkclassifyquery.service', // 档案查询分类地址，组件库默认此接口，可不传
      upUrl1: '/group1/upload', // 上传至中台地址，组件库默认此接口，可不传
      upUrl2: '/EAMS/business/dacj$m=imageupload.service', // 上传至后台地址，组件库默认此接口，可不传
      delUrl1: '/group1/delete', // 删除中台档案地址，组件库默认此接口，可不传
      delUrl2: '/EAMS/business/dacj$m=imagedelete.service', // 删除后台档案地址，组件库默认此接口，可不传
      loadingUrl: '/EAMS/business/dacj$m=uploadimagl.service', // 档案图片加载地址，组件库默认此接口，可不传
      tokenParams: { // 请求token的参数(示例参数值这些参数需要业务获取传参)
        ...md5Obj,
        sign: md5((`client_id${md5Obj.client_id}role${md5Obj.role}serviceid${md5Obj.serviceid}timestamp${md5Obj.timestamp}userid${md5Obj.userid}userinfo${md5Obj.userinfo}${window.uploadConfig.secretKey}`))
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
      },
      // uPparams1: { // 上传至中台参数
      // },
      uPparams2: { // 上传至后台参数
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

