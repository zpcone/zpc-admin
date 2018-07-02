// 群成员
<template>
	<section>
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="渠道：" prop="channelType">
							<el-radio-group  v-model="searchForm.channelType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">电商</el-radio-button>
								<el-radio-button label="2">社交</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="快速查看：" prop="applyTime2">
							<el-radio-group v-model="searchForm.applyTime2">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">今天</el-radio-button>
								<el-radio-button label="2">昨天</el-radio-button>
								<el-radio-button label="3">最近7天</el-radio-button>
								<el-radio-button label="4">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="转让状态：" prop="status2">
							<el-radio-group v-model="searchForm.status2">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="2">已完成</el-radio-button>
								<el-radio-button label="1">转让中</el-radio-button>
								<el-radio-button label="3">已取消</el-radio-button>
								<el-radio-button label="4">已拒绝</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="群ID：">
							<el-row>
								<el-col :span="15">
									<el-input></el-input>
								</el-col>
							</el-row>
						</el-form-item>								-->

						<el-form-item label="圈人数：" prop="circleNum">
								<el-row>
									<el-col :span="7">
										<el-input v-model="searchForm.circleNum"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input v-model="searchForm.circleNum"></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="转让次数：" prop="transferNumEnd2">
								<el-row>
									<el-col :span="7">
										<el-input v-model="searchForm.transferNumEnd2"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7" v-model="searchForm.transferNumEnd2">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>

					</el-col>
					<el-col :span="14">
						<!--右侧-->
						<el-form-item label="筛选时间：">
							<!--<div class="clearfix">-->
								<!--<div class="fl">
									<el-select>
										<el-option>按日期排序</el-option>
									</el-select>
								</div>-->
								<div class="fl padLR15">
									<el-date-picker
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							    </el-date-picker>
								</div>
							<!--</div>-->
						</el-form-item>
						<!--<el-form-item label="圈人数：">
								<el-row>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="活跃度：">
								<el-row>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>-->
						<el-form-item label="交易价格：">
								<el-row>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="圈层级：">
								<el-row>
									<el-col :span="7">
										<el-input v-model="searchForm.hierarchyStart"></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input v-model="searchForm.hierarchyEnd"></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="圈ID：" prop= "searchForm.Id">
							<el-row>
								<el-col :span="12">
									<el-input placeholder="请选择输入圈ID" style="width:51%" v-model="searchForm.Id"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="圈名称：" prop= "searchForm.circleName">
							<el-row>
								<el-col :span="12">
									<el-input placeholder="请选择输入圈名称" style="width:51%" v-model="searchForm.circleName"></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<!--<el-form-item label="圈本身能量值：">
								<el-row>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="变现指数：">
								<el-row>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>-->

					</el-col>
				</el-row>
				<el-form-item label="创建方式：" prop="createType">
					<el-radio-group v-model="searchForm.createType" style="margin-top: 3px;">
						<el-radio-button label="" value="">全部</el-radio-button>
						<!--同路人圈----社交-->
						<el-radio-button label="8" value="">同路人圈</el-radio-button>
						<!--店铺创建----电商-->
						<el-radio-button label="7" value="">店铺创建</el-radio-button>
					</el-radio-group>
					<el-select v-model="searchForm.createType1" placeholder="后台创建">
						<el-option label="基于商品" value="1"></el-option>
						<el-option label="基于场景" value="2"></el-option>
						<el-option label="基于同路人" value="3"></el-option>
						<el-option label="基于店铺圈" value="4"></el-option>
						<el-option label="自定义圈" value="5"></el-option>
						<el-option label="类目圈" value="6"></el-option>
					</el-select>
					<el-select v-model="searchForm.createType2" placeholder="系统化场景圈">
						<el-option label="办公楼" value="1"></el-option>
						<el-option label="社区" value="2"></el-option>
						<el-option label="学校" value="3"></el-option>
						<el-option label="公共场所" value="4"></el-option>
						<el-option label="附近的圈子" value="5"></el-option>
						<el-option label="在路上" value="6"></el-option>
					</el-select>
					<el-select v-model="searchForm.createType3" placeholder="圈子列变">
						<el-option label="智能裂变" value="10"></el-option>
						<el-option label="收动裂变" value="11"></el-option>
					</el-select>
					<el-select v-model="searchForm.createType4" placeholder="群升级圈">
						<el-option label="滤镜群升级" value="12"></el-option>
						<el-option label="普通群升级" value="13"></el-option>
					</el-select>
				</el-form-item>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<div class="setting">
				<!--排序 + 全选 + 已选中项数-->
				<span>列表排序：</span>
				<el-select placeholder="请选择" v-model="sortForm.sort" prop="sort" @change="sortChange">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="warning" @click="annuler">取消转让</el-button>
			</div>

			<div class="table" style="margin: 20px 10px;min-height: 1000px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="channelType" label="渠道" :formatter="channelStatus"></el-table-column>
					<el-table-column prop="circleId" label="圈ID" width="165"></el-table-column>
					<el-table-column prop="circleName" label="圈名称"></el-table-column>
					<el-table-column prop="circleNum" label="圈人数"></el-table-column>
					<el-table-column prop="hierarchyEnd" label="圈层级"></el-table-column>
					<el-table-column prop="creationMethod" label="创建方式"></el-table-column>
					<el-table-column prop="energyValueEnd" label="圈本身能量值"></el-table-column>
					<el-table-column prop="livenessEnd" label="活跃度"></el-table-column>
					<el-table-column prop="realizationNumStart" label="变现指数"></el-table-column>
					<el-table-column prop="beanall" label="持有价"></el-table-column>
					<el-table-column prop="lastUpdBy " label="转让人"></el-table-column>
					<el-table-column prop="" label="转让订单提交时间"></el-table-column>
					<el-table-column prop="status" label="转让状态" :formatter="revStatus"></el-table-column>
					<el-table-column prop="tradingPrice" label="交易价"></el-table-column>
					<el-table-column prop="createdBy" label="购买人" width="165"></el-table-column>
					<el-table-column prop="buyingTime" label="成交时间" width="165"></el-table-column>
					<el-table-column prop="transferNum" label="转让次数"></el-table-column>
					<el-table-column label="历史转让记录">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
			<div class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="searchForm.pageNum"
					:page-size="searchForm.pageSize" layout="total, prev, pager, next"
					:total="totalSize"></el-pagination>
			</div>
		<!--取消转让的弹框-->
		<el-dialog
		  title="取消转让"
		  :visible.sync="dialogVisible"
		  width="20%"
		  :before-close="handleClose">
		  <span>确定取消该条转让订单吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="annulerClick">确 定</el-button>
		  </span>
		</el-dialog>

		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>

