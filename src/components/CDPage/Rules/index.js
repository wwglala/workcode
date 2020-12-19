import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { message } from 'antd'
import Rules from './rules'
import Store from './store'

@observer
class SYRules extends Component {
   static defaultProps={
     getRuleUrl: '/fk/fkgzcx/RuleSearchBefore_search.service',
     getRuleByIdUrl: '/fk/fxfxbg/FkptYwRuleNomalSel.service',
     validRuleUrl: '/fk/fxyw/fxywjy.service',
     getRuleParams: {},

     ruleIsNext: () => {},
   }
   constructor(props) {
     super(props)
     this.state = {
       isNext: false
     }
   }
   async componentDidMount() {
     if (this.props.ruleRef) {
       this.props.ruleRef(this)
     }
     const { getRuleUrl, getRuleParams, status } = this.props
     if (status === 2) {
       const params = {
         sp: true,
         ...getRuleParams
       }
       this.rule.getRule(getRuleUrl, params)
       console.log('getRule ====>', getRuleParams)
     } else {
       this.rule.getRule(getRuleUrl, getRuleParams)
       console.log('getRule ====>', getRuleParams)
     }
   }
  // 校验规则
  getValidRule = async() => {
    const { validRuleUrl, getRuleParams, ruleIsNext, getRuleByIdUrl } = this.props
    await Store.getValidRules(validRuleUrl, getRuleParams)
    if (Store.ret === 0) {
      ruleIsNext(true)
      this.rule.getRuleById(getRuleByIdUrl, { sureid: Store.sureid })
      console.log('getValidRules ====>', Store.ret)
    } else {
      ruleIsNext(false)
      this.rule.getRuleById(getRuleByIdUrl, { sureid: Store.sureid })
      message.error('规则校验不通过')
      console.log('getValidRules ====>', Store.ret)
    }
  }
  render() {
    return (
      <div>
        <Rules onRef={ref => { this.rule = ref }} />
      </div>
    )
  }
}
export default SYRules
