<template>
  <div class="shopLabel">
    <div class="shopLabelHead">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:50px 0 0 20px">
        <el-form-item label="选择类目" style="margin-right:20px;">
          <el-select clearable v-model="oneFormInline.pId" placeholder="请选择" @change="oneClassChange(data)">
            <el-option  :label="item.areaName" :value="item.pId" v-for="(item, index) in oneClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoClassArray.length > 0" style="margin-right:20px;">
        <!-- <el-form-item style="margin-right:20px;"> -->
          <el-select clearable v-model="twoFormInline.pId" placeholder="请选择" @change="twoClassChange(data)">
            <el-option :label="item.areaName" :value="item.pId" v-for="(item, index) in twoClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="threeClassArray.length > 0" style="margin-right:20px;">
        <!-- <el-form-item style="margin-right:20px;"> -->
          <el-select clearable v-model="threeFormInline.pId" placeholder="请选择" @change="threeClassChange(data)">
            <el-option :label="item.areaName" :value="item.pId" v-for="(item, index) in threeClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索关键字" style="margin-right:20px;">
          <el-input clearable v-model="form.scenarioName" placeholder="请输入场景关键字"></el-input>
          <!-- <el-select clearable v-model="threeFormInline.id" placeholder="请选择" @change="threeClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in threeClassArray" :key="index"></el-option>
          </el-select> -->
        </el-form-item>
        <el-button type="info" @click="searchTableList">查询</el-button>
      </el-form>
    </div>
    <div class="shopLine"></div>
    <div style="text-align:center;font-weight:bold;margin-top:20px;">
        <!-- <el-button type="info" disabled>批量导入</el-button> -->
        <!-- <el-button type="info">编辑</el-button> -->
    </div>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="editDialogForm">
      <el-form :model="diaForm">
        <el-form-item label="场景名称：" :label-width="formLabelWidth">
          <el-input v-model="diaForm.scenarioName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别：" :label-width="formLabelWidth">
          <el-select v-model="diaForm.scenarioType" placeholder="请选择活动区域">
            <el-option :label="item.scenarioName" :value="item.scenarioType" v-for="(item, index) in diaClassArray" :key="index"></el-option>
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="是否废弃：" :label-width="formLabelWidth">
          <el-radio-group v-model="diaForm.isDelete">
            <el-radio label="0">未废弃</el-radio>
            <el-radio label="1">已废弃</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="saveEditDiag">确 定</el-button>
      </div>
    </el-dialog>
    <div class="shopTableList">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="scenarioName"
          label="标签名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="省,市，自治区">
        </el-table-column>
        <el-table-column
          prop="classCode"
          label="POI类型码">
        </el-table-column>
        <el-table-column
          prop="scenarioType"
          :formatter="isScenarioType"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="coord"
          label="坐标">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="isDelete"
          :formatter="isDeleteFormatter"
          label="是否废弃">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// =====获取省==============二级标签列表======查询一级场景标签====修改二级场景
