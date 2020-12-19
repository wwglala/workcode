function getMultiKeyBooard() {
  return {
    cmd_port: '10890', // 指令服务端口号
    ComPort: '4', // 电脑对应的com 端口
    PhotoPath: 'D:\\', // 二代证图片保存位置
    WaitTime: '3',
    Baud: '9600',
    ICType: '3',
    TagList: 'A',
    AIDList: 'A000000333010101|A000000333010102',
    TrackNo: '23'
  }
}

// 人物画像
// function getConfig() {
//   return {
//     // gjjjg: 'http://192.168.0.162:6004' // 内网
//     gjjjg: 'http://113.125.201.131:15106' // 外网
//     // gjjjg: 'http://61.240.128.23:12004' // 演示
//   }
// }

// 短信验证码
function getSms() {
  return {
    adress: 'http://222.222.216.74:10285',
    MSyVersion: '1.0.1',
    signCode: 15008,
    signMethod: 'md5',
    templateCode: 'e6b9d7834f5f4ea4b4c31cab0db53f86',
    version: '1.0.1',
    MSyAppId: '2019112815165241',
    MSyService: 'YUN4',
    MSyToken: '',
    miyao: 'SYC0A907EAA4BB4A568ED4BB9325B432'
  }
}

// 导入模板下载
function getDownLoadUrl() {
  return {
    // downloadUrl: 'http://192.168.0.50:31014' // 内网开发
    downloadUrl: 'http://113.125.201.131:16015' // 内网测试
    // downloadUrl: 'http://113.125.201.130:31014' // 外网开发
    // downloadUrl: 'http://113.125.201.130:31017' // 外网测试
  }
}

// 报表后台
function getReportUrl() {
  return {
    // reportUrl: 'http://192.168.0.50:31010', // 内网开发
    // reportUrl: 'http://192.168.0.50:31013', // 内网测试
    // reportUrl: 'http://113.125.201.130:31010', // 外网开发
    // reportUrl: 'http://113.125.201.130:31013' // 外网测试
    reportUrl: 'http://113.125.201.131:38099'
  }
}

// 报表后台
function getPcReportUrl() {
  return {
    // reportUrl: 'http://192.168.0.50:31010', // 内网开发
    // reportUrl: 'http://192.168.0.50:31013', // 内网测试
    // reportUrl: 'http://113.125.201.130:31010', // 外网开发
    // reportUrl: 'http://113.125.201.130:31013' // 外网测试
    pcReportUrl: 'http://113.125.201.131:36030',
    fpsqPcReportUrl: 'http://113.125.201.131:16015' // 配置pc前台外网地址
  }
}

// 中台
function getZtUrl() {
  return {
    // url: 'http://192.168.5.148:9300', // 内网
    url: 'http://113.125.201.131:9300', // 外网
    spaceCode: 'e09e1ef311c7fc12dbb191cb43a4d37c'
    // "spaceCode":"9b7fe6e7e2b0ca4ec9ddaedd7cef6224"
  }
}

function getNewTabIpPort() {
  return {
    ipPort: 'http://192.168.53.65:3111',
    dmPcIpPort: 'http://113.125.201.131:16015',
    // 财务
    fmPcIpPort: 'http://113.125.201.131:16017'
  }
}

// 在线预览
function getUploadConfig() {
  const clientId = 'dmPro'
  const serviceId = 'shineyue01'
  const appKey = '2020042317325994'
  const spaceCode = 'e178ef54838f230ad84c3b761ffa3ae2'
  const secretKey = 'SY0A0C4277033046F2BA262D9E8E92C4'
  const role = 'admin'
  const ipPort = 'http://113.125.201.131:9300'
  const version = '1.0.1'
  return {
    clientId: clientId, serviceId: serviceId, appKey: appKey, spaceCode: spaceCode, version: version, secretKey: secretKey, role: role, ipPort: ipPort
  }
}

function getJumpParams() {
  return {
    appid: '2019082217092434',
    version: '1.0.1',
    appSecret: 'SY6EE1BFA49CE3482EA003DD5C87CBFF',
    clientId: 'dmPro'
  }
}

// 加入项目实例画像中台配置方法
function getHxZtConfig(params) {
  return {
    'M-Sy-AppId': '2019082217092434', // App Key
    'M-Sy-Version': '1.0.1',
    AppSecret: 'SY6EE1BFA49CE3482EA003DD5C87CBFF', // App Secret
    client_id: 'bbPro', // 本平台登录的用户名
    pepUrl: 'http://113.125.201.130:32210/DigitalEnterpriseManagement/xmhx/xmhxindex' //项目实例画像跳转的URL
  }
}

function getConfig() {
  return {
    "Version": '1.0.1', // 版本号，过中台请求头中的参数M-Sy-Version
    "appid": '2019082217092434', // 用户id，过中台请求头中的参数M-Sy-AppId
    "serviceid": 'shineyue01', // 中台不环境对应不同的service参数，测试和演示用yun4ys，正式用yun4zs
    ticketPadKey: 'SY6EE1BFA49CE3482EA003DD5C87CBFF', // 密钥，中台每个账号对应一个密钥，ticket，token等都对应一个密钥
    //pc拆分项目ip端口
    host: 'http://113.125.201.130:32212',

    gjjjg: 'http://113.125.201.131:15106' // 外网

  }
}

window.configHttp = getConfig()
