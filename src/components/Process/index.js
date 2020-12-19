import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { SYTable, SYSelect, TopHeader, PavementSelectionNew, SYInputMoney, FileUpload, SYSteps, SYTextArea } from 'shineyue-component'
import store from './processStore'
import Style from './process.less'

const Step = SYSteps
@observer
class Process extends Component {
   // eslint-disable-next-line react/state-in-constructor
   state={}
   async componentDidMount() {
     await store.getDataSource(this.props.processId)
   }
   render() {
     return (
       <div>
         <SYSteps current={store.dataSource.length - 1} stepWidth={this.props.stepWidth}>
           {store.dataSource.length > 0 ? store.dataSource.map((item, index) => {
             return (
               // eslint-disable-next-line react/no-array-index-key
               <Step key={index}
                 title={(
                   <div className={Style.taskName} title={item.taskName}>
                     {item.taskName.length > 7 ? `${item.taskName.substring(0, 6)}...` : item.taskName}
                     {item.icon
                       ? (
                         <div className={Style.spNode}
                           style={{ color: item.color, borderColor: item.color }}
                         >
                           {item.icon}
                         </div>
                       ) : null}
                   </div>
                 )}
                 description={(
                   <div style={{ marginBottom: '20%' }}>
                     <div className={Style.userName}>{item.name}</div>
                     {item.comment ? <div className={Style.comment}>{item.comment}</div> : null}
                     <div className={Style.timer}>{item.time}</div>
                   </div>
                 )}

               />
             )
           }) : null}

         </SYSteps>
       </div>
     )
   }
}
export default Process
