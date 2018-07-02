<template>
  <section>
    <div class="m20">
      <div style="display: inline-block;float: right;">
      	<el-button type="info" @click="back">返回</el-button>
      </div>
      <h1>{{personTitle }}明细</h1>
      <el-row :gutter="20">
        <el-col :span="8">
          <p>许愿灯ID：{{wishingLampId}}</p>
        </el-col>
        <el-col :span="8">
          <p>许愿灯当前状态：{{wishingLampStatus | statusFilter}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="m20">
      <el-table :data="data" border style="width: 100%">
      	<el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column :prop="personProp" :label="personTitle"></el-table-column>
        <el-table-column :prop="timeProp" label="时间"></el-table-column>
      </el-table>
    </div>
    <!--<div class="m20 center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNumber"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>-->
  </section>
</template>

<script>
import {
  receiveLighterList,
  messagerList,
  circleReceiveLightList,
  crowdReceiveLight
} from "@/api/light";
export default {
  data() {
    return {
      data: [],
      pageNumber: 1,
      pageSize: 10,
      total: 20,
      personProp: "test",
      timeProp: "circleReceiveLighterTime"
    };
  },
  filters: {
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
    }
  },
  computed: {
    wishingLampId() {
      let wishingLampId = this.$router.currentRoute.query.wishingLampId;
      if (wishingLampId) {
        return wishingLampId;
      }
    },
    channelId() {
      let channelId = this.$router.currentRoute.query.channelId;
      if (channelId) {
        return channelId;
      }
    },
    wishingLampStatus() {
      let wishingLampStatus = this.$router.currentRoute.query.wishingLampStatus;
      if (wishingLampStatus) {
        return wishingLampStatus;
      }
    },
    personTitle() {
      let title = this.$router.currentRoute.query.type;
      if (title) {
        return title;
      } else {
        return "接灯人";
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleQuery() {
      if (this.personTitle == "接灯人") {
        this.personProp = "lightReceiveId";
        this.timeProp = "lightReceiveTime";
        receiveLighterList({
          channelId: this.channelId,
          wishingLampId: this.wishingLampId,
          pageNum: this.pageNumber,
          pageSize: this.pageSize
        }).then(res => {
          console.log(res);
          if (res.data) {
            this.data = res.data.data;
          }
        });
      } else if (this.personTitle == "信使") {
        this.timeProp = "createTime";
        this.personProp = "messengerId";
        messagerList({
          channelId: this.channelId,
          wishingLampId: this.wishingLampId,
          pageNum: this.pageNumber,
          pageSize: this.pageSize
        }).then(res => {
          console.log(res);
          if (res.data) {
            this.data = res.data.data;
          }
        });
      } else if (this.personTitle == "接灯圈") {
        this.timeProp = "circleReceiveLighterTime";
        this.personProp = "receiveLightCircleId";
        circleReceiveLightList({
          channelId: this.channelId,
          wishingLampId: this.wishingLampId,
          pageNum: this.pageNumber,
          pageSize: this.pageSize
        }).then(res => {
          console.log(res);
          if (res.data) {
            this.data = res.data.data;
          }
        });
      } else if (this.personTitle == "接灯群") {
        this.timeProp = "crowdReceiveLighterTime";
        this.personProp = "receiveLightCrowdId";
        crowdReceiveLight({
          channelId: this.channelId,
          wishingLampId: this.wishingLampId,
          pageNum: this.pageNumber,
          pageSize: this.pageSize
        }).then(res => {
          console.log(res);
          if (res.data) {
            this.data = res.data.data;
          }
        });
      }
    }
  },
  mounted() {
    this.handleQuery();
  }
};
</script>

<style scoped lang="scss">
.m20 {
  margin: 20px;
}
.center {
  text-align: center;
}
</style>
