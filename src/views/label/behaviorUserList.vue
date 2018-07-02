<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <el-form-item label="渠道类型：" prop="channel">
					<el-select placeholder="请选择" v-model="form.channel" @change="channelChange" clearable>
						<el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
        </el-form-item>
        <el-form-item label="用户年龄：" prop="age">
          <el-input v-model.trim="form.age" placeholder="请输入年龄" v-on:input="inputNumCheck2" maxlength="3" clearable></el-input>
          <!-- <el-input-number style="width:150px;" size="medium" v-model="form.minAge"></el-input-number>
          <span>——</span>
          <el-input-number size="medium" style="width:150px;" v-model="form.maxAge"></el-input-number> -->
        </el-form-item>
        <el-form-item label="用户行业：" prop="industry">
          <el-input v-model.trim="form.industry" placeholder="请输入用户行业" maxlength="15" clearable style="width:260px;"></el-input>
        </el-form-item> <br>
        <el-form-item label="用户ID：" prop="mid">
          <el-input v-model.trim="form.mid" placeholder="请输入用户ID" style="width:200px;" v-on:input="inputNumCheck2" maxlength="19" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户性别：" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择" clearable>
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户职业：" prop="occupation">
          <el-input v-model.trim="form.occupation" placeholder="请输入用户职业" maxlength="15" clearable style="width:260px;"></el-input>
        </el-form-item> <br>
        <el-form-item label="手机号：" prop="phone">
          <el-input class="inputWidth" v-model.trim="form.phone" v-on:input="inputNumCheck1" maxlength="11" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="教育水平：" prop="education">
          <el-input class="inputWidth" v-model.trim="form.education" placeholder="请输入教育水平" maxlength="6" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录用户名：" prop="loginName">
          <el-input class="inputWidth" v-model.trim="form.loginName" placeholder="请输入登录用户名" maxlength="15" clearable style="width:260px;"></el-input>
        </el-form-item><br>
        <el-form-item label="当前所在地：" prop="regionName">
          <el-input placeholder="请输入当前所在地" class="inputWidth" maxlength="6" v-model.trim="form.regionName"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：" prop="nickName">
          <el-input placeholder="请输入用户昵称" class="inputWidth" v-model.trim="form.nickName" maxlength="15" clearable style="width:260px;"></el-input>
        </el-form-item></br>
        <!--<el-form-item label="圈内角色">
          <el-input placeholder="请输入圈内角色" class="inputWidth" v-model="form.circleRole"></el-input>
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
        <!--<div style="margin:10px 0;border-bottom:1px dashed gray;"></div>-->
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
        </el-form-item></br>
        <el-form-item style="margin-left:20%;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button style="margin-left:50px;" type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrapperBody">
      <el-table ref="multipleTable" :data="tableData" stripe border ooltip-effect="dark" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="行为名称"  prop="actionName"></el-table-column>
        <el-table-column prop="actionCode"  label="行为编码"></el-table-column>
        <el-table-column prop="mid"  label="用户ID"></el-table-column>
        <el-table-column prop="nickName"  label="用户名称"></el-table-column>
        <el-table-column prop="sex" :formatter="sexFormatter" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="regionName"  label="当前所在地"></el-table-column>
        <el-table-column prop="countAll"  label="总次数"></el-table-column>
        <el-table-column prop="countDayAvg"  label="日均次数"></el-table-column>
        <!-- <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <br/>
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
    <!-- <div class="btn">
      <el-button type="primary" disabled>查看共同标签</el-button>
      <el-button type="primary" disabled>查看共性分布图</el-button>
    </div> -->

  </div>
</template>