</template>

<script>
import confirmModal from '../components/confirmModal'
//=======搜索========排序=======取消转让
import { searchList, sortList, cancelChange } from '@/api/circle/business'
export default {
  data() {
    return {
      sortForm: {
        orderByType: '',
        pageNum: 1,
        pageSize: 10
      },
      searchForm: {
        channelType: '',
        Id: '',
        name: '',
        status: '',
        statusCircle: '',
        //以下是必传参数
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      chooseLenList: [],
      options: [
        {
          value: '1',
          label: '按成交时间由近及远排序'
        },
        {
          value: '2',
          label: '按成交价格由高到低排序'
        },
        {
          value: '3',
          label: '按圈子人数由高到低排序'
        },
        {
          value: '4',
          label: '按圈子能量由高到低排序'
        },
        {
          value: '5',
          label: '按转让时间由近及远排序'
        }
      ],
      //取消转让存多个数据对象
      annulerData: [],
      //取消单个对象转让
      annulerList: {
        isDel2: '0'
      },
      tableData: [{ groupid: '1212121' }],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      totalSize: '',
      currentPage: 1
    }
  },
  components: {
    confirmModal
  },
  methods: {
    // 列表渠道过滤
    channelStatus(row) {
      if (row.channelType === '1') {
        return '电商'
      } else if (row.channelType === '2') {
        return '社交'
      }
    },
    //转让状态过滤
    revStatus(row) {
      if (row.status === '1') {
        return '转让中'
      } else if (row.status === '2') {
        return '已成交'
      } else if (row.status === '3') {
        return '已取消'
      } else if (row.status === '4') {
        return '已拒绝'
      }
    },
    //取消转让按钮
    annuler() {
      this.dialogVisible = true
      //多条取消转让取值
      //		for(let i=0;i<this.chooseLenList.length;i++){
      //			let obj = {}
      //			obj.circleId = this.chooseLenList[i].circleId
      //			obj.circleName = this.chooseLenList[i].circleName
      //			obj.status = this.chooseLenList[i].status
      //			this.annulerData.push(obj)
      //		}
      //单个取消转让
      this.annulerList.circleId = this.chooseLenList[0].circleId
      this.annulerList.channelType = this.chooseLenList[0].channelType
      this.annulerList.status = this.chooseLenList[0].status
    },
    //取消转让弹框的确定
    annulerClick() {
      cancelChange(this.annulerList).then(res => {
        //console.log(res)
        if (res.data == true && res.status == '200') {
          this.dialogVisible = false
          this.search()
        }
      })
    },
    //排序
    sortChange(val) {
      //console.log(val)
      this.sortForm.orderByType = val
      sortList(this.sortForm).then(res => {
        this.search()
      })
    },
    //查找按钮
    search() {
      searchList(this.searchForm).then(res => {
        this.tableData = res.data
        this.totalSize = Number(res.totalSize)
      })
    },
    //重置
    reset () {
    	this.searchForm.channelType = ''
    	this.searchForm.applyTime2 = ''
    	this.searchForm.status2 = ''
    	this.searchForm.circleNum = ''
    	this.searchForm.transferNumEnd2 = ''
    	this.searchForm.hierarchyStart = ''
    	this.searchForm.hierarchyEnd = ''
    	this.searchForm.Id = ''
    	this.searchForm.circleName = ''
    	this.searchForm.createType = ''
    },
    //处理分页
    handleCurrentChange(val) {
      this.searchForm.pageNum = val
      this.search()
    },
    //查看历史转账记录按钮
    view(row) {
      this.$router.push({
        path: '/circlemanage/business/change/detail',
        query: {
          channelType: row.channelType,
          circleId: row.circleId
        }
      })
    },
    edit() {},
    openConfirmModal(title) {
      //console.log(title)
      // 获取要操作的群名称
      this.confirmSetting.title = title
      this.confirmSetting.show = true
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
      this.chooseLenList = selection
      console.log(selection)
    },
    confirmOk() {
      console.log('ok')
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>
.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
  height: 0;
}

.fl {
  float: left;
}

.padLR15 {
  padding: 0 15px;
}

.searchInput.el-input {
  max-width: 300px;
}

.center {
  text-align: center;
}
.mb20 {
  margin-bottom: 20px;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: 101%;
}
</style>
