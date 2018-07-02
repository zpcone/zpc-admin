<template>
  <section>
    <div >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <div class="m20" v-if="dlsgType === 'supply'">
          <span>供应商ID</span>
          <el-input style="max-width: 300px;" v-model.trim="ruleForm.supplierId" v-on:input="NumCheck" maxlength="18" placeholder=""></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search('1')">搜索</el-button>
        </div>
        <div class="m20" v-if="dlsgType === 'supply'">
          <el-table :data="supplyData" border stripe style="width: 100%" @selection-change="selectSupplyChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="supplierId" label="供应商Id"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
          </el-table>
        </div>
        <div class="m20" v-if="dlsgType === 'product'">
          <span>商品ID</span>
          <el-input style="max-width: 300px;" v-model.trim="ruleForm.productId" v-on:input="NumCheck" maxlength="18" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search('2')">搜索</el-button>
        </div>
        <div class="m20" v-if="dlsgType === 'product'">
          <el-table :data="productData" border stripe style="width: 100%" @selection-change="selectProductChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="productId" label="商品ID"></el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm('2')">确 定</el-button>
    </span>
  </section>
</template>

<script>
import { searchSupplier, searchProduct, checkProduct } from '@/api/split'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dlsgType: {
      type: String,
      default: 'product'
    }
  },
  data() {
    return {
      ruleForm: {
        supplierId: '',
        productId: ''
      },
      title: '',
      supplierId: '',
      productId: '',
      supplyData: [],
      productData: [],
      data: {
        type: 1,
        data: []
      },
      rules: {
        supplierId: [
          { required: true, type: 'string', max: 18, message: 'ID必须是18位数字', trigger: 'blur' }
        ],
        productId: [
          { type: 'string', length: 18, message: 'ID必须是18位数字', trigger: 'blur' }
        ]
      },
      idNum: true,
      matchObjectId: ''
    }
  },
  watch: {
    dlsgType() {
      if (this.dlsgType === 'supply') {
        this.title = '查找供应商'
      } else if (this.dlsgType === 'product') {
        this.title = '查找商品'
      }
    }
  },
  methods: {
    // Id校验
    NumCheck() {
      const reg = new RegExp(/^[0-9]*$/)
      if (!reg.test(this.ruleForm.productId) || !reg.test(this.ruleForm.supplierId)) {
        this.idNum = false
      } else {
        this.idNum = true
      }
    },
    // 取消
    cancel() {
      this.$emit('cancel')
    },
    // 确定
    confirm() {
      if (this.data.data.length === 0) {
        this.$message({
          message: '请选择',
          type: 'warning'
        })
        return
      }
      if (this.data.type === 2) {
        this.matchObjectId = this.data.data[0].supplierId
        console.log(this.data.data[0].supplierId)
      } else {
        this.matchObjectId = this.data.data[0].matchObjectId
        console.log(this.data.data[0].matchObjectId)
      }
      checkProduct({ matchObjectId: this.matchObjectId }).then(res => {
        if (res.status === 200) {
          this.$emit('confirm', this.data)
        } else {
          console.log(res.errorMsg)
          this.$message({
            type: 'error',
            message: res.errorMsg
          })
        }
      })
    },
    // 搜索
    search(flag) {
      // console.log(flag)
      this.data.data = []
      if (flag === '1') {
        if (this.ruleForm.supplierId === '') {
          this.$message.error('请输入一个供应商ID')
        } else {
          if (this.idNum === false) {
            this.$message.warning('ID必须为数字！')
          } else {
            searchSupplier({ supplierId: this.ruleForm.supplierId }).then(res => {
              if (res.status === 200) {
                if (Object.keys(res.data.data).length === 0) {
                  this.supplyData = []
                } else {
                  this.supplyData = []
                  this.supplyData.push(res.data.data)
                }
              } else {
                this.$message({
                  message: res.errorMsg,
                  type: 'error'
                })
              }
            })
          }
        }
      } else if (flag === '2') {
        if (this.ruleForm.productId === '') {
          this.$message.error('请输入一个商品ID')
          return
        } else {
          console.log(this.idNum)
          if (this.idNum === false) {
            this.$message.warning('ID必须为数字！')
          } else {
            searchProduct({ productId: this.ruleForm.productId }).then(res => {
              if (res.status === 200) {
                this.productData = res.data.data
              }
            })
          }
        }
      }
    },
    // 选中商品
    selectProductChange(arr) {
      this.data.type = 1
      this.data.data = arr
      console.log(this.data.data)
    },
    // 选中供应商
    selectSupplyChange(arr) {
      this.data.type = 2
      this.data.data = arr
      console.log(this.data.data)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
