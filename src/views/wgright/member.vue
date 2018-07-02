<template>
  <div style="margin: 30px;">
    <div class="create">
      <el-button type="primary" @click="newDlsg = true">创建特权</el-button>
    </div>
    <div class="btnGroup">
      <el-button type="success">批量启用</el-button>
      <el-button type="info">批量停用</el-button>
      <el-button type="primary" @click="addDlsg = true">新增限制条件</el-button>
    </div>
    <div class="create">
      <el-table :data="data" border style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="" label="特权ID"></el-table-column>
        <el-table-column prop="" label="特权名称"></el-table-column>
        <el-table-column prop="" label="图标"></el-table-column>
        <el-table-column prop="" label="限制条件"></el-table-column>
        <el-table-column prop="" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini">详情</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">启用</el-button>
            <!--<router-link :to="{path:'/right/cash'}">托尔斯泰</router-link>-->
          </template>
        </el-table-column>
        <el-table-column prop="" label="当前状态"></el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="创建特权"
      :visible.sync="newDlsg"
      width="40%">
      <div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item prop="" label="栏目级别：">
            <el-select v-model="form.programaLevel" placeholder="请选择栏目级别">
              <el-option
                v-for="item in programaLevels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-if="form.programaLevel === '2'" v-model="form.programaBelong" placeholder="请选择一级栏目">
              <el-option
                v-for="item in programaBelongs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="" label="栏目名称：">
            <el-input :disabled="form.programaLevel === '1'" style="width: 200px;" v-model="form.name" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
          <el-form-item prop="" label="自定义图标：">
            <el-upload
              class="upload-demo"
              :disabled="form.programaLevel === '1'"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.fileList2"
              :limit = "1"
              list-type="picture-card">
              <!--<i class="el-icon-upload"></i>-->
              <el-button size="small" type="text">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不超过2M，支持格式：JPG、JPEG、PNG、BMP</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="" label="限制条件：">
            <el-select 
              v-model="form.limitCondition" 
              :disabled="form.programaLevel === '1'"
              placeholder="请选择">
              <el-option
                v-for="item in limitConditions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
          </el-form-item>
          <el-row v-for="(item, index) in form.limitList" :key="index" style="position: relative;">
            <el-col :span="10">
              <el-form-item prop="" label="限制数量：">
                <el-input :disabled="form.programaLevel === '1'" style="width: 160px;" placeholder="" v-model="item.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="" label="价格：">
                <el-input :disabled="form.programaLevel === '1'" style="width: 160px;" placeholder="" v-model="item.price"></el-input>
              </el-form-item>
            </el-col>
            <el-button :disabled="form.programaLevel === '1'" type="danger" style="position: absolute;top: 0;right: 0;" @click="delLimit(index)">删除</el-button>
          </el-row>
          <el-form-item>
            <el-button :disabled="form.programaLevel === '1'" type="primary" class="el-icon el-icon-lus" size="mini" @click="addLimit">新增限制数量及价格</el-button>
            <span style="font-size: 14px;color: red;line-height: 1;margin-left: 30px;">最多添加十条</span>
          </el-form-item>
          <el-form-item prop="" label="说明：">
            <el-input :disabled="form.programaLevel === '1'" v-model="form.desc" placeholder="" type="textarea" :rows="6"></el-input>
            <el-upload
              :disabled="form.programaLevel === '1'"
              style="margin-top: 15px;"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="form.fileList">
              <el-button :disabled="form.programaLevel === '1'" size="small" type="primary" icon="el-icon-plus">点击上传</el-button>
              <span slot="tip" style="margin-left: 20px;">上传问题图片</span>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newDlsg = false">确 定</el-button>
        <el-button @click="newDlsg = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--新增-->
    <el-dialog
      title="新增限制条件"
      :visible.sync="addDlsg"
      width="40%">
      <div>
        <el-form ref="addForm" :model="addForm" label-width="120px">
          <el-form-item prop="" label="自定义图标：">
            <el-upload
              class="upload-demo"
              :disabled="form.programaLevel === '1'"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="addForm.fileList2"
              :limit = "1"
              list-type="picture-card">
              <el-button size="small" type="text">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不超过2M，支持格式：JPG、JPEG、PNG、BMP</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="" label="限制条件：">
            <el-select 
              v-model="addForm.limitCondition"
              :disabled="true"
              placeholder="请选择">
              <el-option
                v-for="item in limitConditions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>            
          </el-form-item>
          <el-row v-for="(item, index) in addForm.limitList" :key="index" style="position: relative;">
            <el-col :span="10">
              <el-form-item prop="" label="限制数量：">
                <el-input style="width: 160px;" placeholder="" v-model="item.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="" label="价格：">
                <el-input style="width: 160px;" placeholder="" v-model="item.price"></el-input>
              </el-form-item>
            </el-col>
            <el-button type="danger" style="position: absolute;top: 0;right: 0;" @click="delLimit(index)">删除</el-button>
          </el-row>
          <el-form-item>
            <el-button type="primary" class="el-icon el-icon-lus" size="mini" @click="addLimit">新增限制数量及价格</el-button>
            <span style="font-size: 14px;color: red;line-height: 1;margin-left: 30px;">最多添加十条</span>
          </el-form-item>
          <el-form-item prop="" label="说明：">
            <el-input v-model="addForm.desc" placeholder="" type="textarea" :rows="6"></el-input>
            <el-upload
              style="margin-top: 15px;"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="addForm.fileList">
              <el-button size="small" type="primary" icon="el-icon-plus">点击上传</el-button>
              <span slot="tip" style="margin-left: 20px;">上传问题图片</span>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newDlsg = false">确 定</el-button>
        <el-button @click="newDlsg = false">取 消</el-button>
      </span>
    </el-dialog>
  </div> 
</template>
<script>
  export default {
    data() {
      return {
        data: [{}],
        // 创建
        newDlsg: false,
        form: {
          programaLevel: '1',
          programaBelong: '',
          limitList: [{number:1,price:10}]
        },
        // 新增
        addDlsg: false,
        addForm: {},
        programaLevels: [
          {
            label: '一级栏目',
            value: '1'
          },
          {
            label: '二级栏目',
            value: '2'
          }
        ],
        programaBelongs: [],
        
        limitConditions: [
          {
            label: '圈子数量',
            value: '1'
          },
          {
            label: '好友数量',
            value: '2'
          },
          {
            label: '查看次数',
            value: '3'
          },
          {
            label: '圈子路由次数',
            value: '4'
          },
          {
            label: '提现额度',
            value: '5'
          },
          {
            label: '许愿灯数量',
            value: '6'
          },
          {
            label: '圈主数量',
            value: '7'
          },
          {
            label: '发言时长',
            value: '8'
          },
          {
            label: '访客数量',
            value: '9'
          },
        ],
        
        
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      addLimit() {
        this.form.limitList.push({
          number: '',
          price: ''
        })
      },
      delLimit(index){
        this.form.limitList.splice(index,1)
      }
    }
  }
</script>
<style scoped lang="scss">
	.create,.btnGroup{
	  margin: 15px 0;
	}
</style>