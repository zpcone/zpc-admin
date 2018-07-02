<template>
	<div class="form">
		<el-form disabled v-model="form" ref="form" label-width="140px">
			<el-form-item prop="name" label="角色名称">
				<el-input class="formInput" disabled v-model="form.name" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="roleId" label="角色ID">
				<el-input class="formInput" disabled v-model="form.roleId" placeholder=""></el-input>
			</el-form-item>
			<el-form-item prop="description" label="角色简介">
				<el-input class="formInput" type="textarea" disabled v-model="form.description" placeholder="最多输入100个字" maxlength="100" resize="none" clearable></el-input>
			</el-form-item>
			<!--<el-form-item prop="permissionName" label="基本权限">
				<el-checkbox  disabled v-model="checkAllBase" @change="handleCheckAllBaseChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group disabled v-model="form.base" @change="handleBaseChange">
					<el-checkbox v-for="(item,index) in bases" :label="item.permissionName" :key="index"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item prop="permissionName" label="特殊权限">
				<el-checkbox  disabled v-model="checkAllSpecial" @change="handleCheckAllSpecialChange">全选</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group disabled v-model="form.special" @change="handleSpecialChange">
					<el-checkbox v-for="(item,index) in specials" :label="item.permissionName" :key="index"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>-->
			<el-form-item>
				<el-button type="info" @click="back">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { detailRole } from '@/api/circle/permession'
export default {
  data() {
    return {
      form: {
        name: '',
        roleId: '',
        description: '',
        base: [],
        special: []
      },
      checkAllBase: true,
      bases: [
//      '预览',
//      '查询',
//      '编辑',
//      '删除',
//      '邀请进群',
//      '推送',
//      '发言',
//      '私信',
//      '语音',
//      '发短视频',
//      '发许愿灯'
      ],
      checkAllSpecial: true,
      specials: [
//      '修改圈信息',
//      '审核',
//      '警告',
//      '踢人',
//      '不被踢',
//      '设置黑名单',
//      '设置行为会员永久权',
//      '设置行为会员月时长',
//      '设置行为会员日时长',
//      '设置联席群主',
//      '发起重选群主'
      ]
    }
  },
  methods: {
    create() {
      this.$message.success('创建成功')
      this.$router.push('/circlemanage/permession/role')
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
    handleQuery(){
    	var _this = this
    	let query = this.$router.currentRoute.query
		let roleId = query.roleId		
      	detailRole({roleId:roleId}).then(res => {
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