<template>
  <section>
    <div class="mb20" style="margin: 20px 20px;">
      <div style="margin-bottom: 20px;">
        <el-button type="primary" icon="el-icon-plus" @click="create">创建一级分类</el-button>
      </div>
      <el-form class="mb20" inline 
        style="background: #f1f1f1;padding: 20px 20px;" 
        ref="searchForm" v-model="searchForm" label-width="100px">
        <el-form-item label="搜索：" prop="categoryName">
          <el-input  v-model.trim="searchForm.categoryName" placeholder="请输入分类名称" maxlength="8" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="channelType">
          <el-radio-group v-model="searchForm.channelType" @change="channelChange">
          	<el-radio-button label="1">电商</el-radio-button>
            <el-radio-button label="2">社交</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="性质：" prop="categoryNature">
          <el-radio-group v-model="searchForm.categoryNature" @change="categoryChange">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">圈</el-radio-button>
            <el-radio-button label="2">群</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="级别：" prop="categoryLevel"  v-if="searchForm.channelType == 1">
          <el-radio-group v-model="searchForm.categoryLevel" @change="levelChange">
            <el-radio-button v-for="(item,index) in getCategoryLevel" :label="item.categoryLevel" :key="item.categoryLevel">{{ item.categoryLevelName }}</el-radio-button>
            <!--<el-radio-button label="2">2级分类</el-radio-button>
            <el-radio-button label="3">3级分类</el-radio-button>
            <el-radio-button label="4">4级分类</el-radio-button>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="级别：" prop="categoryLevel"  v-if="searchForm.channelType == 2">
          <el-radio-group v-model="searchForm.categoryLevel" @change="levelChange">
          	<el-radio-button v-for="(item,index) in getCategoryLevel" :label="item.categoryLevel" :key="item.categoryLevel">{{ item.categoryLevelName }}</el-radio-button>
          	 <!--<el-radio-button v-for="(item,index) in getCategoryLevel" :label="index+1" key="index">{{ item.categoryLevelName }}</el-radio-button>-->
            <!--<el-radio-button label="1">1级分类</el-radio-button>
            <el-radio-button label="2">2级分类</el-radio-button>
            <el-radio-button label="3">3级分类</el-radio-button>-->
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="创建方式：" prop="createMode">
          <el-radio-group v-model="searchForm.createMode" @change="modeChange">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">系统预设</el-radio-button>
            <el-radio-button label="2">后台创建</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />   
        <el-form-item style="margin: 0% 45%;text-align: center;">
          <el-button  style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
        </el-form-item>
      </el-form>
      <div class="setting" style="margin-top: 20px;padding-left: 20px;">
        <!--排序 + 全选 + 已选中项数-->
        <span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortFlag" @change="seleChange" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
        <span>当前选中{{chooseLen}}项</span>
        
				<el-button size="mini" type="primary" @click="configPeopleUp">配置人数上限</el-button>
				<el-button size="mini" v-if="searchForm.channelType == '1'" type="primary" @click="setNumber">设置群升级圈的规定人数</el-button>
				<el-button size="mini" v-if="searchForm.channelType == '1'" type="primary" @click="setFissionClick">设置智能裂变规定人数</el-button>
      
      </div>
     
      <div class="table" style="margin: 20px 10px;min-height: 100px;">
        <el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="分类ID" width="170"></el-table-column>
          <el-table-column prop="categoryCode" label="分类编码"></el-table-column>
          <el-table-column prop="channelType" label="渠道" :formatter="channelStatus"></el-table-column>
          <el-table-column prop="categoryNature" label="性质" :formatter="categoryStatus"></el-table-column>
          <el-table-column prop="categoryName" label="分类名称" width="120"></el-table-column>
          <el-table-column prop="explain" label="分类说明"></el-table-column>
          <el-table-column prop="categoryLevel" label="级别"></el-table-column>
          <el-table-column prop="upCategoryName" label="上级分类名" width="120"></el-table-column>
          <el-table-column prop="createMode" label="创建方式" :formatter="createModeStatus"></el-table-column>
          <el-table-column prop="created" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="toplimit" label="人数上限"></el-table-column>
          <el-table-column prop="crowdToCircleNum" v-if="searchForm.channelType == '1'" label="群升圈人数" width="96"></el-table-column>
          <el-table-column prop="parallelFissionNum" v-if="searchForm.channelType == '1'" label="平行裂变人数" width="108"></el-table-column>
          <el-table-column prop="endwiseFissionNum" v-if="searchForm.channelType == '1'" label="纵向裂变人数" width="108"></el-table-column>
            <!--头像和名称-->
          </el-table-column>
          <el-table-column width="220" label="管理">
            <template slot-scope="scope">
           		<el-button size="mini" type="warning" :disabled="scope.row.createMode == 1 || !scope.row.createMode" @click="dialogClick(scope.row)">编辑</el-button>
              <!--<el-button size="mini" type="danger" @click="closeClass(scope.row)">停用</el-button>
              <el-button size="mini" type="success" @click="openClass(scope.row)">启用</el-button>-->
              <!--<el-button size="mini" type="primary" @click="newAdd(scope.$index, scope.row)">新增下级分类</el-button>-->
              <el-button size="mini" type="primary" @click="addNewClick(scope.row)">新增下级分类</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination center">
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page.sync="searchForm.pageNumber" 
          :page-size="searchForm.pageSize" layout="total, prev, pager, next" 
          :total="totalSize">
        </el-pagination>
      </div>
    </div>

		<!--编辑分类名称-->
		<el-dialog
		  title="请输入新的分类名称"
		  :visible.sync="dialogVisible"
		  width="20%"
		  >
		  <el-input  type="text" v-model="dialogForm" style="width:90%;height:30px" maxlength='8' clearable></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="edit()">确 定</el-button>
		  </span>
		</el-dialog>

   <el-dialog
				title="人数上限配置"
				:visible.sync="deploy"
				width="20%">
				<div>
        <el-form ref="topNumber" :model="topNumber" label-width="130px">
          <!--<el-form-item prop="toplimit" label="已选：">
        		<el-checkbox v-model="isAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
          </el-form-item>-->
          <el-form-item prop="toplimit" label="请输入上限人数：">
            <!--<el-input v-model="topNumber.toplimit"></el-input>-->
            <el-input v-if="categoryNature == 2" placeholder="默认上限500" type="number" v-model.number="topNumber.toplimit" :step="1" @change="handleChangeA"></el-input>
            <p v-if="categoryNature == 2">* 输入人数不可超过3000，可自行编辑</p>
            <el-input v-if="categoryNature == 1 && channelType == 1" placeholder="默认上限2500" type="number" v-model.number="topNumber.toplimit" :step="1" @change="handleChangeB"></el-input>
            <p v-if="categoryNature == 1 && channelType == 1">* 输入人数不可超过3000，可自行编辑</p>
            <el-input v-if="categoryNature == 1 && channelType == 2" placeholder="默认上限3000" type="number" v-model.number="topNumber.toplimit" :step="1" @change="handleChangeC"></el-input>
            <p v-if="categoryNature == 1 && channelType == 2">* 输入人数不可超过3000，可自行编辑</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="deploy = false">取 消</el-button>
					<el-button type="primary" @click="topNumberClick">确 定</el-button>
				</span>
		</el-dialog>

   <el-dialog
				title="设置群升级圈的规定人数"
				:visible.sync="setDeploy"
				width="20%">
				<div>
        <el-form ref="gToCNumber" :model="gToCNumber" label-width="140px">
          <!--<el-form-item prop="toplimit" label="已选：">
        		<el-checkbox v-model="isAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
          </el-form-item>-->
          <el-form-item prop="crowdToCircleNum" label="请输入规定人数：">
            <!--<el-input v-model="topNumber.toplimit"></el-input>-->
            <el-input placeholder="默认上限500" type="number" v-model.number="gToCNumber.crowdToCircleNum" :step="1" @change="handleChangeD"></el-input>
            <!--<p>* 人数上限为500，可自行编辑</p>-->
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="setDeploy = false">取 消</el-button>
					<el-button type="primary" @click="setNumberClick">确 定</el-button>
				</span>
		</el-dialog>
		
		
   <el-dialog
				title="设置智能裂变规定人数"
				:visible.sync="setFisDeploy"
				width="30%">
				<div>
        <el-form ref="FisNumber" :model="FisNumber" label-width="240px">
          <!--<el-form-item prop="toplimit" label="已选：">
        		<el-checkbox v-model="isAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
          </el-form-item>-->
          <el-form-item prop="parallelFissionNum" label="请输入智能平行裂变的规定人数：">
            <!--<el-input v-model="topNumber.toplimit"></el-input>-->
            <!--<el-input v-if="channelType == 2" placeholder="上限2000" type="number" v-model.number="FisNumber.parallelFissionNum" :step="1" @change="handleChangeE"></el-input>
            <p v-if="channelType == 2">* 人数上限为2000，可自行编辑</p>-->
            <el-input v-if="channelType == 1" placeholder="默认上限2500" type="number" v-model.number="FisNumber.parallelFissionNum" :step="1" @change="handleChangeF"></el-input>
            <p v-if="channelType == 1">* 输入人数不可超过3000，可自行编辑</p>
          </el-form-item>
          <el-form-item v-if="channelType == 1" prop="endwiseFissionNum" label="请输入智能纵向裂变的规定人数：">
            <!--<el-input v-model="topNumber.toplimit"></el-input>-->
            <el-input placeholder="默认上限500" type="number" v-model.number="FisNumber.endwiseFissionNum" :step="1" @change="handleChangeG"></el-input>
            <p>* 输入人数不可超过3000，可自行编辑</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="setFisDeploy = false">取 消</el-button>
					<el-button type="primary" @click="setFissionSave">确 定</el-button>
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
    
  </section>
