<template>
  <div class="wrapper">
    <div class="title">
      <span>查询结果：对共12个用户,查询到8个共同标签</span>
    </div>
    <div class="commTable">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="籍贯：北京"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="年龄：15"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="性别：女">
        </el-table-column>
        <el-table-column
          prop="address"
          label="职业：计算机">
        </el-table-column>
        <el-table-column
          prop="address"
          label="品牌偏好：苹果">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  .title {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .commTable {
    margin-top: 30px;
  }
}
</style>
