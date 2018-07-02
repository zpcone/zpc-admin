<!--圈成员-->
<template>
	<section>
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="渠道：">
							<el-radio-group v-model="searchForm.roleType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label='1'>社交</el-radio-button>
								<el-radio-button label='2'>电商</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<!-- <el-form-item label="性别：">
							<el-radio-group>
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="男"></el-radio-button>
								<el-radio-button label="女"></el-radio-button>
							</el-radio-group>
						</el-form-item> -->
						<el-form-item label="审核状态：">
							<el-radio-group v-model="searchForm.style">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">待审核</el-radio-button>
								<el-radio-button label="2">已通过</el-radio-button>
								<el-radio-button label="3">已拒绝</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="快速查看：">
							<el-radio-group v-model="searchForm.intoMode">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">今天</el-radio-button>
								<el-radio-button label="2">昨天</el-radio-button>
								<el-radio-button label="3">最近7天</el-radio-button>
								<el-radio-button label="4">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
            <el-form-item label="值关键词：">
              <el-row>
                <el-col>
                  <el-input style="width:400px;" clearable v-model="searchForm.memberId"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
					</el-col>
					<el-col :span="14">
						<!--右侧-->
            <el-form-item label="申请时间：">
              <el-col :span="6">
                <el-date-picker type="date" placeholder="请选择开始时间" v-model="searchForm.createBeginDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col style="margin-left: 25px;" class="line" :span="1">-</el-col>
              <el-col :span="6">
                <el-date-picker type="date" placeholder="请选择结束时间" v-model="searchForm.createEndDate" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
						<el-form-item label="搜索：">
              <el-row>
                <el-col :span="15">
                  <el-input style="width:400px;" clearable v-model="searchForm.circleId"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="搜索：">
              <el-row>
                <el-col :span="15">
                  <el-input style="width:400px;" clearable v-model="searchForm.memberId"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="圈层级：">
              <el-row>
                <el-col :span="15">
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                  <span>-</span>
                  <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button disabled style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset('searchForm')">重置</el-button>
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
				<el-button type="primary" @click="auditMany">批量审核</el-button>
			</div>

			<div class="table" style="margin: 20px 10px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="memberId" label="渠道"></el-table-column>
					<el-table-column prop="memberName" label="申请人ID"></el-table-column>
					<el-table-column prop="roleName" label="申请人名称"></el-table-column>
					<el-table-column prop="nickName" label="所在圈ID"></el-table-column>
					<el-table-column prop="level" label="圈名称"></el-table-column>
					<el-table-column prop="personalValue" label="圈层级"></el-table-column>
					<el-table-column prop="angelValue" label="圈标签"></el-table-column>
					<el-table-column prop="lightNumber" label="申请标签"></el-table-column>
					<el-table-column prop="sendLightNumber" label="申请理由"></el-table-column>
					<el-table-column prop="beansTotalNumber" label="申请时间"></el-table-column>
					<el-table-column prop="coinTotalValue" label="审核状态"></el-table-column>
					<el-table-column prop="warnNumber" label="审核人"></el-table-column>
					<el-table-column prop="intoCircleTime" label="审核时间"></el-table-column>
					<el-table-column width="150" label="管理">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.$index, scope.row)">通过</el-button>
							<el-button type="warning" size="mini" @click="edit(scope.$index, scope.row)">拒绝</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchForm.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="searchForm.pageSize"
        :total="totalPage"></el-pagination>
			</div>
		</el-card>
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
	</section>

</template>

<script>
import { } from '@/api/circle/info'
import confirmModal from '../components/confirmModal'
export default {
  data() {
    return {
      status: true,
      totalPage: '', // 总条数
      searchForm: {
        roleType: '', // 角色帅选
        style: '', // 进圈风格
        intoMode: '', // 进圈方式
        createBeginDate: '', // 开始时间
        createEndDate: '', // 结束时间
        circleId: '',
        pageNum: '1',
        pageSize: '5'
      },
      tableData: [{id:123}],
      confirmSetting: {
        name: '',
        title: '',
        show: false
      },
      options: [
        {
          label: '按接灯数由高到低排序',
          value: '1'
        },
        {
          label: '按人脉值由高到低排序',
          value: '2'
        },
        {
          label: '按发灯数由高到低排序',
          value: '3'
        },
        {
          label: '按币总数由高到低排序',
          value: '4'
        },
        {
          label: '按豆总数由高到低排序',
          value: '5'
        },
        {
          label: '按会员等级排序',
          value: '6'
        },
        {
          label: '按变现次数由高到低排序',
          value: '7'
        },
        {
          label: '按变现金额由大到小排序',
          value: '8'
        }
      ],
      chooseLen: 0,
      pageSize: 10,
      pageNum: 2
    }
  },
  components: {
    confirmModal
  },
  methods: {
    auditMany() {
      console.log('批量审核')
    },
    // 翻页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = String(val)
    },
    // 点击查询事件
    search() {
    },
    view() {
      this.status = false
      // this.$router.push(`/circlemanage/manage/addMember/${this.status}`)
      this.$router.push(`/circlemanage/manage/member/detail/${this.status}`)
    },
    edit() {
      this.status = true
      this.$router.push(`/circlemanage/manage/member/detail/${this.status}`)
    },
    confirmOk() {
      console.log('ok')
    }
  },
  mounted () {
    // var obj = {}
    // obj.circleId = '439455200533413888'
    // obj.pageNumber = '1'
    // obj.pageSize = '5'
    // this.getMember()
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
.el-tag{
  display: inline-block;
  width: 70px;
  text-align: center;
}
</style>
