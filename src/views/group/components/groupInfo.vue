<template>
	<section>
		<el-row>
			<div class="header">
				<el-row>
					<el-col :span="12">
						<span>群基本信息</span>
					</el-col>
					<el-col :span="12" style="text-align: right">
						<el-button size="mini" @click="back">返回</el-button>
						<el-button size="mini" type="primary"  @click="subSave">保存</el-button>
					</el-col>
				</el-row>
			</div>
		</el-row>
		<table width="100%" border="1">
			<tr>
				<th class="w15 grayBackground">群ID</th>
				<th class="textAlignL">{{group.crowdId}}</th>
				<th class="w15 grayBackground">创建人ID</th>
				<th class="w15 textAlignL">{{group.memberId}}</th>
				<th class="w15 grayBackground">创建人名称</th>
				<th class="w15 textAlignL">{{group.memberNickName}}</th>
			</tr>
			<tr>
				<td class="w15 grayBackground">群名称</td>
				<td class="textAlignL" @dblclick="editGroupName = true">
				  <span v-if="!editGroupName">{{group.crowdName}}</span>
				  <span v-if="!editGroupName" style="color: red;font-size: 12px;margin-left: 20px;cursor: pointer;">双击可编辑</span>
				  <el-input v-if="editGroupName" v-model="group.crowdName" placeholder="请输入群名称" style="width: 300px;" maxlength="8" clearable></el-input>
				  <el-button v-if="editGroupName"  style="margin-left: 10px;color: springgreen;" type="text" icon="el-icon-success" @click="editGroupName = false"></el-button>
				</td>
				<td class="w15 grayBackground" prop="crowdLogo" v-model="group.crowdLogo">群头像：
				</td>

				<td class="textAlignL" @click="editAvatar = true" style="text-align: center;line-height: 30px;">可编辑
					<img v-if="imageUrl" :src="group.crowdLogo" class="avatar" style="width:30px;height:30px;float:left;margin-right: 20px;"></td>
				<!--<td class="textAlignL">
					<el-upload
						  class="upload-demo"
						  multiple
						  :limit="1"
						  :auto-upload="false"
						  :file-list="fileList"
						  ref="iconUpload"
						  :before-upload="beforeIconUpload"
						  enctype="multipart/form-data">
						  <el-button size="small" type="text">选择图片</el-button>
					</el-upload>
					<el-button size="small" type="text"
						style="display: inline-block;position: absolute; right:32%;top:22%"
						@click="changePicClick">确认更换
					</el-button>
				</td>-->
				<td class="w15 grayBackground">创建时间</td>
				<td class="textAlignL">{{group.created}}</td>
			</tr>
			<tr v-if="channelId == 2">
        <!--<td colspan="1" class="grayBackground">群地理位置</td>
        <td colspan="5" class="textAlignL">
          北京市朝阳区东三环北路 博瑞大厦B座
        </td>-->
		<tr>
			<!--crowdIntro群简介       crowdIntro  -->
			<td v-if="channelId == 2" colspan="1" class="grayBackground">群活跃值</td>
			<td v-if="channelId == 2" colspan="5" class="textAlignR">{{group.activeValue}}
			</td>
		</tr>
      </tr>
			<tr v-if="channelId == 1">
				<td colspan="1" class="grayBackground">标签</td>
				<td colspan="5" class="textAlignL">{{group.crowdLable}}</td>
			</tr>
			<tr>
				<!--crowdIntro群简介       crowdIntro  -->
				<td colspan="1" class="grayBackground">群简介</td>
				<td colspan="5" class="textAlignR">
				  <el-button type="text" icon="el-icon-d-arrow-right" @click="goToGroupIntro"></el-button>
				</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground">群公告</td>
				<td colspan="5" class="textAlignR">
					<el-button type="text" icon="el-icon-d-arrow-right" @click="goToGroupNotice"></el-button>
				</td>
			</tr>
			<tr>
				<td v-if="channelId == 2" colspan="1" class="grayBackground">群类型</td>
				<td v-if="channelId == 2" colspan="2">{{group.createdType | statusFilter}}</td>
				<td v-if="channelId == 1" colspan="1" class="grayBackground">是否需要群主确认邀请进群</td>
		        <td v-if="channelId == 1" colspan="2" class="textAlignL">
		          <el-radio-group v-model="group.confirmSwitch">
		            <el-radio label="1">开</el-radio>
		            <el-radio label="0">关</el-radio>
		          </el-radio-group>
		        </td>

				<td v-if="isSocialContact" colspan="1" class="grayBackground">将群设置为隐秘状态</td>
				<td colspan="2" class="textAlignL">
				  <el-radio-group v-model="group.hideSwitch">
				    <el-radio :label="1">开</el-radio>
				    <el-radio :label="0">关</el-radio>
				  </el-radio-group>
				</td>

			</tr>
			<!--如果是社交，则不显示-->
			<tr v-if="!isSocialContact">
				<td colspan="1" class="grayBackground">是否需要群主确认进群</td>
				<td colspan="5" class="textAlignL">
				  <el-radio-group v-model="group.confirmSwitch">
				    <el-radio :label="1">开</el-radio>
				    <el-radio :label="0">关</el-radio>
				  </el-radio-group>
				</td>
			</tr>
			<!-- 新增群等级  社交独有-->
			<tr>
				<td colspan="1" class="grayBackground">群人数</td>
				<td colspan="2">{{group.crowdTotal}}</td>
				<td v-if="channelId == 2" colspan="1" class="grayBackground">群等级</td>
				<td v-if="channelId == 2" colspan="2">{{group.crowdGrade}}</td>
				<td v-if="channelId == 1" colspan="1" class="grayBackground">群类型</td>
        		<td v-if="channelId == 1" colspan="2">{{group.createdType | statusFilter}}</td>
			</tr>
			<tr>
				<td rowspan="2" class="w15 grayBackground">群能量值</td>
				<td colspan="2" class="textAlignL">豆总数：{{group.beanTotal}}</td>
				<td colspan="3" class="textAlignL">豆均值：{{group.beanAvg}}</td>
			</tr>
			<tr>
				<td colspan="2" class="textAlignL">币总数：{{group.coinTotal}}</td>
				<td colspan="3" class="textAlignL">币均值：{{group.coinAvg}}</td>
			</tr>
			<!--<tr>
				<td colspan="2" class="textAlignL">人脉值：{{group.contacts}}</td>
				<td colspan="3" class="textAlignL">天使值：{{group.angel}}</td>
			</tr>-->
			<tr>
				<!--<td v-if="isSocialContact" colspan="1" rowspan="2" class="grayBackground">活跃度</td>
				<td v-if="!isSocialContact" colspan="1" rowspan="1" class="grayBackground">活跃度</td>-->
				<td colspan="1" rowspan="2" class="grayBackground">许愿灯</td>
				<td colspan="2" class="textAlignL">接灯数：{{group.receiveLamp}}</td>
				<td colspan="3" class="textAlignL">发灯数 ：{{group.sendLamp}}</td>
			</tr>
			<tr v-if="isSocialContact">
				<!--<td colspan="2" class="textAlignL">朋友圈数</td>
				<td colspan="3" class="textAlignL">主题数</td>-->
			</tr>
			<tr>
				<td v-if="channelId == 1" rowspan="2" colspan="1" class="grayBackground">群成员</td>
				<td v-if="channelId == 1" colspan="5" class="textAlignL grayBackground" v-model="crowdMembersMall">群人数：{{crowdMembersMall.length}}人</td>
				<td v-if="channelId == 2" rowspan="2" colspan="1" class="grayBackground">群成员</td>
				<td v-if="channelId == 2" colspan="5" class="textAlignL grayBackground" v-model="crowdMembersSocial">群人数：{{crowdMembersSocial.length}}人</td>
			</tr>
			<tr>
				<td colspan="5">
					<!--<div class="circleMember clearfix">
						<div v-if="channelId == 1" class="fl memberImg">
							<p v-for="(item,index) in (group.crowdMembersMall)">
								<img src="../../../../build/logo.png" alt="" />
								<span>会员名称</span>
							</p>
						</div>
						<div v-if="channelId == 2" class="fl memberImg" v-for="item in (group.crowdMembersSocial)">
							<p>
								<img src="../../../../build/logo.png" alt="" />
								<span>会员名称</span>
							</p>
						</div>
					</div>-->

					<div class="circleMember"  style="overflow: auto;">
						<span v-if="channelId == 1"
							v-for="(item,index) in crowdMembersMall"
							style="float:left;display: inline-block;margin-right: 15px;border:1px solid #9AAABF">
							<span style="display: inline-block;margin-right: 4px;margin-left: 4px;">{{index+1}}、</span>会员名称 ：{{item}}</span>
						<span v-if="channelId == 2"
							v-for="(item,index) in crowdMembersSocial"
							style="float:left;display: inline-block;margin-right: 15px;border:1px solid #9AAABF">
							<span style="display: inline-block;margin-right: 4px;margin-left: 4px;">{{index+1}}、</span>会员名称 ：{{item}}</span>
					</div>
					<p class="center">
						<el-button type="text" size="mini" @click="gMemberMore">查看更多>></el-button>
					</p>
				</td>
			</tr>
			<tr>
				<td colspan="1" class="grayBackground w15">群动态</td>
				<td colspan="5">
					<table class="develop">
						<tr>
							<th style="width: 20%;">动态号</th>
							<th style="width: 20%;">标题</th>
							<th style="width: 20%;">时间</th>
							<th style="width: 40%;">内容</th>
						</tr>
						<tr v-for="item in tableData">
							<td>{{item.flowId}}</td>
							<td>{{item.flowType}}</td>
							<td>{{item.created}}</td>
							<td>{{item.flowInfo}}</td>
						</tr>
						<tr v-if="tableData.length == 0">
							<td colspan="4">当前无动态</td>
						</tr>
					</table>
					<p class="center">
						<el-button type="text" size="mini" @click="dynamic">查看更多>></el-button>
					</p>
				</td>
			</tr>
			<!--新增历任重要角色历史-->
			<tr>
			  <td colspan="1" class="grayBackground w15">历任重要角色历史</td>
			  <td colspan="5">
			    <table class="develop">
            <tr>
              <th style="width: 30%;">角色名称</th>
              <th style="width: 30%;">历任人员</th>
              <th style="width: 40%;">起止时间</th>
            </tr>
            <tr v-for="item in roleData">
              <td>{{item.roleType}}</td>
              <td>{{item.mName}}</td>
              <td>{{item.StartTime}}--{{item.endTime}}</td>
              <td></td>
            </tr>
            <tr v-if="roleData.length == 0">
              <td colspan="4">当前无动态</td>
            </tr>
          </table>
			  </td>
			</tr>
		</table>

		<!--修改头像-->
		<!--<el-dialog title="选择图片" :visible.sync="editAvatar" width="70%">
			<div style="width: 100%;background: #f1f1f1;">
				<el-row>
					<el-col :span="8">
						<div class="imgList">
							<p>图片目录
								<el-button size="mini" icon="el-icon-plus" type="primary" @click="addDir"></el-button>
							</p>
							<ul>
								<li v-for="item in data" :class="item.className" @click.stop="toggleClassName(item)">{{item.label}}
									<el-button size="mini" type="danger" @click.stop="delDir(item.index)">删除</el-button>
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="16" style="background: #fff;">
						<div  style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px;">
							<el-row>
								<el-col :span="12"><p style="padding-left: 20px;">使用图片目录：<el-tag v-if="chooseDir != ''">{{chooseDir}}</el-tag></p></el-col>
								<el-col :span="12" style="text-align: right;">
									老版
									<el-upload
									  v-if="chooseDir != ''"
									  :on-preview="handlePreview"
									  :on-remove="handleRemove"
									  :before-remove="beforeRemove"
									  enctype="multipart/form-data"
									  :limit="3"
									  multiple = false
									  :on-exceed="handleExceed"
									  :file-list="fileList">
									</el-upload>
									<el-button size="small" type="primary">点击上传</el-button>
									新版
									<el-upload
										  class="upload-demo"
										  multiple
										  :limit="1"
										  :auto-upload="false"
										  :file-list="fileList"
										  ref="iconUpload"
										  :before-upload="beforeIconUpload"
										  enctype="multipart/form-data">
										  <el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</el-col>
							</el-row>
						</div>
						<div>
							<el-row>
								<el-col :span="12" style="padding-left: 20px;">
									上传时间 名称
								</el-col>
								<el-col :span="12" class="clearfix">
									<el-button style="float: right;margin-left: 15px;" size="mini">搜索</el-button>
									<el-select style="float: right;" size="mini"></el-select>
								</el-col>
							</el-row>
						</div>

						<div class="clearfix">
							<el-checkbox-group v-model="choosePics" @change="ChoosePicsChange">
							<div class="fl w25" v-for="item in pics">
								<el-card :body-style="{ padding: '0px' }">
									<img v-bind:src="item.url" class="image">
									<div style="padding: 14px;">
								        <div class="bottom clearfix">
								        	<span style="font-size: 14px;">{{item.name}}</span>
								        	<el-checkbox style="float: right;"  :label="item.name" :key="item.name">{{item.name}}</el-checkbox>
								        </div>
								    </div>
								</el-card>
							</div>
							</el-checkbox-group>
						</div>
					</el-col>
				</el-row>
			</div>

			<span slot="footer" class="dialog-footer clearfix" style="display: block;text-align: left;">
			    <b style="text-align: left;font-weight: normal;">已选{{picLen}}个</b>
			    <el-button style="float: right;" type="info" @click="setPic">插入图片</el-button>
			    <el-button style="float: right;" type="info" @click="changePicClick">插入图片</el-button>

		    </span>
		</el-dialog>-->


		<el-dialog title="选择图片" :visible.sync="editAvatar" width="40%">
			<div style="width: 100%;background: #f1f1f1;">
				<el-row>
					<el-col :span="8">
						<div class="imgList">
							<p>图片目录
								<!--<el-button size="mini" icon="el-icon-plus" type="primary" @click="addDir"></el-button>-->
							</p>
							<ul>
								<!--<li v-for="item in data" :class="item.className" @click.stop="toggleClassName(item)">{{item.label}}
									<el-button size="mini" type="danger" @click.stop="delDir(item.index)">删除</el-button>
								</li>-->
							</ul>
						</div>
					</el-col>
					<el-col :span="16" style="background: #fff;">
						<div  style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px;">
							<el-row>
								<el-col :span="12"><p style="padding-left: 20px;">使用图片目录：<el-tag v-if="chooseDir != ''">{{chooseDir}}</el-tag></p></el-col>
								<el-col :span="12" style="text-align: right;">
									<!--<el-upload
									  v-if="chooseDir != ''"
									  :on-preview="handlePreview"
									  :on-remove="handleRemove"
									  :before-remove="beforeRemove"
									  enctype="multipart/form-data"
									  :limit="3"
									  multiple = false
									  :on-exceed="handleExceed"
									  :file-list="fileList">
									</el-upload>
									<el-button size="small" type="primary">点击上传</el-button>-->
									<el-upload
										  class="upload-demo"
										  multiple
										  :limit="1"
										  :auto-upload="false"
										  :file-list="fileList"
										  ref="iconUpload"
										  :before-upload="beforeIconUpload"
										  enctype="multipart/form-data">
										  <el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</el-col>
							</el-row>
						</div>
						<div>
							<!--<el-row>
								<el-col :span="12" style="padding-left: 20px;">
									上传时间 名称
								</el-col>
								<el-col :span="12" class="clearfix">
									<el-button style="float: right;margin-left: 15px;" size="mini">搜索</el-button>
									<el-select style="float: right;" size="mini"></el-select>
								</el-col>
							</el-row>-->
						</div>

						<div class="clearfix">
							<el-checkbox-group v-model="choosePics" @change="ChoosePicsChange">
							<div class="fl w25" v-for="item in pics">
								<!--<el-card :body-style="{ padding: '0px' }">
									<img v-bind:src="item.url" class="image">
									<div style="padding: 14px;">
								        <div class="bottom clearfix">
								        	<span style="font-size: 14px;">{{item.name}}</span>
								        	<el-checkbox style="float: right;"  :label="item.name" :key="item.name">{{item.name}}</el-checkbox>
								        </div>
								    </div>
								</el-card>-->
							</div>
							</el-checkbox-group>
						</div>
					</el-col>
				</el-row>
			</div>

			<span slot="footer" class="dialog-footer clearfix" style="display: block;text-align: left;">
			    <el-button style="float: right;" type="info" @click="changePicClick">插入图片</el-button>
		    </span>
		</el-dialog>


		<el-dialog
		  title="图片目录"
		  :visible.sync="dialogVisible"
		  width="15%">
		  <el-input placeholder="请输入目录名称" v-model="inputText"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="inputTextClick">确 定</el-button>
		  </span>
		</el-dialog>
	</section>
