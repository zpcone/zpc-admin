<template>
  <section>
    <div style="background: #f1f1f1;padding: 10px;text-indent: 2em;">
      <h1 v-if="isEdit == '1'">编辑菜单</h1>
      <h1 v-else>新增菜单</h1>
    </div>
    <div class="m20">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="菜单名称">
          <el-input clearable v-model="form.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item prop="parentId" label="上级菜单">
          <el-input clearable v-model="form.parentId" :disabled="true" @click.native="chooseMenu" placeholder="请选择上级菜单"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="菜单Url">
          <el-input clearable v-model="form.url" placeholder="请输入菜单Url"></el-input>
        </el-form-item>
        <el-form-item prop="perms" label="授权标识">
          <el-input clearable v-model="form.perms" placeholder="请输入授权标识"></el-input>
        </el-form-item>
        <el-form-item prop="orderNum" label="排序号">
          <el-input clearable v-model="form.orderNum" placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="菜单标识">
          <el-input clearable v-model="form.icon" placeholder="请输入菜单标识"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="confirm('ruleForm')">确定</el-button>
          <el-button type="primary" @click="back('ruleForm')">返回</el-button>
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
// ========新增保存
  import { saveMenu } from '@/api/system/dept'
  export default{
    data(){
      return{
        treeData: [],
        isShowTree: false,
        getTreeParId: '',
        form:{
          type: '',
          name: '',
          parentId: '',
          url: '',
          perms: '',
          orderNum: '',
          icon: ''
        },
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        rules: {
          type: [
            { required: true, message: '请选则类型', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'change' }
          ],
          parentId: [
            { required: true, message: '请选择上级菜单ID', trigger: 'change' }
          ],
          url: [
            { required: true, message: '请输入菜单url', trigger: 'change' }
          ],
          perms: [
            { required: true, message: '请输入授权标识', trigger: 'change' }
          ],
          orderNum: [
            { required: true, message: '请输入排序号', trigger: 'change' }
          ],
          icon: [
            { required: true, message: '请输入菜单标识', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      isEdit(){
        if(this.$router.currentRoute.query.isEdit){
          return '1'
        }else{
          return '0'
        }
      }
    },
    methods:{
      saveAddTree () {
        saveMenu(this.form)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('添加菜单成功')
            this.$router.go(-1)
          } else {
            this.$message.error('添加菜单失败')
          }
        })
        .catch(() => {
          this.$message.eror('添加菜单失败')
        })
      },
      clickTreeNode(data) {
        console.log(data)
        if (!data.parentId) {
          this.$message.warning('此项没有父级ID')
        } else {
          this.getTreeParId = data.parentId
        }
      },
      chooseMenu(){
        this.isShowTree = true
        console.log('选择上级菜单')
      },
      chooseCancel(data){
        this.isShowTree = false
      },
      chooseDone(data){
        this.form.upMenuName = data.label
        this.isShowTree = false
      },
      // 弹出框确定
      saveShowTree() {
        this.form.parentId = this.getTreeParId
        this.isShowTree = false
      },
      // 弹出框取消
      cancelShowTree() {
        this.isShowTree = false
      },
      back(){
        this.$router.go(-1)
      },
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveAddTree()
          } else {
            return false;
          }
        })
        console.log(this.form)
      }
    },
    mounted () {
      this.treeData = this.$store.state.getTreeDataMenu
    }
  }
</script>

<style scoped lang="scss">
.el-input{
  width: 500px;
}
</style>