import {getProvinceOption, getTableList, getOneList, updateTwoLabel } from '@/api/label/shopLabelList/shopLabelManage'
  export default{
    data() {
      return{
        diaClassArray: [],
        diaForm: {//
          id: '', //	场景id
          scenarioName: '',	// 场景名称
          scenarioType: '',// 场景类型
          isDelete: ''	// 是否废弃
        }, // 弹框内部参数
        formLabelWidth: '100px',
        editDialogForm: false,
        totalPage: '',
        optionClassObj: {},
        form: {
          scenarioName: '', // 场景名称
          level: '',	// 深度
          code: '',	 // 城市code码
          pageNum: '1',	// 当前页
          pageSize: '5' //  	页数
        },
        formInline: {
          parentId: '', // id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        defaultForm: {
          parentId: '', // id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        oneFormInline: {
          pId: '', // id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        twoFormInline: {
          parentId: '', // id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        oneClassArray: [
          {label: '小明', value: 'xiaoming'}
        ],
        twoClassArray: [], // 二级分类
        threeClassArray: [], // 三级分类
        threeFormInline: {
          id: '', // id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        tableData: []
      }
    },
    methods:{
      // 搜索
      searchTableList() {
        getTableList(this.form)
        .then(res => {
          this.tableData = res.data
          this.tableData.forEach(el => {
            // 坐标
            el.coord = "(" + el.latitude +"," + el.longitude + ")"
          })
          this.totalPage = Number(res.totalSize)
          console.log(res)
          this.$message.success('获取列表成功')
        })
        .catch(() => {
          this.$message.error('获取列表失败')
        })
      },

      // table格式化
      isDeleteFormatter(row, column) {
        if (row.isDelete == '0') {
          return '未废弃'
        } else if(row.isDelete == '1') {
          return '已废弃'
        }
      },
      isScenarioType(row,column) {
        if (row.scenarioType == '1') {
          return '校园'
        } else if(row.scenarioType == '2') {
          return '办公楼'
        } else if (row.scenarioType == '3') {
          return '社区'
        }
      },
      // option one值变化的事件
      oneClassChange () {
        if (!this.oneFormInline.pId) {
          this.twoClassArray = []
          this.threeClassArray = []
          this.form.code = ''
          this.form.level = ''
        } else {
          this.form.code = this.oneFormInline.pId
          this.form.level = '1'
          this.optionClassObj.level = '2'
          this.optionClassObj.parentId = this.oneFormInline.pId
          this.getOptions(this.optionClassObj)
          console.log('获取二级分类名称成功')
        }
        // this.formInline.id = this.oneFormInline.id
        // this.formInline.level = '1'
      },
      // option two值变化的事件
      twoClassChange () {
        if (!this.twoFormInline.pId) {
          this.threeClassArray = []
          this.form.code = this.oneFormInline.pId
          this.form.level = '1'
        } else {
          this.form.code = this.twoFormInline.pId
          this.form.level = '2'
          this.optionClassObj.level = '3'
          this.optionClassObj.parentId = this.twoFormInline.pId
          this.getOptions(this.optionClassObj)
          console.log('获取三级分类名称成功')
        }
        // this.formInline.id = this.twoFormInline.id
        // this.formInline.level = '2'
      },
      // option three值变化的事件
      threeClassChange () {
        if (!this.threeFormInline.pId) {
          this.form.code = this.twoFormInline.pId
          this.form.level = '2'
        } else {
          this.form.code = this.threeFormInline.pId
          this.form.level = '3'
          this.optionClassObj.level = '3'
          this.optionClassObj.parentId = this.threeFormInline.pId
        }
        // this.formInline.parentId = this.threeFormInline.pId
        // this.formInline.level = '3'
      },
      saveEditDiag() {
        this.updata()
      },
      // 获取弹框内部option
      geDiagOption() {
        // debugger
        getOneList({})
        .then(res => {
          this.diaClassArray = res.data
          console.log(res)
        })
        .catch(() => {

        })
      },
      // 更新数据的接口
      updata() {
        updateTwoLabel(this.diaForm)
        .then(res => {
          this.searchTableList()
          this.editDialogForm = false
          this.$message.success('编辑成功')
        })
        .catch(() => {
          this.$message.error('编辑失败')
        })
      },
   // 查询分类下拉列表-接口
      getOptions (data) {
        var _this = this
        getProvinceOption(data)
        .then(res=> {
          if (_this.optionClassObj.level == '1') {
            _this.oneClassArray = res.data
          } else if (_this.optionClassObj.level == '2') {
            _this.twoClassArray = res.data
          } else if (_this.optionClassObj.level == '3') {
            _this.threeClassArray = res.data
          }
          _this.$message({
            message: '获取类目名称成功!',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '获取类目名称失败!',
            type: 'error'
          })
        })
      },
      handleClick(row) {
        this.diaForm.scenarioName = row.scenarioName
        this.diaForm.isDelete = String(row.isDelete)
        this.diaForm.id = row.id
        this.diaForm.scenarioType = row.scenarioType
        this.editDialogForm = true
        // console.log(row)
      },
      handleSizeChange(val) {
        this.form.pageSize = val
        this.searchTableList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.searchTableList()
        console.log(`当前页: ${val}`)
      }
    },
    mounted () {
      this.optionClassObj.parentId = '0'
      this.optionClassObj.level = '1'
      this.searchTableList()
      this.getOptions(this.optionClassObj) // 调取获得类目接口
      this.geDiagOption()
    }
  }
</script>

<style scoped lang="scss">
  .shopLabel{
    padding: 20px 20px;
    .shopLabelHead{
      background: rgb(241, 241, 241);
      margin-bottom:10px;
    }
    .shopLine{
      border-bottom: 1px dotted gray;
    }
    .shopTableList{
      margin-top:10px;
    }
    .block{
      float: right;
      margin-top:20px;
    }
  }
</style>
