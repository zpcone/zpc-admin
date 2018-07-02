<template>
  <div class="form" style="width: 60%;margin: 30px;">
    <el-form v-model="form" ref="form"  style="width:70%">
      <!--商品 店铺  自定义-->
      <el-form-item prop="circleLableList" label="渠道类型：">
        <el-select clearable placeholder="请选择" v-model="form.channelType">
          <el-option label="电商" value="1"></el-option>
          <el-option label="社交" value="2"></el-option>
				</el-select>
      </el-form-item>
      <el-form-item prop="circleName" label="圈名称：">
        <el-input class="formInput" v-model.trim="form.circleName" placeholder="请输入圈名" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item prop="circleIntro" label="圈子简介 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleIntro" placeholder="请输入圈子简介（最多200字）" rows=4 resize="none" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item prop="circleNotice" label="圈子公告 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleNotice" placeholder="请输入圈子公告" maxlength="200" rows=4 clearable resize="none"></el-input>
      </el-form-item>
      <!-- <span>圈子类型</span> -->
      <el-form-item prop="circleTypeId" label="圈类型：">
        <br>
          <el-button type="success" size="mini" style="margin-right: 20px;" @click="setTpye">设置类型</el-button>
          <el-button v-for="(item, index) in circleTypeCheckbox" :key="index">{{item.typeNmae}}</el-button>
      </el-form-item>
      <!--标签-->

      <!-- <el-form-item prop="circleLableList" label="圈子标签：">
        <br>
        <el-button type="success" size="mini" style="margin-right: 20px;" @click="setLabel">设置标签</el-button>
          <el-button style="margin-left:20px;" v-for="(item, index) in circleLabelCheckbox" :key="index">{{item.labelName}}</el-button>
      </el-form-item> -->
      <el-form-item prop="circleHead" label="圈子头像：">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          name="filename"
          :before-upload="beforeAvatarUpload"
          enctype="multipart/form-data">
          <img v-if="imageUrl" :src="form.circleHead" class="avatar">
          	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--坐标   （基于场景才显示坐标）-->
      <!--头像-->
      <!--附加信息-->
      <el-form-item prop="remark" label="备注：(选填)">
        <el-input v-model="form.remark" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="back">返回</el-button>
        <el-button type="primary" @click="saveAdd">确认新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 下边是设置标签弹出框 -->
    <el-dialog
      title="设置标签"
      :visible.sync="setLabelDiag"
      width="500px"
      :before-close="handleClose">
      <el-input style="width: 200px;" v-model="setCircleForm.lableName" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" @click="searchLabel">搜索</el-button>
      <br>
      <div style="margin-top:20px;">
        <el-button style="margin:20px 10px;" @click="getLabelBtn(item)" v-for="(item, index) in labelButton" :key="index">{{item.labelName}}</el-button>
      </div>
      <!-- <span></span> -->
      <div class="line"></div>
        <el-button type="info" style="margin:20px 10px;" @click="cancelSelLabelBtn(item)" v-for="(item, index) in getLabelButton" :key="index">{{item.labelName}}</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setLabelDiag = false">取 消</el-button>
        <el-button type="primary" @click="saveSetLabel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下边是设置标签类型弹出框 -->
    <el-dialog
      title="设置类型"
      :visible.sync="setTypeDiag"
      width="500px">
      <el-input style="width: 200px;" v-model="setTypeForm.categoryName" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" @click="searchType">搜索</el-button>
      <br>
      <div style="margin-top:20px;">
        <el-button style="margin:20px 10px;" @click="getType(item)" v-for="(item, index) in typeButton" :key="index">{{item.categoryName}}</el-button>
      </div>
      <div class="line"></div>
        <el-button type="info" style="margin:20px 10px;" @click="cancelSelTypeBtn(item)" v-for="(item, index) in getTypeButton" :key="index">{{item.categoryName}}</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setTypeDiag = false">取 消</el-button>
        <el-button type="primary" @click="saveSetType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//  =====自定义创建圈=========获取圈标签=======圈类型====上传图片
