<template>
  <section>
    <div class="m20">
    	<div style="display: inline-block;float: right;margin-right: 50px;">
    		<el-button type="primary" @click="addThirdClick">新增三级分类</el-button>
    	</div>
      <el-form ref="form" :model="form" label-width="120px" :inline="true">
        <el-form-item prop="categoryName" label="三级分类名称：">
          <el-input v-model.trim="form.categoryName" placeholder="" maxlength="8" clearable></el-input>
        </el-form-item>
        <!--<el-form-item prop="upCategoryId" label="行业分类">
          <el-select clearable v-model="form.classifys" placeholder="请选择">
            <el-option
              v-for="item in classifys"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>-->
        <!--<el-form-item prop="upCategoryId" label="行业分类">
					<el-input disabled v-model="form.upCategoryName"></el-input>
        </el-form-item>-->
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
          <el-button type="success" icon="el-icon-search" @click="searchThree">查找</el-button>
          <el-button type="info" @click="back" icon="el-icon-back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="dataTable" stripe border style="width: 100%">
        <el-table-column prop="id" label="编号" width="170"></el-table-column>
        <el-table-column prop="upCategoryName" label="二级分类"></el-table-column>
        <el-table-column prop="categoryName" label="三级分类"></el-table-column>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="sumCircleMemberNum" label="三级分类内圈总人数" width="150"></el-table-column>
        <el-table-column prop="ownerNiceName" label="圈主昵称"></el-table-column>
        <el-table-column prop="ownerAccount" label="圈主账号"></el-table-column>
        <el-table-column prop="ownerLevel" label="圈主等级"></el-table-column>
        <!--<el-table-column prop="" label="朋友圈总条数"></el-table-column>-->
        <el-table-column :formatter="formatterStatus" prop="useable" label="状态"></el-table-column>
        <el-table-column prop="" label="管理" width="490">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"  @click="threeWeight(scope.row)">权重</el-button>
            <!--<el-button size="mini" type="danger" @click="closeClass(scope.row)">停用</el-button>
            <el-button size="mini" type="success" @click="openClass(scope.row)">启用</el-button>-->
        <el-dropdown trigger="click" size="mini" split-button type="warning" @command="moveTo" v-model="secondBird">
				  移至
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item v-for="item in secondBird" :command="composeValue(item,scope.row)"
				    	:key="item.columnName">{{item.columnName}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
            <!--<el-dropdown @command="moveTo">
              <el-button type="warning" size="mini">移至
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" v-model="secondBird">
                <el-dropdown-item  v-for="(item,index) in secondBird" :key="index" command="item.columnCode" >{{item.columnName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
            <el-button type="success" size="mini" @click="goToBird(scope.row)">该分类下的鸽舍圈管理</el-button>
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
            <el-input type="number" v-model.number="weightList.weight" :step="1" placeholder="请输入0-9的数值" @change="handleChangeA"></el-input>
            <p>0-9数值越小排序越靠前</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="deploy = false">取 消</el-button>
					<el-button type="primary" @click="threeWeightClick">确 定</el-button>
				</span>
		</el-dialog>

    <el-dialog
      title="新增下级分类"
      :visible.sync="addNew"
      width="30%">
      <div>
        <el-form ref="newForm" :model="newForm" label-width="160px">
          <el-form-item prop="upCategoryName" label="已选：">
            <!--<el-checkbox-group v-model="newForm.hasChoose" required>
              <el-checkbox v-for="(item,index) in hasChoose" :label="item.label" :key="index">{{item.value}}</el-checkbox>
            </el-checkbox-group>-->
            <el-input v-model="newForm.upCategoryName" placeholder="请输入分类名称" disabled></el-input>
          </el-form-item>  
          <el-form-item prop="categoryName" label="请输入分类名称：" required>
            <el-input v-model="newForm.categoryName" placeholder="请输入分类名称" maxlength="8" clearable></el-input>
          </el-form-item>
	      <el-form-item>
	          <el-button type="success" size="mini" style="margin-right: 20px;" @click="setTpye">设置标题</el-button>（选填）
	          <span style="margin-left:20px;border:1px solid #ccc;padding:10px;background-color: #C7C9CB;" v-for="(item, index) in circleTitleCheckbox" :key="index">{{item.titleName}}</span>
	      </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNew = false">取 消</el-button>
        <el-button type="primary" @click="addNewClass">确 定</el-button>
      </span>
    </el-dialog>

    <!--设置标题弹框-->
    <el-dialog
      :visible.sync="setHead"
      width="500px">
      <el-input style="width: 200px;" v-model="titleName" placeholder="请输入搜索内容" maxlength="8"></el-input>
      <el-button type="primary" @click="searchTitleClick">搜索</el-button>
      <br>
      <div style="margin-top:20px;">
        <el-button style="margin:20px 10px;" @click="getTitle(item)" v-for="(item, index) in titleButton" :key="id">{{item.titleName}}</el-button>
      </div>
      <hr/>
      <div style="margin: 1% 45%;">
      	<el-button type="text" @click="addTitleClick" size="medium">+</el-button>
      </div>
      <div class="line"></div>
        <el-button type="info" style="margin:20px 10px;" @click="cancelSelTitleBtn(item)" v-for="(item, index) in getTitleButton" :key="index">{{item.titleName}}</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setHead = false">取 消</el-button>
        <el-button type="primary" @click="saveSetTitle">确 定</el-button>
      </span>
    </el-dialog> 
    <!--添加新的分类弹框-->
    <el-dialog
      :visible.sync="addTitleDslg"
      width="500px">
      <el-input style="width: 200px;" v-model="addTitleName" placeholder="请输入新标题" maxlength="8"></el-input>
      <el-button type="primary" @click="addNewTitleClick">创建</el-button>
    </el-dialog>

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
	//=======三级分类搜索======城市下拉=====权重=======移动至的二级栏目获取==三级移动到二级===停启用=======搜索标题=======新增下级分类===创建标题
import { searchThreeLevel,citylist,weightBird,searchsencondLevel,saveColumn,openAndClose,searchTitle,addNextClass,addTitle } from '@/api/group/bird'
  export default{
    data(){
      return{
      	//新增下级分类
      	newForm: {
      		upCategoryName: '',
      		categoryName: ''
      	},
      	addNew: false,
      	setHead: false,
      	addTitleDslg: false,
      	circleTitleCheckbox: [],//标题处  显示在页面的数组
      	titleName: '',//设置分类标题弹框的文本框输入内容
      	addTitleName: '',
      	 // 点击选中的标题按钮
    		getTitleButton: [
    			{
	      		id: '',
	      		titleName: ''    				
    			}
    		],
      	// 接口获取标题按钮
      	titleButton: [
	      	{
	      		id: '',
	      		titleName: ''
	      	}
      	], 
        form: {
        	//上级分类编码
					upCategoryId: '',
					//三级分类名称
					categoryName: '',
					//城市编码
					cityCode: '',
      		pageNumber: 1,
      		pageSize: 10,
      		sortFlag: ''
        },
        //城市数组
        cities: [
          {
            cityName: '',
            cityCode: '',
          }
        ],
      	deploy: false,
      	secondBird:[
      		{
      			columnName: ''
      		}
      	],
      	//secondBird: [],
      	totalSize: '',
        currentPage: 1,
        weightList:{
        	id: '',
        	weight: ''
        },
        classifys: [
          {
            categoryName: '',
            id: 0
          }
        ],
        dataTable: [{}]

      }
    },
    methods:{
    	//新增三级分类按钮
    	addThirdClick () {
    		this.addNew = true
    	},
    	
			//设置标题按钮
			setTpye () {
				this.setHead = true
				this.getTitleButton = []
				this.titleButton = []
			},
			
	    // 设置标题按钮的  搜索
	    searchTitleClick() {
		      searchTitle(
		      	{
		      		titleName:this.titleName,
		      		hasDel: 0//此字段未写死字段，后台要求
		      	}
		      	).then(res => {
		      		if(res.status == 200){
		      				this.$message.success("获取标题成功！");
		      				this.titleButton = []
		      				for(let i=0;i<res.data.length;i++){
		      					let obj ={}
		      					obj.id = res.data[i].id
		      					obj.titleName = res.data[i].titleName
		      					this.titleButton.push(obj)
		      				}
		      		}
		        })
		        .catch(() => {
		          this.$message.error("获取标题失败");
		        });
	    }, 

	    //搜索出来的标题的点击
	    getTitle(item) {
	      this.getTitleButton = [item]
	    },
	    
	    //选择标题的点击
	    cancelSelTitleBtn(item) {
	      var index = this.getTitleButton.indexOf(item)
	      this.getTitleButton.splice(index, 1)
	    },
	    
	     // 设置标题弹框的确定按钮
	    saveSetTitle() {
		    	if (!this.getTitleButton.length) {
			    		this.$message.warning('未选择标题！')
			    		return
		    	}else{
							this.circleTitleCheckbox = this.getTitleButton
							this.setHead = false
	
		    	}
	    }, 
	    
			//新增下一级分类     确定按钮
			addNewClass(){
				let obj = {}
				obj.memberId = 1
				obj.upCategoryId = this.form.upCategoryId
				obj.categoryName = this.newForm.categoryName				
				for(let i=0;i<this.circleTitleCheckbox.length;i++){
						obj.categoryTitleId = this.circleTitleCheckbox[i].id
						obj.categoryTitleName = this.circleTitleCheckbox[i].titleName
				}
				if(!obj.memberId || !obj.upCategoryId || !obj.categoryName){
						this.$message.warning('栏目名称不能为空！')
						return
				}else{
						addNextClass(obj).then(res => {
								if(res.data == true && res.status ==200){
									this.$message.success('创建下级分类成功！')
									this.newForm.categoryName = ''
									this.circleTitleCheckbox = []
									this.searchThree()	
									this.addNew = false
							}
						})	.catch(error =>{
							console.log(error)
						})
				}
			},  
			
    //新建分类的+按钮
		addTitleClick	() {
			this.addTitleDslg = true
		},
		
		//创建表填按钮
		addNewTitleClick () {
			addTitle({titleName:this.addTitleName}).then(res => {
				if(res.data == true && res. status == 200){
					this.$message.success('创建成功！')
					this.addTitleDslg = false
					this.searchTitleClick()
					this.addTitleName = ''
				}
			})
		},			
    
    	//页面刷新动态渲染城市下拉框
    	handlecity () {
				citylist().then(res => {
					this.cities = res.data
				})
    	},
    	
    	//页面刷新  移动至下面的二级列表平自动渲染
			handlemove(){
				searchsencondLevel({columnCode: "GS"}).then(res => {
					this.secondBird = res.data
				})
			},    	
    	
    	//页面一刷新有查询到三级列表
    	handleQuery () {
      	let query = this.$router.currentRoute.query
    	  //console.log(this.$router.currentRoute)
				//保存上级id
      	this.form.upCategoryId = query.categoryCode
      	this.newForm.upCategoryName = query.categoryName
      	searchThreeLevel(this.form).then(res => {
      		//console.log(res)
      		this.dataTable = res.data
      		this.totalSize = Number(res.totalSize)
      	})
    	},    	
    	
    	//处理分页
   	 handleCurrentChange (val) {
	    	this.form.pageNumber = val
	    	this.searchThree()
    	},
    	
			//搜索按钮  获取三级栏目列表
			searchThree () {
      	let query = this.$router.currentRoute.query
    	  //console.log(this.$router.currentRoute)
				//保存上级id
	    	this.form.upCategoryId = query.categoryCode
      	searchThreeLevel(this.form).then(res => {
      		this.dataTable = res.data
      		this.totalSize = Number(res.totalSize)
      	})
			},    	
    	
      //权重改变
			handleChangeA (val) {
				if(val<0){
					this.weightList.weight = 0
				}else if(val>9){
					this.weightList.weight = 9
				}else{
					this.weightList.weight = val
				}
			},
			
    	//权重弹出框
    	threeWeight(row) {
    		this.weightList.id = row.id
    		this.weightList.weight = row.weight
				this.deploy = true
    	},

      //权重确定按钮
      threeWeightClick(){
      	if(!this.weightList.weight){
      		this.$message.warning('权重不能为空！')
      		return false
      	}else{
      		weightBird(this.weightList).then(res => {
      			if(res.data == true && res.status == '200'){
      			this.weightList.weight = res.paramter.weight
      			this.$message.success('修改权重成功！')
      			this.deploy = false
      			this.searchThree()						
      			}
      		})
      	}      	
      },

      //移动至下面点击获取当前行的id和当前二级栏目的id方法
      composeValue(item,row){
      	return {
      		'command': item.id,
      		'row': row.id
      	}
      },

      //移动至二级栏目接口
      moveTo(command){
        saveColumn({
        	columnId: command.command,
        	categoryId: command.row
        }).then(res => {
        	if(res.data == true && res.status == '200'){
        		this.$message.success(' 移动成功！')
        		this.searchThree()	
        	}else if(res.data == false && res.status == '200'){
        		this.$message.warning(' 移动失败，该分类已属于该栏目！')
        	}
        })
      },

			//处理状态
    	formatterStatus (row) {
    		if (row.useable == 0) {
    			return "正常"
    		} else if (row.useable == 1) {
    			return '停用'
    		}
    	},

      goToBird(row){
//      	console.log(row)
				if(row.ownerAccount){
		        this.$router.push({
		          path: '/circlemanage/bird/birds',
		    			query:{
								categoryCode : row.categoryCode,
								//三级分类名称
								categoryName: row.categoryName,
								//圈标签==标题
								categoryTitleName: row.categoryTitleName,
								ownerAccount: row.ownerAccount
								//圈标签的id==标题id
								//categoryTitleId: row.categoryTitleId
		      			}
		        })
				}else{
		        this.$router.push({
		          path: '/circlemanage/bird/birds',
		    			query:{
								categoryCode : row.categoryCode,
								//三级分类名称
								categoryName: row.categoryName,
								//圈标签==标题
								categoryTitleName: row.categoryTitleName,
								//圈标签的id==标题id
								//categoryTitleId: row.categoryTitleId
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
      					this.searchThree()
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
      					this.searchThree()
      				}else if(res.errorMsg != '' && res.status == 500){
      					this.$message.error('禁用失败，该分类下有群信息')
      				}
      			})
      		}
    	},   	

      back(){
        this.$router.go(-1)
      }

    	//页面刷新动态渲染行业分类---5.18产品取消
//  	handleindustry(){
//				industry({columnCode:'GS'}).then(res => {
//					//console.log(res)
//					this.classifys = res.data
//				})
//  	},

    },
    mounted(){
		this.handleQuery()
		this.handlemove()
		this.handlecity()
    }

  }
</script>

<style scoped lang="scss">
</style>
