/*
 * @Date: 2020-04-27 16:34:42
 * @LastEditTime: 2020-07-13 09:51:00
 * @Description: file content
 */
let getUserApi = path => `/api/user/${path}`
let getControlApi = path => `/api/control/${path}`
let getApi = path => `${path}`
let getZsApi = path => `/app-web/appNew/common/${path}`
let getZs = path => `/DM/zg/${path}`
let getGdzcdj = path => `/DM/gdzc/gdzc/${path}`
let getYwslh = path => `/PT/business/${path}`

let getKhdjApi = path => `/DM/zg/${path}`
let getSfCs = path => `/swgl/${path}`
let getEmployeeEntryApi = path => `/DM/rz/${path}`
let getGmhwsxApi = path => `/DM/huowu/${path}` // 购买货物申请事项
let getGysApi = path => `/app-web/appNew/common/${path}`
let getGys = path => `/DM/gys/${path}`
let getXchs = path => `/apm/rlzy/${path}`
let getXcsx = path => `/DM/xcff/jg/${path}`
// let getYjjyApi = path => `DM/jg/yjjy/${path}`
let getLvbzjjn = path => `/DM/ht/bzj/${path}`
let getRzwz = path => `/PT/business/common/${path}`
let getSpnr = path => `/DM/zg/zs/${path}`
// let getYjjyApi = path => `DM/jg/yjjy/${path}`
let getYcsqApi = path => `/DM/baocan/jg/${path}`
let getYcsqCommonApi = path => `/PT/business/core/${path}`
let getCplxApi = path => `/PT/business/common/${path}`
let getFpdjqc = path => `/qg/xmgl/xmzj/${path}`
let getFpdjtest = path => `/qg/fpgl/fpsq/${path}`
let getHtdjQccx = path => `/qg/fpgl/fpsq/${path}`
// let getHtdjXmmc = path => `/DM/ht/htdj/${path}`
// let getRzwz = path => `/PT/business/common/${path}`
// let getSpnr = path => `/DM/zg/zs/${path}`
// let getYjjyApi = path => `/DM/jg/yjjy/${path}`
// let getRzwz = path => `/PT/business/common/${path}`
// let getSpnr = path => `/DM/zg/zs/${path}`
// let getYjjyApi = path => `/DM/yjjy/jg/${path}`
// let getYcsqApi = path => `/DM/jg/ycsq/${path}`
// let getFpdjqc = path => `/qg/xmgl/xmzj/${path}`
// let getFpdjtest = path => `/qg/fpgl/fpsq/${path}`
// let getYjjyApi = path => `/DM/yjjy/jg/${path}`
let getHtdjXmmc = path => `/DM/hetong/ht/${path}`
let getYjjyApi = path => `/DM/yjjy/jg/${path}`
let getXcHsdw = path => `/apm/common/${path}`
let getDbcs = path => `/ywcx/${path}`
let getTbzb = path => `/DM/toubiao/ku/${path}`
let getylbxApi = path => `/DM/xcff/jg/ylbxhd/${path}`
let getPt = path => `/PT/${path}`
let getKhcx = path => `/PT/business/core/${path}`
let getFkfs = path => `/PT/business/common/${path}`
let getGmbsLcfq = path => `/DM/zz/toubiao/${path}`
let getDb = path => `/DM/xcff/jg/${path}`
let getExampleApi = path => `/WXZJ/yzgl/yzdj/${path}.service`
let getWXZJXLKApi = path => `/WXZJ/common/${path}.service`
let getDmApi = path => `/DM/${path}.service`
let getYgApi = path => `/DM/rlzy/bm/${path}`
let getSbbxApi = path => `/DM/sbbx/gr/${path}`
let getCommonApi = path => `/PT/business/common/${path}`
let getZhuanzhengApi = path => `/DM/zg/zhuanzheng/${path}`
let getdzyhpApi = path => `/DM/sx/dzyhp/${path}`
let getGGCSApi = path => `/PT/${path}.service`
let getDgjpApi = path => `/DM/dgjp/gr/${path}`
let getHwckApi = path => `/DM/huowu/hw/${path}`// 货物出库
let getDgfkApi = path => `/DM/kehu/jg/${path}`// 对公付款
let getCpxjCommonApi = path => `/PT/business/${path}`
let getCpxjApi = path => `/DM/cpxj/kh/${path}`
let getGdzccg = path => `/DM/xm/gdzc/${path}`
let getRyxxwhApi = path => `/DM/xxwh/gr/${path}`
let getRyxxwhCommonApi = path => `/PT/business/common/${path}`
let getGhjfjnApi = path => `/DM/xcff/jg/${path}`
let getTgApi = path => `/DM/rlzy/bm/${path}.service`
let getTgApi2 = path => `/Zzjg/manage/${path}`
let getTgApi3 = path => `/Zzjg/zzjg/${path}`
let getTgApi4 = path => `/PT/business/common/${path}`
let getLzApi = path => `/DM/rlzy/gr/${path}`
let getGjjHd = path => `/DM/xcff/jg/${path}`
let getZfgjjjn = path => `/DM/jg/gjjjn/${path}.service`
let getQyxxwh = path => `/DM/xxwh/jg/${path}`
let getBaobiao = path => `/DM/baobiao/${path}`
const apiPath = {
  // 中台对接使用
  // 获取中台的tocken
  GET_CENTRALPLATFORM_TOCKEN_DATA: getApi('/api-auth/oauth2/user/token'),
  GET_FILE_TOKEN: getApi('/api-auth/authority/user/token'),
  // 中台票据绑定
  CENTRALPLATFORM_TICKET_BIND: getApi('/api-auth/authority/ticket/bind'),
  // CENTRALPLATFORM_TICKET_BIND: getApi('/api-auth/oauth2/ticket/bind'),
  // 中台票据验证
  CENTRALPLATFORM_TICKET_VALIDATE: getApi('/api-auth/oauth2/ticket/validate'),
  CENTRALPLATFORM_TICKET_VALIDATENEW: getApi('/api-auth/authority/ticket/validate'),
  GET_BB_GRXX: getApi('/app-web/app/mine/grxx.service'),
  GET_PROCESSXX: getApi('/PT/business/common/spyj$m=query.service'),
  // 用户API
  USER_NAME_LOGIN: getUserApi('user_name_login'),
  USER_TELNUM_LOGIN: getUserApi('user_telnum_login'),
  USER_REGISTER: getUserApi('register'),

  GET_YWLSH: getApi('/PT/business/common/ywlsh$m=query.service'),
  GET_BPMID: getApi('/PT/business/common/bpmid$m=query.service'),
  GET_XMBH: getApi('/PT/business/common/xmbh$m=query.service'),
  // 获取项目编号
  GET_XMBH_FQ: getApi('/PT/business/common/project$m=query.service'),
  // 菜单路由权限API
  GET_MENU_LIST: getControlApi('get_menu_list'),
  GET_PERMISSION_LIST: getControlApi('get_permission_list'),
  GET_COMMON_PROCESSLIST: getApi('/app-web/app/frame/spyjcx.service'),
  GET_SFCX: getApi('/swgl/sfcx$m=query.service'),

  // 固定资产登记API
  // GET_GDZCDJ_LCFQ: getGdzcdj('zssq#m=execute.service'),
  GET_GDZCDJ_XXCX: getGdzcdj('zcdj$m=query.service'),
  GET_GDZCDJ_DEL: getGdzcdj('zcdj$m=remove.service'),
  GET_GDZCDJ_SAVE: getGdzcdj('zcdj$m=save.service'),
  GET_GDZCDJ_CHG: getGdzcdj('zcdj$m=modify.service'),
  GET_GDZCCDJ_DATA: getGdzcdj('zcdj$m=modify.service'), // 固定资产登记，编辑存放地方
  GET_GDZCCDJZCLB_DATA: getCommonApi('ptbmb$m=query.service'), // 固定资产登记，资产类别
  GET_GDZCCDJZCMC_DATA: getCommonApi('ptbmb$m=query.service'), // 固定资产登记，资产名称
  GET_GDZCDJCFDD_DATA: getCommonApi('ptbmb$m=query.service'), // 固定资产登记，存放地方
  GET_GDZCCFDDXG_DATA: getGdzcdj('zcdj$m=modify.service'), // 固定资产登记，存放地方修改

  GET_GDZCCFDD_XXCX: getGdzcdj('cfdd$m=query.service'),
  GET_GDZCCFDD_SAVE: getGdzcdj('cfdd$m=save.service'),
  GET_GDZCCFDD_DEL: getGdzcdj('cfdd$m=remove.service'),
  GET_GDZCCFDD_CHG: getGdzcdj('cfdd$m=modify.service'),

  // GET_GDZC_GSCX: getGdzcdj('gsxx$m=query.service'),
  // GET_GDZC_YGSF: getGdzcdj('ygsf$m=query.service'),
  // GET_GDZC_ZCLX: getGdzcdj('zclx$m=query.service'),
  // GET_GDZC_ZCMC: getGdzcdj('zcmc$m=query.service'),
  // GET_GDZC_GDZCBH: getGdzcdj('gdzcbh$m=Generate.service'),

  // 客户登记
  GET_KHDJ_SAVE: getKhdjApi('bpmid.service'),
  GET_KHDJ_DEL: getKhdjApi('ywlsh.service'),
  GET_KHDJ_SEARCH: getKhdjApi('sswz#m=query.service'),
  GET_KHDJ_KHDJTJ: getKhdjApi('ssh#m=query.service'),
  // 供应商信息
  GET_SF: getSfCs('sfcx$m=query.service'),
  GET_CS: getSfCs('cscx$m=query.service'),
  GET_GYS_BPMID: getGysApi('bpmid.service'),
  GET_GYS_YWLSH: getGysApi('ywlsh.service'),
  GET_GYS_LCFQ: getGys('gysxx#m=save.service'),
  GET_GYS_CX: getGys('gys#m=query.service'),
  GET_GYS_XXCX: getGys('gysxx#m=query.service'),
  GET_GYS_XXBG: getGys('gysxx#m=update.service'),

  // 入职申请发起API
  EmployeeEntry_Apply: getEmployeeEntryApi('ruzhi/rzsq/rzsqbl$m=execute.service'),

  //- --------货物购买事项------
  // 供应商名称
  GET_GYSMC_DATA: getGmhwsxApi('hw/hwcgsqkhmc$m=query.service'),
  // 得到业务流水号
  GET_YWLSH_DATA: getYwslh('common/ywlsh$m=query.service'),
  // 得到Bpmid
  GET_ZCQL_BPMID: getYwslh('common/bpmid$m=query.service'),
  // 项目名称
  GET_XMMC_DATA: getGmhwsxApi('hw/hwcgsqxmmc$m=query.service'),
  // 销售合同名称
  GET_XSHTMC_DATA: getGmhwsxApi('hw/hwcgsqxsht$m=query.service'),
  // 客户名称
  GET_KHMC_DATA: getGmhwsxApi('hw/hwcgsqkhmc$m=query.service'),
  // 采购货物明细
  GET_CGHWMX_DATA: getGmhwsxApi('hw/hwcgsqxsht$m=query.service'),
  // GET_CGHWMX_DATA: getGmhwsxApi('hw/hwcgsqqc$m=query.service'),
  // 合同乙方
  GET_HTYF_DATA: getGmhwsxApi('hw/hwcgsqhtyf$m=query.service'),
  // 提交审批
  GET_TJSP_DATA: getGmhwsxApi('hw/hwcgsq$m=execute.service'),
  // 审批反显
  GET_SPFX_DATA: getGmhwsxApi('hw/hwcgsqqc$m=query.service'),
  // 产品明细反显
  GET_CPMXFX_DATA: getGmhwsxApi('hw/hwcgsqqc$m=query.service'),
  // 产品明细存入数据库得接口
  GET_CRSJK_DATA: getGmhwsxApi('hw/hwcgsq$m=mxsave.service'),
  // 获得项目编号
  GET_XMBH_DATA: getRzwz('xmbh$m=query.service'),
  // 住宿申请API
  GET_ZS_BPMID: getZsApi('bpmid.service'),
  GET_ZS_YWLSH: getZsApi('ywlsh.service'),
  GET_ZS_SSWZ: getZs('sswz#m=query.service'),
  GET_ZS_SSH: getZs('ssh#m=query.service'),
  GET_ZS_YWLX: getZs('lsjl#m=query.service'),
  GET_ZS_LCFQ: getZs('zssq#m=execute.service'),
  GET_ZS_SPXX: getZs('zssq#m=query.service'),

  // 薪酬核算 /apm/rlzy/xinzi/xzcx$m=Query.service
  GET_XC_BPMID: getZsApi('bpmid.service'),
  GET_XC_YWLSH: getZsApi('ywlsh.service'),
  GET_GZDR_LIST: getXchs('xinzi/xzcx$m=Query.service'),
  GET_XCHS_XXCX: getXcsx('xchsxx$m=query.service'),
  GET_XCHS_XXDR: getXcsx('xchsxx$m=import.service'),
  GET_XCHS_XXDC: getXcsx('xchsxx$m=export.service'),
  GET_XCHS_XXXQ: getXcsx('xchsxxxq$m=query.service'),
  GET_XCHS_XXXG: getXcsx('xchsxx$m=update.service'),
  GET_XCHS_XXBC: getXcsx('xchsxx$m=execute.service'),

  // 履约保证金缴纳
  GET_LVBZJJNKHMC_DATA: getGGCSApi('business/core/customer$m=query'), // 客户名称
  GET_LVBZJJNXMMC_DATA: getLvbzjjn('bzjxmmc$m=query.service'),
  GET_LVBZJJNHTMC_DATA: getLvbzjjn('bzjht$m=query.service'),
  GET_LVBZJJNTJSQ_DATA: getLvbzjjn('bzjsq$m=execute.service'),
  GET_LVBZJJNFKFS_DATA: getGGCSApi('business/common/ptbmb$m=query'), // 付款方式
  GET_LVBZJJNSPFX_DATA: getLvbzjjn('bzjsqqc$m=query.service'),
  GET_LVBZJFKDW_DATA: getGGCSApi('business/core/organization$m=query'), // 付款单位
  GET_RY_QY: getXcHsdw('common/zgs$m=query.service'),

  // 大病保险核定 /ywcx/ryhx/wccx$m=Query.service
  GET_DB_CX: getXcHsdw('common/yhlxcx$m=query.service'),
  GET_DB_CS: getDbcs('ryhx/wccx$m=Query.service'),
  GET_DB_XXCX: getDb('dbxxx$m=query.service'),
  GET_DB_XXSC: getDb('dbxxx$m=execute.service'),
  GET_DB_DR: getDb('dbxxx$m=import.service'),
  GET_DB_DC: getDb('dbxxx$m=export.service'),
  GET_DB_XG: getDb('dbxxx$m=update.service'),
  GET_DB_SD: getDb('dbxxxsd$m=execute.service'),
  GET_DB_JS: getDb('dbxxxjs$m=execute.service'),
  GET_DB_CWXX: getDb('dbxcwxx$m=query.service'),
  GET_DB_YFCX: getDb('gsbxhdjnyfcx$m=query.service'),

  // 住宿申请
  GET_ZSSQ_RZWZ: getRzwz('jgbmb$m=query.service'),
  GET_ZSSQ_SPNR: getSpnr('dqzsxx$m=query.service'),
  GET_ZSSP_SPFX: getSpnr('spfx$m=query.service'),
  // 意见建议
  GET_YJJY_SZSY: getYjjyApi('yjjyfq$m=execute.service'),
  // 意见建议审批反显
  GET_YJJYSPFX_SZSY: getYjjyApi('yjjyhx$m=query.service'),

  // 用餐申请
  GET_YCSQ_SZSY: getYcsqApi('ycsqfq$m=execute.service'),
  // 用餐菜品的查询
  GET_YCSQ_HQCP: getYcsqApi('ycsqcpcx$m=Query.service'),
  // 用餐菜品的新增
  GET_YCSQ_CPXZ: getYcsqApi('cpczxx$m=Save.service'),
  // 用餐菜品的修改
  GET_YCSQ_CPXG: getYcsqApi('cpczxx$m=Change.service'),
  // 用餐菜品的删除
  GET_YCSQ_CPSC: getYcsqApi('cpczxx$m=Remove.service'),
  // 用餐菜品类型查询
  GET_YCSQ_CPLXMC: getCplxApi('jgbmb$m=query.service'),
  // 用餐套餐名称查询
  GET_YCSQ_TCMC: getYcsqApi('cptc$m=Query.service'),
  // 用餐套餐种类查询
  GET_YCSQ_TCZL: getYcsqApi('cptcxx$m=Query.service'),
  // 用餐套餐种类新增
  GET_YCSQ_TCZLXZ: getYcsqApi('cptcxx$m=Save.service'),
  // 用餐套餐种类删除
  GET_YCSQ_TCZLSC: getYcsqApi('cptcxx$m=Save.service'),
  // 用餐套餐种类修改
  GET_YCSQ_TCZLXG: getYcsqApi('cptcxx$m=Change.service'),
  // 用餐客户名称
  GET_YCSQ_KHMC: getYcsqCommonApi('customer$m=query.service'),
  GET_YCSQ_DQMC: getCplxApi('jgbmb$m=query.service'),

  // 发票登记测试
  GET_FPDJ_QCCX: getFpdjqc('xmgl_xmzj$m=xmzjhzQc'),
  GET_FPDJ_test: getFpdjtest('khcx$m=search.service'),

  // 续签API
  GET_XUQIAN_QUERY: getApi('/DM/rlzy/gr/ldhtxq$m=query.service'),
  GET_XUQIAN_EXECUTE: getApi('/DM/rlzy/gr/ldhtxq$m=execute.service'),
  // 保险缴纳
  GET_BXJN_BXFXXX: getApi('/DM/xcff/jg/bxjnfqxx$m=query.service'),
  GET_BXJN_SAVE: getApi('/DM/xcff/jg/bxjn$m=execute.service'),
  GET_BXJN_QUERTY: getApi('/DM/xcff/jg/bxjn$m=query.service'),
  // 投标准备
  // 标书内容项保存
  GET_TBZB_BSNRX_SAVE: getTbzb('tbzb$m=save.service'),
  // 标书内容项删除
  GET_TBZB_BSNRX_Remove: getTbzb('tbzb$m=Remove.service'),
  // 投标准备发起/审批/退回
  GET_TBZB_Execute: getTbzb('tbzb$m=Execute.service'),
  // 投标准备审批信息查询/清册查询
  GET_TBZB_Query: getTbzb('tbzb$m=Query.service'),
  // 付款银行账户
  GET_TBZB_FKYHZHCX: getApi('/PT/business/core/bankaccount$m=query.service'),
  // 投标结果录入
  GET_TBJGLR_SAVE: getTbzb('tbjglr$m=Execute.service'),
  // 养老保险核定
  GET_YLBXHD_SC: getylbxApi('sjsc$m=execute.service'),
  GET_YLBXHD_XG: getylbxApi('sjxg$m=change.service'),
  GET_YLBXHD_SD: getylbxApi('jsOrSd$m=change.service'),
  GET_YLBXHD_CX: getylbxApi('qccx$m=query.service'),
  GET_YLBXHD_DC: getylbxApi('sjdc$m=export.service'),
  GET_YLBXHD_DR: getylbxApi('sjdr$m=import.service'),
  GET_YLBXHD_JNYFCX: getApi('/DM/xcff/jg/yl/yjnyf$m=change.service'),

  // 退宿办理
  // GET_TS_SSWZ: getApi('/PT/business/common/jgbmb$m=query.service'),
  // GET_TS_DQZSXX: getApi('/DM/zg/zs/dqzsxx$m=query.service'),
  // GET_TS_LCFQ: getApi('/DM/zg/ts/lcyw$m=execute.service'),
  // GET_TS_SPFXXX: getApi('/DM/zg/ts/spfx$m=query.service'),
  // GET_TS_SSWZ: getPt('business/common/jgbmb$m=query.service'),
  // GET_TS_SPFXXX: getZs('ts/spfx$m=query.service'),
  // GET_TS_DQZSXX: getZs('zs/dqzsxx$m=query.service'),
  // GET_TS_LCFQ: getZs('ts/lcyw$m=execute.service'),
  // GET_TS_BPMID: getZsApi('bpmid.service'),
  // GET_TS_YWLSH: getZsApi('ywlsh.service'),
  // GET_TS_XMBH: getPt('business/common/xmbh$m=query.service'),
  GET_TS_SSWZ: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_TS_SPFXXX: getApi('/DM/zhusu/gr/ts/spfx$m=query.service'),
  GET_TS_DQZSXX: getApi('/DM/zhusu/gr/ts/dqzsxx$m=query.service'),
  GET_TS_LCFQ: getApi('/DM/zhusu/gr/ts/lcyw$m=execute.service'),

  // 下拉框客户查询
  GET_GMBS_KHCX: getKhcx('customer$m=query.service'),
  // 下拉框付款方式
  GET_GMBS_GGFKFS: getFkfs('ptbmb$m=query.service'),
  // 下拉框投标主体和付款单位
  GET_GMBS_TBZTANDFKDW: getKhcx('organization$m=query.service'),
  // 购买标书流程提交
  GET_GMBS_LCTJ: getApi('/DM/toubiao/ku/gmbs$m=execute.service'),
  // 购买标书审批查询
  GET_GMBS_SPCX: getApi('/DM/toubiao/ku/gmbs$m=query.service'),
  // 购买标书银行账号查询
  GET_GMBS_YHKZHCX: getApi('/PT/business/core/bankaccount$m=query.service'),

  GET_WYQYMC: getExampleApi('yzdj_wyqylx_cx'),
  // bpmid查询
  GET_BPMID_CX: getGGCSApi('business/common/bpmid$m=query'),
  // ywlsh查询
  GET_YWLSH_CX: getGGCSApi('business/common/ywlsh$m=query'),
  GET_XMBH_CX: getGGCSApi('business/common/xmbh$m=query'),

  // 商品入库
  // GET_CGSQMC_CX: getUserApi('user_name_login'), // 采购申请名称
  // GET_KHMC_CX: getUserApi('user_name_login'), // 客户名称
  // GET_XSHTMC_CX: getUserApi('user_name_login'), // 销售合同名称
  // GET_XMMC_CX: getUserApi('user_name_login'), // 项目名称
  GET_FHDZ_CX: getExampleApi('yzdj_wyqylx_cx'), // 发货地址
  GET_SHDZ_CX: getExampleApi('yzdj_wyqylx_cx'), // 收货地址
  GET_HWRK_BC_CX: getDmApi('huowu/hw/hwrkfq$m=execute'), // 保存
  GET_HWRKFX_CX: getDmApi('huowu/hw/hwrkcx$m=query'), // 货物入库数据反显

  // 销出差
  GET_XCFQ: getApi('/DM/waichu/xm/xcsq$m=execute.service'), // 销差发起
  GET_XCSP_CX: getApi('/DM/waichu/xm/xcspxx$m=query.service'), // 销差审批信息查询
  GET_CCXX_CX: getApi('/DM/waichu/xm/ccxx$m=query.service'), // 出差信息查询
  GET_XCLSXX_CX: getApi('/DM/waichu/xm/xclscx$m=query.service'), // 销差历史信息查询
  GET_XCLSXQ_CX: getApi('/DM/waichu/xm/xclsxqcx$m=query.service'), // 销差历史详情查询

  // 外出
  GET_WCFQ: getApi('/DM/waichu/gr/wcsq$m=execute.service'), // 外出流程发起、审批、调整
  GET_WCXX_CX: getApi('/DM/waichu/gr/wclscx$m=query.service'), // 外出信息查询
  GET_WCLS_XQ: getApi('/DM/waichu/gr/wclsxqcx$m=query.service'), // 历史详情查询
  GET_WCSPXX_CX: getApi('/DM/waichu/gr/wcspxx$m=query.service'), // 外出审批信息查询

  // 合同登记
  GET_HTDJ_HTXXMXCX: getHtdjXmmc('htxq$m=query.service'),
  GET_HTDJ_ZBXMMCCX: getHtdjXmmc('zbxx$m=query.service'),
  GET_HTDJ_BPMID: getApi('/PT/business/common/bpmid$m=query.service'),
  GET_HTDJ_YWLSH: getApi('/PT/business/common/ywlsh$m=query.service'),
  GET_HTDJ_FXYWLSH: getHtdjXmmc('htzc$m=xmbhcx.service'),
  GET_HTDJ_XMBH: getApi('/PT/business/common/xmbh$m=query.service'),
  GET_HTDJ_CpdjBc: getHtdjXmmc('htxxbc$m=save.service'),
  GET_HTDJ_NEWXMBH: getApi('/PT/business/common/xmbh$m=query.service'),
  GET_HTDJ_HTMXDELETE: getHtdjXmmc('htmxsc$m=delete.service'),
  GET_HTDJ_TJ: getHtdjXmmc('htdjlc$m=execute.service'),
  GET_HTDJ_JBXXCX: getHtdjXmmc('htxx$m=htxxcx.service'),
  GET_HTDJ_HTLXCX: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_HTDJ_KHCX: getApi('/PT/business/core/customer$m=query.service'),
  GET_HTDJ_LXRCX: getHtdjXmmc('htlxr$m=query.service'),
  GET_HTDJ_DXBH: getApi('/PT/business/common/dxbh$m=query.service'),
  // 业务流水号
  GET_COMMON_YWLSH: getCommonApi('ywlsh$m=query.service'),
  GET_KAPAI_YWLSH: getApi('/PT/business/common/ywlsh$m=query.service'),
  // bpmid
  GET_COMMON_BPMID: getCommonApi('bpmid$m=query.service'),
  GET_KAPAI_BPMID: getApi('/PT/business/common/bpmid$m=query.service'),
  // 项目编号
  GET_COMMON_XMBH: getCommonApi('project$m=query.service'),
  GET_KAPAI_XMBH: getApi('/PT/business/common/project$m=query.service'),

  // 用工需求相关接口
  // 返显信息
  GET_YGXQ_FXXX: getYgApi('yg$m=ygSpCxQuery.service'),
  // 获取历史次数、历史信息历史
  GET_YGXQ_LSCX: getYgApi('yg$m=ygHistoryQuery.service'),
  // 公司查询
  GET_YGXQ_GSCX: getTgApi2('company$m=query'),
  // 部门查询
  GET_YGXQ_BMCX: getTgApi2('dept$m=query'),
  // 岗位查询
  GET_YGXQ_GWCX: getTgApi3('job$m=query'),
  // 性别、年龄、工作年限、学历查询
  GET_YGXQ_XXCX: getYgApi('yg$m=ygBmQuery.service'),
  // 申请审批流程接口
  GET_YGXQ_LCSQSP: getYgApi('yg$m=execute.service'),

  // 设备报修相关接口
  // 历史次数查询
  GET_SBBX_LSCSCX: getSbbxApi('sbbx$m=sbbxQuery.service'),
  // 报修地点查询
  GET_SBBX_BXDDX: getSbbxApi('sbbx$m=sbbxBmQuery.service'),
  // 报修物品查询
  GET_SBBX_BXWPCX: getSbbxApi('sbbx$m=sbbxBmQuery.service'),
  // 历史记录查询
  GET_SBBX_LSJLCX: getSbbxApi('sbbx$m=sbbxQuery.service'),
  // 申请审批流程
  GET_SBBX_LCSQSP: getSbbxApi('sbbx$m=execute.service'),
  // 返显信息
  GET_SBBX_FXXXCX: getSbbxApi('sbbx$m=sbbxSpCxQuery.service'),

  // 转正
  GET_ZHUANZHENG_GRXX: getZhuanzhengApi('zzsqxx$m=query.service'),
  GET_ZHUANZHENG_LCFQ: getApi('/DM/rlzy/gr/zgzzLcbl$m=execute.service'),
  GET_ZHUANZHENG_SPXX: getApi('/DM/rlzy/gr/zzsqspxx$m=query.service'),
  // 低值易耗品
  GET_DZYHPCGSQ_QC: getApi('/DM/sx/dzyhp/dzyhpcgsq$m=query.service'),
  GET_DZYHPCGSQ_BM: getdzyhpApi('dzyhpcgsq$m=BmQuery.service'),
  GET_DZYHPCGSQ_SAVE: getApi('/DM/sx/dzyhp/dzyhpcgsq$m=save.service'),
  GET_DZYHPCGSQ_XMBH: getApi('/PT/business/common/xmbh$m=query.service'),
  GET_DZYHPCGSQ_YWLSH: getApi('/PT/business/common/ywlsh$m=query.service'),
  GET_DZYHPCGSQ_SPLC: getApi('/DM/sx/dzyhp/dzyhpcgsq$m=dzyhpsplc.service'),
  GET_DZYHPCGSQ_DELETE: getApi('/DM/sx/dzyhp/dzyhpcgsq$m=mxdelete.service'),
  GET_DZYHPCGSQ_LSCS: getApi('/DM/sx/dzyhp/dzyhpcgsq$m=query.service'),

  // 订购机票-信息查询
  GET_DGJP_XXCX: getDgjpApi('jpxx$m=query.service'),
  // 订购机票-信息录入
  GET_DGJP_XXLR: getDgjpApi('jpxx$m=save.service'),
  // 订购机票-信息修改
  GET_DGJP_XXXG: getDgjpApi('jpxx$m=save.service'),
  // 订购机票-信息删除
  GET_DGJP_XXSC: getDgjpApi('jpxx$m=remove.service'),
  // 订购机票-审批页面查询
  GET_DGJP_SPFX: getDgjpApi('jpxx$m=query.service'),
  // 订购机票-流程发起
  GET_DGJP_LCFQ: getDgjpApi('jpxxsp$m=execute.service'),
  // 订购机票-流程查询
  GET_DGJP_LCSP: getDgjpApi('jpxxsp$m=query.service'),
  // 订购机票-项目编号
  GET_DGJP_XMBH: getPt('business/common/xmbh$m=query.service'),
  GET_DGJP_YWLSH: getPt('business/common/ywlsh$m=query.service'),
  GET_DGJP_BPMID: getPt('business/common/bpmid$m=query.service'),
  GET_DGJP_BM: getPt('business/common/ptbmb$m=query.service'),
  GET_XMMC: getPt('business/core/project$m=query.service'),
  // 解除劳资关系申请流程
  GET_JCLZGX_TJ: getApi('/DM/rlzy/bm/lcfqsp$m=execute.service'),
  // 解除劳资关系审批反显
  GET_JCLZGX_SPSJFX: getApi('/DM/rlzy/bm/spfxcx$m=query.service'),
  // 解除劳资关系历史
  GET_JCLZGX_LSCS: getApi('/DM/rlzy/bm/lscx$m=query.service'),
  GET_CXRYXX: getApi('/PT/business/core/personal$m=query.service'), // 公共查询人员
  // 借款
  GET_JKSQLC_TJ: getDmApi('jkbx/gr/jklcfqsp$m=execute'),
  GET_JKSQLC_SPSJFX: getDmApi('jkbx/gr/jkspfxcx$m=query'),
  // 合同签订
  GET_HTQDQYGS_SQ_NEW: getApi('/Zzjg/manage/company$m=query'),
  GET_HTQDQYGS_SQ: getApi('/PT/business/core/organization$m=query.service'),
  GET_YWLSH_FQ: getApi('/PT/business/common/ywlsh$m=query.service'),
  GET_BPMID_FQ: getApi('/PT/business/common/bpmid$m=query.service'),
  GET_HTQDKHMC_SQ: getApi('/PT/business/core/customer$m=query.service'),
  GET_HTQDLX_SQ: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_HTQDXMBH_SQ: getApi('/PT/business/common/xmbh$m=query.service'),
  // GET_HTQD_SQ: getApi('/DM/ht/htqd/htqdsq$m=execute.service'),
  // GET_HTQDXXFX_SP: getApi('/DM/ht/htqd/spymspfx$m=query.service'),
  GET_HTQD_SQ: getApi('/DM/hetong/ht/htqd/htqdsq$m=execute.service'),
  GET_HTQDXXFX_SP: getApi('/DM/hetong/ht/htqd/spymspfx$m=query.service'),

  // 部门查询
  GET_TBZB_BMCX: getApi('/Zzjg/manage/dept$m=query'),
  GET_HTQDYZ_SQ: getApi('/DM/zz/yz/yzsq$m=execute.service'),
  // 客户解决方案
  GET_KHJJFA_FQ: getApi('/DM/kehu/kh/khjjfasq$m=execute.service'),
  GET_KHJJFA_CX: getApi('/DM/kehu/kh/khjjfasq$m=query.service'),
  GET_KHJJFA_SP: getApi('/DM/kehu/kh/khjjfasq$m=execute.service'),
  GET_KHJJFA_TH: getApi('/DM/kehu/kh/khjjfasq$m=execute.service'),
  GET_KHJJFA_LXCX: getApi('/PT/business/common/ptbmb$m=query.service'),
  GET_KHJJFA_KHCX: getApi('/PT/business/core/customer$m=query.service'),
  // 报价
  GET_BJ_FQ: getApi('/DM/bjsq/kh/bjsq$m=execute.service'),
  GET_BJ_CX: getApi('/DM/bjsq/kh/bjsq$m=query.service'),
  GET_BJ_KHCX: getApi('/DM/bjsq/kh/customer$m=query.service'),
  GET_BJ_SP: getApi('/DM/bjsq/kh/bjsq$m=execute.service'),
  GET_BJ_CPXLBCX: getApi('/PT/business/common/ptbmb$m=query.service'),
  GET_BJ_GDSFBL: getApi('/PT/business/core/setup$m=query.service'),
  // 往来单位登记
  // GET_WLDWDJ_LXRCX: getWLDWDJAPI('wldwxx$m=wldwxxcx.service'),

  // 住宿办理
  GET_ZSSQ_ZSRXX: getApi('/DM/zhusu/gr/zs/dqzsxx$m=query.service'), // 申请人住宿信息
  GET_ZSSQ_GETRZWZ: getApi('/PT/business/common/jgbmb$m=query.service'), // 入住位置
  GET_ZSSQ_GETXB: getApi('/PT/business/core/personal$m=query.service'), // 查询性别
  GET_ZSSQ_LCFQ: getApi('/DM/zhusu/gr/zs/lcyw$m=execute.service'), // 流程发起
  GET_ZSSQ_SPCX: getApi('/DM/zhusu/gr/zs/spfx$m=query.service'), // 审批反显
  GET_ZSSQ_GETSSH: getApi('/DM/zhusu/gr/zs/listSshCx$m=query.service'), // 获取宿舍号

  // 工会经费缴纳相关接口
  // 收款单位查询
  GET_GHJFJN_XXCX: getGhjfjnApi('ghjfjn$m=gfjnBmQuery.service'),
  // 付款单位查询
  GET_GHJFJN_FKDWCX: getTgApi2('company$m=query'),
  // 工会经费缴纳申请审批流程
  GET_GHJFJN_LCSQSP: getGhjfjnApi('ghjfjn$m=ghjfjnExecute.service'),
  // 工会经费缴纳审批信息返显
  // GET_GHJFJN_XXFX: getGhjfjnApi('gfjnsq$m=gfjnQuery.service'),

  // 失业保险核定
  GET_SBZH: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_YGXM: getApi('/PT/business/core/personal$m=query.service'),
  GET_SY_SC: getApi('/PT/business/common/sql$m=query.service'),
  GET_SY_XG: getApi('/PT/business/core/project$m=save.service'),
  GET_SY_SZT: getApi('/PT/business/common/sql$m=query.service'),
  GET_SY_SS: getApi('/PT/business/core/project$m=save.service'),
  GET_SY_JS: getApi('/PT/business/core/project$m=save.service'),
  GET_MBXZ: getApi('/DM/zg/syhs/syhsmbxz$m=downLoad.service'),
  GET_SY_DR: getApi('/PT/business/core/project$m=save.service'),
  GET_SY_DC: getApi('/PT/business/core/project$m=save.service'),
  GET_GHJNSQ_XXFX: getGhjfjnApi('gfjnsq$m=gfjnQuery.service'),
  GET_GHJFJN_XXFX: getGhjfjnApi('ghjfjn$m=gfjnQuery.service'),
  GET_CGSQMC_CX: getDmApi('hwrk/huowu/cgsqmccx$m=query'), // 采购申请名称
  GET_HWRK_CGSQMC_CX: getDmApi('huowu/hw/cgsqmccx$m=query'), // 采购申请名称
  GET_BC_CX: getDmApi('hwrk/huowu/hwrkfq$m=execute'), // 保存

  // 中标服务费申请
  GET_ZBFWFSQ_KHMC_CX: getDmApi('toubiao/kehu/zbfwfxlkcx$m=query'), // 招标项目名称
  GET_ZBFWFSQ_GGJKKHMC_CX: getGGCSApi('business/core/customer$m=query'), // 客户名称
  GET_ZBWFSQ_CX: getDmApi('toubiao/kehu/zbfwsq$m=execute'), // 中标服务费申请
  GET_ZBFWSQ_YHZH_CX: getGGCSApi('business/core/bankaccount$m=query'), // 银行账户
  GET_ZBFWSQ_KHH_CX: getGGCSApi('business/common/jgbmb$m=query'), // 银行开户行
  // 中标服务费审批
  GET_KHXPFX_CX: getDmApi('toubiao/kehu/zbfwfcx$m=query'), // 中标服务费审批反显

  // 用章流程提交
  GET_YZ_LCTJ: getApi('/DM/yzsq/jg/yzsq$m=execute.service'),
  // 用章流程查询
  GET_YZ_SPCX: getApi('/DM/yzsq/jg/yzsq$m=query.service'),
  // 用章历史查询
  GET_YZ_LSCX: getApi('/DM/yzsq/jg/yzsq$m=query.service'),
  GET_YZ_LB: getApi('/PT/business/common/jgbmb$m=query.service'),
  // 用章消息推送
  GET_YZ_XXTS: getApi('/DM/yzsq/jg/getSqlData$m=messageQuery.service'),
  // 货物出库接口API
  // 客户名称查询API
  GET_HWCKKHMC_CX: getHwckApi('hwckkhmccx$m=query.service'),
  // 销售合同名称API
  GET_HWCKXSHTMC_CX: getHwckApi('hwckxshtmccx$m=query.service'),
  // 项目名称获取
  GET_HWCKXMMC_CX: getHwckApi('hwckxmmccx$m=query.service'),
  // 采购申请名称
  GET_HWCKCGSQMC_CX: getHwckApi('hwckcgsqmccx$m=query.service'),
  // 产品明细查询
  GET_HWCKCPMX_CX: getHwckApi('hwckcpmxcx$m=query.service'),
  // 出库保存信息查询
  GET_HWCKCKBC_CX: getHwckApi('hwcksave$m=execute.service'),
  // 项目编号查询
  GET_HWCKXMBH_CX: getCommonApi('project$m=query.service'),
  // 已发反显
  GET_HWCKTHFX_CX: getApi('/DM/huowu/hw/hwcklcxxcx$m=query.service'),

  // 对公付款接口API
  // 合同信息查询
  GET_DGFKHTXX_CX: getDgfkApi('dgfkhtxx$m=query.service'),
  // 流程发起
  GET_DGFKLCFQ_CX: getDgfkApi('dgfksq$m=execute.service'),
  // 审批信息查询
  GET_DGFKSPXX_CX: getDgfkApi('dgfkspxx$m=query.service'),
  // 付款账号信息查询
  GET_DGFKFKZHXX_CX: getDgfkApi('dgfkfkzhxx$m=query.service'),
  // 历史次数查询
  GET_DGFKLSCS_CX: getDgfkApi('dgfklscs$m=query.service'),
  // 对象编号
  GET_DGFKDXBH_CX: getCommonApi('dxbh$m=query.service'),
  // 项目编号查询
  GET_DGFKXMBH_CX: getCommonApi('project$m=query.service'),

  // 产品宣讲
  GET_CPXJ_PROCESSLIST: getCpxjCommonApi('common/spyj$m=query.service'),
  GET_CPXJ_KHMC: getCpxjCommonApi('core/customer$m=query.service'),
  GET_CPXJ_RYMC: getCpxjCommonApi('core/personal$m=query.service'),
  GET_CPXJ_BMXXCX: getCpxjCommonApi('common/jgbmb$m=query.service'),
  GET_CPXJ_EXECUTE: getCpxjApi('cpxjsq$m=execute.service'),
  GET_CPXJ_SQLQUERY: getCpxjCommonApi('common/sql$m=query.service'),
  GET_CPXJ_XXXG: getCpxjApi('cpxjUpdate$m=update.service'),
  GET_CPXJ_TASKS: getCpxjCommonApi('common/tasks$m=query.service'),

  // 出差
  GET_CHUCHAI_HISTORY: getApi('/DM/waichu/gr/zgCclscsCx$m=query.service'),
  GET_CHUCHAI_LCFQ: getApi('/DM/waichu/gr/zgccLcbl$m=execute.service'),
  GET_CHUCHAI_SPXX: getApi('/DM/waichu/gr/chuchaispxx$m=query.service'),

  // 应聘信息登记发起
  GET_InformationBasics_Apply: getApi('/DM/rlzy/bm/ryzp/ypdj$m=execute.service'),
  GET_Interview_Approval: getApi('/DM/rlzy/bm/ryzp/fxcx$m=execute.service'),
  // 面试登记
  GET_Msdj_Approval: getApi('/DM/rlzy/bm/ryzp/msdj$m=execute.service'),
  // 用工需求, 岗位查询接口
  GET_YgxqGwmc_Query: getApi('/DM/rlzy/bm/ryzp/ypdj$m=execute.service'),
  // 简历登记发起
  GET_Jldj_Apply: getApi('/DM/rlzy/bm/ryzp/jldj$m=execute.service'),

  // 入职申请, 审批
  GET_EmployeeEntry_Apply: getApi('/DM/rlzy/gr/rzsq$m=execute.service'),
  GET_EmployeeEntry_Approval: getApi('/DM/rlzy/gr/rzsq/fxcx$m=query.service'),
  GET_EmployeeEntry_QueryName: getApi('/DM/rlzy/gr/rzsq/getSqlData$m=query.service'),
  GET_EmployeeEntry_getBgszd: getApi('/PT/business/common/ptbmb$m=query.service'),
  GET_EmployeeEntry_getZj: getApi('/PT/business/common/jgbmb$m=query.service'),

  // 固定资产清理
  GET_GDZC_QCCX: getApi('/DM/gdzc/gdzc/gdzcql$m=queryInfoNew.service'), // 清册查询
  GET_GDZC_MXCX: getApi('/DM/gdzc/gdzc/gdzcql$m=queryDetailNew.service'), // 明细查询
  GET_GDZC_LC: getApi('/DM/gdzc/gdzc/gdzcql$m=gdzcqlLcNew.service'), // 流程
  GET_GDZC_SPFX: getApi('/DM/gdzc/gdzc/gdzcql$m=queryProcessInfoNew.service'), // 审批反显

  // 固定资产领用 /DM/gdzc/gdzc/gdzcly$m=gdzclysp.service
  GET_GDZCLY_XMBH: getApi('/PT/business/common/project$m=query.service'),
  GET_GDZCLY_LCFQ: getApi('/DM/gdzc/gdzc/gdzcly$m=execute.service'),
  GET_GDZCLY_SPFX: getApi('/DM/gdzc/gdzc/gdzcXm$m=query.service'),
  GET_GDZCLY_QCCX: getApi('/DM/gdzc/gdzc/gdzcly$m=query.service'),
  GET_GDZCLY_ZCLB: getApi('/PT/business/common/ptbmb$m=query.service'),
  GET_GDZCDJ_EXECUTE: getGdzcdj('zcdj#m=execute.service'),
  // 固定资产处理
  GET_GDZCCL_QUERY: getApi('/DM/gdzc/gdzc/gdzccl$m=queryInfo.service'),
  GET_GDZCCL_BPMID: getApi('/PT/business/common/bpmid$m=query.service'),
  GET_GDZCCL_YWLSH: getApi('/PT/business/common/ywlsh$m=query.service'),
  GET_GDZCCL_LCCQ: getApi('/DM/gdzc/gdzc/gdzccl$m=gdzcclLc.service'),
  GET_GDZCCL_BMQUERY: getApi('/DM/gdzc/gdzc/gdzccl$m=queryProcessInfo.service'),

  // 固定资产采购
  GET_GDZCCG_LCFQ: getApi('/DM/gdzc/gdzc/gdzccgsq$m=cgsqprocess.service'),
  GET_GDZCCG_SAVE: getApi('/DM/gdzc/gdzc/cgsqsave$m=gdzccgsqsave.service'),
  GET_GDZCCG_MXCX: getApi('/DM/gdzc/gdzc/gdzccgsq$m=cgsqquery.service'),
  GET_GDZCCG_DEL: getApi('/DM/gdzc/gdzc/gdzccgsq$m=cgsqdelete.service'),

  // 固定资产维修
  GET_GDZCWX_FQ: getApi('/DM/gdzc/gdzc/wxsp$m=gdzcwxsqlcsp.service'),
  GET_GDZCWX_MXCX: getApi('/DM/gdzc/gdzc/wxsp$m=gdzcmxquery.service'),
  GET_GDZCWX_SAVE: getApi('/DM/gdzc/gdzc/wxsp$m=gdzcmxsave.service'),
  GET_GDZCWX_ZCBMCX: getApi('/DM/gdzc/gdzc/wxsp$m=Xmgcquery.service'),
  GET_GDZCWX_ZCZTBG: getApi('/DM/gdzc/gdzc/wxsp$m=gdzcmxchange.service'),

  // 薪酬发放
  // GET_XCFF_XCFFMX: getApi('/DM/xcff/jg/xcffcx$m=xcffquery.service'),
  GET_XCFF_FQ: getApi('/DM/xcff/jg/xcffsq$m=xcffExecute.service'), // 薪酬发放发起
  GET_XCFF_NRXX: getApi('/DM/xcff/jg/xcffcx$m=xcffquery.service'), // 申请页面内容反显信息
  GET_XCFF_QCSJ: getApi('/DM/xcff/jg/xcffxx$m=query.service'), // 发起页面清测数据
  GET_XCFF_SPQCJS: getApi('/DM/xcff/jg/xcffxx$m=query.service'), // 审批页面核算汇总
  GET_XCFF_SPXQCX: getApi('/DM/xcff/jg/xcffxxxq$m=query.service'), // 详情查询
  GET_XCFF_FKZH: getApi('/PT/business/core/organization$m=query.service'), // 获取付款
  GET_XCFF_BANKBM: getApi('/PT/business/core/bankaccount$m=query.service'), // 查询银行编码

  // 客户接待-客户名称
  GET_KHJD_KHMC: getApi('/PT/business/core/customer$m=query.service'),
  // 客户接待-来访单位查询
  GET_KHJD_LFDWCX: getApi('/PT/business/core/customer$m=query.service'),
  // 客户接待-新增来访人员
  GET_KHJD_XZLFRY: getApi('/DM/kehu/kh/khjdkhSave$m=khsavenew.service'),
  // 客户接待-来访人员删除
  GET_KHJD_LFRYSC: getApi('/DM/kehu/kh/khjdkhDel$m=khdeletenew.service'),
  // 客户接待-来访人员查询
  GET_KHJD_LFRYCX: getApi('/DM/kehu/kh/khjdkhCx$m=khxxcxnew.service'),
  // 客户接待-流程
  GET_KHJD_LC: getApi('/DM/kehu/kh/kdsqLccs$m=kdsqlcspnew.service'),
  // 人员信息维护 -- 查询接口
  GET_RYXXWH_CX: getRyxxwhApi('ryxxwh$m=Query.service'),
  // 人员信息维护 -- 保存接口
  GET_RYXXWH_BC: getRyxxwhApi('ryxxwh$m=execute.service'),
  // 人员信息维护 -- 获取社保账户,公积金账户,费用核算单元
  GET_RYXXWH_SBZH: getRyxxwhCommonApi('jgbmb$m=query.service'),

  GET_PTBMB: getApi('/PT/business/common/ptbmb$m=query.service'),
  // 收到发票登记
  GET_SDFPDJ_KHMC_CX: getDmApi('ht/fapiao/fpdj$m=query'), // 收到发票登记客户查询
  GET_SDFPDJ_FPLX_CX: getDmApi('ht/fapiao/fpdj$m=BmQuery'), // 发票类型
  GET_SDFPDJ_DXBH_CX: getGGCSApi('business/common/dxbh$m=query'), // 对象编号
  GET_SDFPDJ_HTJE_CX: getGGCSApi('business/core/contract$m=query'), // 合同金额
  GET_SDFPDJ_KFPZH_CX: getDmApi('ht/fapiao/fpdjjecx$m=query'), // 开发票总和
  // 借款银行名称
  GET_YHMC: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_YHZH: getApi('/PT/business/core/bankaccount$m=query.service'),

  // 调岗申请API
  GET_TG_FQ: getTgApi('dg_process$m=execute'), // 职工调岗流程发起、审批、调整
  GET_TG_LSCS: getTgApi('staff$m=query'), // 历史次数、员工、清册查询
  // GET_TG_BM: getTgApi('department$m=query'),    // 部门清册查询
  // GET_TG_GS: getTgApi('companies$m=query'),    // 公司清册查询
  GET_TG_SPFX: getTgApi('transfer_approval_data$m=query'), // 员工调岗审批信息反显
  GET_TG_GRXX: getTgApi('personal$m=query'), // 个人信息展示
  GET_TG_GS: getTgApi2('company$m=query'), // 公司
  GET_TG_BM: getTgApi2('dept$m=query'), // 部门
  // GET_TG_ZW: getTgApi3('post$m=query'),    // 职务
  GET_TG_ZW: getTgApi4('jgbmb$m=query.service'), // 职务
  GET_TG_GW: getTgApi3('job$m=query'), // 岗位
  // 离职
  GET_LZ_LCFQ: getLzApi('lzsq$m=execute.service'), // 离职
  GET_LZFX: getLzApi('lzspxx$m=query.service'),

  // 投标保证金转履约保证金客户名称查询接口
  GET_TBBZJZLYBZJ_KHMCCX: getTbzb('Tbbzjzlybzj$m=khxxQuery.service'),
  // 投标保证金转履约保证金项目名称查询接口
  GET_TBBZJZLYBZJ_ZBXMCX: getTbzb('Tbbzjzlybzj$m=xmxxQuery.service'),
  // 投标保证金转履约保证金招标编号、合同、金额查询接口
  GET_TBBZJZLYBZJ_ZBBHCX: getTbzb('Tbbzjzlybzj$m=zbxxQuery.service'),
  // 投标保证金转履约保证金流程发起接口
  GET_TBBZJZLYBZJ_Execute: getTbzb('Tbbzjzlybzj$m=Execute.service'),
  // 投标保证金转履约保证金信息查询
  GET_TBBZJZLYBZJ_Query: getTbzb('Tbbzjzlybzj$m=Query.service'),
  // 投标结果录入客户查询
  GET_TBJGLR_khxxQuery: getTbzb('Tbjglr$m=khxxQuery.service'),
  // 投标结果录入项目查询
  GET_TBJGLR_xmxxQuery: getTbzb('Tbjglr$m=xmxxQuery.service'),
  GET_SDFPDJ_GHSMC_CX: getGGCSApi('business/core/customer$m=query'), // 供货商
  // 实习申请新的接口
  GET_KAPAI_SXSQFQ: getApi('/DM/rlzy/gr/sxsq$m=execute.service'),

  // 住房公积金核定相关接口
  // 导入
  GET_GJJHD_DR: getGjjHd('gjjhd$m=import.service'),
  // 导出
  GET_GJJHD_DC: getGjjHd('gjjhd$m=export.service'),
  // 公积金账户查询
  GET_GJJHD_GJJZHCX: getCommonApi('jgbmb$m=query.service'),
  // 员工姓名查询
  GET_GJJHD_YGXMCX: getGjjHd('gjjhd/xingming$m=query.service'),
  // 生成
  GET_GJJHD_SC: getCommonApi('sql$m=query.service'),
  // 修改
  GET_GJJHD_XG: getApi('/PT/business/core/project$m=save.service'),
  // 锁状态
  GET_GJJHD_SZT: getCommonApi('sql$m=query.service'),
  // 上锁
  GET_GJJHD_SS: getApi('/PT/business/core/project$m=save.service'),
  // 解锁
  GET_GJJHD_JS: getApi('/PT/business/core/project$m=save.service'),
  // 住房公积金缴纳
  // 收款单位
  GET_ZFGJJJN_SKDW: getZfgjjjn('sfkdw$m=query'),
  // 公积金账户查询
  GET_ZFGJJJN_GJJZH: getZfgjjjn('gjj_account$m=query'),
  // 付款单位清册查询
  GET_ZFGJJJN_FKDW: getZfgjjjn('sfkdw$m=query'),
  // 公积金数据查询
  GET_ZFGJJJN_GJJSJ: getZfgjjjn('gjj_info$m=query'),
  // 住房公积金缴纳流程
  GET_ZFGJJJN_LC: getZfgjjjn('splc$m=excute'),
  // 审批反显
  GET_ZFGJJJN_SPFX: getZfgjjjn('approval_data$m=query'),
  GET_THBZCX: getApi('/matter/instance/queryRecallTasks.service'),
  // 实习申请职级查询
  GET_KAPAI_ZHIJI: getApi('/PT/business/common/jgbmb$m=query.service'),
  // 实习申请返显接口
  GET_KAPAI_SXSQFX: getApi('/DM/rlzy/gr/sxsq $m=query.service'),

  GET_TBZB_XMCX: getTbzb('Tbzb$m=xmxxQuery.service'),
  // 查询thbz
  GET_ZZ_THBZ: getApi('/PT/business/common/tasks$m=query.service'),

  // 借款项目查询
  GET_JK_JKXMCX: getDmApi('jkbx/gr/jkxmcx$m=query'),
  // 档案对接,档案扫描分类地址
  GET_DASMFL: getApi('/EAMS/business/dacj$m=scanclassifyquery.service'),

  // 企业信息维护  查询
  GET_QYXXWH_CX: getQyxxwh('qyxxwh$m=query.service'),
  // 企业信息维护  导出
  GET_QYXXWH_DC: getQyxxwh('qyxxwh$m=export.service'),
  // 企业信息维护  新增/修改
  GET_QYXXWH_XZXG: getQyxxwh('qyxxwh$m=execute.service'),
  // 企业信息维护  修改记录
  GET_QYXXWH_XGJL: getQyxxwh('qyxxwhjl$m=query.service'),
  // 企业信息维护  删除
  GET_QYXXWH_SC: getQyxxwh('qyxxwh$m=delete.service'),
  // 投标结果录入信息查询
  GET_TBJGLR_SPXXCX: getTbzb('tbjglr$m=Query.service'),

  // 日志
  GET_RIZHI_RZGDJSR: '/DM/rizhi/xm/rztj$m=dlbxrcxGd.service',
  GET_RIZHI_RZJSR: '/DM/rizhi/xm/rztj$m=dlbxrcx.service',
  GET_RIZHI_ZCRZ: '/DM/rizhi/xm/rztj$m=zcrzcx.service',
  GET_RIZHI_ZCCZ: '/DM/rizhi/xm/gzgl$m=rzzc.service',
  GET_RIZHI_TJCZ: '/DM/rizhi/xm/gzgl$m=rztj.service',
  GET_RIZHI_SCCZ: '/DM/rizhi/xm/gzgl$m=rzsc.service',
  GET_RIZHI_XGCZ: '/DM/rizhi/xm/gzgl$m=rzxg.service',
  GET_RIZHI_ZGS: '/DM/rizhi/xm/rzgl$m=zgscx.service',
  GET_RIZHI_XMS: '/DM/rizhi/xm/rzgl$m=xmrzlscx.service',
  GET_RIZHI_LX: '/DM/rizhi/xm/cxlxrq$m=query.service',
  GET_RIZHI_YTJ: '/DM/rizhi/xm/rzgl$m=ytjrzlscx.service',
  GET_RIZHI_YQ: '/DM/rizhi/xm/rzgl$m=ysrzlscx.service',
  GET_RIZHI_RZSPCX: '/DM/rizhi/xm/rzgl$m=query.service',
  GET_RIZHI_ZJJH: '/DM/rizhi/xm/gzgl$m=rzzj.service',
  GET_RIZHI_QTJSRGG: '/DM/rizhi/xm/rzjsr$m=save.service',

  /**
  * 项目画像
  *
  */

  // 项目画像

  // 项目分析查询
  GET_XMHX: getBaobiao('xmhx$m=query.service'),
  // 项目分析收入支出二级查询
  GET_XMFX_SRCZ: getBaobiao('xmfx/srzc$m=query.service'),
  // 项目报表分析项目名称查询
  GET_XM_XMMC: getBaobiao('xm/xmmc$m=query.service'),

  // 实物画像

  // 实物画像分析查询
  GET_SWHX_FX: getBaobiao('swhx$m=query.service'),
  // 实物画像分析二级查询
  GET_SWHX_EJ: getBaobiao('swhxej$m=query.service'),
  // 实物画像二级查询进销存明细
  GET_SWHX_JXC: getBaobiao('swhxstock$m=query.service'),

  // 合同画像

  // 合同画像查询合同信息
  GET_HTHX: getBaobiao('hthxhtxx$m=query.service'),
  // 合同画像查询合同金额信息
  GET_HTHX_HTJE: getBaobiao('hthxhtje$m=query.service'),
  // 项目报表分析项目名称查询
  GET_HTHX_HKE: getBaobiao('hthxhke$m=query.service'),
  // 合同画像查询类型信息
  GET_HTHX_LX: getBaobiao('hthxlx$m=query.service'),
  // 合同画像二级查询
  GET_HTHX_EJ: getBaobiao('hthxej$m=query.service'),

  // 客户画像

  // 客户画像查询
  GET_KHHX: getBaobiao('khhx$m=query.service'),
  GET_KHHX_EJ: getBaobiao('khhxej$m=query.service'),

  // 机构画像分析
  GET_JGHXFX_SHIXIANG: getApi('/DM/baobiao/jghxsxxx$m=query.service'),
  GET_JGHXFX_DUIXIANG: getApi('/DM/baobiao/jghxdxxx$m=query.service'),
  GET_JGHXFX_XIANGMU: getApi('/DM/baobiao/jghxxmxx$m=query.service'),
  GET_JGHXFX_GAOGUAN: getApi('/Zzjg/portrait/person$m=query'),
  GET_JGHXFX_ZUZHI: getApi('/Zzjg/zzjg/portrait$m=query'),
  GET_JGHXFX_ZIJIN: getApi('/FM/business/cwzy/bbsjqg$m=query.service'),
  // 会议通知发起
  GET_HYTZ_HYTZFQ: getApi('/DM/huiyi/bm/hytzhytzlc$m=execute.service'),
  GET_HYTZ_HYTZFQBMB: getApi('/PT/business/common/jgbmb$m=query.service'),
  GET_HYTZ_HYTZFQZKR: getApi('/PT/business/core/personal$m=query.service'),
  // 会议通知审批
  GET_HYTZ_HYTZSPFX: getApi('/DM/huiyi/bm/hytzspfx$m=query.service'),
  // 会议通知建群
  GET_HYTZ_HYTZSPJQ: getApi('/PT/business/chats/groupOperation2$m=execute.service'),

  GET_CTRXX: getApi('/DM/rlzy/bm/person$m=query.service'), // 辞退人
  // 获取部门名称
  GET_DEPTNAME: getApi('/Zzjg/person/ssbm$m=query'),
  // 打印报表获取配置参数
  GET_REPORT_TOKEN: getApi('/DM/common/getBbxx$m=query.service'),
}

export default apiPath
