<template>
  <section>
    <el-form ref="form" :model="form" label-width="160px" class="form">
      <el-form-item prop="channelType" label="渠道：" required>
        <el-radio-group v-model="form.channelType">
          <el-radio label="1">电商</el-radio>
          <el-radio label="2">社交</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="columnName" label="栏目名称：" required>
        <el-input v-model="form.columnName" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item prop="columnId" label="栏目编码：" required>
        <el-input v-model="form.columnId" placeholder="" disabled></el-input>
      </el-form-item>
      <el-form-item prop="columnLevel" label="级别：">
        <el-radio-group v-model="form.columnLevel" :disabled="true">
          <el-radio label="1">一级分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="creat">确认创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { newColumn } from '@/api/program'
  export default{
    data(){
      return{
        form: {
          channelType: '',
          columnName: '',
          columnLevel: '1',
          mId:'121212121'
        }
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      creat(){
      	newColumn(this.form).then(res => {
      		if(res.data == true && res.status == '200'){
      			this.$message.success('创建成功')
      			this.$router.push('/circleandgroup/programa/index')
      		}
      	})
      }
    }
  }
</script>

<style scoped lang="scss">
.form{
  width: 480px;
  margin: 40px 0 40px 0;
}
</style>