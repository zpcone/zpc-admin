<template>
  <section>
    <div class="m20">
      <p>修改SBU</p>
      <el-form ref="form" :model="form" label-width="160px" :rules="rules" style="width: 900px;">
        <el-form-item prop="sbuName" label="SBU名称">
          <el-input v-model="form.sbuName" :disabled="true" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="sbuDesc" label="SBU简介">
          <el-input v-model="form.sbuDesc" :disabled="true" type="textarea" :rows="5" placeholder="" resize="none"></el-input>
        </el-form-item>
        <el-form-item prop="accountPercent" label="SBU分账比例">
          <el-input-number v-model="form.accountPercent" :disabled="true"  :min="0" :max="100" label=""></el-input-number>
          <span style="font-size: 20px;margin: 0 15px;">%</span>
          <span style="font-size: 20px;margin: 0 15px;color: #666;">SBU成员分账比例：{{100-form.accountPercent}}</span>
        </el-form-item>
        <el-form-item prop="ruleList" label="规则管理">
          <div class="mb20">
            <el-button type="primary" icon="el-icon-plus" @click="addRuleClick">添加规则</el-button>
          </div>
          <div class="mb20">
            <el-table :data="form.ruleList" stripe border style="width: 100%">
              <el-table-column prop="" label="" type="index"></el-table-column>   
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table :data="props.row.sbuRuleList" border stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID" width="170"></el-table-column> 
                    <el-table-column prop="userName" label="用户名称"></el-table-column> 
                    <el-table-column prop="realName" label="真实名称"></el-table-column> 
                    <el-table-column prop="distributePercent" label="分账比例">
                      <template slot-scope="scope">
                        <span v-if="scope.row.distributePercent">{{scope.row.distributePercent}} %</span>
                        <span v-else>0 %</span>
                      </template>
                    </el-table-column>
                  </el-table>  
                </template>
              </el-table-column>   
              <el-table-column prop="ruleName" label="规则名" ></el-table-column>   
              <el-table-column prop="id" label="规则ID" width="170"></el-table-column>   
              <el-table-column prop="" label="操作" width="280">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-setting" @click="editRuleClick(scope.row)">修改规则</el-button>
                    <el-button size="mini" type="error" icon="el-icon-delete" @click="delRuleClick(scope.row)">删除规则</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item prop="" label="">
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="添加规则"
      :visible.sync="addRuleDlsg"
      width="50%">
      <div>
        <el-form ref="addForm" :model="addForm" label-width="140px">
          <el-form-item prop="ruleName" label="规则名称">
            <el-input v-model="addForm.ruleName" placeholder="请输入规则名称" style="width:30%" maxlength="10" clearable></el-input>
          </el-form-item>
          <el-form-item prop="sbuRuleList" label="分账比例">
            <el-table :data="addForm.sbuRuleList" border stripe style="width: 100%">
              <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>    
              <el-table-column prop="userName" label="用户名"></el-table-column>
              <el-table-column prop="realName" label="真实姓名"></el-table-column>
              <el-table-column prop="userType" :formatter="typeFormat" label="用户身份"></el-table-column>
              <el-table-column label="分账比例">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="20">
                      <!--<el-input type="number" :min="0" :max="100" style="width: 80px;" size="mini" v-model="scope.row.distributePercent" placeholder=""></el-input>-->
                      <el-input maxlength="3" v-on:input="inputNumCheck" @change="inputChangeOne" clearable style="width: 100px;" size="mini" v-model="scope.row.distributePercent"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <span>%</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRuleDlsg = false">取 消</el-button>
        <el-button type="primary" @click="saveAddRule">保存</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="修改规则"
      :visible.sync="changeRuleDlsg"
      width="50%">
      <div>
        <el-form ref="changeForm" :model="addForm" label-width="140px">
          <el-form-item prop="ruleName" label="规则名称">
            <el-input v-model="changeForm.ruleName" placeholder="请输入规则名称" style="width:30%" maxlength="10" disabled></el-input>
          </el-form-item>
          <el-form-item prop="sbuRuleList" label="分账比例">
            <el-table :data="changeForm.sbuRuleList" border stripe style="width: 100%">
              <el-table-column prop="userId" label="用户ID" width="170"></el-table-column>    
              <el-table-column prop="userName" label="用户名"></el-table-column>
              <el-table-column prop="realName" label="真实姓名"></el-table-column>
              <el-table-column prop="userType" :formatter="typeFormat" label="用户身份"></el-table-column>
              <el-table-column label="分账比例">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="20">
                      <!--<el-input type="number" :min="0" :max="100" style="width: 80px;" size="mini" v-model="scope.row.distributePercent" placeholder=""></el-input>-->
                      <el-input v-on:input="NumCheck" maxlength="3" @change="inputChangeTwo" clearable style="width: 100px;" size="mini" v-model="scope.row.distributePercent"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <span>%</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeRuleDlsg = false">取 消</el-button>
        <el-button type="primary" @click="saveChangeRule">保存</el-button>
      </span>
    </el-dialog>    
  </section>
