<!--群主对进群邀请信息的审批-->
<template>
	<section>
		<!-- 筛选条件 -->
		<el-card class="mb20">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="会员ID：" prop="mId">
							<el-input v-model="searchForm.mId" v-on:input="inputNumCheck" clearable maxlength="19"></el-input>
						</el-form-item>
						<el-form-item label="会员名称：" prop="nickName" v-if="isDis">
							<el-input v-model.trim="searchForm.nickName" maxlength="10" clearable></el-input>
						</el-form-item>
						<!--<el-form-item label="群ID：" prop="crowdId">
							<el-input v-model="searchForm.crowdId" type="number" :min="0" :max="0" maxlength='20'></el-input>
						</el-form-item>-->

						<el-form-item label="群ID：" prop="crowdId">
							<el-input v-model="searchForm.crowdId"  maxlength='19' v-on:input="inputNumCheck" clearable></el-input>
						</el-form-item>

						<el-form-item label="群名称：" prop="crowdName" v-if="isDis">
							<el-input v-model.trim="searchForm.crowdName" maxlength="10" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="渠道：" prop="channelType" v-if="isDis">
							<el-radio-group v-model="searchForm.channelType">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">电商</el-radio-button>
								<el-radio-button label="2" value="">社交</el-radio-button>

							</el-radio-group>
						</el-form-item>
						<el-form-item label="当前是否在群内：" prop="withInCrowdFlag">
							<el-radio-group v-model="searchForm.withInCrowdFlag" @change="flagClick">
								<el-radio-button label="0" value="">全部</el-radio-button>
								<el-radio-button label="1" value="">是</el-radio-button>
								<el-radio-button label="2" value="">否</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="角色筛选：" prop="roleType" v-if="isDis">
							<el-radio-group v-model="searchForm.roleType">
								<el-radio-button label="" value="">全部</el-radio-button>
								<el-radio-button label="0" value="">群主</el-radio-button>
								<el-radio-button label="1" value="">联席群主</el-radio-button>
								<el-radio-button label="2" value="">行为会员</el-radio-button>
								<!--<el-radio-button label="3" value="">观摩会员</el-radio-button>-->
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="添加时间：" prop="time">
							<el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
							</el-date-picker>
						</el-form-item>-->
					  <!--<el-form-item label="添加时间">
					    <el-col :span="5">
					      <el-form-item prop="starDateStr">
					        <el-date-picker type="date" placeholder="选择开始日期" v-model="searchForm.starDateStr" style="width: 100%;" clearable></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="1" style="padding-left:10px;">-</el-col>
					    <el-col :span="5">
					      <el-form-item prop="endDateStr">
					        <el-date-picker type="date" placeholder="选择结束日期" v-model="searchForm.endDateStr" style="width: 100%;" clearable></el-date-picker>
					      </el-form-item>
					    </el-col>
					  </el-form-item>-->
					  <!--<el-form-item label="进群时间：" v-if="isDis">
					    <el-col :span="5">
					      <el-form-item prop="starDateStr">
								<el-date-picker v-model="searchForm.starDateStr" type="datetime" placeholder="选择开始日期时间"  @change="timeChange(1)"></el-date-picker>
					      </el-form-item>
					    </el-col>
					    <el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
					    <el-col :span="5">
					      <el-form-item prop="endDateStr">
								<el-date-picker v-model="searchForm.endDateStr" type="datetime" placeholder="选择结束日期时间"  @change="timeChange(2)"></el-date-picker>
					      </el-form-item>
					    </el-col>
					  </el-form-item>-->
					  <el-form-item label="进群时间：" prop="time" v-if="isDis">
						    <el-date-picker
						      v-model="time"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']">
						    </el-date-picker>
					  </el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<div class="setting" style="margin-top: 20px;padding-left: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<!--<span>排序：</span>
				<el-select placeholder="请选择" v-model="searchForm.sortBy" @change="sortChange" style="width:250px">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
				<!--<span>当前选中{{chooseLen}}项</span>
				<el-button type="info" @click="approvalDlsg=true">批量审核</el-button>-->
			</div>
			<div class="table" style="margin: 20px 10px;min-height: 100px;">
				<el-table  border :data="tableData" style="width:100%">
					<!--<el-table-column type="selection" width="55"></el-table-column>-->
					<el-table-column prop="channelType" label="渠道" :formatter="channnel"></el-table-column>
					<el-table-column prop="crowdId" label="群ID" width="170"></el-table-column>
					<el-table-column prop="crowdName" label="群名称"></el-table-column>
					<el-table-column prop="roleType" label="群内角色" :formatter="groupRole"></el-table-column>
					<el-table-column prop="nickName" label="群内昵称"></el-table-column>
					<el-table-column prop="flowType" label="当前是否在群内" :formatter="flow"></el-table-column>
					<el-table-column prop="created" label="进群时间" width="170"></el-table-column>
					<el-table-column prop="inviter" label="邀请人"></el-table-column>
					<el-table-column label="角色历史" :formatter="role">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
						</template>
					</el-table-column>
					<el-table-column label="查看详情">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="viewGroup(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="searchForm.pageNum"
					:page-size="searchForm.pageSize" layout="total, prev, pager, next"
					:total="totalSize">
				</el-pagination>
			</div>
		</el-card>
		<!--查看角色历史弹框-->
		<el-dialog title="历任角色" :visible.sync="dialogTableVisible" width="30%">
		  <el-table :data="roleData">
		    <el-table-column prop="roleType" :formatter="groupRole" label="角色名称" width="150"></el-table-column>
		    <el-table-column prop="created" label="开始时间" width="200"></el-table-column>
		    <el-table-column prop="end" label="结束时间"></el-table-column>
		  </el-table>
		</el-dialog>
		<!--批量处理-->
		<el-dialog title="审核" width="30%"
			:visible.sync="approvalDlsg">
			<el-form v-model="approvalForm"
				ref="approvalForm" label-width="140px">
				<div v-if="!isMany">
					<el-form-item prop="ps" label="申请原因：">
						<el-input v-model="approvalForm.reason"></el-input>
					</el-form-item>
					<el-form-item prop="ps" label="申请标签：">
						<el-input v-model="approvalForm.tag"></el-input>
					</el-form-item>
				</div>

				<el-form-item prop="ps" label="备注：">
					<el-input v-model="approvalForm.ps"></el-input>
				</el-form-item>
				<el-form-item prop="action" label="操作">
					<el-select v-model="approvalForm.action">
						<el-option value="1" label="同意"></el-option>
						<el-option value="2" label="拒绝"></el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="agree">同意</el-button>
				<el-button type="danger" @click="refuse">拒绝</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import { searchList, roleHistory, detail } from "@/api/group/memberCanDo";
