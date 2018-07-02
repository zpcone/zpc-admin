<template>
    <section>
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="生豆" name="1"></el-tab-pane>
      <el-tab-pane label="盈豆" name="2"></el-tab-pane>
      <el-tab-pane label="盈币" name="3"></el-tab-pane>
    </el-tabs>
    <br>
    <el-form ref="form" :model="form" label-width="100" v-if="numberChange === 'add'">
      <el-form-item prop="tradeBeans" label="添加数量：">
        <el-input class="input-width" v-model.trim="form.tradeBeans" maxlength="12" v-on:input="NumCheck" clearable></el-input>
      </el-form-item>
      <el-form-item prop="causeDesc" label="添加原因：">
        <el-input type="textarea" class="input-width" v-model="form.causeDesc" clearable></el-input>
      </el-form-item>
      <el-form-item prop="mId" label="添加的账户：">
        <el-input v-model="form.mId" class="input-width" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="100" v-if="numberChange === 'reduce'">
      <el-form-item prop="tradeBeans" label="扣减数量：">
        <el-input class="input-width" v-model.trim="form.tradeBeans" maxlength="12" v-on:input="NumCheck" clearable></el-input>
      </el-form-item>
      <el-form-item prop="causeDesc" label="扣减原因：">
        <el-input type="textarea" class="input-width" v-model="form.causeDesc" clearable></el-input>
      </el-form-item>
      <el-form-item prop="mId" label="扣减的账户：">
        <el-input v-model="form.mId" class="input-width" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center;" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addNumber">确定</el-button>
    </div>
  </section>
</template>
<script>
import { saveAccrueBeans, saveProfitBeans, saveAccrueCoins } from '@/api/account'
export default {
  data() {
    return {
      activeTab: '1',
      form: {
        createdby: '1',
        tradeBeans: '',
        causeDesc: ''
      },
      idNum: false
    }
  },

  mounted() {
    this.form = { ...this.form, ...this.addNum }
  },

  props: {
    addNum: {
      type: Object,
      default: () => {}
    },
    numberChange: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    handleClick(tab, event) {
      // this.activeLabel = tab.label
      // console.log(this.activeLabel)
    },
    // 长度校验
    NumCheck() {
      const reg = new RegExp(/^[0-9]*$/)
      if (!reg.test(this.form.tradeBeans)) {
        this.idNum = false
      } else {
        this.idNum = true
      }
    },
    // 确定
    addNumber() {
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
      if (this.idNum === false) {
        this.$message.warning('ID必须为数字！')
        return
      }
      console.log(this.form)
      this.form.mId = this.addNum.mId
      console.log(this.addNum.mId)
      saveAccrueBeans(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('修改生豆额成功')
          this.$refs['form'].resetFields()
          this.activeTab = '1'
          this.$emit('confirm')
        }
      })
    },
    // 修改盈豆额
    profitBeans() {
      if (this.idNum === false) {
        this.$message.warning('ID必须为数字！')
        return
      }
      // console.log(this.form)
      saveProfitBeans(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('修改盈豆额成功')
          this.$refs['form'].resetFields()
          this.activeTab = '1'
          this.$emit('confirm')
        }
      })
    },
    // 修改盈币额
    accrueCoins() {
      if (this.idNum === false) {
        this.$message.warning('ID必须为数字！')
        return
      }
      this.form.tradeCoins = this.form.tradeBeans
      this.form.tradeBeans = ''
      console.log(this.form)
      saveAccrueCoins(this.form).then(res => {
        if (res.data.success === false) {
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        } else {
          this.$message.success('修改盈币额成功')
          this.$refs['form'].resetFields()
          this.activeTab = '1'
          this.$emit('confirm')
        }
      })
    },
    cancel() {
      this.$refs['form'].resetFields()
      this.activeTab = '1'
      this.$emit('cancel')
    }
  },
  created() {
    console.log('传值')
    this.form.mId = this.addNum.mId
    console.log(this.addNum.mId)
    this.form.aType = this.addNum.aType
    this.form.channel = this.addNum.channel
    this.form.type = this.addNum.type
  }
}
</script>
<style scoped lang="scss">
.input-width {
  width: 200px;
  margin: 10px 0 auto;
}
</style>



