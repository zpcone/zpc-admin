<template>
  <section>
    <div style="background: #f1f1f1;padding: 10px;text-indent: 2em;">
      <h1 v-if="isEdit == '1'">编辑管理员</h1>
      <h1 v-else>新增管理员</h1>
    </div>
    <div class="m20">
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="140px">
        <el-form-item prop="username" label="用 户 名">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="所 属 部 门">
          <el-input v-model="form.deptName" @click.native="chooseDept" :disabled="true" placeholder="所属部门"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密 码" >
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮 箱" >
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手 机 号" >
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="roleIdList" label="角 色" >
          <el-checkbox-group v-model="form.roleIdList">
            <el-checkbox :label="item.value" name="短信" v-for="(item,index) in roleList" :key="index">{{item.lebel}}</el-checkbox>
             <!-- <el-checkbox label="1" name="短信">平台管理员</el-checkbox>
                <el-checkbox label="2" name="IOS">CTO</el-checkbox>
                <el-checkbox label="3" name="电商技术">电商技术</el-checkbox>
                <el-checkbox label="4" name="11">11</el-checkbox>
                <el-checkbox label="5" name="引擎技术">引擎技术</el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="status" label="状 态">
          <el-radio-group v-model="form.status">
              <!-- <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio> -->
            <el-radio label="0">禁用</el-radio>
            <el-radio label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
          <el-button type="success" @click="confirm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="选择部门"
      :visible.sync="isShowTree"
      width="30%">
      <p>
        <span style="color:red;">
          提示：点击选中
        </span>
      </p>
      <div>
        <!-- <el-tree
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree> -->
        <el-tree
          :data="treeDate"
          :expand-on-click-node="false"
          @node-click="clickTreeNode"
          node-key="id"
          :props="defaultProps">
        </el-tree>
      </div>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveShowTree">确 定</el-button>
        <el-button @click="cancelShowTree">取消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
