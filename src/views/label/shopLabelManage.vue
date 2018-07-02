<template>
  <div class="shopLabel">
    <div class="shopLabelHead">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:50px 0 0 20px">
        <el-form-item label="一级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="oneFormInline.id" placeholder="请选择" @change="oneClassChange(data)">
            <el-option  :label="item.categoryName" :value="item.id" v-for="(item, index) in oneClassArray" :key="index"></el-option>
            <!-- <el-option label="鞋靴" value="2"></el-option> -->
            <!-- <el-option label="箱包" value="3"></el-option> -->
            <!-- <el-option label="办公用品" value="4"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoClassArray.length > 0" label="二级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="twoFormInline.id" placeholder="请选择" @change="twoClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in twoClassArray" :key="index"></el-option>
            <!-- <el-option label="区域一" value="shanghai"></el-option> -->
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item v-if="threeClassArray.length > 0" label="三级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="threeFormInline.id" placeholder="请选择" @change="threeClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in threeClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:10px 0 50px 300px;">
        <el-button type="info" disabled>智能检测（暂缓）</el-button>
        <form name="myform" style="display:inline-block;"
          :action="uploadUrl()"
          method="post">
          <input v-show="false" v-for="(item,index) in getCheckedIds" :key="index" style="visiable:hidden;" type="text" name="ids" :value ="item">
          <el-button style="height:40px;background:#C8C9CC;border-radius:3px;" @click="daochu" type="button">批量导出</el-button>
        </form>
        <!-- <el-button type="info"  @click="daochu" disabled>提取类目标签（暂缓）</el-button> -->
        <!-- <el-button type="info" @click="batchExport">批量导出</el-button> -->
        <el-button type="info" disabled>提取类目标签（暂缓）</el-button>
      </div>
    </div>
    <div class="shopLine"></div>
    <div class="shopTableList">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="categoryNameOne"
          label="一级类目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="categoryNameTwo"
          label="二级类目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="categoryNameThree"
          label="三级类目名称">
        </el-table-column>
        <el-table-column
          prop="oneAttr"
          label="一级属性">
        </el-table-column>
        <el-table-column
          prop="twoAttr"
          label="二级属性">
        </el-table-column>
        <el-table-column
          prop="threeAttr"
          label="三级属性">
        </el-table-column>
        <!-- <el-table-column
          prop="attributeList"
          :formatter="attributeFormatter"
          label="属性列表">
        </el-table-column> -->
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="formInline.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// =============================================================新增===========文件导出
import { shopClassOption, shopClassList, shopLabelBatchExport, getListSearch} from '@/api/label/shopLabelList/shopLabelManage'
import { shopManageExcel } from '@/api/commUrl'
  export default{
    data(){
      return{
        getChecked: [],
        getCheckedIds: [],
        totalPage: '',
        optionClassObj: {},
        formInline: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        defaultForm: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        oneFormInline: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        twoFormInline: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        threeFormInline: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        oneClassArray: [
          {label: '小明', value: 'xiaoming'}
        ],
        twoClassArray: [], // 二级分类
        threeClassArray: [], // 三级分类
        tableData: [{
          attributeList: [],
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{
    // 文件导出获取地址
    uploadUrl() {
      return shopManageExcel
    },
    daochu() {
      if (this.getChecked.length <= 0) {
        this.$message.info('请选择导出项')
      } else {
        document.myform.submit();
      }
      console.log('mgkldj')
    },
      // 勾选框选中事件
    handleSelectionChange(val) {
      this.getChecked = val
      this.getCheckedIds = []
      this.getChecked.forEach(ele => {
        this.getCheckedIds.push(ele.id)
      })
      console.log(this.getChecked)
      console.log(this.getCheckedIds)
    },
      // table数据格式化
    attributeFormatter (row,column) {
      var str = ''
      row.attributeList.forEach(ele => {
        // if (!str) {
        //   str = ele + ','
        // }
        str = str + '    ' + ele
      });
      return str
    },
      // 点击批量导出事件
    batchExport () {
      // window.location.href = 'fwas-label-admin/categoryLabel/categoryExportExcel'
      // var obj = {}

      shopLabelBatchExport(this.getCheckedIds)
      .then(res => {
        this.$message.success('成功导出')
      })
      .catch(() => {
        this.$message.error('导出失败')
      })
      console.log('导出')
    },
    getList() {
      getListSearch()
      .then(res => {

      })
    },
    // option one值变化的事件
    oneClassChange () {
      if (!this.oneFormInline.id) {
        this.twoClassArray = []
        this.threeClassArray = []
        // this.formInline.code = ''
        this.formInline.level = ''
        this.formInline.id = ''
      } else {
        this.threeClassArray = []
        this.formInline.id = this.oneFormInline.id
        this.formInline.level = '1'
        this.optionClassObj.level = '2'
        this.optionClassObj.id = this.oneFormInline.id
        this.twoFormInline = {}
        this.threeFormInline = {}
        this.getOptions(this.optionClassObj)
        console.log('获取二级分类名称成功')
      }
    },
    // option two值变化的事件
    twoClassChange () {
      if (!this.twoFormInline.id) {
          this.threeClassArray = []
          this.formInline.code = this.oneFormInline.pId
          this.formInline.level = '1'
          this.formInline.id = this.oneFormInline.id
      } else {
        this.formInline.id = this.twoFormInline.id
        this.formInline.level = '2'
        this.optionClassObj.level = '3'
        this.optionClassObj.id = this.twoFormInline.id
        this.threeFormInline = {}
        this.getOptions(this.optionClassObj)
        console.log('获取三级分类名称成功')
      }
    },
    // option three值变化的事件
    threeClassChange () {
      if (!this.threeFormInline.id) {
        this.formInline.code = this.twoFormInline.pId
        this.formInline.level = '2'
        this.formInline.id = this.twoFormInline.id
      } else {
        this.formInline.id = this.threeFormInline.id
        this.formInline.level = '3'
        this.optionClassObj.level = '3'
        this.optionClassObj.id = this.threeFormInline.id

      }
    },
    // 查询分类下拉列表-接口
      getOptions (data) {
        var _this = this
        shopClassOption(data)
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
      // 查询table-接口
      getData (data) {
        var _this = this
        shopClassList(data)
        .then(res=> {
          console.log(res)
          _this.tableData = res.data
          for (let i = 0; i <  _this.tableData.length; i++) {
            _this.tableData[i].oneAttr = [];
            _this.tableData[i].twoAttr = [];
            _this.tableData[i].threeAttr = [];
          }
          for (let i = 0; i < _this.tableData.length; i++) {
            for (let j = 0; j < _this.tableData[i].brands.length; j++) {
              _this.tableData[i].oneAttr.push(_this.tableData[i].brands[j].brandName)
            }
            for (let j = 0; j < _this.tableData[i].propertys.length; j++) {
              _this.tableData[i].twoAttr.push(_this.tableData[i].propertys[j].propertyName)
            }
            for (let j = 0; j < _this.tableData[i].spec.length; j++) {
              _this.tableData[i].threeAttr.push(_this.tableData[i].spec[j].specName)
            }
          }
          _this.totalPage = Number(res.totalSize)
          _this.$message({
            message: '查询成功!',
            type: 'success'
          })
        })
        .catch(() => {
          _this.$message({
            message: '查询失败!',
            type: 'error'
          })
        })
      },
      handleClick(row) {
        console.log(row)
      // this.$store.commit('setDetailShopAttribute', row)
        this.$router.push(`/label/shopLabelManage/shopClassList/${row.id}`)
      },
      // 点击查询事件
      onSubmit() {
        this.getData(this.formInline)
        console.log(this.formInline)
      },
      // 重置
      reset() {
        this.oneFormInline.id = ''
        this.twoFormInline.id = ''
        this.twoClassArray.length = 0
        this.threeClassArray.length = 0
        this.formInline.level = ''
        this.$message.success('重置成功')
      },
      handleSizeChange(val) {
        this.formInline.pageSize = val
        this.getData(this.formInline)
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.formInline.pageIndex = val
        this.getData(this.formInline)
        console.log(`当前页: ${val}`)
      }
    },
    mounted () {
//       id	投诉单ID
// level	处理人
// pageIndex	当前页
// pageSize	当前页数
      this.optionClassObj.id = ''
      this.optionClassObj.level = '1'
      this.getOptions(this.optionClassObj) // 调取获得类目接口
      this.getData(this.defaultForm) // 调取table接口
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
      text-align:center;
      margin-top:20px;
    }
  }
</style>
