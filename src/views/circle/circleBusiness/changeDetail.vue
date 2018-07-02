<template>
	<section>
		<div class="back">
			<el-button type="primary" icon="el-icon-back" @click="back">返回</el-button>
		</div>
		<el-form class="sortBy" style="margin-top: -100px;" ref="changeForm" v-model="changeForm">
			<span>列表排序：</span>
			<el-select placeholder="请选择" v-model="changeForm.sort" prop="sort" @change="sortChange">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-form>
		<div class="table">
			<el-table  @selection-change="selectionChange" border :data="tableData" style="width:100%">
				<el-table-column prop="Id" label="编号"></el-table-column>
				<el-table-column prop="transfer" label="转让人"></el-table-column>
				<el-table-column prop="transferOrderTime" label="转让订单提交时间"></el-table-column>
				<el-table-column prop="hold" label="持有价"></el-table-column>
				<el-table-column prop="transaction" label="成交价"></el-table-column>
				<!--本轮收益 = 交易价-持有价 -->
				<el-table-column prop="principal" label="本轮收益"></el-table-column>
				<!--固定资产 = 持有价+豆账户-->
				<el-table-column prop="circleProperty" label="圈资产"></el-table-column>
				<el-table-column prop="circleBalance" label="圈账户豆余额"></el-table-column>
				<el-table-column prop="purchase" label="购买人"></el-table-column>
				<el-table-column prop="status" label="转让状态" :formatter="revStatus"></el-table-column>
				<el-table-column prop="dealTime" label="成交时间"></el-table-column>
			</el-table>
		</div>
		<div class="pagination center">
			<el-pagination 
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange" 
				:current-page.sync="changeForm.pageNum" 
				:page-size="changeForm.pageSize" layout="total, prev, pager, next" 
				:total="totalSize">
			</el-pagination>
		</div>
	</section>
</template>

<script>
import { changeHistory } from '@/api/circle/business'
export default {
  data() {
    return {
    	changeForm: {
         	pageNum: 1,
        	pageSize: 10,
        	channelType: '',
        	circleId: ''
    	},
    	options: [
    		{
	    		value: '1',
	    		label: '按成交价格由近及远排序'
    		},
    		{
	    		value: '2',
	    		label: '按成交价格由高到低排序'
    		},
    		{
	    		value: '3',
	    		label: '按圈子人数由高到低排序'
    		},
    		{
	    		value: '4',
	    		label: '按圈子能量由高到低排序'
    		},
    		{
	    		value: '5',
	    		label: '按转让时间由近及远排序'
    		}  
    	],
    	tableData: [],
    	totalSize: '',
    	currentPage: 1
    }
  },
  methods:{
  	back () {
  		this.$router.push('/circlemanage/business/change')
  	},
  	//处理分页
  	handleCurrentChange (val) {
  		this.changeForm.pageNum = val 
  		this.handleQuery()
  	},
  	//排序的值改变  
  	sortChange (val) {
  		this.changeForm.sort = val
  		this.handleQuery()
  	},
    // 列表转让状态过滤
    revStatus(row){
      if(row.status === '1'){
        return '转让中'
      }else if(row.status === '2'){
        return '已成交'
      }else if(row.status === '3'){
        return '已取消'
      }else if(row.status === '4'){
        return '已拒绝'
      } 
    },
    handleQuery(){
      	let query = this.$router.currentRoute.query
      	this.changeForm.channelType = query.channelType
      	this.changeForm.circleId = query.circleId
      	changeHistory(this.changeForm).then(res => {
	 			console.log(res)
	 			//this.totalSize = Number(res.totalSize)
	 			
	  		})
    },
  },
  mounted (){
  	this.handleQuery()
  }
}
</script>

<style scoped lang="scss">
	.back{
		padding: 30px;
		text-align: right;
	}
	.sortBy{
		padding: 30px;
		span{
			font-size: 14px;
		}
	}
	.table{
		margin: 30px;
	}
	.center{
		margin: 20px 0;
		text-align: center;
	}
</style>