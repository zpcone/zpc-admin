<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="许愿灯ID" prop="wishingLampId">
          <el-input placeholder="" v-on:input="inputNumCheck" v-model.trim="form.wishingLampId" style="width:230px" maxlength="19" clearable>
            <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="许愿人" prop="mId">
          <el-input placeholder="" v-model.trim="form.mId" style="width:230px" clearable>
            <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channelId">
          <el-select  placeholder="请选择" v-model="form.channelId" @change="channelChange">
              <el-option
                  v-for="item in channels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="publishTypeId" v-if="isType">
          <el-select  placeholder="请选择" v-model="form.publishTypeId">
              <el-option
                  v-for="item in channelTypes"
                  :key="item.name"
                  :label="item.name"
                  :value="item.publishTypeId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="time">
          <el-date-picker
            v-model="time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="mm/dd/yyyy"
            end-placeholder="mm/dd/yyyy">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20 textr">
      <el-button class="el-icon el-icon-search" type="primary" @click="search('form')">查询</el-button>
      <el-button type="danger" @click="goToDel">查看已删除许愿灯</el-button>
    </div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
      	<el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item  label="类型">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item  label="点灯截止时间">
                <span>{{ props.row.lightUpEndTime }}</span>
              </el-form-item>
              <el-form-item  label="接灯截止时间">
                <span>{{ props.row.receiveLampEndTime}}</span>
              </el-form-item>
              <el-form-item  label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item  label="接灯人数">
                <span>{{ props.row.lightReceiveSum }}</span>
              </el-form-item>
              <el-form-item  label="点灯人数">
                <span>{{ props.row.lampLighterSum }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="wishingLampId" label="许愿灯ID" width="240"></el-table-column>
        <el-table-column prop="title" label="许愿灯标题"></el-table-column>
        <el-table-column prop="mId" label="许愿人"></el-table-column>
        <el-table-column prop="reward" label="赏金"></el-table-column>
        <!-- TODO -->
        <el-table-column prop="type" :formatter="formatterType" label="许愿范围"></el-table-column>
        <el-table-column prop="channlId" :formatter="formatterChannel" label="渠道"></el-table-column>
        <el-table-column prop="mutex" :formatter="formatterMutex" label="排他与否"></el-table-column>
        <el-table-column prop="messenger" :formatter="formatterMessenger" label="是否信使"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewLight(scope.$index,scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="removeLight(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        layout="total, prev, pager, next"
        :total="pageTotal"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
    <el-dialog
      title="删除操作"
      :visible.sync="delDlsg"
      width="25%">
      <div>
        <el-form ref="delForm" :model="delForm">
          <el-form-item prop="reason" label="删除原因">
            <el-radio-group v-model="delForm.reason">
              <el-row>
                <el-col :span="12" v-for="(item,index) in reasons" :key="index">
                  <el-radio style="margin-bottom: 10px;" :label="item.reasonId" :key="index">{{item.reasonName}}</el-radio>
                </el-col>
                {{delForm.reason}}
                <!-- TODO -->
                <el-col :span="24">
                  <el-radio  label="qita">其他</el-radio>
                  <el-input style="width: 200px;margin-left: 20px;" v-if="delForm.reason == 'qita'" v-model="otherReason" placeholder=""></el-input>
                </el-col>
              </el-row>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDlsg = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="许愿灯详情"
      :visible.sync="detailDlsg"
      width="70%">
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基本信息</span>
              </div>
              <div class="text item textB">
                许愿灯ID：{{lightDetail.wishingLampId}}
              </div>
              <div class="text item">
                许愿灯当前状态：{{lightDetail.wishingLampStatus | statusFilter}}
              </div>
              <div class="text item">
                许愿灯接灯次数：{{lightDetail.receiveLightNum}}
              </div>
              <div class="text item">
                许愿灯转发次数：{{lightDetail.forwardLightNum}}
              </div>
              <div class="text item">
                接灯人数：{{lightDetail.lightReceiveSum}}
              </div>
              <div class="text item">
                信使人数：{{lightDetail.messengerSum}}
              </div>
              <div class="text item">
                接灯圈子数：{{lightDetail.receiveCircleNum}}
              </div>
              <div class="text item">
                接灯群数：{{lightDetail.receiveCrowdNum}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <div  class="text item">
                渠道：{{lightDetail.channelId | channelFilter}}
              </div>
              <div  class="text item">
                许愿灯范围：{{lightDetail.type | typeFilter}}
              </div>
              <div  class="text item">
                是否信使：{{lightDetail.messenger | messengeFilter}}
              </div>
              <div  class="text item">
                是否排他：{{lightDetail.mutex | mutexFilter}}
              </div>
              <div  class="text item">
                赏金：{{lightDetail.reward}}
              </div>
              <div  class="text item">
                类型：{{lightDetail.name}}
              </div>
              <div  class="text item">
                接灯截止时间：{{lightDetail.receiveLampEndTime}}
              </div>
              <div  class="text item">
                点灯截止时间：{{lightDetail.lightUpEndTime}}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="m20"></div>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>许愿灯信息</span>
              </div>
              <div  class="text item">
              许愿灯标题：{{lightDetail.title}}
            </div>
            <div  class="text item">
              许愿灯内容：{{lightDetail.content}}
            </div>
            <!--<div  class="text item">
            	 <!--<template>-->
            	 	<!--许愿灯图片：<img :src="lightDetail.images" class="smallPic" alt=""/>-->
            	 <!--</template>-->
             <!--许愿灯图片：{{lightDetail.images}}-->
            <!--</div>-->
            <div class="text item">
            	 	<!--许愿灯图片：<span class="smallPic">
            	 		<img :src="lightDetail.images" class="smallPic" alt=""/>
            	 	</span>-->

            	 	许愿灯图片：<span class="smallPic" v-for="(item,index) in picArray" :key="item">
            	 		<img :src="item" class="smallPic" alt=""/>
            	 	</span>
            </div>
            <div  class="text item">
              创建时间：{{lightDetail.createTime}}
            </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="m20"></div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>人信息</span>
              </div>
              <div  class="text item">
                接灯人：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageVo" :key="index">{{item.lightReceiveId}}</el-tag>
                <el-button  type="text" v-if="lightDetail.wishingLampManageVo instanceof Array && lightDetail.wishingLampManageVo.length > 0" @click="goToDetai('接灯人')">查看详情</el-button>
                <span v-else>无数据</span>
              </div>
              <div  class="text item">
                信使：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageMessengerVo" :key="index">{{item.messengerId}}</el-tag>
                <el-button type="text" v-if="lightDetail.wishingLampManageMessengerVo instanceof Array && lightDetail.wishingLampManageMessengerVo.length > 0" @click="goToDetai('信使')">查看详情</el-button>
                <span v-else>无数据</span>
              </div>
              <div  class="text item">
                推荐人：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageRecommendVo" :key="index">{{item.recommendId}}</el-tag>
               <el-button type="text" v-if="lightDetail.wishingLampManageRecommendVo instanceof Array && lightDetail.wishingLampManageRecommendVo.length > 0" @click="goToDetai('推荐人')">查看详情</el-button>
                <span v-if="lightDetail.wishingLampManageRecommendVo instanceof Array && lightDetail.wishingLampManageRecommendVo.length == 0">无数据</span>
              </div>
              <div  class="text item">
                点灯人：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageLighterVo" :key="index">{{item.lampLighterId}}</el-tag>
                <span v-if="lightDetail.wishingLampManageLighterVo instanceof Array && lightDetail.wishingLampManageLighterVo.length == 0">无数据</span>
                <el-popover
                  v-else
                  placement="top-start"
                  title="点灯流转"
                  width="550"
                  trigger="click"
                  :content="flowContent">
                  <el-button type="text" slot="reference" @click="getLightFlow">查看流转</el-button>
                </el-popover>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <!--{{lightDetail}}-->
              <div  class="text item">
                接灯圈：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageCircleReceiveLightVo" :key="index">{{item.receiveLightCircleId}}</el-tag>
                <el-button type="text" v-if="lightDetail.wishingLampManageCircleReceiveLightVo instanceof Array && lightDetail.wishingLampManageCircleReceiveLightVo.length > 0" @click="goToDetai('接灯圈')">查看详情</el-button>
                <span v-else>无数据</span>
              </div>
              <div  class="text item">
                点灯圈：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageCircleLighterVo" :key="index">{{item.lighterCircleId}}</el-tag>
                <el-button type="text" v-if="lightDetail.wishingLampManageCircleLighterVo instanceof Array && lightDetail.wishingLampManageCircleLighterVo.length > 0" @click="goToDetai('点灯圈')">查看详情</el-button>
                <span v-if="lightDetail.wishingLampManageCircleLighterVo instanceof Array && lightDetail.wishingLampManageCircleLighterVo.length == 0">无数据</span>
              </div>
              <div  class="text item">
                接灯群：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageCrowdReceiveLightVo" :key="index">{{item.receiveLightCrowdId}}</el-tag>
                <el-button type="text" v-if="lightDetail.wishingLampManageCrowdReceiveLightVo instanceof Array && lightDetail.wishingLampManageCrowdReceiveLightVo.length > 0" @click="goToDetai('接灯群')">查看详情</el-button>
                <span v-else>无数据</span>
              </div>
              <div  class="text item">
                点灯群：<el-tag style="margin-left: 5px;" v-for="(item,index) in lightDetail.wishingLampManageCrowdLighterVo" :key="index">{{item.lighterCrowdId}}</el-tag>
                <el-button type="text" v-if="lightDetail.wishingLampManageCrowdLighterVo instanceof Array && lightDetail.wishingLampManageCrowdLighterVo.length > 0" @click="goToDetai('接灯群')">查看详情</el-button>
                <span v-if="lightDetail.wishingLampManageCrowdLighterVo instanceof Array && lightDetail.wishingLampManageCrowdLighterVo.length == 0">无数据</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { parseTime } from "@/utils";
import {
  lightList,
  testMessage,
  lightDetail,
  receiveLighterList,
  messagerList,
  recommendList,
  lighterList,
  circleReceiveLightList,
  circleLighterLis,
  crowdReceiveLight,
  crowdLighterList,
  delLight,
  getRemoveList,
  getPublish,
  saveRemoveReason,
  lightFlow
} from "@/api/light";
export default {
  filters: {
    typeFilter(val) {
      if (val == "1") {
        return "公开";
      } else if (val == "2") {
        return "系统匹配";
      } else {
        return "定向";
      }
    },
    statusFilter(val) {
      if (val === "1") {
        return "未接灯";
      } else if (val === "2") {
        return "已接灯";
      } else if (val === "3") {
        return "已点亮";
      } else if (val === "4") {
        return "已完成";
      }
    },
    channelFilter(val) {
      if (val === "1") {
        return "电商";
      } else if (val === "2") {
        return "社交";
      }
    },
    messengeFilter(val) {
      if (val === "1") {
        return "是";
      } else if (val === "2") {
        return "否";
      }
    },
    mutexFilter(val) {
      if (val === "1") {
        return "是";
      } else if (val === "2") {
        return "否";
      }
    }
  },
  computed: {
    picArray: function() {
      return this.lightDetail.images.split(",");
    }
  },
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.begindate = parseTime(this.time[0]);
          this.form.enddate = parseTime(this.time[1]);
        }
      } else {
        this.form.begindate = "";
        this.form.enddate = "";
      }
    }
  },
  data() {
    return {
      isType: false,
      form: {
        wishingLampId: "",
        mId: "",
        channelId: "",
        name: "",
        begindate: "",
        enddate: ""
      },
      time: [],
      data: [],
      detailDlsg: false,
      delDlsg: false,
      delForm: {
        reason: ""
      },
      picArray: [],
      //      438745901666598912
      lightDetail: {
        images: "",
        receivers: [],
        messengers: [],
        recommends: [],
        lightLists: [],
        receiveCircle: [],
        lightCircle: [],
        receiveGroup: [],
        lightGroup: []
      },
      personData: [],
      circleData: [],
      groupData: [],
      downloadLoading: false,
      reasons: [],
      channels: [
        {
          label: "电商",
          value: "1"
        },
        {
          label: "社交",
          value: "2"
        }
      ],
      channelTypes: [],
      lightData: [],
      pageNum: 1,
      pageSize: 10,
      inputNum: true,
      pageTotal: "",
      channelId: "",
      wishingLampId: "",
      wishingLampStatus: "",
      mId: "",
      otherReason: "",
      flowContent: ""
    };
  },
  methods: {
    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (!reg.test(this.form.wishingLampId)) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },
    rawHtml() {
      return '<img :src="lightDetail.images" />';
    },
    // 列表列格式化
    formatterMessenger(row, column) {
      if (row.messenger === "1") {
        return "是";
      } else {
        return "否";
      }
    },
    formatterMutex(row, column) {
      if (row.mutex === "1") {
        return "是";
      } else {
        return "否";
      }
    },
    formatterChannel(row, column) {
      let label = "";
      for (let i = 0; i < this.channels.length; i++) {
        if (row.channelId === this.channels[i].value) {
          label = this.channels[i].label;
        }
      }
      return label;
    },
    //    formatterChannel(row){
    //      if(row.channelId === '1'){
    //        return "电商"
    //      }else if(row.type === '2'){
    //        return "社交"
    //      }
    //    },
    formatterType(row, column) {
      if (row.type === "1") {
        return "公开";
      } else if (row.type === "2") {
        return "系统匹配";
      } else {
        return "定向";
      }
    },

    // 导出Excel
    handleDownload() {
      this.downloadLoading = true;
      const { export_json_to_excel } = require("@/vendor/Export2Excel");
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.data);
        export_json_to_excel(tHeader, data, "列表excel");
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    // 页面初始化
    handleQuery() {
      lightList({ pageSize: 10, pageNum: 1 })
        .then(res => {
          this.data = res.data.data;
          this.pageTotal = +res.totalSize;
        })
        .catch(error => {
          console.log(error);
        });
    },
    channelChange(val) {
      this.form.channelId = val + "";
      getPublish({ channelId: this.form.channelId }).then(response => {
        this.channelTypes = response.data.data;
        this.isType = true;
      });
    },

    // 搜索
    search() {
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      if (this.inputNum == false) {
        this.$message.warning("ID必须为数字！");
      } else {
        lightList(this.form)
          .then(res => {
            this.data = res.data.data;
            this.pageTotal = +res.totalSize;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    // 查看详情
    viewLight(index, row) {
      this.wishingLampId = row.wishingLampId;
      this.channelId = row.channelId;
      this.wishingLampStatus = row.wishingLampStatus;
      lightDetail({
        wishingLampId: row.wishingLampId,
        channelId: row.channelId
      }).then(res => {
        if (res) {
          this.lightDetail = res.data.data;
          this.lightDetail.images = res.data.data.images;
          this.picArray = this.lightDetail.images.split(",");
          this.detailDlsg = true;
        }
      });
    },

    // 删除许愿灯
    removeLight(index, row) {
      this.wishingLampId = row.wishingLampId;
      this.channelId = row.channelId;
      this.mId = row.mId;
      // 查询所有删除原因
      getRemoveList({ channelId: row.channelId }).then(res => {
        this.reasons = res.data.data;
      });
      this.delDlsg = true;
      // 保存当前数据 ID 和channelId
    },

    getLightFlow() {
      lightFlow({
        wishingLampId: this.lightDetail.wishingLampId,
        lighterId: this.lightDetail.wishingLampManageLighterVo[0].lampLighterId,
        channelId: this.lightDetail.channelId
      }).then(res => {
        if (res.status == 200) {
          let content = res.data.data;
          let str = "";
          if (!content.messengerId && content.referrer) {
            str =
              "许愿人ID：" +
              content.wishPersonId +
              " → " +
              "推荐人ID：" +
              content.referrer +
              " → " +
              "点灯人ID：" +
              content.lighterId;
          } else if (!content.referrer && content.messengerId) {
            let str1 = "";
            let str2 = "";
            for (let i = 0; i < content.messengerId.length; i++) {
              let str3 = "信使";
              str1 = i + 1;
              str2 += str3 + str1 + " ID：" + content.messengerId[i] + " → ";
            }
            str =
              "许愿人ID：" +
              content.wishPersonId +
              " → " +
              str2 +
              "点灯人ID：" +
              content.lighterId;
          } else if (!content.messengerId || !content.referrer) {
            str =
              "许愿人ID：" +
              content.wishPersonId +
              " → " +
              "点灯人ID：" +
              content.lighterId;
          }
          this.flowContent = str;
        }
      });
    },
    // 确定删除
    delConfirm() {
      if (this.delForm.reason == "qita") {
        // 判断不为空
        if (this.otherReason !== "") {
          delLight({
            channelId: this.channelId,
            reasonName: this.otherReason,
            mId: this.mId,
            wishingLampId: this.wishingLampId,
            uId: "12121212121" //用户id
          }).then(res => {
            if (res.status == 200) {
              // 同时删除列表中的某一项
              this.$message.success("删除成功");
              this.handleQuery();
              this.delDlsg = false;
              this.otherReason = "";
            } else if (res.status == 500) {
              this.$message.warning("删除失败!");
            }
          });
        } else {
          this.$message.error("请输入其他原因");
          return false;
        }
      } else if (this.delForm.reason !== "") {
        delLight({
          channelId: this.channelId,
          reasonId: this.delForm.reason,
          mId: this.mId,
          wishingLampId: this.wishingLampId,
          uId: "12121212121"
        }).then(res => {
          if (res.status == 200) {
            // 同时删除列表中的某一项
            this.handleQuery();
            this.delDlsg = false;
            this.delForm.reason = "";
          } else if (res.status == 500) {
            this.$message.warning("删除失败!");
          }
        });
      } else {
        this.$message.error("删除原因不得为空");
      }
    },

    // 分页改变
    pageChange(page) {
      this.pageNum = page;
      this.form.pageNum = page;
      lightList(this.form)
        .then(res => {
          this.data = res.data.data;
          this.pageTotal = +res.totalSize;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToDel() {
      this.$router.push("/light/dellist");
    },
    goToDetai(type) {
      this.$router.push({
        path: "/light/detail",
        query: {
          type: type,
          wishingLampId: this.wishingLampId,
          channelId: this.channelId,
          wishingLampStatus: this.wishingLampStatus
        }
      });
    }
  },
  mounted() {
    this.handleQuery();
  }
};
</script>

<style scoped lang="scss">
.textr {
  text-align: right;
}

.textl {
  text-align: left;
}

.textc {
  text-align: center;
}

.m20 {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.text {
  font-size: 14px;
}
.textB {
  font-weight: bold;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card {
  min-height: 440px;
}
.smallPic {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 5px;
}
</style>
