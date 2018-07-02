<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="crowdName" label="群名称">
          <el-input v-model="form.crowdName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item prop="columnId" label="栏目">
          <el-select v-model="form.program" placeholder="请选择" @change="selectionChange" clearable>
            <el-option
              v-for="item in program"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cityCode" label="城市">
          <el-select v-model="form.cityName" placeholder="请选择" clearable>
            <el-option
              v-for="item in cities"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="search">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="crowdId" label="编号" width="165"></el-table-column>
        <el-table-column prop="columnName" label="栏目"></el-table-column>
        <el-table-column prop="crowdName" label="群名称"></el-table-column>
        <el-table-column prop="memberName" label="群主"></el-table-column>
        <el-table-column prop="crowdNum" label="群人数"></el-table-column>
        <el-table-column prop="" label="朋友圈数"></el-table-column>
        <el-table-column prop="coinTotal" label="币总值"></el-table-column>
        <el-table-column prop="crowdStatus" label="群状态"></el-table-column>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="created" label="创建时间"></el-table-column>
        <el-table-column label="管理" width="450">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="setTop(scope.row)">置顶</el-button>
            <el-button type="primary" size="mini" @click="cancelTop(scope.row)">取消置顶</el-button>
            <el-button size="mini"  @click="move(scope.row)">移除精品社群</el-button>
            <el-button size="mini"  @click="moveTo(scope.row)">移至精品社群</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
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
import { searchsencondLevel,searchTravel,setTopTravel,cancelSetTopTravel,moveTravel,moveToTravel,citylist } from '@/api/group/travel'
  export default{
    data(){
      return{
        form: {
        	columnId:'',
        	crowdName: '',
        	cityCode: '',
     			pageNumber: 1,
     			pageSize: 10,
     			sortFlag: ''
        },
				currentPage: 1,
				totalSize: '',
        jingpin: true,
        zhiding: true,
        selectionChangeId: '',
        program: [
          {
            columnName: '',
            id: '',
          }
        ],
        cities: [
          {
            cityName: '',
            cityCode: '',
          }
        ],
        data: []
      }
    },
    methods:{

    	//处理分页
   	 handleCurrentChange(val) {
    	//console.log(val)
    	this.pageNumber = val
    	},
    	
    	//页面刷新动态获取栏目列表
    	handleQuery(){
    		searchsencondLevel({columnCode:'LY'}).then(res => {
	  			this.totalSize = Number(res.totalSize)	
	  			this.program =[]
	  			for(let i=0;i<res.data.length;i++){
	  				let obj ={}
	  				obj.categoryName = res.data[i].categoryName
	  				obj.id = res.data[i].id
	  				this.program.push(obj)
	  			}
    		})
    	},
    	
    	//页面刷新动态获取城市列表
    	handlecity(){
    		citylist().then(res => {
    			//console.log(res)
    			this.cities = res.data
    		})
    	},
    	    	
    	//动态保存当前选择栏目的id
    	selectionChange(val){
    		//console.log(val)
    		this.selectionChangeId = val
    		this.form.columnId =val
    	},
    	
    	//查找按钮 展示列表
     	search(){
     		searchTravel(this.form).then(res => {
     			//console.log(res)
		   		this.totalSize = Number(res.totalSize)	
		 			this.data = res.data
     		})     			
     		
     	},
     	
     	//设置置顶
     	setTop(row){
     		console.log(row)
     		let crowdId = row.id
     		setTopTravel({crowdId:crowdId}).then(res => {
     			//console.log(res)
     			if(res.data.data == true && res.status == '200'){
     				 this.$message.success('设置置顶成功')
     				 this.search()
     			}else if(res.data.data == false && res.status == '200'){
     				this.$message.warning('该群已置顶过，请勿重复操作！')
     			}
     		})    		
     	},
     	
     	//取消置顶
     	cancelTop(row){
     		let crowdId = row.id
     		cancelSetTopTravel({crowdId:crowdId}).then(res => {
     			console.log(res)
     			if(res.data.data == true && res.status == '200'){
     				 this.$message.success('取消置顶成功')
     				 this.search()
     			}else if(res.data.data == false && res.status == '200'){
     				this.$message.warning('该群已取消置顶，请勿重复操作！')
     			}
     		})     		
     	},
     	
     	//将群移出当前栏目
     	move(row){
   		//console.log(row)
     		let crowdId = row.id
     		let columnId =row.columnId
     		moveTravel({
     			crowdId: crowdId,
     			columnId: columnId
     		}).then(res => {
     			//console.log(res)
		   			if(res.data.data == true && res.status == '200'){
		   				 this.$message.success('操作成功，已将该群移除精品社')
		   			}else if(res.data.data == false && res.status == '200'){
     				this.$message.warning('已将该群移除精品社，请勿重复操作！')
     			}     			   			
     		})
     		
     	},
     	
     	 //将群移至于当前栏目
     	moveTo(row){
//   		console.log(row)
     		let crowdId = row.id
     		let columnId =row.columnId
     		moveToTravel({
     			crowdId: crowdId,
     			columnId: columnId
     		}).then(res => {
     			//console.log(res)
		 			if(res.data.data == true && res.status == '200'){
		   				 this.$message.success('操作成功，已将该群移至精品社')
		 			}else if(res.data.data == false && res.status == '200'){
     				this.$message.warning('该群已在精品社，请勿重复操作！')
     			}     			
     		})
     		
     	}
    },
    mounted(){
  		this.handleQuery()
  		this.handlecity()
    }
  }
</script>

<style scoped lang="scss">
</style>