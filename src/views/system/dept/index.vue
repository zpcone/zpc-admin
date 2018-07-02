<template>
  <section>
    <div class="m20">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="edit">修改</el-button>
          <el-button type="danger" @click="deletedept" icon="el-icon-delete">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <tree-table :data="data" :columns="columns" border :showSelection="showSelection" @selectionChange="selectionChange"></tree-table>
    </div>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogDelete"
      width="30%">
      <div style="text-align:center;">确定删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="saveDeleteDept">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import treeTable from '@/components/TreeTable'
  // ====查找部门集合===========获取登录人信息===查询所有用户==删除部门
  import {getNowUserToWhereDepart, getDept , getAllUser,deleteDepartment} from '@/api/system/dept'
  export default{
    name: 'treeTableDept',
    components: { treeTable },
    data(){
      return{
        getCheckDept: [],
        dialogDelete: false,
        treeDate: [],
        form: {},
        showSelection: true,
        columns: [
          {
            text: '部门名称',
            value: 'deptName',
          },
          {
            text: '部门ID',
            value: 'deptId'
          },
          {
            text: '上级部门',
            value: 'upDept'
          },
          {
            text: '排序号',
            value: 'sortNum'
          }
        ],
        data: [
          {
            deptId : 0,
            deptName: '复华运营部',
            upDept: '',
            sortNum: '0'
          },
          {
            deptId: 1,
            deptName: '复华技术部',
            upDept: '',
            sortNum: '0',
            children: [
              {
                deptId: 2,
                deptName: '电商部',
                upDept: '复华技术部',
                sortNum: '0',
              },
              {
                deptId: 3,
                deptName: '社交部',
                upDept: '复华技术部',
                sortNum: '0',
              },
              {
                deptId: 4,
                deptName: '引擎部',
                upDept: '复华技术部',
                sortNum: '0',
              }
            ]
          }
        ],
        currentPath: this.$router.currentRoute.path
      }
    },
    methods:{
      // 点击删除执行
      deletedept() {
        if (this.getCheckDept.length == 0) {
          this.$message.warning('请选择部门')
          return
        }
        if (this.getCheckDept.length > 1) {
          this.$message.warning('每次只能删除一个部门')
          return
        }
        this.dialogDelete = true
      },
      // 删除弹框确定事件
      saveDeleteDept() {
        this.doDeletePort()
      },
      // 调删除接口
      doDeletePort() {
        var _this = this
        var obj = {}
        obj.deptId = _this.getCheckDept[0].deptId
        deleteDepartment(obj)
        .then(res => {
          _this.$message.success('删除成功')
          _this.dialogDelete = false
          _this.getAllDepartment()

        })
        .catch(() => {
          _this.$message.error('删除失败')
        })
      },
      // 调获取所有部门接口
      getAllDepartment() {
        getNowUserToWhereDepart({userId: ''})
        .then(res => {
          this.treeDate = res.data
          this.getTree()
        })
        .catch(() => {

        })
      },
      selectionChange(arr){
        this.getCheckDept = arr
        console.log(arr)
      },
      add(){
        // this.search()
        this.$router.push(this.currentPath + '/add')
      },
      // search() {
      //   var obj = {}
      //   obj.username = 'admin'
      //   getAllUser (obj)
      //   .then(res => {
      //     console.log('成功')
      //   })
      //   .catch(() => {

      //   })
      // },
      edit(){
        this.$router.push(this.currentPath + '/edit')
        // this.$router.push({
        //   path: this.currentPath + '/add',
        //   query: {
        //     isEdit: true
        //   }
        // })
      },
       getTree(){
          var start = new Date().getTime();//起始时间
          //准备数据
          let testData = {
              "department": [
                  {
                      "departmentName": "测试1",
                      "departmentDesc": "盛达康网络",
                      "parentId": "",
                      "id": "594a28fb1c8652a01f0301"
                  }
              ]
          }
          var data = this.treeDate // 数组
          let treedata = [] // 建空数组
          //查找最顶层-------一级部门
          let len = data.length
          for(let j=0;j<len;j++){
              // data[j].expand = false
              data[j].deptName = data[j].name
              data[j].label = data[j].name
              if(data[j].parentId == "-1"){
                  treedata.push({
                      "expand":true,
                      "deptName":data[j].name,
                      "label":data[j].name,
                      "deptId":data[j].deptId
                  })
              }
          }
          //找到跟最高层id相关的子子孙孙，并给子孙添加lev
          var treedataLevs =[]
          for(let h=0,ls=treedata.length;h<ls;h++){
              treedataLevs.push({
                  treedataLev:sonsTree(data,treedata[h].deptId)
              })
          }
          console.log(treedataLevs)
          for(let p=0,lq=treedataLevs.length;p<lq;p++){
              var treedataLev = treedataLevs[p].treedataLev
              //找到最高层的lev
              var maxLev = 0
              for(let i=0,lt=treedataLev.length;i<lt;i++){
                  if(parseInt(treedataLev[i].lev) > maxLev){
                      maxLev = parseInt(treedataLev[i].lev)
                  }else{
                      maxLev = maxLev
                  }
              }
              //比较当前层和上一层的数据，然后做处理
              var needLev = maxLev
              var maxLevTree = []
              var maxLevTreePrev = []
              for(let m=0;m<maxLev;m++){
                  maxLevTree = getLevArr(treedataLev,needLev)
                  maxLevTreePrev = getLevArr(treedataLev,needLev-1)
                  for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
                      maxLevTreePrev[j].children = new Array()
                      for(var i=0,lm=maxLevTree;i<lm.length;i++){
                          if(maxLevTree[i].parentId == maxLevTreePrev[j].deptId){
                              maxLevTreePrev[j].children.push(maxLevTree[i])
                          }
                      }
                  }
                  needLev--
              }
              treedata[p].children = maxLevTreePrev
          }
          this.baseData = treedata
          //找出同一级的数据
          function getLevArr(arr,lev){
              var newarr = []
              for(let i=0,la=arr.length;i<la;i++){
                  //这里对arr 的children 做处理
                  arr.children = new Array()
                  if(parseInt(arr[i].lev) == lev){
                      newarr.push(arr[i])
                  }
              }
              return newarr
          }
          //给每个数据添加一个lev
          function sonsTree(arr,deptId){
            var temp = [],lev=0;
            var forFn = function(arr, deptId,lev){
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    if (item.parentId==deptId) {
                        item.lev=lev;
                        temp.push(item);
                        forFn(arr,item.deptId,lev+1);
                    }
                }
            };
            forFn(arr, deptId,lev);
            return temp;
          }
          var end = new Date().getTime();//结束时间
          this.data = treedata
          console.log(this.data)
          this.$store.commit('setGetTreeData', this.data)
          console.log(this.$store.state.getTreeData)
          // this.$store.state.getTreeData
          console.log("Tree初始化的时间是"+(end - start)+"ms")//返回函数执行需要时间
      }
    },
    mounted(){
      this.getAllDepartment()
      // this.search()
      // 获取登录人信息
      // getDept({}).then(res=>{
      //   console.log(res)
      // })
    }
  }
</script>

<style scoped lang="scss">
.m20{
  margin: 20px;
}
.center{
  text-align: center;
}
</style>
