<template>
  <section>
    <div>
      <el-form class="m20" ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item prop="subsidyType" label="选择账户类型">
          <el-radio-group v-model="form.subsidyType">
            <el-radio label="0">个人用户</el-radio>
            <el-radio label="2">ptzh</el-radio>
            <el-radio label="3">SBU</el-radio>
            <el-radio label="1">qzhh</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="mId" label="账户ID">
          <el-input v-model.trim="form.mId" style="max-width: 300px;" v-on:input="NumCheck" maxlength="18" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="m20">
        <el-table :data="data" border stripe style="width: 100%" @selection-change="selectChange">
          <el-table-column prop="" type="selection" label=""></el-table-column>
          <el-table-column prop="mId" label="用户ID"></el-table-column>
        </el-table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </section>
</template>

<script>
import { sbuAccount, beanAccount } from '@/api/split'
export default {
  props: {
    ruleChannel: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      form: {
        mId: '',
        subsidyType: '0'
      },
      data: [],
      selectData: [],
      idNum: true
    }
  },
  methods: {
    // Id校验
    NumCheck() {
      const reg = new RegExp(/^[0-9]*$/)
      if (!reg.test(this.form.mId)) {
        this.idNum = false
      } else {
        this.idNum = true
      }
    },
    // 搜索
    search() {
      if (this.form.mId === '') {
        this.$message.warning('请输入一个补贴人ID')
        return
      }
      if (this.form.subsidyType === '3') {
        sbuAccount({ mId: this.form.mId }).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.data = []
            const data = res.data.data
            data.subsidyType = this.form.subsidyType
            data.accountPercent = 0
            this.data.push(data)
          }
        })
      } else {
        console.log(this.idNum)
        if (this.idNum === false) {
          this.$message.warning('ID必须为数字！')
        } else {
          this.form.ruleChannel = this.ruleChannel
          beanAccount(this.form).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.data = []
              const data = res.data.data
              data.subsidyType = this.form.subsidyType
              data.accountPercent = 0
              this.data.push(data)
            }
          })
        }
      }
    },
    cancel() {
      this.$refs.form.resetFields()
      this.$emit('cancel')
    },
    confirm() {
      if (this.selectData.length === 0) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return
      }
      this.$emit('confirm', this.selectData)
    },
    selectChange(arr) {
      this.selectData = arr
    }
  }
}
</script>

<style scoped lang="scss">
</style>
