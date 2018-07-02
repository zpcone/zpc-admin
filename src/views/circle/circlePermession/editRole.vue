<template>
	<div class="form">
		<el-form v-model="form" ref="form" label-width="140px">
			<el-form-item prop="name" label="角色名称">
				<el-input class="formInput" v-model="form.name" placeholder="" maxlength="8" clearable></el-input>
			</el-form-item>
			<el-form-item prop="roleId" label="角色ID">
				<el-input class="formInput" disabled v-model="form.roleId" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="description" label="角色简介">
				<el-input class="formInput" type="textarea" v-model="form.description" placeholder="最多输入100个字" resize="none" rows=3 maxlength="100" clearable></el-input>
			</el-form-item>
			<!--<el-form-item prop="permissionName" label="基本权限">
				<el-checkbox v-model="checkAllBase" @change="handleCheckAllBaseChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.base" @change="handleBaseChange">
					<el-checkbox v-for="(item,index) in bases" :label="item.permissionName" :key="index">{{item.permissionName}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item prop="permissionName" label="特殊权限">
				<el-checkbox v-model="checkAllSpecial" @change="handleCheckAllSpecialChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.special" @change="handleSpecialChange">
					<el-checkbox v-for="(item,index) in specials" :label="item.permissionName" :key="index">{{item.permissionName}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>-->
			
			<!--<el-form-item prop="permissionName" label="基本权限">
				<el-checkbox v-model="checkAllBase" @change="handleCheckAllBaseChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.base" @change="handleBaseChange">
					<el-checkbox v-for="(item,index) in bases" :label="item" :key="index"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item prop="permissionName" label="特殊权限">
				<el-checkbox v-model="checkAllSpecial" @change="handleCheckAllSpecialChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="form.special" @change="handleSpecialChange">
					<el-checkbox v-for="(item,index) in specials" :label="item" :key="index"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>			-->
			<el-form-item>
				<el-button type="info" @click="back">返回</el-button>
				<el-button type="primary" @click="create">确认修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { detailRole,editRole } from '@/api/circle/permession'
export default {
  data() {
    return {
      form: {
        name: '',
        roleId: '',
        description: '',
        ccType: 1,  
        //当前登陆人编号
        memberId: 1,
        authorations:[],     
	    base: [],
	    special: []
      },
      checkAllBase: false,
      bases: [
        '预览',
        '查询',
        '编辑',
        '删除',
        '发言',
        '邀请进群',
        '推送',
        '私信',
        '语音',
        '发短视频',
        '发许愿灯'
      ],
      checkAllSpecial: false,
      specials: [
        '修改圈信息',
        '审核',
        '警告',
        '踢人',
        '不被踢',
        '设置黑名单',
        '设置行为会员永久权',
        '设置行为会员月时长',
        '设置行为会员日时长',
        '设置联席群主',
        '发起重选群主'
      ]
    }
  },
  methods: {
  	//确认修改编辑详情   调编辑接口
    create() {
		// 1为圈的标识
		editRole(
			{roleId: this.form.roleId,
			name: this.form.name,
			description: this.form.description,
			ccType: 1,
			memberId: 1
		}).then(res => {
				if(res.status == 200){
					this.$message.success('修改角色信息成功')
					this.$router.push('/circlemanage/permession/role')
			}
		}).catch(error => {
				console.log(error)
		})    	
    },
    back() {
      this.$message.info('没有操作')
      this.$router.go(-1)
    },
    handleBaseChange(value) {
      const checkedCount = value.length
      this.checkAllBase = checkedCount === this.bases.length
    },
    handleSpecialChange(value) {
      const checkedCount = value.length
      this.checkAllSpecial = checkedCount === this.specials.length
    },
    handleCheckAllBaseChange(val) {
      this.form.base = val ? this.bases : []
    },
    handleCheckAllSpecialChange(val) {
      this.form.special = val ? this.specials : []
    },
    
    //页面加载  先调详情接口渲染页面数据
    handleQuery(){
    	var _this = this
    	let query = this.$router.currentRoute.query
		let roleId = query.roleId		
      	detailRole({roleId:roleId}).then(res => { 		
      		//console.log(res)
      		_this.form = res.data
//			_this.bases = []
//			_this.specials = []
//			_this.form.base = []
//			_this.form.special = []
//			for(let i=0; i<res.data.crowdPermissions.length; i++){
//				if(res.data.crowdPermissions[i].type == 1){
//					_this.form.base.push(res.data.crowdPermissions[i].permissionName)
//					_this.bases.push(res.data.crowdPermissions[i])
//				}else if(res.data.crowdPermissions[i].type == 2){
//					_this.form.special.push(res.data.crowdPermissions[i].permissionName)
//					_this.specials.push(res.data.crowdPermissions[i])					
//				}
//			}
      	}).catch(error => {
      		console.log(error)
      	})
    }
  },
    mounted(){
		this.handleQuery()
   }
}
</script>

<style scoped lang="scss">
.form {
  margin: 40px 20px;
  .formInput {
    width: 600px;
  }
}
</style>