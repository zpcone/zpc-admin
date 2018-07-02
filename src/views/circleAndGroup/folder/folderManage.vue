<template>
  <section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
			<div class="create">
				<!--<el-button type="primary" icon="el-icon-setting" @click="create">保存</el-button>-->
				<el-button type="primary" icon="el-icon-setting" @click="back">返回</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="form" v-model="form" label-width="140px">
				<el-form-item prop="channleId" label="渠道：">
					<el-radio-group v-model="form.channleId">
						<el-radio-button label="1" value="">电商</el-radio-button>
						<el-radio-button label="2" value="">社交</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</el-card>
		
    <el-form ref="form" :model="form">
			<div class="setting">
				<!--<span>当前选中&nbsp;{{chooseLen}}&nbsp;项</span>&nbsp;-->
				<el-button type="info" @click="newFil">新增分组文件夹</el-button>&nbsp;
				<el-input v-model="form.groupName" placeholder="搜索分组文件夹名称" style="width:10%" clearable></el-input>&nbsp;
				<el-button icon="el-icon-search" circle @click="searchAll"></el-button>
				<el-button type="danger" icon="el-icon-delete" circle @click="deleteClick"></el-button>
				<el-button type="success" round @click="upFolClick">置顶</el-button>
				<el-button type="info" round @click="downFolClick">取消置顶</el-button>
			</div>
    </el-form>
	<div style="margin: 0px 13px;">
			<div class="table" style="margin: 20px 5px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="channleId" label="渠道" :formatter="channelFormat"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="groupName" label="分组名称"></el-table-column>
					<el-table-column prop="created" label="创建时间"></el-table-column>
					<el-table-column prop="isToTop" label="置顶状态" :formatter="topFormat"></el-table-column>
					<el-table-column prop="toTopDate" label="置顶时间"></el-table-column>
						<!--头像和名称-->
					</el-table-column>
				</el-table>
			</div>
	</div>
    <!--<p style="text-align: center;">
      <el-button type="text">查看更多</el-button>
    </p>-->
    
    	<!--新增分组文件夹弹框-->
    <el-dialog
      title="新建分组文件夹"
      :visible.sync="addDlsg"
      width="30%">
      <div style="margin-left: 15px;">
        <el-form ref="addForm" :model="addForm" label-width="120px">
				  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				  <div style="margin: 15px 0;"></div>
				  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
				  </el-checkbox-group>    		
          <el-row>
            <el-col :span="18">
              <el-form-item prop="" label="添加分组文件：">
                <el-input v-model="newName" placeholder="请输入新的分组文件名" clearable maxlength="8"></el-input>
              </el-form-item>
              <el-button type="primary" style="position: absolute;top: 0;right: 0;" @click="add">添加</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="addNewList">确认新增</el-button>
        <el-button @click="addDlsg = false">取 消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
	//===新建分组文件===查询分组文件夹==删除====置顶
