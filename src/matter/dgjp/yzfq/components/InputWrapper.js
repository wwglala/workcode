import React, { PureComponent } from 'react'
import { Col, Input, Form } from 'antd'

const FormItem = Form.Item
export default class InputWrapper extends PureComponent {
  render() {
    const { span, marginLeft, label, message, getFieldDecorator } = this.props

    return (
      <>
        <Col span={span} style={{ paddingLeft: marginLeft }}>
          <FormItem label={label}>

            {
              getFieldDecorator('fs', {
                rules: [{ required: true, message }]
              })(<Input className='basic' style={{ width: '93%' }} placeholder='请输入' />)
            }
          </FormItem>
        </Col>
      </>
    )
  }
}
