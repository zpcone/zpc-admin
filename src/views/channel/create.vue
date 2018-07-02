<template>
	<div style="padding: 40px 0 0 20px;">
		<el-row>
			<el-col :span="14">
				<el-form ref="form" :model="form" :rules="rules" label-width="80px">
					<el-form-item prop="channelNo" label="渠道编号">
						<el-input v-model.trim="form.channelNo"></el-input>
					</el-form-item>
					<el-form-item prop="channelName" label="渠道名称">
						<el-input v-model.trim="form.channelName"></el-input>
					</el-form-item>
					<el-form-item prop="channelDescribe" label="渠道简介">
						<el-input v-model.trim="form.channelDescribe"></el-input>
					</el-form-item>
					<el-form-item prop="channelStatus" label="有效标识">
						<el-radio-group v-model="form.channelStatus">
							<el-radio :label="1">启用</el-radio>
							<el-radio :label="2">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item style="text-align: left;">
						<el-button type="info" @click="save('form')">保存</el-button>
						<el-button type="text" @click="back">返回</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getById, updateChannel, saveChannel } from '@/api/mockeg'
export default {
  data() {
    return {
      form: {
        channelNo: '',
        channelName: '',
        channelDescribe: '',
        createBy: '1', // userid
        channelStatus: '1',
        channelType: '1',
        lastUpdBy: '1' // userid
      },
      rules: {
        channelName: [
          {
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }
        ],
        channelNo: [
          {
            required: true,
            message: '请输入渠道编号',
            trigger: 'blur'
          }
        ]
      },
      id: null
    }
  },
  methods: {
    handleQuery() {
      console.log(this.$router.currentRoute)
      if (this.$router.currentRoute.query.id) {
        this.id = this.$router.currentRoute.query.id
      }
      if (this.id) {
        getById({
          id: this.id
        })
          .then(res => {
            console.log(res)
            if (res) {
              this.form = res.data.data[0]
            }
          })
          .catch()
      }
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
          // 请求创建接口   并返回列表页
          if (this.id) {
            updateChannel(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('更新渠道成功')
                  this.$router.go(-1)
                }
              })
              .catch()
          } else {
            saveChannel(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('创建渠道成功')
                  this.$router.go(-1)
                }
              })
              .catch()
          }
        } else {
          this.$message.error('请检查输入后再提交')
          return false
        }
      })
    },
    back() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.handleQuery()
  }
}
</script>

<style>

</style>