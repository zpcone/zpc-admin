<template>
	<div>
		<!--面包屑  按钮 保存 取消-->
		<el-card style="padding: 0 10px;">

			<div class="tableForm" style="">
				<personInfo
					:mId="mId"
					:crowdId="crowdId"
					:channelType = "channelType"
					:flowType = "flowType"></personInfo>
					<!--@childSubmit="childSubmitAction" 练习-->
			</div>
		</el-card>
	</div>
</template>

<script>
import personInfo from "../components/personInfo";
export default {
  components: { personInfo },
  data() {
    return {
      mId: "",
      crowdId: "",
      channelType: "",
      flowType: ""
    };
  },
  methods: {
    //  childSubmitAction (data) {
    //  	console.log('data')
    //  	console.log(data)
    //  },
    handleQuery() {
      let query = this.$router.currentRoute.query;
      this.crowdId = query.crowdId;
      this.mId = query.mId;
      this.flowType = query.flowType + "";
      this.channelType = query.channelType;
    }
  },
  created() {
    this.handleQuery();
  }
};
</script>
<style scoped>
</style>
