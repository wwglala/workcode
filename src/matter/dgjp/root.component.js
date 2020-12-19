/* eslint-disable no-irregular-whitespace */
/*
 * @Date: 2020-04-27 17:30:12
 * @LastEditTime: 2020-04-28 17:28:20
 * @Description: file content
 */
import React from 'react'
import { Provider, observer } from 'mobx-react'
import { Route, Router, Switch } from 'react-router-dom'
import moment from 'moment'
import asyncComponent from 'Common/asyncComponent'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// import ApplyPage from './applyPage/index'
// import ApprovalPage from './approvalPage/index'
// import BackPage from './backPage/index'
import './style.less'

const dgjp = asyncComponent(() => import('./dgjp/index'))
const test = asyncComponent(() => import('./test/index'))
const sp = asyncComponent(() => import('./dgsp/index'))
const yzfq = asyncComponent(() => import('./yzfq/index'))
const yzsp = asyncComponent(() => import('./yzsp/index'))
const yzth = asyncComponent(() => import('./yzsp/index'))
moment.locale('zh-cn')

@observer
class RootComponent extends React.Component {
  render() {
    let { history, comStore } = this.props
    return (
      <div>
        <ConfigProvider locale={zhCN}>
          <Provider comStore={comStore}>
            <Router history={history}>
              <Switch>
                <Route path='/' exact component={dgjp} />
                <Route path='/sp' component={sp} />
                <Route path='/td' component={dgjp} />
                <Route path='/test' component={test} />

                <Route path='/yzfq' component={yzfq} />
                <Route path='/yzsp' component={yzsp} />
                <Route path='/yzth' component={yzfq} />
              </Switch>
            </Router>
          </Provider>
        </ConfigProvider>
      </div>
    )
  }
}

export default RootComponent
