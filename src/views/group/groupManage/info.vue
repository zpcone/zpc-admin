<!--群组信息-->
<template>
	<section>
		<!-- 筛选条件 -->
	<el-form class="mb20"  style="background: #f1f1f1;padding: 20px 0;"  ref="searchForm"  v-model="searchForm"  label-width="140px">
		<el-row>
			<el-col :span="10">
				<el-form-item label="渠道：" prop="channelId">
					<el-radio-group v-model="searchForm.channelId"  @change="channelChange">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button label="1">电商</el-radio-button>
						<el-radio-button label="2">社交</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="快速查看：" prop="">
					<el-radio-group v-model="searchForm.quickTime" @change="searchTimeChange(1)">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button label="0" value="">今天</el-radio-button>
						<el-radio-button label="1" value="">昨天</el-radio-button>
						<el-radio-button label="7" value="">最近七天</el-radio-button>
						<el-radio-button label="30" value="">最近30天</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="群状态：" prop="crowdStatus">
					<el-radio-group v-model="searchForm.crowdStatus">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button label="0" >正常</el-radio-button>
						<el-radio-button label="1">已解散</el-radio-button>
						<el-radio-button label="2">已冻结</el-radio-button>
						<el-radio-button label="3">已升级为圈</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="群类型：" prop="createdType" v-if="searchForm.channelId === '1'">
					<el-radio-group v-model="searchForm.createdType">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button label="1" >普通群</el-radio-button>
						<el-radio-button label="2">滤镜群</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="群类型：" prop="createdType" v-if="searchForm.channelId === '2'">
					<el-radio-group v-model="searchForm.createdType">
						<el-radio-button label="">全部</el-radio-button>
						<el-radio-button label="1" >普通群</el-radio-button>
						<el-radio-button label="2" >标签群</el-radio-button>
					</el-radio-group>
	            </el-form-item>
			</el-col>
			<el-col :span="14">
				<el-form-item label="建群时间" prop="time">
				    <el-date-picker
				      v-model="time"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']"
				      @change="searchTimeChange(2)">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="群名称：" prop="crowdName">
	              <el-input class="searchInput" v-model.trim="searchForm.crowdName" maxlength="15" clearable></el-input>
	            </el-form-item>
	            <el-form-item label="群ID：" prop="crowdId">
	              <el-input class="searchInput" v-model.trim="searchForm.crowdId" v-on:input="inputNumCheck" maxlength="19" clearable></el-input>
	            </el-form-item>
				<el-form-item label="群人数：">
					<div class="clearfix">
						<div class="fl">
							<el-row>
								<el-col :span="11" prop="crowdTotalMin">
									<!--<el-input v-model.trim="searchForm.crowdTotalMin"  maxlength="6" clearable></el-input>-->
									<el-input v-model.trim="searchForm.crowdTotalMin" v-on:input="NumCheck" maxlength="6" clearable></el-input>
								</el-col>
								<el-col :span="2" style="text-align: center;">-</el-col>
								<el-col :span="11" prop="crowdTotalMax">
									<!--<el-input v-model.trim="searchForm.crowdTotalMax" maxlength="6" clearable></el-input>-->
									<el-input v-model.trim="searchForm.crowdTotalMax" v-on:input="NumCheck" maxlength="6" clearable></el-input>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-form-item>
		</el-col>
		</el-row>
		<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;" />
		<el-form-item style="margin: 15px 0;text-align: center;">
			<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('searchForm')">查找</el-button>
			<el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
		</el-form-item>
	</el-form>
	<!-- 排序 + 分页 -->
	<div class="m20">
		<!--排序 + 全选 + 已选中项数-->
		<span>群列表排序：</span>
		<el-select placeholder="请选择" v-model="searchForm.sortFlag" prop="sortFlag" @change="sortChange" clearable>
			<el-option v-for="item in optionsSort" :key="item.parmKey" :label="item.parmVal" :value="item.parmKey">
			</el-option>
		</el-select>
		<!--<el-checkbox v-model="tableAll">全选</el-checkbox>-->
		<span>当前选中{{chooseLen}}项</span>
		<el-button type="danger" @click= "dissolutionGroup">解散群</el-button>
		<el-button type="warning" @click= "frozenGroup">冻结群</el-button>
		<el-button type="success" @click= "unfrozenGroup">解冻群</el-button>
		<el-button type="primary" v-if="searchForm.channelId == '' || searchForm.channelId == '1'" @click="groupToCircleClick">群申请成为圈</el-button>
	</div>

	<div class="table" style="margin: 20px 10px;min-height: 100px;">
		<el-table @selection-change="selectionChange" stripe border :data="tableData" style="width:100%" center>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="channelType" :formatter="channelFormat" label="渠道"></el-table-column>
			<el-table-column prop="crowdId" label="群ID"></el-table-column>
			<el-table-column prop="crowdName" label="群名称"></el-table-column>
			<el-table-column prop="memberNickName" label="群主"></el-table-column>
			<el-table-column prop="crowdTotal" label="群人数"></el-table-column>
			<!--<el-table-column prop="contacts" label="人脉值"></el-table-column>
			<el-table-column prop="angel" label="天使值"></el-table-column>
			<el-table-column prop="receiveLamp" label="接灯人"></el-table-column>
			<el-table-column prop="sendLamp" label="发灯数"></el-table-column>
			<el-table-column prop="beanTotal" label="豆总数"></el-table-column>
			<el-table-column prop="beanAvg" label="豆均值"></el-table-column>
			<el-table-column prop="coinTotal" label="币总数"></el-table-column>
			<el-table-column prop="coinAvg" label="币均值"></el-table-column>-->
			<el-table-column prop="createdType" label="群类型" :formatter="createdTypeFormat"></el-table-column>
			<el-table-column prop="crowdStatus" :formatter="statusFormat" label="群状态"></el-table-column>
			<el-table-column prop="created" label="创建时间"></el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<div class="pagination center">
		<el-pagination
		  @current-change="handleCurrentChange"
		  :current-page.sync="searchForm.pageNum"
		  :page-size="searchForm.pageSize"
		  :page-sizes="[5, 10, 15, 20]"
		  layout="total, prev, pager, next,jumper"
		  :total="totalSize">
		</el-pagination>
	</div>

		<el-dialog
			title="群升级为圈"
			:visible.sync="groupToCircle"
			width="30%">
			<div>
				<p>请输入圈名称（标签）：</p>
				<!--<div class="clearfix" style="margin-bottom: 30px;">
					<el-radio-group v-model="choosecircleLable">
		        <el-radio v-for="tag in circleLable" :label="tag" :key="tag" style="margin-bottom: 10px;margin-left: 30px;">{{tag}}</el-radio>
			    </el-radio-group>
				</div>-->
				<el-row>
					<el-col :span="13">
						<el-input v-model.trim="addTag" placeholder="请输入圈名称（标签）（最多8个字）" clearable maxlength="8"></el-input>
					</el-col>
					<el-col :span="4" style="margin-left: 50px;">
						<el-button type="info" icon="el-icon-check" @click="addNewTag">验证</el-button>
					</el-col>
					<el-col :span="24">
						<p style="color:#C7C9CB;font-size: 10px;">参考标签（标签需为属性和行为的一种）：<span style="color:#C7C9CB;font-size: 10px;">例如：家乡、公司、生活、开车、购物</span></p>
					</el-col>
				</el-row>
				<div style="margin: 25px 0;">
					<p>请先输入申请理由</p>
					<el-row>
						<el-col :span="16">
							<el-input type="textarea" v-model.trim="reason" resize="none" maxlength="50" rows="3" placeholder="请输入理由（最多50个字）"></el-input>
						</el-col>
					</el-row>
				</div>
			</div>
			<span slot="footer">
				<el-button @click="groupToCircle = false">取消</el-button>
				<el-button type="success" @click="submit">提交</el-button>
			</span>
		</el-dialog>
	</section>

