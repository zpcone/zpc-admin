<!--权限管理的公共组件 通过父组件传递的数据 来判断是否是编辑 查看 还是新建-->
<template>
	<section>
		<div style="text-align: right;height: 40px;line-height: 40px;">
			<el-button type="text">返回</el-button>
			<el-button type="info">保存</el-button>
		</div>
		<div>
			<p>编辑/查看/新建</p>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item prop="" label="权限ID：">
					<el-input v-model="form.id" placeholder="请输入权限ID"></el-input>
				</el-form-item>
				<el-form-item prop="" label="权限名称：">
					<el-input v-model="form.name" placeholder="请输入权限ID"></el-input>
				</el-form-item>
				<el-form-item prop="" label="权限简介：">
					<el-input type="textarea" v-model="form.desc" placeholder="请输入权限ID"></el-input>
				</el-form-item>
				<el-form-item prop="" label="权限类别：">
					<el-select v-model="form.sep">
						<el-option value="基础权限"></el-option>
						<el-option value="特殊权限"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  }
}
</script>

<style>

</style>