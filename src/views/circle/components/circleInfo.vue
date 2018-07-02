<template>
	<section class="info">
		<p class="header">圈子的基本信息
      <!-- <el-button style="float:right;margin:6px 10px;" size="mini" type="info">信息按钮</el-button> -->
      <el-button @click="goBack" style="float:right;margin:6px 10px;" size="mini" type="info">返回</el-button>
      <el-button style="float:right;margin:6px 10px;" size="mini" type="info" @click="saveClick">保存</el-button>
    </p>
		<table width="100%" border="1">
			<tr>
				<th class="w15 grayBackground">圈ID</th>
				<th class="textAlignL">{{circleBasicInfo.circleId}}</th>
				<th class="w15 grayBackground">圈子名称</th>
				<!--<td class="w15 textAlignL">{{circleBasicInfo.circleName}}</td>-->
				<td class="textAlignL" @dblclick="editGroupName = true">
				  <span v-if="!editGroupName">{{circleBasicInfo.circleName}}</span>
				  <span v-if="!editGroupName" style="color: red;font-size: 12px;margin-left: 20px;cursor: pointer;">双击可编辑</span>
				  <el-input v-if="editGroupName" v-model="circleBasicInfo.circleName" placeholder="请输入圈名称" style="width: 200px;" maxlength="8" clearable></el-input>
				  <el-button v-if="editGroupName"  style="margin-left: 10px;color: springgreen;" type="text" icon="el-icon-success" @click="editGroupName = false"></el-button>
				</td>

				<th class="w15 grayBackground">圈子头像</th>
				<th class="w15 textAlignL"> <img style="width:30px;height:30px;" :src="circleBasicInfo.circleHead" alt="头像">
          <span  @click="editAvatar = true" style="line-height:36px;float:right;cursor:pointer;color:#409EFF;">点击编辑</span>
          <!-- <span style="line-height:26px;float:right;cursor:pointer;color:#409EFF;">点击编辑</span> -->
        </th>
			</tr>
			<tr>
				<td class="w15 grayBackground">创建方式</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.createType}}</td>
				<td class="w15 grayBackground">创建时间</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.createTime}}</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈标签</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.circleLabel}}</td>
				<td class="w15 grayBackground">圈层级</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.hierarchy}}</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">类型</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.channelType}}</td>
				<td class="w15 grayBackground">圈简介</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.circleContent}}
          <i @click="circleSynopsis" style="float:right;cursor:pointer;color:#66b1ff;" class="el-icon-d-arrow-right"></i>
          <!-- <span @click="circleSynopsis" style="float:right;font-size:16px;cursor:pointer;color:#66b1ff;">更多</span> -->
        </td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈地理位置</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.location}}</td>
				<td class="w15 grayBackground">圈公告</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.circleNotice}}
          <i  @click="circleAnnouncement" style="float:right;cursor:pointer;color:#66b1ff;" class="el-icon-d-arrow-right"></i>
          <!-- <span  @click="circleAnnouncement" style="float:right;font-size:16px;cursor:pointer;color:#66b1ff;">更多</span> -->
        </td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈所属城市</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.circleInCity}}</td>
				<td class="w15 grayBackground">圈人数</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.memberNum}}</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈等级</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.level}}</td>
				<!-- <td class="w15 grayBackground">圈活跃值</td> -->
				<!-- <td class="textAlignL" colspan="2">{{circleBasicInfo.circleActive}}</td> -->
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈本身能量</td>
				<td colspan="2" class="textAlignL">{{circleBasicInfo.circleOwnEnergyValue}}</td>
				<td class="w15 grayBackground">圈豆账户</td>
				<td class="textAlignL" colspan="2">{{circleBasicInfo.circleAccount}}</td>
			</tr>
			<tr>
				<td rowspan="3" class="w15 grayBackground">圈能量: </td>
				<td colspan="2" class="textAlignL">豆总数：{{circleBasicInfo.beansTotalNumber}}</td>
				<td colspan="3" class="textAlignL">豆均值：{{circleBasicInfo.beansAverageValue}}</td>
			</tr>
			<tr>
				<td colspan="2" class="textAlignL">币总数：{{circleBasicInfo.coinTotalValue}}</td>
				<td colspan="3" class="textAlignL">币均值：{{circleBasicInfo.coinTotalValue}}</td>
			</tr>
			<tr>
				<!-- <td colspan="2" class="textAlignL">人脉值：{{circleBasicInfo.personalValue}}</td> -->
				<!-- <td colspan="3" class="textAlignL">天使值：{{circleBasicInfo.angelVal}}</td> -->
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">许愿灯</td>
				<td colspan="2" class="textAlignL">接灯数：{{circleBasicInfo.lightNumber}}</td>
				<td colspan="3" class="textAlignL">发灯数 ：{{circleBasicInfo.sendLightNumber}}</td>
			</tr>
			<!-- <tr>
				<td colspan="1" class="grayBackground">警告连坐机制</td>
				<td style="height:80px;" colspan="5" class="textAlignL">
          <span> 被警告人扣除盈币数量： </span> <br>
          <br>
          <span> 连坐人扣除盈币数量： </span>
        </td>
			</tr> -->
      <tr>
				<td colspan="1" class="grayBackground w15">圈的黑名单用户</td>
				<td colspan="5">
					<table class="develop">
						<tr>
							<th style="width: 15%;">编号</th>
							<th style="width: 15%;">会员名称</th>
							<th style="width: 15%;">设置时间</th>
							<th style="width: 15%;">设置人名称</th>
							<!--<th style="width: 25%;">管理</th>-->
						</tr>
						<tr v-for="(item, index) in circleBlackArr" :key="index">
							<!--<td>{{index + 1}}</td>-->
							<td>{{item.id}}</td>
							<td>{{item.memberName}}</td>
							<td>{{item.operationTime}}</td>
							<td>{{item.operationName}}</td>
							<!--<td>{{item.content}}</td>-->
							<!-- <td></td> -->
						</tr>
					</table>
					<!-- <p class="center">
						<el-button type="text" size="mini">查看更多>></el-button>
					</p> -->
				</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">圈成员</td>
				<td colspan="5">
          <p style="text-align:left; margin-left:10px;">
            <span>圈人数：{{memberCount}}</span>
					</p>
					<div class="circleMember clearfix">
						<div style="text-align:center;line-height:40px;vertial-align:middle;" class="fl memberImg" v-for="(item, index) in memberArr" :key="index">
              <span style="height:20px;width:20px;border-radius:50%;background:gray;display:inline-block;position:relative;top:5px;"></span>
              <span style="display:inline-block;">{{item.memberName}}</span>
              <!-- <span style="display:inline-block;">ghjfdhglfjl</span> -->
						</div>
					</div>
					<p class="center">
						<el-button @click="watchMoreMember" type="text" size="mini">查看更多>></el-button>
					</p>
				</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground w15">圈动态</td>
				<td colspan="5">
					<table class="develop">
						<tr>
							<th style="width: 20%;">动态号</th>
							<th style="width: 20%;">标题</th>
							<th style="width: 20%;">时间</th>
							<th style="width: 40%;">内容</th>
						</tr>
						<tr v-for="(item, index) in circleConditionArr" :key="index">
							<td>{{index + 1}}</td>
							<td>{{item.logTypeContent}}</td>
							<td>{{item.created}}</td>
							<td>{{item.content}}</td>
							<!-- <td></td> -->
						</tr>
					</table>
					<p class="center">
						<el-button @click="jumpCircleState" type="text" size="mini">查看更多>></el-button>
					</p>
				</td>
			</tr>
		</table>

		<!--修改头像-->
		<el-dialog title="选择图片" :visible.sync="editAvatar" width="20%">
		<!-- <el-dialog title="选择图片" :visible.sync="editAvatar" width="50%" :before-close="handleClose"> -->

			<div>
				<el-row>
					<el-col :span="24">
						<div style="margin:0 auto;">

            <!--<el-upload
              class="avatar-uploader"
              :auto-upload="false"
              ref="iconUpload"
              :before-upload="beforeIconUpload"
              list-type="picture-card"
              enctype="multipart/form-data">
              <el-button size="small" type="text">上传图片</el-button>
              <div slot="tip" class="el-upload__tip" style="margin-left: 115px;">文件大小不超过2M，支持格式：JPG、JPEG、PNG、BMP，最多上传1张。</div>
            </el-upload>-->

               <el-upload
               	class="avatar-uploader"
			  	:auto-upload="false"
                ref="iconUpload"
                :before-upload="beforeAvatarUpload"
                list-type="picture-card"
                enctype="multipart/form-data">
                <!--<img v-if="markingpic" :src="marketImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
						</div>
					</el-col>
				</el-row>
			</div>

			<span slot="footer" class="dialog-footer clearfix" style="display: block;text-align: left;">
			    <!-- <b style="text-align: left;font-weight: normal;">已选{{picLen}}个</b> -->
			    <el-button style="float: right;" type="info" @click="editPicClick">插入图片</el-button>
		    </span>
		</el-dialog>
	</section>
