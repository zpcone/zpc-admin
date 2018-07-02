<template>
  <section>
    <div class="m20">
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="success" @click="save">保存</el-button>
    </div>
    <div class="m20">
      <p class="title">系统自定义滤镜标签</p>
      <div>
        <span>排序：</span>
        <el-select v-model="form.sort" placeholder="请选择">
          <el-option
            v-for="item in sorts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-checkbox label="全选"></el-checkbox>
        <span>当前选择0项</span>
        <el-button type="success">置顶</el-button>
      </div>
      <div style="" class="clearfix" style="margin: 20px 0;border: 1px solid #ccc;padding: 20px;border-radius: 10px;">
        <el-checkbox-group v-model="systemLabel">
          <el-checkbox
            class="checkBoxItem"
            style="display: inline-block;width: 20%;box-sizing: border-box;margin-left: 0;margin-bottom:20px;"
            v-for="(item,index) in systemLabels" :label="item.label" :key="index">{{item.value}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <p class="title">圈内已有滤镜圈</p>
      <div>
        <span>排序：</span>
        <el-select v-model="form.sort" placeholder="请选择">
          <el-option
            v-for="item in sorts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-checkbox label="全选"></el-checkbox>
        <span>当前选择0项</span>
        <el-button type="success">置顶</el-button>
      </div>
      <el-table :data="data" border stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="" label="圈ID"></el-table-column>
        <el-table-column prop="" label="圈名称"></el-table-column>
        <el-table-column prop="" label="对应滤镜标签名称"></el-table-column>
        <el-table-column prop="" label="创建时间"></el-table-column>
      </el-table>
      <p style="text-align: center;">
        <el-button type="text">查看更多</el-button>
      </p>
    </div>
  </section>
</template>

<script>
  export default{
    data(){
      return{
        form:{},
        sort:[],
        systemLabel:[],
        systemLabels:[
          {
            label:'1',
            value:'同乡'
          },
          {
            label:'2',
            value:'同乡'
          },
          {
            label:'3',
            value:'同乡'
          },
          {
            label:'4',
            value:'同乡'
          },
          {
            label:'5',
            value:'同乡'
          },
          {
            label:'6',
            value:'同乡'
          },
          {
            label:'7',
            value:'同乡'
          },
          {
            label:'8',
            value:'同乡'
          },
          {
            label:'9',
            value:'同乡'
          },
          {
            label:'10',
            value:'同乡'
          },
          {
            label:'11',
            value:'同乡'
          },
          {
            label:'12',
            value:'同乡'
          }
        ],
        data: [{}]
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
.m20{
  margin: 20px;
}
</style>