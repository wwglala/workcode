/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Row, Col, Form, Button } from 'antd'
import Store from './store'
import Store1 from '../store'
import SYSelect from '../../SYSelect'
import './style.less'

@observer
class Matter extends Component {
  static defaultProps = {
    value: {
      title: '项目',
      content: ''
    },
    url: '/PT/business/common/project$m=query.service',
    nameKey: 'xmmc',
    valueKey: 'xmbh',
    searchKey: 'xmmc',
    fixedFirst: false,
    defaultValue: undefined
  }
  constructor(props) {
    super(props)
    this.state = {
      selectStore: {},
      datas: [],
      isLoadSource: false,
      params: {},
      defaultValue: undefined,
    }
  }
  async componentDidMount() {
    const { sxbm } = this.props
    await Store1.getDxlb(
      {
        sxbm,
        type: 'dxbmnew'
      }
    ).then(() => {
      console.log('=============================', Store1.dxlbRes)
      if (Store1.dxlbRes[0]) {
        this.setState({
          dxbm: Store1.dxlbRes[0].BM
        })
      }
    })
    this.init()
  }
  init = async() => {
    const { url, params, status, onChange = () => { }, fixedFirst, defaultValue } = this.props
    this.setState({ defaultValue })
    if (status === 1) {
      await Store.getDataSource(url, { ...(params), dxbm: this.state.dxbm })
      const len = Store.dataSource.length
      if (len > 1) {
        this.setState({ isLoadSource: true, params })
        if (fixedFirst) {
          this.setState({ defaultValue: Store.dataSource[0].xmbh })
          onChange(Store.dataSource[0])
        }
      } else if (len === 1) {
        this.setState({ isLoadSource: false, datas: Store.dataSource })
        onChange(Store.dataSource[0])
      }
    }
  }
  selected = async (value, option) => {
    const { onChange = () => { }, valueKey } = this.props
    const { dataSource } = this.state.selectStore
    if (value === 'undefined' || value === null) {
      onChange({})
    } else {
      let obj = dataSource.find(item => {
        return item[valueKey] === value
      })
      onChange(toJS(obj))
    }
  }

  // 模糊查询
  // onSearch = async (value) =>{
  //   const { url, params} = this.props
  //    let param = params
  //    param.xmmc = value
  //   await Store.getDataSource(url, params)
  //   this.setState({ datas: Store.dataSource })
  // }
  render() {
    const { value, valueKey, searchKey, url,
      onChange = () => { }, nameKey, status,
      fixedFirst,
      onClick = () => { },
      form: { getFieldDecorator }, ...otherProps } = this.props
    // const dataSource = [{ xmbh: '打发的', xmmc: 'aldja' }, { xmbh: '打发的1', xmmc: 'aldja1' }]
    const data = this.state.datas
    const { isLoadSource, params, defaultValue } = this.state
    let len = 0
    if (status === 1) {
      len = this.state.datas.length
    }
    return (
      <div className='matterStyle'>
        {/* <Row style={{ margin: '0' }}> */}
        {status === 1
          ? (isLoadSource
            ? (
              <div>
                <div>
                  <span className='vlaueTitle'>
                    {value.title}
                    :
                  </span>
                </div>
                <div style={{ paddingTop: 5 }}>
                  <Form.Item>
                    {getFieldDecorator('project', {
                      initialValue: defaultValue,
                      rules: [{ required: true, message: '*请选择项目' }],
                    })(
                      <SYSelect
                        // defaultValue={defaultValue}
                        control={false}
                        placeholder='请选择'
                        showSearch
                        url={url}
                        searchKey={searchKey}
                        params={params}
                        //  onSearch={(value) =>{this.onSearch(value)}}
                        // dataSource={dataSource}
                        style={{ width: '100%' }}
                        //   totalKey={Store.totalcount}
                        onMount={store => {
                          this.setState({ selectStore: store })
                          // console.log(store, '888888888888888')
                        }}
                        onChange={(valueKey, optionKey) => { this.selected(valueKey, optionKey) }}
                        valueKey={valueKey}
                        nameKey={nameKey}
                        optionKey={nameKey}
                        disabled={fixedFirst}
                        {...otherProps}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
            )
            : (
              <Col span={23}>
                <span className='vlaueTitle'>
                  {value.title}
                  :
                  <span onClick={() => { onClick(data[0]) }} className='vlaueContent'>{(len !== 0) ? data[0][nameKey] : ''}</span>
                </span>
              </Col>
            )
          )
          : (
            <Col span={23}>
              <span className='vlaueTitle'>
                {value.title}
                :
                <span onClick={() => { onClick(value) }} className='vlaueContent'>{value.content}</span>
              </span>
            </Col>
          )}
        {/* </Row> */}
      </div>
    )
  }
}
export default Matter
