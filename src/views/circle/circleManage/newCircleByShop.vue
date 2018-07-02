<template>
  <div class="form" style="width: 60%;margin: 30px;">
    <el-form v-model="form" ref="form"  style="width:70%">
      <!--商品 店铺  自定义-->
      <el-form-item prop="circleName" label="圈名称 ：">
        <el-input class="formInput" v-model.trim="form.circleName" placeholder="请输入圈名" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item prop="circleIntro" label="圈子简介 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleIntro" placeholder="请输入圈子简介（最多200字）" rows=4 resize="none" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item prop="circleNotice" label="圈子公告 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleNotice" placeholder="请输入圈子公告" maxlength="200" rows=4 clearable resize="none"></el-input>
      </el-form-item>
      <!-- <span>圈子类型</span> -->
      <el-form-item prop="circleType" label="圈类型：">
        <br>
          <el-button type="success" size="mini" style="margin-right: 20px;" @click="setTpye">设置类型</el-button>
          <span style="margin-left:20px;border:1px solid #ccc;padding:10px;background-color: #C7C9CB;" v-for="(item, index) in circleTypeCheckbox" :key="index">{{item.typeNmae}}</span>
      </el-form-item>
      <!--标签-->
      <el-form-item prop="circleLableI" label="圈子标签：">
        <br>
        <el-button type="success" size="mini" style="margin-right: 20px;" @click="setLabel">设置标签</el-button>
          <span style="margin-left:20px;border:1px solid #ccc;padding:10px;background-color: #C7C9CB;" v-for="(item, index) in circleLabelCheckbox" :key="index">{{item.labelName}}</span>
      </el-form-item>
      <!--层级-->
      <el-form-item prop="hierarchy" label="圈子层级：">
        <el-input disabled v-model="form.hierarchy" placeholder=""></el-input>
      </el-form-item>
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
      <el-form-item prop="remark" label="备注：">
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
      width="500px">
      <el-input style="width: 200px;" v-model="lableName" placeholder="请输入搜索内容" clearable></el-input>
      <el-button type="primary" @click="searchLabel">搜索</el-button>
      <br>
      <div style="margin-top:20px;">
        <el-button style="margin:20px 10px;" @click="getLabelBtn(item)" v-for="(item, index) in labelButton" :key="index">{{item.labelName}}</el-button>
      </div>
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
      <el-input style="width: 200px;" v-model="categoryName" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" @click="searchType">搜索</el-button>
      <br>
      <div style="margin-top:20px;">
        <el-button style="margin:20px 10px;" @click="getType(item)" v-for="(item, index) in typeButton" :key="index">{{item.typeNmae}}</el-button>
      </div>
      <div class="line"></div>
        <el-button type="info" style="margin:20px 10px;" @click="cancelSelTypeBtn(item)" v-for="(item, index) in getTypeButton" :key="index">{{item.typeNmae}}</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setTypeDiag = false">取 消</el-button>
        <el-button type="primary" @click="saveSetType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//  ========获取圈类型=======基于商品创建圈======获取圈标签=========头像
