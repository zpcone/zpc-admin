<template>
  <div class="shopLabel">
    <div class="shopLabelHead">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding:50px 0 0 20px">
        <el-form-item  v-if="oneClassArray.length > 0" label="一级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="oneFormInline.id" placeholder="请选择" @change="oneClassChange(data)">
            <el-option  :label="item.categoryName" :value="item.id" v-for="(item, index) in oneClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-if="twoClassArray.length > 0" label="二级类目名称" style="margin-right:20px;">
          <el-select clearable v-model="twoFormInline.id" placeholder="请选择" @change="twoClassChange(data)">
            <el-option :label="item.categoryName" :value="item.id" v-for="(item, index) in twoClassArray" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-if="threeClassArray.length > 0" label="三级类目名称" style="margin-right:20px;">
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
        <!-- <el-button type="info" disabled>设为一级类目属性</el-button>
        <el-button type="info" disabled>设为二级类目属性</el-button>
        <el-button type="info" disabled>设为三级类目属性</el-button> -->
        <el-button type="primary" @click="setMirrow">设为滤镜</el-button>
        <el-button type="primary" @click="cancelMirrow">取消滤镜</el-button>
        <el-button type="primary" @click="lookAddAttr">查看已添加属性</el-button>
      </div>
    </div>
    <div class="shopLine"></div>
    <div class="shopTableList">
      <el-table
        @cell-dblclick="cellClick"
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="categoryOne"
          label="一级类目名称">
        </el-table-column>
        <el-table-column
          prop="categoryTwo"
          label="二级类目名称">
        </el-table-column>
        <el-table-column
          prop="categoryThree"
          label="三级类目名称">
        </el-table-column>
        <el-table-column
          prop="propertyName"
          label="属性名称">
        </el-table-column>
        <el-table-column
          prop="hierarchy"
          label="所属层级">
        </el-table-column>
        <el-table-column
          prop="isFlag"
          :formatter="isOrFilter"
          label="是否滤镜">
        </el-table-column>
        <el-table-column
          :key = index
          prop="oneAttribute"
          label="属性值">
        </el-table-column>
        <el-table-column
          :key = index
          prop="twoAttribute"
          label="属性值">
        </el-table-column>
        <el-table-column
          :key = index
          prop="threeAttribute"
          label="属性值">
        </el-table-column>
        <el-table-column
          :key = index
          prop="fourAttribute"
          label="属性值">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看,添加属性</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <span style="padding:20px; display:inline-block;float:left;color:red;">提示：双击单元格添加到查询列表</span> -->
    </div>
    <el-dialog title="查询列表" :visible.sync="cellVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select
            v-model="selectForm"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择查询字段">
            <el-option
              v-for="(item, index) in getAllChecked"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="已添加属性">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="searchDia">查询</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </div>
    </el-dialog>
    <!-- 设为滤镜 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <p style="text-align:center;">
        <span>设为滤镜？</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSetFilter">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看更多属性弹出框 -->
    <el-dialog
      title="查看，添加属性（点击按钮添加）"
      :visible.sync="moreProp"
      width="600px"
      :before-close="handleClose">
      <p style="text-align:center;font-size:16px;font-weight:bold;">
        <span>属性名称：{{showAttribute.propertyName}} ,</span>
        <span>共查到{{showAttribute.propertyValues.length}}个属性值</span>
      </p>
      <div>
        <el-button @click="clickAttrBtn" style="margin:10px;" v-for="(item,index) in (showAttribute.propertyValues)" :key="index" type="info" plain>{{item}}</el-button>
      </div>
      <div style="border-bottom:1px dotted gray;">
      </div>
      <div>
        <el-button @click="cancelClickAttrBtn" style="margin:10px;" v-for="(item,index) in getCheckedAttr" :key="index" type="info" plain>{{item}}</el-button>
      </div>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="moreProp = false">取 消</el-button>
        <el-button type="primary" @click="saveSelectedAddAttr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 取消滤镜 -->
    <el-dialog
      title="提示"
      :visible.sync="cancelMirrowFilter"
      width="30%"
      center>
      <p style="text-align:center;">
        <span>取消滤镜？</span>
        </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelMirrowFilter = false">取 消</el-button>
        <el-button type="primary" @click="saveCancelFilter">确 定</el-button>
      </span>
    </el-dialog>
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
// =======================================================设为滤镜
import { shopClassOption, shopClassList, getListSearch, setToFiletr} from '@/api/label/shopLabelList/shopLabelManage'
  export default{
    data(){
      return{
        // getAllChecked: [],
        showAttribute: {
          propertyValues: []
        },
        getChecked: [],
        getCheckedAttr: [],
        moreProp: false, // 更多属性弹出框
        cancelMirrowFilter: false, // 取消滤镜弹框
        centerDialogVisible: false, // 设为滤镜弹框
        selectMirror: [],
        totalPage: '',
        optionClassObj: {},
        selectForm: [],
        getAllChecked: [],
        cellVisible: false, // 点击表格显示的内容
        formLabelWidth: '120px',
        currentPage4: '1',
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
          // nameOne: '数码相机',
          // nameTwo: '数码相机1',
          // nameThe: '数码相机2'
        }]
      }
    },
    methods:{
      saveSelectedAddAttr() {
        var count1 = this.getAllChecked.length
        var count2 = this.getCheckedAttr.length
        var totalCount = count1 + count2
        if (Number(totalCount) > 10) {
          this.$message.info('属性添加上限是10,已达上限,请重新添加。')
          return
        }
        this.getCheckedAttr.forEach(ele => {
          this.getAllChecked.push(ele)
        })
        // 保存数据到vuex中
        this.moreProp = false
      },
      cancelClickAttrBtn(event) {
        var canceled = event.target.innerText
        var index = this.getCheckedAttr.indexOf(canceled)
        this.getCheckedAttr.splice(index, 1)
      },
      clickAttrBtn(event) {
        var geted = event.target.innerText
        if (this.getCheckedAttr.includes(geted)) {
          return
        }
        this.getCheckedAttr.push(geted)
      },
      lookAddAttr() {
        this.cellVisible = true
      },
      // 点击重置事件
      reset() {
        this.oneFormInline.id = ''
        this.twoFormInline.id = ''
        this.twoClassArray.length = 0
        this.threeClassArray.length = 0
        // this.formInline.code = ''
        this.formInline.level = ''
        this.$message.info('重置成功')
      },
      // cancel滤镜
      saveCancelFilter() {
        var obj = {}
        obj.showFlag = '2'
        obj.ids  = this.selectMirror
        setToFiletr(obj)
        .then(res => {
          this.cancelMirrowFilter = false
          this.$message.success('设置滤镜成功')
          this.getData(this.formInline)
        })
        .catch(() => {
          this.$message.error('设置滤镜失败')
        })
      },
      // 确定设为滤镜
      saveSetFilter() {
        var obj = {}
        obj.showFlag = '1'
        obj.ids  = this.selectMirror
        setToFiletr(obj)
        .then(res => {
          this.centerDialogVisible = false
          this.$message.success('设置滤镜成功')
          this.getData(this.formInline)
        })
        .catch(() => {
          this.$message.error('设置滤镜失败')
        })
      },

      // checkBox选中
      handleSelectionChange(val) {
        this.getChecked = val
        this.selectMirror = []
        val.forEach(ele => {
          this.selectMirror.push(ele.id)
        });
        // this.selectMirror = val
        console.log(this.selectMirror)
      },
      // 设为滤镜接口
      setMirrow() {
        if (this.getChecked.length > 0) {
          var status = false
          this.getChecked.forEach(el => {
            if (el.isFlag == 1) {
              status = true
            }
          })
          if(status) {
            this.$message.info('选项已有滤镜项,请重新选择。')
            return
          } else {
            this.centerDialogVisible = true
          }
        } else {
          this.$message.info('请选择项目')
          return
        }
      },
      // 取消滤镜
      cancelMirrow() {
        if (this.getChecked.length > 0) {
          var status = false
          this.getChecked.forEach(ele => {
            if (ele.isFlag == 2) {
              status = true
            }
          })
          if (status) {
            this.$message.info('选项已有非滤镜项,请重新选择。')
            return
          } else {
            this.cancelMirrowFilter = true
          }
        } else {
          this.$message.info('请选择项目')
          return
        }
      },
      // table数据格式hua
      isOrFilter(row, column) {
        if (row.isFlag == '1') {
          return '是'
        } else if (row.isFlag == '2') {
          return '否'
        }
      },
      // select选中事件
      // option one值变化的事件
      oneClassChange () {
        if (!this.oneFormInline.id) {
          this.twoClassArray = []
          this.threeClassArray = []
          this.formInline.level = ''
          this.formInline.id = ''
        } else {
          this.formInline.id = this.oneFormInline.id
          this.formInline.level = '1'
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
      // 查询table数据-接口
      getData (data) {
        var _this = this
        getListSearch(data)
        .then(res=> {
          this.totalPage = Number(res.totalSize)
          this.tableData = res.data
          this.tableData.forEach(ele => {
            ele.oneAttribute = ele.propertyValues[0]
            ele.twoAttribute = ele.propertyValues[1]
            ele.threeAttribute = ele.propertyValues[2]
            ele.fourAttribute = ele.propertyValues[3]
          });
          // _this.tableData = res.data
          // for (let i = 0; i < _this.tableData.length; i++) {
          //   _this.tableData[i].attributeList = [];
          //   for (let j = 0; j < _this.tableData[i].brands.length; j++) {
          //     _this.tableData[i].attributeList.push(_this.tableData[i].brands[j].brandName)
          //   }
          //   for (let j = 0; j < _this.tableData[i].propertys.length; j++) {
          //     _this.tableData[i].attributeList.push(_this.tableData[i].propertys[j].propertyName)
          //   }
          //   for (let j = 0; j < _this.tableData[i].spec.length; j++) {
          //     _this.tableData[i].attributeList.push(_this.tableData[i].spec[j].specName)
          //   }
            // console.log(tableData[i])
          // }
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
      // 点击查询事件
      onSubmit() {
        this.getData(this.formInline)
        console.log(this.formInline)
      },
      // 重置弹出框的查询内容
      resetSearch () {
      //this.getAllChecked = []  //重置后下拉列表不清空，所以注掉了  2018.6.8 xiu
        this.selectForm = []
      },
      // 弹出框内部查询按钮
      searchDia () {
        this.$store.commit('setShopAddAllAttr',  this.selectForm)
        this.cellVisible = false
        this.$router.push('/label/shopLabelManage/shopList')
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
      },
      handleClick(row) {
        // if (row.propertyValues.length <= 4) {
        //   this.$message.info('没有更多属性')
        //   return
        // }
        this.getCheckedAttr = []
        this.showAttribute = row
        this.moreProp = true
        console.log(row)
      }

    },
    mounted () {
      // var rou = this.$route.params
      // // this.$store.commit('set',id)
      // var attributeDetail = this.$store.state.shopAttribute
      // console.log(attributeDetail)
      // this.tableData = attributeDetail
      var id = this.$route.params.id

      // console.log(id)
      this.optionClassObj.id = ''
      this.optionClassObj.level = '1'
      this.defaultForm.id = id
      this.defaultForm.level = '3'
      var status = isNaN(id)
      // 数字为true num为false
      console.log(status)
      if (status) {
        this.formInline.id = ''
        this.formInline.level = ''
        this.getData(this.formInline)
      } else {
        this.formInline.id = id
        this.formInline.level = '3'
        this.getData(this.formInline)
      }
      // if (id) {
      //   this.getData(this.defaultForm)
      // } else {
      //   this.getData(this.formInline)
      // }
      this.getOptions(this.optionClassObj) // 调取获得类目接口
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