</template>

<script>
	//=======搜索=============改分类名=========设置群升圈人数====设置裂变人数==搜索标题=====新增标题====新增下级分类====配置人数上限====
import { searchClassList,changeClassName,setGtoCnumber,setFission,searchTitle,addTitle,addNextClass,setTopNumber,searchByLevel } from '@/api/group/classify'
  export default{
    data(){
      return{
        searchForm: {
        	channelType: '',
        	categoryNature: '',//分类性质 1圈 2群
        	categoryLevel: '',//分类级别
        	createMode: '',//创建方式 1-系统预设 2-后台创建
          categoryName: '',//分类名称  
          pageNumber: 1,
          pageSize: 10,
          sortFlag: '',//1-时间由近到远 2-级别由高到低
        }, 
	      // 动态保存级别的数组
	      getCategoryLevel: [
	          {
	          	categoryLevel: '',
	          	categoryLevelName: ''
	          }
	      ],
      	categoryNature: '',//勾选时获当前行属于群还是圈
      	rowToplimit: '',//勾选时获当前行人数上限
      	channelType: '',//勾选时获当前行渠道
      	crowdToCircleNum: '',//勾选时获取当前行的群升级圈的规定人数
      	endwiseFissionNum: '',//勾选时获取当前行的纵向裂变人数
      	parallelFissionNum: '',//勾选时获取当前行平行裂变的人数
      	titleName: '',//设置分类标题弹框的文本框输入内容
//    	addTitleName: '',//小+号里面的文本框内容
      	// 接口获取标题按钮
      	titleButton: [
	      	{
	      		id: '',
	      		titleName: ''
	      	}
      	], 
      	 // 点击选中的标题按钮
    		getTitleButton: [
    			{
	      		id: '',
	      		titleName: ''    				
    			}
    		],
    		circleTitleCheckbox: [],//显示在页面的数组
      	dialogForm: '', // 编辑按钮弹出框-内部-输入框的内容
      	dialogId: '', // 编辑按钮弹出框-所需id
      	dialogVisible: false,//编辑弹框
      	addTitleDslg: false,//添加分类的小+按钮
      	setDeploy:false,//群升级圈规定人数弹框
      	deploy: false,//配置人数上限弹框
      	addNew: false,//新增下级分类弹框
      	setHead:false,//新增下级分类弹框中的设置标题弹框
      	setFisDeploy: false,//设置智能裂变的规定人数
      	addNewClickId: '', //保存新增下级分类的当前行id
      	topNumeberId: [],//保存更改人数上限的id
      	isAll: false,
      	useable: '',//可用标识
      	totalSize: '',
        currentPage: 1,
        chooseLen: 0,
        //配置人数上限
        topNumber: {
        	toplimit:''
        },
        //群升级圈的规定人数
        gToCNumber: {
        	crowdToCircleNum:''
        },
        //设置智能裂变的人数
        FisNumber: {
        	//平行
        	parallelFissionNum: '',
        	//纵向
        	endwiseFissionNum: ''
        },
        tableData: [],
        options: [
          {
            label: '时间由近及远',
            value: '1'
          },
          {
            label: '级别由高到低',
            value: '2'
          }
        ],
				//新增下级分类的表单
        newForm:{
        	upCategoryName: ''//上级分类名称
        },
//      hasChoose:[
//        {
//          label:1,
//          value:"大旅游"
//        }
//      ],
//    	设置标题弹框里面的字段,调时更改
      	categoryName: '',
      	typeButton: [],
      	circleTypeCheckbox: [],
      
      }
    },
    methods:{
      
      //查询按钮  查询分页角色信息
      search(){
      	searchClassList(this.searchForm).then(res => {
    		//console.log(res)
      		this.tableData = res.data
      		this.totalSize = Number(res.totalSize)
    		//console.log(this.tableData)
      	}).catch(error => {
      		console.log(error)
      	})
      },

			//渠道筛选
	    channelStatus(row){
	      if(row.channelType === 1){
	        return '电商'
	      }else if(row.channelType === 2){
	        return '社交'
	      }
	    },  
	   
	    //性质筛选
	    categoryStatus (row) {
	      if(row.categoryNature === 1){
	        return '圈'
	      }else if(row.categoryNature === 2){
	        return '群'
	      }	    	
	    },
	    
	    //创建方式筛选
	    createModeStatus (row) {
	      if(row.createMode === 1){
	        return '系统预设'
	      }else if(row.createMode === 2){
	        return '后台创建'
	      }    	
	    },	    

	    //排序值改变刷新列表
	    seleChange (val) {
	    	this.searchForm.sortFlag = val
	    	this.search()
	    },

			//  点击编辑事件
			dialogClick (row) {
				this.dialogVisible = true
				this.dialogForm = row.categoryName
				this.dialogId = row.id
			},

			//	编辑按钮的  弹框的确定
      edit(){
				var obj = {}
				obj.id = this.dialogId
				obj.categoryName = this.dialogForm
				changeClassName(obj).then(res => {
						if(res.data == true && res.status == '200'){
							this.$message.success('修改分类名称成功！')
						}
						this.dialogVisible = false
						this.search()
				}).catch(error => {
					console.log(error)
				})
      },    

    	//保存配置人数上限全选所需的id
      selectionChange(val) {
    		this.chooseLen = val.length
      	this.topNumeberId = []
      	if (val.length == this.tableData.length) {
	      	this.isAll = true
      	}else{
      		this.isAll = false
      	}
      	for(let i=0;i<val.length;i++){
      		this.topNumeberId.push(val[i].id)
      		//当前行的人数上限
      		this.rowToplimit = val[i].toplimit
      		//渠道
      		this.channelType = val[i].channelType
      		//性质 1圈 2群
      		this.categoryNature = val[i].categoryNature
      		//群升级圈的规定人数
      		this.crowdToCircleNum = val[i].crowdToCircleNum
      		//平行裂变人数
      		this.parallelFissionNum = val[i].parallelFissionNum
      		//纵向裂变人数
      		this.endwiseFissionNum = val[i].endwiseFissionNum
      	}
      },

      //配置人数上限按钮
    	configPeopleUp () {
	    		if(!this.topNumeberId.length){
	      		this.$message('请勾选需要修改人数上限项，只能选一项')
	      		return
	      	}else if(this.topNumeberId.length>1) {
	      		this.$message('只能勾选一条数据！')
	      		return	      		
	      	}else{
		      		if(!this.rowToplimit || this.rowToplimit == 0){
			      			if(this.categoryNature == 2){
			      				this.topNumber.toplimit = 500
			      			}else if(this.categoryNature == 1 && this.channelType == 1){
			      				this.topNumber.toplimit = 2500
			      			}else if(this.categoryNature == 1 && this.channelType == 2){
			      				this.topNumber.toplimit = 3000
			      			}
		      		}else if(this.rowToplimit){
		      			this.topNumber.toplimit = Number(this.rowToplimit)
		      		}
	      		this.deploy = true
	      	}
    	},    

      //配置人数上限弹框的确定按钮
      topNumberClick(){
      	setTopNumber({
  		 		ids : this.topNumeberId,
      		toplimit : this.topNumber.toplimit,
      	 	isAll : this.isAll
      	}).then(res => {
    		//console.log(res)
    		if(res.data == true && res.status==200){
    			this.deploy = false
    			this.$message.success('修改人数上限成功!')
    			this.search()
    		}else{
    			this.$message('修改失败，请刷新后重试')
    		} 			
      }).catch((error) => {
						console.log(error)
	      })	
      },

			//设置群升级圈规定人数按钮
			setNumber () {
				if(!this.topNumeberId.length){
	      		this.$message('请勾选需要修改人数上限项，只能选一项，只支持电商群！')
	      		return					
				}else if(this.topNumeberId.length>1){
	      		this.$message('只能勾选一条数据！只支持电商群！')
	      		return						
				}else if(!this.categoryNature || this.categoryNature == 1){
					this.$message.warning('只能对电商群进行操作')
					return	
				}else if(this.channelType == 2){
						this.$message.warning('只支持电商操作！')
						return	
				}else{
						if(!this.crowdToCircleNum || this.crowdToCircleNum == 0){
							this.gToCNumber.crowdToCircleNum = 500
						}else if(this.crowdToCircleNum){
							this.gToCNumber.crowdToCircleNum = this.crowdToCircleNum
						}
						this.setDeploy = true
				}
			}, 
			
			//设置群升级圈弹框中的确定按钮
			setNumberClick () {
				setGtoCnumber(
					{
						ids : this.topNumeberId,
	      		crowdToCircleNum : this.gToCNumber.crowdToCircleNum,
	      	 	isAll : this.isAll
					}
				).then(res => {
		    		if(res.data == true && res.status==200){
		    			this.setDeploy = false
		    			this.$message.success('群升圈人数上限设置成功!')
		    			this.search()
		    		}else{
		    			this.$message('修改失败，请刷新后重试')
		    		} 						
				})
			},
			
			//设置裂变人数按钮
			setFissionClick () {
				if(!this.topNumeberId.length){
	      		this.$message('请勾选需要修改人数上限项，只能选一项，只支持电商圈！')
	      		return					
				}else if(this.topNumeberId.length>1){
	      		this.$message('只能勾选一条数据！只支持电商圈！')
	      		return						
				}else if(!this.categoryNature || this.categoryNature == 2){
					this.$message.warning('只能对电商圈进行操作')
				}else if(this.channelType == 2){
						this.$message.warning('只支持电商操作！')
						return	
				}else{
						//判断电商的平行裂变
						if(!this.parallelFissionNum || this.parallelFissionNum == 0){
								this.FisNumber.parallelFissionNum = 2500
						}else if(this.parallelFissionNum){
								this.FisNumber.parallelFissionNum = this.parallelFissionNum
						}
						//判断电商的纵向裂变
						if(!this.endwiseFissionNum || this.endwiseFissionNum == 0){
								this.FisNumber.endwiseFissionNum = 500
						}else if(this.endwiseFissionNum){
								this.FisNumber.endwiseFissionNum = this.endwiseFissionNum
						}
								
//						else if(this.channelType == 2){
//								if(!this.parallelFissionNum || this.parallelFissionNum == 0){
//										this.FisNumber.parallelFissionNum = 2000
//								}else if(this.parallelFissionNum){
//										this.FisNumber.parallelFissionNum = this.parallelFissionNum
//								}							
//						}
						this.setFisDeploy = true
				}				
			},
			
			//设置只能裂变弹框中的确定按钮
			setFissionSave () {
				setFission(
					{
						ids : this.topNumeberId,
	      		parallelFissionNum : this.FisNumber.parallelFissionNum,
	      		endwiseFissionNum : this.FisNumber.endwiseFissionNum,
	      	 	isAll : this.isAll
					}
				).then(res => {
		    		if(res.data == true && res.status==200){
		    			this.setFisDeploy = false
		    			this.$message.success('裂变人数设置成功!')
		    			this.search()
		    		}else{
		    			this.$message('修改失败，请刷新后重试')
		    		} 						
				})
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
		    		this.$message.warning('未选择类型！')
		    		return
	    	}else{
						this.circleTitleCheckbox = this.getTitleButton
						this.setHead = false

	    	}
    },  
    
			//新增下一级分类按钮
			addNewClick(row){
				this.newForm.upCategoryName = row.categoryName
				this.addNew = true
				this.addNewClickId = row.categoryCode
			},
			
			//新增下一级分类     确定按钮
			addNewClass(){
				let obj = {}
				obj.memberId = 1
				obj.upCategoryId = this.addNewClickId
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
									this.search()	
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
		
		handleChangeA (val) {
//			if(val>3000 || val<=0){
//				this.topNumber.toplimit = 500
//			}else{
//				this.topNumber.toplimit = val
//			}
			if(val>3000){
				this.topNumber.toplimit = 3000
			}else if(val<0){
				this.topNumber.toplimit = 0
			}else if(this.topNumber.toplimit){
				this.topNumber.toplimit = val
			}else if(!this.topNumber.toplimit || this.topNumber.toplimit == ''){
				this.topNumber.toplimit = 500
			}
		},
		handleChangeB (val) {
			if(val>2500 || val<=0){
				this.topNumber.toplimit = 2500
			}else{
				this.topNumber.toplimit = val
			}
		},
		handleChangeC (val) {
			if(val>3000 || val<=0){
				this.topNumber.toplimit = 3000
			}else{
				this.topNumber.toplimit = val
			}
		},
		handleChangeD (val) {
//			if(val>500 || val<=0){
//				this.gToCNumber.crowdToCircleNum = 500
//			}else{
//				this.gToCNumber.crowdToCircleNum = val
//			}				
			if(val>3000){
				this.gToCNumber.crowdToCircleNum = 3000
			}else if(val<0){
				this.gToCNumber.crowdToCircleNum = 0
			}else if(this.gToCNumber.crowdToCircleNum){
				this.gToCNumber.crowdToCircleNum = val
			}else if(!this.gToCNumber.crowdToCircleNum){
				this.gToCNumber.crowdToCircleNum = 500
			}
		},
//		handleChangeE (val) {
//			if(val>2000 || val<=0){
//				this.FisNumber.parallelFissionNum = 2000
//			}else{
//				this.FisNumber.parallelFissionNum = val
//			}				
//		},
		handleChangeF (val) {
			if(val>3000){
				this.FisNumber.parallelFissionNum = 3000
			}else if(val<0){
				this.FisNumber.parallelFissionNum = 2500
			}else if(this.FisNumber.parallelFissionNum){
				this.FisNumber.parallelFissionNum = val
			}else if(!this.FisNumber.parallelFissionNum){
				this.FisNumber.parallelFissionNum = 2500
			}
		},
		handleChangeG (val) {
			if(val>3000){
				this.FisNumber.endwiseFissionNum = 3000
			}else if(val<0){
				this.FisNumber.endwiseFissionNum = 500
			}else if(this.FisNumber.endwiseFissionNum){
				this.FisNumber.endwiseFissionNum = val
			}else if(!this.FisNumber.endwiseFissionNum){
				this.FisNumber.endwiseFissionNum = 500
			}
		},			
    
	  //分页改变处理
	  handleCurrentChange(val){
	  	this.searchForm.pageNumber = val
	  	this.search()
	  },	    

	  //创建一级分类页面跳转
	  create(){
	    this.$router.push('/circleandgroup/classify/new')
	  },
	 
		//渠道改变
		channelChange (val){
			this.searchForm.channelType = val
		},
		//性质改变
		categoryChange (val) {
			this.searchForm.categoryNature = val
		},
		//级别改变
		levelChange (val) {
			this.searchForm.categoryLevel = val
		},
		//创建方式改变
		modeChange (val) {
			this.searchForm.createMode = val
		},
      
		// 页面加载  获取等级level刷新
		handleQuery(){
			searchByLevel().then(res => {
				this.getCategoryLevel = res.data
			})
			this.search()
		}

    	//启用----取消--5.18
//  	openClass(row){
//    		if(row.useable == 0){
//    			this.$message.warning('启用失败，该分类已被启用！')
//    			return
//    		}else{
//    			openAndClose({
//    				id: row.id,
//    				useable: 0
//    			}).then(res => {
//    				 if(res.data == true && res.status == 200){
//    					this.$message.success('启用成功')
//    					this.search()
//    				}else{
//    					this.$message.error('启用失败，请刷新后重试')
//    				}
//    			})
//    		}    		
//  	},
    	
    	// 停用--取消-5.18
//  	closeClass(row){
//  		//console.log(row)
//    		if(row.useable == 1){
//    			this.$message.warning('禁用失败，该分类已被禁用！')
//    			return
//    		}else{
//    			openAndClose({
//    				id: row.id,
//    				useable: 1
//    			}).then(res => {
//    				 if(res.data == true && res.status == 200){
//    					this.$message.success('禁用成功')
//    					this.search()
//    				}else if(res.errorMsg != '' && res.status == 500){
//    					this.$message.error('禁用失败，该分类下有群信息')
//    				}
//    			})
//    		}
//  	}
    },
    mounted(){
		this.handleQuery()
    }
  }
</script>

<style scoped lang="scss">
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
.create {
  margin: 20px 20px;
}
</style>