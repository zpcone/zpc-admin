<template>
<div>
  <!-- 判断电商是否显示的字段 edit为false是详情  true为编辑
    isSocialContact  true flase 区别电商还是社交
    1是电商  2是社交
  -->
    <p class="header">圈子的基本信息的观点给对方给对方改
      <el-button @click="goBack" style="float:right;margin:6px 10px;" size="mini" type="info">返回</el-button>
      <el-button @click="editMember" style="float:right;margin:6px 10px;" size="mini" type="primary">保存</el-button>
    </p>
  <!--<div>

  </div>-->
	<table width="100%" border="1">
    <!-- <div style="height:50px;background:red;"></div> -->
		<tr>
			<th rowspan="16" class="w15 grayBackground">会员基本信息</th>

			<th class="grayBackground w15">会员ID</th>
			<th class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.mId"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.idType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</th>
			<th class="grayBackground w15" v-if="isSocialContact">真实姓名</th>
			<th class="grayBackground w15" v-if="!isSocialContact">用户名</th>
			<th class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.realName"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.nameType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</th>
		</tr>
		<tr>
			<td class="grayBackground">性别</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.sex"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.nameType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">会员昵称</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.nickname"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.otherNameType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">微信号</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.weixin"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.wexnumType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">QQ号</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.QQ"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.qqnumType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">联系电话</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.mobile"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.telType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">头像</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
            <img style="width:30px; height:30px;" :src="saveBackData.personalInfo.headPortaitSrc" alt="头像">
						<!-- <el-input :disabled="!isEdit" size="mini" v-model="personInfo.avatar"></el-input> -->
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.avatarType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground" v-if="isSocialContact">出生日期</td>
			<td class="grayBackground" v-if="!isSocialContact">生日</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.birthday"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.birthdayType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">
				<span v-if="!isSocialContact">兴趣</span>
			</td>
			<td class="textAlignL">
				<el-row v-if="!isSocialContact">
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personInfo.interest"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.hobbyType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class=" grayBackground">专业</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.specialty"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.majorType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class=" grayBackground">学校</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.school"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.schoolType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class=" grayBackground">常用地址</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.address"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.addressType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.vaule"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class=" grayBackground">家乡</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.hometown"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.nationType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class=" grayBackground">等级</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.level"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.levelType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">信用额度</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.aa"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.limitType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">个性签名</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini"  v-model="saveBackData.personalInfo.personalSignature"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.signType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">邮箱</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.email"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.emailType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">公司</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.company"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.companyType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">公司地址</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.companyAddr"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.companyAddrType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">职位</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.position"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.jobType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">职业</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.occupation"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.careerType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">可提供资源</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.supplyRes"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.offerType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">需求资源</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.personalInfo.needRes"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.needType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">盈豆</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.beanTotal"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.beanType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">盈币</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.moneyTotal"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.coinType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">人脉值</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.peopleVal"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.connectType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">天使值</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.angelVal"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.angelType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">发灯数</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.publicLampSum"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.sendType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">接灯数</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.receiverLampSum"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.receiveType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<!--<tr>
			<td class="grayBackground">变现次数</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="personInfo.cashTimes"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.cashTimesType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">变现金额</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="personInfo.cashNum"></el-input>
					</el-col>
					<el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.cashNumType">
							<el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>-->
      <tr>
        <td class="grayBackground">已加入的圈子</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (saveBackData.joinCirclrs)" :key="item">{{item}}</span>
        </td>
        <td class="grayBackground">已加入的群组</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (saveBackData.joinCrowds)" :key="item">{{item}}</span>
        </td>
      </tr>

		<tr>
			<td class="grayBackground" rowspan="4">圈内信息</td>
			<td class="grayBackground">圈内昵称</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input clearable size="mini" v-model="form.memberNicename"></el-input>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground">角色</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12" class="textAlignR">
						<!-- <el-input clearable size="mini" v-model="form.roleType"></el-input> -->
						<el-select size="mini" v-model="form.roleType">
               <el-option
                  v-for="item in roleTypeSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
							<!-- <el-option>公开</el-option>
							<el-option>公开</el-option>
							<el-option>公开</el-option>
							<el-option>公开</el-option>
							<el-option>公开</el-option> -->
						</el-select>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">圈内等级</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input clearable size="mini" v-model="form.grade"></el-input>
					</el-col>
					<!-- <el-col :span="12" class="textAlignR">
						<el-select :disabled="!isEdit" size="mini" v-model="personInfo.levelInGroupType">
							<el-option>公开</el-option>
						</el-select>
					</el-col> -->
				</el-row>
			</td>
			<td class="grayBackground">邀请人</td>
			<td class="textAlignL">
				<el-row>
          <el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.inviter"></el-input>
					</el-col>
				</el-row>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">进圈时间</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.intoCircleTime"></el-input>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground"></td>
			<td class="textAlignL">
			</td>
		</tr>
    <tr>
			<td class="grayBackground">圈的昵称</td>
			<td class="textAlignL">
				<el-row>
					<el-col :span="12">
						<el-input size="mini" v-model="form.circleNickName"></el-input>
					</el-col>
				</el-row>
			</td>
			<td class="grayBackground"></td>
			<td class="textAlignL">
			</td>
		</tr>
		<tr>
			<td class="grayBackground" rowspan="2">仅后台可见</td>
			<td class="grayBackground">进圈方式</td>
			<td colspan="3" class="textAlignL">
        <el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.lairagetype"></el-input>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">进圈风格</td>
			<td colspan="3" class="textAlignL">
        <el-input :disabled="!isEdit" size="mini" v-model="saveBackData.circleMemVo.style"></el-input>
			</td>
		</tr>
		<tr>
			<td rowspan="6" class="grayBackground">圈成员对圈的设置</td>
			<td class="grayBackground">消息免打扰</td>
			<td colspan="3" class="textAlignL">
				<el-radio-group v-model="form.disturbFlag">
					<el-radio label="2">开</el-radio>
					<el-radio label="1">关</el-radio>
				</el-radio-group>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">设为常用圈</td>
			<td colspan="3" class="textAlignL">
				<el-radio-group v-model="form.oftenFlag">
					<el-radio label="2">开</el-radio>
					<el-radio label="1">关</el-radio>
				</el-radio-group>
			</td>
		</tr>
		<tr>
			<td class="grayBackground">显示圈成员昵称</td>
			<td colspan="3" class="textAlignL">
				<el-radio-group v-model="form.showNicenameSwitch">
					<el-radio label="2">开</el-radio>
					<el-radio label="1">关</el-radio>
				</el-radio-group>
			</td>
		</tr>
		<!-- <tr>
			<td class="grayBackground">当前聊天背景</td>
			<td colspan="3" class="textAlignL">
			</td>
		</tr> -->
		<tr>
			<td class="grayBackground">赚豆通知</td>
			<td colspan="3" class="textAlignL">
				<el-radio-group v-model="form.earnFlag">
					<el-radio label="1">开</el-radio>
					<el-radio label="2">关</el-radio>
				</el-radio-group>
			</td>
		</tr>
		<!--<tr>
			<td class="grayBackground">聊天信息的保密设置</td>
			<td colspan="3" class="textAlignL">
        <el-checkbox-group disabled v-model="typeArr">
					<el-checkbox label="notLooked" name="type">不让低级别会员看到自己的聊天内容</el-checkbox>
					<el-checkbox label="notLook" name="type">不看低级别会员的聊天信息</el-checkbox>
				</el-checkbox-group>
			</td>
		</tr>-->
		<tr>
			<td class="grayBackground">朋友圈对圈成员可见</td>
			<td colspan="3" class="textAlignL">
				<el-radio-group v-model="form.friendFlag">
					<el-radio label="2">开</el-radio>
					<el-radio label="1">关</el-radio>
				</el-radio-group>
			</td>
		</tr>
	</table>

