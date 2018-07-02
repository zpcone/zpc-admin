<template>
  <section>
  	<div style="position: relative;">
  		<div style="position: absolute; right:30px">
  			<el-button type="info" @click="back">返回</el-button>
  		</div>
  	</div>
  	<div class="m20">
  		<span style="">群内 {{ groupNum }} 人对该群进行了分组</span>
  		<span style="display: inline-block;margin-left: 30px;">群ID : {{buttonData[0].ccId}}</span>
  		<span style="display: inline-block;margin-left: 30px;">群名称 : {{ ccName }}</span>
  	</div>
  	<div class="m20">
  		<el-button type="primary" round :key="item.groupId" v-for="(item,index) in buttonData" :label="item.groupName" :value="item.groupCount" @click="groupClick(item)">{{item.groupName}}</el-button>
  	</div>
		<el-dialog title="该群内设置此分组的会员" :visible.sync="dialogTableVisible"  width="40%">
		  <el-table :data="gridData" @selection-change="selectionChange" stripe border style="width:100%" center>
		  	<!--<el-table-column type="selection" width="55"></el-table-column>-->
		  	<el-table-column type="index" width="50"></el-table-column>
		    <el-table-column property="mId" label="会员ID" width="200"></el-table-column>
		    <el-table-column property="memberName" label="会员名称" width="200"></el-table-column>
		    <el-table-column property="groupName" label="分组文件夹名称"></el-table-column>
		    <el-table-column property="created" label="关联时间"></el-table-column>
		  </el-table>
		</el-dialog>
  </section>
</template>

<script>
import { cAndGMange,cAndGAllMange } from '@/api/circleAndGroup'
  export default{
    data(){
      return{
      	dialogTableVisible: false,
      	ccName: '',
      	groupNum: 0,
        buttonData: [
         //写死的假数据
        {
            "ccId":"2431111457833123232",
            "ccType":0,
            "groupCount":1,
            "groupId":"439120894405586944",
            "groupName":"haha1"
        } ,
        {
            "ccId":"2431111457833123232",
            "ccType":0,
            "groupCount":1,
            "groupId":"439120894405586944",
            "groupName":"haha1"
        }          
         ],
        gridData: [],
        form: {}
      }
    },
    methods:{
    back () {
//  	this.$router.push('/circleandgroup/team/folder/circle')
    	this.$router.push(
				{
					path:'/circleandgroup/team/folder/circle',
					query:{
	 					groupId : this.form.groupId,
	 					mId: this.form.mId
					}
				}
			)
    },
    selectionChange (val) {
    	this.chooseLen =val.length
    },
    handleQuery(){
    		var _this = this
      	let query = this.$router.currentRoute.query
      	let ccId = query.ccId
      	let ccType = query.ccType
      	this.form.groupId = query.groupId
      	this.form.mId = query.mId
      	this.ccName = query.ccName
				cAndGMange({
		 					ccId : ccId,
		 					ccType: ccType
				}).then(res => {
					//console.log(res)
						_this.buttonData = res.data
						for(let i=0;i<res.data.length;i++){
							_this.groupNum += Number(res.data[i].groupCount)
						}
				})
      },
    groupClick (item){
			this.dialogTableVisible = true
			let obj = item
			cAndGAllMange(obj).then(res => {
				//console.log(res)
				this.gridData = res.data
			})
    }
    },
    mounted () {
    	this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>