</template>

<script>
  import {
    getSbuMember,
    editSbuMember,
    searchMember,
    getRules,//规则管理下面列表
    newRule,
    editRule,
    delRule
  } from '@/api/sbu'
  export default{
    data(){
      return{
        form: {
          sbuName: '',
          sbuDesc: '',
          accountPercent: 0,
          ruleList: []
        },
        rules:{},
        addRuleDlsg: false,
        changeRuleDlsg: false,
        addForm: {
          ruleName: '',
          sbuRuleList: [
          	{
          		deleteStatus: '',
          		distributePercent: '',
          		id: '',
          		lastUpd: '',
          		lastUpdBy: '',
          		mobile: '',
          		sbuId: '',
          		userId: '',
          		userName: '',
          		userType: ''
          	}
          ]
        },
        changeForm: {
        	id: '',
          ruleName: '',
          sbuRuleList: []
        },
        query: {
        	id: ''
        },
        isEdit: false,
        inputNum: false,
        numChecked: false,
        distributePercentSigle: '',
        changeDistributePercent: '',
        addDistributePercent: '',
        distributePercentNumChange: ''
      }
    },
    methods:{
			inputChangeOne (val) {
				if(this.inputNum == false){
					this.$message.warning('分配比例不能为小数！')
				}
			},
			inputChangeTwo (val) {
				if(this.numChecked == false){
					this.$message.warning('分配比例不能为小数！')
				}
			},    	
    	inputNumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				let distributePercent = ''
				for(let i=0;i<this.addForm.sbuRuleList.length;i++){
					distributePercent = this.addForm.sbuRuleList[i].distributePercent
				}				
				if(!reg.test(distributePercent)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}    		
    	},
    	NumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				let distributePercent = ''
				for(let i=0;i<this.changeForm.sbuRuleList.length;i++){
					distributePercent = this.changeForm.sbuRuleList[i].distributePercent
				}				
				if(!reg.test(distributePercent)){
					this.numChecked = false
				}else{
					this.numChecked = true
				}    		
    	},
      handleQuery(){
        if(this.$router.currentRoute.query){
          this.query = this.$router.currentRoute.query
        }
        if(this.query.id){
          this.getRulesBySbuId()//渲染详情和 规则下面的列表
          this.getSbuMember()//添加规则弹框中分配比列的列表
        }else{
          this.back()
        }
      },
      
    	//页面加载  渲染详情和 规则下面的列表
      getRulesBySbuId () {
	        getRules({sbuId: this.query.id}).then(res => {
	        	if(res.status == '200'){
	        		this.form = res.data
	        	}else if(res.status == '500'){
	        		this.$message(res.errorMsg)
	        	}
	        })
      },    	
    	
    	//页面加载  添加规则弹框中分配比列的列表
      getSbuMember () {
	        getSbuMember({sbuId: this.query.id}).then(res => {
		        	if(res.status == '200'){
		        		if(res.data.memberList.length){
		        			this.addForm.sbuRuleList = []
		        			this.changeForm.sbuRuleList = []
		        			for(let i=0;i<res.data.memberList.length;i++){
		        				if(!res.data.memberList[i].distributePercent){
		        					let obj = {}
		        					obj.createTime = res.data.memberList[i].createTime
		        					obj.deleteStatus = res.data.memberList[i].deleteStatus
		        					obj.id = res.data.memberList[i].id
		        					obj.lastUpd = res.data.memberList[i].lastUpd
		        					obj.mobile = res.data.memberList[i].mobile
		        					obj.sbuId = res.data.memberList[i].sbuId
		        					obj.userId = res.data.memberList[i].userId
		        					obj.userName = res.data.memberList[i].userName
		        					obj.userType = res.data.memberList[i].userType
		        					obj.distributePercent = 0
		        					this.addForm.sbuRuleList.push(obj)
		        					this.changeForm.sbuRuleList.push(obj)											
		        				}else{
		        					let obj1 = {}
		        					obj1.createTime = res.data.memberList[i].createTime
		        					obj1.deleteStatus = res.data.memberList[i].deleteStatus
		        					obj1.id = res.data.memberList[i].id
		        					obj1.lastUpd = res.data.memberList[i].lastUpd
		        					obj1.mobile = res.data.memberList[i].mobile
		        					obj1.sbuId = res.data.memberList[i].sbuId
		        					obj1.userId = res.data.memberList[i].userId
		        					obj1.userName = res.data.memberList[i].userName
		        					obj1.userType = res.data.memberList[i].userType
		        					obj1.distributePercent = res.data.memberList[i].distributePercent
		        					this.addForm.sbuRuleList.push(obj1)
		        					this.changeForm.sbuRuleList.push(obj1)					        					
		        				}
		        			}
		        		}
		        	}else if(res.status == '500'){
		        		this.$message(res.errorMsg)
		        	}	
	        })
      },    	

			//添加规则按钮
      addRuleClick () {
      	this.addRuleDlsg = true
      },
      
