<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <!-- ？========== -->
        <!-- <el-form-item label="关键字查询:">
          <el-input class="inputWidth" v-model="form.name" placeholder="请输入关键字"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="用户标签:">
          <el-input v-model="form.region" placeholder="请输入用户标签"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="宏定义查询:">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> <br> -->
        <el-form-item label="渠道类型:">
          <el-select :disabled="isdisable" v-model="form.channelId" placeholder="请选择">
            <el-option label="电商" value="1"></el-option>
            <el-option label="社交" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄:">
            <el-input-number style="width:150px;" size="medium" v-model="form.minAge"></el-input-number>
            <span>-</span>
            <el-input-number size="medium" style="width:150px;" v-model="form.maxAge"></el-input-number>
          <!-- <el-input placeholder="请输入用户年龄" v-model="form.age"></el-input> -->
        </el-form-item>
        <el-form-item label="用户行业:">
          <el-select disabled v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> <br>
        <el-form-item label="用户ID:">
          <el-input clearable class="inputWidth" v-model="form.mId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="当前所在地">
          <el-input clearable class="inputWidth" placeholder="请输入当前所在地" v-model="form.address"></el-input>
          <!-- <el-select disabled class="selectWidth" v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户性别:">
          <el-select class="selectWidth" clearable v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="用户职业：">
          <el-input clearable v-model="form.occupation" placeholder="请输入用户职业"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input clearable placeholder="请输入用户名" class="inputWidth" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="户籍所在地:">
          <el-input clearable class="inputWidth" v-model="form.hometown" placeholder="请输入所在地"></el-input>
          <!-- <el-select class="selectWidth" v-model="form.hometown" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <br>
        <el-form-item label="毕业院校:">
          <el-input clearable v-model="form.school" placeholder="请输入学校"></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户昵称:">
          <el-input clearable class="inputWidth" placeholder="请输入用户昵称" v-model="form.nickName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="多用户平台">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="userSearch">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="wrapperBody">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="渠道类型"
          :formatter="channelFormatter"
          prop="channelId"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mId"
          label="用户ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="真实姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          :formatter="sexFormatter"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hometown"
          label="户籍所在地"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="当前所在地"
          width="120">
        </el-table-column>
        <el-table-column
          prop="specialty"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="occupation"
          label="职业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="school"
          label="毕业院校"
          width="120">
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="收入(月)">
        </el-table-column> -->
         <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
    <div class="btn">
      <!-- <el-button type="primary" disabled>查看共同标签</el-button> -->
      <!-- <el-button type="primary" disabled>查看共性分布图</el-button> -->
    </div>

  </div>
</template>

<script>
// =========用户列表查询=========新增接口====
import {peopleLabelBasicInfo, baseLabelNameSearchList } from '@/api/label/peopleLabelManage/peopleLabelSearch'
export default {
  components:{},
  props:{},
  data(){
    return {
      isdisable: false,
      totalPage: '', // 总条数
      form: {
        minAge: '',
        maxAge: '200',
        mId: '', //	用户id	String
        // age: '', //	年龄	Integer
        birthday: '', //	生日	Date
        userName: '', //	真实姓名	String
        nickName: '', //	昵称	String
        channelId: '', //	渠道	Long
        sex: '', //	年龄	Integer
        regionId: '', //	地区	Long
        school: '', //	学校	String
        specialt: '', //	专业	String
        hometown: '', //	家乡	String
        occupation: '', //	职业	String
        pageNum: '1', //	当前页
        pageSize: '5' //	每页显示条数
      },
      tableData: [],
      multipleSelection: []
    }
  },
  watch:{},
  computed:{},
  methods:{
    reset() {
      this.form = {
        minAge: '',
        maxAge: '200',
        mId: '', //	用户id	String
        // age: '', //	年龄	Integer
        birthday: '', //	生日	Date
        userName: '', //	真实姓名	String
        nickName: '', //	昵称	String
        channelId: '', //	渠道	Long
        sex: '', //	年龄	Integer
        regionId: '', //	地区	Long
        school: '', //	学校	String
        specialt: '', //	专业	String
        hometown: '', //	家乡	String
        occupation: '', //	职业	String
        pageNum: '1', //	当前页
        pageSize: '5' //	每页显示条数
      }
        this.$message.success('重置成功')
    },
    userSearch () {
      console.log(this.form)
      console.log('查询')
      if(this.$route.query.name) {
        this.searchToUserList()
      } else {
        this.search()
      }
    },
    // moren 接口
    search() {
      peopleLabelBasicInfo(this.form)
      .then(res => {
        this.totalPage = Number(res.totalSize)
        this.tableData = res.data
        this.$message({
          message: '查询成功!',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '查询失败!',
          type: 'error'
        })
      })
    },
    // 跳接口
    searchToUserList() {
      baseLabelNameSearchList(this.form)
      .then(res => {
        this.totalPage = Number(res.totalSize)
        this.tableData = res.data
        this.$message({
          message: '查询成功!',
          type: 'success'
        })
      })
      .catch(() => {
        this.$message({
          message: '查询失败!',
          type: 'error'
        })
      })
    },
    handleClick (row) {
      this.$router.push(`/label/peopleManage/userDetail/${row.mId}/${row.channelId}`)
    },
    // table列表数据格式化
    channelFormatter(row, column) {
      if (row.channelId == '1') {
        return '电商'
      } else if(row.channelId == '2'){
        return '社交'
      }
    },
    sexFormatter(row, column) {
      if (row.sex == '0') {
        return '男'
      } else if(row.sex == '1'){
        return '女'
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      if(this.$route.query.name) {
        this.searchToUserList()
      } else {
        this.search()
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.form.pageNum = val
      if(this.$route.query.name) {
        this.searchToUserList()
      } else {
        this.search()
      }
    }
  },
  created(){},
  mounted(){
    var name = this.$route.query.name
    var channelId = this.$route.query.channelId
    var labelType = this.$route.query.labelType
    if (name) {
      this.form.labelName = name
      this.form.channelId = channelId
      this.form.labelType = labelType
      this.isdisable = true
      console.log(name, '存在name')
      this.searchToUserList()
    } else {
      this.isdisable = false
      console.log('不存在')
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn{
    margin-top:20px;
    text-align: center;
  }
  .selectWidth{
    width: 200px;
  }
  .inputWidth{
    width:200px;
  }
  .wrapper{
    padding:20px;
    .wrapperHead{
      padding-top:20px;
      border-radius: 5px;
      height:350px;
      background: #F2F2F2;
    }
    .line{
      margin-top:20px;
      border-bottom: 2px dashed #F2F2F2;
    }
    .wrapperBody{
      margin-top:20px;
    }
    .page{
      float: right;
      margin-top:20px;
    }
  }
</style>
