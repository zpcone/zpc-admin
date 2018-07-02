<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="分享人" prop="mId">
          <el-input placeholder="" v-model="form.mId">
            <i slot="prefix"  class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="分享渠道" prop="appId">
          <el-select  placeholder="请选择" v-model="form.appId">
              <el-option
                  v-for="item in channels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分享时间" prop="time">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="mm/dd/yyyy"
            end-placeholder="mm/dd/yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="el-icon el-icon-search" @click="search">查询</el-button>
          <el-button @click="view">分享查看管理</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="mId" label="分享人"></el-table-column>    
        <el-table-column prop="shareContentType" :formatter="titleFormat" label="分享类型"></el-table-column>    
        <el-table-column prop="shareTitle" label="分享内容标题"></el-table-column>    
        <el-table-column prop="shareContentUrl" label="内容URL"></el-table-column>    
        <el-table-column prop="status" :formatter="statusFormat" label="分享状态"></el-table-column>    
        <el-table-column prop="appId" :formatter="appIdFormat" label="分享渠道"></el-table-column>    
        <el-table-column prop="created" label="分享时间"></el-table-column>    
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        :current-page.sync="form.pageNum" 
        :page-size="form.pageSize" 
        layout="total, prev, pager, next"
        @current-change="getList"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
  import { search } from '@/api/share'
  export default{
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.form.startCreated = this.time[0]
            this.form.endCreated = this.time[1]
          }
          
        }else{
          this.form.startTime = ''
          this.form.endTime = ''
        }
        
      }
    },
    data(){
      return{
        form: {
          startCreated: '',
          endCreated: '',
          mId: 0,
          appId: 1,
          pageNum: 1,
          pageSize: 10,
          pageTotal:50
        },
        time: [],
        data: [],
        detail: {},
        channels: [
          {
            label: '全部',
            value: 0
          },
          {
            label: 'QQ',
            value: 1
          },
          {
            label: '微信',
            value: 2
          },
          {
            label: '微博',
            value: 3
          },
          {
            label: '社交',
            value: 4
          },
          {
            label: '电商',
            value: 5
          }
        ],
      }
    },
    methods:{
      statusFormat(row){
        if(row.status == '1'){
          return '成功'
        }else{
          return '失败'
        }
      },
      titleFormat(row){
        if(row.shareContentType == 1){
          return '会员类'
        }else if(row.shareContentType == 2){
          return '群圈类'
        }else if(row.shareContentType == 3){
          return '内容类'
        }else if(row.shareContentType == 4){
          return '频道类'          
        }
      },
      appIdFormat(row){
        if(row.appId == '1'){
          return 'QQ'
        }else if(row.appId == '2'){
          return '微信'
        }else if(row.appId == '3'){
          return '微博'
        }else if(row.appId == '4'){
          return '社交'          
        }else if(row.appId == '5'){
          return '电商'
        }else if(row.appId == '6'){
          return '全部'
        }
      },
      view(){
        this.$router.push('/share/wmview')
      },
      handleQuery(){
        this.getList()
      },
      search(){
        console.log(this.form.pageNum)
        this.form.pageNum = 1
        this.getList()
      },
      getList(){
        console.log(this.form)
        search(this.form).then(res => {
          console.log(res)
          this.data = res.data.data
          this.total = parseInt(res.totalSize)
        })
      }
    },
    mounted(){
      this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
.textr {
  text-align: right;
}

.textl {
  text-align: left;
}

.textc {
  text-align: center;
}

.m20 {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.text {
  font-size: 14px;
}
.textB{
  font-weight: bold;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>