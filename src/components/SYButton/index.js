import React, { Component } from 'react'
import className from 'classnames'
import { Row, Col, Button, Input } from 'antd'
import styles from './index.module.less'
/**
 * 创建人：张昊天
 * 创建时间：2020-4-3 09:26
 * 修改时间：2020-4-3 09:26
 * SyButton: 包装Button组件, to属性 ,可选ok或cancel,error,default 分别代表确定，取消，退回，重置
 */

export const SyButton = props => {
  const { children, to } = props
  let buttonClass = ''
  switch (to) {
    case 'ok':
      buttonClass = styles['sybutton-ok']
      break
    case 'cancel':
      buttonClass = styles['sybutton-cancel']
      break
    case 'error':
      buttonClass = styles['sybutton-error']
      break
    case 'default':
      buttonClass = styles['sybutton-default']
      break
    default:
  }
  return (
    <Button className={className(buttonClass)} {...props}>{children}</Button>
  )
}
