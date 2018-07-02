<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="categoryName" label="三级分类名称">
          <el-input v-model="form.categoryName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item prop="columnId" label="栏目">
          <el-select v-model="form.columnName" placeholder="请选择" clearable @change="columnChange">
            <el-option
              v-for="item in program"
              :key="item.id"
              :label="item.columnName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cityCode" label="城市">
          <el-select v-model="form.cityCode" placeholder="请选择" clearable>
            <el-option
              v-for="item in cities"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="searchRe">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="dataTable" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="170"></el-table-column>
        <el-table-column prop="columnName" label="栏目"></el-table-column>
        <el-table-column prop="categoryName" label="三级分类"></el-table-column>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="totalNum" label="三级分类内圈总人数"></el-table-column>
        <el-table-column prop="crowdMainName" label="圈主昵称"></el-table-column>
        <el-table-column prop="mId" label="圈主账号"></el-table-column>
        <el-table-column prop="crowdMainLevel" label="圈主等级"></el-table-column>
        <!--<el-table-column prop="" label="朋友圈总条数"></el-table-column>-->
        <el-table-column prop="weight" label="权重"></el-table-column>
        <el-table-column prop="categoryUseable" label="状态" :formatter="categoryStatus"></el-table-column>
        <!--<el-table-column prop="weight" label="状态"></el-table-column>-->
        <el-table-column prop="" label="管理" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="weightClick(scope.row)">权重</el-button>
            <el-button type="danger" size="mini" @click="moveClick(scope.row)">移除精品鸽舍</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--权重-->
       <el-dialog
				title="权重设置"
				:visible.sync="deploy"
				width="20%">
				<div>
        <el-form ref="weightList" :model="weightList" label-width="100px">
          <el-form-item prop="weight" label="请输入："required>
            <el-input v-model="weightList.weight" placeholder="请输入0-9的数值" clearable></el-input>
            <p>数值越小排序越靠前</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="deploy = false">取 消</el-button>
					<el-button type="primary" @click="weightListClick">确 定</el-button>
				</span>
		</el-dialog>

    <!--分页-->
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
	//=====================栏目列表渲染======城市下拉=权重修改=权重查看==移除精品舍
import { birdRecommend,searchsencondLevel,citylist,weight,weightView,removeBird } from '@/api/group/bird'
  export default{
    data(){
      return{
      	dataTable: [],
      	currentPage: 1,
				totalSize: '',
      	deploy: false,
      	weightList:{
        	id: '',
        	weight: ''
        },
        form: {
        	//分类名称
        	categoryName: '',
        	columnId: '',
        	cityCode: '',
					pageNumber: 1,
					pageSize: 10
        },
        //栏目
        program: [
          {
            columnName: '',
            id: ''
          }
        ],
        //城市下拉
        cities: [
          {
            cityName: '',
            cityCode: ''
          }
        ]
      }
    },
    methods:{
    	categoryStatus (row) {
    		if(row.categoryUseable == 0){
    			return '正常'
    		}else if(row.categoryUseable == 1){
    			return '停用'
    		}
    	},
    	//处理分页
   	 handleCurrentChange(val) {
    	//console.log(val)
    	this.form.pageNumber = val
			this.searchRe()
    	},
    	//页面刷新栏目下拉框刷新
    	handleQuery(){
    		searchsencondLevel({columnCode:'GS'}).then(res =>{
    			this.program = res.data
    		})
    	},
    	//页面刷新城市下拉框刷新
    	handleCity(){
    		citylist().then(res => {
    			this.cities = res.data
    		})
    	},
    	columnChange(val){
    		//console.log(val)
    		this.form.columnId = val
    	},
    	//查找按钮
    	searchRe(){
    		birdRecommend(this.form).then(res =>{
    			this.dataTable = res.data
    			this.totalSize = Number(res.totalSize)
    		})
    	},
    	//权重按钮
    	weightClick(row){
    		this.weightList.weight = row.weight
    		this.weightList.id = row.id
    		this.deploy = true
//  		this.deploy = true
//  		this.weightList.id = row.cateGoryId
//  		weightView({
//  			id: this.weightList.id
//  		}).then(res => {
//  			//cosnole.log(res)
//  			 this.weightList.weight = res.data.weight
//  		})
    	},
      //权重确定按钮
      weightListClick(){
      	//console.log(111)
				weight(this.weightList).then(res => {
					if(res.status == '200'){
//						this.weightList.weight = res.paramter.weight
						this.$message.success('修改权重成功！')
						this.deploy = false
						this.searchRe()
					}

				})
      },

      //移除精品鸽舍按钮
      moveClick(row){
	    	removeBird({
	    		id: row.columnId + '',
	    		categoryId: row.cateGoryId + ''
	    	}).then(res => {
	    		//移除精品鸽舍的返回status是500
	    		if(res.data == true && res.status == 200){
	    			this.$message.success('移除成功')
	    			this.searchRe()
	    		}else if(res.data == false){
	    			this.$message.warning('移除失败！')
	    		}
	    	})
      }

    },
    mounted(){
    	this.handleQuery()
    	this.handleCity()
    	this.searchRe()
    }
  }
</script>

<style scoped lang="scss">
</style>
