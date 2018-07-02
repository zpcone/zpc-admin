<template>
  <div class="wrapper">
      <div class="wrapperHead">
        <div class="wrapperHeadLeft">
          <div>
            <span style="color:#36A9CE;">人链标签</span>
          </div>
          <!-- ==================== -->
    <div class="custom-tree-container">
      <div class="block">
        <!-- <p>使用 render-content</p> -->
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
  <!-- <div class="block">
    <p>使用 scoped slot</p>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div> -->
</div>
<!-- =========== -->
          <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
          <!-- <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @node-click="handleNodeClickDemo"
            @check-change="handleCheckChange">
          </el-tree> -->
        </div>
        <div class="wrapperHeadRight">
          <el-button type="info" @click="daoru" style="margin-right:30px;">导入</el-button>
          <el-button type="info" @click="importExel">导出</el-button>
          <div style="margin-top:50px;">
            <!-- <el-button type="info">下方增加节点</el-button> -->
            <!-- <el-button @click="addNode" type="info" style="margin-left:50px;">增加子节点</el-button> <br> -->
          </div>
          <div style="margin-top:50px;">
            <!-- <el-button type="info" @click="upload">修改节点名称</el-button> -->
            <!-- <el-button type="info" @click="deleteNode" style="margin:0 30px;">删除节点</el-button> -->
            <!-- <el-button type="info" @click="remove(treeObj)" style="margin:0 30px;">删除节点</el-button> -->
            <!-- <el-button type="info">查询标签值</el-button> -->
          </div>
        </div>
      </div>
      <!-- 修改节点弹框 -->
      <el-dialog  width="600px" title="修改节点名称" :visible.sync="uploadDialogFormVisible">
        <el-form>
          <el-form-item label="节点名称" :label-width="formLabelWidth">
            <el-input v-model="uploadNewTreeNode" placeholder="请输入节点名称" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUploadNode">取 消</el-button>
          <el-button type="primary" @click="saveUploadNode">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 增加节点弹框 -->
      <el-dialog  width="600px" title="增加节点" :visible.sync="addDialogFormVisible">
        <el-form>
          <el-form-item label="节点名称" :label-width="formLabelWidth">
            <el-input v-model="addChildrenTreeNode" placeholder="请输入节点名称" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="canceladdNode">取 消</el-button>
          <el-button type="primary" @click="saveAddNode">确 定</el-button>
        </div>
      </el-dialog>
      <div class="wrapperBody">
        <!-- <div style="padding:20px;color:#99CCCC;">
          <span>查询结果</span>
        </div> -->
      </div>
  </div>
</template>

