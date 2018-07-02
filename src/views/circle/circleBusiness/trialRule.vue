// 群成员
<template>
	<section>
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="渠道：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="社交"></el-radio-button>
								<el-radio-button label="电商"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="快速查看：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="今天"></el-radio-button>
								<el-radio-button label="昨天"></el-radio-button>
								<el-radio-button label="最近7天"></el-radio-button>
								<el-radio-button label="最近30天"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="PK状态：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="已完成"></el-radio-button>
								<el-radio-button label="PK种"></el-radio-button>
								<el-radio-button label="申请种"></el-radio-button>
								<el-radio-button label="报名中"></el-radio-button>
								<el-radio-button label="已取消"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="PK类型：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="群主选拔"></el-radio-button>
								<el-radio-button label="联席群主选拔"></el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="群ID：">
							<el-row>
								<el-col :span="15">
									<el-input></el-input>
								</el-col>
							</el-row>
						</el-form-item>								-->
					</el-col>
					<el-col :span="14">
						<!--右侧-->
						<el-form-item label="筛选时间：">
							<div class="clearfix">
								<div class="fl">
									<el-select>
										<el-option>按日期排序</el-option>
									</el-select>
								</div>
								<div class="fl padLR15">
									<el-date-picker
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期">
							    </el-date-picker>
								</div>
							</div>
						</el-form-item>
						
						<el-form-item label="圈人数：">
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
										<el-input></el-input>
									</el-col>
									<el-col :span="2" style="text-align: center;">-</el-col>
									<el-col :span="7">
										<el-input></el-input>
									</el-col>
								</el-row>
						</el-form-item>
						<el-form-item label="圈本身能量值：">
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
						<el-form-item label="搜索：">
							<el-row>
								<el-col :span="12">
								<el-select v-model="searchForm.statusCircle" placeholder="请选择"  style="width:40%">
									<el-option label="会员ID" value="1"></el-option>
									<el-option label="会员名称" value="2"></el-option>
								</el-select>
									<el-input placeholder="请选择输入圈ID或圈名称" style="width:51%"></el-input>
								</el-col>
							</el-row>
						</el-form-item>							
					</el-col>
				</el-row>
				<el-form-item label="创建方式：">
					<el-radio-group v-model="searchForm.status" style="margin-top: 4px;">
						<el-radio-button label="全部" value="1"></el-radio-button>
						<el-radio-button label="系统初始化场景圈" value="2"></el-radio-button>
						<el-radio-button label="店铺创建" value="3"></el-radio-button>
					</el-radio-group>
					<el-select v-model="searchForm.status1" placeholder="商品上架">
						<el-option label="基于商品" value="4"></el-option>
						<el-option label="基于场景" value="5"></el-option>
						<el-option label="基于店铺" value="6"></el-option>
						<el-option label="自定义" value="7"></el-option>
					</el-select>
					<el-select v-model="searchForm.status2" placeholder="商品上架">
						<el-option label="单个商品" value="8"></el-option>
						<el-option label="组合商品" value="9"></el-option>
					</el-select>
					<el-select v-model="searchForm.status3" placeholder="圈子列变">
						<el-option label="智能裂变" value="10"></el-option>
						<el-option label="收动裂变" value="11"></el-option>
					</el-select>
					<el-select v-model="searchForm.status4" placeholder="群升级圈">
						<el-option label="滤镜群升级" value="12"></el-option>
						<el-option label="普通群升级" value="13"></el-option>
					</el-select>
				</el-form-item>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
			
			<div class="setting">
				<!--排序 + 全选 + 已选中项数-->
				<span>列表排序：</span>
				<el-select placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="primary" @click="choisir">发起选拔申请</el-button>
				<el-button type="success">报名开始</el-button>
				<el-button type="warning">报名结束</el-button>
				<el-button type="info">开始选拔</el-button>
				<el-button type="danger">结束选拔</el-button>
			</div>
			
			<div class="table" style="margin: 20px 10px;min-height: 1000px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="groupid" label="渠道"></el-table-column>
					<el-table-column prop="groupname" label="圈ID"></el-table-column>
					<el-table-column prop="groupname" label="圈名称"></el-table-column>
					<el-table-column prop="groupowner" label="圈人数"></el-table-column>
					<el-table-column prop="groupnum" label="圈层级"></el-table-column>
					<el-table-column prop="personvalue" label="创建方式"></el-table-column>
					<el-table-column prop="angelvalue" label="选拔类型" :formatter="choseType"></el-table-column>
					<el-table-column prop="getlightperson" label="选拔发起时间"></el-table-column>
					<el-table-column prop="getlightnum" label="发起人"></el-table-column>
					<el-table-column prop="beanall" label="发起原因"></el-table-column>
					<el-table-column prop="coinall" label="支出人数"></el-table-column>
					<el-table-column prop="beanaveragen" label="支持人员"></el-table-column>
					<el-table-column prop="coinaveragen" label="报名参选人员"></el-table-column>
					<el-table-column prop="coinaveragen" label="选拔开始时间"></el-table-column>
					<el-table-column prop="coinaveragen" label="选拔预设时长"></el-table-column>
					<el-table-column prop="coinaveragen" label="候选人"></el-table-column>
					<el-table-column prop="coinaveragen" label="投票总数"></el-table-column>
					<el-table-column prop="coinaveragen" label="投票人员"></el-table-column>
					<el-table-column prop="coinaveragen" label="PK状态"></el-table-column>
					<el-table-column prop="coinaveragen" label="决胜人"></el-table-column>
					<el-table-column prop="coinaveragen" label="结束时间"></el-table-column>
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
		</el-card>
		
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>
  
</template>

<script>
import confirmModal from '../components/confirmModal'
export default {
  data() {
    return {
      totalSize: '',
      currentPage: 1,
      searchForm: {
        name: '',
        quick: '',
        status: '',
        pageNumber: 1,
        pageSize: 10
      },
      tableData: [],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      options: [
        {
          label: '按参与投票人数由高到低',
          value: '1'
        },
        {
          label: '按圈子人数由高到低',
          value: '2'
        },
        {
          label: '按PK申请时间由近及远',
          value: '1'
        }
      ]
    }
  },
  components: {
    confirmModal
  },
  methods: {
    view() {
      this.$router.push('/circlebusiness/ownerchange/detail')
    },
  	//处理分页
  	handleCurrentChange (val) {
  		this.searchForm.pageNumber = val 
  	},
    // 列表选拔类型过滤
    choseType(row){
      if(row.status === '0'){
        return ''
      }else if(row.status === '1'){
        return ''
      } 
    },
    edit() {},
    openConfirmModal(title) {
      console.log(title)
      // 获取要操作的群名称
      this.confirmSetting.title = title
      this.confirmSetting.show = true
    },
    selectionChange(selection) {
      this.chooseLen = selection.length
    },
    confirmOk() {
      console.log('ok')
    }
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
