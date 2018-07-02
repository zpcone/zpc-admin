<template>
	<section>
		<el-dialog :title="confirmSetting.title"
			:visible="confirmSetting.show"
			width="30%"
			:before-close="handleClose">
			<p style="text-align:center;">确定要{{confirmSetting.title}}{{confirmSetting.name}}</p>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="confirmSetting.show = false">取 消</el-button>
			    <el-button type="primary" @click="confirm">确 定</el-button>
		    </span>
		</el-dialog>
	</section>
</template>

<script>
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
    return {}
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      //				this.confirmSetting.show = false
    },
    confirm() {
      this.$emit('confirmOk', event)
      this.confirmSetting.show = false
    }
  }
}
</script>

<style>

</style>
