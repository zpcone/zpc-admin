<template>
  <section>
    <el-dialog
      title="选择菜单"
      :visible.sync="chooseMenuDlsg"
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
  export default{
    name: 'chooseMenu',
    props:{
      defaultProps:{
        type: Object,
        default: {
          children: 'children',
          label: 'label'
        }
      },
      chooseMenuDlsg: {
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
      handleQuery(){
        // 获取菜单信息
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
    }
  }
</script>
