<template>
	<section>
		<div style="position: absolute; left:260px;margin-top: 10px;">
			<el-button type="info" @click="backClick" icon="el-icon-back">返回</el-button>
		</div>
		<div style="position: absolute; right:100px;margin-top: 10px;">
			<el-button type="primary" icon="el-icon-plus" @click="create">新增群成员</el-button>
			<el-button type="primary" sizi="mini">批量导入用户</el-button>
		</div>
		<el-card class="mb20" style="padding-top: 40px;">
			<el-form class="mb20" style="background: #f1f1f1;padding: 20px 0;" ref="searchForm" v-model="searchForm" label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="群ID：" prop="crowId">
							<el-row>
								<el-col :span="15">
									<el-input v-model.trim="searchForm.crowdId" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="群名称：" prop="crowdName">
							<el-row>
								<el-col :span="15">
									<el-input v-model.trim="searchForm.crowdName" disabled></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="会员ID：" prop="mId">
							<el-row>
								<el-col :span="15">
									<!--<el-input type="number" :min="0" v-model.trim="searchForm.mId"></el-input>-->
									<el-input v-model.trim="searchForm.mId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>

						<!--<el-form-item
				    label="年龄"
				    prop="mId"
				    :rules="rulesTable"
				  >
				    <el-input type="age" v-model.number="searchForm.mId" auto-complete="off"></el-input>
				</el-form-item>						-->

						<el-form-item label="会员名称：" prop="nickName">
							<el-row>
								<el-col :span="15">
									<el-input v-model.trim="searchForm.nickName" clearable></el-input>
								</el-col>
							</el-row>
						</el-form-item>
						<!--<el-form-item label="地区：" prop="crowId">
			              <el-radio-group>
			                <el-radio-button label="">全部</el-radio-button>
			                <el-radio-button label="">省份</el-radio-button>
			                <el-radio-button label="">城市</el-radio-button>
			              </el-radio-group>
			            </el-form-item>-->
					</el-col>
					<el-col :span="14">
						<!--右侧-->
						<!--<el-form-item label="筛选时间：" prop="time" :formatter="yyyy-MM-dd">
							<div class="clearfix">
								<div class="fl">
									<el-select>
										<el-option>按日期排序</el-option>
									</el-select>
								</div>
								<div class="fl padLR15">
									<el-date-picker
								  v-model="searchForm.time"
							      type="datetimerange"
							      range-separator="至"
							      start-placeholder="开始日期"
							      end-placeholder="结束日期"
							      format>
							    </el-date-picker>
								</div>
							</div>
						</el-form-item>-->
						<!--<el-form-item label="筛选时间：" prop="screeningTimeFlag">
			              <el-radio-group v-model="searchForm.screeningTimeFlag">
			                <el-radio-button label="1">按进群日筛选</el-radio-button>
			                <el-radio-button label="2"> 按注册日筛选</el-radio-button>
			              </el-radio-group>
			            </el-form-item>								-->
						<!--<el-form-item label="筛选时间：">
					  	<el-col :span="5">
							<el-select placeholder="请选择" v-model="screeningTimeFlag" @change="timeChange">
								<el-option v-for="item in optionsTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
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
						<!--<el-form-item label="筛选时间">
							<el-col :span="5">
								<el-form-item prop="starDateStr">
									<el-date-picker v-model="searchForm.starDateStr" type="datetime" placeholder="选择开始日期时间" @change="timeChange(1)"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="2" style="padding-left:10px;">-</el-col>
							<el-col :span="5">
								<el-form-item prop="endDateStr">
									<el-date-picker v-model="searchForm.endDateStr" type="datetime" placeholder="选择结束日期时间" @change="timeChange(2)"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>-->
					  <el-form-item label="进群时间：" prop="time">
						    <el-date-picker
						      v-model="time"
						      type="datetimerange"
						      align="right"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      :default-time="['00:00:00', '23:59:59']">
						    </el-date-picker>
					  </el-form-item>

						<el-form-item label="角色筛选：" prop="roleType">
							<el-radio-group v-model="searchForm.roleType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="0">群主</el-radio-button>
								<el-radio-button label="1">联席群主</el-radio-button>
								<el-radio-button label="2">行为会员</el-radio-button>
								<!--<el-radio-button label="3">观摩会员</el-radio-button>-->
							</el-radio-group>
						</el-form-item>
						<!--<el-form-item label="性别：">
			              <el-radio-group>
			                <el-radio-button label="全部"></el-radio-button>
			                <el-radio-button label="男"></el-radio-button>
			                <el-radio-button label="女"></el-radio-button>
			              </el-radio-group>
			            </el-form-item>-->
						<!--<el-form-item label="渠道：" prop="channelType">
			              <el-radio-group v-model="searchForm.channelType">
			                <el-radio-button label="1">电商</el-radio-button>
			                <el-radio-button label="2">社交</el-radio-button>
			              </el-radio-group>
			            </el-form-item>		-->
						<!--</el-form-item>-->
						<el-form-item label="进群方式：" prop="flowType">
							<el-radio-group v-model="searchForm.flowType">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">主动进群</el-radio-button>
								<el-radio-button label="2">被邀请进群</el-radio-button>
								<el-radio-button label="10">扫码推荐</el-radio-button>
								<el-radio-button label="11">后台增设</el-radio-button>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-bottom: 1px dashed #ccc;" />
				<el-form-item style="margin: 15px 0; text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
					<el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<div class="setting">
				<!--<span>群成员列表排序：</span>
				<el-select placeholder="请选择" v-model="screeningTimeFlag" @change="sortChange" clearable>
					<el-option v-for="item in optionsSort" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>-->
				<span style="display: inline-block;margin-right: 20px;margin-left: 20px;">当前选中{{chooseLen}}项</span>
				<el-button type="danger" @click="openConfirmModal('踢出群')">踢出群</el-button>
				<el-upload style="margin-left:220px;margin-top: -39px;" action="https://apiengine.womaoapp.com/fwas-crowd-admin/sys/crowdMember/batchImportMember" class='ensure ensureButt' name="file" :onError="uploadError" :onSuccess="uploadSuccess" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv" :beforeUpload="beforeAvatarUpload" :auto-upload="true">

				</el-upload>
			</div>

			<div class="table" style="margin: 40px 10px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="mId" label="会员ID" width="165"></el-table-column>
					<el-table-column prop="realName" label="会员名称"></el-table-column>
					<el-table-column prop="roleType" label="群内角色" :formatter="groupRole"></el-table-column>
					<el-table-column prop="nickName" label="群内昵称"></el-table-column>
					<el-table-column prop="peopleVal" label="人脉值"></el-table-column>
					<el-table-column prop="angelVal" label="天使值"></el-table-column>
					<el-table-column prop="receiverLampSum" label="接灯数"></el-table-column>
					<el-table-column prop="publicLampSum" label="发灯数"></el-table-column>
					<el-table-column prop="beanTotal" label="豆总数"></el-table-column>
					<el-table-column prop="moneyTotal" label="币总值"></el-table-column>
					<el-table-column prop="created" label="进群时间" width="165"></el-table-column>
					<el-table-column prop="flowType" label="进群方式" :formatter="flowStatus"></el-table-column>
					<el-table-column prop="inviter" label="邀请人"></el-table-column>
					<el-table-column width="180">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
							<!-- <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchForm.pageNum" :page-size="searchForm.pageSize" layout="total, prev, pager, next" :total="totalSize">
				</el-pagination>
			</div>
		</el-card>
		<!--上传excel成功之后弹出的对话框-->
		<el-dialog title="导入失败的数据" :visible.sync="dialogTableVisible" width="20%">
			<el-table :data="ruleForm">
				<el-table-column prop="crowdId" label="群编号" width="200"></el-table-column>
				<el-table-column prop="mId" label="会员编号" width="160"></el-table-column>
			</el-table>
		</el-dialog>
	</section>