import {
  customCreateCircle,
  getCircleLabel,
  getLabelType,
  uploadcircle
} from "@/api/circle/info";
export default {
  data() {
    return {
      imageUrl: false,
      lableName: '',//搜索圈标签input框内容
      setLabelDiag: false,
      labelButton: [], // 接口获取类型按钮
      getLabelButton: [], // 点击选中的类型按钮
      circleLabelCheckbox: [],
      setTypeDiag: false,
      typeButton: [], // 接口获取类型按钮
      getTypeButton: [], // 点击选中的类型按钮
      categoryName: '', //搜索类型的input内容
      // 下边是类型lebel button
      circleTypeCheckbox: [],
      isUpload: false,
      setCircleForm: {pageNum: '1', pageSize: '10', categoryName: ''},
      setTypeForm: {pageNum: '1', pageSize: '10', categoryName: '' },// 设置类型表单
      // optionsSelect: [{value: '1'}]
      form: {
        channelType: '',
        userId: "1", //	用户id
        circleName: "", // 圈子名称
        circleIntro: "", //	圈子简介
        circleNotice: "", //	圈子公告
        circleTypeId: "", //	圈子类型
        circleLableList: [], //	圈子标签id-集合
        // hierarchy: "1", //	圈层级
        circleHead: "", //	圈头像
        remark: "" //	备注
      },
      rules: {
        circleName: [
          { required: true, message: '请输入圈子名称', trigger: 'change' },
        ],
        circleIntro: [
          { required: true, message: '请输入圈子简介', trigger: 'change' }
        ],
        remark: [
          { required: false, message: '请选择日期', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 上传图片
//  handleAvatarSuccess(res, file) {
//       this.imageUrl = URL.createObjectURL(file.raw);
//  },

// 设置标签--点击事件
	setLabel() {
	    	this.setLabelDiag = true;
	    	this.lableName = ''
	    	this.labelButton = []
	    	this.getLabelButton =[]
	},

	// 点击查询-查询标签
	searchLabel() {
	  this.getLabel();
	},

    // 获取圈标签
    getLabel() {
      getCircleLabel(this.setCircleForm)
        .then(res => {
          // debugger
          this.labelButton = res.data
          this.$message.success("获取标签成功");
        })
        .catch(() => {
          this.$message.error("获取标签失败");
        });
    },

    getLabelBtn(item) {
    	this.getLabelButton = [item]
//    var index = this.getLabelButton.indexOf(item)
//    if (index >= 0) {
//      return
//    } else if (index < 0) {
//      this.getLabelButton.push(item)
//    }
    },

    cancelSelLabelBtn(item) {
      var index = this.getLabelButton.indexOf(item)
      this.getLabelButton.splice(index, 1)
    },

    // 保存设置标签
    saveSetLabel() {
      var ids = []
    	if (!this.getLabelButton.length) {
        this.$message.warning('未选择标签！')
    		return
    	} else {
        // debugger
        this.getLabelButton.forEach(el => {
          ids.push(String(el.id))
        })
    		this.circleLabelCheckbox = this.getLabelButton
        this.form.circleLableList = this.getLabelButton
        // this.form.circleType = '1'
        // this.form.circleLabelList.forEach(el => {
        //   el.lableId = el.id
        //   el.lableName = el.labelName
        //   delete(el.id)
        //   delete(el.labelName)
        //   // ids.push(String(el.id))
        // })
  			this.setLabelDiag = false
    	}
    },

    // 设置类型--点击事件
    setTpye() {
      this.setTypeDiag = true;
    	this.categoryName = ''
    	this.typeButton = []
    	this.getTypeButton =[]
    },

    // 点击查询-查询类型
    searchType() {
      this.getLabelType();
    },

    // 获取圈类型
    getLabelType() {
      getLabelType(this.setTypeForm)
        .then(res => {
          this.typeButton = res.data
          this.$message.success("获取标签成功");
        })
        .catch(() => {
          this.$message.error("获取标签失败");
        });
    },

    getType(item) {
      this.getTypeButton = [item]
      // this.getTypeButton = item
      // var index = this.getTypeButton.indexOf(item)
      // if (index >= 0) {
      //   return
      // } else if (index < 0) {
      //   this.getTypeButton.push(item)
      // }
    },

    cancelSelTypeBtn(item) {
      var index = this.getTypeButton.indexOf(item)
      this.getTypeButton.splice(index, 1)
    },

    // 保存设置类型设置类型
    saveSetType() {
	    	if (!this.getTypeButton.length) {
	    		this.$message.warning('未选择类型！')
	    		return
	    	} else {
	    		let arr = []
	    		for(let i=0;i<this.getTypeButton.length;i++){
            let obj ={}
	    			//obj.categoryLevel = this.getTypeButton[i].categoryLevel
	    			obj.typeNmae = this.getTypeButton[i].categoryName
	    			obj.circleTypeId = this.getTypeButton[i].categoryCode
	    			this.form.circleTypeId = this.getTypeButton[i].categoryCode
	    			arr.push(obj)
          }
          // debugger
	    		this.circleTypeCheckbox = arr
	    		//this.form.hierarchy = this.circleTypeCheckbox[0].categoryLevel
					this.setTypeDiag = false
	    	}
    },

    saveAdd() {
      console.log(this.form)
      // 创建圈子接口
    	if(!this.form.circleName || !this.form.circleTypeId || !this.form.circleLableList){
    		this.$message.warning('圈名称、类型、标签、头像不能为空！')
    		return
    	}else{
				if(this.isUpload == false){
					this.$message.warning('请上传头像，如已上传，请耐心等待')
				}else if(this.form.circleHead){
		    		customCreateCircle(this.form).then(res => {
              this.$message.success('创建成功！')
              this.$router.push('/circlemanage/manage/info')
		    		})
				}
    	}
//    createCircle() {
//      customCreateCircle(this.form)
//        .then(res => {
//          console.log(res);
//          this.$message.success("创建成功");
//        })
//        .catch(() => {
//          this.$message.error("创建失败");
//        });
//    },
   },
    back() {
//    this.$router.go(-1);
      this.$router.push('/circlemanage/manage/info');
    },

    beforeAvatarUpload(file){
    	let fd = new FormData()
    	fd.append('file',file)
    	fd.append('channelId','1')
				uploadcircle(fd).then(res =>{
					if(res.data != ''){
						this.$message.success('圈子头像上传成功！')
            this.form.circleHead = res.data
            this.imageUrl = true
						this.isUpload =true
					}
				})
    }
  }
};
</script>

<style>
.line {
  border: 1px solid #e4e4e4;
}
/* 下边是图片上传的样式 */
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
