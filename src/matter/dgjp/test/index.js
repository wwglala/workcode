import React from 'react'
import { SYSelect, PavementSelectionNew, SYPage } from 'shineyue-component'
import { Select, Tag } from 'antd'
import { logRoles } from '@testing-library/react'
import { log } from 'lodash-decorators/utils'
import Store from './store'
import UtilsMine from '../Utils'
import './style.css'

const { CheckableTag } = Tag
const { Option } = Select
const shiyouData = [{ value: '01', label: '项目' }, { value: '02', label: '拜访' }, { value: '03', label: '演示' }, { value: '04', label: '其他' }]
class Index extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      select: '',
      c: false,
      bbgrxx: window.bbgrxx
    }
  }

  async UNSAFE_componentWillMount() {
    await this.setState({
      select: '02'
    })
  }
  // async UNSAFE_componentWillMount() {
  //   await this.setState({
  //     select: '02'
  //   })
  // }
  handleChange = checked => {
    console.log(checked)
  }
  render() {
    console.log(this.state.select)
    return (
      <div>
        <CheckableTag checked={this.state.c}
          // eslint-disable-next-line react/no-access-state-in-setstate
          onChange={checked => this.handleChange(this.setState({ c: !this.state.c }))}
        >
          213

        </CheckableTag>
        <Tag>123</Tag>

      </div>
    )
  }
}

export default Index
