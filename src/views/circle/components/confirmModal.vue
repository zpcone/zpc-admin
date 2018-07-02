<template>
	<section>
		<el-dialog :title="confirmSetting.title"
			:visible="confirmSetting.show"
			width="30%"
      :before-close="handleClose"
		>
			<div style="text-align:center;">确定要{{confirmSetting.title}}{{confirmSetting.name}}吗？</div>
			<span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="saveDiag">确 定</el-button>
			    <el-button @click="confirmSetting.show = false">取 消</el-button>
		    </span>
		</el-dialog>
	</section>
</template>

<script>
// =========冻结圈==================解冻圈====
import { updateCircleFreeze, updateUnCircleFreeze } from '@/api/circle/info'
export default {
  name: 'confirmModal',
  props: {
    confirmSetting: {
      type: Object,
      default: {
        title: '标题',
        name: '内容',
        show: false
      }
    }
  },
  data() {
    return {
      name: 'zpc'
    }
  },
  methods: {
    handleClose(done) {
      this.confirmSetting.show = false
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
      //				this.confirmSetting.show = false
    },
    saveDiag() {
      var status = '1'
      if (this.confirmSetting.title == '冻结圈') {
        status = '1'
        this.$emit('confirmOk', status)
      } else if( this.confirmSetting.title == '解冻圈'){
        status = '2'
        this.$emit('confirmOk', status)
      }
    }
  }
}
</script>

<style>

</style>
