<template>
  <div class="form" style="width: 60%;margin: 30px;">
    <!-- <el-button @click="testDemo">默认按钮</el-button> -->
    <el-form v-model="form" ref="form"  style="width:70%">
      <!--商品 店铺  自定义-->
      <el-form-item prop="circleName" label="圈名称：">
        <el-button @click="selectShop" size="mini" type="success">选择商品</el-button>
        <span>或</span>
        <el-button @click="selectClass" size="mini" type="success">选择类目</el-button>
      </el-form-item>
      <div style="height:30px; border-bottom:1px solid #C1C1C1;margin-left:60px;">
        <el-input :disabled="isShowCircleNameInput" @change="changeInput" v-model="form.circleName" placeholder="请选择或输入圈名称"></el-input>
      </div>
      <el-form-item prop="circleName" label="">
        <span sytle="height:20px;width:200px;border-bottom:1px solid red;"></span>
      </el-form-item>
      <el-form-item prop="circleIntro" label="圈子简介 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleIntro" placeholder="请输入圈子简介（最多200字）" rows=4 resize="none" maxlength="200"></el-input>
      </el-form-item>
      <el-form-item prop="circleNotice" label="圈子公告 (选填)：">
        <el-input class="formInput" type="textarea" v-model="form.circleNotice" placeholder="请输入圈子公告" maxlength="200" rows=4 clearable resize="none"></el-input>
      </el-form-item>
      <el-form-item prop="circleTypeId" label-width="90px"  label="圈类型：">
          <el-button type="success" size="mini" style="margin-right: 20px;" @click="setTpye">设置类型</el-button>
          <!-- <el-input disabled v-model="form.remark" placeholder="请输入备注信息"></el-input> -->
      </el-form-item>
        <div style="height:30px; border-bottom:1px solid #C1C1C1;margin:0 0 10px 60px;">
          <span v-for="(item, index) in circleTypeCheckbox" :key="index">{{item.typeNmae}}&nbsp;&nbsp;</span>
        </div>
      <!--标签-->
      <!-- <el-form-item prop="circleLableList" label-width="90px" label="圈子标签：">
        <el-button type="success" size="mini" style="margin-right: 20px;" @click="setLabel">设置标签</el-button>
      </el-form-item> -->
       <!-- <div style="height:30px; border-bottom:1px solid #C1C1C1;margin:0 0 10px 60px;">
          <span v-for="(item, index) in circleLabelCheckbox" :key="index">{{item.labelName}}&nbsp;&nbsp;</span>
        </div> -->
      <el-form-item prop="circleHead" label="圈子头像：">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          name="filename"
          :on-success="handleAvatarSuccess"
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
        <el-button style="margin:20px 10px;" @click="getType(item)" v-for="(item, index) in typeButton" :key="index">{{item.categoryName}}</el-button>
      </div>
      <div class="line"></div>
        <el-button type="info" style="margin:20px 10px;" @click="cancelSelTypeBtn(item)" v-for="(item, index) in getTypeButton" :key="index">{{item.categoryName}}</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setTypeDiag = false">取 消</el-button>
        <el-button type="primary" @click="saveSetType">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下边是选择圈名称tree弹窗 -->
    <el-dialog
      title="请选择圈名称"
      :visible.sync="circleNameDialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="circleNameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="circleNameDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下边是选择商品-弹出框 -->
    <el-dialog
      title="选择商品"
      :visible.sync="isShowSelectedShop"
      width="50%">
      <div>
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="">
            <el-input v-if="circleTitle == '选择商品'" placeholder="请输入商品名称" style="width:300px;" v-model="searchShopForm.skuName"></el-input>
          </el-form-item>
          <el-button @click="searchShopOrClass" type="primary">搜索</el-button>
        </el-form>
        <el-table :data="getShopList" @selection-change="handleSelectionChangeCommit">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品SPU ID" prop="skuId"></el-table-column>
          <el-table-column label="签值商品名称" prop="skuName"></el-table-column>
          <el-table-column label="购买人数" prop="buyNums"></el-table-column>
          <el-table-column label="购买人" prop="circleMembers">
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:center; margin:10px;" class="block">
        <el-pagination
          @size-change="handleSizeChangeShop"
          @current-change="handleCurrentChangeShop"
          :current-page="searchShopForm.pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="searchShopForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCountTotalShop">
        </el-pagination>
      </div>
      <span slot="footer">
        <el-button type="info" @click="saveSelectedShop">确定</el-button>
        <el-button @click="isShowSelectedShop = false">取消</el-button>
        <!-- <el-button type="info" @click="circleChange = false">提交</el-button> -->
      </span>
    </el-dialog>
    <!-- 下边是选择类目-弹出框 -->
    <el-dialog
      title="选择类目"
      :visible.sync="isShowSelectedClass"
      width="50%">
      <div>
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="">
            <el-input placeholder="请输入类目" style="width:300px;" v-model="searchShopClass.categoryName"></el-input>
          </el-form-item>
          <el-button @click="searchShopOrClassTwo" type="primary">搜索</el-button>
        </el-form>
        <el-table :data="getClassList" @selection-change="handleSelectionChangeCommitClass">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品SPU ID" prop="categoryId"></el-table-column>
          <el-table-column label="签值商品名称" prop="categoryName"></el-table-column>
          <el-table-column label="购买人数" prop="buyNums"></el-table-column>
          <el-table-column label="购买人" prop="circleMembers">
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:center; margin:10px;" class="block">
        <el-pagination
          @size-change="handleSizeChangeClass"
          @current-change="handleCurrentChangeClass"
          :current-page="searchShopClass.pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="searchShopClass.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCountTotalClass">
        </el-pagination>
      </div>
      <span slot="footer">
        <el-button type="info" @click="saveSelectedClass">确定</el-button>
        <el-button @click="isShowSelectedClass = false">取消</el-button>
        <!-- <el-button type="info" @click="circleChange = false">提交</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
