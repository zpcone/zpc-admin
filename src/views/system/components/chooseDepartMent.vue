<template>
  <section>
    <el-dialog
      title="选择部门"
      :visible.sync="chooseDeptDlsg"
      width="30%">
      <div class="m20">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
// 查询所有部门
import { getNowUserToWhereDepart } from '@/api/login'
  export default{
    name: 'chooseDepartMent',
    props:{
      defaultProps:{
        type: Object,
        default: {
          children: 'children',
          label: 'label'
        }
      },
      chooseDeptDlsg: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        data:[{
          label: '一级',
          children: [
            {
              label: '二级'
            },
            {
              label: '3级'
            },
            {
              label: '4级'
            }
          ]
        }],
        chooseData: []
      }
    },
    methods:{
      getToWhereDepart() {
        var _this = this
        getNowUserToWhereDepart({userId: ''})
        .then(res => {
          res.data.forEach(ele => {

          });
          _this.data = res.data
          _this.$message.success('获取部门成功')
        })
        .catch(() => {
          _this.$message.error('获取部门失败')
        })
      },
      handleQuery(){
        // 获取部门信息
      },
      handleNodeClick(data){
        this.chooseData = data
      },
      cancel(){
        this.$emit('chooseCancel','cancel')
      },
      confirm(){
        this.$emit('chooseDone',this.chooseData)
      }
    },
    mounted(){
      this.handleQuery()
      this.getToWhereDepart()
    }
  }
</script>
