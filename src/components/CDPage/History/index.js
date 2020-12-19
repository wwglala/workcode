import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Row, Col } from 'antd'
import Store from './store'

@observer
class History extends Component {
   static defaultProps={
     url: '/PT/business/common/statistical$m=query.service',
     params: {},
     labelKey: 'hzxxmc',
     valueKey: 'qmz',
   }

   constructor(props) {
     super(props)
     this.state = {
     }
   }

   async componentDidMount () {
     const { url, params } = this.props
     Store.getDataSource(url, params)
   }

  // 金额转为有千分符，并保留两位小数
  formatMoney = value => {
    value = String(Math.round(Number(value)))
    const intAndDeci = value.split('.')
    // 整数部分
    const integer = intAndDeci[0]
    // 小数部分
    const decimal = intAndDeci[1] || '00'

    // 每三位加千分符
    let finalValue = ''
    let sum = 0
    for (let i = integer.length - 1; i >= 0; i -= 1) {
      finalValue = integer[i] + finalValue
      sum += 1
      if (sum === 3 && i !== 0) {
        finalValue = `,${finalValue}`
        sum = 0
      }
    }
    // 加上两位小数，如果是 00 那就不加
    // if (decimal.replace(/0/g, '') !== '') {
    //   finalValue += '.' + decimal.substr(0, 2)
    // }

    return finalValue
  }

  render() {
    const { onClick = () => {}, labelKey, valueKey } = this.props
    // const data = [{
    //   bm1:'01',hzxxmc:'借款金额',qmz:'123123129.49'
    // },{
    //   bm1:'01',hzxxmc:'借款金额',qmz:'0'
    // },{
    //   bm1:'02',hzxxmc:'借款金额',qmz:'12',qcz:'45.51'
    // },{
    //   bm1:'01',hzxxmc:'借款金额',qmz:'78'
    // }]

    return (
      <div>
        <Row style={{ margin: '0 13.5px' }}>
          {Store.dataSource.map((item, i) => {
            return (
              (item.bm1 === '01' || item.bbb === '04' || item.bm1 === '03')
                ? (
                  <Col key={String(i)} span={8} style={{ marginTop: (i > 2) ? 10 : 0, padding: '0 16.5px' }}>
                    <span style={{ fontSize: 14, color: '#808080' }}>
                      {(item.bm1 === '01' || item.bm1 === '03') ? item[labelKey] : `${item[labelKey]}期末`}
                      :
                      {
                        (String(item[valueKey]) === '0')
                          ? <span style={{ color: '#808080', paddingLeft: 8 }}>{item[valueKey]}</span>
                          : <span onClick={() => { onClick(item) }} style={{ color: '#4A90E2', paddingLeft: 8 }}>{item[valueKey]}</span>
                      }

                    </span>
                  </Col>
                )
                : (
                  <Col key={String(i)} span={8} style={{ marginTop: (i > 2) ? 10 : 0, padding: '0 16.5px' }}>
                    <span style={{ fontSize: 14, color: '#808080' }}>
                      {`${item[labelKey]}期初`}
                      :
                      {(item.qcz === 0)
                        ? <span style={{ color: '#808080', paddingLeft: 8 }}>{item.qcz}</span>
                        : <span onClick={() => { onClick(item) }} style={{ color: '#4A90E2', paddingLeft: 8 }}>{item.qcz}</span>}

                    </span>
                  </Col>
                )
            )
          })}
        </Row>
      </div>
    )
  }
}
export default History
