<template>
	<div>
		<el-row>
  			<el-col :span="24">
  				<div class="grid-content bg-purple-dark">
  					<span class="ht el-icon-tickets"></span>基本信息
  				</div>
  			</el-col>
		</el-row>
	
	<el-form ref="form" :model="form" label-width="130px" style="margin-top: 20px;">
		<el-form-item label="特权图标：" class="tqpic" >
			<img :src="form.privilegeImage" alt="" class="smallPic"/>
		</el-form-item>
		<el-form-item label="限制条件：">
			<span>{{conditionsType | capitalize}}</span><el-input
					  placeholder="数量"
					  v-model="form.conditionsValue"
					  :disabled="true" class="inputStyle" style="width:8%">
					</el-input>
			<!--<el-input-number v-model="form.conditionsType" :disabled="true" size="mini" style="margin:0 8px 0 8px;"></el-input-number>-->
			价格<el-input
					  placeholder="价格"
					  v-model="form.privilegePrice"
					  :disabled="true" class="inputStyle" style="width:8%">
					</el-input>
			<!--<el-input-number v-model="form.privilegePrice" :disabled="true" size="mini" style="margin:0 8px 0 8px;"></el-input-number>-->
		</el-form-item>
		<el-form-item label="说 明:" style="width:21%">
			<el-input
  				type="textarea"
  				placeholder="请输入内容（不能超过100字）"
  				v-model="form.explain"
  				disabled="true" resize="none" maxlength="100" rows='7'>
			</el-input>
		</el-form-item>
		<el-form-item label="图片：" style="width:20%;height:20%">
			<!--<el-input disabled="true"></el-input>-->
			<!--<div v-model="form.privilegeImage"></div>-->
			<img :src="form.privilegeImage" alt="" class="bigPic"/>
		</el-form-item>
		<el-form-item>
			<el-button round @click="back" style="width:10%;height:10%;">返回</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
	import { detail } from '@/api/right'
	export default {
    filters: {  
        capitalize: function (row) {  
    // 列表限制条件过滤
      if(row === 1){
        return '圈子数量'
      }else if(row === 2){
        return '好友数量'
      }else if(row === 3){
        return '查看次数'
      }else if(row === 4){
        return '圈子路由次数'
      }else if(row === 5){
        return '提现额度'
      }else if(row === 6){
        return '许愿灯数量'
      }else if(row === 7){
        return '圈主数量'
      }else if(row === 8){
        return '发言时长'
      }else if(row === 9){
        return '数量'
      }else if(row === 10){
        return '次数'
      }else if(row === 11){
        return '金额'
      }else if(row === 12){
        return '商品数量'
      }else if(row === 13){
        return '拼主数量'
      }else if(row === 14){
        return '盈币数量'
      } 
        }  
    }, 
    data() {
      return {
      	conditionsType: '',
      	privilegeTypeId: '',
      	 num1: 0,
      	 num2: 1,
      	 textarea: '',
      	 input1: '',
        form: {
//        name: '',
	//		限制图标
		  privilegeImage:'',
		  //限制数量
		  conditionsValue: '',
		  conditionsType: '',
		  //限制价格
		  privilegePrice: '',
		  //说明
		  explain: '',
//        type: [],
        }
      }
    },
    methods: {
      back(){
		this.$router.push(
			{
				path:'/right/index',
				query:{
						viewAndEditSencondId: this.privilegeTypeId
				}
			}
		)
      },
      handleQuery(){
      	let query = this.$router.currentRoute.query
//    	console.log(this.$router.currentRoute)
      	let detailkId = query.id
      	this.conditionsType = query.conditionsType
      	this.privilegeTypeId = query.privilegeTypeId
      	detail({
	  			id : detailkId,
   				channelId : 1
	 		}).then(res => {
//	 			console.log(res.data.data[0])
				this.form=res.data.data[0]
	 			
	  		})
      },
    
      handlePreview(file) {
        console.log(file);
      }
      
    },
	mounted(){
		this.handleQuery()
    }
    
  }
</script>

<style>
.bg-purple-dark {
    background: #99a9bf;
  }
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.ht{
  	display: inline-block;
  	margin-right: 15px;
  	margin-left: 50px;
  	line-height: 2;
  }
 /*特权图标*/
.tqpic{
	width:10%;
}
.smallpic{
	width:60px;
	height:60px;
	border:1px solid #ccc;
}

.smallPic{
	width:50px;
	height:50px;
}
.bigPic{
	width:200px;
	height:200px;
}
.inputStyle{
	width:50px;
	margin: 0 10px 0 10px;
}
</style>