import { parseTime } from "@/utils";
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.searchForm.starDateStr = parseTime(this.time[0]);
          this.searchForm.endDateStr = parseTime(this.time[1]);
        }
      } else {
        this.searchForm.starDateStr = "";
        this.searchForm.endDateStr = "";
      }
    }
  },
  data() {
    return {
      time: [],
      dialogTableVisible: false,
      isSocialContact: true,
      isViewOrManage: "1",
      isDis: true,
      searchForm: {
        crowdId: "",
        crowdName: "",
        //    	447051768858046464 （qa测试用的mid）
        mId: "",
        nickName: "",
        channelType: "",
        withInCrowdFlag: "0",
        roleType: "",
        starDateStr: "",
        endDateStr: "",
        userId: "212121212",
        pageNum: 1,
        pageSize: 10,
        sortBy: ""
      },
      chooseLen: 0,
      tableData: [{ groupId: 123456 }],
      options: [
        {
          label: "按进群时间由近及远排序",
          value: "1"
        }
      ],
      roleData: [
        {
          roleType: "",
          created: "",
          end: ""
        }
      ],
      totalSize: "",
      currentPage: 1,
      inputNum: true,
      isMany: true,
      approvalDlsg: false,
      approvalForm: {
        ps: "",
        action: "",
        reason: "",
        tag: ""
      }
    };
  },
  methods: {
    sortChange(val) {
      if (val == "1") {
        this.search();
      }
    },
    //当前是否在群内的否   点击时  角色筛选和添加时间消失
    flagClick(val) {
      if (val == 2) {
        this.isDis = false;
      } else {
        this.isDis = true;
      }
    },

    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (
        !reg.test(this.searchForm.crowdId) ||
        !reg.test(this.searchForm.mId)
      ) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },

    search() {
      if (this.inputNum == false) {
        this.$message.warning("ID类的必须为数字！");
      } else {
        searchList(this.searchForm).then(res => {
          this.tableData = [];
          //console.log(res)
          if (res.status == "500") {
            this.$message.warning("会员ID必填！");
          }
          this.tableData = res.data;
          this.totalSize = Number(res.totalSize);
        });
      }
    },

    //筛选快速查看和筛选时间
    //    timeChange (flag) {
    //    	if(flag === 1){
    //    		this.searchForm.starDateStr = parseTime(this.searchForm.starDateStr)
    //    	}if(flag === 2){
    //    		this.searchForm.endDateStr = parseTime(this.searchForm.endDateStr)
    //    	}
    //    },

    //渠道过滤
    channnel(row) {
      if (row.channelType === 1) {
        return "电商";
      } else if (row.channelType === 2) {
        return "社交";
      }
    },
    // 列表中角色过滤
    groupRole(row) {
      if (row.roleType === 0) {
        return "群主";
      } else if (row.roleType === 1) {
        return "联席主席";
      } else if (row.roleType === 2) {
        return "行为会员";
      } else if (row.roleType === 3) {
        return "观摩会员";
      }
    },
    // 列表中角色过滤
    role(row) {
      if (row.roleType === 0) {
        return "群主";
      } else if (row.roleType === 1) {
        return "联席主席";
      } else if (row.roleType === 2) {
        return "行为会员";
      } else if (row.roleType === 3) {
        return "观摩会员";
      }
    },
    //是否在群内
    flow(row) {
      if (
        row.flowType === 1 ||
        row.flowType === 2 ||
        row.flowType === 8 ||
        row.flowType === 10 ||
        row.flowType === 11
      ) {
        return "存在";
      } else if (row.roleType === 3 || row.roleType === 4) {
        return "不存在";
      }
    },
    //查看角色历史
    view(row) {
      this.dialogTableVisible = true;
      //console.log(row)
      roleHistory({
        mId: row.mId,
        crowdId: row.crowdId
        //			crowdId: '2433262367665496064',
        //			mId: '429284578188791808'
      }).then(res => {
        //console.log(res)
        this.roleData = [];
        this.roleData = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj1 = {};
          obj1.roleType = res.data[i].roleType;
          obj1.created = res.data[i].created;
          if (i + 1 < res.data.length) {
            obj1.end = res.data[i + 1].created;
          } else {
            obj1.end = "至今";
          }
          this.roleData.push(obj1);
        }
      });
    },
    //查看群基本信息按钮
    viewGroup(row) {
      //console.log(row)
      this.$router.push({
        path: "/group/manage/info/detail",
        query: {
          //mId:row.mId,
          crowdId: row.crowdId,
          isSocialContact: this.isSocialContact,
          channelId: row.channelType,
          isViewOrManage: "1"
        }
      });
    },
    reset() {
      this.searchForm.crowdId = "";
      this.time = [];
      this.searchForm.crowdName = "";
      this.searchForm.mId = "";
      this.searchForm.nickName = "";
      this.searchForm.channelType = "";
      this.searchForm.withInCrowdFlag = "0";
      this.searchForm.roleType = "";
      this.searchForm.starDateStr = "";
      this.searchForm.endDateStr = "";
      this.isDis = true;
    },
    selectionChange(selection) {
      this.chooseLen = selection.length;
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.search();
    },
    agree() {
      this.$message.success("群已成功升级为圈");
      this.approvalDlsg = false;
    },
    refuse() {
      this.$message.success("批量拒绝成功");
      this.approvalDlsg = false;
    }
    //  view () {
    //    this.$router.push('/group/manage/member/detail')
    //  }
  },
  mounted() {
    this.search();
  }
  //components: {}
};
</script>

<style scoped>
.center {
  text-align: center;
}
.el-input {
  max-width: 360px;
}
</style>
