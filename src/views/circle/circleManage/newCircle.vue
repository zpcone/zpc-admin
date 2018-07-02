<template>
	<div class="form" style="width: 70%;margin: 30px;">
		<el-form v-model="form" ref="form">
			<!--商品 店铺  自定义-->
			<el-form-item prop="name" label="圈名称">
				<el-input class="formInput" v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="desc" label="圈子简介">
				<el-input class="formInput" type="textarea" v-model="form.desc" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="id" label="圈子公告">
				<el-input class="formInput" v-model="form.id" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="" label="圈子类型">
			  <el-checkbox-group v-model="form.type">
			    <el-button type="success" size="mini" style="margin-right: 20px;">设置圈子类型</el-button>
			    <el-checkbox label="1">商品圈</el-checkbox>
			    <el-checkbox label="2">一级类目圈</el-checkbox>
			    <el-checkbox label="3">二级类目圈</el-checkbox>
			  </el-checkbox-group>
			</el-form-item>
			<!--标签-->
			<el-form-item prop="" label="圈子标签">
        <el-button type="success" size="mini" style="margin-right: 20px;">设置圈子标签</el-button>
        <el-input v-model="form.label" placeholder="" style="width: 70%;"></el-input>
        </el-checkbox-group>
      </el-form-item>
      <!--层级-->
      <el-form-item prop="" label="圈子层级">
        <el-input v-model="form.level" placeholder=""></el-input>
      </el-form-item>
			<!--坐标   （基于场景才显示坐标）-->
			
			<!--头像-->
			<!--附加信息-->
			<el-form-item prop="" label="备注">
        <el-input v-model="form.ps" placeholder=""></el-input>
      </el-form-item>
			<el-form-item>
				<el-button type="info" @click="back">返回</el-button>
				<el-button type="primary" @click="create">确认新增</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        desc: '',
        id: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    create() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>