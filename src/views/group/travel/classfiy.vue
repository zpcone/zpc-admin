<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="id" label="生活分类：">
          <el-select v-model="form.id" placeholder="请选择" @change="selectionChange" clearable>
            <el-option
              v-for="item in program"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="search">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20" float="right">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="id" label="编号"  align="center"></el-table-column>
        <el-table-column prop="categoryName" label="生活分类"  align="center"></el-table-column>
        <el-table-column prop="explain" label="说明"  align="center"></el-table-column>
        <el-table-column prop="" label="管理"  align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="columnManage(scope.row)">该分类下的群管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="form.pageNumber" 
					:page-size="form.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>
  </section>
</template>

<script>
//=======大旅游分类下的群管理==生活分类下拉框
import { searchsencondLevel,searchLifeTravel } from '@/api/group/travel'
  export default{
    data(){
      return{
      	totalSize: '',
        form: {
        	columnCode: 'LY',
	        pageSize: 10,
	        pageNumber: 1
        },
        selectionChangeId: '',
        program: [
          {
            categoryName: '',
            categoryCode: '',
          }
        ],
        data: [{id:'123'}],
        currentPage: 1
      }
    },
    methods:{
      handleSizeChange() {},
    	//处理分页
   	 handleCurrentChange(val) {
    	//console.log(val)
    	this.form.pageNumber = val
    	this.search()
    	},
    	
    selectionChange(val) {
    	this.form.id = val
    },
    
    //该分类下的群管理按钮
   	 columnManage(row){
   	 	//console.log(row)
   	 	let categoryId = row.id
    		this.$router.push(
    			{
    				path:'/group/travel/common',
    				query:{
	 						categoryId : categoryId,
    				}
    			}
    		)			
    	},

    	//页面刷新动态获取栏目列表
    	handleQuery(){
    		searchsencondLevel({columnCode:'LY'}).then(res => {
    			//console.log(res)
    			this.program = res.data
    		})
    	},
    	
    	//查找按钮 展示列表
     	search(){
     		searchLifeTravel(this.form).then(res => {
     			//console.log(res)
   			this.data = res.data
   			this.totalSize = Number(res.totalSize)
     		})     			
     		
     	},
     	

    },
    mounted(){
  		this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
</style>