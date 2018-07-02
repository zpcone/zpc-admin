<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item prop="type" label="类型">
          <el-cascader
            clearable
            v-model="chooseType"
            :options="typeData"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon el-icon-search" @click="search">查询</el-button>
          <el-button style="min-width: 120px;"  icon="el-icon-setting" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="complaintsId" label="投诉单ID"></el-table-column>
        <el-table-column prop="channelId" :formatter="channelFormat" label="渠道"></el-table-column>
        <el-table-column prop="complainant" label="投诉人"></el-table-column>
        <el-table-column prop="complainantby" label="被投诉人"></el-table-column>
        <el-table-column prop="complainantTime" label="投诉时间"></el-table-column>
        <el-table-column prop="contentName" label="内容类型"></el-table-column>
        <el-table-column prop="status" :formatter="statusFormat" label="状态"></el-table-column>
        <el-table-column prop="complaintsName" label="投诉分类"></el-table-column>
        <el-table-column prop="complaintsContent" label="投诉内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="viewDetail(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotalCount"
        :current-page="form.pageIndex"
        :page-size="form.pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>

    <el-dialog
      title="订单详情"
      :visible.sync="detailDlsg"
      width="40%">
      <div>
        <div style="margin-bottom: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <div class="text item textB">
              投诉单ID：{{detail.complaintsId}}
            </div>
            <div class="text item">
              投诉人：{{saveLookTable.complainant}}
            </div>
            <div class="text item">
              渠道：{{detail.channelId | channelFilter}}
            </div>
            <div class="text item">
              投诉时间：{{detail.complainantTime}}
            </div>
            <div class="text item">
              内容分类：{{saveLookTable.contentName}}
            </div>
            <div class="text item">
              投诉分类：{{saveLookTable.complaintsName}}
            </div>
            <div class="text item">
              投诉内容：{{saveLookTable.complaintsContent}}
            </div>
          </el-card>
        </div>
        <div class="m20"></div>
        <el-form ref="treatForm" :model="treatForm">
          <el-form-item prop="" label="投诉处理:">
            <el-input disabled v-model="treatForm.desc" type="textarea" :rows="5" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDlsg = false">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import { treatedList,getTypes,treatDetail,getTree } from '@/api/complain'
  export default{
    filters:{
      channelFilter(val){
        if(val === '1'){
          return "我茂"
        }else{
          return "我鸽"
        }
      }
    },
    watch: {
      time(){
        if(this.time){
          if(this.time.length === 2 ){
            this.form.complaintsStartTime = this.time[0]
            this.form.complaintsEndTime = this.time[1]
          }

        }else{
          this.form.complaintsStartTime = ''
          this.form.complaintsEndTime = ''
        }

      },
      chooseType(arr){
        if (arr.length > 0) {
          this.form.contentType = arr[0]
        } else if(arr.length <= 0){
          this.form.contentType = ''
        }
      }
    },
    data(){
      return{
        saveLookTable: '',
        chooseType: [],
        pageTotalCount: '',
        form: {
          contentType:'',
          complaintsType: '',
          channelId: '2',
          complaintsStartTime: '',
          complaintsEndTime: '',
          pageIndex:1,
          pageSize:10
        },
        time:[],
        data: [],
        treatData: [],
        detailDlsg: false,
        treatForm: {},
        detail: {},
        typeData: []
      }
    },
    methods:{
      getTree(){
        var _this = this
        // 获取级联的数据
         getTree().then(res => {
          var _this = this
          _this.typeData = []
          let data = res.data
          if(res.status == '200'){
            for(let i=0;i<data.length;i++){
              data[i].value = data[i].channelId
             if(data[i].channelId == '2'){
                data[i].label = '我鸽'
                _this.typeData = data[i].contentTypes
                _this.typeData.forEach(ele => {
                  ele.label = ele.contentName
                  ele.value = ele.contentType
                  if (ele.lists) {
                    delete(ele.lists)
                  }
                })
              }
              // data[i].children = new Array()
              // // 处理第一层的
              // if(data[i].contentTypes.length){
              //   data[i].children = data[i].contentTypes
              //   let arrTemp = data[i].children
              //   for(let j=0;j<arrTemp.length;j++){
              //     arrTemp[j].label = arrTemp[j].contentName
              //     arrTemp[j].value = arrTemp[j].contentType
              //   }
              // }

            }
            // this.typeData = data
          }else{
            this.$message.error(res.errorMsg)
          }
        })
      },
      channelFormat(val){
        if(val.channelId === '1'){
          return "我茂"
        }else if(val.channelId === '2'){
          return "我鸽"
        }
      },
      statusFormat(val){
        if(val.status === '1'){
          return "未处理"
        }else if(val.status === '2'){
          return "已处理"
        }
      },
      handleQuery(){
        treatedList(this.form).then(res => {
          if(res){
            this.data = res.data
            this.pageTotalCount = parseInt(res.totalSize)
          }
        })
      },pageChange(val){
        this.form.pageIndex = val
        this.handleQuery()
      },
      search(){
        this.handleQuery()
      },
      viewDetail(index,row){
        this.saveLookTable = row
        treatDetail({complaintsId:row.complaintsId}).then(res => {
          this.detail = res.data
          this.treatForm.desc = this.detail.handlerContent
        })
        this.detailDlsg = true
      },
      reset(){
        this.time = []
        this.chooseType = []
        this.form.channelId = '2'
        this.form.contentType = ''
        this.form.complaintsType = ''
        this.$refs.form.resetFields()
      }
    },
    mounted(){
      this.getTree()
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
