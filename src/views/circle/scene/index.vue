<template>
	<section>
		<!-- 筛选条件 -->
		<!--<el-card class="mb20">-->
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属场景：" prop="upCategoryId">
							<el-radio-group v-model="searchForm.upCategoryId">
								<el-radio-button label="FL106" value="">办公楼</el-radio-button>
								<el-radio-button label="FL107" value="">社区</el-radio-button>
								<el-radio-button label="FL108" value="">学校</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="搜索：" prop="categoryName">
							<el-row>
								<el-col :span="12">
									<el-input placeholder="请选择输入分类名称" v-model.trim="searchForm.categoryName" maxlength="8" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="info" icon="el-icon-search" @click="search">查找</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin-top: 20px;margin-left: 20px ;">
				<span>列表排序：</span>
				<el-select placeholder="请选择" v-model="screeningTimeFlag" @change="sortChange" clearable>
					<el-option v-for="item in optionsSort" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			  <span style="display: inline-block;margin-left:20px;">当前选中{{chooseLen}}项</span>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<!-- <el-table-column prop="upCategoryId" label="分类ID"></el-table-column> 2018.6.26 晶晶让去掉-->
					<el-table-column prop="categoryCode" label="分类编码"></el-table-column>
					<el-table-column prop="categoryName" label="分类名称"></el-table-column>
					<el-table-column prop="upCategoryName" label="所属场景名称"></el-table-column>
					<el-table-column prop="createdBy" label="创建人"></el-table-column>
					<el-table-column prop="created" label="创建时间" width="170"></el-table-column>
					<el-table-column label="管理" width="240">
						<template slot-scope="scope">
							<el-button size="mini" @click="weightClick(scope.row)" type="warning">权重</el-button>
							<!--<el-button size="mini" @click="openClick(scope.row)" type="success">启用</el-button>
							<el-button size="mini" @click="closeClick(scope.row)" type="danger">停用</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>

		<!--权重弹框-->
		<el-dialog title="权重设置" :visible.sync="viewDlsg" width="30%">
			<div>
				<el-form v-model="weightForm" ref="weightForm" label-width="140px">
					<el-form-item prop="weight" label="请输入:">
						<el-input type="number" v-model.trim="weightForm.weight" placeholder="请输入权重的数值" :max="weightNum" :min="0" @change="weightChange"></el-input>
						<p>* 数值越小越靠前（权重值：0--{{weightNum}}）</p>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="viewDlsg = false">关闭</el-button>
			    <el-button type="primary" @click="weightSave">确认</el-button>
		    </span>
		</el-dialog>

		<div class="pagination center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="searchForm.totalSize"
				:page-size="searchForm.pageSize"
				layout="total, prev, pager, next"
				:total="totalSize"></el-pagination>
		</div>
	</section>
</template>

<script>
	//停用启用  暂时取消,openAndClose
import { searchClassList,weightClass} from '@/api/circle/scene'
export default {
  data() {
    return {
      weightNum: '5',
      optionsSort: [
      	{
      		value: '1',
      		label: '按创建时间由近及远'
      	}
      ],
      viewDlsg: false,
      totalSize: '',
      currentPage: 1,
      searchForm: {
        pageNumber: 1,
        pageSize: 10,
        upCategoryId: 'FL106',
        categoryName: '',
        sortFlag: ''
      },
      weightForm: {
      	id: '',
      	weight: ''
      },
      chooseLen: 0,
      tableData: [{id:'11'}]
    }
  },
  methods: {
    //查找按钮
    search () {
    	if(!this.searchForm.upCategoryId){
    		this.$message.warning('请先选择所属场景！')
    		return false
    	}else{
    		searchClassList(this.searchForm).then(res => {
    			this.tableData = res.data
    			this.totalSize = Number(res.totalSize)
    			this.weightNum = Number(res.totalSize)
    		})
    	}
    },

    //分页处理
    handleCurrentChange (val) {
    	this.searchForm.pageNumber = val
    	this.search()
    },

  	//排序
  	sortChange (val) {
  		this.searchForm.sortFlag = val
  		this.search()
  	},

    selectionChange(selection) {
      this.chooseLen = selection.length
    },

    //文本框权重改变
    weightChange (val) {
    	if(val<0){
    		this.weightNum = 0
    	}else if(val>this.weightNum){
    		this.weightForm.weight = this.weightNum
    	}else{
    		this.weightForm.weight = val
    	}
    },

	//权重按钮
    weightClick (row) {
    	this.viewDlsg = true
    	this.weightForm.id = row.id
    	this.weightForm.weight = row.weight
    },

    //权重弹框的确定按钮
    weightSave () {
    	weightClass(this.weightForm).then(res => {
  			if(res.data == true && res.status == '200'){
//			this.weightList.weight = res.paramter.weight
  			this.$message.success('修改权重成功！')
  			this.viewDlsg = false
  			this.search()
  			}
    	})
    },

    openClick (row) {
    	if(row.useable == 1){
    		this.$message.warning('当前状态为已启用，请勿重复操作！')
    		return false
    	}else{
		    let obj ={}
			obj.id = row.id
			obj.useable = 1
    		openAndClose(obj).then(res => {
  				 if(res.data == true && res.status == 200){
  					this.$message.success('启用成功!')
  					this.search()
  				}else{
  					this.$message.error('启用失败，请刷新后重试')
  				}
    		})
    	}
    },

    closeClick (row) {
    	if(row.useable == 0){
    		this.$message.warning('当前状态为已禁用，请勿重复操作！')
    		return false
    	}else{
		    let obj ={}
			obj.id = row.id
			obj.useable = 0
    		openAndClose(obj).then(res => {
  				 if(res.data == true && res.status == 200){
  					this.$message.success('禁用成功!')
  					this.search()
  				}else{
  					this.$message.error('禁用失败，请刷新后重试')
  				}
    		})
    	}
    },

	//所属场景名称筛选  待定
	byFormat (row) {
	    if(row.createdBy == 1){
	      return '观摩会员'
	    }else if(row.createdBy == 2){
	    	return '行为会员'
	    }else if(row.createdBy == 3){
	    	return '联席群主'
	    }else if(row.createdBy == 4){
	    	return '群主'
	    }else if(row.createdBy == 5){
	    	return '圈主'
	    }
	}

  },
  mounted () {
  	this.search()
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
</style>
