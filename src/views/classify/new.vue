<template>
  <section>
    <el-form ref="form" :model="form" label-width="160px" class="form">
      <el-form-item prop="channelType" label="渠道：" required>
        <el-radio-group v-model="form.channelType">
        	<el-radio label="1">电商</el-radio>
          <el-radio label="2">社交</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="categoryName" label="分类名称：" required>
        <el-input v-model.trim="form.categoryName" placeholder="请输入分类名称" maxlength="8" clearable></el-input>
      </el-form-item>
      <el-form-item prop="explain" label="分类说明：" required>
        <el-input v-model="form.explain" placeholder="请输入分类说明" maxlength="16" clearable></el-input>
      </el-form-item>
      <!--<el-form-item prop="" label="分类编码：" required>
        <el-input v-model="form.code" placeholder="" disabled></el-input>
      </el-form-item>-->
      <el-form-item prop="categoryNature" label="性质：">
        <el-radio-group v-model="form.categoryNature">
          <el-radio label="1">圈</el-radio>
          <el-radio label="2">群</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="categoryLevel" label="级别：">
        <el-radio-group v-model="form.categoryLevel" :disabled="true">
          <el-radio :label="1">一级分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
        <el-button type="success" @click="creatSuccess">确认创建</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
	import { newFirstClass } from '@/api/group/classify'
  export default{
    data(){
      return{
        form: {
        	//渠道类型
          channelType: '',
          //分类名称
          categoryName: '',
          //分类说明
          explain: '',
          //code: '111111',
          //分类级别
          categoryLevel: 1,
          //分类性质
          categoryNature: '',
          memberId: 1,
        }
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      //确认创建
      creatSuccess(){
      	if(!this.form.channelType || !this.form.categoryName || !this.form.explain || !this.form.categoryNature){
      		this.$message.warning('所有项均为必填！')
      	}else{
      		newFirstClass(this.form).then(res => {
      			if(res.data == true && res.status == '200'){
      				this.$message.success('创建一级分类成功！')
      				this.$router.push('/circleandgroup/classify/index')
      			}else{
      				this.$message.error('创建失败，请刷新后重试！')
      			}
      		}).catch(error => {
      			console.log(error)
      		})
      	}
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