//import { getCircleType,creatCircleByPro, getCircleLable,uploadcircle } from '@/api/circle/customCreatCircle'
//这个页面是从商品创建直接复制过来的，还不确定做不做，所以暂时先放这（5.11）
export default {
  data() {
    return {
    	lableName: '',//搜索圈标签input框内容
    	setLabelDiag: false,//控制设置标签弹框
    	labelButton: [], // 接口搜索完毕展示的标签
    	getLabelButton: [], // 点击选中的标签按钮
    	circleLabelCheckbox: [],//页面展示所选的标签
    	setTypeDiag: false,//控制设置类型弹框
    	categoryName: '', //搜索类型的input内容
    	typeButton: [], // 接口获取类型按钮
    	getTypeButton: [], // 点击选中的类型按钮
    	circleTypeCheckbox: [],//页面展示所选的类型
    	isUpload: false,
      // 下边是类型lebel button
      form: {
        //userId: "1", //	用户id
        circleName: "", //
        circleIntro: "", //	圈子简介
        circleNotice: "", //	圈子公告
        circleType: "", //	圈子类型
        circleLableI: "", //	圈子标签id
        hierarchy: "", //	圈层级
        circleHead: "", //	圈头像
        remark: "" //	备注
      },
      imageUrl: ''
    };
  },
  methods: {
    // 设置标签--点击事件
    setLabel() {
    	this.setLabelDiag = true;
    	this.lableName = ''
    	this.labelButton = []
    	this.getLabelButton =[]
    },

    // 设置标签弹框-查询标签
    searchLabel() {
      var obj = {};
      obj.pageNum = '1'
      obj.pageSize = '10'
      obj.lableName = this.lableName
      getCircleLable(obj)
        .then(res => {
          this.labelButton = res.data
          this.$message.success("获取标签成功");
        })
        .catch(() => {
          this.$message.error("获取标签失败");
        });
    },

    //搜索出来的标签的点击事件
    getLabelBtn(item) {
 			//判断下面的数组存不存在这个值  不存在的值是-1
    var index = this.getLabelButton.indexOf(item)
      if (index >= 0) {
        return
      } else if (index < 0) {
        this.getLabelButton.push(item)
      }
    },

		//弹框最下面的标签数组的点击事件
    cancelSelLabelBtn(item) {
      var index = this.getLabelButton.indexOf(item)
      this.getLabelButton.splice(index,1)
    },

    // 保存设置标签
    saveSetLabel() {
    	if (!this.getLabelButton.length) {
    		this.$message.warning('未选择标签！')
    		return
    	} else {
    		this.circleLabelCheckbox = this.getLabelButton
    		this.form.circleLableI = this.getLabelButton
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

    // 设置类型按钮的  搜索
    searchType() {
	      var obj = {};
	      obj.pageNum = '1'
	      obj.pageSize = '10'
	      obj.categoryName = this.categoryName
	      getCircleType(obj)
	        .then(res => {
	          this.typeButton = res.data
	          this.$message.success("获取类型成功");
	        })
	        .catch(() => {
	          this.$message.error("获取类型失败");
	        });
    },

    //搜索出来的类型的点击
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

    //选择类型的点击
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
    			obj.typeNmae = this.getTypeButton[i].typeNmae
    			obj.circleType = this.getTypeButton[i].id
    			this.form.circleType = this.getTypeButton[i].id
    			arr.push(obj)
    		}
    		this.circleTypeCheckbox = arr
    		//this.form.hierarchy = this.circleTypeCheckbox[0].categoryLevel
				this.setTypeDiag = false
    	}
    },

		//确认新增按钮
    saveAdd () {
//		this.$refs.iconUpload.submit()
    	if(!this.form.circleName || !this.form.circleType || !this.form.circleLableI){
    		this.$message.warning('圈名称、类型、标签、头像不能为空！')
    		return
    	}else{
//  		this.$refs.iconUpload.submit()
				if(this.isUpload == false){
					this.$message.warning('请上传头像，如已上传，请耐心等待')
				}else if(this.form.circleHead){
		    		creatCircleByPro(this.form).then(res => {
			    			if(res.data == true && res.status == '200'){
			    				this.$message.success('创建成功！')
			    				this.$router.push('/circlemanage/manage/info')
			    				this.form = {
							        circleName: "", //
							        circleIntro: "", //	圈子简介
							        circleNotice: "", //	圈子公告
							        circleType: "", //	圈子类型
							        circleLableI: "", //	圈子标签id
							        hierarchy: "", //	圈层级
							        circleHead: "", //	圈头像
							        remark: "" //	备注
			    				}
			    			}
		    		})
				}
    	}
    },

    back() {
      this.$router.push('/circlemanage/manage/info');
    },

    beforeAvatarUpload(file){
    	let fd = new FormData()
    	fd.append('file',file)
				uploadcircle(fd).then(res =>{
					if(res.data != ''){
						this.$message.success('圈子头像上传成功！')
						this.form.circleHead = res.data
						this.isUpload =true
					}
				})
    },

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
