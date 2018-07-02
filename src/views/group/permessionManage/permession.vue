<template>
	<section>
		<!-- 筛选条件 -->
			<div class="create">
				<el-button type="primary" @click="create" icon="el-icon-plus">新增权限</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-form-item label="搜索：" prop="groupid">
					<el-input v-model="searchForm.groupid" placeholder="请输入权限id或名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="danger" icon="el-icon-delete" @click= "deleteLimit">删除</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="权限ID"></el-table-column>
					<el-table-column prop="content" label="权限名称"></el-table-column>
					<el-table-column prop="by" label="性质"></el-table-column>
					<el-table-column prop="addByWho" label="权限描述"></el-table-column>
					<el-table-column prop="addTime" label="创建时间"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.$index,scope.row)">查看</el-button>
							<el-button type="warning" size="mini" @click="edit(scope.$index,scope.row)">编辑</el-button>
						</template>
					</el-table-column>
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
	</section>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        groupid: '',
        time: '',
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

<style scoped>
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
.create {
  margin: 20px;
}
</style>
