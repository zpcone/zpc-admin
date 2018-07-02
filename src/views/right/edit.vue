<template>
 <div>
		<el-row>
  			<el-col :span="24">
  				<div class="grid-content bg-purple-dark">
  					<span class="ht el-icon-tickets"></span>基本信息
  				</div>
  			</el-col>
		</el-row>

	<el-form ref="form" :model="form" label-width="130px" style="margin-top: 20px;" Content-Type = multipart/form-data>
		<el-form-item label="特权图标：" class="tqpic" >
			<img :src="form.jsonData.privilegeImage" alt="" class="smallPic" v-model="form.file"/>
		</el-form-item>
		<el-form-item label="限制条件：">
			<span>{{conditionsType | capitalize}}</span>
			<el-input-number v-model="form.jsonData.conditionsNumber" size="mini" style="margin:0 8px 0 8px;" :min="0"></el-input-number>
			价格
			<el-input-number v-model="form.jsonData.price"  size="mini" :min="0" style="margin:0 8px 0 8px;"></el-input-number>
		</el-form-item>
		<el-form-item label="说 明:" style="width:30%">
			<el-input
  				type="textarea"
  				placeholder="请输入内容"
  				v-model="form.jsonData.remarks" resize="none" autosize="true">
			</el-input>
		</el-form-item>
		<el-form-item label="图片：" style="width:20%;height:20%"  enctype="multipart/form-data">
			 <!--<el-upload class="upload-demo pic"
			  drag
			 	multiple enctype="multipart/form-data"
			 	:on-success = "uploadSucc"
			 	ref="iconUpload"
		        :before-upload="beforeIconUpload"
		        :auto-upload="false"
			 	:data=form.fileEdit>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">*&nbsp;&nbsp;&nbsp;图片为必传项</div>
				</el-upload>-->

			<el-upload
			  class="avatar-uploader"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeIconUpload"
			  multiple enctype="multipart/form-data">
			  <img v-if="form.jsonData.privilegeImage" :src="form.jsonData.privilegeImage" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>

		</el-form-item>
		<el-form-item>
			<el-button round @click="submitEdit" style="width:10%;height:10%;">保存</el-button>
			<el-button round @click="back" style="width:10%;height:10%;">返回</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import { edit,detail,addSecondLevelAll } from '@/api/right'
  export default{
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
    data(){
      return{
      	conditionsType: '',
      	privilegeTypeId: '',//二级特权id
	    form: {
	    	file: '',
	    	jsonData:{
	//  		三级特权条件id
	    		id: '',
//	    		privilegeImage:'../../assets/404_images/cs1.png',
	    		privilegeImage:'',
	//  		渠道id
	    		channelId: 1,
	//  		说明
	    		remarks: '',
	//  		限制数量
				conditionsNumber: '',
	//				特权价格
				price: ''
	    	}
	        }
	      }
    },
    methods:{
	uploadSucc (response, file, fileList) {
//		console.log(file)
		this.form.file = file
	},
	  back(){
		this.$router.push(
			{
				path:'/right/index',
				query:{
						viewAndEditSencondId: this.privilegeTypeId,
				}
			}
		)
	  },
      handleQuery(){
      	let query = this.$router.currentRoute.query
		this.form.jsonData.id = query.id
		this.conditionsType = query.conditionsType
		this.privilegeTypeId = query.privilegeTypeId
		detail({id:query.id,channelId:'1'}).then(res => {
			if(res.data.data.length && res.status == '200'){
				this.form.jsonData.id = res.data.data[0].privilegeId
				this.form.jsonData.privilegeImage = res.data.data[0].privilegeImage
				this.form.jsonData.remarks = res.data.data[0].explain
				this.form.jsonData.conditionsNumber = res.data.data[0].conditionsValue
				this.form.jsonData.price = res.data.data[0].privilegePrice
			}
		})

      },
      
	//保存按钮   用来触发文件上传  2018.6.22后
	submitEdit () {
		if(!this.form.jsonData.id || !this.form.jsonData.privilegeImage || !this.form.jsonData.remarks){
			this.$message.warning('请填写完整信息！')
		}else if(this.form.jsonData.conditionsNumber <= 0){
			this.$message.warning('数量不能小于1')
		}else{
    		edit(this.form.jsonData).then(res => {
				if(res.status == '200'){
					this.$message.success('修改详情成功')
					this.$router.push(
						{
							path:'/right/index',
							query:{
								viewAndEditSencondId: this.privilegeTypeId,
							}
						}
					)		
				}else{
					this.$message(res.errorMsg)
				}    			
    		})
		}
	},
	// 详情编辑    用来处理文件上传并传参  2018.6.22后
	beforeIconUpload(file){
		let fd = new FormData()
		fd.append('file',file)
		addSecondLevelAll(fd).then(res =>{
			if(res.status == 200){
				this.$message.success('图片上传成功！')
				this.form.jsonData.privilegeImage = res.data
			}else{
				this.$message.success('图片上传失败，请重试！')
			}
		})
 	}

		//保存按钮   用来触发文件上传  2018.6.22前
//  	submitEdit(){
//			this.$refs.iconUpload.submit()
//			this.$message('请填写完整修改信息，并保存，成功后将跳转首页')
//			},
		// 详情编辑    用来处理文件上传并传参  2018.6.22前
//		beforeIconUpload(file){
//  	let fd = new FormData()
//  	fd.append('file',file)
//  	fd.append('jsonData',JSON.stringify(this.form.jsonData))
//			edit(fd).then(res =>{
////				console.log(res.status)
//			if(res.status == '200'){
//				this.$message('修改详情成功')
//				this.$router.push('/right/index')
//
//			}else{
//				this.$message('上传失败，请刷新后重试')
//			}
//			})
//  		return false
//  		this.$router.push('/right/index')
//	 	}
   },
    mounted(){
		this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
