<template>
	<section>
		<!-- 面包屑-->
		<el-card>
			<el-row>
				<el-col :span="12">
					<!-- 面包屑 -->
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>群组管理</el-breadcrumb-item>
						<el-breadcrumb-item>群的基本信息</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
		</el-card>
		<el-card>

			<div class="tableForm">
				<groupInfo
					:isSocialContact="isSocialContact"
					:crowdId="crowdId"
					:channelId="channelId"
					:isViewOrManage="isViewOrManage"></groupInfo>
					<!--@childDetail="childDetailClick"-->
			</div>
		</el-card>
	</section>
</template>

<script>
import groupInfo from "../components/groupInfo";
export default {
  components: { groupInfo },
  data() {
    return {
      tableData: [],
      crowdId: "",
      channelId: "",
      isSocialContact: true,
      isViewOrManage: ""
    };
  },
  methods: {
    //子组件触发的事件
    //	subSave (data){
    //
    //	},
    handleQuery() {
      //console.log(this.$router.currentRoute.query)
      if (this.$router.currentRoute.query) {
        let query = this.$router.currentRoute.query;
        this.crowdId = query.crowdId;
        this.isSocialContact = query.isSocialContact;
        this.channelId = query.channelId;
        this.isViewOrManage = query.isViewOrManage;
      }
    },

    //保存按钮
    subSave() {}
  },
  created() {
    this.handleQuery();
  }
};
</script>
<style scoped>
</style>
