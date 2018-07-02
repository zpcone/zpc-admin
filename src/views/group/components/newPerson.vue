<template>
  <div>
			<div class="header" style="padding-left: 20px;padding-bottom: 20px;">
				新建群成员
				<!--按钮组  -->
					<el-button size="mini" @click="back">返回</el-button>
					<el-button size="mini" @click="saveDetail">保存</el-button>
				<!--返回  保存 -->
			</div>
    <table width="100%" border="1">
      <tr>
		      	<th class="w15 grayBackground">会员ID</th>
					<td>
						<el-input size="mini" placeholder="请输入会员ID" v-model="newP.mId" type="number" :min="0"></el-input>
					</td>
					<td class="textAlignL"></td>
					<td class="w15 grayBackground">会员名称</td>
					<td>
						<el-input size="mini" placeholder="请输入会员名称" style="width:50%" v-model="newP.nickName" disabled></el-input>
						<el-button size="mini" type="primary" icon="el-icon-search" style="margin: 0 10%;" @click="searchNew">搜索</el-button>
					</td>
      </tr>
      <tr>
        <th rowspan="17" v-if="this.channelType == '2'" class="w15 grayBackground">会员基本信息</th>
        <th rowspan="18" v-if="this.channelType == '1'" class="w15 grayBackground">会员基本信息</th>
        <th class="grayBackground w15">会员ID</th>
        <th class="textAlignL">
          <el-row>
            <el-col :span="4">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.mId"></el-input>
            </el-col>
            <el-col :span="8"  style="padding: 0 5px;">
              用户名：<el-input :disabled="isShow" size="mini" style="width: 100px;" v-model="newPerson.memberInfo.nickName"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.idType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </th>
        <th class="grayBackground w15" v-if="this.channelType == '1'">真实姓名</th>
        <th class="grayBackground w15" v-if="this.channelType == '2'">用户名</th>
        <th class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.nickName"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.nameType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.sex"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.sexType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">会员昵称</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.nickname"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.otherNameType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.weixin"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.wexnumType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">QQ号</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.qQ"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.qqnumType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.mobile"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.telType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">头像</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.headPortaitSrc"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.avatarType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="grayBackground" v-if="this.channelType == '1'">出生日期</td>
        <td class="grayBackground" v-if="this.channelType == '2'">生日</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.birthday"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.birthdayType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">
          <span v-if="this.channelType == '2'">兴趣</span v-show="this.channelType == '1'">
        </td>
        <td class="textAlignL">
          <el-row v-if="this.channelType == '2'">
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.interest"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.hobbyType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.specialty"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.majorType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class=" grayBackground">学校</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.school"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.schoolType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.address"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.addressType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class=" grayBackground">家乡</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.hometown"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.nationType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.level"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.levelType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">信用额度</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.limit"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.limitType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.personalIntro"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.signType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">邮箱</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.email"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.emailType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.company"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.companyType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">公司地址</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.address"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.companyAddrType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.occupation"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.jobType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">职业</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.memberInfo.occupation"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.careerType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.offer"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.offerType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">需求资源</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.need"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.needType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.beanTotal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.beanType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">盈币</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.moneyTotal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.coinType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.peopleVal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.connectType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">天使值</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.angelVal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.angelType">
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
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.publicLampSum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.sendType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">接灯数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.other.receiverLampSum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.receiveType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr v-if="this.channelType == '1'">
        <td class="grayBackground">变现次数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.send"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.sendType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">变现金额</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.receive"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.receiveType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">已加入的圈子</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (newPerson.circleList)" :key="item.crowdId">{{item.crowdName}}</span>
        </td>
        <td class="grayBackground">已加入的群组</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (newPerson.crowdsList)" :key="item.crowdId">{{item.crowdName}}</span>
        </td>
      </tr>
      <tr>
        <!--<td class="grayBackground">变现次数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.cashTimes"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.cashTimesType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>-->
        <!--<td class="grayBackground">变现金额</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="newPerson.cashNum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="newPerson.cashNumType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>-->
      </tr>


      <tr>
        <td class="grayBackground" rowspan="2">群内信息</td>
        <td class="grayBackground">群内昵称</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="!isView" size="mini" v-model="saveForm.memberNicename" placeholder="请输入新的群内昵称" maxlength="8" clearable></el-input>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">角色</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-select size="mini" :disabled="!isView" v-model="saveForm.roleType"  prop="roleType" @change="roleTypeValue">
                <el-option v-for="item in roleOptions" :label="item.label" :value="item.roleType" :key="item.roleType"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">群内等级</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="!isView" size="mini" v-model="saveForm.leverGroup" placeholder="请输入新的群内等级" disabled></el-input>
            </el-col>
          </el-row>
        </td>
        <td class="textAlignL">
        </td>
      </tr>


      <tr>
        <td rowspan="6" class="grayBackground">群成员对群的设置</td>
        <!--<td class="textAlignL"></td>-->
        <td class="grayBackground">消息免打扰</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.messageNotDisturb"  prop="messageNotDisturb" :disabled="!isView" @change="message">
          	<el-radio label="0">关</el-radio>
            <el-radio label="1">开</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">设为常用群</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.oftenFlag" :disabled="!isView" prop="oftenFlag"  @change="often">
          	<el-radio label="0">关</el-radio>
            <el-radio label="1">开</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">显示群成员昵称</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.showNicenameSwitch" prop="showNicenameSwitch" @change="showNicename" :disabled="!isView">
          	<el-radio label="0">关</el-radio>
            <el-radio label="1">开</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">是否需要群主确认邀请进群</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.confirmSwitch" prop="confirmSwitch" @change="confirm" :disabled="isView">
          	<el-radio label="0">关</el-radio>
            <el-radio label="1">开</el-radio>
          </el-radio-group>
          <span style="margin-left: 40px;color: red;">群主专有功能 </span>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">将群设为隐秘状态</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.hideSwitch" prop="hideSwitch" @change="setHide" :disabled="isView">
          	<el-radio label="0">关</el-radio>
            <el-radio label="1">开</el-radio>
          </el-radio-group>
          <span style="margin-left: 40px;color: red;">群主专有功能 </span>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">当前聊天背景</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="chatBackground" :disabled="isShow">
            <el-radio label="1">系统默认背景图</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { detail, newMember } from "@/api/group/members";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    },
    newAdd: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    personId: {
      type: String,
      default: ""
    },
    buttonAction: {
      type: String,
      default: "back" // back  返回   save  保存
    },
    crowdId: {
      type: String,
      default: ""
    },
    channelType: {
      type: String,
      default: ""
    },
    crowdName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newP: {
        nickName: "",
        mId: ""
      },
      isSearchYorNo: false,
      isEdit: false,
      newAdd: false,
      isShow: false,
      isView: false,
      chatBackground: "1",
      isSee: "1",
      newPerson: {
        circleList: [],
        crowdsList: [],
        memberInfo: {
          mId: "",
          nickname: ""
        },
        other: {
          beanTotal: ""
        }
      },
      saveForm: {
        memberNicename: "", //新的群内昵称
        messageNotDisturb: "1",
        oftenFlag: "1",
        showNicenameSwitch: "1",
        confirmSwitch: "1",
        hideSwitch: "1"
      },
      roleData: [
        {
          roleType: "",
          created: "",
          end: ""
        }
      ],
      options: [
        {
          value: "1",
          label: "公开"
        },
        {
          value: "2",
          label: "保密"
        },
        {
          value: "3",
          label: "条件公开"
        }
      ],
      roleOptions: [
        {
          roleType: "0",
          label: "群主"
        },
        {
          roleType: "1",
          label: "联席群主"
        },
        {
          roleType: "2",
          label: "行为会员"
        }
        //      {
        //        roleType: '3',
        //        label: '观摩会员'
        //      }
      ],
      roleHistoryData: [
        {
          role: "角色"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.push({
        path: "/group/manage/member",
        query: {
          crowdId: this.crowdId,
          channelId: this.channelType,
          crowdName: this.crowdName
        }
      });
    },

    message(val) {
      this.saveForm.messageNotDisturb = val;
    },
    often(val) {
      this.saveForm.oftenFlag = val;
    },
    showNicename(val) {
      this.saveForm.showNicenameSwitch = val;
    },
    confirm(val) {
      this.saveForm.confirmSwitch = val;
    },
    setHide(val) {
      this.saveForm.hideSwitch = val;
    },
    roleTypeValue(val) {
      this.saveForm.roleType = val;
    },
    //搜索按钮
    searchNew() {
      if (!this.newP.mId) {
        this.$message.warning("会员ID不能为空");
      } else if (this.newP.mId) {
        detail({
          mId: this.newP.mId,
          crowdId: this.crowdId,
          channelType: this.channelType + ""
        }).then(res => {
          //console.log(res)
          if (res.data == "" || res.status == 500) {
            let errorMsg = res.errorMsg;
            this.$message.warning(errorMsg);
            this.isSearchYorNo = false;
            return false;
          } else {
            this.isSearchYorNo = true;
            if (res.data.crowdsList.length) {
              this.newPerson.crowdsList = [];
              for (let i = 0; i < res.data.crowdsList.length; i++) {
                let obj = {};
                obj.crowdId = res.data.crowdsList[i].crowdId;
                obj.crowdName = res.data.crowdsList[i].crowdName;
                this.newPerson.crowdsList.push(obj);
              }
            }
            if (res.data.circleList.length) {
              this.newPerson.circleList = [];
              for (let i = 0; i < res.data.circleList.length; i++) {
                let obj = {};
                obj.circleId = res.data.circleList[i].circleId;
                obj.circleName = res.data.circleList[i].circleName;
                this.newPerson.circleList.push(obj);
              }
            }
            this.newPerson.memberInfo = res.data.memberInfo;
            this.newPerson.other = res.data.other;
            this.newP.nickName = res.data.memberInfo.nickName;
          }
        });
      }
    },
    //点击保存  新增群成员
    saveDetail() {
      let _this = this;
      //  	if(!this.newP.mId || !this.newP.nickName || !this.saveForm.roleType)
      if (
        !_this.newP.mId ||
        !_this.saveForm.roleType ||
        !_this.saveForm.memberNicename
      ) {
        _this.$message.warning("新增失败！请填写完整信息！");
        return false;
      } else if (_this.isSearchYorNo == false) {
        _this.$message.warning("新增失败，请检查会员信息是否正确！");
      } else if (_this.isSearchYorNo == true) {
        newMember({
          userId: "123456789",
          mId: _this.newP.mId,
          crowdId: _this.crowdId,
          memberNicename: _this.saveForm.memberNicename,
          nickName: _this.newPerson.memberInfo.nickname,
          //				nickName:this.newP.nickName,
          //mId: '10000004',
          //crowdId: '407544803618668544',
          //nickName: '测试',
          roleType: _this.saveForm.roleType,
          messageNotDisturb: _this.saveForm.messageNotDisturb,
          oftenFlag: _this.saveForm.oftenFlag,
          showNicenameSwitch: _this.saveForm.showNicenameSwitch
        }).then(res => {
          if (res.data == true && res.status == "200") {
            _this.$message.success("新增成功！");
            _this.$router.push({
              path: "/group/manage/member",
              query: {
                // mId: this.searchForm.mId,
                crowdId: _this.crowdId,
                channelId: _this.channelType,
                crowdName: _this.crowdName
              }
            });
          } else if (res.status == 500 && res.errorMsg != "") {
            let errorMsg = res.errorMsg;
            _this.$message.warning(errorMsg);
          }
        });
      }
    },
    // 列表中角色过滤
    groupRole(row) {
      if (row.roleType === 0) {
        return "群主";
      } else if (row.roleType === 1) {
        return "联席主席";
      } else if (row.roleType === 2) {
        return "行为会员";
      } else if (row.roleType === 3) {
        return "观摩会员";
      }
    },
    // 判断isedit
    isEdit() {
      var status = this.$router.currentRoute.query.isShow;
      this.newAdd = this.$router.currentRoute.query.newAdd;
      this.isView = this.$router.currentRoute.query.isView;
      if (status) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      if (this.newAdd) {
        this.newAdd = false;
      } else {
        this.newAdd = true;
      }
      if (this.isView) {
        this.isView = false;
      } else {
        this.isView = true;
      }
    }
  },
  created() {
    this.isEdit();
  }
};
</script>
<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  background: #808080;
  color: #fff;
}
table {
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
.el-select {
  width: 120px;
}
</style>
