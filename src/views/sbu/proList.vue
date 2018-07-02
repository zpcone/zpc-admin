<template>
  <section>
    <div class="m20">
      <p>SBU名称：{{form.sbuName}}</p>
      <p>SBU ID： {{form.sbuId}}</p>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item prop="supplierId" label="供应商ID">
          <el-input v-model="form.supplierId" placeholder="" v-on:input="inputNumCheck" maxlength="19" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商名称">
          <el-input v-model="form.supplierName" placeholder="" clearable style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item prop="sortRule" label="排序">
          <el-select v-model="form.sortRule" placeholder="请选择" @change="sortChange" clearable>
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="" label="">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="dataTable" border stripe style="width: 100%">
        <el-table-column prop="supplierId" label="供应商ID"></el-table-column>   
        <el-table-column prop="supplierName" label="供应商名称"></el-table-column>   
        <el-table-column prop="createTime" label="绑定时间"></el-table-column>   
        <el-table-column prop="ruleId" label="绑定规则ID"></el-table-column>   
        <!--<el-table-column prop="ruleDetails" label="绑定规则详情"></el-table-column>-->
       	<el-table-column prop="" label="绑定规则详情">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="view(scope.row)">查看详情</el-button>  
          </template>        	
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="changeRuleClick(scope.row)">更换绑定规则</el-button>  
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="m20 center">
      <el-pagination
        :current-page.sync="form.pageNumber" 
        :page-size="form.pageSize"
        @current-change="getList"
        layout="total, prev, pager, next" 
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="更换绑定规则"
      :visible.sync="changeDlsg"
      width="40%">
      <div>
        <p class="mb20">供应商ID：{{supplierId}}</p>
        <p class="mb20">供应商名称：{{supplierName}}</p>
        <p class="mb20">
          <el-select v-model="changeRuleId" placeholder="请选择" @change="ruleIdChange">
            <el-option
              v-for="item in rules"
              :key="item.ruleId"
              :label="item.ruleName"
              :value="item.ruleId">
            </el-option>
          </el-select>
        </p>
        <div class="mb20">
          <el-table :data="ruleData" border stripe style="width: 100%">
          	<el-table-column prop="userId" label="用户ID" width="170"></el-table-column>
          	<el-table-column prop="ruleId" label="规则ID" width="170"></el-table-column>
            <el-table-column prop="ruleName" label="用户名称"></el-table-column>
            <el-table-column prop="userName" label="真实姓名"></el-table-column>
            <el-table-column prop="distributePercent" label="分配比例"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDlsg = false">取 消</el-button>
        <el-button type="primary" @click="changeRuleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="查看绑定详情"
      :visible.sync="viewDlsg"
      width="30%">
      <div>
          <el-table :data="ruleDetailsTable" border stripe style="width: 100%">
          	<el-table-column prop="userId" label="用户ID" width="170"></el-table-column>
          	<el-table-column prop="ruleId" label="规则ID" width="170"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="realName" label="真实姓名"></el-table-column>
            <el-table-column prop="distributePercent" label="分配比例" :formatter="centStatus"></el-table-column>
          </el-table>
      </div>
    </el-dialog>    
  </section>
</template>

<script>
	//============================更换绑定规则弹框下拉数据=下拉选中渲染列表
  import {getShopRule, changeRule, getSbuRules, getRuleById} from '@/api/sbu'
  export default{
    data(){
      return{
      	ruleDetailsTable: [],
        form: {
        	supplierName: '',
        	supplierId:'',
//      	sortRule: '',
          sbuId: '',
          sbuName: '',
          pageSize: '10',
          pageNumber: '1'
        },
        total: '',
        sorts:[{label: '按绑定时间排序',value: '1'}, {label: '按供应商名称排序',value: '2'}],
        dataTable: [{supplierId:'121212'}],
        changeDlsg: false,
        viewDlsg: false,
        supplierId: '',
        supplierName: '',
        changeRuleId: '',
        rules: [],
        ruleData: [],
        inputNum: true
      }
    },
    methods:{
			inputNumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				if(!reg.test(this.form.supplierId)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}
			},
      handleQuery () {
        if(this.$router.currentRoute.query){
          let query = this.$router.currentRoute.query
          this.form.sbuId = query.id
          this.form.sbuName = query.sbuName
        }
        if(this.form.sbuId){
          this.getList()          
        }else{
          this.$router.go(-1)
        }
      },

			centStatus (row) {
				if(row.distributePercent){
					return row.distributePercent + ' %'
				}
			},
			
      getList () {
      	if(this.inputNum == false){
      		this.$message.warning('ID必须为数字')
      	}else{
      		getShopRule(this.form).then(res => {
      		  if(res.status == 200){
      		    this.dataTable = res.data.data
      		    this.total = +res.totalSize
      		  }
      		})      		
      	}
      },
      sortChange (val) {
      	this.form.sortRule = val
      },
      search(){
        this.getList()
      },
      view (row) {
      	this.viewDlsg = true
      	let arr = JSON.parse(row.ruleDetails)
      	this.ruleDetailsTable  =  arr.data
      },
      changeRuleClick(row){
        this.supplierId = row.supplierId
        this.supplierName = row.supplierName
        this.changeDlsg = true
      },
      
      //页面刷新渲染  更换绑定规则弹框中的下拉列表
      getRules(){
        getSbuRules({sbuId: this.form.sbuId}).then(res => {
          if(res.status == 200){
          	this.rules == []
          	for(let i=0;i<res.data.data.length;i++){
          		let obj= {}
          		obj.ruleId = res.data.data[i].id
          		obj.ruleName = res.data.data[i].ruleName
          		this.rules.push(obj)
          	}
          }
        })
      },
      
      // 更换绑定规则弹框中的下拉选中   渲染下方列表
      ruleIdChange (val) {
      	let ruleId = val
        getRuleById({ruleId: ruleId}).then(res => {
          this.ruleData = res.data.data
        })
      },
      changeRuleConfirm(){
        changeRule({ruleId: this.changeRuleId, sbuId: this.form.sbuId,supplierId:this.supplierId}).then(res => {
        		if(res.status == 200){
        			this.$message.success('更改成功！')
        			this.changeDlsg = false
        			this.getList()
        		}else if(res.status == 500){
        			this.$message.warning('更改失败！')
        		}
        })
      }
    },
    created(){
      this.handleQuery()
      this.getRules()
    }
  }
</script>

<style scoped lang="scss">
</style>