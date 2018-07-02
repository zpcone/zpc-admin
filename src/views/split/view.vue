<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item prop="ruleName" label="规则名称" required>
          <el-input v-model="form.ruleName" style="max-width: 400px;" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="ruleChannel" label="渠道类型：">
          <el-select v-model="form.ruleChannel" disabled placeholder="请选择">
            <el-option
              v-for="item in channels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="ruleType" label="规则类型：">
          <el-select v-model="form.ruleType" disabled placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="ruleDesc" label="规则简介：">
          <el-input v-model="form.ruleDesc" style="max-width: 400px;" type="textarea" :rows="5" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="" label="商品规则分账配置：">
          <div class="mb20">
            <el-button type="primary" icon="el-icon-plus" @click.native="addpersonShow = true">添加补贴人</el-button>
          </div>
          <div class="mb20">
            <el-table :data="productConfigList" border stripe style="width: 100%" v-if="form.ruleType === '1'">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="roleCode" label="ID"></el-table-column>
              <el-table-column prop="roleName" label="名称"></el-table-column>
              <el-table-column prop="accountPercent" label="分账比例">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.accountPercent" type="number" size="mini" style="width: 150px;" placeholder=""></el-input>
                  <span>%</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="circleConfigList" border stripe style="width: 100%" v-if="form.ruleType === '2'">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="roleCode" label="ID"></el-table-column>
              <el-table-column prop="roleName" label="名称"></el-table-column>
              <el-table-column prop="accountPercent" label="分账比例">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.accountPercent" type="number" size="mini" style="width: 150px;" placeholder=""></el-input>
                  <span>%</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="lightConfigList" border stripe style="width: 100%" v-if="form.ruleType === '3' || form.ruleType === '许愿灯'">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="roleCode" label="ID"></el-table-column>
              <el-table-column prop="roleName" label="名称"></el-table-column>
              <el-table-column prop="accountPercent" label="分账比例">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.accountPercent" type="number" size="mini" style="width: 150px;" placeholder=""></el-input>
                  <span>%</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mb20">
            <el-row>
              <el-col :span="4">
                <p>合计：{{accountPercentAll}}</p>
              </el-col>
              <el-col :span="4">
                <p style="color: #999;">最高100</p>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item v-if="form.ruleType != '许愿灯'" prop="" label="匹配范围：">
          <div class="mb20">
            <el-radio-group v-model="matchRange" @change="rangeMatch">
              <el-radio-button label="1">全部商品</el-radio-button>
              <el-radio-button label="2">匹配供应商</el-radio-button>
              <el-radio-button label="3">匹配商品</el-radio-button>
            </el-radio-group>
          </div>
          <div class="mb20" v-if="matchRange === '2'">
          	<p class="mb20">
          	  <span style="margin-right: 30px;color: #666;">供应商列表</span>
          	  <el-button type="primary" icon="el-icon-plus" @click="addProduct('1')">添加供应商</el-button>
          	  <el-button type="danger" icon="el-icon-delete" @click="delData('1')">删除供应商</el-button>
          	</p>
            <div class="mb20">
            	<el-table :data="supplyData" ref="multipleTable" border stripe style="width: 100%" @selection-change="selectChangeSupplier">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="matchObjectId" label="供应商id"></el-table-column>
                <el-table-column prop="matchObjectName" label="供应商名称"></el-table-column>
              </el-table>
            </div>
            <!-- <div class="m20 center">
              <el-pagination
                :current-page.sync="form.pageNumber"
                :page-size="form.pageSize"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div> -->
          </div>
          <div class="mb20" v-if="matchRange === '3'">
            <p class="mb20">
              <span style="margin-right: 30px;color: #666;">商品列表</span>
              <el-button type="primary" icon="el-icon-plus" @click="addProduct('2')">添加商品</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="delData('2')">删除商品</el-button>
            </p>
            <div class="mb20">
              <el-table :data="productData" ref="multipleTable" border stripe style="width: 100%" @selection-change="selectChangeProduct">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="matchObjectId" label="商品ID"></el-table-column>
                <el-table-column prop="matchObjectName" label="商品名称"></el-table-column>
              </el-table>
            </div>
            <!-- <div class="m20 center">
              <el-pagination
                :current-page.sync="form.pageNumber"
                :page-size="form.pageSize"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div> -->
          </div>
        </el-form-item>
        <el-form-item prop="" label="">
          <el-button @click="$router.go(-1)">返回列表</el-button>
          <el-button type="success" @click="comfirm">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加补贴人 -->
    <el-dialog
      :title="title"
      :visible.sync="addpersonShow">
      <add-person @cancel="addPersonCancel" @confirm="addPersonConfirm"></add-person>
    </el-dialog>
    <!--查询商品或供应商的对话框-->
    <el-dialog
      :title="title"
      :visible.sync="dlsgShow"
      width="30%">
      <dlsg :dlsgType="dlsgType" @cancel="dlsgCancel" @confirm="dlsgConfirm"></dlsg>
    </el-dialog>
    <!-- <dlsg :show="dlsgShow" :dlsgType="dlsgType" @cancel="dlsgCancel" @confirm="dlsgConfirm"></dlsg>
    <add-person :show="addpersonShow" @cancel="addPersonCancel" @confirm="addPersonConfirm"></add-person> -->
  </section>
