<template>
	<section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
			<div class="create">
				<el-button type="primary" icon="el-icon-setting" @click="create">分组文件标签管理器</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-form-item label="群ID：" prop="groupid">
					<el-input v-model="searchForm.groupid" placeholder="请输入权限id或名称"></el-input>
				</el-form-item>
				<el-form-item label="群名称：" prop="groupName">
					<el-input v-model="searchForm.groupName" placeholder="请输入权限id或名称"></el-input>
				</el-form-item>
				<el-form-item label="圈ID：" prop="circleId">
					<el-input v-model="searchForm.circleId" placeholder="请输入权限id或名称"></el-input>
				</el-form-item>
				<el-form-item label="圈名称：" prop="circleName">
					<el-input v-model="searchForm.circleName" placeholder="请输入权限id或名称"></el-input>
				</el-form-item>
				<el-form-item label="快速查看：" prop="quick">
					<el-radio-group v-model="searchForm.quick" @change="searchTimeChange(1)">
						<el-radio-button label="全部" value="1"></el-radio-button>
						<el-radio-button label="今天" value="2"></el-radio-button>
						<el-radio-button label="昨天" value="3"></el-radio-button>
						<el-radio-button label="最近七天" value="4"></el-radio-button>
						<el-radio-button label="最近30天" value="5"></el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="筛选时间：" prop="chooseTime">
					<el-date-picker 
						v-model="searchForm.chooseTime"
						@change="searchTimeChange(2)"
						size="mini" type="datetimerange" 
						range-separator="至" start-placeholder="开始日期" 
						end-placeholder="结束日期" align="right">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="content" label="群ID"></el-table-column>
					<el-table-column prop="by" label="群名称"></el-table-column>
					<el-table-column prop="addByWho" label="类别"></el-table-column>
					<el-table-column prop="addByWho" label="违规内容"></el-table-column>
					<el-table-column prop="addByWho" label="发布人"></el-table-column>
					<el-table-column prop="addByWho" label="发布时间"></el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="currentPage" 
					:page-size="10" layout="total, prev, pager, next" 
					:total="100">
				</el-pagination>
			</div>
		</el-card>
	</section>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        groupid: '',
        time: '',
        groupName: '',
        circleId: '',
        circleName: '',
        chooseTime: '',
        quick: '',
        sortBy: '1'
      },
      chooseLen: 0,
      tableData: [],
      options: [
        {
          label: '全部',
          value: '1'
        }
      ],
      currentPage: 2
    }
  },
  methods: {
    create() {
      this.$router.push('/grouppermessionmanage/permession/new')
    },
    view(index, edit) {
      this.$router.push('/grouppermessionmanage/permession/view')
    },
    edit(index, edit) {
      this.$router.push('/grouppermessionmanage/permession/edit')
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    search() {},
    deleteLimit() {}
  },
  components: {}
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
  margin: 20px 0;
}
</style>