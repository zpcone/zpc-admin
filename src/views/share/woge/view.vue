<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="分享渠道" prop="shareType">
          <el-select  placeholder="请选择" v-model="form.shareType">
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
          <el-button class="el-icon el-icon-search" type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="openId" label="查看人"></el-table-column>    
        <el-table-column prop="shareContentType" label="分享类型"></el-table-column>    
        <el-table-column prop="shareTitle" label="查看内容标题"></el-table-column>    
        <el-table-column prop="shareContentUrl" label="内容URL"></el-table-column>    
        <el-table-column prop="mId" label="分享人"></el-table-column>    
        <el-table-column prop="appId" label="分享渠道"></el-table-column>    
        <el-table-column prop="created" label="查看时间"></el-table-column>    
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        :current-page.sync="form.pageNumber" 
        :page-size="form.pageSize" 
        layout="total, prev, pager, next"
        @current-change="getList"
        :total="total">
      </el-pagination>
    </div>
    <div class="m20">
    	<p>总计查看：条</p>
    	<p>站内：条</p>
    	<p>站外：条</p>
    </div>
  </section>
</template>

<script>
  import { searchView } from '@/api/share'
  export default{
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.form.startTime = this.time[0]
            this.form.endTime = this.time[1]
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
          appId: 5,
          pageNum: 1,
          pageSize:10
        },
        total: 5,
        time: [],
        data: [],
        detail: {},
        channels: [
          {
            label: '全部',
            value: '1'
          },
          {
            label: '趣信',
            value: '2'
          },
          {
            label: '趣茂',
            value: '3'
          }
        ],
      }
    },
    methods:{
      getList(){
        searchView(this.form).then(res => {
          console.log(res)
          this.data = res.data.data
          this.total = parseInt(res.totalSize)
        })
      },
      search(){
        this.form.pageNum = 1
        this.getList()
      }
    },
    created(){
      this.getList()
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