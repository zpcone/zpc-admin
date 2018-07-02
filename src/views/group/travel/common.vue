<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="crowdName" label="群名称">
          <el-input v-model="form.crowdName" placeholder="" clearable></el-input>
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
          <el-button type="info" icon="el-icon-search" @click="search">查找</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column prop="crowdId" label="编号" width="170"></el-table-column>
        <el-table-column prop="crowdName" label="群名称"></el-table-column>
        <el-table-column prop="memberName" label="群主"></el-table-column>
        <el-table-column prop="crowdNum" label="群人数"></el-table-column>
        <el-table-column prop="" label="朋友圈数"></el-table-column>
        <el-table-column prop="coinTotal" label="币总值"></el-table-column>
        <el-table-column prop="crowdStatus" label="群状态"></el-table-column>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="created" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="" label="管理" width="520">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="setTop(scope.row)">置顶</el-button>
            <el-button type="primary" size="mini" @click="cancelTop(scope.row)">取消置顶</el-button>
            <el-button size="mini" @click="moveTo(scope.row)">移至精品社群</el-button>
            <el-button size="mini" @click="moveOut(scope.row)">移除精品社群</el-button>
            <el-button size="mini"  @click="detail(scope.row)">详情</el-button>
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
//=======
import { handleGroup,setTopTravel,cancelSetTopTravel,moveTravel,moveToTravel,searchsencondLevel,citylist } from '@/api/group/travel'
  export default{
    data(){
      return{
      	totalSize: '',
        form: {
//      	id: '',
        	columnCode: 'LY',
        	pageSize: 10,
        	pageNumber: 1,
//      	cityCode: ''
        },
        jingpin: true,
        zhiding: true,
        disabled: false,
        //页面刷新保存二级栏目的id
        secondBird: '',
        cities: [
          {
            cityName: '',
            cityCode: 0,
          }
        ],
        data: [{crowdId:'5245',crowdName:'swefsv',zhiding: true}],
        currentPage: 1
      }
    },
    methods:{
    	//处理分页
   	 handleCurrentChange(val) {
    	//console.log(val)
    	this.form.pageNumber = val
    	this.search()
    	},
    	//页面刷新动态获取栏目列表
    	handleQuery(){
      	let query = this.$router.currentRoute.query
    	//console.log(this.$router.currentRoute.query)
      	let categoryId = query.categoryId
        this.form.categoryId = query.categoryId
    		handleGroup({
    			crowdType: 'LY',
    			categoryId: categoryId,
    			pageNumber: 1,
    			pageSize: 10
    		}).then(res => {
    			//console.log('handleQuery')
      			//console.log(res)
    			this.data = res.data
    			this.totalSize = Number(res.totalSize)

    		})
    	},
    	
    	//页面刷新  移动至所需要二级栏目自动渲染
			handlemove(){
				searchsencondLevel({columnCode:'LY'}).then(res => {
					//console.log(res)
					this.secondBird = res.data[0].id
					//console.log(this.secondBird)
				})
			},
			
			handlecitylist(){
				citylist().then(res => {
					//console.log(res)
					this.cities = res.data
				})
			},
    	
    	
    	//查找按钮 展示列表
     	search(){ 
     		handleGroup(this.form).then(res =>{
    			this.data = res.data
    			this.totalSize = Number(res.totalSize)     			
     		})
     	},
     	
     	//设置置顶
     	setTop(row){
     		let crowdId = row.id
     		setTopTravel({crowdId:crowdId}).then(res => {
     			//console.log(res)
     			if(res.data.data == true && res.status == '200'){
							this.$message.success('置顶成功！')
							this.handleQuery()
     			}else if(res.data.data == false && res.status == '200'){
     					this.$message.warning('该群已为置顶状态，请勿重复操作！')
     			}
     		})    		
     	},
     	
     	//取消置顶
     	cancelTop(row){
     		let crowdId = row.id
     		cancelSetTopTravel({crowdId:crowdId}).then(res => {
     			//console.log(res)
     			if(res.data.data == true && res.status == '200'){
							this.$message.success('取消置顶成功！')
							this.handleQuery()
     			}else if(res.data.data == false && res.status == '200'){
     					this.$message.warning('该群不是置顶状态，请勿重复操作！')
     			}
     		})     		
     	},
     	
     	
     	 //将群移至精品社群
     	moveTo(row){
     		moveToTravel({
     			crowdId: row.id,
     			columnId: this.secondBird
     		}).then(res => {
     			//console.log(res)
	   			if(res.data.data == true && res.status == '200'){
	   				 this.$message.success('移至成功!')
	   				 this.handleQuery()
	   			}else if(res.data.data == false && res.status == '200'){
	   				this.$message.warning('已移至成功，请勿重复操作')
	   			}
     		})
     		
     	},
     	 //将群移除精品社群
     	moveOut(row){
     		console.log(row)
	     		moveTravel({
	     			crowdId: row.id,
	     			columnId: this.secondBird
	     		}).then(res => {
	     			//console.log(res)
		   			if(res.data.data == true && res.status == '200'){
		   				 this.$message.success('移除成功!')
		   				 this.handleQuery()
		   			}else if(res.data.data == false && res.status == '200'){
		   				this.$message.warning('已移除成功，请勿重复操作')
		   			}
	     		})
     	}
    },
    mounted(){
  		this.handleQuery()
  		this.handlemove()
  		this.handlecitylist()
    }
  }
</script>

<style scoped lang="scss">
</style>