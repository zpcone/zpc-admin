<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="所属平台：" prop="channel">
          <el-select v-model="form.channel" placeholder="请选择" @change="channelChange" clearable>
            <el-option label="我茂" value="1"></el-option>
            <el-option label="我鸽" value="2"></el-option>
          </el-select>
        </el-form-item>
			  <el-form-item class="block" label="查询时间：" prop="time">
			    <el-date-picker
			      v-model="time"
			      type="daterange"
			      value-format="yyyy-MM-dd"
			      @change="timeChange"
			      :picker-options="pickerOptions2"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right">
			    </el-date-picker>
			  </el-form-item> <br>
        <!-- <el-form-item label="行为组名称:">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> <br> -->
        <el-form-item label="一级模块：" prop="moduleCode1" v-if="form.channel">
          <el-select v-model="form.moduleCode1" placeholder="请选择" @change="moduleChangeOne" clearable>
              <el-option
                v-for="item in options1"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级模块：" prop="moduleCode2" v-if="showTwo">
          <el-select v-model="form.moduleCode2" placeholder="请选择" @change="moduleChangeTwo" clearable>
              <el-option
                v-for="item in options2"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级模块：" prop="moduleCode3" v-if="showThree">
          <el-select v-model="form.moduleCode3" placeholder="请选择" clearable>
              <el-option
                v-for="item in options3"
                :key="item.moduleCode"
                :label="item.moduleName"
                :value="item.moduleCode">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行为名称：" prop="actionCode" v-if="showFor">
          <el-select v-model="form.actionCode" placeholder="请选择" @change="nameCahnge" style="width:350px;" clearable>
              <el-option
                v-for="item in options4"
                :key="item.actionCode"
                :label="item.actionName"
                :value="item.actionCode">
              </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="关键字查询：" prop="keyWord">
          <el-input class="inputWidth" v-model="form.keyWord" placeholder="输入行为组/行为名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 50px;">查询</el-button>
          <el-button @click="reset" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <!--<el-button  type="primary" style="margin:20px 0 0 0;">查看行为用户</el-button>-->
    <div style="margin-bottom: 50px;">
    	<el-button type="info" style="float:left;margin-left:48%;margin-top: 10px;" @click="viewUser">查看行为用户</el-button>
    </div>
    <div class="wrapperBody">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane label="行为组" name="first">
          <el-table
            :data="tableData6"
            border
            show-summary
            style="width: 100%">
            <el-table-column
              prop="id"
              label="渠道类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="行为名称">
            </el-table-column>
            <el-table-column
              prop="amount1"
              label="行为编码">
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="总次数">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="日均次数">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="单日最高次数">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="总金额">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="日均金额">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="单日最高金额">
            </el-table-column>
            <el-table-column
              prop="amount3"
              label="单次最高金额">
            </el-table-column>
          </el-table>
        </el-tab-pane> -->
        <el-tab-pane label="行为" name="second">
          <el-table ref="multipleTable" :data="statisticsData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="行为名称"  prop="actionName"></el-table-column>
            <el-table-column prop="actionCode" label="行为编码"></el-table-column>
            <el-table-column prop="hitALL" label="总次数"></el-table-column>
            <el-table-column prop="visitorAll"  label="总人数"></el-table-column>
            <el-table-column prop="hitDayAvg"  label="日均次数"></el-table-column>
            <el-table-column prop="visitorDayAvg"  label="人均次数"></el-table-column>
            <el-table-column prop="hitDayMax"  label="单日最高次数"></el-table-column>
            <!-- <el-table-column  prop="name"  label="总金额"></el-table-column>
            <el-table-column  prop="name"  label="日均金额"></el-table-column>
            <el-table-column  prop="name"  label="人均金额"></el-table-column>
            <el-table-column  prop="name"  label="单日最高金额"></el-table-column>
            <el-table-column  prop="name"  label="单次最高金额"></el-table-column> -->
            <!-- <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="m20 center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNum"
        :page-size="form.pageSize"
        layout="total, prev, pager, next,jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  listPlatformActionStatistics,
  getAllModuleLabels
} from "@/api/label/behaviorStatisticsManage/userBehavior";
export default {
  data() {
    return {
      options1: [
        {
          parentCode: "",
          moduleCode: "",
          moduleName: ""
        }
      ],
      options2: [
        {
          parentCode: "",
          moduleCode: "",
          moduleName: ""
        }
      ],
      options3: [
        {
          parentCode: "",
          moduleCode: "",
          moduleName: ""
        }
      ],
      options4: [
        {
          actionCode: "",
          actionName: ""
        }
      ],
      form: {
        channel: "",
        beginDate: "",
        endDate: "",
        moduleCode1: "",
        moduleCode2: "",
        moduleCode3: "",
        actionCode: "",
        keyWord: "",
        pageNum: "1",
        pageSize: "10"
      },
      activeName: "second",
      statisticsData: [], //行为数组
      totalSize: "",
      currentPage: 1,
      selections: "",
      time: [],
      showTwo: false,
      showThree: false,
      showFor: false
    };
  },
  methods: {
		channelChange(val) {
			this.form.channel = val + ''
			if(!val){
		      this.form.moduleCode1 = ""; //一级模块
		      this.form.moduleCode2 = ""; //二级模块
		      this.form.moduleCode3 = ""; //三级模块
		      this.form.actionCode = ""; //行为代码		
		      this.showTwo = false
		      this.showThree = false
		      this.showFor = false
			}else{
					this.form.moduleCode1 = ""; //一级模块
		      this.form.moduleCode2 = ""; //二级模块
		      this.form.moduleCode3 = ""; //三级模块
		      this.form.actionCode = ""; //行为代码			
		      this.showTwo = false
		      this.showThree = false
		      this.showFor = false
		      getAllModuleLabels({ channel:this.form.channel,parentCode: "" }).then(res => {
		        if (res.status == "200") {
		          this.options1 = res.data.modules;
		        } else {
		          this.$message.warning(res.errorMsg);
		        }
		      });				
			}
		},
    //格式化时间  2018.6.21  xiu
    timeChange(data) {
      if (data) {
        this.form.beginDate = data[0];
        this.form.endDate = data[1];
      } else {
        this.form.beginDate = "";
        this.form.endDate = "";
      }
    },

    //分页处理  2018.6.21  xiu
    handleCurrentChange(val) {
      this.form.pageNum = val + "";
      this.onSubmit();
    },

    //查询按钮   2018.6.21  xiu
    onSubmit() {
      listPlatformActionStatistics(this.form).then(res => {
        if (res.status === 200) {
          this.statisticsData = res.data.list;
          this.totalSize = Number(res.data.total);
        }
      });
    },

    //列表勾选  2018.6.21  xiu
    handleSelectionChange(val) {
      this.selections = val;
    },

    //查看行为用户按钮  2018.6.21  xiu
    viewUser() {
      if (this.selections.length == 0 || this.selections.length > 1) {
        this.$message.warning("请勾选数据，只能选一项！");
      } else {
        let channel = "";
        let actionCode = "";
        for (let i = 0; i < this.selections.length; i++) {
          channel = this.selections[i].channel;
          actionCode = this.selections[i].actionCode;
        }
        this.$router.push({
          path: "/label/behaviorStatisticsManage/behaviorUserList",
          query: {
            channel: channel,
            actionCode: actionCode
          }
        });
      }
    },

    //重置
    reset() {
      this.form.channel = ""; //渠道类型
      this.form.beginDate = ""; //开始时间
      this.form.endDate = ""; //结束时间
      this.time = [];
      this.form.moduleCode1 = ""; //一级模块
      this.form.moduleCode2 = ""; //二级模块
      this.form.moduleCode3 = ""; //三级模块
      this.form.actionCode = ""; //行为名称
      this.form.keyWord = ""; //关键字查询
      this.showTwo = false;
      this.showThree = false;
      this.showFor = false;
    },

    conditionList() {
      listPlatformActionStatistics(this.form).then(res => {
        if (res.status === 200) {
          this.statisticsData = res.data.list;
          this.totalSize = Number(res.data.total);
        }
      });
    },

    moduleChangeOne(val) {
      console.log(val);
      let parentCode = val + "";
      getAllModuleLabels({ channel:this.form.channel,parentCode: parentCode }).then(res => {
        if (res.status == "200") {
          this.options2 = res.data.modules;
          this.showTwo = true;
        }
      });
    },

    moduleChangeTwo(val) {
      console.log(val);
      let parentCode = val + "";
      getAllModuleLabels({ channel:this.form.channel,parentCode: parentCode }).then(res => {
        if (res.status == "200") {
          if (res.data.modules.length) {
            this.options3 = res.data.modules;
            this.showThree = true;
          }
          if (res.data.behaviors.length) {
            this.options4 = res.data.behaviors;
            this.showFor = true;
          }
        }
      });
    }
  },
  mounted() {
    this.conditionList();
  }
};
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  text-align: center;
}
.selectWidth {
  width: 185px;
}
.inputWidth {
  width: 200px;
}
.wrapper {
  padding: 20px;
  .wrapperHead {
    padding-top: 20px;
    border-radius: 5px;
    height: 200px;
    background: #f2f2f2;
  }
  .line {
    margin-top: 20px;
    border-bottom: 1px dashed gray;
  }
  .wrapperBody {
    margin-top: 20px;
  }
  .page {
    float: right;
    margin-top: 20px;
  }
}
</style>
