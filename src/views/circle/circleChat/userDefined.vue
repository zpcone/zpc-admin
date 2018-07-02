<template>
	<section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="群id：" prop="groupid">
							<el-input v-model="searchForm.groupid"></el-input>
						</el-form-item>
						<el-form-item label="群名称：" prop="groupname">
							<el-input v-model="searchForm.groupname"></el-input>
						</el-form-item>
						<el-form-item label="会员ID：" prop="groupid">
							<el-input v-model="searchForm.memberid"></el-input>
						</el-form-item>
						<el-form-item label="会员名称：" prop="groupid">
							<el-input v-model="searchForm.membername"></el-input>
						</el-form-item>
						
					</el-col>
					<el-col :span="12">
						<el-form-item label="快速查看：" prop="quick">
							<el-radio-group v-model="searchForm.quick">
								<el-radio-button label="全部" value="1"></el-radio-button>
								<el-radio-button label="今天" value="2"></el-radio-button>
								<el-radio-button label="昨天" value="3"></el-radio-button>
								<el-radio-button label="最近七天" value="4"></el-radio-button>
								<el-radio-button label="最近30天" value="5"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="类别：" prop="sep">
							<el-radio-group v-model="searchForm.sep">
								<el-radio-button label="全部" value="1"></el-radio-button>
								<el-radio-button label="入群信息" value="2"></el-radio-button>
								<el-radio-button label="退群信息" value="3"></el-radio-button>
								<el-radio-button label="群务信息" value="4"></el-radio-button>
								<el-radio-button label="角色升级" value="5"></el-radio-button>
								<el-radio-button label="群主转让" value="6"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="添加时间：" prop="time">
							<el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
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
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="danger" icon="el-icon-delete" @click= "openConfirmModal('删除')">删除</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="编号"></el-table-column>
					<el-table-column prop="sep" label="类别"></el-table-column>
					<el-table-column prop="content" label="内容"></el-table-column>
					<el-table-column prop="time" label="时间"></el-table-column>
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
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>
</template>

<script>
import confirmModal from '../components/confirmModal'
export default {
  data() {
    return {
      searchForm: {
        groupid: '',
        groupname: '',
        memeberid: '',
        membername: '',
        sep: '',
        time: '',
        quick: ''
      },
      chooseLen: 0,
      tableData: [],
      currentPage: 2,
      options: [
        {
          label: '按时间由近及远',
          value: '1'
        }
      ],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      }
    }
  },
  methods: {
    search(name) {},
    reset(name) {},
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    openConfirmModal(title) {
      this.confirmSetting.title = title
      this.confirmSetting.show = true
    },
    confirmOk() {
      this.$message.success('删除成功')
    }
  },
  components: {
    confirmModal
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