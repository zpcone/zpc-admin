<template>
  <section>
    <div class="m20">
      <!-- <a href="http://test.foriseland.com:8080/fwas-security-admin/sys/menu/list">test</a> -->
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="edit">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteMenu">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <tree-table :data="dataApply" :columns="columns" border :showSelection="showSelection" @selectionChange="selectionChange"></tree-table>
    </div>
  </section>
</template>

<script>
import treeTable from "@/components/TreeTable"
// =======所有菜单列表==菜单信息==保存菜单==更新菜单   ===删除菜单===
import {
  allMenuList,
  menuInfo,
  saveMenu,
  updateMenu,
  deleteMenu
} from "@/api/system/dept";
export default {
  name: "treeTablemenu",
  components: { treeTable },
  data() {
    return {
      form: {},
      getCheck: [], // 勾选项
      addForm: {
        type: "", //	菜单类型
        name: "", //	菜单名称
        parentId: "", //	父级菜单
        url: "", //	菜单url
        perms: "", //	授权标识
        orderNum: "", //	排序
        icon: "" //	图标
      },
      editForm: {
        menuId: "", //	菜单id
        type: "", //	菜单类型
        name: "", //	菜单名称
        parentId: "", //	父级菜单
        url: "", //	菜单url
        perms: "", //	授权标识
        orderNum: "", //	排序
        icon: "" //	图标
      },
      showSelection: true,
      columns: [
        {
          text: "菜单名称",
          value: "menuName"
        },
        {
          text: "菜单ID",
          value: "menuId"
        },
        {
          text: "上级菜单",
          value: "upMenu"
        },
        {
          text: "菜单标识",
          value: "icon"
        },
        {
          text: "类型",
          value: "type"
        },
        {
          text: "排序号",
          value: "orderNum"
        },
        {
          text: "菜单URL",
          value: "url"
        },
        {
          text: "授权标识",
          value: "perms"
        }
      ],
      dataApply: [
        {
          menuId: 0,
          menuName: "渠道管理",
          upMenu: "",
          sortNum: "0",
          icon: "",
          type: "",
          menuUrl: "",
          flag: ""
        },
        {
          menuId: 1,
          menuName: "系统管理",
          upMenu: "",
          sortNum: "0",
          icon: "",
          type: "",
          menuUrl: "",
          flag: "",
          children: [
            {
              menuId: 2,
              menuName: "管理员管理",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            },
            {
              menuId: 3,
              menuName: "部门管理",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            },
            {
              menuId: 4,
              menuName: "角色管理",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            },
            {
              menuId: 5,
              menuName: "菜单管理",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            },
            {
              menuId: 6,
              menuName: "SQL监控",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            },
            {
              menuId: 7,
              menuName: "系统日志",
              upMenu: "系统管理",
              sortNum: "0",
              icon: "",
              type: "",
              menuUrl: "",
              flag: ""
            }
          ]
        }
      ],
      currentPath: this.$router.currentRoute.path
    };
  },
  methods: {
    getTree(treeDatarop) {
      var start = new Date().getTime(); //起始时间
      //准备数据
      // let testData = {
      //   department: [
      //     {
      //       departmentName: "测试1",
      //       departmentDesc: "盛达康网络",
      //       parentId: "",
      //       id: "594a28fb1c8652a01f0301"
      //     }
      //   ]
      // };
      var data = treeDatarop; // 数组
      let treedata = []; // 建空数组
      //查找最顶层-------一级部门
      let len = data.length;
      for (let j = 0; j < len; j++) {
        // data[j].expand = false
        data[j].menuName = data[j].name;
        if (data[j].parentName) {
          data[j].upMenu = data[j].parentName;
        } else {
          data[j].upMenu = '';
        }
        // data[j].menuId = data[j].menuId;
        if (data[j].parentId == "0") {
          treedata.push({
            expand: true,
            menuName: data[j].name,
            upMenu: data[j].parentName,
            menuId: data[j].menuId,
            parentId: data[j].parentId
          });
        }
      }
      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];
      for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
          treedataLev: sonsTree(data, treedata[h].menuId)
        });
      }
      console.log(treedataLevs)
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
        // var needLev = maxLev;
        var needLev = maxLev;
        var maxLevTree = [];
        var maxLevTreePrev = [];
        if(maxLev == 0){
            maxLevTreePrev = getLevArr(treedataLev, needLev);
            console.log(maxLevTreePrev)
        }else{
              for (let m = 0; m < maxLev; m++) {
            maxLevTree = getLevArr(treedataLev, needLev);
            maxLevTreePrev = getLevArr(treedataLev, needLev - 1);
            for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
              maxLevTreePrev[j].children = new Array();
              for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
                if (maxLevTree[i].parentId == maxLevTreePrev[j].menuId) {
                  maxLevTreePrev[j].children.push(maxLevTree[i]);
                }
              }
            }
            needLev--;
          }
        }

        treedata[p].children = maxLevTreePrev;
      }
      // this.baseData = treedata;
      //找出同一级的数据
      function getLevArr(arr, lev) {
        var newarr = [];
        for (let i = 0, la = arr.length; i < la; i++) {
          //这里对arr 的children 做处理
          arr.children = new Array()
          if (parseInt(arr[i].lev) == lev) {
            newarr.push(arr[i])
          }
        }
        return newarr;
      }
      //给每个数据添加一个lev
      function sonsTree(arr, menuId) {
        var temp = [],
          lev = 0;
        var forFn = function(arr, menuId, lev) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.parentId == menuId) {
              item.lev = lev;
              temp.push(item);
              forFn(arr, item.menuId, lev + 1);
            }
          }
        };
        forFn(arr, menuId, lev);
        return temp;
      }
      var end = new Date().getTime(); //结束时间
      this.dataApply = treedata;
      console.log(this.dataApply);
      this.$store.commit("setGetTreeDataMenu", this.dataApply);
      console.log(this.$store.state.getTreeDataMenu);
      // this.$store.state.getTreeData
      console.log("Tree初始化的时间是" + (end - start) + "ms"); //返回函数执行需要时间
    },
    // 获取菜单列表
    getMenuList() {
      allMenuList({})
        .then(res => {
          this.getTree(res.data)
          // console.log(res.data)
          this.$message.success("获取列表成功")
        })
        .catch(() => {
          this.$message.error("获取列表失败")
        });
    },
    // 新增菜单
    addMenu() {
      this.getMenuList();
    },
    // 更新菜单
    edit() {
      if (this.getCheck.length == 1) {
        this.$store.commit("setGetUpdataMenu", this.getCheck);
        // console.log(this.$store.state.getUpdataMenu)
        this.$router.push(this.currentPath + "/edit");
      } else if (this.getCheck.length == 0) {
        this.$message.warning("请选择勾选项。");
      } else {
        this.$message.warning("每次只能修改一项。");
      }
    },
    selectionChange(arr) {
      this.getCheck = arr;
      console.log(this.getCheck.length);
    },
    add() {
      this.$router.push(this.currentPath + "/add");
    },
    // 调用删除的接口
    deleteCheckedMenu() {
      var obj = {};
      obj.menuId = [this.getCheck[0].deptId];
      deleteMenu(obj.menuId)
        .then(res => {
          if (res.data.code == 500) {
            this.$message.error(res.data.errorMsg);
          } else {
            this.$message.success("删除成功");
            this.getMenuList();
          }
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    deleteMenu() {
      if (this.getCheck.length == 1) {
        this.deleteCheckedMenu();
      } else {
        this.$message.info("每次只能删除一个");
      }
    }
  },
  mounted() {
    this.getMenuList();
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