</template>

<script>
//  =====查询圈子的基本信息======查询圈成员列表====================获取黑名单列表=========图片上传=====保存按钮
import {getCircleBasicManage, getCircleMember, circleCondition, getBlackList,changePic,circleDetailSave } from '@/api/circle/info'
// ========查询基本信息=======查询圈成员==========统计人数
// import { getCircleBasicInfo, getCircleMember,
//         getPeopleCount, getEnterCircleTimeOrder, circleBlackUser, removeBlackRoll, getCircleSportState,
//         getCircleSportStateSort, getCircleMoveInfoList, getCircleMoveInfoSort} from '@/api/circle/info'
export default {
  props: {
    // 群组id
    groupid: {
      type: String
    },
    // 社交还是电商
    isSocialContact: {
      type: Boolean,
      default: false // 电商
    }
  },
  watch: {
    chooseDir() {
      if (this.chooseDir.length === 0) {
        this.isChooseDir = false
      } else {
        this.isChooseDir = false
      }
    }
  },
  data() {
    return {
      circleBlackArr: [],
      memberCount: '', // 圈成员数量
      circleConditionArr: [],
      memberArr: [], // 保存圈成员
      circleBasicInfo: {
      	circleId: ''
      }, // 圈子的基本信息
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      editAvatar: false,
      editGroupName: false,
      fileList: [],
      // pics: [
      //   {
      //     url: '/static/image/h.png',
      //     name: 'xxx'
      //   },
      //   {
      //     url: '/static/image/yang.jpg',
      //     name: 'xxx'
      //   },
      //   {
      //     url: '/static/image/h.png',
      //     name: 'xxx'
      //   },
      //   {
      //     url:
      //       'http://img1.imgtn.bdimg.com/it/u=1780727189,286397666&fm=27&gp=0.jpg',
      //     name: 'xxx'
      //   },
      //   {
      //     url: '/static/image/ren.jpg',
      //     name: 'xxx'
      //   },
      //   {
      //     url: '/static/image/yang.jpg',
      //     name: 'xxx'
      //   }
      // ],
      choosePics: [],
      // picLen: 0,
      data: [
        {
          label: '常用图片',
          index: 0,
          className: ''
        },
        {
          label: '测试',
          index: 1,
          className: ''
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      clickIndex: 0,
      chooseDir: '',
      isChooseDir: true
    }
  },
  methods: {
    //插入图片按钮  2018.6.7 xiu
    editPicClick () {
    	this.$refs.iconUpload.submit()
    },

    // 图片上传
    beforeAvatarUpload(file){
      let fd = new FormData()
      fd.append('file',file)
        changePic(fd).then(res =>{
        	if(res.status == 200){
        		this.$message.success('更换头像成功！')
        		this.circleBasicInfo.circleHead = res.data
        		this.editAvatar = false
        	}else{
        		this.$message.warning('更换头像失败！')
        	}
//        this.markingpic = true;
//        this.showUploading = false
//        this.marketImageUrl = res
        })
    },

    //保存按钮 2018.6.7 xiu
    saveClick () {
		if(this.editGroupName){
			this.$message.warning('请先确认圈名称编辑是否确认')
		}else if(!this.editGroupName){
			circleDetailSave({
				circleId: this.circleBasicInfo.circleId,
				circleName: this.circleBasicInfo.circleName,
				circleHead: this.circleBasicInfo.circleHead
			}).then(res => {
				if(res.data == true && res.status == '200'){
					this.$message.success('保存成功！')
					this.$router.push('/circlemanage/manage/info')
				}
			})
		}
    },

    goBack() {
      this.$router.push('/circlemanage/manage/info')
    },

    // 圈动态进行跳转
    jumpCircleState() {
      this.$router.push({
        path: '/circlemanage/business/develop',
        query: {
          id: this.$route.query.id,
          channelType: this.$route.query.channelType,
          name: this.$route.query.channelName
        }
      })
    },
    // 圈简介进行调转
    circleSynopsis () {
      this.$router.push({
        path: '/circlemanage/business/desc',
        query: {
          id: this.$route.query.id,
          channelType: this.$route.query.channelType,
          name: this.$route.query.channelName
        }
      })
    },
    // 圈公告进行tiaozhuan
    circleAnnouncement() {
      this.$router.push({
        path: '/circlemanage/business/notice',
        query: {
          id: this.$route.query.id,
          channelType: this.$route.query.channelType,
          name: this.$route.query.channelName
        }
      })
    },
    // 获取黑名单列表
    getBlackMemberList() {
      getBlackList({circleId:this.$route.query.id})
      .then(res => {
    	this.circleBlackArr = res.data
//      this.$message.success('获取黑名单列表成功')
      })
      .catch(() => {
        this.$message.error('获取黑名单列表失败')
      })
    },
    watchMoreMember() {
       this.$router.push({
        path: '/circlemanage/manage/member',
        query: {
          id: this.circleBasicInfo.circleId,
          circleName: this.circleBasicInfo.circleName,
          channelType: this.$route.query.channelType
        }
      })
      console.log('jsdlkg')
    },
    // handleClose(done) {
    //   // 关闭 再次确认框
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    ChoosePicsChange() {},

    // addDir() {
    //   this.$prompt('新增目录', '新增', {})
    //     .then(({ value }) => {
    //       const len = this.data.length
    //       this.data.push({
    //         label: value,
    //         index: len
    //       })
    //       this.$message.success()
    //     })
    //     .catch(({ value }) => {})
    // },
    toggleClassName(item) {
      this.data.every(function(item) {
        item.className = ''
      })
      this.chooseDir = item.label
      item.className = 'active'
    },
    delDir(index) {
      this.data.splice(index)
    },
    // 下边是接口的调用
    /*
    *查询圈子的基本信息
    * */
    getCircleBasicInfo(obj) {
      getCircleBasicManage(obj)
      .then(res => {
        this.circleBasicInfo = res.data
        // this.circleBasicInfo = res.data
        this.$message.success('获取圈基本信息成功')
      })
      .catch( () => {
        this.$message.error('获取圈基本信息失败')
      })
    },
    // 查询圈成员
    getMember (obj) {
      getCircleMember(obj)
      .then(res => {
        this.memberCount = res.totalSize
        this.memberArr = res.data
      })
      .catch(() => {
        console.log('查询圈成员失败')
      })
    },
    /*
    *统计人数
    **/
   getPeopleCount () {
     getPeopleCount(data)
     .then(res => {
        this.$message.success('获取人数成功')
     })
     .catch(() => {
        this.$message.error('获取圈成员失败')
     })
   },
    // *按进圈时间排序
   circleTimeOrder () {
     getEnterCircleTimeOrder(data)
     .then(res => {
        this.$message.success('成功排序')
     })
     .catch(() => {
        this.$message.error('排序失败')
     })
   },

    // 圈的黑名单用户
   circleTimeOrder () {
     circleBlackUser(data)
     .then(res => {
        this.$message.success('')
     })
     .catch(() => {
        this.$message.error('')
     })
   },
   // 获取圈动态
   getCircleCon(data) {
     circleCondition(data)
     .then(res => {
       this.circleConditionArr = res.data
       this.$message.success('获取圈动态成功')
     })
     .catch(() => {
       this.$message.error('获取圈动态失败')
     })
   }
  },
  mounted () {
    var obj = {}
    obj.circleId = this.$route.query.id
    obj.channelType = this.$route.query.channelType
    this.getCircleBasicInfo(obj) // 查询圈子的基本信息
    var objMember = {}
    objMember.circleId = this.$route.query.id
    objMember.pageNumber = '1'
    objMember.pageSize = '15'
    this.getMember(objMember)
    var objCondition = {}
    objCondition.circleId = this.$route.query.id
    // objCondition.circleId = this.$route.params.id
    objCondition.pageNum = '1'
    objCondition.pageSize = '10'
    this.getCircleCon(objCondition)
    this.getBlackMemberList()
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid #ccc;
}

.w15 {
  width: 15%;
}

th,
td {
  height: 30px;
  vertical-align: middle;
  text-align: right;
  padding-right: 15px;
  font-weight: normal;
  font-size: 12px;
  color: #666;
}

.textAlignL {
  text-align: left;
  padding-left: 15px;
}

.grayBackground {
  background: #f1f1f1;
}

.center {
  text-align: center;
}

.develop {
  width: 98%;
  margin: 15px auto;
  tr {
    th,
    td {
      text-align: center;
    }
  }
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.fl {
  float: left;
}

.w25 {
  width: 25%;
  box-sizing: border-box;
  margin: 20px 0;
  padding: 0 10px;
}

.header {
  height: 40px;
  line-height: 40px;
  background: #6f7180;
  color: #fff;
  font-size: 14px;
  padding-left: 10px;
  margin: 0;
}

.info {
  margin: 30px;
}

.circleMember {
  border: 1px solid #ccc;
  border-right: none;
  border-bottom: none;
  margin: 20px;
  .memberImg {
    width: 20%;
    height:40px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    p {
      text-align: center;
      position: relative;
      padding-left: 10px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
