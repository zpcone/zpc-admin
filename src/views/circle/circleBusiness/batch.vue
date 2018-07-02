<template>
	<section>
		<div style="position: relative;">
			<div style="position: absolute;top:30px;right:30px;z-index: 100;">
				<el-button style="min-width: 120px;" type="info" @click="publishNumber">圈主发布公告日条数限制</el-button>
			</div>
		</div>		
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="圈类型：" prop="categoryType">
							<el-radio-group  v-model="searchForm.categoryType" @change="sceneClick">
								<el-radio-button label="1">场景圈</el-radio-button>
								<el-radio-button label="2">鸽舍圈</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<!--<el-col :span="14">
						右侧
					</el-col>-->
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item prop="cityCode" label="城    市：" v-if="disFlase">
						  <el-select v-model="searchForm.cityCode" placeholder="请选择"  @change="cityChange" clearable>
						    <el-option
						      v-for="item in citys"
						      :key="item.cityCode"
						      :label="item.cityName"
						      :value="item.cityCode">
						    </el-option>
						  </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="sceneType" label="场景类型：" v-if="searchForm.categoryType == '1'">
						  <el-select v-model="searchForm.sceneType" placeholder="请选择"  @change="senTypeChange" clearable>
						    <el-option
						      v-for="item in sType"
						      :key="item.upCategoryId"
						      :label="item.categoryName"
						      :value="item.upCategoryId">
						    </el-option>
						  </el-select>
						</el-form-item>
						<el-form-item prop="sceneType" label="二级分类：" v-if="searchForm.categoryType == '2'">
						  <el-select v-model="searchForm.sceneType" placeholder="请选择"  @change="senTypeChange" clearable>
						    <el-option
						      v-for="item in sType"
						      :key="item.upCategoryId"
						      :label="item.categoryName"
						      :value="item.upCategoryId">
						    </el-option>
						  </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="categoryId" label="二级分类：" v-if="searchForm.categoryType == '1'">
						  <el-select v-model="searchForm.categoryId" placeholder="请选择"  @change="classChange" clearable>
						    <el-option
						      v-for="item in classType"
						      :key="item.categoryCode"
						      :label="item.categoryName"
						      :value="item.categoryCode">
						    </el-option>
						  </el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="searchClick">查找</el-button>
          			<el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="publishClick">发布公告</el-button>
				</el-form-item>
			</el-form>			
			
			<div class="table" style="margin: 20px 10px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%" v-if="searchForm.categoryType == '1'">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="cityName" label="城市"></el-table-column>
					<el-table-column prop="sceneType" label="场景类型"></el-table-column>
					<el-table-column prop="categoryId" label="二级分类"></el-table-column>
					<el-table-column prop="noticeContent" label="公告内容"></el-table-column>
					<el-table-column prop="publishType" label="发布方式" :formatter="typeStatus"></el-table-column>
					<el-table-column prop="createdBy" label="发布人"></el-table-column>
					<el-table-column prop="created" label="发布时间" width="175"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>	
			
			<div class="table" style="margin: 20px 10px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%" v-if="searchForm.categoryType == '2'">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="cityName" label="城市"></el-table-column>
					<el-table-column prop="sceneType" label="二级分类"></el-table-column>
					<el-table-column prop="noticeContent" label="公告内容"></el-table-column>
					<el-table-column prop="publishType" label="发布方式" :formatter="typeStatus"></el-table-column>
					<el-table-column prop="createdBy" label="发布人"></el-table-column>
					<el-table-column prop="created" label="发布时间" width="175"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>				
			
			<div class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="searchForm.pageNum"
					:page-size="searchForm.pageSize" 
					layout="total, prev, pager, next"
					:total="totalSize"></el-pagination>
			</div>				
		</el-card>
		
		<el-dialog title="发布公告" :visible.sync="noticeDlsg" width="30%">
			<div>
				<el-form v-model="noticeForm" ref="noticeForm" label-width="140px">
					<el-form-item prop="noticeContent" label="公告内容：">
						<el-input type="textarea" v-model.trim="noticeForm.noticeContent" placeholder="请输入公告内容" maxlength="100" resize=none rows=4></el-input>
						<p>*最多可输入100个字</p>
					</el-form-item>
					<el-form-item prop="publishType" label="公告的发布方式：">
						<el-radio-group v-model="noticeForm.publishType">
							<el-radio label="1" value="">常规</el-radio>
						</el-radio-group>
					</el-form-item>   
					<el-form-item prop="sceneType" label="场景类型：" v-if="searchForm.categoryType == '1'">
						<el-input type="text" v-model.trim="sceneTypeName"  placeholder="" maxlength="10" disabled></el-input>
					</el-form-item>
					<el-form-item prop="sceneType" label="标签类型：" v-if="searchForm.categoryType == '2'">
						<el-input type="text" v-model.trim="sceneTypeName" placeholder="" maxlength="10" disabled></el-input>
					</el-form-item>
					<el-form-item prop="cityCode" label="发布区域：">
						<el-input type="text" v-model.trim="cityNameNotic" placeholder="" maxlength="10" disabled></el-input>
					</el-form-item>
					<el-form-item prop="categoryId" label="标签类型：" v-if="searchForm.categoryType == '1'">
						<el-input type="text" v-model.trim="categoryIdName" placeholder="" maxlength="10" disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="noticeDlsg = false">取 消</el-button>
			    <el-button type="primary" @click="saveNotice">发布</el-button>
		    </span>
		</el-dialog>		
		
		<el-dialog title="查看公告" :visible.sync="viewDlsg" width="30%">
			<div>
				<el-form v-model="viewForm" ref="viewForm" label-width="140px">
					<el-form-item prop="noticeContent" label="公告内容：">
						<el-input type="textarea" v-model.trim="viewForm.noticeContent" placeholder="请输入公告内容" maxlength="100" resize=none rows=4 disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="viewDlsg = false">关 闭</el-button>
		    </span>
		</el-dialog>		
		
		<!--设置条数限制-->
		<el-dialog title="圈主发布公告日条数限制" :visible.sync="noticeNumberDlsg" width="19%">
			<div>
				<el-form v-model="noticeNumberForm" ref="noticeNumberForm" label-width="100px">
					<el-form-item prop="publishType" label="限制条数：">
						<el-input type="number" disabled v-model.trim="noticeNumberForm.noticeContent" placeholder="请输入条数（默认5）" maxlength="10" @change="numberTop"></el-input>
						<p>* 默认限制条数为：5</p>
						<p style="font-weight:700;color:#9AAABF;">注：如更改条数请找【配置中心】更改！</p>
					</el-form-item>
				</el-form>
			</div>
			<!--<span slot="footer" class="dialog-footer">
			    <el-button @click="noticeNumberDlsg = false">取 消</el-button>
			    <el-button type="primary" @click="numberNotice">确 定</el-button>
		    </span>-->
		</el-dialog>		
	</section>
