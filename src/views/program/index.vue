<template>
  <section>
    <div class="mb20" style="margin: 20px 20px;">
      <div style="margin-bottom: 20px;">
        <el-button type="primary" icon="el-icon-plus" @click="create">创建一级栏目</el-button>
      </div>
      <el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 20px;" ref="searchForm" v-model="searchForm" 
        label-width="80px">
        <el-form-item label="搜索：" prop="columnName">
          <el-input  v-model="searchForm.columnName" placeholder="请输入栏目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="channelType">
          <el-radio-group v-model="searchForm.channelType" >
            <!--<el-radio-button :label="0">全部</el-radio-button>-->
            <el-radio-button label="2">社交</el-radio-button>
            <el-radio-button label="1">电商</el-radio-button>
          </el-radio-group>
        </el-form-item> 
        <el-form-item label="级别：" prop="columnLevel">
          <el-radio-group v-model="searchForm.columnLevel" >
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">一级栏目</el-radio-button>
            <el-radio-button label="2">二级栏目</el-radio-button>
            <el-radio-button label="3">三级栏目</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button  style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
        </el-form-item>
      </el-form>
      <div class="setting" style="margin-top: 20px;padding-left: 20px;">
        <!--排序 + 全选 + 已选中项数-->
        <span>排序：</span>
        <el-select placeholder="请选择"  v-model="searchForm.sortType" @change="sortChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
        <!--<span>当前选中{{chooseLen}}项</span>
        <el-button  type="info" @click= "deleteLimit">删除</el-button>-->
      </div>
      <div class="table" style="margin: 20px 10px;min-height: 100px;">
        <el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="channelType" label="渠道" :formatter="channelStatus"></el-table-column>
          <el-table-column prop="id" label="栏目ID"></el-table-column>
          <el-table-column prop="columnCode" label="栏目编码" width="165"></el-table-column>
          <el-table-column prop="columnName" label="栏目名称"></el-table-column>
          <el-table-column prop="columnLevel" label="级别"></el-table-column>
          <el-table-column prop="superCoumnName" label="上级栏目名"></el-table-column>
          <el-table-column prop="created" label="创建时间"></el-table-column>
          <!--<el-table-column prop="" label="人数上限"></el-table-column>-->
            <!--头像和名称-->
          </el-table-column>
          <el-table-column width="440" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="close(scope.row)" v-if="scope.row.validFlag == '1'">停用</el-button>
              <el-button size="mini" type="danger" @click="close(scope.row)" v-if="scope.row.validFlag == '0'" :disabled="scope.row.validFlag == '0'">已停用</el-button>
              <el-button size="mini" type="success" @click="open(scope.row)" v-if="scope.row.validFlag == '0'">启用</el-button>
              <el-button size="mini" type="success" @click="open(scope.row)" v-if="scope.row.validFlag == '1'" :disabled="scope.row.validFlag == '1'">已启用</el-button>
              <el-button size="mini" type="primary" @click="newAdd(scope.row)" >新增下级栏目</el-button>
              <el-button size="mini" type="warning" :disabled="scope.row.columnLevel == '1' || !scope.row.columnLevel" @click="weight(scope.row)">权重</el-button>
              <!--<el-button type="primary" v-if="scope.row.zhiding" size="mini" @click="setTop(scope.row, scope.$index)">置顶</el-button>
            <el-button type="primary" v-else size="mini" @click="cancelTop(scope.row)">取消置顶</el-button>-->
            </template>
          </el-table-column>
        </el-table>
     </div>
    </div>
    
    <!--编辑-->
    <el-dialog
      title="编辑栏目名称"
      :visible.sync="dialogFormVisible"
      width="20%">
      <div>
        <el-form ref="editForm" :model="editForm" label-width="100px">
          <el-form-item prop="columnName" label="栏目名称：" required>
            <el-input v-model="editForm.columnName" placeholder="请输入新的栏目名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClick">确 定</el-button>
      </span>
    </el-dialog>
    
    <!--权重设置-->
       <el-dialog
				title="权重设置"
				:visible.sync="deployWeight"
				width="20%">
				<div>
        <el-form ref="weightList" :model="weightList" label-width="100px">
          <el-form-item prop="weight" label="请输入："required>
            <el-input v-model="weightList.weight" placeholder="请输入0-9的数值" ></el-input>
            <p>数值越小排序越靠前</p>
          </el-form-item>
        </el-form>
     </div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="deployWeight = false">取 消</el-button>
					<el-button type="primary" @click="weightListClick">确 定</el-button>
				</span>
		</el-dialog>
    
    <el-dialog
      title="新增下级栏目"
      :visible.sync="newDlsg"
      width="30%">
      <div>
        <el-form ref="newForm" :model="newForm" label-width="160px">
          <!--<el-form-item prop="hasChoose" label="已选：">
            <el-checkbox-group v-model="newForm.hasChoose" required>
              <el-checkbox v-for="item in hasChoose" :label="item.label" :key="index">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          <el-form-item prop="hasChoose" label="已选：">
            <el-checkbox-group v-model="newForm.hasChoose" required>
              <el-checkbox v-for="item in hasChoose" :label="item.label" :key="index">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item> 
          <el-form-item prop="columnName" label="请输入栏目名称：" required>
            <el-input v-model="newForm.columnName" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
        </el-form>
      </div>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDlsg = false">取 消</el-button>
        <el-button type="primary" @click="newAddNext">确 定</el-button>
      </span>
    </el-dialog>
    
    <!--分页-->
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="searchForm.pageNum" 
					:page-size="searchForm.pageSize" layout="total, prev, pager, next" 
					:total="totalSize">
				</el-pagination>
			</div>  



  </section>
