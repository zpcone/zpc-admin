<template>
  <section>
    <div class="m20">
      <p>新增SBU</p>
    	<el-form ref="form" :model="form" label-width="160px" :rules="rules" style="width: 900px;">
    	  <el-form-item prop="sbuName" label="SBU名称">
          <el-input v-model="form.sbuName" min="2" max="25" placeholder="" maxlength="8" clearable></el-input>
    	  </el-form-item>
    	  <el-form-item prop="sbuDesc" label="SBU简介">
    	    <el-input v-model="form.sbuDesc" type="textarea" :rows="3" placeholder="请输入简介（最多150字）" resize="none" maxlength="150"></el-input>
    	  </el-form-item>
    	  <el-form-item prop="accountPercent" label="SBU分账比例">
    	    <el-input-number v-model="form.accountPercent"  :min="0" :max="100" label=""></el-input-number>
    	    <span style="font-size: 20px;margin: 0 15px;">%</span>
    	    <span style="font-size: 20px;margin: 0 15px;color: #666;">SBU成员分账比例：{{100-form.accountPercent}}</span>
    	  </el-form-item>
    	  <el-form-item prop="memberList" label="添加成员">
    	    <div class="mb20">
    	    	<el-button type="primary" icon="el-icon-plus" @click="addMemberDlsg = true">添加成员</el-button>
    	    </div>
    	    <div class="mb20">
    	    	<el-table :data="form.memberList" stripe border style="width: 100%">
    	    	  <el-table-column prop="" label="" type="index"></el-table-column>   
    	    	  <el-table-column prop="userId" label="用户ID" ></el-table-column>   
    	    	  <el-table-column prop="userName" label="用户名" ></el-table-column>   
    	    	  <el-table-column prop="realName" label="真实姓名" ></el-table-column>   
    	    	  <el-table-column prop="userType" :formatter="typeFormat" label="成员身份"></el-table-column>
              <el-table-column prop="" label="" width="280">
                <template slot-scope="scope">
                    <el-button size="mini" type="error" icon="el-icon-delete" @click="delMemFromSbu(scope.$index,scope.row)">删除成员</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-setting" @click="setMember(scope.$index,scope.row)">设为管理员</el-button>
                </template>
              </el-table-column>
    	    	</el-table>
    	    </div>
    	  </el-form-item>
    	  <el-form-item>
    	    <el-button type="success" @click="saveSbu">保存</el-button>
    	    <el-button @click="back">返回</el-button>
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
            <el-input v-model="addForm.mobile" placeholder="" v-on:input="inputNumCheck" maxlength="11" clearable class="w40"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getUsers('2')">搜索</el-button>
          </el-tab-pane>
        </el-tabs>
        <div class="mb20">
          <el-table :data="users" border stripe style="width: 100%">
            <el-table-column prop="userId" label="用户ID"></el-table-column>  
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
  import {newSbu,editSbuMember,searchMember} from '@/api/sbu'
  export default{
    data(){
      return{
      	inputNum: false,
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
          accountPercent: [{ type: 'number', required: true, message: '分账比例不得为空', trigger: 'blur' }]
        },
        users: [],
        addMemberDlsg: false,
        addTab: 'name',
        addForm: {
          userName: 'zhangsan',
          mobile: ''
        }
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
      addMemToSbu(index,row){
        let flag = true
        for(let i=0;i<this.form.memberList.length;i++){
          if(row.userId === this.form.memberList[i].userId){
            flag = false
            break
          }
        }
        if(flag){
          row.userType = '2'
          this.form.memberList.push(row)
        }else{
          this.$message.error("您已经添加过该成员")
        }
        this.users.splice(index,1)
      },
      typeFormat(row){
        if(row.userType == '1'){
          return '管理员'
        }else{
          return '普通成员'
        }
      },
      delMemFromSbu(index,row){
        this.form.memberList.splice(index,1)
      },
      setMember(index,row){
        if(row.userType == '1'){
          this.$message.warning('该成员已经是管理员')
        }else{
          // TODO
          this.form.memberList[index].userType = '1'
          console.log(this.form.memberList[index])
          this.$message.success('设置管理员成功')
        }
      },
      getUsers(flag){
      		if(flag === '1'){
      		  this.addForm.mobile = ''
      		  if(this.addForm.userName){
      		    this.searchMember()
      		  }else{
      		    this.$message.warning('请输入用户名进行查找')
      		  }
      		}else if(flag === '2'){
      			if(this.inputNum == false){
      				this.$message.warning('请输入正确的手机号')
      			}else{
      				this.addForm.userName = ''
      				if(this.addForm.mobile){
      				  this.searchMember()
      				}else{
      				  this.$message.warning('请输入手机号进行查找')
      				}
      			}
      		}
      	
      },
      searchMember(){
        searchMember(this.addForm).then(res => {
          if(res){
            console.log(res)
            this.users = res.data.data
          }
        })
      },
      saveSbu(){
        this.$refs.form.validate((valid) => {
          if(valid){
            if(this.form.memberList.length){
              newSbu(this.form).then(res => {
                if(res){
                  this.$router.go(-1)
                  console.log(res)
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .w40{
    width: 300px;
    margin-right: 20px;
  }
</style>