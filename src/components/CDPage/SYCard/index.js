import React, { Component } from 'react'

import './style.less'

export default class SYCard extends Component {
    static defaultProps = {
      className: ''
    }
    // state={
    // }
    render() {
      return (
        <div className={this.props.className}>
          <div className='myLayout'>
            {this.props.children}
          </div>
        </div>
      )
    }
}
