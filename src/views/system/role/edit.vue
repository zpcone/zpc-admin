<template>
  <section>
    <div style="background: #f1f1f1;padding: 10px;text-indent: 2em;">
      <h1 v-if="isEdit == '1'">编辑部门</h1>
      <h1 v-else>编辑角色</h1>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item prop="name" label="角色名称">
          <el-input clearable v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="所属部门">
          <el-input v-model="deptName" @click.native="chooseDept" :disabled="true" placeholder="所属部门"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input clearable v-model="form.remark" placeholder="请填写备注"></el-input>
        </el-form-item>
        <div style="margin-left: 160px;">
          <el-row :gutter="20">
            <el-col :span="6">
              <p>功能权限</p>
              <el-tree :data="dataPower"
               @check-change="handleCheckChangeFundationPower"
                :default-expanded-keys="funCheckedIds"
                :default-checked-keys="funCheckedIds"
                node-key="deptId"
                show-checkbox
                highlight-current
                :props="defaultProps"
                ref="functionTree">
              </el-tree>
            </el-col>
            <el-col :span="6">
              <!-- <p>数据权限</p>
              <el-tree :data="data"
               @check-change="handleCheckChangeNumPower"
                :default-checked-keys="numCheckedIds"
                node-key="deptId"
                show-checkbox
                highlight-current
                :props="defaultProps"
                ref="recordTree">
              </el-tree> -->
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
          <el-button type="success" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="选择所属部门"
      :visible.sync="isShowTree"
      width="30%">
      <div>
        <el-tree
          :data="data"
          :expand-on-click-node="false"
          @node-click="handleCheckChange"
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveShowTree">确 定</el-button>
        <el-button @click="cancelShowTree">取消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
