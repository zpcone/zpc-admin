<template>
	<section>
		<!-- 筛选条件 -->
			<div class="create">
				<el-button type="primary" @click="create">新增角色</el-button>
			</div>
			<el-form class="mb20" inline style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-form-item label="搜索：" prop="queryData">
					<el-input v-model="searchForm.queryData" placeholder="请输入角色id或名称" clearable style="width:200px"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="min-width: 120px;" type="success" @click="search('searchForm')">查找</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin: 30px;">
				<!--排序 + 全选 + 已选中项数-->
				<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy" @change="seleChange" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="danger" @click= "openConfirmModal('解散群')">删除</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="roleId" label="角色ID"></el-table-column>
					<el-table-column prop="" label="角色编码"></el-table-column>
					<el-table-column prop="name" label="角色名称"></el-table-column>
					<el-table-column prop="description" label="角色简介"></el-table-column>
					<el-table-column prop="crowdPermissions" label="群内权限"></el-table-column>
					<el-table-column prop="created" label="创建时间"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<!--<el-button type="text" size="mini" @click="view(scope.$index,scope.index)">查看</el-button>-->
							<el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
							<el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
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
	</section>
</template>

<script>
import { searchRole, detailRole, delRole } from "@/api/group/permession";
let selectionIds = new Array();
export default {
  data() {
    return {
      totalSize: "",
      searchForm: {
        //    	角色id或名称
        queryData: "",
        pageNumber: 1,
        pageSize: 10,
        id: "",
        time: "",
        ccType: 0
      },
      chooseLen: 0,
      tableData: [],
      options: [
        //      {
        //        label: '全部',
        //        value: '1'
        //      },
        {
          value: "1",
          label: "按时间由近及远"
        }
      ],
      currentPage: 1,
      selectionIds: null
    };
  },
  methods: {
    //新建角色
    create() {
      this.$router.push("/group/permession/role/new");
    },
    //查看角色详情
    view(row) {
      //console.log(row)
      let roleId = row.roleId;
      this.$router.push({
        path: "/group/permession/role/view",
        query: {
          roleId: roleId
        }
      });
    },
    //排序值改变刷新列表
    seleChange(val) {
      this.searchForm.sortFlag = val;
      this.search();
    },
    //编辑角色详情
    edit(row) {
      //console.log(row)
      let roleId = row.roleId;
      this.$router.push({
        path: "/group/permession/role/edit",
        query: {
          roleId: roleId
        }
      });
    },

    //处理分页
    handleCurrentChange(val) {
      //console.log(val)
      this.searchForm.pageNumber = val;
      this.search();
    },

    //点击复选框 选中删除项的id
    selectionChange(selection) {
      //console.log(selection)
      this.chooseLen = selection.length;
      this.selectionIds = new Array();
      for (let i = 0; i < selection.length; i++) {
        this.selectionIds.push(selection[i].roleId);
      }
    },

    //删除角色按钮
    openConfirmModal() {
      //console.log(this.selectionIds)
      this.$message("删除失败，请选择角色");
      if (this.selectionIds.length) {
        delRole({ roleIds: this.selectionIds }).then(res => {
          if (res.data == true && res.status == "200") {
            this.$message.success("删除成功");
            this.search();
          } else if (res.status == "500" && res.errorMsg != "") {
            this.$message.warning("删除失败，该角色信息下有会员！");
          }
        });
      }
      this.search();
    },

    // 查找按钮发送查询请求
    search() {
      searchRole(this.searchForm)
        .then(res => {
          //  		console.log(res.data)
          this.tableData = res.data;
          this.totalSize = Number(res.totalSize);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.search();
  }
};
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