<script>
// =======treeInfo==============upload=============add==============delete=========
import {
  getPeopleChildSearch,
  peopleLabelUpload,
  peopleLabelAdd,
  peopleLabelDelete
} from "@/api/label/peopleLabelManage/peopleLabelSearch";
import { peopleManageUploadExcelUrl } from '@/api/commUrl'
export default {
  components: {},
  props: {},
  data() {
    return {
      nodeEdit: "",
      editData: "",
      addNode: "",
      // id: '1000',
      isShow: false,
      // tree测试
      // props: {
      //   label: 'name',
      //   children: 'zones'
      // },
      count: 1,
      // ===========
      reloadChildren: "", // 加载的子节点
      treeIndex: "",
      formLabelWidth: "120px",
      uploadDialogFormVisible: false, // upload节点弹出框
      addDialogFormVisible: false, // add节点弹出框
      uploadNewTreeNode: "", // 更改新建的节点名称
      addChildrenTreeNode: "", // 添加子节点名称
      treeObj: {}, // 保存选中的属性节点
      treeData: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    move($event) {
      // console.log(event.srcElement)
      // event.srcElement.style.display = 'null'
    },
    leave($event) {
      // console.log(event.srcElement)
      // event.srcElement.style.display = 'none'
    },
    // 添加弹出框确定
    saveAddNode() {
      // obj.codeName = this.treeObj.codeName
      var data = this.addData;
      var obj = {};
      obj.codeName = this.addChildrenTreeNode;
      obj.parentCode = data.labelCode;
      if (this.addChildrenTreeNode) {
        peopleLabelAdd(obj)
          .then(res => {
            // this.treeObj.children = res.parmter
            this.addDialogFormVisible = false;
            this.$message.success("添加成功");
            const newChild = {
              id: data.id++,
              label: this.addChildrenTreeNode,
              children: []
            };
            if (!data.children) {
              this.$set(data, "children", []);
            }
            data.children.push(newChild);
            this.addDialogFormVisible = false;
          })
          .catch(() => {
            this.$message.error("添加失败");
          });
      } else if (!this.addChildrenTreeNode) {
        this.$message.warning("请输入节点名称。");
      }
    },
    append(node, data) {
      this.addNode = node;
      this.addData = data;
      console.log(data);
      this.addChildrenTreeNode = "";
      this.addDialogFormVisible = true;
    },
    update(node, data) {
      this.nodeEdit = node;
      this.editData = data;
      console.log(data);
      this.uploadNewTreeNode = "";
      this.uploadDialogFormVisible = true;
    },
    //  更新节点弹出框确定
    saveUploadNode() {
      var node = this.nodeEdit;
      var data = this.editData;
      if (this.uploadNewTreeNode) {
        var obj = {};
        obj.id = data.id;
        obj.codeName = this.uploadNewTreeNode;
        peopleLabelUpload(obj)
          .then(res => {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children[index].label = this.uploadNewTreeNode;
            // children.splice(index, 1)
            this.uploadDialogFormVisible = false;
            this.$message.success("修改成功。");
          })
          .catch(() => {
            this.$message.error("修改失败。");
          });
        this.treeNodeUpload();
      } else {
        this.$message.warning("请输入节点名称");
      }
      console.log(this.uploadNewTreeNode);
    },
    remove(node, data) {
      this.$confirm('确定删除此节点吗？',{
        confirmButtonText: '确定',
        type: 'warning',
        showCancelButton: false,
        center: true
      }).then( () => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        peopleLabelDelete({ id: data.id })
          .then(res => {
            if (res.errorMsg == "YQ00110-500003") {
              this.$message.info("有子节点，不能删除。");
            } else {
              this.$message.success("成功删除");
              children.splice(index, 1);
            }
            // this.initTree({parentCode: '0'})
            // this.treeObj = ''
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
        this.treeNodeDetele(data)
      }).catch( () => {})
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span
            v-show="false"
            class="isShowSpan"
            style="margin-left:50px;"
            on-mouseleave={() => {
              this.leave();
            }}
            on-mousemove={() => this.move()}
          >
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    },
    // 导出事件
    importExel() {
      window.location.href = peopleManageUploadExcelUrl
      },
    // 点击-增加字节点-按钮
    // addNode () {
    //   if (this.treeObj.id) {
    //     this.addDialogFormVisible = true
    //   } else {
    //     this.$message.warning('请选择节点')
    //   }
    // },
    // 增加子节点接口
    addChildrenNode() {
      var obj = {};
      obj.codeName = this.addChildrenTreeNode;
      obj.parentCode = this.treeObj.labelCode;
      // obj.codeName = this.treeObj.codeName
      peopleLabelAdd(obj)
        .then(res => {
          // this.treeObj.children = res.parmter
          this.addDialogFormVisible = false;
          this.$message.success("添加成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    // remove(node, data) {
    //   const parent = node.parent;
    //   const children = parent.data.children || parent.data;
    //   const index = children.findIndex(d => d.id === data.id);
    //   children.splice(index, 1);
    // },
    // 点击 -删除节点-按钮
    deleteNode() {
      if (this.treeObj.id) {
        this.$confirm("提示：确定删除吗", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false,
          center: true
        })
          .then(() => {
            this.treeNodeDetele();
          })
          .catch(() => {
            this.$message.info("取消删除");
          });
      } else if (!this.treeObj.id) {
        this.$message.warning("请选择节点");
      }
    },
    // 删除节点接口
    treeNodeDetele(data) {
      var obj = {};
      obj.id = data.id;
      peopleLabelDelete(obj)
        .then(res => {
          // this.initTree({parentCode: '0'})
          // this.treeObj = ''
          this.$message.success("成功删除");
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    // 点击修改按钮
    upload() {
      if (this.treeObj) {
        this.uploadNewTreeNode = this.treeObj.codeName;
        this.uploadDialogFormVisible = true;
      } else {
        this.$message.warning("请选择节点");
      }
    },
    // 取消更新节点弹出框
    cancelUploadNode() {
      this.uploadDialogFormVisible = false;
      this.$message.info("取消修改。");
    },
    // test
    daoru() {},
    // 点击树节点事件
    handleNodeClick(data) {
      console.log(data);
      this.treeObj = data;
      var obj = {};
      obj.parentCode = data.labelCode;
      this.initTree(obj);
      // data.children = this.reloadChildren
    },
    // 节点名称修改
    treeNodeUpload() {
      var obj = {};
      obj.id = this.treeObj.id;
      obj.codeName = this.uploadNewTreeNode;
      peopleLabelUpload(obj)
        .then(res => {
          this.treeObj.label = this.uploadNewTreeNode;
          this.uploadDialogFormVisible = false;
          this.treeObj = "";
          this.$message.success("修改成功。");
        })
        .catch(() => {
          this.$message.error("修改失败。");
        });
    },
    // 查询树结构数据--接口
    initTree(param) {
      var _this = this;
      getPeopleChildSearch(param)
        .then(res => {
          this.getTree(res.data);
          // var arr = res.data
          // arr.forEach(ele => {
          //   ele.label = ele.codeName
          // })
          // _this.treeData = arr
          _this.$message({
            type: "success",
            message: "获取成功。"
          });
        })
        .catch(() => {
          _this.$message({
            type: "error",
            message: "获取失败。"
          });
        });
    },
    // 下边是测试tree================================================
    // handleCheckChange(data, checked, indeterminate) {
    //   console.log(data, checked, indeterminate)
    // },
    // 懒加载钩子函数
    // loadNode(node, resolve) {
    //   var obj = {}
    //   if (!node.data) {
    //     obj = { parentCode: '0'}
    //   } else {
    //     obj = { parentCode: node.data.labelCode}
    //   }
    //   getPeopleChildSearch(obj)
    //   .then(res => {
    //     var arr = res.data
    //     if (node.level === 0) {
    //       return resolve(arr)
    //     }
    //     var hasChild
    //     if (node.data) {
    //       hasChild = true
    //     } else {
    //       hasChild = Math.random() > 0.5
    //     }
    //     setTimeout(() => {
    //       var data;
    //       if (hasChild) {
    //         data = res.data
    //       } else {
    //         data = []
    //       }
    //       resolve(data);
    //     }, 500);
    //     this.$message({
    //       type: 'success',
    //       message: '获取成功。'
    //     })
    //   })
    // },
    getTree(canshu) {
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
      var data = canshu; // 数组
      let treedata = []; // 建空数组
      //查找最顶层-------一级部门
      let len = data.length;
      for (let j = 0; j < len; j++) {
        // data[j].expand = false
        data[j].label = data[j].codeName;
        if (data[j].parentCode == "0") {
          treedata.push({
            expand: true,
            label: data[j].codeName,
            labelCode: data[j].labelCode,
            id: data[j].id,
            parentCode: "0"
          });
        }
      }
      console.log("TreeData:");
      //找到跟最高层id相关的子子孙孙，并给子孙添加lev
      var treedataLevs = [];
      for (let h = 0, ls = treedata.length; h < ls; h++) {
        treedataLevs.push({
          treedataLev: sonsTree(data, treedata[h].labelCode)
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
              if (maxLevTree[i].parentCode == maxLevTreePrev[j].labelCode) {
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
      function sonsTree(arr, labelCode) {
        var temp = [],
          lev = 0;
        var forFn = function(arr, labelCode, lev) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.parentCode == labelCode) {
              item.lev = lev;
              temp.push(item);
              if (item.labelCode) {
                forFn(arr, item.labelCode, lev + 1);
              }
            }
          }
        };
        forFn(arr, labelCode, lev);
        return temp;
      }
      var end = new Date().getTime(); //结束时间
      console.log(this.data);
      this.data = treedata;
      console.log("Tree初始化的时间是" + (end - start) + "ms"); //返回函数执行需要时间
    }
  },
  created() {
    var obj = { parentCode: "0" };
    this.initTree(obj);
  },
  mounted() {
    var obj = { parentCode: "0" };
    this.initTree(obj);
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 0 20px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  // .custom-tree-node .el-button--text{
  //   display: none !important;
  // }
  .wrapperBody {
    height: 350px;
    background: #f2f2f2;
    // margin-top: 20px;
  }
  .wrapperHead {
    border: 1px solid #f2f2f2;
    margin-top: 20px;
    height: 500px;
    background: #f2f2f2;
    .wrapperHeadLeft {
      float: left;
      overflow: auto;
      background: white;
      border-radius: 10px;
      border: 1px solid #99cccc;
      width: 550px;
      height: calc(100% - 40px);
      margin: 20px 0 20px 50px;
      padding: 20px;
    }
    .wrapperHeadRight {
      margin: 50px;
      width: 420px;
      float: left;
    }
    // .isShowSpan:hover{
    //   visibility: hidden !important;
    // }
  }
}
</style>
