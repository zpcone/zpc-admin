<template>
  <div class="behaviorManage">
    <div class="behaviorManageHead">
      <el-form :inline="true" ref="form" :model="form" label-width="100px">
        <el-form-item label="渠道类型">
          <el-select @change="channelTpyeChange" v-model="form.channelId" clearable placeholder="请选择">
            <el-option label="我茂" value="1"></el-option>
            <el-option label="我鸽" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.channelId" label="一级模块">
          <el-select @change="changeOneClass" clearable v-model="moduleList.one" placeholder="请选择">
            <el-option :label="item.moduleName" :value="item.moduleCode" v-for="(item, index) in oneMoudule" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="moduleList.one" clearable label="二级模块"> -->
        <el-form-item v-if="twoMoudule.length" clearable label="二级模块">
          <el-select clearable @change="changeTwoClass" v-model="moduleList.two" placeholder="请选择">
            <el-option :label="item.moduleName" :value="item.moduleCode" v-for="(item, index) in twoMoudule" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="threeMoudule.length" clearable label="三级模块">
          <el-select clearable v-model="moduleList.three" @change="changeThreeClass" placeholder="请选择">
            <el-option :label="item.moduleName" :value="item.moduleCode" v-for="(item,index) in threeMoudule" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字查询">
          <el-input placeholder="请输入关键字" style="width:200px;" v-model="form.behaviorName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <div class="behaviorManageTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="行为名称"
          prop="behaviorName">
        </el-table-column>
        <el-table-column
          prop="behaviorCode"
          label="行为编码">
        </el-table-column>
        <el-table-column
          prop="moduleName1"
          label="一级模块"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moduleName2"
          label="二级模块"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="moduleName3"
          label="三级模块"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属行为组"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="参数"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
  </div>
  </div>
</template>

<script>
import {
  getOneMoudule,
  getTwoMoudule,
  getThirdMoudule,
  searchBehaviorManage
} from "@/api/label/behaviorStatisticsManage/behaviorManage";
export default {
  components: {},
  props: {},
  data() {
    return {
      totalPage: "", // 总条数
      // middle: '',
      oneMoudule: [], // 一级模块选择内容
      twoMoudule: [], // 二级模块选择内容
      threeMoudule: [], // 三级模块选择内容
      // currentPage: 2,
      moduleList: {
        one: "",
        two: "",
        three: ""
      },
      form: {
        channelId: "",
        behaviorName: "",
        moduleCode: "",
        pageSize: "5", // 页条
        pageNum: "1" // 页数
      },
      tableData: []
    };
  },
  watch: {},
  computed: {
    middle: function() {
      if (this.moduleList.three) {
        return this.moduleList.three;
      } else if (this.moduleList.two) {
        return this.moduleList.two;
      } else if (this.moduleList.one) {
        return this.moduleList.one;
      } else {
        return "";
      }
    }
  },
  methods: {
    channelTpyeChange() {
      (this.moduleList = {
        one: "",
        two: "",
        three: ""
      }),
        this.getOne();
      if (!this.form.channelId) {
        this.moduleCode = "";
        this.moduleList.one = "";
        this.moduleList.two = "";
        this.moduleList.three = "";
        this.oneMoudule = [];
        this.twoMoudule = [];
        this.threeMoudule = [];
      }
    },
    // 选择一级模块
    changeOneClass() {
      this.moduleList.two = "";
      this.moduleList.three = "";
      console.log("一级取值");
      this.getTwo();
      if (!this.moduleList.one) {
        this.moduleList.two = "";
        this.moduleList.three = "";
        this.twoMoudule = [];
        this.threeMoudule = [];
      }
    },
    // 选择二级模块
    changeTwoClass() {
      this.moduleList.three = "";
      console.log("二级取值");
      this.getThree();
      if (!this.moduleList.two) {
        this.threeMoudule = [];
      }
    },

    // 选择三级模块
    changeThreeClass() {
      console.log("三级取值");
      // this.getThree()
      if (!this.moduleList.two) {
        this.threeMoudule = [];
      }
    },
    // 获取一级模块
    getOne() {
      getOneMoudule({ channelId: this.form.channelId })
        .then(res => {
          this.oneMoudule = res.data;
          this.$message.success("获取一级模块成功");
        })
        .catch(() => {
          this.$message.error("获取一级模块失败");
        });
    },
    // 获取二级模块--选择一级模块
    getTwo() {
      getTwoMoudule({
        channelId: this.form.channelId,
        moduleCode: this.moduleList.one
      })
        .then(res => {
          this.twoMoudule = res.data;
          this.$message.success("获取二级模块成功");
        })
        .catch(() => {
          this.$message.error("获取二级模块失败");
        });
    },
    // 获取三级模块--选择二级模块
    getThree() {
      getThirdMoudule({
        channelId: this.form.channelId,
        moduleCode: this.moduleList.two
      })
        .then(res => {
          this.threeMoudule = res.data;
          this.$message.success("获取三级模块成功");
        })
        .catch(() => {
          this.$message.error("获取三级模块失败");
        });
    },
    // 查询获取列表
    getTableList() {
      this.form.moduleCode = this.middle;
      searchBehaviorManage(this.form)
        .then(res => {
          console.log(this.middle);
          this.tableData = res.data;
          this.totalPage = Number(res.totalSize);
          this.$message.success("查询成功");
        })
        .catch(() => {
          this.$message.error("查询失败");
        });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getTableList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.getTableList();
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      console.log("submit!");
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {},
  mounted() {
    this.getTableList();
  }
};
</script>
<style lang="scss" scoped>
.behaviorManage {
  padding: 20px;
  .behaviorManageHead {
    padding-top: 40px;
    height: 200px;
    background: #f2f2f2;
  }
  .line {
    margin-top: 20px;
    border-bottom: 1px dashed #f2f2f2;
  }
  .behaviorManageTable {
    margin-top: 20px;
  }
  .block {
    float: right;
    margin-top: 20px;
  }
}
</style>
