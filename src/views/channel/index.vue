<template>
	<section>
		<div class="create">
			<el-button type="primary" icon="el-icon-plus" @click= "create">创建渠道</el-button>
		</div>
			<el-form :inline="true" style="background: #f1f1f1;padding: 20px;" ref="searchForm" v-model="searchForm">
				<el-form-item label="渠道">
					<el-radio-group v-model="searchForm.channelType">
						<el-radio-button :label="3">全部</el-radio-button>
						<el-radio-button :label="1">社交</el-radio-button>
						<el-radio-button :label="2">电商</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="search">查找</el-button>
				</el-form-item>
			</el-form>
		<div class="table">
			<div class="setting">
				<!--排序 + 全选 + 已选中项数-->
				<span>渠道列表排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.orderByStr">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="info" @click="updateStatusBatch('2')">禁用</el-button>
				<el-button type="success" @click="updateStatusBatch('1')">启用</el-button>
				<el-button type="danger" @click="deleteChannel">删除</el-button>
			</div>
			<div class="table" style="margin: 20px 10px;">
				<el-table 
					@selection-change="selectionChange" 
					border 
					:data="tableData" 
					style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="渠道ID"></el-table-column>
					<el-table-column prop="channelNo" label="渠道编号"></el-table-column>
					<el-table-column prop="channelName" label="渠道名称"></el-table-column>
					<el-table-column prop="channelDescribe" label="渠道简介"></el-table-column>
					<el-table-column prop="channelStatus" label="状态"></el-table-column>
					<el-table-column prop="createTime" label="创建时间"></el-table-column>
					<el-table-column prop="action" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="edit(scope.$index, scope.row)">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="pageNum" 
					:page-size="pageSize" 
					layout="total, prev, pager, next" 
					:total="total">
				</el-pagination>
			</div>
		</div>
	</section>
</template>

<script>
import { listChannel, deleteBatch, updateStatusBatch } from '@/api/channel'
export default {
  data() {
    return {
      tableData: [],
      chooseLen: 0,
      pageSize: 10,
      pageNum: 1,
      searchForm: {
        channelType: 1,
        orderByStr: 'CREATE_TIME'
      },
      total: 0,
      options: [
        {
          value: 'CREATE_TIME',
          label: '按创建时间排序'
        }
      ],
      chooseSelection: [],
      ids: '',
      iphoneValue:''
    }
  },
  computed: {},
  methods: {
    handleQuery() {
      // init
      let query = {}
      query = this.searchForm
      query.pageSize = this.pageSize
      query.pageNum = this.pageNum
    },
    handleSizeChange() {},
    selectionChange(selection) {
      this.chooseLen = selection.length
      this.chooseSelection = selection
      this.ids = selection.toString()
    },
    handleCurrentChange() {},
    create() {
      this.$router.push('/channel/create')
    },
    edit(index, row) {
      this.$router.push({
        path: '/channel/create',
        query: {
          id: row.id
        }
      })
    },
    search() {
      // 整理搜索条件
      let query = {}
      query = this.searchForm
      query.pageSize = this.pageSize
      query.pageNum = this.pageNum

      listChannel(query)
        .then(res => {
          console.log(res)
          const data = res.data
          this.tableData = this.tableFormat(data)
        })
        .catch(() => {})
    },
    // 删除
    deleteChannel() {
      // 需要获取index 然后删除
      const arr = []
      for (let i = 0; i < this.chooseSelection.length; i++) {
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.chooseSelection[i].id === this.tableData[j].id) {
            console.log(j)
            arr.push(j)
          }
        }
      }
      deleteBatch({ id: this.ids })
        .then(res => {
          if (res.status === 200) {
            // 需要列表同步删除
            for (let i = 0; i < arr.length; i++) {
              this.tableData.splice(arr[i], 1)
            }
          }
        })
        .catch(() => {})
    },
    // 启用或禁用
    updateStatusBatch(flag) {
      console.log(flag)
      updateStatusBatch({
        id: this.ids,
        channelStatus: flag
      })
        .then(res => {
          // 这里需要同步改变 状态
        })
        .catch()
    },
    tableFormat(arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        // 状态
        if (arr[i].channelStatus === '1') {
          arr[i].channelStatus = '启用'
        } else {
          arr[i].channelStatus = '禁用'
        }
        // arr[i].createTime = dateToGMT(arr[i].createTime)
      }
      return arr
    }
  },
  created() {
    this.handleQuery()
  },
  mounted() {}
}

// function dateToGMT(strDate) {
//   var dateStr = strDate.split(' ')
//   var strGMT =
//     dateStr[0] +
//     ' ' +
//     dateStr[1] +
//     ' ' +
//     dateStr[2] +
//     ' ' +
//     dateStr[5] +
//     ' ' +
//     dateStr[3] +
//     ' GMT+0800'
//   var date = new Date(Date.parse(strGMT)).toLocaleDateString()
//   return date
// }
</script>

<style scoped>
.create,
.setting {
  padding: 20px;
}
.center {
  text-align: center;
}


</style>