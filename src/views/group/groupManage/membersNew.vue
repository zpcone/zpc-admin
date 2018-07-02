<template>
	<div>
		<!--面包屑  按钮 保存 取消-->
		<el-card style="padding: 0 10px;">

			<div class="tableForm" style="">
				<newPerson
					:crowdId="crowdId"
					:channelType="channelType"
					:crowdName="crowdName"></newPerson>
			</div>
		</el-card>
	</div>
</template>

<script>
import newPerson from "../components/newPerson";
export default {
  components: { newPerson },
  data() {
    return {
      crowdId: "",
      channelType: "",
      crowdName: ""
    };
  },
  methods: {
    handleQuery() {
      if (this.$router.currentRoute.query) {
        let query = this.$router.currentRoute.query;
        this.crowdId = query.crowdId;
        this.channelType = query.channelType;
        this.crowdName = query.crowdName;
      }
    }
  },
  created() {
    this.handleQuery();
  }
};
</script>
<style scoped>
</style>