</template>

<script>
//=========查找=======踢出群
import { searchList, kickOut } from "@/api/group/members";
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
      currentPage: 1,
      totalSize: "",
      chooseLen: 0,
      rulesTable: [
        {
          type: "number",
          message: "ID必须为数字值"
        }
      ],
      searchForm: {
        //群id
        //crowdId: '2423079782133948416',
        crowdId: "",
        //群名称
        crowdName: "",
        roleType: "",
        screeningTimeFlag: "",
        starDateStr: "",
        endDateStr: "",
        pageNum: 1,
        pageSize: 10,
        flowType: "", //进群方式：1主动进群 2被邀请进群 10扫码推荐 11后台增设
        nickName: "", //会员名称
        mId: "", //会员id
        channelType: "2" //渠道
        //status: ''
      },
      //    optionsTime: [
      //    	{
      //    		value: '1',
      //    		label: '按进群日筛选'
      //    	},
      //    	{
      //    		value: '2',
      //    		label: '按注册日筛选'
      //    	},
      //    ],
      optionsSort: [
        {
          value: "1",
          label: "按进群日筛选"
        },
        {
          value: "2",
          label: "按注册日筛选"
        }
      ],
      tableData: [],
      deleteData: [],
      outList: {
        userId: "21212121",
        mIds: [],
        crowdId: "",
        nickNames: [],
        roleTypes: []
      },
      //接收上传excal完成的返回值
      ruleForm: [],
      chooseSelection: [],
      inputNum: true
    };
  },
  methods: {
    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (!reg.test(this.searchForm.mId)) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },
    backClick() {
      this.$router.push({
        path: "/group/manage/info/detail",
        query: {
          crowdId: this.searchForm.crowdId,
          channelId: this.searchForm.channelType,
          isViewOrManage: "2",
          isSocialContact: this.isSocialContact
        }
      });
    },

    flowStatus(row) {
      if (row.flowType == "1") {
        return "主动进群";
      } else if (row.flowType == "2") {
        return "被邀请进群";
      } else if (row.flowType == "10") {
        return "扫码推荐";
      } else if (row.flowType == "11") {
        return "后台增设";
      }
    },
    //			timeChange(flag) {
    //				if(flag == 1) {
    //					this.searchForm.starDateStr = parseTime(this.searchForm.starDateStr)
    //				} else if(flag == 2) {
    //					this.searchForm.endDateStr = parseTime(this.searchForm.endDateStr)
    //
    //				}
    //			},
    //页面刷新  从群组的群信息详情里面带过来的群id
    handelQuery() {
      let query = this.$router.currentRoute.query;
      this.searchForm.crowdId = query.crowdId + "";
      this.searchForm.channelType = query.channelId + "";
      this.searchForm.crowdName = query.crowdName;
      this.search();
    },
    // 列表中角色过滤
    groupRole(row) {
      if (row.roleType == "0") {
        return "群主";
      } else if (row.roleType == "1") {
        return "联席主席";
      } else if (row.roleType == "2") {
        return "行为会员";
      } else if (row.roleType == "3") {
        return "观摩会员";
      }
    },
    //查找按钮
    search() {
      if (this.inputNum == false) {
        this.$message.warning("会员ID必须为数字！");
      } else {
        searchList(this.searchForm).then(res => {
          this.tableData = [];
          //console.log(res)
          this.totalSize = "";
          if (res.data != "" && res.status == "200") {
            this.tableData = res.data;
            this.totalSize = Number(res.totalSize);
          }
        });
      }
    },
    //日期筛选改变
    //  timeChange (val) {
    //  	this.searchForm.screeningTimeFlag = val
    //  },
    //日期筛选改变
    sortChange(val) {
      this.searchForm.screeningTimeFlag = val;
      this.search();
    },
    //重置按钮
    reset() {
      this.time = [];
      this.searchForm.mId = "";
      this.searchForm.nickName = "";
      this.searchForm.starDateStr = "";
      this.searchForm.endDateStr = "";
      this.searchForm.roleType = "";
      this.searchForm.flowType = "";
    },
    //新增
    create() {
      this.$router.push({
        path: "/group/manage/member/new",
        query: {
          //mId: this.searchForm.mId,//不需要带过去 会从新增页面输入会员id查找  然后增加
          crowdId: this.searchForm.crowdId + "",
          channelType: this.searchForm.channelType,
          crowdName: this.searchForm.crowdName,
          isView: false,
          isShow: true,
          newAdd: true,
          isEdit: false
        }
      });
    },
    //查看群成员详情
    view(row) {
      //  	console.log(row)
      let mId = row.mId;
      let crowdId = row.crowdId;
      let flowType = row.flowType;
      let channelType = this.searchForm.channelType;
      this.$router.push({
        path: "/group/manage/member/detail",
        query: {
          mId: mId,
          crowdId: crowdId,
          flowType: flowType,
          channelType: channelType,
          isView: true,
          isShow: true,
          newAdd: false,
          isEdit: true
        }
      });
    },
    //编辑群成员详情
    edit(row) {
      //console.log(row)
      let mId = row.mId;
      let crowdId = row.crowdId;
      let nickName = row.nickName;
      let channelType = this.searchForm.channelType;
      this.$router.push({
        path: "/group/manage/member/edit",
        query: {
          mId: mId,
          crowdId: crowdId,
          nickName: nickName,
          channelType: channelType,
          isView: false,
          isShow: true,
          newAdd: true,
          isEdit: true
        }
      });
    },

    selectionChange(selection) {
      this.chooseLen = selection.length;
      this.chooseSelection = selection;
    },

    checkChoose() {
      // 已选择的 逻辑处理在这
      let len = this.chooseSelection.length;
      if (len === 0) {
        this.$message.warning("请至少选择一项");
        return false;
      } else {
        return true;
      }
    },
    //踢出群
    openConfirmModal() {
      //  	if(this.checkChoose()){
      //      let str = ''
      //      this.outList.nickNames = []
      //      this.outList.mIds = []
      //      this.outList.roleTypes = []
      //      this.outList.crowdId = this.chooseSelection[0].crowdId
      //      for(let i=0;i<this.chooseSelection.length;i++){
      //        this.outList.nickNames.push(this.chooseSelection[i].nickName)
      //        this.outList.mIds.push(this.chooseSelection[i].mId)
      //        this.outList.roleTypes.push(this.chooseSelection[i].roleType)
      //      }
      //      str = this.outList.nickNames.join(',')
      //      str = '您确定要将'+ '【' + str + '】' + '踢出群吗？'
      //      this.$confirm(str,'解散群',{
      //        confirmButtonText: '确定',
      //        cancelButtonText: '取消',
      //        type: 'warning'
      //      }).then(() => {
      //      	kickOut(this.outList).then(res => {
      //      		if(res.data == true && res.status == '200'){
      //      			this.$message.success('操作成功')
      //      			this.search()
      //      		}
      //      	}).catch(error => {
      //      		console.log(error)
      //      	})
      //      })
      //  	}
      if (this.checkChoose()) {
        for (let k = 0; k < this.chooseSelection.length; k++) {
          if (this.chooseSelection[k].roleType == "0") {
            this.$message.warning("不可将群主踢出群！");
            return;
          }
        }
        let str = "";
        this.outList.nickNames = [];
        this.outList.mIds = [];
        this.outList.roleTypes = [];
        this.outList.crowdId = this.chooseSelection[0].crowdId;
        for (let i = 0; i < this.chooseSelection.length; i++) {
          this.outList.nickNames.push(this.chooseSelection[i].nickName);
          this.outList.mIds.push(this.chooseSelection[i].mId);
          this.outList.roleTypes.push(this.chooseSelection[i].roleType);
        }
        str = this.outList.nickNames.join(",");
        str = "您确定要将" + "【" + str + "】" + "踢出群吗？";
        this.$confirm(str, "解散群", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          kickOut(this.outList)
            .then(res => {
              if (res.data == true && res.status == "200") {
                this.$message.success("操作成功");
                this.search();
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    },
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.search();
    },

    // 下载excel模板
    getExcelTem() {
      window.location.href = "";
    },

    // 上传错误
    uploadError(response, file, fileList) {
      //console.log('上传失败，请重试！')
      this.$message.error("上传失败，请重试！");
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      //console.log('上传文件')
      //console.log(response)
      if (response.data.data == true && response.data.status == "200") {
        this.$message.success("批量导入成功！");
      } else if (response.data.data.length > 0) {
        this.dialogTableVisible = true;
        this.ruleForm = response.data.data;
      }
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      // const extension3 = file.name.split('.')[1] === 'doc'
      // const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log("上传模板只能是 xls、xlsx、格式!");
      }
      if (!isLt2M) {
        console.log("上传模板大小不能超过 10MB!");
      }
      return extension || (extension2 && isLt2M);
    }
  },
  mounted() {
    this.handelQuery();
  }
};
</script>

<style scoped>
.clearfix {
  zoom: 1;
}

.el-upload-list {
  width: 18%;
}

.clearfix:after {
  content: " ";
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

.setting .el-upload-list {
  width: 18%;
}
</style>