//    查找当前用户所有部门集合================添加用户
  import { getNowUserToWhereDepart, addUser, getChildrenIdsList } from '@/api/login'
  export default{
    name: 'addSystemAdmin',
    computed: {
    },
    data(){
      // 手机号校验
      var validateMobile = (rule, value, callback) => {
        var status = false
        var regu = "^[1][3,4,5,7,8][0-9]{9}$"
        var re = new RegExp(regu)
        if (re.test(value)) {
          status = true
        }else{
          status = false
        }
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!status) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      // 部门校验
      var validateDeptname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属部门。'));
        } else {
          callback()
        }
      }
      // 用户名
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名。'));
        } else {
          callback()
        }
      }
      // 密码
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码。'));
        } else {
          callback()
        }
      }
      // 角色
      var validateRole = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择角色。'));
        }  else {
          callback()
        }
      }
      // 状态
      var validateStatus = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择状态。'));
        } else {
          callback()
        }
      }
      return{
        propTreeNode: '', // 保存选中的tree节点值
        // isShowTree: fasle,
        form: {
          username: '', //	用户名
          password: '', //	密码
          email: ''	, // 邮箱
          mobile: '',// 机号
          roleIdList: [], // 角色
          deptId: '',  // 部门id
          deptName: '', //	部门名称
          childDeptIds: [], // 子部门
          status: '' // 状态 0 禁用 1正常
        },
        roleList: [],
        isShowTree: false,
        data2: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }, {
              label: '三级 1-1-2'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
          }, {
            label: '二级 2-2'
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1'
          }, {
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeDate: [],
        rules: {
          username: [
            { validator: validateUsername, trigger: 'change' }
          ],
          deptName: [
            { validator: validateDeptname, trigger: 'change' }
          ],
          password: [
            { validator: validatePassword, trigger: 'change'}
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
          ],
          mobile: [
            { validator: validateMobile, trigger: 'change' }
          ],
          roleIdList: [
             { type: 'array', required: true, message: '至少选择一个角色', trigger: 'change' }
          ],
          status: [
            { validator: validateStatus, trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      getUserChildrenIds () {
        var _this = this
        var obj = {}
        obj.userId = _this.$route.params.userId
        getChildrenIdsList(obj)
        .then(res => {
          var obj = JSON.parse(res)
          console.log(obj.data)
          _this.form.roleIdList = obj.data.roleIdList
          for (let i = 0; i < obj.data.length; i++) {
            a[i] = String(a[i])
          }
        })
        .catch(() => {

        })
      },
      // 表单验证规则
      // tree弹出框确定
      saveShowTree() {
        if (this.propTreeNode) {
          this.form.deptName = this.propTreeNode.label
          this.form.deptId = this.propTreeNode.deptId
          if (this.propTreeNode.children.length > 0) {
            this.propTreeNode.children.forEach(ele => {
              this.form.childDeptIds.push(ele.deptId)
            });
          }
          this.isShowTree = false
         this.$message.success('成功选择所属部门')
        } else {
         this.$message.info('请选择所属部门')
        }
      },
      cancelShowTree() {
        this.$message.info('取消选择所属部门')
        this.isShowTree = false
      },
      // 点击树形节点获取值
      clickTreeNode(data) {
        this.propTreeNode = data
        console.log(data)
      },
      // 获取树形组件内部的数据
      getToWhereDepart() {
        getNowUserToWhereDepart({userId: ''})
        .then(res => {
          this.treeDate = res.data
          this.getTree()
          this.$message.success('获取被选择部门成功')
        })
        .catch(() => {
          this.$message.error('获取被选择部门失败')
        })
      },
      // 点击选择部门事件
      chooseDept(){
        this.propTreeNode = '' // 清空数据
        this.form.childDeptIds = []
        this.isShowTree = true
      },
      // chooseDone(data){
      //   this.form.deptName = data.label
      //   this.chooseDeptDlsg = false
      // },
      // chooseCancel(data){
      //   this.$message.warning('取消了选择')
      //   this.chooseDeptDlsg = false
      // },
      back(){
        this.$router.go(-1)
      },
      // 保存用户接口
      addNewUser() {
        addUser(this.form)
        .then(res => {
          if (res.status == 200) {
            this.$message.success('保存用户成功')
            this.$router.go(-1)
          } else {
            this.$message.error('请检查用户信息不能重复')
          }
        })
        .catch(
          // this.$message.error('保存用户失败')
        )
      },
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.addNewUser()
          } else {
            // console.log('error submit!!')
            return false;
          }
        })
        // console.log(this.form)
        // this.addNewUser()
      },
      // tree的事件
      // getCheckedNodes() {
      //   console.log(this.$refs.tree.getCheckedNodes())
      // },
      // getCheckedKeys() {
      //   console.log(this.$refs.tree.getCheckedKeys())
      // },
      // setCheckedNodes() {
      //   this.$refs.tree.setCheckedNodes([{
      //     id: 5,
      //     label: '二级 2-1'
      //   }, {
      //     id: 9,
      //     label: '三级 1-1-1'
      //   }]);
      // },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      // test一维数组转换方法=========================
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
                        },
                        {
                            "departmentName": "测试-一级子级",
                            "parentId": "594a28fb1c8652a01f0301",
                            "id": "594a3910202469941"
                        },
                        {
                            "departmentName": "测试-二级子级",
                            "parentId": "594a3910202469941",
                            "id": "594a391020246994asasd1"
                        },
                        {
                            "departmentName": "盛达康",
                            "departmentDesc": "盛达康网络",
                            "parentId": "",
                            "id": "594a28fb1c8652a01f030126"
                        },
                        {
                            "departmentName": "开发",
                            "parentId": "594a28fb1c8652a01f030126",
                            "id": "594a3910202469941c349d7c"
                        },
                        {
                            "departmentName": "运营",
                            "parentId": "594a28fb1c8652a01f030126",
                            "id": "594a4509202469941c349d7f"
                        },
                        {
                            "departmentName": "人事",
                            "parentId": "594a28fb1c8652a01f030126",
                            "id": "59522e3ef30415281805d39f"
                        },
                        {
                            "departmentName": "瞧瞧",
                            "parentId": "594a3910202469941c349d7c",
                            "id": "597842fc51ec7f80118aa94c"
                        },
                        {
                            "departmentName": "测试层",
                            "parentId": "594a4509202469941c349d7f",
                            "id": "5978436751ec7f80118aa94d"
                        },
                        {
                            "departmentName": "测试1",
                            "parentId": "5978436751ec7f80118aa94d",
                            "id": "5979ad338c9082580984cf0a"
                        },
                        {
                            "departmentName": "测试2",
                            "parentId": "5979ad338c9082580984cf0a",
                            "id": "5979ad418c9082580984cf0b"
                        },
                        {
                            "departmentName": "测试3",
                            "parentId": "5979ad418c9082580984cf0b",
                            "id": "5979ad568c9082580984cf0c"
                        },
                        {
                            "departmentName": "测试4",
                            "parentId": "5979ad568c9082580984cf0c",
                            "id": "5979ad648c9082580984cf0d"
                        }
                    ]
                }
                var data = this.treeDate // 数组
                let treedata = [] // 建空数组
                //查找最顶层-------一级部门
                let len = data.length
                for(let j=0;j<len;j++){
                    // data[j].expand = false
                    data[j].label = data[j].name
                    if(data[j].parentId == "-1"){
                        treedata.push({
                            "expand":true,
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
                this.treeDate = treedata
                console.log("Tree初始化的时间是"+(end - start)+"ms")//返回函数执行需要时间
            }
            // ============================test   end=====
    },
    mounted () {
      // this.getTree()
      this.roleList = this.$store.state.getAllRoleArr
      this.getToWhereDepart()
      // this.getUserChildrenIds()
    }
  }
</script>

<style scoped lang="scss">
.el-input{
  width: 500px;
}
</style>