</template>

<script>
//========城市下拉====场景类型==二级分类下拉======搜索===发布公告====删除====
import { cityList,senceType,sencondClass,search,newNotic,deleteNotice } from '@/api/circle/batch'
export default {
  data () {
    return {
    	noticeDlsg: false,//发布公告
    	viewDlsg: false,//查看公告
    	disFlase: false,//点击场景圈，控制隐藏功能实现
    	noticeNumberDlsg: false,//圈主发布公告日条数限制
    	cityNameNotic: '',
    	sceneTypeName: '',
    	categoryIdName: '',
    	//发布公告表单
    	noticeForm: {
    		noticeContent: '',
    		publishType: '',
    		sceneType: '',
    		cityCode: '',
    		categoryId: '',
    		createdBy: '12121212'
    	},
    	chooseLen: 0,
    	selections: [],//保存勾选项的所有值
    	//圈主发布公告日条数限制--表单
    	noticeNumberForm: {
    		noticeContent: 5
    	},
    	viewForm: {
    		noticeContent: ''
    	},
    	//搜索的表单
      	searchForm: {
      		categoryType: '',
      		categoryId: '',//二级分类编码
      		cityCode: '',//城市编码
      		sceneType: '',//场景类型
        	pageNum: 1,
        	pageSize: 10,
        	createdBy: '2132121',
        	sort: ''
      	}, 
      	//排序数组
	    options: [
	        {
	          value: '1',
	          label: '按时间由近及远排序'
	        },
	        {
	          value: '2',
	          label: '按时间由远及近排序'
	        }
	    ],
      	//城市数组
        citys: [
          {
          	cityCode: '',
            cityName: ''
          }
    	],
    	//场景类型数组
    	sType: [
	    	{
	    		upCategoryId: '',	
	    		categoryName: ''
	    	}
    	],
    	//二级分类数组
    	classType: [
	    	{
	    		categoryCode: '',	
	    		categoryName: ''
	    	}    	
    	],
      tableData: [],//页面列表展示
      totalSize: '',
      currentPage: 1
    }
  },
  methods: {
  	//查找按钮
  	searchClick () {
  		if(this.searchForm.categoryType == '1'){
  			if(!this.searchForm.categoryType || !this.searchForm.cityCode || !this.searchForm.sceneType || !this.searchForm.categoryId){
	  			this.$message.warning('请选择场景圈下面完整信息！')
	  			return false  				
  			}else{
	  			search(this.searchForm).then(res => {
	  				this.tableData = res.data
	  				this.totalSize = Number(res.totalSize)
	  			})  				
  			}
  		}else if(this.searchForm.categoryType == '2'){
  			if(!this.searchForm.categoryType || !this.searchForm.cityCode || !this.searchForm.sceneType){
	  			this.$message.warning('请选择鸽舍圈下面完整信息！')
	  			return false  				
  			}else{
	  			search(this.searchForm).then(res => {
	  				this.tableData = res.data
	  				this.totalSize = Number(res.totalSize)
	  			})  				
  			}  			
  		}else{
  			this.$message.warning('请选择圈类型！')
  		}
  	},
  	
  	//发布方式筛选
  	typeStatus (row) {
  		if(row.publishType == 1){
  			return '常规'
  		}
  	},
  	
  	//城市改变
	cityChange (val) {
		this.searchForm.cityCode = val
		for(let i=0;i<this.citys.length;i++){
			if(this.citys[i].cityCode == val){
				this.cityNameNotic = this.citys[i].cityName
				this.noticeForm.cityCode = this.citys[i].cityCode
				return
			}
		}
	},
	
	//二级分类改变
	classChange (val) {
		this.searchForm.categoryId = val
		for(let i=0;i<this.classType.length;i++){
			if(this.classType[i].categoryCode == val){
				this.categoryIdName = this.classType[i].categoryName
				this.noticeForm.categoryId = this.classType[i].categoryCode
				return
			}
		}
	},
	
  	//场景圈的点击事件
  	sceneClick (val) {
		this.searchForm.cityCode = ''
		this.searchForm.categoryId = ''
		this.searchForm.sceneType = ''
		this.disFlase = true
		this.searchForm.categoryType = val
		senceType({categoryType:this.searchForm.categoryType}).then(res => {
			this.sType = []
			for(let i=0;i<res.data.length;i++){
				let obj = {}
				obj.upCategoryId = res.data[i].categoryCode
				obj.categoryName = res.data[i].categoryName
				this.sType.push(obj) 
			}
		})
  	},
  	
  	//场景类型改变  发送请求 渲染二级分类列表
  	senTypeChange (val) {
  		this.searchForm.sceneType = val
  		let upCategoryId =''
  		let categoryName =''
  		for(let i=0;i<this.sType.length;i++){
  			if(this.sType[i].upCategoryId == val){
  				upCategoryId = this.sType[i].upCategoryId
  				categoryName = this.sType[i].categoryName
  				this.sceneTypeName = this.sType[i].categoryName
  				this.noticeForm.sceneType = this.sType[i].upCategoryId
  			}
  		}
  		sencondClass(
  			{
  				upCategoryId: upCategoryId,
  				categoryName: categoryName,
  				pageNumber: 1,
  				pageSize: 10,
  				sortFlag: ''
  			}
  		).then(res => {
  			this.classType = []
			for(let k=0;k<res.data.length;k++){
				let obj ={}
				obj.categoryCode = res.data[k].categoryCode
				obj.categoryName = res.data[k].categoryName
				this.classType.push(obj)
			}
  		})
  	},
  	
  	handelQuery () {
  		//城市下拉
  		cityList().then(res => {
  			if(res.status == 200){
  				this.citys = res.data
  			}else if(res.status == 500){
  				console.log(res.errorMsg)
  			}
  		})
  	},
  	
  	//圈主发布日公告条数限制
  	numberTop (val) {
  		if(val<0){
  			this.noticeNumberForm.noticeContent = 5  			
  		}else if(val>100){
  			this.noticeNumberForm.noticeContent = 100 			
  		}
  	},
  	
  	   //圈主发布条数限制按钮
    publishNumber () {
    	this.noticeNumberDlsg = true
    },
  	
  	//发布公告按钮
	publishClick () {
		if(!this.searchForm.categoryType){
			this.$message.warning('点击圈类型，并选择完整信息！')
		}else if(this.searchForm.categoryType == '1'){
			if(!this.searchForm.cityCode || !this.searchForm.sceneType || !this.searchForm.categoryId){
				this.$message.warning('选择完整信息！')
			}else{
				this.noticeDlsg = true
			}
		}else if(this.searchForm.categoryType == '2'){
			if(!this.searchForm.cityCode || !this.searchForm.sceneType){
				this.$message.warning('选择完整信息！')
			}else{
				this.noticeDlsg = true
			}
		}
	},
	
	//发布公告的确定按钮
	saveNotice () {
		if(!this.noticeForm.noticeContent || !this.noticeForm.publishType){
  			this.$message.warning('请选择完整信息！')
  			return false			
		}else{
			if(this.searchForm.categoryType == '1'){
				newNotic(this.noticeForm).then(res => {
					if(res.status == '200'){
						this.$message.success('发布成功！')
						this.noticeDlsg = false
						this.noticeForm.noticeContent = ''
						this.noticeForm.publishType = ''
						//this.noticeForm.sceneType = ''
						//this.noticeForm.cityCode = ''
						//this.noticeForm.categoryId = ''
						this.searchClick()
					}
				})
			}else if(this.searchForm.categoryType == '2'){
				this.noticeForm.categoryId = ''
				newNotic(this.noticeForm).then(res => {
					if(res.status == '200'){
						this.$message.success('发布成功！')
						this.noticeDlsg = false
						this.noticeForm.noticeContent = ''
						this.noticeForm.publishType = ''
						//this.noticeForm.sceneType = ''
						//this.noticeForm.cityCode = ''
						//this.noticeForm.categoryId = ''
						this.searchClick()
					}
				})				
			}
		}
	},
  	
    selectionChange (selection) {
      this.chooseLen = selection.length
      this.selections = selection
    },  	
  	
    //处理分页
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.searchClick()
    },  

    //排序
    sortChange(val) {
      //console.log(val)
      this.searchForm.sort = val
      this.searchClick()
    },


    //删除按钮
    deleteClick () {
	  if(!this.selections.length){
	  	this.$message.warning('至少选一项！')
	  	return
	  }else{
	        let str = ''
	        let arr = []
	        for(let i=0,len=this.selections.length;i<len;i++){
	          arr.push(this.selections[i].id)
	        }
	        str = arr.join(',')
	        str = '您确定要删除公告'+ str + '吗？'
	        this.$confirm(str,'删除',{
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          // 点击确定
	          deleteNotice({ids:arr}).then(res => {
	          	if(res.errorMsg =='' && res.status == '200'){
	          		this.$message.success('删除成功！')
	          		this.searchClick()
	          	}else if(res.status == '500'){
	          		this.$message.warning(res.errorMsg)
	          	}
	          })
	        }).catch(() => {
	          // 点击取消
	        })	 	
	  }
    },

    //查看历史转账记录按钮
    view (row) {
    	let noticeContent = row.noticeContent
		this.viewDlsg = true
    	this.viewForm.noticeContent = row.noticeContent
    },

  },
  mounted() {
	this.handelQuery()
  }
}
</script>

<style scoped>
.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
  height: 0;
}

.fl {
  float: left;
}

.padLR15 {
  padding: 0 15px;
}

.searchInput.el-input {
  max-width: 300px;
}

.center {
  text-align: center;
}
.mb20 {
  margin-bottom: 20px;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: 101%;
}
</style>