<script>
import {
  listActionUserStatistics,
  getAllModuleLabels //1-3级模块渲染
} from "@/api/label/behaviorStatisticsManage/userBehavior";
export default {
  data() {
    return {
      channelOptions: [
        {
          value: "1",
          label: "我茂"
        },
        {
          value: "2",
          label: "我鸽"
        }
      ],
      options1: [
        {
          moduleCode: "",
          moduleName: ""
        }
      ],
      options2: [
        {
          moduleCode: "",
          moduleName: ""
        }
      ],
      options3: [
        {
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
        mid: "",
        channel: "",
        loginName: "", // 登录用户名
        nickName: "", // 用户昵称
        age: "",
        sex: "",
        phone: "",
        regionName: "", //所在地区
        industry: "", // 用户行业
        occupation: "", // 用户职业
        education: "", // 教育水平
        moduleCode1: "", //一级模块
        moduleCode2: "", //二级模块
        moduleCode3: "", //三级模块
        actionCode: "", // 行为代码
        pageNum: "1",
        pageSize: "10"
      },
      totalSize: "",
      currentPage: "",
      tableData: [],
      multipleSelection: [],
      showTwo: false,
      showThree: false,
      showFor: false,
      inputNum: true,
      inputNumId: true
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
    inputNumCheck1() {
      let reg = new RegExp(11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/);
      if (!reg.test(this.form.phone)) {
        this.inputNum = false;
      } else {
        this.inputNum = true;
      }
    },
    inputNumCheck2() {
      let reg = new RegExp(/^[0-9]*$/);
      if (!reg.test(this.form.mid) || !reg.test(this.form.age)) {
        this.inputNumId = false;
      } else {
        this.inputNumId = true;
      }
    },
    handelQuery() {
      let query = this.$router.currentRoute.query;
      if (query.actionCode && query.channel) {
        this.form.channel = query.channel + "";
        this.form.actionCode = query.actionCode;
        this.showFor = true;
        this.onSubmit();
      } else if (!query.actionCode && !query.channel) {
        this.onSubmit();
      }
    },

    // 性别
    sexFormatter(row) {
      if (row.sex === "0") {
        return "男";
      } else if (row.sex === "1") {
        return "女";
      }
    },
    // 获取列表
    conditionList() {
      listActionUserStatistics(this.form).then(res => {
        if (res.status === 200) {
          //        this.tableData = res.data.list
          //        this.total = res.data.total
        }
      });
    },
    // 查询
    onSubmit() {
      if (this.inputNum == false) {
        this.$message.warning("请输入正确的手机号");
      } else if (this.inputNumId == false) {
        this.$message.warning("年龄和ID必须为数字");
      } else {
        listActionUserStatistics(this.form).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.totalSize = Number(res.data.total);
          }
        });
      }
    },
    // 重置
    reset() {
      this.form.channel = ""; //渠道类型
      this.form.mid = ""; //用户ID
      this.form.moduleCode1 = ""; //一级模块
      this.form.moduleCode2 = ""; //二级模块
      this.form.moduleCode3 = ""; //三级模块
      this.form.actionCode = ""; //行为代码
      this.form.loginName = ""; //登录名
      this.form.nickName = ""; //用户昵称
      this.form.age = "";
      this.form.sex = "";
      this.form.phone = "";
      this.form.regionName = ""; //所在地区
      this.form.industry = ""; //用户行业
      this.form.occupation = ""; //用户职业
      this.form.education = ""; //教育水平
      this.showTwo = false;
      this.showThree = false;
      this.showFor = false;
      this.inputNum = true;
      this.inputNumId = true;
    },

    moduleChangeOne(val) {
      console.log(val);
      let parentCode = val + "";
      getAllModuleLabels({ channel:this.form.channel,parentCode: parentCode }).then(res => {
        if (res.status == "200") {
          this.options2 = res.data.modules;
          this.showTwo = true;
        } else {
          this.$message.warning(res.errorMsg);
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
        } else {
          this.$message.warning(res.errorMsg);
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.form.pageNum = val + "";
      this.onSubmit();
    }
    // 详情
    // handleClick() {
    //   this.$router.push(`/label/peopleManage/userDetail/${row.mId}/${row.channelId}`)
    // }
  },
  mounted() {
    //  this.conditionList()
    this.handelQuery();
  }
};
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  text-align: center;
}
.pagination {
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
    height: 450px;
    background: #f2f2f2;
  }
  .line {
    margin-top: 20px;
    border-bottom: 1px dashed gray;
  }
  .wrapperBody {
    margin-top: 20px;
  }
  // .page {
  //   float: right;
  //   margin-top: 20px;
  // }
}
</style>
