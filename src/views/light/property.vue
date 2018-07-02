<template>
  <section>
    <el-tabs v-model="propertyTab" class="m20" type="card" @tab-click="handleClick">
      <el-tab-pane label="我茂" name="name1"></el-tab-pane>
      <el-tab-pane label="我鸽" name="name2"></el-tab-pane>
    </el-tabs>
    <div class="m20 textAlignR">
    	<el-button type="success" icon="el-icon-plus" @click="add">添加属性</el-button>
    </div>
    <div class="m20">
    	<el-table :data="data" border style="width: 100%">
	      <el-table-column type="index" label="序号" width="50"></el-table-column>
	      <el-table-column prop="name" label="属性名称"></el-table-column>
	      <el-table-column label="操作">
	        <template slot-scope="scope">
	          <el-button type="primary" icon="el-icon-more" size="mini" @click="view(scope.$index,scope.row)">详情</el-button>
	          <el-button type="warning" icon="el-icon-edit" size="mini" @click="edit(scope.$index,scope.row)">编辑</el-button>
	        </template>
	      </el-table-column>
    	</el-table>
    	<el-dialog
    	  :title="dlsgTitle"
    	  :visible.sync="addDlsg"
    	  width="20%">
    	  <div>
    	    <el-form ref="form" :model="form" label-width="100px">
    	      <el-form-item prop="" label="属性名称">
    	        <el-input :disabled="isEdit === '3'" v-model.trim="form.name" maxlength="8" clearable placeholder=""></el-input>
    	      </el-form-item>
    	    </el-form>
    	  </div>
    	  <span slot="footer" class="dialog-footer">
    	    <el-button @click="cancel">取 消</el-button>
    	    <el-button type="primary" @click="confirm">确 定</el-button>
    	  </span>
    	</el-dialog>
    </div>
  </section>
</template>

<script>
import { addPublish, getPublish, updatePublish } from "@/api/light";
export default {
  data() {
    return {
      addDlsg: false,
      isEdit: "1", // 1 添加  2 编辑  3查看
      form: {},
      propertyTab: "name1",
      data: [],
      channel: "趣茂",
      channelId: "1",
      publishTypeId: ""
    };
  },
  computed: {
    dlsgTitle() {
      if (this.isEdit === "1") {
        return "添加属性";
      } else if (this.isEdit === "2") {
        return "编辑属性";
      } else if (this.isEdit === "3") {
        return "查看属性";
      }
    }
  },
  methods: {
    open(flag) {
      this.isEdit = flag;
      this.addDlsg = true;
    },
    add() {
      this.isEdit = "1";
      this.form.name = "";
      this.publishTypeId = "";
      this.addDlsg = true;
    },
    view(index, row) {
      this.isEdit = "3";
      this.form.name = row.name;
      this.addDlsg = true;
    },
    edit(index, row) {
      this.isEdit = "2";
      this.publishTypeId = row.publishTypeId;
      this.form.name = row.name;
      this.addDlsg = true;
    },
    cancel() {
      this.form.name = "";
      this.form.publishId = "";
      this.addDlsg = false;
    },
    confirm() {
      if (this.isEdit == "1") {
        if (this.form.name !== "") {
          addPublish({ name: this.form.name, channelId: this.channelId }).then(
            res => {
              if (res) {
                this.$message.success("添加成功");
                this.resetForm();
                this.addDlsg = false;
                this.handleQuery(this.channelId);
              }
            }
          );
        } else {
          this.$message.warn("请输入。。。");
        }
      }
      if (this.isEdit == "2") {
        if (this.form !== "") {
          updatePublish({
            name: this.form.name,
            publishTypeId: this.publishTypeId,
            channelId: this.channelId
          }).then(res => {
            if (res) {
              this.$message.success("修改成功");
              this.resetForm();
              this.handleQuery(this.channelId);
            }
          });
        } else {
          this.$message.warn("请输入。。。");
        }
      } else if (this.isEdit == "3") {
        this.resetForm();
      }
    },
    resetForm() {
      this.form.name = "";
      this.publishTypeId = "";
      this.addDlsg = false;
    },
    handleQuery(channelId) {
      getPublish({ channelId: channelId }).then(res => {
        if (res) {
          this.data = res.data.data;
        }
      });
    },
    handleClick(tab, event) {
      this.data = [];
      let channelId = "1";
      if (tab.name !== "name1") {
        this.channelId = "2";
      } else {
        this.channelId = "1";
      }
      this.handleQuery(this.channelId);
    }
  },
  mounted() {
    this.handleQuery("1");
  }
};
</script>

<style scoped lang="scss">
.m20 {
  margin: 20px;
}
.textAlignR {
  text-align: right;
}
</style>
