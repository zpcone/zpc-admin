<template>
  <div>
			<div class="header" style="padding-left: 20px;padding-bottom: 20px;">
				<!--按钮组  -->
					<el-button size="mini" @click="back">返回</el-button>
				<!--返回  保存 -->
			</div>
    <table width="100%" border="1">
      <tr>
        <th rowspan="17" v-if="this.channelType == '2'" class="w15 grayBackground">会员基本信息</th>
        <th rowspan="18" v-if="this.channelType == '1'" class="w15 grayBackground">会员基本信息</th>
        <th class="grayBackground w15">会员ID</th>
        <th class="textAlignL">
          <el-row>
            <el-col :span="4">
              <el-input :disabled="isShow" size="mini" v-model.trim="personInfo.memberInfo.mId"></el-input>
            </el-col>
            <el-col :span="8"  style="padding: 0 5px;">
              用户名：<el-input :disabled="isShow" size="mini" style="width: 100px;" v-model.trim="personInfo.other.nickname"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.idType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.nickname"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.nameType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.sex"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.sexType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">会员昵称</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.nickname"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.otherNameType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.weixin"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.wexnumType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">QQ号</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.qQ"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.qqnumType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.mobile"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.telType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">头像</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.headPortaitSrc"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.avatarType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.birthday"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.birthdayType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.interest"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.hobbyType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.specialty"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.majorType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class=" grayBackground">学校</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.school"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.schoolType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.address"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.addressType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class=" grayBackground">家乡</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.hometown"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.nationType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.level"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.levelType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">信用额度</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.limit"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.limitType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.personalIntro"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.signType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">邮箱</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.email"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.emailType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.company"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.companyType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">公司地址</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.address"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.companyAddrType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.occupation"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.jobType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">职业</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.memberInfo.occupation"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.careerType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.offer"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.offerType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">需求资源</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.need"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.needType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.beanTotal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.beanType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">盈币</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.moneyTotal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.coinType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.peopleVal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.connectType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">天使值</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.angelVal"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.angelType">
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
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.publicLampSum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.sendType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">接灯数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.receiverLampSum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.receiveType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr v-if="this.channelType == '1'">
        <td class="grayBackground">朋友圈数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.send"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.sendType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">主题数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.receive"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.receiveType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <!--<td class="grayBackground">变现次数</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.cashTimes"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.cashTimesType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>-->
        <!--<td class="grayBackground">变现金额</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.cashNum"></el-input>
            </el-col>
            <el-col :span="12" class="textAlignR">
              <el-select size="mini" :disabled="isShow" v-model="personInfo.cashNumType">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </td>-->
      </tr>
      <tr>
        <td class="grayBackground">已加入的圈子</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (personInfo.circleList)" :key="item.crowdId">{{item.crowdName}}</span>
        </td>
        <td class="grayBackground">已加入的群组</td>
        <td>
        	<span style="display: inline-block;height: 30px;width:30%;background: #AAAAAA;float: left;margin-left: 10px;
        		border-radius:10%;text-align: center;line-height: 30px;"
        		v-for="(item,index) in (personInfo.crowdsList)" :key="item.crowdId">{{item.crowdName}}</span>
        </td>
      </tr>

      <tr>
        <td class="grayBackground" rowspan="3">群内信息</td>
        <td class="grayBackground">群内昵称</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="!isView" size="mini" v-model.trim="saveForm.nickName" placeholder="请输入新的群内昵称" maxlength="8"></el-input>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">角色</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-select size="mini" :disabled="!isView || isOwer" v-model="saveForm.roleType" @change="roleTypeValue">
                <el-option v-for="(item,index) in roleOptions" :label="item.label" :value="item.roleType" :key="item.roleType"></el-option>
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
              <el-input :disabled="!isView" size="mini" v-model="saveForm.leverGroup" placeholder="" disabled></el-input>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">邀请人</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
              <el-input :disabled="isShow" size="mini" v-model="personInfo.other.inviter"></el-input>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">进群时间</td>
        <td class="textAlignL">
          <el-row>
            <el-col :span="12">
            	<!--created 进群时间-->
              <el-date-picker size="mini" :disabled="isShow" v-model="personInfo.other.created" type="datetime"></el-date-picker>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground">角色历史</td>
        <td class="textAlignL">
          <!--<el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              <p>历任角色：</p>
              <p>联席群主角色起止时间：2017/09/12-2017/11/11</p>
              <p>联席群主角色起止时间：2017/09/12-2017/11/11</p>
              <p>联席群主角色起止时间：2017/09/12-2017/11/11</p>
            </div>
            <el-button size="mini" @click="roleView">查看</el-button>
          </el-tooltip>-->
          <el-button size="mini" @click="roleView">查看</el-button>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">仅后台可见</td>
        <td class="grayBackground">进群方式</td>
        <td class="textAlignL">
          <!--<el-radio-group v-model="flowType" :disabled="isShow">
            <el-radio label="1">主动进群</el-radio>
            <el-radio label="2">邀请进群</el-radio>
            <el-radio label="3">好友推荐</el-radio>
            <el-radio label="4">后台增设</el-radio>
          </el-radio-group>-->
          <el-row>
            <el-col :span="12">
              <el-input :disabled="!isView" size="mini" v-model="personInfo.other.flowType" placeholder="进群方式" disabled></el-input>
            </el-col>
          </el-row>
        </td>
        <td class="grayBackground"></td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="7" class="grayBackground">群成员对群的设置</td>
        <td class="grayBackground">消息免打扰</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.messageNotDisturb"  prop="messageNotDisturb" :disabled="!isView" @change="message">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">设为常用群</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.oftenFlag" :disabled="!isView" prop="oftenFlag"  @change="often">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">显示群成员昵称</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.showNicenameSwitch" prop="showNicenameSwitch" @change="showNicename" :disabled="!isView">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">是否需要群主确认邀请进群</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.confirmSwitch" prop="confirmSwitch" @change="confirm" :disabled="isShow || isOwer">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
          </el-radio-group>
          <span style="margin-left: 40px;color: red;">群主专有功能 </span>
        </td>
      </tr>
      <tr>
        <td class="grayBackground">将群设为隐秘状态</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="saveForm.hideSwitch" prop="hideSwitch" @change="setHide" :disabled="isShow || isOwer">
            <el-radio label="1">开</el-radio>
            <el-radio label="0">关</el-radio>
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
      <!--<tr>
        <td class="grayBackground">朋友圈对圈成员可见</td>
        <td colspan="3" class="textAlignL">
          <el-radio-group v-model="isSee">
            <el-radio label="1">开</el-radio>
            <el-radio label="2">关</el-radio>
          </el-radio-group>
        </td>
      </tr>-->
    </table>
		<el-dialog title="历任角色" :visible.sync="dialogTableVisible" width="30%">
		  <el-table :data="roleData">
		    <el-table-column prop="roleType" :formatter="groupRole" label="角色名称" width="150"></el-table-column>
		    <el-table-column prop="created" label="开始时间" width="200"></el-table-column>
		    <el-table-column prop="end" label="结束时间" :formatter="timeStatus"></el-table-column>
		  </el-table>
		</el-dialog>
    <!--<el-button type="primary" @click="submit">提交</el-button>-->
  </div>