</div>

</template>

<script>
// ========添加圈成员======搜索圈成员=====================编辑圈成员
import {getCircleDetail, addCircleMember, searchMember, editCircleMember} from '@/api/circle/info'
export default {
  props: {
    // isEdit: {
    //   type: Boolean,
    //   default: false
    // },
    // isSocialContact: {
    //   type: Boolean,
    //   default: false // false 电商        true 社交
    // },
    personId: {
      type: String,
      default: ''
    },
    buttonAction: {
      type: String,
      default: 'back' // back  返回   save  保存
    },
    headerShow: {
      type: Boolean,
      default: false // back  返回   save  保存
    }
  },
  data() {
    return {
      typeArr: [],
      // testDemo: '1',
      isSocialContact: true,
      saveBackData: {
        circleMemVo: {},
        personalInfo:{
        	mId: '',
        	regionId: ''
        },
        joinCirclrs: [],
        joinCrowds: [],
      }, // 保存查详情的时候后台返回的数据
      roleTypeSelect: [
        {
          value: '5',
          label: '圈主'
        }, {
          value: '4',
          label: '群主'
        }, {
          value: '3',
          label: '联席群主'
        }, {
          value: '2',
          label: '行为会员'
        }, {
          value: '1',
          label: '观摩会员'
        }
      ],
      roleStyleSelect: [
         {
          value: '1',
          label: '高调进圈'
        }, {
          value: '2',
          label: '低调进圈'
        }
      ],
      isEdit: false,
  //     	"circleName": "string",
	// "circleNickName": "string",
	// "disturbFlag": 0,
	// "friendFlag": 0,
	// "grade": 0,
	// "oftenFlag": 0,
	// "roleType": 0,
  // "showNicenameSwitch": 0,
  // earnFlag
      form: {
        circleId: this.$route.query.id,
        memberNicename: "",
        circleNickName: "",
        disturbFlag: '',
        friendFlag: '',
        grade: '',
        oftenFlag: '',
        roleType: '',
        showNicenameSwitch: '',
        earnFlag: '',
        memberId: '',
        allowFlag:'',
        lookFlag:''
        // earnFlag: '', // 赚豆通知
        // friendFlag: '', // 朋友圈对圈成员可见（1－不可见，2－可见）
        // showNicenameSwitch: '', // 显示圈成员昵称开关
        // disturbFlag: '', // 免打扰
        // oftenFlag: '', // 是否常用圈
        // disturbFlag: '', // 免打扰
        // circleGrade: '', // 等级
        // circleName: '', // 圈的
        // circleNicename: '', // 昵称
        // roleType: '', // 角色
        // style: '', // 风格1-/2
        // roleType: '' // 角色54321
      },
      rulefrom: {
        memberName: '',
        memberId: '409407265766866944',
        channelType: '1'
      },
      // headerShow: false,
      // isEdit: false,
      joinGroup: '1',
      isPrivateMessage: '1',
      isUsed: '1',
      isShowName: '1',
      isInviate: '1',
      isSecret: '1',
      chatBackground: '1',
      isSee: '1',
      personInfo: {
        id: '32131',
        idType: '1',
        name: 'xxx',
        nameType: '1',
        sex: '男',
        sexType: '1',
        otherName: 'ddd',
        otherNameType: '1',
        wexnum: '121',
        wexnumType: '1',
        qqnum: '43242',
        qqnumType: '1',
        tel: '123123123',
        telType: '1',
        avatar: 'sda',
        avatarType: '1',
        birthday: '19900206',
        birthdayType: '1',
        hobby: '',
        hobbyType: '1',
        major: 'dasa',
        majorType: '1',
        school: 'dasdad',
        schoolType: '1',
        address: 'dsadas',
        addressType: '1',
        nation: 'adaddsf',
        nationType: '1',
        level: '3',
        levelType: '1',
        limit: '4',
        limitType: '1',
        sign: 'dfsd',
        signType: '1',
        company: '',
        companyType: '1',
        companyAddr: '',
        companyAddrType: '1',
        job: '',
        jobType: '1',
        career: '',
        careerType: '1',
        offer: '',
        offerType: '1',
        need: '',
        needType: '1',
        bean: '',
        beanType: '1',
        coin: '',
        coinType: '1',
        connect: '',
        connectType: '1',
        angel: '',
        angelType: '1',
        send: '',
        sendType: '1',
        receive: '',
        receiveType: '1',
        cashTimes: '',
        cashTimesType: '1',
        cashNum: '',
        cashNumType: '1',
        nameInGroup: '',
        nameInGroupType: '1',
        role: '',
        roleType: '1',
        levelInGroup: '',
        levelInGroupType: '1',
        inviter: '',
        inviterType: '1',
        inTime: '2018-1-12',
        inTimeType: '1'
      },
      options: [
        {
          value: '1',
          label: '公开'
        }
      ],
      rules: {
        memberName: [
          { required: true, message: '请输入会员名称', trigger: 'change' }
        ],
        memberId: [
          { required: true, message: '请输入会员ID', trigger: 'change' }
        ]}
    }
  },
  filters: {
    changeString: function(data) {
      return String(data)
    }
  },
  methods: {
		goBack () {
//			this.$router.push('/circlemanage/manage/member')
			this.$router.go(-1)
		},
    // 保存 -添加会员接口
    editMember() {
      if (this.typeArr.includes('notLooked')) {
        this.form.allowFlag = '1'
      } else {
        this.form.allowFlag = '2'
      }
      if (this.typeArr.includes('notLook')) {
        this.form.lookFlag = '1'
      } else {
        this.form.lookFlag = '2'
      }
      console.log(this.form)
      editCircleMember(this.form)
      .then(res => {
        this.$router.go(-1)
        this.$message.success('编辑圈成员成功')
      })
      .catch(() => {
        this.$message.error('编辑圈成员失败')
      })
    },
    getDetail() {
      var _this = this
      console.log('查询')
      var obj = {}
      obj.circleId = _this.$route.query.id
      obj.channelType = _this.$route.query.channelType
      // obj.channelType = '1'
      obj.memberId = _this.$route.query.memberId
      getCircleDetail(obj)
      .then(res => {
        res.data.circleMemVo.disturbFlag = String(res.data.circleMemVo.disturbFlag)
        res.data.circleMemVo.earnFlag = String(res.data.circleMemVo.earnFlag)
        res.data.circleMemVo.friendFlag = String(res.data.circleMemVo.friendFlag)
        res.data.circleMemVo.oftenFlag = String(res.data.circleMemVo.oftenFlag)
        res.data.circleMemVo.allowFlag = String(res.data.circleMemVo.allowFlag)
        res.data.circleMemVo.showNicenameSwitch = String(res.data.circleMemVo.showNicenameSwitch)
        // res.data.circleMemVo.memberNicename = String(res.data.circleMemVo.memberNicename)
        if (res.data.circleMemVo.allowFlag == '1') {
          _this.typeArr.push('notLook')
        } else if (res.data.circleMemVo.lookFlag == '1') {
          _this.typeArr.push('notLooked')
        }
        _this.$message.success('搜索会员成功')
        if (!res.data.personalInfo) {
          return
        }
        _this.form.memberId = res.data.personalInfo.mId
        _this.form.grade = res.data.circleMemVo.circleGrade
        _this.form.disturbFlag = res.data.circleMemVo.disturbFlag
        _this.form.circleName = res.data.circleMemVo.circleName
        _this.form.circleNickName = res.data.circleMemVo.circleNickName
        _this.form.roleType = res.data.circleMemVo.roleType
        _this.form.friendFlag = res.data.circleMemVo.friendFlag
        _this.form.earnFlag = res.data.circleMemVo.earnFlag
        _this.form.oftenFlag = res.data.circleMemVo.oftenFlag
        _this.form.showNicenameSwitch = res.data.circleMemVo.showNicenameSwitch
        _this.form.memberNicename = res.data.circleMemVo.memberNicename
				_this.saveBackData.personalInfo = res.data.personalInfo
				_this.saveBackData.circleMemVo = res.data.circleMemVo
				_this.saveBackData.joinCirclrs = res.data.joinCirclrs
				_this.saveBackData.joinCrowds = res.data.joinCrowds
    		if(res.data.joinCrowds.length){
    			_this.saveBackData.joinCrowds = []
   		 			for(let i=0;i<res.data.joinCrowds.length;i++){
   		 				_this.saveBackData.joinCirclrs.push(res.data.joinCrowds[i])
   		 			}
    		}else{
    			_this.saveBackData.joinCrowds = res.data.joinCrowds
    		}
    		if(res.data.joinCirclrs.length){
    			_this.saveBackData.joinCirclrs = []
   		 			for(let i=0;i<res.data.joinCirclrs.length;i++){
   		 				_this.saveBackData.joinCirclrs.push(res.data.joinCirclrs[i])
   		 			}
    		}else{
    			_this.saveBackData.joinCrowds = res.data.joinCirclrs
    		}
      })
      .catch(() =>{
        _this.$message.error('搜索会员失败')
      })
    },
    searchSubmit() {
      var obj = {}
      obj.memberId = this.$route.query.id
      obj.channelType = this.$route.query.channelType
      getCircleDetail(obj)
      .then(res => {
        this.$message.success('搜索会员成功')
      })
      .catch(() =>{
        this.$message.error('搜索会员失败')
      })
    }
  },
  mounted () {
    this.getDetail()
    // var status = this.$route.query.status
    // if (status) {
    //   this.searchSubmit()
    //   console.log('编辑')
    //   this.isEdit = true
    // } else if (!status){
    //   console.log('详情')
    //   this.getDetail()
    //   this.isEdit = false
    // }
  }
}
</script>
<style scoped>
table {
  margin-bottom:20px;
  border-collapse: collapse;
  width: 100%;
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
  height: 36px;
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

.textAlignR {
  text-align: right;
  padding-right: 15px;
}

.grayBackground {
  background: #f1f1f1;
}

.center {
  text-align: center;
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
</style>
