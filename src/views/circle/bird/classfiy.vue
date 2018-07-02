<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="130px" :inline="true">
        <!--<el-form-item prop="id" label="行业分类">
          <el-select v-model="form.id" placeholder="请选择" clearable>
            <el-option
              v-for="item in classifys"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item prop="categoryName" label="二级分类名称：">
						<el-input v-model="form.categoryName" placeholder="请输入分类名称" maxlength="8" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="search">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
    	<!--排序：默认按照创建时间排序，设置权重后，前8名按权重数值排序，8名之后按照创建时间排序-->
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="categoryName" label="二级分类"></el-table-column>
        <el-table-column prop="categoryTitleName" label="标题"></el-table-column>
        <el-table-column prop="" label="管理" width="700">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="weightClick(scope.row)">权重</el-button>
              <!--<el-button size="mini" type="danger" @click="closeClass(scope.row)">停用</el-button>
              <el-button size="mini" type="success" @click="openClass(scope.row)">启用</el-button>-->
            <el-button type="danger" size="mini" @click="goToThree(scope.row)">二级分类下三级分类管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
       <el-dialog
				title="权重设置"
				:visible.sync="deploy"
				width="20%">
				<div>
        <el-form ref="weightList" :model="weightList" label-width="100px">
          <el-form-item prop="weight" label="请输入：">
            <el-input type="number" v-model.number="weightList.weight" :step="1" placeholder="请输入0-7的数值" @change="handleChangeA"></el-input>
            <p>0-7数值越小排序越靠前</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="deploy = false">取 消</el-button>
					<el-button type="primary" @click="weightListClick">确 定</el-button>
				</span>
		</el-dialog>
    
     	<!--分页处理-->
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
import { searchBird,weightBird,openAndClose } from '@/api/group/bird'
  export default{
    data(){
      return{
      	totalSize:'',
      	currentPage: 1,
      	goToThreeId: '',
      	deploy: false,
        form: {
        	categoryName: '',//二级分类名称
      		pageNumber: 1,
      		pageSize: 10,
      		sortFlag: ''
        },
        weightList:{
        	id: '',
        	weight: ''
        },
        data: [{categoryName:'212121'}]
      }
    },
    methods:{
    	//鸽舍行业分类   搜索查询按钮
    	search(){
    		searchBird(this.form).then(res => {
    			this.data = res.data
    			this.totalSize = Number(res.totalSize)
    		})
    	},
    	
      //分页改变处理
      handleCurrentChange(val){
      	this.form.pageNumber = val
      	this.search()
      },

    	//权重弹出框
    	weightClick (row) {
    		//console.log(row)
    		this.weightList.id = row.id
    		this.weightList.weight = row.weight
  			this.deploy = true
    	},

      //权重改变
			handleChangeA (val) {
				if(val<0){
					this.weightList.weight = 0
				}else if(val>7){
					this.weightList.weight = 7
				}else{
					this.weightList.weight = val
				}
			},
			
      //权重确定按钮
      weightListClick(){
      	if(!this.weightList.weight){
      		this.$message.warning('权重不能为空！')
      		return false
      	}else{
      		weightBird(this.weightList).then(res => {
      			if(res.data == true && res.status == '200'){
      			this.weightList.weight = res.paramter.weight
      			this.$message.success('修改权重成功！')
      			this.deploy = false
      			this.weightList = {}
      			this.search()						
      			}
      		})
      	}
      },

    	//启用----新增--5.18
    	openClass(row){
      		if(row.useable == 0){
      			this.$message.warning('启用失败，该分类已被启用！')
      			return false
      		}else{
      			openAndClose({
      				id: row.id,
      				useable: 0
      			}).then(res => {
      				 if(res.data == true && res.status == 200){
      					this.$message.success('启用成功')
      					this.search()
      				}else{
      					this.$message.error('启用失败，请刷新后重试')
      				}
      			})
      		}    		
    	},
    	
    	// 停用--新增-5.18
    	closeClass(row){
    		//console.log(row)
      		if(row.useable == 1){
      			this.$message.warning('禁用失败，该分类已被禁用！')
      			return false
      		}else{
      			openAndClose({
      				id: row.id,
      				useable: 1
      			}).then(res => {
      				 if(res.data == true && res.status == 200){
      					this.$message.success('禁用成功')
      					this.search()
      				}else if(res.errorMsg != '' && res.status == 500){
      					this.$message.error('禁用失败，该分类下有群信息')
      				}
      			})
      		}
    	},

      goToThree (row) {
				let goToThreeId = row.categoryCode
				let categoryName = row.categoryName 
    		this.$router.push(
    			{
    				path:'/circlemanage/bird/three',
    				query:{
    					categoryCode : goToThreeId,
      				categoryName : categoryName
    				}
    			}
    		)
   }
    	//页面刷新行业下拉动态显示----产品取消 5.18
//			handleQuery(){
//				industry({columnCode:'GS'}).then(res => {
//					//console.log(res)
//					this.classifys = res.data
//				})
//			},
    },
    mounted(){
    	this.search()
    }
  }
</script>

<style scoped lang="scss">
</style>