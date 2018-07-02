<template>
  <section>
	<div class="m20">
    <h3>关联圈群列表</h3>
 	   	<div style="position: absolute;right:100px;top:62px">
 	   	<el-button type="primary" icon="el-icon-setting" @click="back">返回</el-button>
 	   </div>
 	   <el-form v-model="changeForm">
				<el-form-item prop="ccType" label="群圈类型筛选：">
					<el-select v-model="changeForm.ccType" placeholder="" @change="changeCg" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
					</el-select>
				</el-form-item> 	   	
 	   </el-form>

    <!--<el-form ref="form" :model="form" :inline="true">
      <el-form-item prop="" label="排序：">
        <el-select v-model="form.sort" placeholder="请选择">
          <el-option
            v-for="item in sorts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchClick">查询</el-button>
        <el-button type="primary" icon="el-icon-setting" @click="back">返回</el-button>
      </el-form-item>
    </el-form>-->
    <el-table :data="dataTable" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <!--分组名称即是标签名称-->
      <el-table-column prop="ccType" label="群圈类型" :formatter="ccStatus">
      </el-table-column>
      <el-table-column prop="groupName" label="标签名称"></el-table-column>    
      <el-table-column prop="memberName" label="会员名称"></el-table-column>    
      <el-table-column prop="ccId" label="关联群圈ID"></el-table-column>  
      <el-table-column prop="ccLogo" label="圈/群头像" width="120px">
	    	<template slot-scope="scope">
	    		<img :src="scope.row.ccLogo" style="width: 40px;height: 40px;display: block;"/>
	    	</template>
      </el-table-column>  
      <el-table-column prop="ccName" label="圈/群名称"></el-table-column>    
      <el-table-column prop="ccNumber" label="人数"></el-table-column>    
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>    
    </el-table>		
	</div>
  </section>
</template>

<script>
import { cAndGList } from '@/api/circleAndGroup'
  export default{
    data(){
      return{
        form:{
        	ccType: 2
        },
        changeForm: {
        	ccType: ''
        },
        sorts:[],
        dataTable: [],
        groupId: '',
        options: [
        {
        	value: '0',
        	label: '群'
        },
        {
        	value: '1',
        	label: '圈'
        },
        {
        	value: '2',
        	label: '全部'
        } 
        ]
      }
    },
    methods:{
      view(row) {
      	//console.log(row)
			let ccId = row.ccId
			let ccType = row.ccType
			let ccName = row.ccName
				this.$router.push(
					{
						path:'/circleandgroup/team/folder/sortManage',
						query:{
		 					ccId : ccId,
		 					ccType: ccType,
		 					ccName: ccName,
							groupId: this.form.groupId,
							mId: this.form.mId
						}
					}
			)
    },
  	    // 列表群圈类型过滤
    ccStatus(row){
      if(row.ccType === '0'){
        return '群'
      }else if(row.ccType === '1'){
        return '圈'
      } 
    },
    changeCg (val) {
  	//console.log(val)
				this.form.ccType = val
				cAndGList(this.form).then(res => {
					if(res.data.length != 0){
						this.dataTable = []
						this.dataTable = res.data[0].cCAndGroupList
						for(let i=0;i<this.dataTable.length;i++){
						this.dataTable[i].groupName = res.data[0].groupName
						this.dataTable[i].memberName = res.data[0].memberName					
						}
					}else{
						this.$message('暂无相关数据')
					}
				})
    },
    back () {
			this.$router.push(
				{
					path:'/circleandgroup/team/folder/member',
					query:{
	 					groupId : this.form.groupId
					}
				}
			)
    },
    handleQuery(){
      	let query = this.$router.currentRoute.query
      	let groupId = query.groupId
      	this.form.groupId = query.groupId
      	this.changeForm.groupId = query.groupId
      	let mId = query.mId
      	this.form.mId = query.mId
      	this.changeForm.mId = query.mId
				cAndGList({
					groupId: groupId,
					mId: mId,
					ccType: 2
				}).then(res => {
					//console.log(res)
					if(res.data.length != 0){
						this.dataTable = res.data[0].cCAndGroupList
						for(let i=0;i<this.dataTable.length;i++){
						this.dataTable[i].groupName = res.data[0].groupName
						this.dataTable[i].memberName = res.data[0].memberName					
						}
					}else{
						this.$message('暂无相关数据')
					}					
					

				})
      },
    handleBack () {
      	let query = this.$router.currentRoute.query
      	this.form.groupId = query.groupId
      	this.form.mId = query.mId
				cAndGList(this.form).then(res => {
					//console.log(res)
					if(res.data.length != 0){
							this.dataTable = res.data[0].cCAndGroupList
							for(let i=0;i<this.dataTable.length;i++){
							this.dataTable[i].groupName = res.data[0].groupName
							this.dataTable[i].memberName = res.data[0].memberName					
							}
					}else{
						this.$message('暂无相关数据')
					}
				}) 	
    },
    },
    mounted () {
    	this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>