import { newFolder,searchFolder,delFol,upFol,downFol } from '@/api/circleAndGroup'	
  export default{
    data(){
      return{
      	newName: '',
        form:{
        	groupName: '',
        	channleId:''
        },
        tableData: [],
        selectionsArr: [],
        sorts:[
	        {
	        	value: '1',
	        	label: '按创建时间由近及远排序'
	        },
	        {
	        	value: '2',
	        	label: '按关联会员人数由高到低排序'
	        }	        
        ],
        addDlsg: false,
        addForm: {
        	channleId: '',
        	groupName: '',
        	userId: '2121212121'
//      //选中的数组
//      checkedCities: [],
//      //添加新的分组会保存在这个数组
//      cities: [],
        },
        checkedCities: [],
        cities: [],
        //保存分组文件夹页面的所有文件夹名称和id
        systemLabels:[
        {
        	systemLabelsId:'',
        	systemLabelsName:'',
        }        
        ],
        //保存分组文件夹页面的已选中的文件夹名称和id
        systemLabelsed:[],
        data: [{}],
        //新建分组文件夹弹框的多选
        checkAll: false,
        isIndeterminate: true,
        //分组文件夹页面的文件夹多选
        chooseLen: 0,
        chooseLenArr: [],
      }
    },
    methods:{
    	handleQuery(){
    		//页面刷新  渲染文件夹列表    		
    		if(!this.form.groupName && !this.form.channleId){
		    		searchFolder({}).then(res => {
		    			this.tableData = res.data
							if(res.data.length){
								for(let i=0;i<res.data.length;i++){
			    					if(res.data[i].isToTop == 0){
			    						res.data[i].toTopDate =''
			    					}
			    			}
							}
		  		})    			
    		}else{
		    		searchFolder(
		    			{
		    				groupName:this.form.groupName,
		    				channleId:this.form.channleId
		    			}
		    			).then(res => {
		    				this.tableData = res.data
								if(res.data.length){
									for(let i=0;i<res.data.length;i++){
				    					if(res.data[i].isToTop == 0){
				    						res.data[i].toTopDate =''
				    					}
				    			}
								}
		  		})
    		}
    	},
			channelFormat (row) {
				if(row.channleId == '1'){
					return '电商'
				}else if(row.channleId == '2'){
					return '社交'
				}
			},
			topFormat (row) {
				if(row.isToTop == 1){
					return '已置顶'
				}else if(row.isToTop == 0){
					return '未置顶'
				}			
			},
			selectionChange (selection) {
				this.selectionsArr = selection
			},
      //返回按钮
      back () {
      	this.$router.push('/circleandgroup/team/folder')
      },
      //新建分组按钮
      newFil () {
      	if(!this.form.channleId){
      		return this.$message.warning('请选择渠道！')
      		this.addDlsg = false
      	}else{
      		this.addDlsg = true
      	}
      },
      //新建分组文件夹弹框多选的方法
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
      },
      //新建分组文件夹弹框多选的方法
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      //新建分组文件夹下面多选的方法
      handleCheckedCitiesChanges(value) {
      	this.chooseLen = 0
      	this.chooseLenArr = []
				for(let i=0;i<value.length;i++){
		      	let obj ={}
		      	obj.id = value[i]	
		      	this.chooseLenArr.push(obj)
				}
      },
      
			//删除按钮
			deleteClick () {
				if(!this.selectionsArr.length){
						this.$message('删除失败，请至少选择一项！')
				}else{
						let arr = []
						for(let i=0;i<this.selectionsArr.length;i++){
								let obj = {}
								obj.id = this.selectionsArr[i].id
								arr.push(obj)
						}
						delFol(arr).then(res => {
							if(res.data == true && res.status == '200'){
								this.$message.success('删除成功！')
								this.handleQuery()
							}
						})					
				}
			},      
      
      
      //分组文件夹弹框的添加按钮
      add () {
      	if(!this.newName){
      			this.$message.warning('分组名称不能为空，请先输入分组名！')
      			return false          		
      	}else{
      		if(!this.cities.length){
			    	  this.cities.push(this.newName)
			    		this.newName = ''         	
      		}else if(this.cities.length){
      			for(let i=0;i<this.cities.length;i++){
      				if(this.newName == this.cities[i]){
			      			this.$message.warning('不能重复输入！')
			      			return         					
      				}
      			}
      			this.cities.push(this.newName)
			    	this.newName = ''         	
      		}
      	}
      },
     	 //确认新增分组文件夹的按钮
      addNewList () {
	      	if(!this.checkedCities.length){
	      		this.$message.warning('请选择分组名！')
	      	}else{
		      	newFolder({
		      		channleId: this.form.channleId,
		      		groupNameList: this.checkedCities,
		      		userId: '121212121'
		      	}).then(res => {
		      		if(res.data == true && res.status == '200'){
		      			this.$message.success('新建分组文件夹成功！')
		      			this.addDlsg = false
		      			this.checkedCities = []
		      			this.cities = []
		      			this.newName = ''
		      			this.handleQuery()
		      		} else if(res.errorMsg != '' && res.status == '500'){
		      			this.$message.warning('新建失败，包含已存在的分组名！')
		      			this.cities = []
		      			this.checkedCities = []
		      		}
		      	})        		
	      	}      	
      },


			//置顶
			upFolClick(){
				if(!this.selectionsArr.length){
						this.$message('置顶失败，请至少选择一项！')
				}else{
						for(let i=0;i<this.selectionsArr.length;i++){
								if(this.selectionsArr[i].isToTop == 1){
										this.$message.warning('包含置顶项，请勿重复操作！')
										return
								}
						}					
						let arr = []
						for(let i=0;i<this.selectionsArr.length;i++){
								let obj = {}
								obj.id = this.selectionsArr[i].id
								arr.push(obj)
						}
						upFol(arr).then(res => {
							if(res.data == true && res.status == '200'){
								this.$message.success('置顶成功！')
								this.handleQuery()
							}
						})					
				}				
			},
			//取消置顶
			downFolClick () {
				if(!this.selectionsArr.length){
						this.$message('取消置顶失败，请至少选择一项！')
				}else{
						for(let i=0;i<this.selectionsArr.length;i++){
								if(this.selectionsArr[i].isToTop == 0){
										this.$message.warning('包含未置顶项，请重新选择！')
										return
								}
						}					
						let arr = []
						for(let i=0;i<this.selectionsArr.length;i++){
								let obj = {}
								obj.id = this.selectionsArr[i].id
								arr.push(obj)
						}
						downFol(arr).then(res => {
							if(res.data == true && res.status == '200'){
								this.$message.success('取消成功！')
								this.handleQuery()
							}
						})					
				}					
			},

      //搜索分组文件夹旁边的搜索按钮
			searchAll () {
				this.handleQuery()
//						searchFolder(
//							{
//								groupName:this.form.groupName,
//								channleId:this.form.channleId
//							}
//							).then(res => {
//							if(res.data.length == 0){
//								this.$message('暂无数据！')
//							}else{
//								this.systemLabels = []
//								this.systemLabels.systemLabelsName = res.data[0].groupName
//								this.systemLabels.systemLabelsId = res.data[0].id
//							}
//						})					
			}
    },
    mounted (){
    	this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
.create {
	position: absolute;
	right: 100px;
	top: 109px;
}
.setting {
	margin-left: 20px;
}
</style>