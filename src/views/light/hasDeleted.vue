<template>
  <section>
    <div class="search m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="许愿灯ID：" prop="wishingLampId" style="margin-right: 5%;">
          <el-input placeholder="" v-on:input="inputNumCheck" maxlength="19" clearable style="width:220px;" v-model.trim="form.wishingLampId">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="许愿人：" prop="mId" style="margin-right: 5%;">
          <el-input placeholder="" v-model.trim="form.mId" style="width:230px;" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="操作人：" prop="uId" style="margin-right: 5%;">
          <el-input placeholder="" v-model.trim="form.uId" style="width:230px;" maxlength="12" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="渠道：" prop="channelId" style="margin-right: 5%;">
          <el-select  placeholder="请选择" v-model="form.channelId" clearable>
              <el-option
                  v-for="item in channels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：" prop="publishTypeId">
          <el-select  placeholder="请选择" v-model="form.publishTypeId" clearable>
              <el-option
                  v-for="item in channelTypes"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :key="item.name"
                  :label="item.name"
                  :value="item.publishTypeId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：" prop="time">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="mm/dd/yyyy"
            end-placeholder="mm/dd/yyyy">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20 textr">
      <el-button type="success" class="el-icon el-icon-search" @click="search('form')">查找</el-button>
      <el-button type="warning" @click="$router.go(-1)">返回许愿灯列表</el-button>
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
                <span>{{ props.row.receiveLampEndTime }}</span>
              </el-form-item>
              <el-form-item  label="接灯截止时间">
                <span>{{ props.row.lightUpEndTime }}</span>
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
        <el-table-column prop="wishingLampId" label="许愿灯ID" width="165"></el-table-column>
        <el-table-column prop="title" label="许愿灯标题"></el-table-column>
        <el-table-column prop="mId" label="许愿人" width="165"></el-table-column>
        <el-table-column prop="reward" label="赏金"></el-table-column>
        <el-table-column prop="type" :formatter="formatterType" label="许愿范围"></el-table-column>
        <el-table-column prop="channlId" :formatter="formatterChannel" label="渠道" width="50"></el-table-column>
        <el-table-column prop="mutex" :formatter="formatterMutex" label="排他与否" width="80"></el-table-column>
        <el-table-column prop="messenger" :formatter="formatterMessenger" label="是否信使" width="80"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="lastUpdBy" label="操作人"></el-table-column>
        <el-table-column prop="lastUpd" label="操作时间" width="170"></el-table-column>
        <!--<el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="viewLight(scope.$index,scope.row)">恢复许愿灯</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="m20 textc">
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </section>
</template>

<script>
import { delLightList, getPublish, recoverLight } from "@/api/light";
import { parseTime } from "@/utils";
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
      } else if (val === "2") {
      } else {
      }
    },
    channelFilter(val) {},
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
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.form.begindate = this.time[0];
          this.form.enddate = this.time[1];
        }
      } else {
        this.form.begindate = "";
        this.form.enddate = "";
      }
    }
  },
  data() {
    return {
      inputNum: true,
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
      channels: [
        {
          label: "社交",
          value: "1"
        },
        {
          label: "电商",
          value: "2"
        }
      ],
      channelTypes: [],
      lightData: [],
      pageNum: 1,
      pageSize: 10,
      pageTotal: "",
      channelId: "",
      wishingLampId: "",
      mId: "",
      otherReason: ""
    };
  },
  methods: {
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
    formatterType(row, column) {
      if (row.type === "1") {
        return "公开";
      } else if (row.type === "2") {
        return "系统匹配";
      } else {
        return "定向";
      }
    },

    inputNumCheck() {
      let reg = new RegExp(/^[0-9]*$/);
      if (!reg.test(this.form.wishingLampId)) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
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
      delLightList({ pageSize: 10, pageNum: 1 })
        .then(res => {
          this.data = res.data.data;
          this.pageTotal = +res.totalSize;
          getPublish({ channelId: "1" }).then(response => {
            this.channelTypes = response.data.data;
          });
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
        this.$message.warning("ID必须为数字！");
      } else {
        delLightList(this.form)
          .then(res => {
            this.data = res.data.data;
            this.pageTotal = Number(res.totalSize);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    viewLight(index, row) {
      recoverLight({
        wishingLampId: row.wishingLampId,
        channelId: row.channelId,
        mId: row.mId
      }).then(res => {
        this.handleQuery();
      });
    },
    // 分页改变
    pageChange(page) {
      this.pageNum = page;
      this.form.pageNum = page;
      delLightList(this.form)
        .then(res => {
          this.data = res.data.data;
          this.pageTotal = +res.totalSize;
        })
        .catch(error => {
          console.log(error);
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
  text-align: center;
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
