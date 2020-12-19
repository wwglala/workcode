/*
 * @Date: 2019-11-27 09:18:03
 * @LastEditTime: 2019-12-06 16:56:18
 * @Description: file content
 */
import React, { Component } from 'react'
import { Spin } from 'antd'

export default function asyncComponent(importComponent, delay = 0) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null,
      }
    }

    async UNSAFE_componentWillMount() {
      const { default: component } = await importComponent()
      setTimeout(() => {
        this.setState({
          component
        })
      }, delay)
    }

    render() {
      const C = this.state.component

      return C
        ? <C {...this.props} />
        : <div style={{ width: '100%', paddingTop: '20px', textAlign: 'center' }}><Spin /></div>
    }
  }

  return AsyncComponent
}