// ========获取部门tree======================== 添加角色==deptid查询所属部门
import { getNowUserToWhereDepart, allMenuList, updateRole, getRoleSingleInfo } from "@/api/system/dept";
// test======获取登录人信息
import { getUserData } from "@/api/login";
export default {
  name: "addSystemAdmin",
  computed: {
    isEdit() {
      if (this.$router.currentRoute.query.isEdit) {
        return "1";
      } else {
        return "0";
      }
    }
  },
  data() {
    return {
      testArr: [1],
      funCheckedIds: [],
      numCheckedIds: [],
      temporaryFunIds: [],
      temporaryNumIds: [],
      deptName: '', // 部门名称
      form: {
        roleId: this.$route.query.id,
        roleName: '', //	角色名称
        remark: '', //	备注
        deptId: '', //	部门编号
        deptName: '', //	部门名称
        menuIdList: [], //	菜单
        deptIdList: [] //	部门
      },
      dataPower: [],
      isShowTree: false,
      functionData: [
        {
          label: "系统管理",
          children: [
            {
              label: "管理员管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "新增"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            },
            {
              label: "部门管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "新增"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            },
            {
              label: "角色管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "新增"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      data: [
        {
          deptId: 0,
          deptName: "复华运营部",
          upDept: "",
          sortNum: "0"
        },
        {
          deptId: 1,
          deptName: "复华技术部",
          upDept: "",
          sortNum: "0",
          children: [
            {
              deptId: 2,
              deptName: "电商部",
              upDept: "复华技术部",
              sortNum: "0"
            },
            {
              deptId: 3,
              deptName: "社交部",
              upDept: "复华技术部",
              sortNum: "0"
            },
            {
              deptId: 4,
              deptName: "引擎部",
              upDept: "复华技术部",
              sortNum: "0"
            }
          ]
        }
      ],
      recordData: [
        {
          label: "复华技术部",
          children: [
            {
              label: "电商部"
            },
            {
              label: "社交部"
            },
            {
              label: "引擎部"
            }
          ]
        }
      ],
      recordProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    getRoleSingleInfoFunc() {
      var _this = this
      var obj = {}
      obj.roleId = _this.$route.query.id
      getRoleSingleInfo(obj)
      .then(res => {
        if (res.status == 200) {
          _this.funCheckedIds = res.data.menuIdList // 功能权限
          _this.numCheckedIds = res.data.deptIdList  // 数据权限
          _this.$message.success('获取所属成功')
        } else {
          _this.$message.warning(res.data.errorMsg)
        }
      })
      .catch(() => {

      })
    },
    // 递归取id
    getMenuIds(item, targetNode) {
      // this.form.menuIdList.push(item.deptId)
      if (item.length > 0) {
        item.forEach(el => {
          targetNode.push(el.deptId)
          if (el.children && el.children.length > 0) {
            this.getMenuIds(el.children, targetNode)
          }
        })
      }
    },
    handleCheckChangeFundationPower(data) {
      console.log(data)
      var index = this.temporaryFunIds.indexOf(data)
      if (index >= 0 ) {
        this.temporaryFunIds.splice(index,1)
      } else {
        this.temporaryFunIds.push(data)
      }
      this.form.menuIdList = []
      this.getMenuIds(this.temporaryFunIds, this.form.menuIdList)
      console.log(data)
      console.log('功能权限')
    },
    handleCheckChangeNumPower(data) {
      console.log(data)
      var index = this.temporaryNumIds.indexOf(data)
      if (index >= 0 ) {
        this.temporaryNumIds.splice(index,1)
      } else {
        this.temporaryNumIds.push(data)
      }
      this.form.deptIdList = []
      this.getMenuIds(this.temporaryNumIds, this.form.deptIdList)
      console.log('数据权限')
    },
    doGetRole() {
      var _this = this
      updateRole(_this.form)
      .then(res => {
        if (res.data.code == 200) {
          _this.$message.success("成功创建角色")
          _this.$destroy()
          _this.$router.go(-1);
        } else {
          _this.$message.info(res.data.errorMsg)
        }
      })
      .catch(() => {
        _this.$message.error("创建角色失败");
      })
    },
    handleCheckChange(data) {
      this.form.deptName = data.deptName
      this.form.deptId = data.deptId
      console.log(data)
    },
    getPowerTree(treeDatarop) {
      var start = new Date().getTime(); //起始时间
      //准备数据
      let testData = {
        // department: [
        //   {
        //     departmentName: "测试1",
        //     departmentDesc: "盛达康网络",
        //     parentId: "",
        //     id: "594a28fb1c8652a01f0301"
        //   }
        // ]
      };
      var data = treeDatarop; // 数组
      let treedata = []; // 建空数组
      //查找最顶层-------一级部门
      let len = data.length;
      for (let j = 0; j < len; j++) {
        // data[j].expand = false
        data[j].label = data[j].name;
        data[j].upMenu = data[j].parentName;
        data[j].deptId = data[j].menuId;
        if (data[j].parentId == "0") {
          treedata.push({
            expand: true,
            label: data[j].name,
            upMenu: data[j].parentName,
            deptId: data[j].menuId
          });
        }
      }
      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];
      for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
          treedataLev: sonsTree(data, treedata[h].deptId)
        });
      }
      for (let p = 0, lq = treedataLevs.length; p < lq; p++) {
        var treedataLev = treedataLevs[p].treedataLev;
        //找到最高层的lev
        var maxLev = 0;
        for (let i = 0, lt = treedataLev.length; i < lt; i++) {
          if (parseInt(treedataLev[i].lev) > maxLev) {
            maxLev = parseInt(treedataLev[i].lev);
          } else {
            maxLev = maxLev;
          }
        }
        //比较当前层和上一层的数据，然后做处理
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];
        if(maxLev == 0) {
          maxLevTreePrev = getLevArr(treedataLev, needLev)
          console.log(maxLevTreePrev)
        } else {
          for (let m = 0; m < maxLev; m++) {
            maxLevTree = getLevArr(treedataLev, needLev);
            maxLevTreePrev = getLevArr(treedataLev, needLev - 1);
            for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
              maxLevTreePrev[j].children = new Array();
              for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
                if (maxLevTree[i].parentId == maxLevTreePrev[j].deptId) {
                  maxLevTreePrev[j].children.push(maxLevTree[i]);
                }
              }
            }
            needLev--;
          }
        }
        treedata[p].children = maxLevTreePrev;
      }
      this.baseData = treedata;
      //找出同一级的数据
      function getLevArr(arr, lev) {
        var newarr = [];
        for (let i = 0, la = arr.length; i < la; i++) {
          //这里对arr 的children 做处理
          arr.children = new Array();
          if (parseInt(arr[i].lev) == lev) {
            newarr.push(arr[i]);
          }
        }
        return newarr;
      }
      //给每个数据添加一个lev
      function sonsTree(arr, deptId) {
        var temp = [],
          lev = 0;
        var forFn = function(arr, deptId, lev) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.parentId == deptId) {
              item.lev = lev;
              temp.push(item);
              forFn(arr, item.deptId, lev + 1);
            }
          }
        };
        forFn(arr, deptId, lev);
        return temp;
      }
      var end = new Date().getTime(); //结束时间
      this.dataPower = treedata;
      // console.log(this.dataApply);
      // this.$store.commit("setGetTreeDataMenu", this.dataApply);
      // console.log(this.$store.state.getTreeDataMenu);
      // this.$store.state.getTreeData
      console.log("Tree初始化的时间是" + (end - start) + "ms"); //返回函数执行需要时间
    },
    // 获取功能权限的tree列表
    getMenuList() {
      allMenuList({})
        .then(res => {
          this.getPowerTree(res.data);
          this.$message.success("获取列表成功");
        })
        .catch(() => {
          this.$message.error("获取列表失败");
        });
    },
    getDataInfo() {
      getUserData({})
        .then(res => {
          // localStorage.setItem('menu', JSON.stringify(res.data))
          this.$message.success("成功获取用户信息");
          console.log(res);
        })
        .catch(() => {
          this.$message.error("获取用户信息失败");
        });
    },
    cancelShowTree() {
      this.isShowTree = false;
    },
    saveShowTree() {
      this.deptName = this.form.deptName
      this.isShowTree = false;
    },
    getAllDepartment() {
      var obj = {};
      obj.userId = localStorage.getItem("userInfo");
      getNowUserToWhereDepart(obj)
        .then(res => {
          this.treeDate = res.data;
          this.getTree();
        })
        .catch(() => {
          this.$message.error("获取部门列表失败");
        });
    },
    chooseDept() {
      console.log("ghjkdfhgkj");
      this.isShowTree = true;
    },
    chooseDone(data) {
      this.form.deptName = data.label;
      this.isShowTree = false;
    },
    chooseCancel(data) {
      this.$message.warning("取消了选择");
      this.isShowTree = false;
    },
    back() {
      this.$destroy()
      // this.getRoleSingleInfoFunc()
      this.$router.go(-1);
    },
    confirm() {
      if (!this.form.deptName) {
        this.$message.warning('所属部门不能为空')
        return
      } else if (!this.form.roleName) {
        this.$message.warning('角色名称不能为空')
        return
      }
      this.doGetRole()
    },
    getTree() {
      var start = new Date().getTime(); //起始时间
      //准备数据
      let testData = {
        department: [
          {
            departmentName: "测试1",
            departmentDesc: "盛达康网络",
            parentId: "",
            id: "594a28fb1c8652a01f0301"
          }
        ]
      };
      var data = this.treeDate; // 数组
      let treedata = []; // 建空数组
      //查找最顶层-------一级部门
      let len = data.length;
      for (let j = 0; j < len; j++) {
        // data[j].expand = false
        data[j].deptName = data[j].name;
        data[j].label = data[j].name;
        if (data[j].parentId == "-1") {
          treedata.push({
            expand: true,
            deptName: data[j].name,
            label: data[j].name,
            deptId: data[j].deptId
          });
        }
      }
      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];
      for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
          treedataLev: sonsTree(data, treedata[h].deptId)
        });
      }
      console.log(treedataLevs);
      for (let p = 0, lq = treedataLevs.length; p < lq; p++) {
        var treedataLev = treedataLevs[p].treedataLev;
        //找到最高层的lev
        var maxLev = 0;
        for (let i = 0, lt = treedataLev.length; i < lt; i++) {
          if (parseInt(treedataLev[i].lev) > maxLev) {
            maxLev = parseInt(treedataLev[i].lev);
          } else {
            maxLev = maxLev;
          }
        }
        //比较当前层和上一层的数据，然后做处理
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];
        for (let m = 0; m < maxLev; m++) {
          maxLevTree = getLevArr(treedataLev, needLev);
          maxLevTreePrev = getLevArr(treedataLev, needLev - 1);
          for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
            maxLevTreePrev[j].children = new Array();
            for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
              if (maxLevTree[i].parentId == maxLevTreePrev[j].deptId) {
                maxLevTreePrev[j].children.push(maxLevTree[i]);
              }
            }
          }
          needLev--;
        }
        treedata[p].children = maxLevTreePrev;
      }
      this.baseData = treedata;
      //找出同一级的数据
      function getLevArr(arr, lev) {
        var newarr = [];
        for (let i = 0, la = arr.length; i < la; i++) {
          //这里对arr 的children 做处理
          arr.children = new Array();
          if (parseInt(arr[i].lev) == lev) {
            newarr.push(arr[i]);
          }
        }
        return newarr;
      }
      //给每个数据添加一个lev
      function sonsTree(arr, deptId) {
        var temp = [],
          lev = 0;
        var forFn = function(arr, deptId, lev) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.parentId == deptId) {
              item.lev = lev;
              temp.push(item);
              forFn(arr, item.deptId, lev + 1);
            }
          }
        };
        forFn(arr, deptId, lev);
        return temp;
      }
      var end = new Date().getTime(); //结束时间
      this.data = treedata;
      console.log(this.data);
      // this.$store.commit('setGetTreeData', this.data)
      // console.log(this.$store.state.getTreeData)
      console.log("Tree初始化的时间是" + (end - start) + "ms"); //返回函数执行需要时间
    }
  },
  created () {
    this.getRoleSingleInfoFunc()
  },
  mounted() {
    this.deptName = this.form.deptName = this.$route.query.deptName
    this.form.roleName = this.$route.query.roleName
    this.form.deptId = this.$route.query.id
    this.form.remark = this.$route.query.remark
    this.getMenuList();
    this.getDataInfo();
    this.getAllDepartment();
  }
};
</script>

<style scoped lang="scss">
.el-input {
  width: 500px;
}
.el-tree {
  min-height: 200px;
  margin-bottom: 40px;
}
</style>
