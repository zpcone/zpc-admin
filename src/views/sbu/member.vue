<template>
  <section>
    <div class="m20">
      <p>修改SBU</p>
      <el-form ref="form" :model="form" label-width="160px" :rules="rules" style="width: 900px;">
        <el-form-item prop="sbuName" label="SBU名称">
          <el-input v-model="form.sbuName" min="2" max="25" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item prop="sbuDesc" label="SBU简介">
          <el-input v-model="form.sbuDesc" type="textarea" :rows="3" placeholder="请输入SBU简介（最多150字）" maxlength="150" resize="none"></el-input>
        </el-form-item>
        <el-form-item prop="accountPercent" label="SBU分账比例">
          <el-input class="w40" type="number" v-model="form.accountPercent"  :disabled="true" :min="0" :max="100" label=""></el-input>
          <span style="font-size: 20px;margin: 0 15px;">%</span>
          <span style="font-size: 20px;margin: 0 15px;color: #666;">SBU成员分账比例：{{100-form.accountPercent}}</span>
        </el-form-item>
        <el-form-item style="margin:30px 0;">
          <el-button type="success" @click="saveSbu">保存</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>        
        <el-form-item prop="memberList" label="添加成员：">
          <div class="mb20">
            <el-button type="primary" icon="el-icon-plus" @click="addMemberDlsg = true">添加成员</el-button>
          </div>
          <div class="mb20">
            <el-table :data="form.memberList" stripe border style="width: 100%">
              <el-table-column prop="" label="" type="index"></el-table-column>   
              <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>   
              <el-table-column prop="userName" label="用户名" ></el-table-column>   
              <el-table-column prop="realName" label="真实姓名" ></el-table-column>   
              <el-table-column prop="userType" :formatter="typeFormat" label="成员身份"></el-table-column>
              <el-table-column prop="" label="" width="280">
                <template slot-scope="scope">
                    <el-button size="mini" type="error" icon="el-icon-delete" @click="delMemFromSbu(scope.$index,scope.row)">删除成员</el-button>
                    <!--<el-button size="mini" type="primary" icon="el-icon-setting" @click="setMember(scope.$index,scope.row)">设为管理员</el-button>-->
                    <el-button size="mini" type="primary" icon="el-icon-setting" @click="setMember(scope.$index,scope.row)">设为管理员</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>

      </el-form>
    </div>
    <el-dialog
      title="添加成员"
      :visible.sync="addMemberDlsg"
      width="30%">
      <div>
        <el-tabs class="mb20" v-model="addTab">
          <el-tab-pane label="姓名" name="name">
            <el-input v-model="addForm.userName" placeholder="" class="w40"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getUsers('1')">搜索</el-button>
          </el-tab-pane>
          <el-tab-pane label="手机号" name="phone">
            <!--<el-input v-model="addForm.mobile" placeholder="" class="w40"></el-input>-->
            <el-input v-model="addForm.mobile" placeholder="" v-on:input="inputNumCheck" maxlength="11" clearable class="w40"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getUsers('2')">搜索</el-button>
          </el-tab-pane>
        </el-tabs>
        <div class="mb20">
          <el-table :data="users" border stripe style="width: 100%">
            <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>  
            <el-table-column prop="userName" label="用户名"></el-table-column>  
            <el-table-column prop="realName" label="真实姓名"></el-table-column>  
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="" label="">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="addMemToSbu(scope.$index,scope.row)">添加</el-button>  
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMemberDlsg = false">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import {
    getSbuMember,
    editSbuMember,
    searchMember,
    sbuNewMembers,
    deleteMembers,//删除成员
    setMembers//设置管理员
  } from '@/api/sbu'
  export default{
    data(){
      return{
      	inputNum: false,
      	seaMmemberList: [],
        form: {
          sbuName: '',
          sbuDesc: '',
          accountPercent: 0,
          memberList: []
        },
        rules:{
          sbuName: [
            {
              required: true, message: 'SBU名称不能为空', trigger: 'blur'
            },
          ],
          accountPercent: [{ required: true, message: '分账比例不得为空', trigger: 'blur' }]
        },
        users: [],
        addMemberDlsg: false,
        addTab: 'name',
        addForm: {
          userName: 'zhangsan',
          mobile: ''
        },
        query: {}
      }
    },
    methods:{
			inputNumCheck () {
//				let reg = new RegExp(/^[0-9]*$/)
				let reg = new RegExp(11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/)
				if(!reg.test(this.addForm.mobile)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}
			},
    	//添加按钮  老版  6.12之前
//    addMemToSbu(index,row){
//      row.accountPercent = 0
//      let flag = true
//      for(let i=0;i<this.form.memberList.length;i++){
//        if(row.userId === this.form.memberList[i].userId){
//          flag = false
//          break
//        }
//      }
//      if(flag){
//      	let rowObj = {}
//      	rowObj.deleteStatus = '1'
//      	rowObj.mobile = row.mobile
//      	rowObj.userId = row.userId
//      	rowObj.userName = row.userName
//        this.seaMmemberList.push(rowObj)
//        this.form.memberList.push(row)
//        console.log('添加')
//        console.log(this.seaMmemberList)
//      }else{
//        this.$message.error("您已经添加过该成员")
//      }
//      this.users.splice(index,1)
//    },
      //添加按钮  新版  6.12之后
      addMemToSbu(index,row){
      	let obj = row
      	obj.sbuId = this.query.id
					sbuNewMembers(obj).then(res => {
						if(res.status == '200'){
							if(res.data == true && res.status == '200'){
										this.addMemberDlsg = false
										this.getSbuMember()
							}
						}
					})
      },
      //成员身份筛选
      typeFormat(row){
        if(row.userType == '1'){
          return '管理员'
        }else if(row.userType == '2'){
          return '普通成员'
        }
      },
      //删除成员
      delMemFromSbu(index,row){
      	console.log(row)
      	if(row.userType == '1'){
	      		this.$message.warning('管理员不可删除！')
      	}else{
      		//this.form.memberList.splice(index,1)
		      	let obj = {}
		      	obj.id = row.id
		      	obj.sbuId = row.sbuId
		      	obj.userId = row.userId
		      	deleteMembers(obj).then(res => {
								if(res.data == true && res.status == '200'){
									this.$message.success('删除成功！')
									this.getSbuMember()
								}else{
									this.$message.warning('删除失败！')
								}
		      	})
      	}
      },
      //设为管理员
      setMember(index,row){
      	console.log(row)
      	//this.form.memberList[index].userType = '1'
        if(row.userType == '1'){
          this.$message.warning('该成员已经是管理员')
        }else{
        	for(let i=0;i<this.form.memberList.length;i++){
        		if(this.form.memberList[i].userType == '1'){
        			this.$message.error('只能有一个管理员！')
        			return
        		}
        	}
		      	let obj = {}
		      	obj.id = row.id
		      	obj.sbuId = row.sbuId
		      	obj.userId = row.userId
		      	setMembers(obj).then(res => {
								if(res.data == true && res.status == '200'){
										this.$message.success('设置成功！')
										this.getSbuMember()
								}else{
									this.$message.warning('设置失败！')
								}
		      	})        	
        }
      },
      //添加成员弹框中的 用户名或者手机的搜索按钮
      getUsers(flag){
        if(flag === '1'){
          this.addForm.mobile = ''
          if(this.addForm.userName){
            this.searchMember()
          }else{
            this.$message.warning('请输入用户名进行查找')
          }
        }else if(flag === '2'){
          this.addForm.userName = ''
          if(this.inputNum == false){
      		this.$message.warning('请输入正确的手机号')          	
          }else{
          	this.searchMember()
          }
        }
      },
      // 添加成员-搜索成员 接口
      searchMember () {
        searchMember(this.addForm).then(res => {
          if(res){
            this.users = res.data.data
          }
        })
      },
      //保存按钮
      saveSbu(){
        this.$refs.form.validate((valid) => {
          if(valid){
            if(this.form.memberList.length){
              editSbuMember({
                id: this.query.id,
                //sbuName: this.form.sbuName,2018.06.13 接口修改 不需要传name
                sbuDesc: this.form.sbuDesc,
                accountPercent: this.form.accountPercent,
                //memberList: this.form.memberList
                //memberList: this.seaMmemberList 2018.06.13 接口修改 不需要传
              }).then(res => {
                if(res.status == '200'){
									this.$message.success('修改成功！')
                  this.back()
                }
              }).catch(err => {
                this.$message.error(err)
              })
            }else{
              this.$message.warning('请添加成员')
              return false
            }
          }else{
            return false
          }
        })
      },
      back(){
        this.$router.go(-1)
      },
      handleQuery (){
        if(this.$router.currentRoute.query){
          this.query = this.$router.currentRoute.query
        }
        if(this.query.id){
          this.getSbuMember()          
        }else{
          this.back()
        }
      },
      getSbuMember () {
        getSbuMember({sbuId: this.query.id}).then(res => {
          this.form = res.data
          if(!this.form.accountPercent){
            this.form.accountPercent = '0'
          }
        })
      }
    },
    created(){
      this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
  .w40{
    width: 300px;
    margin-right: 20px;
  }
</style>