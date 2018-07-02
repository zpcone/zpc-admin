<template>
  <div class="checkStatusManage">
    <div class="checkStatusTitle">
      <div class="column">
        <span>当前状态：{{getData.status | statusFilter}}</span>
        <span>审核时间{{getData.templateAuditTime | timeFilter}}</span>
        <span>审核人：{{getData.auditPerson}}</span>
      </div>
      <div class="column">
        <span>审核操作：{{getData.operatorAudirStatus}}</span>
        <span>操作原因：{{getData.turnDown}}</span>
        <span></span>
      </div>
    </div>
    <div class="checkStatusBody">
      <div class="detailWrap">
        <span class="labelSpan">模板类型</span>
        <span style="displa:inline-block;border:3px solid #1C9AD2;padding:5px 10px;color:#1C9AD2;">{{getData.templateType | typeFilter}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">应用渠道</span>
        <span style="padding:5px 10px;">{{getData.templateSystem | channelFilter}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">模板名称</span>
        <span style="padding:5px 10px;">{{getData.templateName}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">签名</span>
        <span style="padding:5px 45px;">{{getData.messageSignatures}}</span>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">短信内容</span>
        <div class="messageContent">
          <span>{{getData.templateContext}}</span>
        </div>
      </div>
      <div class="detailWrap">
        <span class="labelSpan">疲劳控制</span>
        <span style="padding:5px 20px;">{{getData.control}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 已审核查询
  import { getMessageAuditReview} from '@/api/notice'
  import { parseTime } from '@/utils'
  export default{
    data(){
      return{
        getData: {}, // 保存后台返回的数据
        checkStatus: '待审核',
        checkTime: '20174564654',
        checkName: 'uname',
        checkOpera: '已驳回',
        checkReason: '没有原因',
        tempType: '短信模板',
        useChannel: '我鸽',
        templateName: '模板名称',
        signName: '签名',
        messageContent: 'shljdlgjdfl',
        tiredControl: '不控制'
      }
    },
    methods:{
      send (obj) {
        getMessageAuditReview(obj)
        .then(response => {
          console.log(response)
          this.getData = response
          this.$message({
            message: '获取详情成功!',
            type: 'success'
          })
        })
        .catch( () => {
          this.$message({
            message: '获取详情失败!',
            type: 'info'
          })
        })
      }

    },
    filters:{
      typeFilter(val){
        if (val == '1') {
          return '通知'
        } else if (val == '2') {
          return '验证码'
        } else if (val == '3') {
          return '营销'
        }
      },
      channelFilter(val){
        if (val == '1') {
          return '我茂'
        } else if (val == '2') {
          return '我鸽'
        }
      },
      timeFilter(val){
        return parseTime(val)
      },
      statusFilter(val){
        if (val == '1') {
          return '待提交'
        } else if (val == '2') {
          return '审核中'
        }else if (val == '3') {
          return '已通过'
        }else if (val == '4') {
          return '已驳回'
        }
      }
    },
    mounted () {
      console.log(this.$route.query.id)
      var obj = {id: this.$route.query.id}
      obj.templateSystem = '1'
      this.send(obj)
    }
  }
</script>

<style scoped lang="scss">
  .checkStatusManage{
    padding: 0 20px;
    .checkStatusTitle{
      margin: 20px 0;
      height:100px;
      background: #D7D7D7;
      .column{
        display: flex;
        span{
          text-align: center;
          line-height: 50px;
          flex: 1;
        }
      }
    }
    .checkStatusBody{
      .detailWrap{
        margin-top:50px;
        .messageContent{
          border:3px solid gray;
          display: inline-block;
          height:200px;
          width:400px;
          padding: 20px;
          background: #999;
        }
        .labelSpan{
          font-weight: bold;
          font-size: 18px;
          margin:0 20px 0 30px;
        }
      }
    }
  }
</style>