//  ========获取圈类型=======基于商品创建圈======获取圈标签=========头像===选择商品或者类目==选择商品=======类目
import { getCircleType,creatCircleByPro, getCircleLable,uploadcircle, searchShopOrClass, selectShop, selectClass } from '@/api/circle/customCreatCircle'
export default {
  data() {
    return {
      pageCountTotalShop: '', // 选择商品分页的总条数
      pageCountTotalClass: '', // 选择商品分页的总条数
      isShowCircleNameInput: true,
    	isProductChoose: false,
      getCheckedShopDiag: [],
      getCheckedClassDiag: [],
      getShopList: [],
      getClassList: [],
      searchShopForm: {
        pageIndex: 1,
        pageSize: '5',
        skuName: ''
      },
      searchShopClass: {
        pageIndex: 1,
        pageSize: '5',
        categoryName: ''
      },
      circleTitle: '选择商品',
      isShowSelectedClass: false,
      isShowSelectedShop: false,
      zongxiangLbShow: {},
      circleNameDialogVisible: false,
      onevalue: '',
      oneId: '', // 保存一级的id
      twoId: '', // 保存一级的id
      threeId: '', // 保存一级的id
      twovalue: '',
      threevalue: '',
      oneClass: [],
      twoClass: [],
      threeClass: [],
    	lableName: '',//搜索圈标签input框内容
    	setLabelDiag: false,//控制设置标签弹框
    	labelButton: [], // 接口搜索完毕展示的标签
    	getLabelButton: [], // 点击选中的标签按钮
    	circleLabelCheckbox: [],//页面展示所选的标签
    	setTypeDiag: false,//控制设置类型弹框
    	categoryName: '', //搜索类型的input内容
    	typeButton: [], // 接口获取类型按钮
    	getTypeButton: [], // 点击选中的类型按钮
    	circleTypeCheckbox: [
    		{
    			circleTypeId: '',
    			typeNmae: ''
    		}
    	],//页面展示所选的类型
      isUpload: false,
      options2: [{
        label: '江苏',
        children: []
      }, {
        label: '浙江',
        children: []
      }],
      props: {
          value: 'params',
          children: 'children'
      },
      // 下边是类型lebel button
      form: {
        channelType: "1", //	用户id
        circleName: "", //
        circleIntro: "", //	圈子简介
        circleNotice: "", //	圈子公告
        circleTypeId: "", //	圈子类型
        circleLableList: [], //	圈子标签id
        hierarchy: "", //	圈层级
        circleHead: "", //	圈头像
        remark: "" //	备注
      },
      imageUrl: false
    };
  },
  methods: {
    // 选择商品的分页事件
    handleCurrentChangeShop(val) {
      this.searchShopForm.pageIndex = val
      this.selectShopPort()
    },
    handleSizeChangeShop(val) {
      this.searchShopForm.pageSize = val
      this.selectShopPort()
    },
    // 选择类目的分页事件
    handleSizeChangeClass(val) {
      this.searchShopForm.pageIndex = val
      this.selectClassPort()
    },
    handleCurrentChangeClass(val) {
      this.searchShopForm.pageSize = val
      this.selectClassPort()
    },
    // 输入框输入事件
    changeInput(data) {

      // delete(this.form.categoryOrSkuId)
      // delete(this.form.categoryOrSkuType)
    },
    saveSelectedShop() {
      if (this.getCheckedShopDiag.length <= 0) {
        this.$message.info('请选择商品。')
        return
      }
      if (this.getCheckedShopDiag.length > 1) {
        this.$message.info('只能选择一项。')
        return
      }
      this.isShowCircleNameInput = false
      this.form.circleName = this.getCheckedShopDiag[0].skuName
      this.form.categoryOrSkuId = this.getCheckedShopDiag[0].skuId
		  this.circleTypeCheckbox[0].circleTypeId = 'FL100100100100'
		  this.circleTypeCheckbox[0].typeNmae = '商品圈'
		  this.form.circleTypeId = 'FL100100100100'
		  this.setTypeDiag = false;
		  this.isProductChoose = true
      this.form.categoryOrSkuType = '1'
      this.isShowSelectedShop = false
      this.isShowSelectedClass = false
      // this.selectShopPort()
    },
    saveSelectedClass() {
      if (this.getCheckedClassDiag.length <= 0) {
        this.$message.info('请选择类目。')
        return
      }
      if (this.getCheckedClassDiag.length > 1) {
        this.$message.info('只能选择一项。')
        return
      }
      this.isShowCircleNameInput = false
      this.form.categoryOrSkuType = '2'
      this.form.circleName = this.getCheckedClassDiag[0].categoryName
      this.form.categoryOrSkuId = this.getCheckedClassDiag[0].categoryId
      this.form.hierarchy = this.getCheckedClassDiag[0].level
      if(this.getCheckedClassDiag[0].level == 1){
			  this.circleTypeCheckbox[0].circleTypeId = 'FL100'
			  this.circleTypeCheckbox[0].typeNmae = '一级类目'
			  this.form.circleTypeId = 'FL100'
			  this.setTypeDiag = false;
			  this.isProductChoose = true
      }else if(this.getCheckedClassDiag[0].level == 2){
			  this.circleTypeCheckbox[0].circleTypeId = 'FL100100'
			  this.circleTypeCheckbox[0].typeNmae = '二级类目'
			  this.form.circleTypeId = 'FL100100'
			  this.setTypeDiag = false;
			  this.isProductChoose = true
      }else if(this.getCheckedClassDiag[0].level == 3){
			  this.circleTypeCheckbox[0].circleTypeId = 'FL100100100'
			  this.circleTypeCheckbox[0].typeNmae = '三级类目'
			  this.form.circleTypeId = 'FL100100100'
			  this.setTypeDiag = false;
			  this.isProductChoose = true
      }
      this.isShowSelectedShop = false
      this.isShowSelectedClass = false
      this.selectClassPort()
    },
    handleSelectionChangeCommit(val) {
      this.getCheckedShopDiag = val
    },
    handleSelectionChangeCommitClass(val) {
    	console.log(val)
      this.getCheckedClassDiag = val
    },
    searchShopOrClass() {
      this.selectShopPort()
    },
    searchShopOrClassTwo() {
      this.selectClassPort()
    },
    // 点击选择商品
    selectShop() {
      this.form.level = ''
      this.isShowSelectedShop = true
    },
    // 调用选择商品接口
    selectShopPort() {
      selectShop(this.searchShopForm)
      .then(res => {
        this.getShopList = res.data
        this.pageCountTotalShop = Number(res.totalSize)
        this.$message.success('获取商品成功')
      })
      .catch(() => {
        this.$message.error('获取商品失败')
      })
    },
    // 调用选择类目接口
    selectClassPort() {
      selectClass(this.searchShopClass)
      .then(res => {
        this.pageCountTotalClass = Number(res.totalSize)
        this.getClassList = res.data
        this.$message.success('获取类目成功')
      })
      .catch(() => {
        this.$message.error('获取类目失败')
      })
    },
    // 点击选择类目
    selectClass() {
      this.isShowSelectedClass = true
    },
    selectCircleName() {
      this.circleNameDialogVisible = true
    },
    oneChange(data) {
      this.form.circleName = this.onevalue[1]
      var obj = {}
      obj.level = '1'
      obj.id = data[0]
      this.getCircleName(obj)
    },
    twoChange(data) {
      this.form.circleName = this.twovalue[1]
      var obj = {}
      obj.level = '2'
      obj.id = data[0]
      this.getCircleName(obj)
    },
    threeChange(data) {
      this.form.circleName = this.threevalue[1]
    },
    // testDemo() {
    //   var obj = {}
    //   obj.id = '1'
    //   obj.level = '0'
    //   this.getCircleName(obj)
    // },
    getCircleName(obj) {
      searchShopOrClass(obj)
      .then(res => {
        if (obj.level == '0') {
          res.data.forEach(ele => {
            ele.params = [ele.categoryCode, ele.categoryName]
          });
          this.oneClass = res.data
        } else if (obj.level == '1'){
          res.data.forEach(ele => {
            ele.params = [ele.categoryCode, ele.categoryName]
          });
          this.twoClass = res.data
        } else if (obj.level == '2') {
          res.data.forEach(ele => {
            ele.params = [ele.categoryCode, ele.categoryName]
          });
          this.threeClass = res.data
        }
        // debugger
        // this.options2 = res.data
        // this.options2.forEach(ele => {
        //   ele.label = ele.categoryName
        //   ele.params = [ele.id, ele.level]
        //   ele.children = []
        // })
        this.$message.success('成功获取圈名称')
      })
      .catch(() => {
        this.$message.error('成功获取圈名称')
      })
    },
    // 圈名称-级联-选择
    // handleItemChange(val) {
    //   // debugger
    //   console.log('active item:', val);
    //   // this.get
    //   setTimeout(_ => {
    //     if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
    //       this.options2[0].cities = [{
    //         label: '南京'
    //       }];
    //     } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
    //       this.options2[1].cities = [{
    //         label: '杭州'
    //       }];
    //     }
    //   }, 300);
    // },
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
    	this.getLabelButton = [item]
// 			//判断下面的数组存不存在这个值  不存在的值是-1
//  var index = this.getLabelButton.indexOf(item)
//    if (index >= 0) {
//      return
//    } else if (index < 0) {
//      this.getLabelButton.push(item)
//    }
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
        this.form.circleLableList = this.getLabelButton
  			this.setLabelDiag = false
    	}
    },

    // 设置类型--点击事件
    setTpye() {
    	this.categoryName = ''
    	this.typeButton = []
    	this.getTypeButton =[]
    	if(this.isProductChoose == true){
    		this.$message.warning('选择完商品或类目，圈类型自动生成，不可设置！')
    		this.setTypeDiag = false;
    	}else{
    		this.setTypeDiag = true;
    	}
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
	          this.$message.success("获取类型成功")
	        })
	        .catch(() => {
	          this.$message.error("获取类型失败")
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
	    			obj.typeNmae = this.getTypeButton[i].categoryName
	    			obj.circleTypeId = this.getTypeButton[i].categoryCode
	    			this.form.circleTypeId = this.getTypeButton[i].categoryCode
	    			arr.push(obj)
	    		}
	    		this.circleTypeCheckbox = arr
	    		console.log(this.circleTypeCheckbox)
//	    		circleTypeId:"FL100100"
//					typeNmae:"二级类目"
	    		//this.form.hierarchy = this.circleTypeCheckbox[0].categoryLevel
					this.setTypeDiag = false
	    	}
    },

		//确认新增按钮
    saveAdd () {
      // if (this.)
//		this.$refs.iconUpload.submit()
    	if(!this.form.circleName || !this.form.circleTypeId || !this.form.circleLableList){
    		this.$message.warning('圈名称、类型、标签、头像不能为空！')
    		return
    	}else{
				if(this.isUpload == false){
					this.$message.warning('请上传头像，如已上传，请耐心等待')
				}else if(this.form.circleHead){
		    		creatCircleByPro(this.form).then(res => {
			    			if(res.data == true && res.status == '200'){
			    				this.$message.success('创建成功！')
			    				this.$router.push('/circlemanage/manage/info')
			    			} else {
			    				this.$message.error(res.errorMsg)
                }
		    		})
				}
    	}
    },

    back() {
      this.$router.push('/circlemanage/manage/info')
    },
    handleAvatarSuccess() {
      console.log('gjfdjlk')
    },
    beforeAvatarUpload(file){
    	let fd = new FormData()
    	fd.append('file',file)
    	fd.append('channelId','1')
				uploadcircle(fd).then(res =>{
					if(res.data != ''){
						this.$message.success('圈子头像上传成功！')
						this.form.circleHead = res.data
						this.isUpload =true
						this.imageUrl = true
					}
				})
    },
  },
  mounted () {
    // var obj = {}
    // obj.id = '1'
    // obj.level = '0'
    // this.getCircleName(obj)
  }
}
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