</template>

<script>
//===查找========解散=====冻结===解冻=群申请成为圈===排序===详情=排序条件渲染表格==标签重名校验
import {
  searchPort,
  dissolution,
  frozen,
  unfrozen,
  upgrade,
  querySort,
  detail,
  SortList,
  laberVerify
} from "@/api/group/info";
import { parseTime } from "@/utils";
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.searchForm.startTime = parseTime(this.time[0]);
          this.searchForm.endTime = parseTime(this.time[1]);
        }
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
    }
  },
  data() {
    return {
      time: [],
      totalSize: "",
      isViewOrManage: "2", //判断是从会员对群的信息管理跳到详情还是从群组信息跳到详情的
      isUse: false,
      searchForm: {
        //渠道类型
        channelId: "",
        quickTime: "",
        pageSize: 10,
        pageNum: 1,
        sortFlag: "",
        crowdStatus: "",
        createdType: "",
        crowdTotalMin: "",
        crowdTotalMax: "",
        startTime: "",
        endTime: "",
        crowdName: "",
        crowdId: "",
        memberId: ""
        //chooseTime: '',
      },
      //群编号
      list: {
        flCrowdToCircleAppliDtoList: [
          {
            crowdId: ""
          }
        ],
        userId: "11111"
      },
      chooseLen: 0,
      optionsSort: [
        {
          parmKey: "",
          parmVal: ""
        }
      ],
      tableData: [
        { channelType: "212121", crowdId: "12121", crowdName: "jhasjhdj" }
      ],
      currentPage: 1,
      groupToCircle: false,
      circleLable: [],
      choosecircleLable: [],
      addTag: "",
      reason: "",
      isSocialContact: true,
      chooseSelection: [],
      personNum: true,
      inputNum: true
    };
  },
  methods: {
    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (
        !reg.test(this.searchForm.crowdId) ||
        !reg.test(this.searchForm.memberId)
      ) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },
    NumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (
        !reg.test(this.searchForm.crowdTotalMin) ||
        !reg.test(this.searchForm.crowdTotalMax)
      ) {
        this.personNum = false;
      } else {
        this.personNum = true;
      }
    },
    channelChange(val) {
      if (val == "") {
        this.searchForm.createdType = "";
      }
    },
    //页面刷新排序列表渲染
    handleQuery() {
      querySort({ parmCategory: "crowd.sortFlag" }).then(res => {
        if (res.status == 200) {
          this.optionsSort = res.data;
        } else if (res.status == 500) {
          let errorMsg = res.errorMsg;
          this.$message.warning(errorMsg);
        }
      });
    },
    //分页处理
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.search();
    },

    //排序下拉框中选值的改变
    sortChange(val) {
      //console.log(val)
      this.searchForm.sortFlag = val;
      SortList(this.searchForm).then(res => {
        //console.log(res)
        this.tableData = res.data;
        this.getList();
      });
    },

    //群申请成为圈按钮
    groupToCircleClick() {
      if (this.checkChoose()) {
        for (let i = 0; i < this.chooseSelection.length; i++) {
          if (this.chooseSelection[i].crowdStatus == "1") {
            this.$message.warning("选项中不能包含已解散的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "2") {
            this.$message.warning("选项中不能包含已冻结的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "3") {
            this.$message.warning(
              "选项中包含了“已升级成为圈”的群！请重新选择！"
            );
            return;
          } else if (this.chooseSelection[i].crowdStatus == "4") {
            this.$message.warning("选项中包含了待审核的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].channelType == 2) {
            this.$message.warning("只支持电商群进行升级！");
            return;
          }
        }
        this.groupToCircle = true;
      }
    },
    //群升级为圈的提交按钮
    submit() {
      if (!this.addTag || !this.reason) {
        this.$message.warning("标签名和申请理由必填！");
        return false;
      } else if (this.isUse == false) {
        this.$message.warning("请先验证标签名是否可用");
        return false;
      } else {
        let jsonData = {};
        let arr = [];
        for (let i = 0, len = this.chooseSelection.length; i < len; i++) {
          let obj = {};
          obj.crowdId = this.chooseSelection[i].crowdId;
          obj.membersTotal = this.chooseSelection[i].crowdTotal;
          obj.circleLable = this.addTag;
          obj.reason = this.reason;
          arr.push(obj);
        }
        jsonData.userId = "123456";
        jsonData.flCrowdToCircleAppliDtoList = arr;
        upgrade(jsonData).then(res => {
          if (res.data == true && res.status == "200") {
            this.$message.success("升级申请发送成功！请耐心等待审核");
            this.groupToCircle = false;
            this.getList();
            this.addTag = "";
            this.reason = "";
          } else if (res.status == 500) {
            let errorMsg = res.errorMsg;
            this.$message.warning(errorMsg);
          }
        });
      }
    },

    // 列表中渠道项过滤
    channelFormat(row) {
      if (row.channelType === 1) {
        return "电商";
      } else if (row.channelType === 2) {
        return "社交";
      }
    },

    //列表中群类型过滤
    createdTypeFormat(row) {
      if (row.createdType === 1) {
        return "普通群";
      } else if (row.createdType === 2) {
        return "滤镜群";
      }
    },
    //列表中群状态的动态修改
    statusFormat(row) {
      if (row.crowdStatus === 0) {
        return "正常";
      } else if (row.crowdStatus === 1) {
        return "解散";
      } else if (row.crowdStatus === 2) {
        return "冻结";
      } else if (row.crowdStatus === 3) {
        return "已升级为圈";
      } else if (row.crowdStatus === 4) {
        return "待审核";
      }
    },

    //快速查看栏和筛选时间的状态内容切换
    searchTimeChange(flag) {
      if (flag === 1) {
        this.time = [];
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      } else if (flag === 2) {
        this.searchForm.quickTime = "";
      }
    },

    //列表中详情页的处理和跳转
    handleDetail(row) {
      //console.log(row)
      // 路由到详情页
      this.$router.push({
        path: "/group/manage/info/detail",
        query: {
          crowdId: row.crowdId,
          isSocialContact: this.isSocialContact,
          channelId: row.channelType,
          isViewOrManage: "2"
        }
      });
    },

    //勾选框发生改变时值得变化处理
    selectionChange(selection) {
      //console.log(selection)
      // 全选 或者选择几项
      this.chooseLen = selection.length;
      this.chooseSelection = selection;
    },

    //查找按钮
    search() {
      if (this.inputNum == false || this.personNum == false) {
        this.$message.warning("人数和ID必须为数字！");
      } else {
        searchPort(this.searchForm).then(res => {
          if (res.status == 200) {
            this.tableData = res.data;
            this.totalSize = Number(res.totalSize);
          } else if (res.status == 500) {
            let errorMsg = res.errorMsg;
            this.$message.warning(errorMsg);
          }
        });
      }
    },

    reset() {
      // 重置表单
      //this.$refs[name].resetFields()
      this.searchForm.channelId = "";
      this.searchForm.quickTime = "";
      this.searchForm.crowdStatus = "";
      this.searchForm.createdType = "";
      this.searchForm.crowdTotalMin = "";
      this.searchForm.crowdTotalMax = "";
      this.time = [];
      this.searchForm.startTime = "";
      this.searchForm.endTime = "";
      this.searchForm.crowdName = "";
      this.searchForm.crowdId = "";
      this.searchForm.memberId = "";
    },

    // 解散按钮
    dissolutionGroup() {
      if (this.checkChoose()) {
        for (let i = 0; i < this.chooseSelection.length; i++) {
          if (this.chooseSelection[i].crowdStatus == "1") {
            this.$message.warning("选项中包含已解散的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "3") {
            this.$message.warning("选项中包含已升级为圈的群！请重新选择！");
            return;
          }
        }
        let str = "";
        let arr = [];
        for (let i = 0, len = this.chooseSelection.length; i < len; i++) {
          arr.push(this.chooseSelection[i].crowdName);
        }
        str = arr.join(",");
        str = "您确定要解散" + str + "吗？";
        arr = null;
        let jsonData = {};
        // TODO
        jsonData.userId = "123456";
        jsonData.crowdList = this.chooseSelection;
        this.$confirm(str, "解散群", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 点击确定
            dissolution(jsonData).then(res => {
              if (res.data == true && res.status == "200") {
                this.$message.success("解散成功！");
                this.search();
              } else if (res.status == 500) {
                let errorMsg = res.errorMsg;
                this.$message.warning(errorMsg);
              }
              //console.log(res)
            });
          })
          .catch(() => {
            // 点击取消
          });
      }
    },

    // 冻结
    frozenGroup() {
      if (this.checkChoose()) {
        for (let i = 0; i < this.chooseSelection.length; i++) {
          if (this.chooseSelection[i].crowdStatus == "1") {
            this.$message.warning("选项中包含已解散的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "3") {
            this.$message.warning("选项中包含已升级为圈的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "2") {
            this.$message.warning("选项中包含已冻结的群！请重新选择！");
            return;
          }
        }
        let str = "";
        let arr = [];
        for (let i = 0, len = this.chooseSelection.length; i < len; i++) {
          arr.push(this.chooseSelection[i].crowdName);
        }
        str = arr.join(",");
        str = "您确定要冻结" + str + "吗？";
        arr = null;
        let jsonData = {};
        jsonData.userId = "123456";
        jsonData.crowdList = this.chooseSelection;
        this.$confirm(str, "冻结群", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 点击确定
            frozen(jsonData).then(res => {
              if (res.data == true && res.status == "200") {
                this.$message.success("操作冻结成功！");
                this.search();
              } else if (res.status == 500) {
                let errorMsg = res.errorMsg;
                this.$message.warning(errorMsg);
              }
            });
          })
          .catch(() => {
            // 点击取消
          });
      }
    },

    // 解冻
    unfrozenGroup() {
      if (this.checkChoose()) {
        for (let i = 0; i < this.chooseSelection.length; i++) {
          if (this.chooseSelection[i].crowdStatus == "1") {
            this.$message.warning("选项中包含已解散的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "0") {
            this.$message.warning("选项中包含正常的群！请重新选择！");
            return;
          } else if (this.chooseSelection[i].crowdStatus == "3") {
            this.$message.warning("选项中包含已升级为圈的群！请重新选择！");
            return;
          }
        }
        let str = "";
        let arr = [];
        for (let i = 0, len = this.chooseSelection.length; i < len; i++) {
          arr.push(this.chooseSelection[i].crowdName);
        }
        str = arr.join(",");
        str = "您确定要解冻" + str + "吗？";
        arr = null;
        let jsonData = {};
        // TODO
        jsonData.userId = "123456";
        jsonData.crowdList = this.chooseSelection;
        this.$confirm(str, "解冻群", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // 点击确定
            unfrozen(jsonData).then(res => {
              if (res.data == true && res.status == "200") {
                this.$message.success("操作解冻成功！");
                this.search();
              } else if (res.status == 500) {
                let errorMsg = res.errorMsg;
                this.$message.warning(errorMsg);
              }
            });
          })
          .catch(() => {
            // 点击取消
          });
      }
    },

    checkChoose() {
      // 已选择的 逻辑处理在这
      let len = this.chooseSelection.length;
      if (len === 0) {
        this.$message.warning("请选择一项");
        return false;
      } else if (len > 1) {
        this.$message.warning("只能选择一项！");
        return false;
      } else {
        return true;
      }
    },
    addNewTag() {
      if (!this.addTag) {
        this.$message.error("不能为空");
        return false;
      } else {
        laberVerify({ circleLable: this.addTag }).then(res => {
          if (res.data == true && res.status == 200) {
            this.$message.success("名称可用！");
            this.isUse = true;
          } else if (res.data == false || res.status == 500) {
            this.$message.error("标签已存在！");
            this.isUse = false;
          }
        });
      }
    },

    statusChange() {
      this.searchForm.createBy = "";
    },
    createByChange() {
      this.searchForm.createStatus = [];
    },

    //页面加载之前 发送查找的请求
    getList() {
      searchPort(this.searchForm).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.tableData = res.data;
          this.totalSize = Number(res.totalSize);
        } else if (res.status == 500) {
          let errorMsg = res.errorMsg;
          this.$message.warning(errorMsg);
        }
      });
    }
  },
  mounted() {
    this.getList();
    this.handleQuery();
  }
};
</script>

<style scoped>
.clearfix {
  zoom: 1;
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
.el-tag {
  display: inline-block;
  width: 70px;
  text-align: center;
}
</style>
