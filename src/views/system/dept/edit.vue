<template>
  <section>
    <div style="background: #f1f1f1;padding: 10px;text-indent: 2em;">
      <h1>编辑部门</h1>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item prop="name" label="部门名称">
          <el-input v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="上级部门">
          <el-input v-model="form.parentName" @click.native="chooseDept" :disabled="true" placeholder="所属部门"></el-input>
        </el-form-item>
        <el-form-item prop="sortNum" label="排序号">
          <el-input v-model="form.orderNum" :min="0" placeholder="0" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
          <el-button type="success" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="选择部门"
      :visible.sync="isShowTree"
      width="30%">
      <div>
        <el-tree
          :data="treeData"
          :expand-on-click-node="false"
          @node-click="clickTreeNode"
          show-checkbox
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
// ========保存部门===
  import { saveDepartment } from '@/api/system/dept'
  // import chooseDepartMent from '../components/chooseDepartMent'
  export default{
    // components:{
    //   chooseDepartMent
    // },
    name: 'addSystemAdmin',
    computed: {
      isEdit(){
        if(this.$router.currentRoute.query.isEdit){
          return '1'
        }else{
          return '0'
        }
      }
    },
    data(){
      return{
        isShowTree: true,
        saveTreeData: '',
        form: {
          parentId: '', // 父部门id
          name: '',	 // 部门名称
          parentName: '',	// 父级部门
          orderNum: ''	// 排序
        },
        chooseDeptDlsg: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      treeData: function(){
          return this.$store.state.getTreeData
      }
    },
    methods:{
      chooseDept(){
        this.chooseDeptDlsg = true
      },
      chooseDone(data){
        this.form.deptName = data.label
        this.chooseDeptDlsg = false
      },
      chooseCancel(data){
        this.$message.warning('取消了选择')
        this.chooseDeptDlsg = false
      },
      back(){
        this.$router.go(-1)
      },
      saveShowTree() {
        this.form.parentId = this.saveTreeData.parentId
        this.form.parentName = this.saveTreeData.name
        this.isShowTree = false
      },
      // 点击树组件事件
      clickTreeNode(data) {
        this.saveTreeData = data
        console.log(data)
      },
      // 保存部门接口
      savedepartment() {
        saveDepartment(this.form)
        .then(res => {
          this.$message.success('新建部门成功')
        })
        .catch(() => {
          this.$message.error('新建部门失败')
        })
      },
      confirm(){
        this.savedepartment()
      }
    },
    mounted () {
      console.log(this.$store.state.getTreeData)
    }
  }
</script>

<style scoped lang="scss">
.el-input{
  width: 500px;
}
</style>