</template>

<script>
import { searchColumn,editColumn,setWeight,newColumn,setStatus} from '@/api/program'
  export default{
    data(){
      return{
      	//0停用  1启用
      	validFlag: '',
      	currentPage: 1,
				totalSize: '',
				columnLevel: '',
				channelType: '',
				dialogFormVisible: false,
				deployWeight:false,
				weightList:{
        	id: '',
        	weight: ''
        },
        columnCode:'',
        searchForm: {
        	columnLevel: '',
          columnName: '',
          channelType: '1',
          sortType: '1',
					pageNum: 1,
					pageSize: 10
        },
        chooseLen: 0,
        tableData: [{
          columnId:1111
        }],
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
        currentPage: 1,
        newDlsg: false,
        newForm:{
          columnName: '',
          hasChoose: ''
        },
        editForm:{
        	columnName: '',
        	id: ''
        },
        hasChoose:[
          {
            label: 1,
            value: 'jaha'
          }
        ]
      }
    },
    methods:{
  	    // 列表渠道过滤
    channelStatus(row){
      if(row.channelType === 1){
        return '电商'
      }else if(row.channelType === 2){
        return '社交'
      } 
    },
    //排序变化
    sortChange (val) {
    	this.searchForm.sortType = val
    	this.search()
    },
    	//处理分页
   	 handleCurrentChange(val) {
    	this.searchForm.pageNum = val
			this.search()
    	},
      create(){
        this.$router.push('/circleandgroup/programa/new')
      },
      //新增下级栏目按钮
      newAdd(row){
				//console.log(row)
				//保存当前栏目编号，也就是下级栏目的上级栏目编号
				this.columnLevel = row.columnLevel
				this.columnCode = row.columnCode
				this.channelType = row.channelType
        this.newDlsg = true
				this.newForm.hasChoose = true 
				this.hasChoose[0].value = row.columnName
        this.hasChoose[0].lable = row.columnCode
      },
      
      //新增下级栏目的确定按钮
      newAddNext(){
					if(!this.newForm.columnName || !this.newForm.hasChoose){
							this.$message.warning('请勾选上级栏目名，新栏目名不能为空！')
							return
					}else{
							newColumn({
								channelType: this.channelType,
								columnLevel: Number(this.columnLevel) + 1,
								columnName: this.newForm.columnName,
								upColumnId: this.columnCode,
								mId: '121313132131'
							}).then(res => {
								//console.log(res)
								if(res.data == true && res.status == '200'){
									this.$message.success('创建下级栏目成功')
									this.newDlsg = false
									this.search()
								}
							})
						}
      },
      
      //查找按钮
      search(){
      	searchColumn(this.searchForm).then(res => {
      		//console.log(res)
      		this.tableData = res.data
      		this.totalSize = Number(res.totalSize)
      	})
      },
      
      //编辑按钮
      edit(row){
      	//console.log(row)
			this.dialogFormVisible = true
			this.editForm.id = row.id
			this.editForm.columnName = row.columnName
      },
      
      //编辑弹框的确认按钮
      editClick(){
      	editColumn(this.editForm).then(res => {
      		//console.log(res)
      		if(res.data == true && res.status == '200'){
      			this.$message.success('修改成功')
      			this.dialogFormVisible = false
      			this.search()
      		}
      	})
      },
      
      //停用按钮
      close(row){
	      	setStatus({
	      		id: row.id,
	      		validFlag: '0'
	      	}).then(res => {
	      		//console.log(res)
	      		if(res.data == true && res.status == '200'){
	      			this.$message.success('停用成功！')
	      			this.search()
	      		}
	      	})
      },
      
      //启用按钮
      open(row){
	      	setStatus({
	      		id: row.id,
	      		validFlag: '1'
	      	}).then(res => {
	      		if(res.data == true && res.status == '200'){
	      			this.$message.success('启用成功！')
	      			this.search()
	      		}
	      	})
      },
      
      //权重按钮
      weight(row){
      	//console.log(row)
      	this.deployWeight = true
      	this.weightList.id = row.id
      },

      //权重确定按钮
      weightListClick(){
				setWeight(this.weightList).then(res => {
					//console.log(res)
					if(res.data == true && res.status == '200'){
					this.weightList.weight = res.paramter.weight
					this.$message('修改权重成功！')
					this.deployWeight = false
					this.search()						
					}

				})
      },
      deleteLimit(){
        
      }
    },
    mounted () {
			this.search()
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