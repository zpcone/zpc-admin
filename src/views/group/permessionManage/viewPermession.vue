<template>
	<section>
		<div class="back">
			<el-button @click="back">关闭</el-button>
		</div>
		<div class="pertable">
			<el-table :data="data" border style="width: 100%;">
				<el-table-column prop="name" label="权限名称"></el-table-column>
				<el-table-column prop="id" label="权限ID"></el-table-column>
				<el-table-column prop="desc" label="权限简介"></el-table-column>
				<el-table-column prop="sep" label="权限类别"></el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: "001"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.back {
  text-align: right;
  margin: 30px;
}
.pertable {
  margin: 30px;
}
</style>
