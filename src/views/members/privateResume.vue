<template>
  <div class="privateResume">
    <div style="color:#757575;font-weight:bold;"><span>最近更新于</span><span style="margin-left:20px;">{{updateTime}}</span></div>
    <div class="basicMessage">
      <h3>李四</h3>
      <span>联系电话:</span> <span>{{tel}}</span>
      <h3 style="margin-top:50px;">求职意向</h3>
    </div>
    <div class="intension">
      <span>{{job}}</span>&nbsp;|&nbsp;
      <span>{{salary}}元</span>&nbsp;|&nbsp;
      <span>{{address}}</span>
      <h3 style="margin-top:50px;">工作经历</h3>
    </div>
    <div class="jobExperience">
      <div style="margin-bottom:20px;" v-for="(item, index) in jobExperience" :key="index">
        <div class="jobExperienceTitle">
          <i class="el-icon-info"></i>
          <span style="margin-left:20px;">{{item.company}}</span>&nbsp;|&nbsp;
          <span>{{item.position}}</span> <br>
        </div>
        <div class="jobExperienceBody">
          <div class="left">
            <span>工作内容：</span>
          </div>
          <div class="right">
            <span>{{item.content}}</span>
          </div>
        </div>
      </div>
      <h3 style="margin-top:50px;">教育背景</h3>
    </div>
    <div class="education">
      <div style="margin-bottom:20px;" v-for="(item, index) in education" :key="index">
        <div class="jobExperienceTitle">
          <i class="el-icon-info"></i>
          <span style="margin-left:20px;">{{item.school}}</span>&nbsp;|&nbsp;
          <span>{{item.position}}</span> <br>
        </div>
        <div class="jobExperienceBody">
          <div class="left">
            <span>主修课程：</span>
          </div>
          <div class="right">
            <span>{{item.course}}</span>
          </div>
        </div>
      </div>
      <h3 style="margin-top:50px;">自我评价</h3>
    </div>
    <div class="selfAssessment">
      <span>{{selfAssessment}}</span>
    </div>
  </div>
</template>

<script>
// =======个人简历==
import { getResume } from '@/api/members'
  export default{
    data(){
      return{
        updateTime: '2017.01.11 07:20',
        tel: '1465465456',
        job: '销售经理',
        salary: '50000',
        address: '上海',
        jobExperience: [
          {company: '***公司',position: "经理",content:'sdhofjofsoifusdoiujguis2017年9月28日 - span标签里的内容过长如何设置自动换行 HTMLCSS span标签是被用来组合文档中的行内元素。span 没有固定的格式表现。当对它应用样式时,它会产生视觉上的变化hguiohuio,shijfhdsjhldhgkjhsdfighkjsdhofjofsoifusdoiujguishguiohuio'},
          {company: '***公司',position: "经理",content:'sdhofjofsoifusdoiujguishguiohuio'},
          {company: '***公司',position: "经理",content:'sdhofjofsoifusdoiujguishguiohuio'}
        ],
        education:[
          {school: '***大学',position: "本科",course:'sdhofjofsoifusdoiujguishguiohuio'}
        ],
        selfAssessment: '自我评价自我评价自我评价自我评价自我评价自我评价'
      }
    },
    // memerId
    methods:{
      getPersonResume(data) {
        getResume(data)
        .then(res => {
          this.$message.success('获取简历成功')
        })
        .catch(() => {
          this.$message.error('获取简历失败')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  $border:1px solid #ccc;
  .privateResume{
    padding: 20px;
    .basicMessage{
      border-bottom: $border;
      margin:50px 0 0 20px;
    }
    .intension{
      margin:20px 0 0 20px;
      border-bottom:$border;
      span{
        color:#757575;
        font-weight:bold;
      }
    }
    // 工作经历
    .jobExperience{
      border-bottom: $border;
      margin: 20px 0 0 20px;
      .jobExperienceTitle{
        color:#757575;
        font-weight:bold;
        padding: 20px 0;
      }
      .jobExperienceBody{
        margin-left:40px;
        .left{
          margin-bottom:20px;
          span{
            color:#757575;
            font-weight:bold;
          }
        }
        .right{
          margin-left:20px;
          span{
            font-size: 14px;
            line-height: 30px;
          }
        }
      }
    }
    // 教育背景
    .education{
      border-bottom: $border;
      margin: 20px 0 0 20px;
      .jobExperienceTitle{
        color:#757575;
        font-weight:bold;
        padding: 20px 0;
      }
      .jobExperienceBody{
        margin-left:40px;
        .left{
          margin-bottom:20px;
          span{
            color:#757575;
            font-weight:bold;
          }
        }
        .right{
          margin-left:20px;
          span{
            font-size: 14px;
            line-height: 30px;
          }
        }
      }
    }
    .selfAssessment{
      padding: 20px;
      span{
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
</style>
