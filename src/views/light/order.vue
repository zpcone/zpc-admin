<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="许愿灯ID：" prop="wishingLampId">
          <!--<el-input placeholder="" v-model="form.wishingLampId">-->
          <el-input style="width:210px;" placeholder="" v-model.trim="form.wishingLampId" v-on:input="inputNumCheck" maxlength="19" clearable>
            <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="订单号：" prop="orderNo">
          <el-input style="width:210px;" placeholder="" v-model.trim="form.orderNo"  v-on:input="inputNumCheck" maxlength="19" clearable>
            <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="channelId">
          <el-select placeholder="请选择" v-model="form.channelId" clearable>
            <el-option v-for="item in channels" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：" prop="time">
          <el-date-picker v-model="time" type="datetimerange" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
          <el-button type="success" class="el-icon el-icon-search" @click="search">查询</el-button>
          <el-button display="inline-block" class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload">导出</el-button>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="data" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="title" label="许愿灯标题"></el-table-column>
        <el-table-column prop="channelId" :formatter="formatterChannel" label="渠道"></el-table-column>
        <el-table-column prop="wishingLampId" label="许愿灯ID"></el-table-column>
        <el-table-column prop="mId" label="许愿人"></el-table-column>
        <el-table-column prop="lamplighter" label="点灯人"></el-table-column>
        <el-table-column prop="reward" label="订单金额"></el-table-column>
        <el-table-column prop="serviceCharge" label="服务费"></el-table-column>
        <el-table-column prop="createTime" label="订单时间"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" :formatter="formatStatus"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewOrder(scope.$index,scope.row)">查看</el-button>
            <el-button type="text" v-if="scope.row.orderStatus == '1' && scope.row.channelId == '1'" size="mini" @click="returnMoney(scope.row)">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination layout="prev, pager, next" :total="pageTotal" :current-page="pageNum" :page-size="pageSize" @current-change="pageChange">
      </el-pagination>
    </div>

    <el-dialog title="订单详情" :visible.sync="detailDlsg" width="70%">
      <div>
        <div style="margin-bottom: 20px;">

        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基本信息</span>
              </div>
              <div class="text item textB">
                订单号：{{detail.orderNo}}
              </div>
              <div class="text item">
                订单状态：{{detail.orderStatus | orderStatusFilter}}
              </div>
              <div class="text item">
                点灯评价：{{detail.lighterMan.content}}
              </div>
              <div class="text item">
                星级：
                <el-rate style="display: inline-block;" v-model="detail.lighterMan.grade"></el-rate>
              </div>
              <div class="text item">
                评价时间：{{detail.lighterMan.createTime}}
              </div>
              <div class="text item">
                许愿人评价：{{detail.wishMan.content}}
              </div>
              <div class="text item">
                星级：
                <el-rate style="display: inline-block;" v-model="detail.wishMan.grade"></el-rate>
              </div>
              <div class="text item">
                评价时间：{{detail.wishMan.createTime}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <div slot="header" class="clearfix">
                <span>许愿灯信息</span>
              </div>
              <div class="text item">
                许愿灯ID：{{detail.wishingLampId}}
              </div>
              <div class="text item">
                许愿灯标题：{{detail.title}}
              </div>
              <div class="text item">
                订单时间：{{detail.createTime}}
              </div>
              <div class="text item">
                订单金额：{{detail.reward}}
              </div>
              <div class="text item">
                手续费：{{detail.serviceCharge}}
              </div>
              <div class="text item">
                渠道：{{detail.channelId | channelStatusFilter}}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="m20"></div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card>
              <div slot="header" class="clearfix">
                <span>许愿灯信息</span>
              </div>
              <div class="text item">
                许愿灯ID：{{detail.wishingLampId}}
              </div>
              <div class="text item">
                许愿灯人：{{detail.mId}}
              </div>
              <div class="text item">
                点灯圈：
                <el-tag style="margin-left: 5px;" v-for="(item,index) in detail.wishingLampOrderCircleLighterAwardVo" :key="index">{{item.lighterCircleId}}</el-tag>
              </div>
              <div class="text item">
                接灯圈：
                <el-tag style="margin-left: 5px;" v-for="(item,index) in detail.wishingLampOrderCircleReceiveLightAwardVo" :key="index">{{item.receiveLightCircleId}}</el-tag>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div slot="header">
                <span>信使</span>
              </div>
              <div class="text item">
                信使：
                <el-tag style="margin-left: 5px;" v-for="(item,index) in detail.wishingLampOrderMessengerVo" :key="index">{{item.receiveLightCircleId}}
                </el-tag>
                <p v-for="(item,index) in detail.wishingLampOrderMessengerVo" :key="index">盈豆奖励：{{item.beanRale}}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div slot="header">
                <span>推荐人</span>
              </div>
              <div class="text item">
                推荐人：
                <el-tag style="margin-left: 5px;" v-for="(item,index) in detail.wishingLampOrderRefereeVo" :key="index">{{item.refereeId}}
                </el-tag>
                <p v-for="(item,index) in detail.wishingLampOrderRefereeVo" :key="index">盈豆奖励：{{item.beanRale}}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card>
              <div slot="header">
                <span>点灯人</span>
              </div>
              <div class="text item">
                点灯人：
                <el-tag style="margin-left: 5px;" v-for="(item,index) in detail.wishingLampOrderLighterVo" :key="index">{{item.lampLighterId}}</el-tag>
                <!--<el-button type="text">查看流转</el-button>-->
                <span v-if="detail.wishingLampOrderLighterVo instanceof Array && detail.wishingLampOrderLighterVo.length == 0">无数据</span>
                <el-popover
                  v-else
                  placement="top-start"
                  title="点灯流转"
                  trigger="click"
                  :content="flowContent">
                  <el-button type="text" slot="reference" @click="getLightFlow">查看流转</el-button>
                </el-popover>
                <p v-for="(item,index) in detail.wishingLampOrderLighterVo" :key="index">盈豆奖励：{{item.beanRale}}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  orderList,
  orderDetails,
  lightExport,
  lightFlow,
  applyCencel
} from "@/api/light";
import { parseTime } from "@/utils";
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.startTime = this.time[0];
          this.form.endTime = this.time[1];
        }
      } else {
        this.form.startTime = "";
        this.form.endTime = "";
      }
    }
  },
  filters: {
    orderStatusFilter(val) {
      if (val == "1") {
        return "未完成";
      } else if (val == "2") {
        return "已完成";
      } else if (val == "3") {
        return "已过期";
      } else {
        return "已关闭";
      }
    },
    channelStatusFilter(val) {
      if (val == "1") {
        return "我茂";
      } else if (val == "2") {
        return "我鸽";
      }
    }
  },
  data() {
    return {
      flowContent: "",
      form: {
        wishingLampId: "", //许愿灯ID
        orderNo: "", //订单号
        channelId: "", //渠道
        startTime: "",
        endTime: ""
      },
      downloadLoading: false,
      time: [],
      data: [],
      detail: {
        channelId: "",
        createTime: "",
        lamplighter: "",
        mId: "",
        orderNo: "",
        orderStatus: "",
        reward: "",
        serviceCharge: "",
        title: "",
        lighterMan: {
          channelId: "",
          content: "",
          createTime: "",
          grade: "",
          id: "",
          lastUpd: "",
          mId: "",
          mName: "",
          mType: "",
          startId: 0,
          wishingLampId: ""
        },
        wishMan: {
          channelId: "",
          content: "",
          createTime: "",
          grade: "",
          id: "",
          lastUpd: "",
          mId: "",
          mName: "",
          mType: "",
          startId: 0,
          wishingLampId: ""
        },
        wishingLampId: "",
        wishingLampOrderCircleLighterAwardVo: [],
        wishingLampOrderCircleReceiveLightAwardVo: [],
        wishingLampOrderLighterVo: [],
        wishingLampOrderMessengerVo: [],
        wishingLampOrderRefereeVo: []
      },
      detailDlsg: false,
      channels: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "我茂",
          value: "1"
        },
        {
          label: "我鸽",
          value: "2"
        }
      ],
      channelTypes: [
        {
          label: "全部",
          value: "1"
        },
        {
          label: "工作",
          value: "2"
        },
        {
          label: "生活",
          value: "3"
        },
        {
          label: "跑腿代购",
          value: "4"
        },
        {
          label: "取送件",
          value: "5"
        },
        {
          label: "情感",
          value: "6"
        },
        {
          label: "技能",
          value: "7"
        },
        {
          label: "娱乐",
          value: "8"
        },
        {
          label: "服务",
          value: "9"
        },
        {
          label: "医疗",
          value: "10"
        },
        {
          label: "锦囊",
          value: "11"
        },
        {
          label: "其他",
          value: "12"
        },
        {
          label: "交易",
          value: "13"
        }
      ],
      inputNum: true,
      orderData: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 50
    };
  },
  methods: {
    // 点击退款事件
    returnMoney(row) {
      applyCencel({
        mId: row.mId,
        channelId: row.channelId,
        orderNo: row.orderNo,
        beans: row.reward
      }).then(res => {
        if (res.data.success == true && res.status == "200") {
          this.$message.success("退款请求已发送成功，请耐心等待处理！");
        } else {
          this.$message.warning(res.errorMsg);
        }
      });
    },
    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (!reg.test(this.form.wishingLampId) || !reg.test(this.form.orderNo)) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },
    //点灯流转按钮
    getLightFlow() {
      lightFlow({
        wishingLampId: this.detail.wishingLampId, //许愿灯ID
        lighterId: this.detail.wishingLampOrderLighterVo[0].lampLighterId, //点灯人id
        channelId: this.detail.channelId
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
    //调用后台接口导出excel===
    handleDownload() {
      var _this = this;
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      lightExport(this.form)
        .then(res => {
          debugger;
          console.log(typeof res);
          var blob = new Blob([res], { type: "application/vdn.ms-excel" });
          var reader = new FileReader();
          reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
          _this.downloadLoading = true;
          // 文件读取成功的回调
          reader.onload = function(e) {
            if (blob.size <= 0) {
              _this.$message.warning("没有内容导出");
              _this.downloadLoading = false;
              return;
            }
            _this.downloadLoading = false;
            var a = document.createElement("a");
            a.download = "lightTemplate.xls";
            a.href = e.target.result;
            // $("body").append(a);  // 修复firefox中无法触发click
            a.click();
            // $(a).remove();
          };
          // 文件读取失败的回调
          reader.onerror = function(e) {
            _this.downloadLoading = false;
            _this.$message.error("文件导出失败");
          };
        })
        .catch(() => {
          _this.downloadLoading = false;
          _this.$message.error("导出失败");
        });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "createTime") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
    formatStatus(row, column) {
      if (row.orderStatus == "1") {
        return "未完成";
      } else if (row.orderStatus == "2") {
        return "已完成";
      } else if (row.orderStatus == "3") {
        return "已过期";
      } else {
        return "已关闭";
      }
    },
    // 页面初始化
    handleQuery() {
      orderList({
        pageSize: 10,
        pageNum: 1
      })
        .then(res => {
          this.data = res.data;
          this.pageTotal = +res.totalSize;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 搜索
    search() {
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      if (this.inputNum == false) {
        this.$message.warning("ID和订单号必须为数字！");
      } else {
        orderList(this.form)
          .then(res => {
            this.data = res.data;
            this.pageTotal = +res.totalSize;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 分页改变
    pageChange(page) {
      this.pageNum = page;
      this.form.pageNum = page;
      orderList(this.form)
        .then(res => {
          this.data = res.data;
          this.pageTotal = +res.totalSize;
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 查看详情
    viewOrder(index, row) {
      orderDetails({
        orderNo: row.orderNo,
        channelId: row.channelId
      }).then(res => {
        if (res) {
          console.log(res);
          //             wishingLampOrderMessengerVo
          // wishingLampOrderRefereeVo
          // wishingLampOrderLighterVo
          // receiveLightCircleId
          // refereeId
          // lampLighterId
          if (res.data.wishingLampOrderMessengerVo.length == 0) {
            res.data.wishingLampOrderMessengerVo = [
              { beanRale: "0", receiveLightCircleId: "暂无数据" }
            ];
          }
          if (res.data.wishingLampOrderRefereeVo.length == 0) {
            res.data.wishingLampOrderRefereeVo = [
              { beanRale: "0", refereeId: "暂无数据" }
            ];
          }
          if (res.data.wishingLampOrderLighterVo.length == 0) {
            res.data.wishingLampOrderLighterVo = [
              { beanRale: "0", lampLighterId: "暂无数据" }
            ];
          }
          this.detail = res.data;
          this.detailDlsg = true;
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
</style>
