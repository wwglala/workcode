import React, { Component } from 'react'
import { InputNumber } from 'antd'
import style from './index.module.less'

class SYInputMoney extends React.Component {
  static defaultProps={
    width: '80%',
    placeholder: '请输入',
    precision: 2,
    disabled: false,
    onChange: () => {},
  }

  onChange = value => {
    const { onChange } = this.props
    onChange && onChange(value)
  }
  render() {
    const { otherOpt } = this.props
    return (
      <InputNumber
        value={this.props.value}
        className={style.SYInputMoney}
        placeholder={this.props.placeholder}
        style={{ width: this.props.width }}
        disabled={this.props.disabled}
        precision={this.props.precision}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        onChange={this.onChange}
        {...otherOpt}
      />
    )
  }
}
export default SYInputMoney
