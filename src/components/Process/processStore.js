import { observable, action, runInAction } from 'mobx'
import { post } from 'Util/request'
import apiPath from 'Common/apiPath'

class Store {
    @observable dataSource=[]

    @action setDataSource= val => {
      this.dataSource = val
    }
    // 从后台获取审批数据
    @action getDataSource= async processId => {
      try {
        let resArr = []
        let res = await post(apiPath.GET_COMMON_PROCESSLIST, { processInstanceId: processId })
        console.log('审批流程记录===', res)
        if (res.success) {
          if (res.task.length > 0) {
            // 标记去除第一个申请的审批信息
            let i = 0
            res.task.map(item => {
              if (i === 0 && item.taskName === '申请') {
                // eslint-disable-next-line no-plusplus
                i++
                return
              }
              resArr.push({ ...this.parseComment(item.taskName, item.comment),
                name: item.assignee,
                time: item.time,
                taskName: item.taskName })
            })
            runInAction(() => {
              this.dataSource = resArr
            })
          }
        }
      } catch (error) {
        console.log('审批数据为查询失败', error)
      }
    }
    @action.bound parseComment=(taskName, comment) => {
      let icon = ''
      let color = '#DDDDDD'
      if (taskName === '结束') {
        return { comment, icon, color }
      } if (taskName === '任务发起人') {
        icon = '已发起'
        return { comment, icon, color: '#999999' }
      }
      if (comment.lastIndexOf(':已同意') > -1) {
        comment = comment.substring(0, comment.lastIndexOf(':已同意'))
        color = '#4A90E2'
        icon = '已同意'
      } else if (comment.lastIndexOf(':已退回') > -1) {
        comment = comment.substring(0, comment.lastIndexOf(':已退回'))
        icon = '已退回'
        color = '#D0021B'
      } else if (comment.lastIndexOf(':待审批') > -1) {
        comment = comment.substring(0, comment.lastIndexOf(':待审批'))
        color = '#4A90E2'
        icon = '待审批'
      } else if (comment.lastIndexOf(':已撤销') > -1) {
        comment = comment.substring(0, comment.lastIndexOf(':已撤销'))
        icon = '#D0021B'
        color = 'red'
      } else if (taskName !== '结束') {
        icon = '待审批'
        color = '#108EE9'
      }
      return { comment, icon, color }
    }
}
export default new Store()
