import React, { Component, PureComponent } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import { createForm } from 'rc-form'
import { SYPage, SYTextArea } from 'shineyue-component'
import { Row, Col, Button, message, Form } from 'antd'
import Store from './Store'

let bbgrxx = {}
@createForm()
@observer
class DgjpSp extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shiyou: ''
    }
  }
  async componentWillMount() {
    bbgrxx = window.bbgrxx
    console.log('=============', bbgrxx.flowtype)
    // bbgrxx.flowtype = 'yb'
    // window.bpmJson.taskName = '行政专员'
    if (bbgrxx.flowtype === 'db') {
      await Store.getSpfx({
        zxbm: bbgrxx.zxbm,
        jgbh: bbgrxx.zxbm,
        dxbm: '009',
        blqd: bbgrxx.blqd,
        userid: bbgrxx.userid,
        apiversion: '1.0',
        sxbm: '05015',
        spzt: '2',
        page: 1,
        size: 20,
        bpmid: bbgrxx.businessKey
      })
    } else {
      await Store.getSpfx({
        zxbm: bbgrxx.zxbm,
        jgbh: bbgrxx.zxbm,
        dxbm: '009',
        blqd: bbgrxx.blqd,
        userid: bbgrxx.userid,
        apiversion: '1.0',
        sxbm: '05015',
        page: 1,
        size: 20,
        bpmid: bbgrxx.businessKey
        // zxbm: '1301100006',
        // jgbh: '1301100006',
        // dxbm: '009',
        // blqd: 'app_02',
        // userid: 13492,
        // apiversion: '1.0',
        // sxbm: '05015',
        // page: 1,
        // size: 20,
        // bpmid: '1000330269052'
      })
    }
    await Store.getXmbh({
      sxbm: '05015',
      jgbh: bbgrxx.zxbm,
      userid: Store.sqruserid,
      page: 1,
      size: 10
    })
    if (bbgrxx.flowtype === 'db') {
      // await this.thjd()
    }
    await this.setState({
      loading: false
    })
    if (Store.sy === '01') {
      this.setState({ shiyou: '项目' })
    }
    if (Store.sy === '02') {
      this.setState({ shiyou: '拜访' })
    }
    if (Store.sy === '03') {
      this.setState({ shiyou: '演示' })
    }
    if (Store.sy === '04') {
      this.setState({ shiyou: '其他' })
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === '/sp') {
      console.log('tuihui')
    }
  }

  thjd = async () => {
    let params = {
      procDefId: bbgrxx.processDefinitionId,
      taskDefinitionKey: bbgrxx.taskDefinitionKey,
      tenantId: bbgrxx.zxbm,
    }
    await Store.getThjd(params)
    let res = Store.thjd
    console.log('thjd--->', res)
    console.log('thid----->', res.data[0][0].id)
    await this.setState({
      thid: res.data[0][0].id
    })
  }

  fanhui = () => {
    try {
      // AppPop()
      console.log('手机退出===>', 'success')
    } catch (e) {
      console.log('手机退出===>', 'fail', e)
    }
  }

  submit = async () => {
    console.log(123)
    if (window.bpmJson.taskName === '行政专员') {
      if ((!isNaN(this.state.jpzjg)) && this.state.jpzjg < 0) {
        message.info('请输入机票总金额规范价格', 1)
        return
      }
      if ((!isNaN(this.state.jpjj)) && this.state.jpjj < 0) {
        message.info('请输入机票净价规范价格', 1)
        return
      }
      if ((!isNaN(this.state.mhjj)) && this.state.mhjj < 0) {
        message.info('请输入民航基金规范价格', 1)
        return
      }
      if ((!isNaN(this.state.bxf)) && this.state.bxf < 0) {
        message.info('请输入保险费规范价格', 1)
        return
      }
      if ((!isNaN(this.state.dzfwf)) && this.state.dzfwf < 0) {
        message.info('请输入垫资服务费规范价格', 1)
        return
      }
      if ((!isNaN(this.state.fsfwf)) && this.state.fsfwf < 0) {
        message.info('请输入配送服务费规范价格', 1)
        return
      }
    }
    // eslint-disable-next-line no-unused-vars
    let hbsj = ''
    // eslint-disable-next-line no-unused-vars
    let hbbc = ''
    if (Store.jpxx1.length < 2) {
      this.hbsj = Store.jpxx1[0].hbsj
      this.hbbc = Store.jpxx1[0].hbbc
    } else {
      this.hbsj = `${Store.jpxx1[0].hbsj},${Store.jpxx1[1].hbsj}`
      this.hbbc = `${Store.jpxx1[0].hbbc},${Store.jpxx1[1].hbbc}`
    }
    let spzt = ''
    if (window.bpmJson.taskName === '行政专员') {
      this.spzt = '1'
    } else {
      this.spzt = '2'
    }
    let spyj = ''
    // if (typeof (state.comment) !== 'undefined') {
    //   spyj = state.comment
    // }
    const loading = message.loading('审批中...')
    await Store.getjpsp({
      xmbh: Store.xmbh,
      xmlb: '01',
      jgbh: bbgrxx.zxbm,
      sxbm: '05015',
      xmmc: '订购机票',
      zxbm: bbgrxx.zxbm,
      isld: '0',
      userName: bbgrxx.username,
      dlwz: bbgrxx.wz,
      userid: bbgrxx.userid,
      fsdd: Store.fsdd,
      fssj: Store.fssj,
      hbzl: '01',
      fsje: Store.zj,
      fssl: 1,
      hfgs: 1,
      ywlsh: Store.spfxdata.ywlsh,
      blqd: bbgrxx.blqd,
      cgwbh: ' ',
      cgwms: ' ',
      dxbm: '009',
      dxbh: Store.dxbh,
      bpmid: bbgrxx.businessKey, // 提代码换一下bpmJson.bpmid
      spzt: this.spzt,
      gcid: Store.spfxdata.gcid,
      lcbz: 2, // 0发起 2提交下一步 3退回 4撤销 1再次发起
      spczyid: bbgrxx.userid,
      lrczy: Store.lrczy,
      lrczyid: Store.lrczyid,
      deptname: Store.deptname,

      gcbzid: Store.thgcbzid,

      sfzz: Store.sfzz,
      xmbm: Store.xmbm,
      xmmcs: Store.xmmcs,
      shiyou: Store.sy,
      bz: Store.bz,
      sjhm: Store.sjhm,
      zjhm: Store.zjhm,
      zj: Store.zj,

      jpzjg: Store.jpzjg !== '' ? Store.jpzjg : '',
      jpjj: Store.jpjj !== '' ? Store.jpjj : '',
      mhjj: Store.mhjj !== '' ? Store.mhjj : '',
      bxf: Store.bxf !== '' ? Store.bxf : '',
      dzfwf: Store.dzfwf !== '' ? Store.bxf : '',
      fsfwf: Store.fsfwf !== 3 ? Store.fsfwf : 3,

      grbh: bbgrxx.grbh,
      apiversion: '1.0',
      spyj: `${'xxx'}【同意】`,
      comment: `${'xxx'}【同意】`,
      description: `【${Store.deptname}+${Store.lrczy}】发起的【${this.hbsj}】+【${this.hbbc}】订购机票申请审批完成，待您录入费用明细。`,
      taskid: bbgrxx.taskId,

      sqrDepName: Store.sqrDepName,
      sqrFilepath: Store.sqrFilepath,
      sqrZzmm: Store.sqrZzmm,
      sqCzy: Store.sqCzy,
      sqrgrbh: Store.sqrgrbh,
      sqruserid: Store.sqruserid,
      fqrid: Store.sqruserid,
    })
    if (Store.jpspData) {
      setTimeout(loading, 0)
      message.success('审批成功')
      setTimeout(() => {
        // this.fanhui()
      }, 2000)
    } else {
      setTimeout(loading, 0)
      message.error('审批失败')
    }
  }
  cancel = async () => {
    const { validateFields } = this.props.form
    // if (state.comment === '' || typeof (state.comment) === 'undefined') {
    //   Toast.info('请输入审批意见', 1)
    //   return
    // }
    // Toast.loading('退回中...', 0)
    try {
      await validateFields(['text'], async (err, values) => {
        if (!err) {
          if (!!values.text === false) {
            message.info('请输入备注')
            return 0
          }
          await Store.getjpsp({
            xmbh: Store.xmbh,
            xmlb: '01',
            jgbh: bbgrxx.zxbm,
            sxbm: '05015',
            xmmc: '订购机票',
            zxbm: bbgrxx.zxbm,
            isld: '0',
            userName: bbgrxx.username,
            dlwz: bbgrxx.wz,
            userid: bbgrxx.userid,
            fsdd: Store.fsdd,
            fssj: Store.fssj,
            hbzl: '01',
            fsje: 100,
            fssl: 1,
            hfgs: 1,
            ywlsh: Store.spfxdata.ywlsh,
            blqd: bbgrxx.blqd,
            cgwbh: ' ',
            cgwms: ' ',
            dxbm: '009',
            dxbh: Store.dxbh,
            bpmid: window.bpmJson.bpmid, // 提代码换一下bpmJson.bpmid
            spzt: '3',
            gcid: Store.spfxdata.gcid,
            lcbz: 3, // 0发起 2提交下一步 3退回 4撤销 1再次发起
            spczyid: bbgrxx.userid,
            thbz: this.state.thid,

            gcbzid: Store.thgcbzid,

            sfzz: Store.sfzz,
            xmbm: Store.xmbm,
            xmmcs: Store.xmmcs,
            shiyou: Store.sy,
            bz: Store.bz,
            sjhm: Store.sjhm,
            zjhm: Store.zjhm,
            zj: Store.zj,

            jpzjg: this.state.jpzjg,
            jpjj: this.state.jpjj,
            mhjj: this.state.mhjj,
            bxf: this.state.bxf,
            dzfwf: this.state.dzfwf,
            fsfwf: this.state.fsfwf,

            grbh: bbgrxx.grbh,
            apiversion: '1.0',
            spyj: `${'state.comment'}【退回】`,
            comment: `${'state.comment'}【退回】`,
            description: `您好，您发起的【订购机票】申请因【${'state.comment'}】被退回，请您及时处理。`,
            taskid: bbgrxx.taskId,

            sqrDepName: Store.sqrDepName,
            sqrFilepath: Store.sqrFilepath,
            sqrZzmm: Store.sqrZzmm,
            sqCzy: Store.sqCzy,
            sqrgrbh: Store.sqrgrbh,
            sqruserid: Store.sqruserid,
            fqrid: Store.sqruserid,
          })
          if (Store.jpspData) {
            message.success('退回成功')
            setTimeout(() => {
              this.fanhui()
            }, 2000)
          } else {
            message.error('退回失败')
          }
        } else {
          message.error(err.text.errors[0].message)
        }
      })
    } catch (e) {
      console.log(123)
    }
  }

  render() {
    console.log(Store)
    console.log(bbgrxx)
    const { getFieldDecorator } = this.props.form
    return (
      <SYPage
        TopHeaderProps={{
          name: Store.sqCzy,
          belong: Store.sqrDepName,
          location: Store.fsdd,
          time: Store.fssj
        }}
        components={[
          {
            type: 'matter',
            title: '项目',
            isShow: true,
            status: 1,
            content: (
              <Row style={{ paddingLeft: 30 }}>
                <Col span={8}>
                  所属项目:
                  {Store.xmmcs}
                </Col>
              </Row>
            ),
            onClick: item => { console.log(item) }
          },
          {
            type: 'history',
            isShow: true,
            status: 2,
            labelKey: 'hzxxmc', // 就这么写
            valuelKey: 'qmz', // 就这么写
            params: {
              blqd: 'app_02',
              endTime: moment(Date.now()).format('YYYY-MM-DD'),
              key: '',
              khbh: Store.sqrgrbh, // 不要写死，传查询的对应人的grbh
              processDefinitionKey: 'gr_dgjp', // 传当前事项的processDefinitionKey
              startTime: moment(new Date(new Date().getFullYear(), moment().month(), 1)).format('YYYY-MM-DD'), // 查询的开始日期
              userid: Store.sqruserid, // 不要写死，查询的对应人的grbh
            },

          },
          {
            type: 'content',
            isShow: true,
            status: 2,
            content: (
              <>
                <div direction='column' align='start'>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>身份证号：</span>
                    <span style={{ color: '#333333' }}>{Store.zjhm}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>联系电话：</span>
                    <span style={{ color: '#333333' }}>{Store.sjhm}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>事由：</span>
                    <span style={{ color: '#333333' }}>{this.state.shiyou}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>项目：</span>
                    <span style={{ color: '#333333' }}>{Store.xmmcs}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>票价：</span>
                    <span style={{ color: '#333333' }}>{Store.zj}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>是否中转：</span>
                    <span style={{ color: '#333333' }}>{Store.sfzz === '01' ? '是' : '否'}</span>
                  </div>
                  <div style={{ fontSize: '14px', padding: '0 14px 8px' }}>
                    <span style={{ color: '#808080' }}>详情：</span>
                    <span style={{ color: '#333333' }}>{Store.bz}</span>
                  </div>
                </div>
                <div className='sphbxx' style={{ marginLeft: 14 }}>
                  <table className='xhx'>
                    <thead>
                      <tr>
                        <td>航班日期</td>
                        <td>航班</td>
                        <td>出发地</td>
                        <td>目的地</td>
                      </tr>
                    </thead>
                    <tbody>
                      {Store.jpxx1.length > 0
                        ? Store.jpxx1.map((item, key) => {
                          return (
                            <tr className='xhx' style={{ marginLeft: '14px', marginRight: '14px', fontSize: '13px', paddingBottom: Store.jpxx1.length - 1 === key ? '14px' : '6px', paddingTop: '5px' }}>
                              <td style={{ textAlign: 'left', color: '#666666' }}>{item.hbsj}</td>
                              <td style={{ textAlign: 'center', color: '#666666' }}>{item.hbbc}</td>
                              <td style={{ textAlign: 'center', color: '#666666' }}>{item.sfcs}</td>
                              <td style={{ textAlign: 'right', color: '#666666' }}>{item.mdcs}</td>
                            </tr>
                          )
                        }) : null}
                    </tbody>

                  </table>

                </div>
              </>
            )
          },
          {
            type: 'blank',
            isShow: true,
            status: 2,
            title: '材料'
          },
          {
            type: 'rules',
            isShow: true,
            status: 2,
          },
          {
            type: 'blank',
            isShow: true,
            status: 2,
            title: '审批意见',
            content: (
              <div>
                <Row>
                  <Col span={16} style={{ marginLeft: 14, display: 'div', justifyContent: 'center' }}>
                    {
                      getFieldDecorator('text', {
                        rules: [{ required: true, message: '请输入审批意见' }]
                      })(<SYTextArea
                        style={{ width: '97%' }}
                        textareaId='ffff'
                        initialValue=''
                        autosize
                        placeholder='请输入'
                      />)
                    }
                  </Col>
                </Row>

              </div>
            )
          },
          {
            type: 'blank',
            isShow: true,
            status: 2,
            title: '流程'
          },
          {
            type: 'empty',
            isShow: true,
            status: 2,
            content: (
              <Row>
                <Col span={18} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type='danger' onClick={e => this.cancel()}>退回上一步</Button>
                  <Button type='primary' onClick={e => this.submit()}>提交下一步</Button>
                </Col>

              </Row>
            )
          },
        ]}

      />
    )
  }
}

export default DgjpSp
