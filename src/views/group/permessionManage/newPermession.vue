<template>
	<div class="form">
		<el-form v-model="form" ref="form" label-width="140px">
			<el-form-item prop="name" label="权限名称">
				<el-input class="formInput" v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="id" label="权限ID">
				<el-input class="formInput"  v-model="form.id" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="sep" label="权限类别">
				<el-select  v-model="form.sep">
						<el-option v-for="item in seps" :label="item.label" :value="item.value" :key="item.label"></el-option>
					</el-select>
			</el-form-item>
			<el-form-item prop="desc" label="权限简介">
				<el-input class="formInput" type="textarea"  v-model="form.desc" placeholder=""></el-input>
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
        name: "",
        id: "",
        sep: "",
        desc: ""
      },
      seps: [
        {
          label: "基础权限",
          value: "1"
        },
        {
          label: "特殊权限",
          value: "2"
        }
      ]
    };
  },
  methods: {
    create() {
      this.$message.success("创建成功");
      this.$router.push("/grouppermessionmanage/permession");
    },
    back() {
      this.$message.info("没有操作");
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  margin: 40px 20px;
  .formInput {
    width: 600px;
  }
}
</style>
