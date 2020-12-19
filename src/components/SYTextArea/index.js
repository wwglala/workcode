/*
 * @Author: 姜跃龙
 * @Date: 2020-03-20 14:41:28
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-03-20 14:45:18
 * @Description: file content
 */
import React, { Component } from 'react'
import { Input, List } from 'antd'
import Style from './style.module.less'

const { TextArea } = Input

class SYTextArea extends Component {
  static defaultProps = {
    textareaId: 'SYTextArea1',
    count: 50,
    defaultValue: ''
  }

  constructor(props) {
    super(props)
    const value = props.value || ''
    this.state = {
      value: value || '',
      textnote: props.count ? `0/${props.count}` : '',
    }
  }
  componentWillMount() {
    this.setState({
      value: this.props.defaultValue,
      textnote: `${this.props.defaultValue.length}/${this.props.count}`

    })
  }

  componentDidMount() {
    const { textareaId, count } = this.props
    document.querySelector(`#${textareaId}`).querySelector('textarea').maxLength = Number(count)
  }

  handleChange = v => {
    const value = v.target.value || ''
    if (this.props.count) {
      let maxCount = this.props.count
      this.setState({
        textnote: `${value.length}/${maxCount}`
      })
    }
    this.setState({ value })
    this.triggerChange(value)
  }
  triggerChange = changedValue => {
    // 为form返回value
    const { onChange } = this.props
    if (onChange) {
      onChange(changedValue)
    }
  }
  render() {
    const { value } = this.state
    return (
      <div id={this.props.textareaId} className={Style.basic}>
        <List style={this.props.style ? this.props.style : {}}>
          <TextArea
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            className={this.props.className ? this.props.className : ''}
            autosize={this.props.autosize ? this.props.autosize : false}
            defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
            value={value}
            onChange={this.handleChange}
            style={this.props.count ? { paddingRight: 52, paddingLeft: 15, resize: 'none' } : { resize: 'none' }}
          />
          {this.props.count
            ? <span className={Style.limitCount}>{this.state.textnote}</span> : null}
        </List>
      </div>
    )
  }
}

export default SYTextArea
