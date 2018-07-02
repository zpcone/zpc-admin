<template>
  <section>
  	<div style="float: right; margin-right: 50px;">
        <!--<el-button type="" icon="el-icon-plus" @click="createFirst">创建一级分类</el-button>-->
        <el-button type="primary" @click="createFirst">创建鸽舍圈</el-button>
    </div>
    <div class="m20">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item prop="circleName" label="鸽舍圈名称：">
          <el-input v-model="form.circleName" placeholder="请输入圈名称" clearable maxlength="8"></el-input>
        </el-form-item>
        <el-form-item prop="sortFlag" label="排序：">
          <el-select v-model="form.sortFlag" placeholder="请选择"  @change="sortChange" clearable>
            <el-option
              v-for="item in sorts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="searchClick">查找</el-button>
          <el-button type="info" @click="back" icon="el-icon-back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="m20">
      <el-table :data="dataTable" stripe border style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="tradeCategoryName" label="二级分类"></el-table-column>
        <el-table-column prop="categoryName" label="三级分类"></el-table-column>
        <el-table-column prop="cityName" label="城市"></el-table-column>
        <el-table-column prop="circleName" label="圈名称"></el-table-column>
        <el-table-column prop="memberNickName" label="圈主昵称"></el-table-column>
        <el-table-column prop="memberLevel" label="圈主等级"></el-table-column>
        <el-table-column prop="memberNum" label="圈人数"></el-table-column>
        <!--<el-table-column prop="" label="朋友圈总条数"></el-table-column>-->
        <el-table-column prop="status" label="状态" :formatter="statusFormat"></el-table-column>
        <el-table-column prop="" label="圈详情" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="circleDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
			<div class="pagination center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="form.pageNumber"
					:page-size="form.pageSize" layout="total, prev, pager, next"
					:total="totalSize">
				</el-pagination>
			</div>

		<!--创建鸽舍圈的对话框-->
			<el-dialog :visible.sync="dialogFormVisible" width="30%" center="true">
			  <el-form :model="groupForm">
          <el-form-item prop="circleHead" label="请选择头像地址：">
          	<!--:file-list="addForm.fileList2"-->
						<el-upload
						  class="avatar-uploader"
						  :show-file-list="false"
						  :auto-upload="true"
						  :before-upload="beforeIconUpload"
						  enctype="multipart/form-data">
						  <img v-if="groupForm.circleHead" :src="this.groupForm.circleHead" class="avatar" style="width:150px;height:150px;">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						  <div slot="tip" class="el-upload__tip" style="margin-left: 115px;">文件大小不超过2M，支持格式：JPG、JPEG、PNG、BMP，最多上传1张。</div>
						</el-upload>
            <!--<el-upload
              class="avatar-uploader"
              :auto-upload="true"
              :before-upload="beforeIconUpload"
              list-type="picture-card"
              enctype="multipart/form-data">
              <el-button size="small" type="text">上传图片</el-button>
            </el-upload>-->
          </el-form-item>
			    <el-form-item label="圈名称：" prop="circleName" :label-width="formLabelWidth">
			      <el-input v-model="groupForm.circleName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="三级分类：" prop="categoryId" :label-width="formLabelWidth">
			    	<el-input auto-complete="off" v-model="categoryName" disabled></el-input>
			    </el-form-item>
			    <!--<el-form-item label="圈标签：" prop="" :label-width="formLabelWidth">
			    	<el-input auto-complete="off" v-model="categoryTitleName" disabled></el-input>
			    </el-form-item>-->
	        <el-form-item label="城 市：" :label-width="formLabelWidth">
	          <el-select v-model="groupForm.regions" placeholder="请选择" :disabled="disabled" @change="cityChange">
	            <el-option
	              v-for="item in regions"
	              :key="item.cityCode"
	              :label="item.cityName"
	              :value="item.cityCode">
	            </el-option>
	          </el-select>
	        </el-form-item>
			    <el-form-item label="圈主昵称：" prop="ownerNiceName" :label-width="formLabelWidth">
			      <el-input v-model="groupForm.ownerNiceName" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="圈主账号："  prop="ownerAccount" :label-width="formLabelWidth">
			      <el-input v-model="groupForm.ownerAccount" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			  	 <el-button type="primary" @click="birdGroupClick">确 定</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
			  </div>
			</el-dialog>



  </section>
</template>