//			saveAddRule () {
//					if(!this.addForm.ruleName){
//						this.$message.warning('规则名称不能为空！')
//					}else{
//							this.addDistributePercent = 0
//						for(let i=0;i<this.addForm.sbuRuleList.length;i++){
//							if(this.addForm.sbuRuleList[i].distributePercent == undefined || this.addForm.sbuRuleList[i].distributePercent == ''){
//								this.$message.warning('分配比例不能为空！')
//								return
//							}else{
//								this.addForm.sbuRuleList[i].distributePercent = Number(this.addForm.sbuRuleList[i].distributePercent)
//								this.addDistributePercent += this.addForm.sbuRuleList[i].distributePercent
//							}
//						}
//						if(this.addDistributePercent > (100-this.form.accountPercent)){
//								let percent = 100-this.form.accountPercent
//								let message = '新的规则总比例不得超过'+ '【' + percent + '%' + '】'
//								this.$message.warning(message)
//						}else if(this.inputNum == false){
//								this.$message.warning('分配比例必须为正整数！')
//						}else{
//							newRule({
//								sbuId: this.query.id,
//								ruleName: this.addForm.ruleName,
//								sbuRuleList: this.addForm.sbuRuleList
//							}).then(res => {
//									if(res.status == '200'){
//										 this.$message.success('新增成功！')
//										 this.addRuleDlsg = false
//										 this.addForm.ruleName = ''
//										 if(this.addForm.sbuRuleList.length){
//											 	for(let i=0;i<this.addForm.sbuRuleList.length;i++){
//											 		this.addForm.sbuRuleList[i].distributePercent = ''
//											 	}
//										 }
//										 	this.getRulesBySbuId()
//									}else if(res.status == '500'){
//										this.$message.warning(res.errorMsg)
//										 this.addForm.ruleName = ''
//										 if(this.addForm.sbuRuleList.length){
//											 	for(let i=0;i<this.addForm.sbuRuleList.length;i++){
//											 		this.addForm.sbuRuleList[i].distributePercent = ''
//											 	}
//										 }
//									}
//							})
//						}
//					}
//			},      

			//添加规则确定按钮
			saveAddRule () {
					if(!this.addForm.ruleName){
						this.$message.warning('规则名称不能为空！')
					}else{
							this.addDistributePercent = 0
						for(let i=0;i<this.addForm.sbuRuleList.length;i++){
								this.addForm.sbuRuleList[i].distributePercent = Number(this.addForm.sbuRuleList[i].distributePercent)
								if(this.addForm.sbuRuleList[i].distributePercent < 0){
									this.$message.warning('分配比例不能为负数')
									return
								}
								this.addDistributePercent += this.addForm.sbuRuleList[i].distributePercent
						}
						if(this.addDistributePercent > (100-this.form.accountPercent)){
								let percent = 100-this.form.accountPercent
								let message = '新的规则总比例不得超过'+ '【' + percent + '%' + '】'
								this.$message.warning(message)
						}else if(this.addDistributePercent == 0){
							this.$message.warning('至少设置一项大于0的分配比例！')
						}else if(this.inputNum == false){
							this.$message.warning('分配比例必须为正整数')
						}else{
							newRule({
								sbuId: this.query.id,
								ruleName: this.addForm.ruleName,
								sbuRuleList: this.addForm.sbuRuleList
							}).then(res => {
									if(res.status == '200'){
										 this.$message.success('新增成功！')
										 this.addRuleDlsg = false
										 this.addForm.ruleName = ''
										 if(this.addForm.sbuRuleList.length){
											 	for(let i=0;i<this.addForm.sbuRuleList.length;i++){
											 		this.addForm.sbuRuleList[i].distributePercent = ''
											 	}
										 }
										 	this.getRulesBySbuId()
									}else if(res.status == '500'){
										this.$message.warning(res.errorMsg)
										 this.addForm.ruleName = ''
										 if(this.addForm.sbuRuleList.length){
											 	for(let i=0;i<this.addForm.sbuRuleList.length;i++){
											 		this.addForm.sbuRuleList[i].distributePercent = ''
											 	}
										 }
									}
							})
						}
					}
			}, 

      
			//修改规则按钮
      editRuleClick(row){
      	console.log(row)
      	this.changeForm.ruleName = row.ruleName
        this.changeRuleDlsg = true
        this.changeForm.id = row.id
      },	
      
      //修改规则弹框中的保存
			saveChangeRule () {
//				console.log(this.changeForm.sbuRuleList)
						this.distributePercentNumChange = 0
						this.distributePercentSigle = 100-this.form.accountPercent
						for(let i=0;i<this.changeForm.sbuRuleList.length;i++){
								let distributePercents = 0
								distributePercents = Number(this.changeForm.sbuRuleList[i].distributePercent)
								if(distributePercents < 0){
									this.$message.warning('分配比例不能为负数')
									return
								}
								this.distributePercentNumChange += distributePercents
					  }
						if(this.distributePercentSigle < this.distributePercentNumChange){
								let percent = '剩余可分配比例'+ '【' + this.distributePercentSigle + '%' + '】'
								this.$message.warning(percent)								
						}else if(this.distributePercentNumChange == 0){
								this.$message.warning('至少设置一项大于0的分配比例！')
						}else if(this.numChecked == false){
							this.$message.warning('分配比例必须为正整数')
						}else{
							editRule({
								id: this.changeForm.id,
								sbuId: this.query.id,
								ruleName: this.changeForm.ruleName,
								sbuRuleList: this.changeForm.sbuRuleList
							}).then(res => {
									if(res.status == '200'){
										 this.$message.success('修改成功！')
										 this.changeRuleDlsg = false
										 this.changeForm.ruleName = ''
										 this.getSbuMember()
										 this.getRulesBySbuId()
									}else if(res.status == '500'){
										this.$message.warning(res.errorMsg)
									}
							})								
						}
			},      


