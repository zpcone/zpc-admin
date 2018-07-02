<template>
  <section>
    <div class="m20" style="text-align: right;">
      <el-button type="primary" icon="el-icon-plus" @click="newSbu">新增SBU</el-button>
      <div style="float: left;font-family: 'arial narrow';font-weight: 700;font-size: 20px;">
      	我的SBU：{{ sbuSumNumber }}
      </div>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="accountStatus" label="状态：">
          <el-radio-group v-model="form.accountStatus">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="0">禁用</el-radio-button>
            <el-radio-button label="1">正常</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="id" label="SBU ID：">
          <el-input v-model="form.id" placeholder="请输入SBU ID" v-on:input="inputNumCheck" style="width:205px" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item prop="sbuName" label="SBU名称：">
          <el-input v-model="form.sbuName" placeholder="请输入SBU 名称" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item prop="sortStatus" label="排序：">
          <el-select v-model="form.sortStatus" placeholder="请选择" @change="sortChange" clearable style="width:220px;">
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="dataTable" stripe border style="width: 100%">
        <el-table-column prop="id" label="SBU ID" width="170"></el-table-column>
        <el-table-column prop="sbuName" label="SBU 名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="adminName" label="管理员"></el-table-column>
        <el-table-column prop="remainAmount" label="余额（元）"></el-table-column>
        <!--<el-table-column prop="frozenAmount" label="冻结金额（元）"></el-table-column>-->
        <el-table-column prop="sumOverAmount" label="总透支额度（元）"></el-table-column>
        <el-table-column prop="surplusOverAmount" label="剩余透支额度（元）"></el-table-column>
        <el-table-column prop="" label="操作" width="520">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="manageMember(scope.row)">成员管理</el-button>
            <el-button size="mini" type="success" @click="manageAssign(scope.row)">分配收益</el-button>
            <el-button size="mini" type="primary" @click="manageRecord(scope.row)">查看分配记录</el-button>
            <el-button size="mini" type="info"  @click="manageProduct(scope.row)">查看供应商及商品信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="m20 center">
    	<el-pagination
    	  :current-page.sync="form.pageNumber"
    	  :page-size="form.pageSize"
    	  @current-change="handlePageChange"
    	  layout="total, prev, pager, next"
    	  :total="totalSize">
    	</el-pagination>
    </div>

  </section>
</template>

<script>
	//========首页列表=====sbu总数
  import { searchList,sbuNum } from '@/api/leader'
  export default{
    data(){
      return{
      	sbuSumNumber: '',
        form: {
        	pageNumber: 1,
        	pageSize: 10,
        	accountStatus: '',//账户状态 0禁用 1正常
        	id: '',//sbu  id
        	sbuName: '',//sbu名称
        	sortStatus: ''//排序 降序 -1
        },
        sorts: [
          {
            label: '按创建时间由近及远排序',
            value: '-1'
          }
        ],
        dataTable: [],
        totalSize: '',
        currentPage: 1,
        inputNum: true
      }
    },
    methods:{
			inputNumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				if(!reg.test(this.form.id)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}
			},
    	//搜索按钮
			searchClick () {
				if(this.inputNum == false){
					this.$message.warning('ID必须为数字！')
				}else{
					searchList(this.form).then(res => {
						if(res.status == '200'){
							this.dataTable = res.data
							this.totalSize = Number(res.totalSize)
	          	for(let i=0;i<res.data.length;i++){
	          		res.data[i].sumOverAmount = res.data[i].sumOverAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
	          		//res.data[i].frozenAmount = res.data[i].frozenAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
	          		res.data[i].surplusOverAmount = res.data[i].surplusOverAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
	          		res.data[i].remainAmount = res.data[i].remainAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
	          	}
						}else{
							this.$message.error(res.errorMsg)
						}
					})
				}
			},
			
			//分页
			handlePageChange (val) {
				this.form.pageNumber = val
				this.searchClick()
			},
			//排序改变
			sortChange (val) {
				this.form.sortStatus = val
			},
			//新增SBU
			newSbu () {
				this.$router.push('/sbu/new')
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
      // 分配收益
      manageAssign(row){
        this.$router.push({
          path: '/sbu/assign',
          query:{
            id:row.id,
            remainAmount: row.remainAmount
          }
        })
      },
      // 查看分配记录
      manageRecord(row){
        this.$router.push({
          path: '/sbu/detail',
          query:{
            id:row.id
          }
        })
      },
      // 查看供应商及商品信息
      manageProduct(row){
        this.$router.push({
          path: '/sbu/prolist',
          query:{
            id:row.id,
            sbuName: row.sbuName
          }
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
    mounted () {
    	this.searchClick()
    	this.handelQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>
