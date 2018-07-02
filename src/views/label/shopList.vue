<template>
  <div class="shopLabel">
    <div class="shopLabelHead">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:50px 0 0 20px">
        <el-form-item label="一级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="oneFormInline.id" placeholder="请选择" @change="oneClassChange(data)">
            <el-option  :label="item.categoryName" :value="item.id" v-for="(item, index) in oneClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoClassArray.length > 0" label="二级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="twoFormInline.id" placeholder="请选择" @change="twoClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in twoClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="threeClassArray.length > 0" label="三级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="threeFormInline.id" placeholder="请选择" @change="threeClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in threeClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
         <!-- <br> -->
        <el-form-item label="商品SKUID：">
          <el-input clearable v-model="form.skuId" placeholder="请输入商品SKUID"></el-input>
        </el-form-item>
        <el-form-item label="商品SPUID：">
          <el-input  clearable v-model="form.spuId" placeholder="请输入商品SPU"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input clearable v-model="form.sproductName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品属性值：">
          <el-input
            resize = none
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.propertys">
        </el-input>
        </el-form-item>
      </el-form>
      <div style="padding:10px 0 50px 300px;">
        <el-button type="info" @click="searchSku">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
        <el-button disabled type="info">高级查询</el-button>
      </div>
    </div>
    <div class="shopLine"></div>
    <div style="text-align:center;font-weight:bold;margin-top:20px;">
      <span>查询结果:共找到{{totalPage}}个商品</span>
    </div>
    <div class="shopTableList">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="skuId"
          label="商品SKUID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="spuId"
          label="商品SPUID">
        </el-table-column>
        <el-table-column
          prop="categoryNameOne"
          label="所属一级类目">
        </el-table-column>
        <el-table-column
          prop="categoryNameTwo"
          label="所属二级类目">
        </el-table-column>
        <el-table-column
          prop="categoryNameThree"
          label="所属三级类目">
        </el-table-column>
        <el-table-column
          prop="strAttribute"
          label="商品属性列表">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button> -->
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
// ======商品列表查询======sku查询===
import {shopListSearch, shopListSku,shopClassOption, shopClassList} from '@/api/label/shopLabelList/shopLabelManage'
  export default{
    data() {
      return{
        totalPage: '',
        optionClassObj: {},
        form: {
          id: '',	// 属性Id集合
          level: '',	// 深度
          skuId: '',	// 类目Id
          spuId: '',	// 品牌Id
          propertys: '',	// 属性字符串
          sproductName: '', // 商品名称
          pageIndex: '1',	// 当前页
          pageSize: '5' //  	页数
        },
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
        oneClassArray: [
          {label: '小明', value: 'xiaoming'}
        ],
        twoClassArray: [], // 二级分类
        threeClassArray: [], // 三级分类
        threeFormInline: {
          id: '', // 投诉单id
          level: '', //
          pageIndex: '1', // 当前页
          pageSize: '5' // 当前页数
        },
        tableData: [{
          attributeList: [],
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods:{
      // 重置事件
      reset() {
        this.form.id = ''
        this.form.level = ''
        this.form.skuId = ''
        this.form.spuId = ''
        this.form.propertys = ''
        this.form.sproductName = ''
        this.twoClassArray = []
        this.threeClassArray = []
        this.oneFormInline = {}
        this.twoFormInline = {}
        this.threeFormInline = {}
        this.$message.success('重置成功')
      },
      // table格式化
      attributeListFormatter(row, column) {
        var str = ''
        row.attributeList.forEach(ele => {
          str =  str +"," + ele
        });
        if (str.substr(0,1)==','){
          s = str.substr(1)
          return s
        }
      },
      // option one值变化的事件
      oneClassChange () {
        if (!this.oneFormInline.id) {
          this.twoClassArray = []
          this.threeClassArray = []
          this.twoFormInline = {}
          // this.form.code = ''
          this.form.level = ''
          this.form.id = ''
        } else {
          this.formInline.id = this.oneFormInline.id
          this.formInline.level = '1'
          this.form.id = this.oneFormInline.id
          this.form.level = '1'
          this.optionClassObj.level = '2'
          this.optionClassObj.id = this.oneFormInline.id
          this.twoFormInline = {}
          this.getOptions(this.optionClassObj)
          console.log('获取二级分类名称成功')
        }
      },
      // option two值变化的事件
      twoClassChange () {
        if (!this.twoFormInline.id) {
          this.threeClassArray = []
          this.threeFormInline = {}
          this.form.level = '1'
          this.form.id = this.oneFormInline.id
        } else {
          this.formInline.id = this.twoFormInline.id
          this.formInline.level = '2'
          this.form.id = this.twoFormInline.id
          this.form.level = '2'
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
          // this.threeClassArray = []
          this.threeFormInline = {}
          this.form.level = '2'
          this.form.id = this.twoFormInline.id
        } else {
          this.formInline.id = this.threeFormInline.id
          this.formInline.level = '3'
          this.form.id = this.threeFormInline.id
          this.form.level = '3'
          this.optionClassObj.level = '3'
          this.optionClassObj.id = this.threeFormInline.id
          // this.threeFormInline = {}
        }
      },
      // 查询table事件
      searchSku() {
        var _this = this
        this.form.propertys = this.form.propertys.toString()
        shopListSku(this.form)
        .then(res => {
          this.totalPage = Number(res.totalSize)
          _this.tableData = res.data
          for (let i = 0; i < _this.tableData.length; i++) {
              var str = '品牌'
              str = str + _this.tableData[i].brandName
            // _this.tableData[i].attributeList = [];
            // for (let j = 0; j < _this.tableData[i].brands.length; j++) {
            //   _this.tableData[i].attributeList.push(_this.tableData[i].brands[j].brandName)
            // }
            for (let j = 0; j < _this.tableData[i].propertyValues.length; j++) {
              str = str +   _this.tableData[i].propertyValues[j].propertyName +  _this.tableData[i].propertyValues[j].propertyValueName
              // _this.tableData[i].attributeList.push(_this.tableData[i].propertyValues[j].propertyName)
            }
            for (let j = 0; j < _this.tableData[i].specValues.length; j++) {
              str = str + _this.tableData[i].specValues[j].specName + _this.tableData[i].specValues[j].specValueName
              // _this.tableData[i].attributeList.push(_this.tableData[i].specValues[j].specName)
            }
            _this.tableData[i].strAttribute = str
            _this.$message.success('查询成功')
          }
        })
        .catch(() => {
          this.$message.error('查询失败')
        })
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
      // 查询分类下拉列表-接口
      getData () {
        var obj = {}
        obj.id = ''
        obj.level = '1'
        shopClassList(obj)
        .then(res=> {

        })
        .catch(() => {

        })
      },
      handleClick(row) {
        console.log(row)
        this.$router.push('/label/shopLabelManage/shopDetail')
      },
      handleSizeChange(val) {
        this.form.pageSize = val
        this.searchSku()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.form.pageIndex = val
        this.searchSku()
        console.log(`当前页: ${val}`)
      }
    },
    mounted () {
      var getAttr = this.$store.state.shopAddAllAttr
      var newArr = new Set()
      getAttr.forEach( x => newArr.add(x))
      this.form.propertys = Array.from(newArr)
      console.log(newArr)
      this.searchSku(this.form) // 初始化table
      this.optionClassObj.id = ''
      this.optionClassObj.level = '1'
      this.getOptions(this.optionClassObj) // 调取获得类目接口
      // this.getData(this.defaultForm) // 调取table接口
      // this.getOptions(this.form)
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
