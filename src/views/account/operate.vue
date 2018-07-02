<template>
  <section>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="生豆" name="1"></el-tab-pane>
      <el-tab-pane label="盈豆" name="2"></el-tab-pane>
      <el-tab-pane label="盈币" name="3"></el-tab-pane>
    </el-tabs>
    <br>
    <el-form ref="form" :model="form" label-width="100" v-if="freezeType === 'freezes'">
      <el-form-item prop="tradeBeans" label="冻结数量：" required>
        <el-input class="input-width" v-model="form.tradeBeans" clearable></el-input>
      </el-form-item>
      <el-form-item prop="causeDesc" label="冻结原因：">
        <el-input type="textarea" class="input-width" v-model="form.causeDesc" clearable></el-input>
      </el-form-item>
      <el-form-item prop="mId" label="冻结账户：" required>
        <el-input v-model="form.mId" class="input-width" ></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="100" v-if="freezeType === 'unfreezes'">
      <el-form-item prop="tradeBeans" label="解冻数量：" required>
        <el-input class="input-width" v-model="form.tradeBeans" clearable></el-input>
      </el-form-item>
      <el-form-item prop="causeDesc" label="解冻原因：">
        <el-input type="textarea" class="input-width" v-model="form.causeDesc" clearable></el-input>
      </el-form-item>
      <el-form-item prop="mId" label="解冻账户：" required>
        <el-input v-model="form.mId" class="input-width" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center;" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="update">确定</el-button>
    </div>
  </section>
</template>
<script>
import { saveAccrueBeans, saveProfitBeans, saveAccrueCoins } from '@/api/account'
export default {
  data() {
    return {
      activeTab: '1',
      // 会员id	mId
      // 渠道	channel
      // 账户类型	aType
      // 交易数	tradeBeans
      // 操作类型	type
      // 业务类型代码	causeCode
      // 业务类型名称	causeName
      // 业务描述	causeDesc
      // 操作人ID	createdby
      form: {
        tradeBeans: '',
        causeDesc: '',
        mId: '',
        type: '',
        createdby: '1'
      }
    }
  },
  props: {
    accounts: {
      type: Object,
      default: {}
    },
    freezeType: {
      type: String,
      default: 'freezes'
    }
  },
  mounted() {
    this.form.mId = this.accounts.mId
    this.form.aType = this.accounts.aType
    this.form.channel = this.accounts.channel
    this.form.type = this.accounts.type
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeTab)
    },
    // 冻结
    update() {
      if (this.activeTab === '3') {
        this.accrueCoins()
      } else if (this.activeTab === '2') {
        this.profitBeans()
      } else {
        this.accrueBeans()
      }
    },
    // 修改生豆额
    accrueBeans() {
      saveAccrueBeans(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('操作成功')
          this.$emit('confirm')
        }
      })
    },
    // 修改盈币额
    profitBeans() {
      saveProfitBeans(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('操作成功')
          this.$emit('confirm')
        }
      })
    },
    // 修改盈豆额
    accrueCoins() {
      saveAccrueCoins(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('操作成功')
          this.$emit('confirm')
        }
      })
    },
    // 取消
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped lang="scss">
.input-width {
  width: 200px;
  margin: 10px 0 auto;
}
</style>