</template>

<script>
let configAllIsChecked = true // 分账比例之和是否验证不得超过100
import {
  getDetail,
  editRule
} from '@/api/split'
import { editLight, getLightDetail } from '@/api/splitLight'

import dlsg from './dlsg.vue'
import addPerson from './addPerson.vue'
export default {
  components: {
    dlsg,
    addPerson
  },
  computed: {
    accountPercentAll() {
      let num = 0
      if (this.form.ruleType === '1') {
        for (let i = 0; i < this.productConfigList.length; i++) {
          if (this.productConfigList[i].accountPercent) {
            num += parseInt(this.productConfigList[i].accountPercent)
          }
        }
      } else if (this.form.ruleType === '2') {
        for (let i = 0; i < this.circleConfigList.length; i++) {
          if (this.circleConfigList[i].accountPercent) {
            num += parseInt(this.circleConfigList[i].accountPercent)
          }
        }
      } else if (this.form.ruleType === '3' || this.form.ruleType === '许愿灯') {
        for (let i = 0; i < this.lightConfigList.length; i++) {
          if (this.lightConfigList[i].accountPercent) {
            num += parseInt(this.lightConfigList[i].accountPercent)
          }
        }
      }
      if (num > 100) {
        configAllIsChecked = false
        this.$message.error('分账比例之和不得超过100%')
      } else {
        configAllIsChecked = true
      }
      return num
    }
  },
  data() {
    return {
      form: {
        ruleType: '1',
        configList: [
          {
            subsidyType: '4',
            roleCode: '',
            roleName: '',
            accountPercent: ''
          }
        ]
      },
      productConfigList: [
        { subsidyType: '4', roleCode: 'ptzh', roleName: 'ptzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'sbu', roleName: 'SBU', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'dz', roleName: 'dz', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'lyd', roleName: 'lyd', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'qzh', roleName: 'qzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'qzhh', roleName: 'qzhh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'gmr', roleName: 'gmr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'fxr', roleName: 'fxr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'fxtjr', roleName: 'fxtjr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'dzhtjr', roleName: 'dzhtjr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'dlqzh', roleName: 'dlqzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'dlqzhh', roleName: 'dlqzhh', accountPercent: 0 }
      ],
      circleConfigList: [
        { subsidyType: '4', roleCode: 'ptzh', roleName: 'ptzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: '卖出人', roleName: '卖出人', accountPercent: 0 },
        { subsidyType: '4', roleCode: '圈账户', roleName: '圈账户', accountPercent: 0 }
      ],
      lightConfigList: [
        { subsidyType: '4', roleCode: 'ptzh', roleName: 'ptzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'fdqzh', roleName: 'fdqzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'fdqzhh', roleName: 'ddqzh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'ddqzh', roleName: 'qzhh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'ddqzhh', roleName: 'ddqzhh', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'tdr', roleName: 'tdr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'ddr', roleName: 'ddr', accountPercent: 0 },
        { subsidyType: '4', roleCode: 'ddtjr', roleName: 'ddtjr', accountPercent: 0 }
      ],
      matchRange: '1',
      channels: [{ label: '社交', value: '2' }, { label: '电商', value: '1' }],
      types: [{ label: '商品', value: '1' }, { label: '圈交易', value: '2' }, { label: '许愿灯', value: '3' }],
      supplyData: [],
      productData: [],
      query: {},
      dlsgShow: false,
      dlsgType: '',
      addpersonShow: false,
      selectSupply: [],
      selectProduct: []
    }
  },
  methods: {
    dlsgCancel() {
      this.dlsgShow = false
    },
    dlsgConfirm(data) {
      console.log(data)
      if (data.type === 2) {
        // 添加供应商
        if (data.data.length) {
          for (const i of data.data) {
            this.supplyData.push({
              matchObjectName: i.supplierName,
              matchObjectId: i.supplierId,
              matchRange: '2',
              supplierName: i.supplierName,
              supplierId: i.supplierId
            })
          }
        }
      } else {
        if (data.data.length) {
          this.productData = this.productData.concat(data.data)
        }
      }
      this.dlsgShow = false
    },
    // 添加供应商或商品
    addProduct(flag) {
      // if () {

      // }
      if (flag === '1') {
        this.dlsgType = 'supply'
      } else if (flag === '2') {
        this.dlsgType = 'product'
      } else {
        this.dlsgType = ''
      }
      this.dlsgShow = true
    },
    // 获取页面详情
    handleQuery() {
      this.query = this.$router.currentRoute.query
      console.log(this.query)
      if (this.query.id && this.query.ruleType) {
        if (this.query.ruleType === '许愿灯') {
          getLightDetail(this.query).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.form = res.data.data
              this.form.ruleChannel = this.form.channelId
              this.form.ruleType = this.query.ruleType
              this.form.ruleDesc = this.form.ruleIntroduction
              this.lightConfigList = this.form.list
            } else {
              this.$message({
                type: 'error',
                message: res.errorMsg
              })
            }
          })
        } else {
          getDetail(this.query).then(res => {
            if (res.status === 200) {
              this.form = res.data.data
              console.log(res)
              if (this.form.ruleType === 2) {
                // 圈交易
                this.matchRange = this.form.matchRange
                this.circleConfigList = this.form.accountConfigList
                // 判断匹配商品和供应商
                if (this.form.matchRange === '3') {
                  this.productData = this.form.accountRangeList
                } else {
                  this.supplyData = this.form.accountRangeList
                }
              } else {
                // 商品购买
                this.matchRange = this.form.matchRange
                this.productConfigList = this.form.accountConfigList
                if (this.form.matchRange === '3') {
                  this.productData = this.form.accountRangeList
                } else {
                  this.supplyData = this.form.accountRangeList
                }
              }
            } else {
              this.$message({
                type: 'error',
                message: res.errorMsg
              })
            }
          })
        }
      } else {
        this.$router.go(-1)
      }
    },
    // 选中供应商列表
    selectChangeSupplier(val) {
      this.selectSupply = val
    },
    // 选中商品列表
    selectChangeProduct(val) {
      this.selectProduct = val
    },
    // 删除
    delData(flag, index) {
      if (flag === '1') {
        if (this.selectSupply.length === 0) {
          this.$message.warning('请选中供应商')
        } else {
          console.log(this.selectSupply)
          this.supplyData.splice(index, 1)
          this.selectSupply = []
          this.$refs.multipleTable.clearSelection()
        }
        return
      }
      if (flag === '2') {
        if (this.selectProduct.length > 0) {
          this.productData.splice(index, 1)
          this.selectProduct = []
          this.$refs.multipleTable.clearSelection()
          console.log(this.selectProduct)
        } else {
          this.$message.warning('请选中商品')
        }
      }
    },
    // 确认新增
    comfirm() {
      if (this.query.id && this.query.ruleType) {
        if (this.query.ruleType === '许愿灯') {
          console.log(this.form)
          this.form.ruleIntroduction = this.form.ruleDesc
          this.form.list = this.lightConfigList
          editLight(this.form).then(res => {
            console.log(res)
            if (res) {
              this.$router.go(-1)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.form.configList = this.productConfigList
          this.form.matchRange = this.matchRange
          console.log(this.matchRange)
          if (this.matchRange === '1') {
            this.form.rangeList = []
          } else if (this.matchRange === '2') {
            this.form.rangeList = this.selectSupply
            console.log(this.form.rangeList)
          } else {
            this.form.rangeList = this.selectProduct
          }
          editRule(this.form).then(res => {
            if (res.status === 200) {
              this.$router.push({ path: '/split/index' })
            } else {
              this.$message({
                type: 'warning',
                message: res.errorMsg
              })
            }
          })
        }
      } else {
        this.$router.go(-1)
      }
    },
    // TODO
    addPersonCancel() {
      this.addpersonShow = false
    },
    addPersonConfirm(data) {
      // 把人加进配置中
      for (let i = 0; i < data.length; i++) {
        data[i].roleCode = data[i].mId
        data[i].roleName = data[i].mId
      }
      if (this.form.ruleType === 2) {
        this.circleConfigList.concat(data)
      } else {
        this.productConfigList.push(data[0])
      }
      this.addpersonShow = false
    }
  },
  created() {
    this.handleQuery()
  }
}
</script>

<style scoped lang="scss">
</style>
