<template>
  <section>
    <div class="m20" style="text-align: right;">
      <el-button type="primary" icon="el-icon-plus" @click="create">新增SBU</el-button>
      <div style="float: left;font-family: 'arial narrow';font-weight: 700;font-size: 20px;">
      	SBU 总数：{{ sbuSumNumber }}
      </div>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="id" label="SBU ID：">
          <!--<el-input v-model="form.id" placeholder=""></el-input>-->
          <el-input v-model.trim="form.id" style="width:210px" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item prop="sbuName" label="SBU名称：">
          <el-input v-model="form.sbuName" placeholder="" maxlength="10" style="width:200px" clearable></el-input>
        </el-form-item>
        <!--<el-form-item prop="" label="商品ID：">
          <el-input v-model="form.sbu" placeholder=""></el-input>
        </el-form-item>-->
        <!--<el-form-item prop="" label="商品名称：">
          <el-input v-model="form.sbu" placeholder=""></el-input>
        </el-form-item>-->
        <el-form-item prop="supplierId" label="供应商ID：">
          <!--<el-input v-model="form.supplierId" placeholder=""></el-input>-->
          <el-input v-model.trim="form.supplierId" style="width:210px" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商名称：">
          <el-input v-model="form.supplierName" placeholder="" maxlength="10" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item prop="adminId" label="管理员ID：">
          <!--<el-input v-model="form.adminId" placeholder=""></el-input>-->
          <el-input v-model.trim="form.adminId" v-on:input="inputNumCheck" style="width:210px" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item prop="adminName" label="管理员名称：">
          <el-input v-model="form.adminName" placeholder="" maxlength="10" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item prop="sortRule" label="排序：">
          <el-select v-model="form.sortRule" placeholder="请选择"  @change="sortChange" clearable>
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="accountStatus" label="状态：">
          <el-radio-group v-model="form.accountStatus">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">禁用</el-radio-button>
            <el-radio-button label="1">正常</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="display: block;text-align: center;margin: 20px auto;">
          <el-button type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button type="primary" icon="el-icon-setting" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
    	<span>当前选中{{chooseLen}}项</span>
    	<el-button type="primary" @click="setAccount">设置透支额度</el-button>
    </div>
    <div class="m20">
      <el-table :data="data" stripe border style="width: 100%" @selection-change="selectionChange">
        <el-table-column label="" type="selection"></el-table-column>
        <el-table-column prop="id" label="SBU ID" width="170"></el-table-column>
        <el-table-column prop="sbuName" label="SBU 名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="adminName" label="管理员"></el-table-column>
        <el-table-column prop="remainAmount" label="余额（豆）"></el-table-column>
        <!--<el-table-column prop="frozenAmount" label="冻结金额（豆）"></el-table-column>-->
        <el-table-column prop="sumOverAmount" label="总透支额度（豆）"></el-table-column>
        <el-table-column prop="surplusOverAmount" label="剩余透支额度（豆）"></el-table-column>
        <el-table-column prop="accountStatus" label="账户状态" :formatter="statusFor"></el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width="380">
          <template slot-scope="scope">
            <div class="btnGroup">
              <el-button size="mini" v-if="scope.row.accountStatus == '1'" type="danger" @click="diableSbu(scope.row)">禁用</el-button>
              <el-button size="mini" v-if="scope.row.accountStatus == '0'" type="success" @click="enableSbu(scope.row)">解禁</el-button>
              <!--<el-button size="mini" type="danger" v-if="scope.row.remainAmount > 0" @click="frozen(scope.row)">冻结</el-button>
              <el-button size="mini" type="success" v-if="scope.row.frozenAmount > 0" @click="unfrozen(scope.row)">解冻</el-button>-->
              <el-button size="mini" type="primary" @click="manageMember(scope.row)">成员管理</el-button>
              <el-button size="mini" type="success" @click="manageAssign(scope.row)">分配收益</el-button>
              <el-button size="mini" type="warning" @click="manageRule(scope.row)">规则管理</el-button>
              <el-button size="mini" type="primary" @click="manageRecord(scope.row)">查看分配记录</el-button>
              <el-button size="mini" type="info" @click="manageProduct(scope.row)">查看供应商及分配规则</el-button>
              <!--<el-button size="mini" type="info" @click="setOverLimit(scope.row)">设置透支额度</el-button>-->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

			<div class="pagination center">
				<el-pagination
				  @current-change="handleCurrentChange"
				  :current-page.sync="form.pageNumber"
				  :page-size="form.pageSize"
				  layout="total, prev, pager, next"
				  :total="totalSize">
				</el-pagination>
			</div>

    <el-dialog
      title="设置透支额度"
      :visible.sync="setMoneyDlsg"
      width="20%">
      <div>
        <el-form ref="setForm" :model="setForm" label-width="140px">
          <el-form-item prop="sumOverAmount" label="透 支 金 额：">
            <el-input v-model="setForm.sumOverAmount" placeholder="请输入透支金额" style="width:100%" maxlength="6" v-on:input="inputCheck" clearable></el-input>
          </el-form-item>
          <p style="margin-left: 8px;color: #C7C9CB;">温馨提示：设置的透支额度不能低于或等于所选的总透支额度</p>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setMoneyDlsg = false">取 消</el-button>
        <el-button type="primary" @click="saveClick">保存</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="提示"
      :visible.sync="setFrozenDlsg"
      width="20%">
      <div>
        <el-form ref="frozenForm" :model="frozenForm" label-width="140px">
          <el-form-item prop="frozenAmount" label="请输入冻结金额：">
            <el-input v-model="frozenForm.frozenAmount" placeholder="请输入冻结金额" style="width:100%" maxlength="6" v-on:input="inputCheck" clearable></el-input>
          </el-form-item>
          <p style="margin-left: 8px;color: #C7C9CB;">温馨提示：设置的冻结金额不能超过余额</p>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setFrozenDlsg = false">取 消</el-button>
        <el-button type="primary" @click="saveFrozenClick">保存</el-button>
      </span>
    </el-dialog>    



  </section>
