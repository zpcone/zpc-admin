<template>
  <div>
    <div class="m20">
      <p class="remain">SBU账户可用余额：￥{{ query.remainAmount }}</p>
      <p class="tip">账户余额1,000元以上部分才可以分配</p>
    </div>
    <div class="m20 center">
    	<el-button type="primary" :disabled="query.remainAmount < 1000" @click="confirm">确认分配</el-button>
    	<el-button type="warning" @click="back">返回</el-button>
    </div>
    <div class="m20">
    	<el-table :data="form.memberList" stripe border style="width: 100%" @selection-change="selectionChange">
    		<el-table-column prop="" label="" type="selection"></el-table-column>
         <el-table-column prop="userId" label="用户ID"></el-table-column>
         <el-table-column prop="userName" label="用户名"></el-table-column>
         <el-table-column prop="realName" label="真实姓名"></el-table-column>
         <el-table-column prop="userType" :formatter="typeFormat" label="SBU内身份"></el-table-column>
         <el-table-column label="分配金额（元）" width="180">
           <template slot-scope="scope">
             <!--<el-input v-on:input="inputNumCheck" maxlength="7" clearable style="width: 140px;" size="mini" v-model ="scope.row.distributeAmount" placeholder=""></el-input>-->
             <el-input type="number" step="0.01" :min="0" :max="0" style="width: 140px;" @change="numChange" size="mini" v-model ="scope.row.distributeAmount" placeholder=""></el-input>
           </template>
         </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getSbuMember,updateAmount } from '@/api/sbu'
  export default{
    data(){
      return{
      	amount: 0,
      	valNum: 0,
      	inputNum: true,
        remain: '',
        remainAmount: 0,
        selectionsArr: [],
        query: {},
        form: {
        	memberList: []
        }
      }
    },
    methods:{
//			inputNumCheck () {
//				let reg = new RegExp(/^[0-9]*$/)
//				for(let i=0;i<this.selectionsArr.length;i++){
//					if(!this.selectionsArr.distributeAmount){
//						return
//					}else{
//						if(!reg.test(this.selectionsArr[i].distributeAmount)){
//							this.inputNum = false
//						}else{
//							this.inputNum = true
//						}
//
//					}
//				}
//			},
			numChange (val){
				if(val<0){
          this.$message.error('不可输入负数')
				}
				this.valNum = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
				this.$message.warning('温馨提示：如有小数，系统会自动为你保留后2位小数！')
			},

      handleQuery(){
        if(this.$router.currentRoute.query){
          this.query = this.$router.currentRoute.query
        }
        if(this.query.id){
          this.getSbuMember()
        }else{
          this.back()
        }
      },
      selectionChange (selection) {
//    	console.log(selection)
      	this.selectionsArr = selection
      },
      getSbuMember(){
        getSbuMember({sbuId: this.query.id}).then(res => {
          var formData = res.data
					for(let i=0;i<formData.memberList.length;i++){
						if (formData.memberList[i].distributeAmount == 'null') {
							formData.memberList[i].distributeAmount = 0
						}
					}
					this.form = Object.assign(this.form, formData );
        })
      },
      typeFormat(row){
        if(row.userType == '1'){
          return '管理员'
        }else{
          return '普通成员'
        }
      },

      confirm () {
      	if(!this.selectionsArr.length){
		      		this.$message.warning('请勾选分配项！')
      	}else{
      		this.remainAmount = 0
      		for(let i=0;i<this.selectionsArr.length;i++){
      			if(!this.selectionsArr[i].distributeAmount){
	      				this.$message.warning('分配金额不能为空！')
			      		return
      			}else if(this.selectionsArr[i].distributeAmount <= 0){
	      				this.$message.warning('分配金额不能为0,并且不能为负数！')
			      		return
      			}else{
	    					let distributeAmount = this.selectionsArr[i].distributeAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
								this.remainAmount = this.remainAmount + Number(distributeAmount)
      			}
      		}
						let amount = this.query.remainAmount - 1000
						if(this.remainAmount > amount){
							this.$message.warning('分配金额不能大于账户余额的可分配部分！')
							return false
						}else{
							let obj = {}
							obj.id = this.query.id
							obj.memberList = []
							for(let k=0;k<this.selectionsArr.length;k++){
									let obj1 = {}
									obj1.userId = this.selectionsArr[k].userId
									obj1.id = this.selectionsArr[k].id
									obj1.sbuId = this.selectionsArr[k].sbuId
									obj1.userName = this.selectionsArr[k].userName
									obj1.realName = this.selectionsArr[k].realName
									obj1.distributeAmount = this.selectionsArr[k].distributeAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
									obj1.userType = this.selectionsArr[k].userType
									obj.memberList.push(obj1)
							}
							console.log(obj.memberList)
				        updateAmount(obj).then(res => {
					          if(res.status == 200){
					          	this.$message.success('分配成功！')
//					            this.$router.push('/sbu/vp')
					            //this.$router.go(-1)
					          }else if(res.status == 500){
					          	let errorMsg = res.errorMsg
					          	this.$message.warning(errorMsg)
					          }else{
					          	let users
					          }
				        })

						}
      	}
      },

//    confirm () {
//    	if(!this.selectionsArr.length){
//		      		this.$message.warning('请勾选分配项！')
//    	}else{
//    		this.remainAmount = 0
//    		for(let i=0;i<this.selectionsArr.length;i++){
//    			if(!this.selectionsArr[i].distributeAmount){
//	      				this.$message.warning('分配金额不能为空！')
//			      		return
//    			}else if(this.selectionsArr[i].distributeAmount < 0){
//	      				this.$message.warning('分配金额不能为负数！')
//			      		return
//    			}else{
//	    					let distributeAmount = this.selectionsArr[i].distributeAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
//								this.remainAmount = this.remainAmount + Number(distributeAmount)
//    			}
//    		}
//						let amount = this.query.remainAmount - 1000
//						if(this.remainAmount > amount){
//							this.$message.warning('分配金额不能大于账户余额的可分配部分！')
//							return false
//						}else{
//							let arr = []
//							for(let k=0;k<this.selectionsArr.length;k++){
//									let obj = {}
//									obj.userId = this.selectionsArr[k].userId
//									obj.sbuId = this.selectionsArr[k].sbuId
//									obj.userName = this.selectionsArr[k].userName
//									obj.realName = this.selectionsArr[k].realName
//									obj.distributeAmount = this.selectionsArr[k].distributeAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
//									obj.userType = this.selectionsArr[k].userType
//									arr.push(obj)
//							}
//				        updateAmount(arr).then(res => {
//					          if(res.status == 200){
//					          	this.$message.success('分配成功！')
////					            this.$router.push('/sbu/vp')
//					            this.$router.go(-1)
//					          }else if(res.status == 500){
//					          	let errorMsg = res.errorMsg
//					          	this.$message.warning(errorMsg)
//					          }
//				        })
//
//						}
//    	}
//    },
      back(){
        this.$router.go(-1)
      }
    },
    created(){
      this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>