//6.26晚测试3参数用
//			saveChangeRule () {
//						this.distributePercentNumChange = 0
//						this.distributePercentSigle = 100-this.form.accountPercent
//						for(let i=0;i<this.changeForm.sbuRuleList.length;i++){
//							if(!this.changeForm.sbuRuleList[i].distributePercent){
//								this.$message.warning('分配比例不能全部为0')
//								return
//							}else{
//								let distributePercents = ''
//								distributePercents = Number(this.changeForm.sbuRuleList[i].distributePercent)
//								if(distributePercents < 0){
//									this.$message.warning('分配比例不能为负数')
//									return
//								}
//								this.distributePercentNumChange += distributePercents
//							}
//					  }
//						if(this.distributePercentSigle < this.distributePercentNumChange){
//								let percent = '剩余可分配比例'+ '【' + this.distributePercentSigle + '%' + '】'
//								this.$message.warning(percent)								
//						}else if(this.distributePercentNumChange == 0){
//								this.$message.warning('至少设置一项大于0的分配比例！')
//						}else if(this.numChecked == false){
//							this.$message.warning('分配比例必须为正整数')
//						}else{
//							let arr = []
//							for(let i=0;i<this.changeForm.sbuRuleList.length;i++){
//								let obj={}
//								obj.id = this.changeForm.sbuRuleList[i].id
//								obj.sbuId = this.changeForm.sbuRuleList[i].sbuId
//								obj.userId = this.changeForm.sbuRuleList[i].userId
//								obj.distributePercent = this.changeForm.sbuRuleList[i].distributePercent
//								arr.push(obj)
//							}
//							editRule({
//								id: this.changeForm.id,
//								sbuId: this.query.id,
//								ruleName: this.changeForm.ruleName,
//								sbuRuleList: arr
//							}).then(res => {
//									if(res.status == '200'){
//										 this.$message.success('修改成功！')
//										 this.changeRuleDlsg = false
//										 this.changeForm.ruleName = ''
//										 this.getSbuMember()
//										 this.getRulesBySbuId()
//									}else if(res.status == '500'){
//										this.$message.warning(res.errorMsg)
//									}
//							})								
//						}
//			},     


      back(){
        this.$router.go(-1)
      },


      typeFormat(row){
        if(row.userType == '1'){
          return '管理员'
        }else{
          return '普通成员'
        }
      },

		aa () {
			let arr1 = [
				{name:'zs',age:'1',id:'1111111111'},
				{name:'ls',age:'2',id:'2222222222'},
				{name:'ww',age:'3',id:'3333333333'}
			]
			let arr2 = [
				{name:'zs',age:'1',id:'1111111111'},
				{name:'ls',age:'2',id:'2222222222'},
				{name:'ww',age:'3',id:'3333333333'},
				{name:'hh',age:'4',id:'4444444444'},
				{name:'gg',age:'5',id:'5555555555'},
			]
		},




      delRuleClick(row){
        delRule({ruleId: row.id, sbuId: row.sbuId}).then(res => {
        		if(res.status == '200'){
        			this.$message.success('删除成功！')
        			this.getRulesBySbuId()
        		}else if(res.status == '500'){
	        		this.$message.warning(res.errorMsg)
	        	}
        })
      },
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