</template>

<script>
//=======详情=====详情编辑==修改头像
import { detail, saveDetail, changePic } from "@/api/group/info";
export default {
  props: {
    // 群组id
    crowdId: {
      type: String
    },
    channelId: {
      type: String
    },
    // 社交还是电商
    isSocialContact: {
      type: Boolean,
      default: false // 电商
    },
    //判断是从会员对群的信息管理跳到详情还是从群组信息跳到详情的  群组是2，会员对群是1
    isViewOrManage: {
      type: String,
      default: ""
    }
  },
  filters: {
    statusFilter(val) {
      if (val === "1") {
        return "未接灯";
      } else if (val === "2") {
        return "已接灯";
      } else if (val === "3") {
        return "已点亮";
      } else if (val === "4") {
        return "已完成";
      }
    }
  },
  watch: {
    chooseDir() {
      if (this.chooseDir.length === 0) {
        this.isChooseDir = false;
      } else {
        this.isChooseDir = true;
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      imageUrl: false,
      inputText: "",
      tableData: [],
      roleData: [],
      editAvatar: false,
      fileList: [],
      pics: [
        {
          url: "",
          name: ""
        }
        //      {
        //        url: '/static/image/h.png',
        //        name: 'xxx'
        //      }
        //      {
        //        url: '/static/image/yang.jpg',
        //        name: 'xxx'
        //      },
        //      {
        //        url: '/static/image/h.png',
        //        name: 'xxx'
        //      },
        //      {
        //        url:
        //          'http://img1.imgtn.bdimg.com/it/u=1780727189,286397666&fm=27&gp=0.jpg',
        //        name: 'xxx'
        //      },
        //      {
        //        url: '/static/image/ren.jpg',
        //        name: 'xxx'
        //      },
        //      {
        //        url: '/static/image/yang.jpg',
        //        name: 'xxx'
        //      }
      ],
      choosePics: [],
      picLen: 0,
      data: [
        {
          label: "常用图片",
          index: 0,
          className: ""
        }
      ],
      clickIndex: 0,
      chooseDir: "",
      isChooseDir: true,
      editGroupName: false,
      group: {
        crowdId: "",
        crowdLogo: ""
        //社交群成员
        //电商群成员
        //    	crowdMembersMall: []
      },
      crowdMembersSocial: [],
      crowdMembersMall: []
    };
  },
  methods: {
    //返回按钮
    back() {
      if (this.isViewOrManage == "1") {
        this.$router.push("/group/manage/membercando");
      } else if (this.isViewOrManage == "2") {
        this.$router.push("/group/manage/info");
      }
    },

    //更换群头像
    changePicClick() {
      this.$refs.iconUpload.submit();
    },

    beforeIconUpload(file) {
      let fd = new FormData();
      fd.append("file", file);
      changePic(fd).then(res => {
        if (res.data) {
          this.group.crowdLogo = res.data;
        }
        this.$message.success("上传头像成功！");
        this.imageUrl = true;
        this.editAvatar = false;
      });
    },

    //群成员的查看更多
    gMemberMore() {
      let crowdId = this.group.crowdId;
      this.$router.push({
        path: "/group/manage/member",
        query: {
          crowdId: crowdId,
          channelId: this.channelId,
          crowdName: this.group.crowdName
        }
      });
    },

    //群动态的查看更多
    dynamic() {
      let crowdId = this.group.crowdId;
      let crowdName = this.group.crowdName;
      let channelId = this.channelId;
      this.$router.push({
        path: "/group/bussiness/develop",
        query: {
          crowdId: crowdId,
          crowdName: crowdName,
          channelId: channelId
        }
      });
    },

    //保存按钮   触发父组件的事件
    subSave() {
      //this.$emit('childDetail','msg')
      if (this.editGroupName) {
        this.$message.warning("请先确认群名称编辑是否确认");
      } else if (!this.editGroupName) {
        let obj = {};
        obj.crowdId = this.group.crowdId;
        obj.userId = this.group.memberId;
        obj.crowdName = this.group.crowdName;
        obj.crowdLogo = this.group.crowdLogo;
        obj.confirmSwitch = this.group.confirmSwitch;
        obj.hideSwitch = this.group.hideSwitch;
        saveDetail(obj).then(res => {
          //console.log(res)
          if (res.data == true && res.status == 200) {
            this.$router.go(-1);
            this.$message.success("修改群信息成功！");
          } else if (res.data == false && res.status == 500) {
            let errorMsg = res.errorMsg;
            this.$message.warning(errorMsg);
          }
        });
      }
    },
    //群简介按钮
    goToGroupIntro() {
      let crowdName = this.group.crowdName;
      let crowdId = this.group.crowdId;
      let channelId = this.channelId;
      this.$router.push({
        path: "/group/bussiness/desc",
        query: {
          crowdName: crowdName,
          crowdId: crowdId,
          channelId: channelId
        }
      });
    },
    //群公告的路由跳转
    goToGroupNotice() {
      let crowdName = this.group.crowdName;
      let crowdId = this.group.crowdId;
      let channelId = this.channelId;
      this.$router.push({
        path: "/group/bussiness/notice",
        query: {
          crowdName: crowdName,
          crowdId: crowdId,
          channelId: channelId
        }
      });
    },
    handleQuery() {
      var _this = this;
      detail({
        crowdId: _this.crowdId,
        channelId: _this.channelId
      }).then(res => {
        _this.group = res.data;
        _this.imageUrl = true;
        _this.tableData = res.data.flCrowdsFlowVo;
        _this.roleData = res.data.roleChangeVoList;
        _this.crowdMembersSocial = res.data.crowdMembersSocial;
        _this.crowdMembersMall = res.data.crowdMembersMall;
        _this.crowdMembersSocial = [];
        _this.crowdMembersMall = [];
        if (_this.channelId == 1) {
          //电商的nickname是大写
          for (let i = 0; i < res.data.crowdMembersMall.length; i++) {
            _this.crowdMembersMall.push(res.data.crowdMembersMall[i].nickname);
          }
        } else if (_this.channelId == 2) {
          //社交的nickName是大写
          for (let k = 0; k < res.data.crowdMembersSocial.length; k++) {
            _this.crowdMembersSocial.push(
              res.data.crowdMembersSocial[k].nickName
            );
          }
        }
        for (let j = 0; j < res.data.flCrowdsFlowVo.length; j++) {
          if (res.data.flCrowdsFlowVo[j].flowType == 1) {
            res.data.flCrowdsFlowVo[j].flowType = "先拉人再建群";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 2) {
            res.data.flCrowdsFlowVo[j].flowType = "先建群在拉人";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 3) {
            res.data.flCrowdsFlowVo[j].flowType = "群主身份转让";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 4) {
            res.data.flCrowdsFlowVo[j].flowType = "修改群头像";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 5) {
            res.data.flCrowdsFlowVo[j].flowType = "";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 6) {
            res.data.flCrowdsFlowVo[j].flowType = "修改群名称";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 7) {
            res.data.flCrowdsFlowVo[j].flowType = "修改群公告";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 8) {
            res.data.flCrowdsFlowVo[j].flowType = "修改群简介";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 9) {
            res.data.flCrowdsFlowVo[j].flowType = "解散群";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 10) {
            res.data.flCrowdsFlowVo[j].flowType = "冻结";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 11) {
            res.data.flCrowdsFlowVo[j].flowType = "解冻";
          } else if (res.data.flCrowdsFlowVo[j].flowType == 12) {
            res.data.flCrowdsFlowVo[j].flowType = "联席群主变更";
          }
        }
        for (let m = 0; m < res.data.roleChangeVoList; m++) {
          if (res.data.roleChangeVoList[m].flowType == 1) {
            _res.data.roleChangeVoList[m].flowType = "联席群主";
          } else if (res.data.roleChangeVoList[m].flowType == 2) {
            res.data.roleChangeVoList[m].flowType = "行为会员";
          } else if (res.data.roleChangeVoList[m].flowType == 3) {
            res.data.roleChangeVoList[m].flowType = "观摩会员";
          }
        }
      });
    },

    //修改头像里面的新增目录
    addDir() {
      //this.dialogVisible = true
      this.$prompt("新增目录", "新增", {})
        //value是input框里面的值
        .then(({ value }) => {
          //this.data.length  是目录的长度(从0开始)
          const len = this.data.length;
          this.data.push({
            label: value,
            index: len
          });
          this.$message.success();
        })
        .catch(({ value }) => {});
    },

    handleRemove(file, fileList) {
      console.log("文件列表移除文件时的钩子");
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(
        "点击已上传的文件链接时的钩子，可以通过file/response 拿到服务端的返回数据"
      );
      console.log(file);
    },
    handleExceed(files, fileList) {
      console.log("文件超出个数限制时的钩子");
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log("删除文件之前的钩子");
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //修改头像里面的更改图片
    ChoosePicsChange() {},

    //修改头像的插入图片按钮
    setPic() {
      this.editAvatar = false;
      //changePic()
    },

    //  inputTextClick () {
    //  	const len = this.data.length
    //  	for(let i=0;i<this.data.length;i++){
    //  		this.data[i].label = this.inputText
    //  	}
    //  	this.dialogVisible = false
    //
    //  },

    //修改头像里面的
    toggleClassName(item) {
      this.data.map(function(row) {
        row.className = "";
      });

      this.chooseDir = item.label;
      item.className = "active";
    },

    //修改头像里面的删除按钮
    delDir(index) {
      if (this.chooseDir === this.data[index].label) {
        this.chooseDir = "";
      }
      this.data.splice(index, 1);
    }
  },
  created() {
    this.handleQuery();
  }
};
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
  min-height: 200px;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
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
.circleMember {
  margin: 20px;
}
.header {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  background: #808080;
  color: #fff;
}
.imgList {
  p {
    text-align: center;
    font-size: 16px;
    color: #000;
    font-weight: bold;
    padding: 10px 0;
    position: relative;
    button {
      position: absolute;
      right: 30px;
    }
  }
  ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    li {
      display: block;
      background: #ccc;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: relative;
      color: #000;
      button {
        position: absolute;
        display: block;
        height: 30px;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 30px;
      }
    }
    .active {
      background: #aaa;
    }
  }
}
</style>