</template>

<script>
//import { searchList, disableSbu, enableSbu, frozenSbu, unfrozenSbu, setOverCount, sbuNum } from '@/api/sbu'
  import { searchList, disableSbu, enableSbu, setOverCount, sbuNum } from '@/api/sbu'

  export default{
    data(){
      return{
      	frozenForm: {
      		frozenAmount: '',
      		id: ''
      	},
      	setFrozenDlsg: false,
      	setMoneyDlsg: false,
      	setForm: {
      		sumOverAmount: ''
      	},
      	sbuSumNumber: '',
      	inputNum: true,
      	inputNumChecks: true,
        form: {
          pageSize: 10,
          pageNumber: 1,
          id: '',
          sbuName: '',
          supplierId: '',
          supplierName: '',
          adminId: '',
          adminName: '',
          sortStatus: '',
          accountStatus: '',
          sortRule: ''
        },
        sorts: [
          {
            label: '按创建时间排序',
            value: '-1'
          }
        ],
        data: [],
        chooseLen: 0,
        totalSize: '',
        currentPage: 1,
        selectionIds: [],
        sumOverAmount: '',
        remainAmount: ''
      }
    },
    methods:{
    	sortChange (val) {
    		this.form.sortRule = val
    	},
    	
    	statusFor (row) {
    		if(row.accountStatus == '1'){
    			return '正常'
    		}else if(row.accountStatus == '0'){
    			return '禁用'
    		}
    	},

			inputNumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				if(!reg.test(this.form.id) || !reg.test(this.form.supplierId) || !reg.test(this.form.adminId)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}
			},
			inputCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				if(!reg.test(this.setForm.sumOverAmount) || !reg.test(this.frozenForm.frozenAmount)){
					this.inputNumChecks = false
				}else{
					this.inputNumChecks = true
				}
			},

      // 搜索
      search(name){
      	if(this.inputNum == false){
      		this.$message.warning('ID类必须为数字！')
      	}else{
      		this.getList()
      	}
      },
      // 重置
      resetSearch(name){
        this.$refs.form.resetFields()
      },
      // 新建
      create(){
        this.$router.push({
          path: '/sbu/new'
        })

      },
      //成员管理
      manageMember(row){
        this.$router.push({
          path: '/sbu/member',
          query:{
            id:row.id
          }
        })
      },
      // 立即分配
      manageAssign (row) {
      	if(row.accountStatus == '0'){
      		this.$message.warning('该SBU已被禁用，不可进行分配')
      	}else{
      		this.$router.push({
      		  path: '/sbu/assign',
      		  query:{
      		    id:row.id,
      		    remainAmount: row.remainAmount
      		  }
      		})
      	}
      },
      // 规则管理
      manageRule(row){
        this.$router.push({
          path: '/sbu/rule',
          query:{
            id:row.id
          }
        })
      },
      // 分配记录
      manageRecord(row){
        this.$router.push({
          path: '/sbu/detail',
          query:{
            id:row.id
          }
        })
      },
      // 查看供应商
      manageProduct(row){
        this.$router.push({
          path: '/sbu/prolist',
          query:{
            id:row.id,
            sbuName: row.sbuName
          }
        })
      },
      // 解禁
      enableSbu(row){
        this.$confirm('您将解禁已选中的SBU，是否确认？','提示').then(() => {
          enableSbu({id:row.id}).then(res => {
            if(res.status == 200){
              row.accountStatus = '1'
              this.search()
              this.$message.success("解禁成功！")
            }else{
              this.$message.warning(res.errorMsg)
            }
          })
        }).catch(() => {

        })
      },
      //禁用
      diableSbu(row){
        this.$confirm('您将禁用已选中的SBU，是否确认？','提示').then(() => {
          disableSbu({id:row.id}).then(res => {
            if(res.status == 200){
              row.accountStatus = 0
              this.search()
              this.$message.success("禁用成功！")
            }else{
              this.$message.warning(res.errorMsg)
            }
          })
        }).catch(() => {

        })

      },
      
      //冻结按钮
      frozen (row) {
      	if(row.remainAmount > 0){
      		this.frozenForm.id = row.id
      		this.remainAmount = row.remainAmount
      		this.setFrozenDlsg = true
      	}else{
      		this.$message.warning('您选择的账户无可冻结的余额，请重新选择，谢谢！')
      	}
      },
      
      //冻结弹框按钮
      saveFrozenClick () {
      	if(this.inputNumChecks == false){
      		this.$message.warning('金额必须为正整数！')
      	}else if(this.frozenForm.frozenAmount == ''){
      		this.$message.warning('冻结金额不能为空！')
      	}else if(this.frozenForm.frozenAmount > this.remainAmount){
      		this.$message.warning('冻结金额不能超过余额！')
      	}else{
          frozenSbu(this.frozenForm).then(res => {
            if(res.status == '200'){
            	this.$message.success('冻结成功！')
            	this.setFrozenDlsg = false
              this.search()
            }else{
            	this.$message.warning(res.errorMsg)
            }
          })      		
      	}
      },
      // 解冻
      unfrozen(row){
        // dlsg input
        let frozenAmount = Number(row.frozenAmount)
        if(frozenAmount > 0){
          this.$prompt('请输入解冻金额（元）','提示',{
            inputValidator: function(val){
              // 必须为数字 TODO
              if(val.value > frozenAmount){
                return false
              }else{
                return true
              }
            },
            inputErrorMessage: '不能超过冻结余额'
          }).then((val) => {
            if(val.value){
              unfrozenSbu({id: row.id, frozenAmount: val.value}).then(res => {
                if(res){
                  console.log(res)
                  this.search()
                }
              })
            }else{
              this.$message.warning('请输入解冻金额')
            }
          }).catch(() => {

          })
        }else{
          this.$message.warning('您选择的账户无可解冻的余额，请重新选择，谢谢！')
        }

      },
      selectionChange(selection){
	        this.chooseLen = selection.length
	        this.selectionIds = []
	        for(let i=0;i<selection.length;i++){
	        	this.selectionIds.push(selection[i].id)
	        	this.sumOverAmount = selection[i].sumOverAmount
	        }
      },
      // 设置透支额度
      setAccount(){
        if(this.chooseLen == 0){
        	this.$message.warning('请选择一项')
        }else if(this.chooseLen > 1){
          this.$message.warning('只能选择一项')
        }else{
        	this.setMoneyDlsg = true
        }
      },

    	//设置透支额度确定按钮
      saveClick () {
      	this.setForm.sumOverAmount = this.setForm.sumOverAmount + '.00'
      	if(this.inputNumChecks == false){
      			this.$message.warning('透支额度必须为正整数！')
      	}else if(!this.setForm.sumOverAmount){
     				this.$message.warning('透支额度不能为空，可设置0！')
      	}else if(this.setForm.sumOverAmount <= this.sumOverAmount){
      		this.$message.warning('设置的透支额度不能低于总透支额度')
      	}else{
	      		var str = Array.from(this.selectionIds)
	          setOverCount({id: String(this.selectionIds), sumOverAmount:this.setForm.sumOverAmount}).then( res => {
	          	if(res.status == '200'){
	          		this.$message.success('设置成功！')
	          		this.setMoneyDlsg = false
	          		this.setForm.sumOverAmount = ''
	            	this.search()
	          	}else if(res.status == '500'){
	          		this.$message.error(res.errorMsg)
	          	}
	          }).catch(err => {
	//          this.$message.error(err)
	          })
      	}
      },

			handleCurrentChange (val) {
				console.log(val)
				this.form.pageNumber = val
				this.getList()
//				let obj = {}
//				obj.id = this.form.id
//				obj.sbuName = this.form.sbuName
//				obj.supplierId = this.form.supplierId
//				obj.supplierName = this.form.supplierName
//				obj.adminId = this.form.adminId
//				obj.adminName = this.form.adminName
//				obj.sortStatus = this.form.sortStatus
//				obj.accountStatus = this.form.accountStatus
//				obj.pageNumber = val
//				obj.pageSize = 10
//      searchList(obj).then(res => {
//        if(res){
//          this.data = res.data
//          this.totalSize = parseInt(res.totalSize)
//        }
//      }).catch(err => {
//        this.$message.error(err)
//      })

			},

      getList () {
        searchList(this.form).then(res => {
          if(res.status == '200'){
          	this.data = res.data
          	this.totalSize = Number(res.totalSize)
          	for(let i=0;i<res.data.length;i++){
          		res.data[i].sumOverAmount = res.data[i].sumOverAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
          		//res.data[i].frozenAmount = res.data[i].frozenAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
          		res.data[i].surplusOverAmount = res.data[i].surplusOverAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
          		res.data[i].remainAmount = res.data[i].remainAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
          	}
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      handelQuery () {
      	sbuNum({}).then(res => {
      		if(res.status == '200'){
      			this.sbuSumNumber = res.data
      		}else{
      			console.log(res.errorMsg)
      		}
      	})
      }
    },
    created (){
      this.getList()
      this.handelQuery()
    }
  }
</script>

<style scoped lang="scss">
.btnGroup{
  .el-button{
    margin: 10px auto;
  }
}
</style>
