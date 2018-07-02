<template>
  <section>
    <div style="background: #f1f1f1;padding: 10px;text-indent: 2em;">
      <h1 v-if="isEdit == '1'">编辑菜单</h1>
      <h1 v-else>编辑菜单</h1>
    </div>
    <div class="m20">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="菜单名称">
          <el-input clearable v-model="form.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item prop="parentId" label="上级菜单">
          <el-input clearable v-model="form.parentId" :disabled="true" @click.native="chooseMenu" placeholder="请选择上级菜单"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type !== 0 && form.type !== 2" prop="url" label="菜单Url">
          <el-input clearable v-model="form.url" placeholder="请输入菜单Url"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type !== 0" prop="perms" label="授权标识">
          <el-input clearable v-model="form.perms" placeholder="请输入授权标识"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type !== 2" prop="orderNum" label="排序号">
          <el-input clearable v-model="form.orderNum" placeholder="请输入排序号"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type !== 2" prop="icon" label="菜单标识">
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
// ========编辑菜单====
  import { updateMenu } from '@/api/system/dept'
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
      saveEditTree () {
        updateMenu(this.form)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success('编辑菜单成功')
            this.$router.go(-1)
          } else {
            this.$message.error('编辑菜单失败')
          }
        })
        .catch(() => {
          this.$message.eror('编辑菜单失败')
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
            this.saveEditTree()
          } else {
            return false;
          }
        })
        console.log(this.form)
      }
    },
    mounted () {
      this.form.type = this.$store.state.getUpdataMenu[0].type
      this.form.name = this.$store.state.getUpdataMenu[0].name
      this.form.parentId = this.$store.state.getUpdataMenu[0].parentId
      this.form.url = this.$store.state.getUpdataMenu[0].url
      this.form.perms = this.$store.state.getUpdataMenu[0].perms
      this.form.orderNum = this.$store.state.getUpdataMenu[0].orderNum
      this.form.icon = this.$store.state.getUpdataMenu[0].icon
      this.form.menuId = this.$store.state.getUpdataMenu[0].menuId
      this.treeData = this.$store.state.getTreeDataMenu
    }
  }
</script>

<style scoped lang="scss">
.el-input{
  width: 500px;
}
</style>