</template>

<script>
import { detail, editSave, roleHistory } from "@/api/group/members";
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
    mId: {
      type: String,
      default: ""
    },
    crowdId: {
      type: String,
      default: ""
    },
    channelType: {
      type: String,
      default: ""
    },
    flowType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      isEdit: false,
      newAdd: false,
      isShow: false,
      isView: false,
      isOwer: false,
      joinGroup: "1",
      isPrivateMessage: "1",
      isUsed: "1",
      isShowName: "1",
      isInviate: "1",
      isSecret: "1",
      chatBackground: "1",
      isSee: "1",
      personInfo: {
        crowdsList: [
          {
            crowdName: "",
            crowdId: "",
            crowdLogo: ""
          }
        ],
        circleList: [],
        memberInfo: {
          mId: ""
        },
        other: {
          beanTotal: "",
          flowType: ""
        }
      },
      saveForm: {
        messageNotDisturb: "0",
        oftenFlag: "0",
        showNicenameSwitch: "0",
        confirmSwitch: "0",
        hideSwitch: "0",
        roleType: "",
        mId: ""
      },
      roleData: [
        {
          roleType: "",
          created: ""
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
      this.$router.go(-1);
    },
    handleQuery() {
      detail({
        mId: this.mId,
        crowdId: this.crowdId,
        channelType: this.channelType
      }).then(res => {
        //console.log(res.data)
        if (res.data && res.status == 200) {
          if (res.data.crowdsList.length) {
            this.personInfo.crowdsList = [];
            for (let i = 0; i < res.data.crowdsList.length; i++) {
              let obj = {};
              obj.crowdId = res.data.crowdsList[i].crowdId;
              obj.crowdName = res.data.crowdsList[i].crowdName;
              this.personInfo.crowdsList.push(obj);
            }
          } else {
            this.personInfo.crowdsList = res.data.crowdsList;
          }
          if (res.data.circleList.length) {
            this.personInfo.circleList = [];
            for (let i = 0; i < res.data.circleList.length; i++) {
              let obj = {};
              obj.circleId = res.data.circleList[i].circleId;
              obj.circleName = res.data.circleList[i].circleName;
              this.personInfo.circleList.push(obj);
            }
          } else {
            this.personInfo.crowdsList = res.data.crowdsList;
          }
          this.personInfo.memberInfo = res.data.memberInfo;
          this.personInfo.other = res.data.other;
          this.saveForm.messageNotDisturb =
            res.data.other.messageNotDisturb + "";
          this.saveForm.oftenFlag = res.data.other.oftenFlag + "";
          this.saveForm.showNicenameSwitch =
            res.data.other.showNicenameSwitch + "";
          this.saveForm.confirmSwitch = res.data.other.confirmSwitch + "";
          this.saveForm.hideSwitch = res.data.other.hideSwitch + "";
          this.saveForm.nickName = res.data.other.nickName;
          this.saveForm.roleType = res.data.other.roleType + "";
          this.saveForm.roleType = res.data.other.roleType + "";
          if (res.data.other.roleType == 0) {
            this.isOwer = false;
          }
          if (this.channelType == "1") {
            if (res.data.memberInfo.sex == "0") {
              res.data.memberInfo.sex = "";
            } else if (res.data.memberInfo.sex == "1") {
              res.data.memberInfo.sex = "女神";
            } else if (res.data.memberInfo.sex == "2") {
              res.data.memberInfo.sex = "男神";
            } else if (res.data.memberInfo.sex == "3") {
              res.data.memberInfo.sex = "保密";
            }
          } else if (this.channelType == "2") {
            if (res.data.memberInfo.sex == "0") {
              res.data.memberInfo.sex = "男";
            } else if (res.data.memberInfo.sex == "1") {
              res.data.memberInfo.sex = "女";
            }
          }
          if (res.data.other.flowType == 1) {
            res.data.other.flowType = "主动进群";
          } else if (res.data.other.flowType == 2) {
            res.data.other.flowType = "被邀请进群";
          } else if (res.data.other.flowType == 3) {
            res.data.other.flowType = "主动退群";
          } else if (res.data.other.flowType == 4) {
            res.data.other.flowType = "被踢出群";
          } else if (res.data.other.flowType == 5) {
            res.data.other.flowType = "角色改变";
          } else if (res.data.other.flowType == 6) {
            res.data.other.flowType = "禁言";
          } else if (res.data.other.flowType == 7) {
            res.data.other.flowType = "修改用户昵称";
          } else if (res.data.other.flowType == 8) {
            res.data.other.flowType = "同意邀请进群";
          } else if (res.data.other.flowType == 9) {
            res.data.other.flowType = "拒绝邀请进群";
          } else if (res.data.other.flowType == 10) {
            res.data.other.flowType = "扫码推荐";
          } else if (res.data.other.flowType == 11) {
            res.data.other.flowType = "后台增设";
          }
        } else if (res.errorMsg != "" || res.status == 500) {
          this.$message.warning("暂无该用户相关信息！");
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
    //点击保存  更改详情信息
    saveDetail() {
      if (!this.saveForm.nickName || !this.saveForm.roleType) {
        this.$message.warning("请填写昵称（角色必选！）");
        return;
      } else {
        this.saveForm.userId = "1122334455";
        this.saveForm.mId = this.personInfo.memberInfo.mId;
        this.saveForm.crowdId = this.crowdId;
        if (this.saveForm.roleType == "群主") {
          this.saveForm.roleType = "0";
        } else if (this.saveForm.roleType == "联席群主") {
          this.saveForm.roleType = "1";
        } else if (this.saveForm.roleType == "行为会员") {
          this.saveForm.roleType = "2";
        }
        if (this.saveForm.messageNotDisturb == "undefined") {
          this.saveForm.messageNotDisturb = "0";
        } else if (this.saveForm.oftenFlag == "undefined") {
          this.saveForm.oftenFlag = "0";
        } else if (this.saveForm.showNicenameSwitch == "undefined") {
          this.saveForm.showNicenameSwitch = "0";
        } else if (this.saveForm.confirmSwitch == "undefined") {
          this.saveForm.confirmSwitch = "0";
        } else if (this.saveForm.hideSwitch == "undefined") {
          this.saveForm.hideSwitch = "0";
        }
        editSave(this.saveForm).then(res => {
          //console.log(res)
          if (res.data == true && res.status == "200") {
            this.$message.success("修改成功！");
            this.$router.push({
              path: "/group/manage/member",
              query: {
                crowdId: this.crowdId,
                channelId: this.channelType
              }
            });
            //this.$router.push('/group/manage/member')
          } else if (res.errorMsg != "" && res.status == "500") {
            this.$message.warning(
              "请检查当前角色是否为群主，如为群主，只能选群主角色！不可做其他角色更改！"
            );
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

    //	timeStatus(row) {
    //    if (row.created === '1') {
    //      return '电商'
    //    } else if (row.channelType === '2') {
    //      return '社交'
    //    }
    //  },

    //查看角色按钮
    roleView() {
      //console.log(111)
      this.dialogTableVisible = true;
      roleHistory({
        mId: this.personInfo.memberInfo.mId,
        crowdId: this.crowdId
        //			crowdId: '2433262367665496064',
        //			mId: '429284578188791808'
      }).then(res => {
        //console.log(res)
        this.roleData = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj1 = {};
          obj1.roleType = res.data[i].roleType;
          obj1.created = res.data[i].created;
          if (i + 1 < res.data.length) {
            obj1.end = res.data[i + 1].created;
          } else {
            obj1.end = "至今";
          }
          this.roleData.push(obj1);
        }
      });
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
    //练习
    //  submit () {
    //  	console.log('submit')
    //  	this.$emit('childSubmit',{form: this.form})
    //  }
  },
  created() {
    this.isEdit();
    this.handleQuery();
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
