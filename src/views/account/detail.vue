<template>
  <section>
    <div class="search">
      <el-form ref="form" :model="form" label-width="140px"
        style="background: #f1f1f1;padding: 20px 0;">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="created" label="获取日期：">
              <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="—"
                start-placeholder="请选择日期"
                end-placeholder="请选择日期"
                align="right"
                clearable>
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item prop="type" label="商品类型：">
              <el-select v-model="form.type" placeholder="请选择商品类型">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="" label="商品名称：">
              <el-input class="searchInput" v-model="form.name" placeholder="请输入商品名称或ID查询"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item prop="causeName" label="获取方式：">
              <el-radio-group v-model="form.causeCode">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="10">充值</el-radio-button>
                <el-radio-button label="100">购物</el-radio-button>
                <el-radio-button label="80">活动奖励</el-radio-button>
                <el-radio-button label="30">推广分账</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item prop="type" label="豆币状态：">
              <el-radio-group v-model="form.type">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="1">正常</el-radio-button>
                <el-radio-button label="2">冻结</el-radio-button>
              </el-radio-group>
            </el-form-item> -->
          </el-col>
        </el-row>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
        <el-form-item style="margin: 15px 0;text-align: center;">
          <el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('form')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" @click="reset('form')" icon="el-icon-setting">重置</el-button>
          <el-button style="min-width: 120px;" @click="back">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 20px;">
      <!-- <span>排序：</span>
      <el-select v-model="form.ORDER" placeholder="请选择">
        <el-option
          v-for="item in sorts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <span style="margin: 0 20px;">当前选择{{hasChoose}}项</span>
      <!-- <el-button type="danger" @click="freeze">冻结</el-button>
      <el-button type="success">解冻</el-button>
      <el-button type="primary">扣减</el-button> -->
    </div>
    <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
    <div style="margin: 20px;">
      <el-table :data="detailData" stripe border style="width: 100%" @selection-change="selectionChange">
        <el-table-column type="selection" label="选择"></el-table-column>
        <el-table-column prop="serialNo" label="流水号"></el-table-column>
        <el-table-column prop="created" label="获取时间"></el-table-column>
        <el-table-column prop="tradeCoins" label="交易数">
          <template slot-scope="scope">
            <span v-if="scope.row.tradeCoins">{{scope.row.tradeCoins}}</span>
            <span v-if="scope.row.tradeBeans">{{scope.row.tradeBeans}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usableCoins" label="当前余额">
          <template slot-scope="scope">
            <span v-if="scope.row.usableCoins">{{scope.row.usableCoins}}</span>
            <span v-if="scope.row.usableBeans">{{scope.row.usableBeans}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="causeName" label="获取方式"></el-table-column>
        <el-table-column prop="causeDesc" label="描述"></el-table-column>
        <el-table-column label="关联商品详情" v-if="this.$route.query.name !== '盈币账户'">
          <template slot-scope="scope" >
            <el-button size="small" type="primary" @click="view(scope.row)" v-show="scope.row.rowFlag">查看</el-button>
          </template>
         <!--  <template slot-scope="scope" >
            <el-button size="small" type="primary" @click="view(scope.row)" v-show='scope.row.accrueBeansDetail || scope.row.profitBeansDetail?(scope.row.accrueBeansDetail.goodsId || scope.row.profitBeansDetail.goodsId )?true:false'>查看</el-button>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <!-- 商品弹框 -->
    <el-dialog
      title="关联商品列表"
      :visible.sync="payDialogVisible"
      :before-close="handleClose">
      <!-- <el-form :model="searchParams" label-width="140px">
        <el-col :span="8">
          <el-form-item prop="type" label="商品类型：">
            <el-select v-model="searchParams.type" placeholder="请选择商品类型">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="" label="商品名称：">
            <el-input class="searchInput" v-model="searchParams.name" placeholder="请输入商品名称或ID查询"></el-input>
          </el-form-item>
        </el-col >
        <el-col :span="6">
          <el-button size="medium" type="success" @click="searchProduct('searchParams')">搜索</el-button>
        </el-col>
      </el-form> -->
      <!-- <br> -->
      <el-table :data="productData">
        <el-table-column prop="skuId" label="关联商品ID"></el-table-column>
        <el-table-column prop="productInfo.categoryName" label="关联商品类型"></el-table-column>
        <el-table-column prop="skuName" label="关联商品名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backDtail">返 回</el-button>
      </span>
    </el-dialog>
    <div class="center m20">
    	<el-pagination
    	  @current-change="handleCurrentChange"
    	  :current-page.sync="form.pageNum"
    	  :page-size="form.pageSize"
    	  layout="total, prev, pager, next"
    	  :total="totalPage">
    	</el-pagination>
    </div>
  </section>
</template>

<script>
import { getProfitBeanRecord, getAccrueBeanRecord, getProfitCoinRecord, searchGoodsInfo } from '@/api/account'
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.create = this.time[0]
          this.form.created = this.time[1]
        } else {
          this.form.create = ''
          this.form.created = ''
        }
      }
    }
  },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        create: '',
        created: '',
        causeCode: ''
      },
      searchParams: {
        type: '',
        name: ''
      },
      time: [],
      types: [],
      hasChoose: 0,
      payDialogVisible: false,
      selectData: [], // 保存列表选择的数据项
      detailData: [],
      profitBeanId: '',
      productData: [],
      proId: ''
    }
  },
  methods: {
    // 列表多选
    selectionChange(selection) {
      console.log(selection)
      if (selection) {
        this.hasChoose = selection.length
        this.selectData = selection
      }
    },
    // 获取方式
    // causeCodeFormat(row) {
    //   const str = {
    //     '-10': '提现',
    //     '10': '充值',
    //     '20': '转账',
    //     '30': '分润',
    //     '40': '结算',
    //     '80': '奖励',
    //     '90': '补贴',
    //     '100': '购物',
    //     '110': '摇钱树',
    //     '120': '许愿灯',
    //     '130': '红包',
    //     '140': '楼花',
    //     '150': '饭票',
    //     '160': '聚宝盆',
    //     '170': '分享',
    //     '180': '道具',
    //     '181': '炸弹',
    //     '182': '鲜花',
    //     '200': '煮豆',
    //     '900': '注册',
    //     '910': '登录',
    //     '1000': '查询'
    //   }
    //   return str[row.causeCode]
    // },
    // 查询
    search() {
      this.handleQuery()
    },
    // 重置
    reset() {
      this.time = []
      this.$refs['form'].resetFields()
    },
    // 返回
    back() {
      this.$router.push({ path: '/account/index' })
    },
    // 查看关联商品列表
    view(row) {
      console.log(row)
      if (this.$route.query.name === '生豆账户') {
        this.proId = row.accrueBeansDetail.goodsId
      } else if (this.$route.query.name === '盈豆账户') {
        this.proId = row.profitBeansDetail.goodsId
      }
      searchGoodsInfo({ goodsId: this.proId }).then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          this.productData.push(res.data.data)
        }
      })
      this.payDialogVisible = true
    },
    // 返回详情
    backDtail() {
      this.productData = []
      this.payDialogVisible = false
    },

    // 分页
    handleCurrentChange() {
      this.handleQuery()
    },
    // 查询生豆流水
    accrueBeanRecord() {
      const accrueBeanParams = {
        channel: this.$route.query.channel,
        aType: this.$route.query.type,
        mId: this.$route.query.mId,
        causeCode: this.form.causeCode,
        create: this.form.create,
        created: this.form.created,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      getAccrueBeanRecord(accrueBeanParams).then(res => {
        if (res.status === 200 && !res.data.errorMsg) {
          this.detailData = res.data.data
          this.totalPage = res.data.totalRecordCount
          res.data.data.forEach((item, index) => {
            item.accrueBeansDetail ? (item.accrueBeansDetail.goodsId) ? this.detailData[index].rowFlag = true : this.detailData[index].rowFlag = false : this.detailData[index].rowFlag = false
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMsg
          })
        }1
      })
    },
    // 查询盈豆流水
    profitBeanRecord() {
      const profitBeanParams = {
        channel: this.$route.query.channel,
        aType: this.$route.query.type,
        mId: this.$route.query.mId,
        causeCode: this.form.causeCode,
        create: this.form.create,
        created: this.form.created,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      getProfitBeanRecord(profitBeanParams).then(res => {
        if (res.status === 200 && !res.data.errorMsg) {
          this.detailData = res.data.data
          this.totalPage = res.data.totalRecordCount
          res.data.data.forEach((item, index) => {
            item.profitBeansDetail ? (item.profitBeansDetail.goodsId) ? this.detailData[index].rowFlag = true : this.detailData[index].rowFlag = false : this.detailData[index].rowFlag = false
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMsg
          })
        }
      })
    },
    // 查询盈币流水
    profitCoinRecord() {
      const profitCoinParams = {
        channel: this.$route.query.channel,
        aType: this.$route.query.type,
        mId: this.$route.query.mId,
        causeCode: this.form.causeCode,
        create: this.form.create,
        created: this.form.created,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize
      }
      getProfitCoinRecord(profitCoinParams).then(res => {
        if (res.status === 200 && !res.data.errorMsg) {
          this.detailData = res.data.data
          this.totalPage = res.data.totalRecordCount
          console.log(res.data)
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMsg
          })
        }
      })
    },
    handleQuery() {
      if (this.$route.query.name === '生豆账户') {
        this.accrueBeanRecord()
      } else if (this.$route.query.name === '盈豆账户') {
        this.profitBeanRecord()
      } else if (this.$route.query.name === '盈币账户') {
        this.profitCoinRecord()
      }
    }
  },
  mounted() {
    this.handleQuery()
  }
}
</script>

<style scoped lang="scss">
.search {
  margin: 20px 0;
}
.searchInput.el-input {
  max-width: 200px;
}
</style>