<script>
import {
  birdCircle,
  citylist,
  creatBirdCircle,
  uploadFilePort
} from "@/api/group/bird";
export default {
  data() {
    return {
      //categoryTitleName: '',
      form: {
        //上级分类编码
        categoryCode: "",
        //圈子名称
        circleName: "",
        cityCode: "",
        pageNumber: 1,
        pageSize: 10,
        sortFlag: ""
      },
      sorts: [
        {
          label: "按创建时间由近到远排序",
          value: 1
        },
        {
          label: "按人数由高到低排序",
          value: 2
        }
      ],
      fileList2: [],
      cityName: "",
      cityCode: "",
      ownerNiceName: "",
      ownerAccount: "",
      disabled: false,
      groupForm: {
        regions: "",
        circleHead: "",
        categoryId: "", //所属分类编号
        categoryName: "", //三级分类名称
        //categoryTitleName: '',//标签==标题名字
        //categoryTitleId: '',//标签id==标题id
        circleName: "", //圈名称
        cityCode: "", //城市编码
        ownerNiceName: "", //圈主昵称
        ownerAccount: "" //圈主账号17088363005
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      totalSize: "",
      currentPage: 1,
      categoryName: "",
      regions: [
        {
          cityName: "",
          cityCode: ""
        }
      ],

      dataTable: []
    };
  },
  methods: {
    statusFormat(row) {
      if (row.status == 1) {
        return "正常";
      } else if (row.status == 2) {
        return "冻结";
      }
    },

    //创建鸽舍圈，城市改变
    cityChange(val) {
      this.groupForm.cityCode = val;
    },

    //处理分页
    handleCurrentChange(val) {
      this.form.pageNumber = val;
      this.searchClick();
    },

    searchClick() {
      birdCircle(this.form).then(res => {
        this.dataTable = res.data;
        this.totalSize = Number(res.totalSize);
      });
    },
    sortChange(val) {
      this.form.sortFlag = val;
      this.searchClick();
    },

    back() {
      this.$router.go(-1);
    },

    //页面刷新  渲染列表
    handleQuery() {
      let query = this.$router.currentRoute.query;
      this.form.categoryCode = query.categoryCode;
      //创建圈===文件上传用的上级分类编码
      this.groupForm.categoryId = query.categoryCode;
      //创建圈===三级分类名称
      this.categoryName = query.categoryName;
      if (query.ownerAccount) {
        this.ownerAccount = query.ownerAccount;
      }
      //创建圈===圈标签名称
      //this.categoryTitleName = query.categoryTitleName
      //创建圈===圈标签id
      //this.groupForm.categoryTitleId = query.categoryTitleId
      birdCircle(this.form).then(res => {
        if (res.status == 200 && res.data.length != 0) {
          this.dataTable = res.data;
          this.totalSize = Number(res.totalSize);
          this.cityCode = res.data[0].cityId;
          this.groupForm.cityCode = res.data[0].cityId;
          this.groupForm.categoryName = res.data[0].categoryName;
          this.groupForm.regions = res.data[0].cityName;
          this.groupForm.ownerNiceName = res.data[0].memberNickName;
        } else {
          this.$message.warning(res.errorMsg);
        }
      });
    },

    //创建圈按钮
    createFirst() {
      this.dialogFormVisible = true;
      if (this.ownerAccount) {
        this.groupForm.ownerAccount = this.ownerAccount;
      }
      //	    		citylist().then(res => {
      //	      		this.regions = res.data
      //	      	})
      if (this.cityCode) {
        this.disabled = true;
        return;
      } else if (!this.cityCode) {
        //this.groupForm.categoryName = this.categoryName
        citylist().then(res => {
          this.regions = res.data;
        });
      }
    },

    //创建群弹出框的确定按钮   2018.6.23 前用   xiu
    birdGroupClick() {
      if (
        !this.groupForm.circleName ||
        !this.groupForm.regions ||
        !this.groupForm.ownerNiceName ||
        !this.groupForm.ownerAccount ||
        !this.groupForm.circleHead
      ) {
        this.$message.error("图片必传，其他信息均必填！");
      } else {
        let obj = {};
        obj.categoryId = this.groupForm.categoryId;
        obj.circleName = this.groupForm.circleName;
        obj.cityCode = this.groupForm.cityCode;
        obj.ownerNiceName = this.groupForm.ownerNiceName;
        obj.ownerAccount = this.groupForm.ownerAccount;
        obj.circleHead = this.groupForm.circleHead;
        creatBirdCircle(obj).then(res => {
          if (res.data == true && res.status == 200) {
            this.dialogFormVisible = false;
            this.$message.success("创建成功！");
            this.handleQuery();
          } else if (res.errorMsg != "" && res.status == 500) {
            let errorMsg = res.errorMsg;
            this.$message.warning(errorMsg);
          }
        });
      }
    },
    // 用来处理文件上传并传参    6.23之前  2018.6.23 xiu
    beforeIconUpload(file) {
      let fd = new FormData();
      fd.append("file", file);
      uploadFilePort(fd).then(res => {
        if (res.status == "200") {
          this.groupForm.circleHead = res.data;
        } else {
          this.$message.warning("上传失败！");
        }
      });
    },

    //创建群弹出框的确定按钮   2018.6.23 前用   xiu
    //    birdGroupClick(){
    //    	if(!this.groupForm.circleName || !this.groupForm.regions || !this.groupForm.ownerNiceName || !this.groupForm.ownerAccount){
    //    		this.$message.error('图片必传，其他信息均必填！')
    //    	}else{
    //    		this.$refs.iconUpload.submit()
    //    	}
    //    },
    // 用来处理文件上传并传参    6.23之前  2018.6.23 xiu
    //	    beforeIconUpload(file){
    //	    	let fd = new FormData()
    //	    	let obj = {}
    //	    	obj.categoryId = this.groupForm.categoryId
    //	    	obj.circleName = this.groupForm.circleName
    //	    	obj.cityCode = this.groupForm.cityCode
    //	    	obj.ownerNiceName = this.groupForm.ownerNiceName
    //	    	obj.ownerAccount = this.groupForm.ownerAccount
    //	    	fd.append('file',file)
    //	    	fd.append('jsonData',JSON.stringify(obj))
    //				creatBirdCircle(fd).then(res =>{
    //					if(res.data == true && res.status == 200){
    //				      		this.dialogFormVisible = false
    //				      		this.$message.success('创建成功！')
    //				      		this.handleQuery()
    //					}else if(res.errorMsg != '' && res.status == 500){
    //							let errorMsg = res.errorMsg
    //							this.$message.warning(errorMsg)
    //					}
    //					})
    //	   },
    //查看
    circleDetail(row) {
      this.$router.push({
        path: "/circlemanage/manage/info/detail",
        query: {
          id: row.id,
          channelType: row.channelType
        }
      });
    }
  },
  mounted() {
    this.handleQuery();
  }
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
