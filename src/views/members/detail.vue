<template>
	<section>
		<div class="tabs">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="first">
					<div class="clearfix">
						<div class="fl"><i>用户名</i><span>{{info.userName}}</span></div>
						<div class="fl"><i>等级</i><span>{{info.leave}}</span></div>
						<div class="fl"><i>手机号</i><span>{{info.phone}}</span></div>
						<div class="fl"><i>角色</i><span>{{info.role}}</span></div>
						<div class="fl"><i>用户id</i><span>{{info.userId}}</span></div>
						<div class="fl"><i>QQ号</i><span>{{info.qq}}</span></div>
						<div class="fl"><i>信用额度</i><span>{{info.lineOfCredit}}</span></div>
						<div class="fl"><i>微信号</i><span>{{info.weixin}}</span></div>
						<!-- <div class="fl"><i>用户头像</i><img v-bind:src="user.headPortaitSrc" alt="avatar" /></div> -->
					</div>
				</el-tab-pane>
				<el-tab-pane label="互动信息" name="second">
					<div class="clearfix">
						<div class="fl"><i>好友数</i><span>{{interaction.numberOfFriends}}</span></div>
						<div class="fl"><i>能量值</i><span>{{interaction.energyValue}}</span></div>
						<div class="fl"><i>人脉值</i><span>{{interaction.peopleValue}}</span></div>
						<div class="fl"><i>发灯数</i><span>{{interaction.numberOfHairLight}}</span></div>
						<div class="fl"><i>天使值</i><span>{{interaction.angelValue}}</span></div>
						<div class="fl"><i>点灯数</i><span>{{interaction.numberOfLamps}}</span></div>
						<div class="fl"><i>圈子数</i><span>{{interaction.numberOfCircle}}</span></div>
						<div class="fl"><i>群数</i><span>{{interaction.groupNumber}}</span></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="其他属性" name="third">
					<div class="clearfix">
						<div class="fl"><i>真实姓名</i><span>{{otherAttribute.realName}}</span></div>
						<div class="fl"><i>生日</i><span>{{otherAttribute.birthday}}</span></div>
						<div class="fl"><i>昵称</i><span>{{otherAttribute.nickName}}</span></div>
						<div class="fl"><i>地区</i><span>{{otherAttribute.regionId}}</span></div>
						<div class="fl"><i>性别</i><span>{{otherAttribute.sex}}</span></div>
						<div class="fl"><i>学校</i><span>{{otherAttribute.school}}</span></div>
						<div class="fl"><i>年龄</i><span>{{otherAttribute.age}}</span></div>
						<div class="fl"><i>专业</i><span>{{otherAttribute.specialty}}</span></div>
						<div class="fl"><i>公司名称</i><span>{{otherAttribute.company}}</span></div>
						<div class="fl"><i>家乡</i><span>{{otherAttribute.hometown}}</span></div>
						<div class="fl"><i>公司地址</i><span>{{otherAttribute.companyAddress}}</span></div>
						<div class="fl"><i>职业</i><span>{{otherAttribute.occupation}}</span></div>
						<div class="fl"><i>个人签名</i><span>{{otherAttribute.personalSignature}}</span></div>
						<div class="fl"><i>兴趣</i><span>{{otherAttribute.interest}}</span></div>
						<div class="fl"><i>邮箱</i><span>{{otherAttribute.email}}</span></div>
						<div class="fl"><i>个人简历</i><span class="resumeDetail" @click="resumeDetail">详情</span></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="TA的好友" name="five">
          <div style="height:30px;"></div>
          <span style="margin-left:50px;">TA的好友:共
           <span style="color:red;">{{totalFriendCount}}</span>
          人
          </span>
          <el-tabs style="margin:50px 0 0 50px;" v-model="activeFriendName" @tab-click="handleFriendClick">
            <el-tab-pane label="全部好友" name="first">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <div class="friendColumn" :key="index" v-for="(item,index) in allFriendList">
                    <div class="friendAvater"> <img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:20px;line-height:50px;">用户名:{{item.userName}}</span>
                    <span style="margin-left:20px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <!-- 全部还有翻页 -->
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChangeTotal"
                      @current-change="handleCurrentChangeTotal"
                      :current-page="currentPageTotal"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="totalPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="allFriendpageTotal">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="一度好友" name="second">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <div class="onceFriend" :key="index" v-for="(item,index) in onceFriendList">
                    <div class="friendAvater"> <img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:20px;line-height:50px;">用户名:{{item.userName}}</span>
                    <span style="margin-left:20px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChangeOnce"
                      @current-change="handleCurrentChangeOnce"
                      :current-page="currentPageOnce"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="onePageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="oneFriendpageTotal">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="二度好友" name="third">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <div class="twoFriend" :key="index" v-for="(item,index) in thirdFriendList">
                    <div class="friendAvater"> <img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:20px;line-height:50px;">用户名:{{item.userName}}</span>
                    <span style="margin-left:20px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChangeTwo"
                      @current-change="handleCurrentChangeTwo"
                      :current-page="currentPageTwo"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="twoPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="twoFriendpageTotal">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="绿名单好友" name="fourth">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <div class="greenFriend" :key="index" v-for="(item,index) in greenFriendList">
                    <div class="friendAvater"> <img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:20px;line-height:50px;">用户名:{{item.userName}}</span>
                    <span style="margin-left:20px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChangeGreen"
                      @current-change="handleCurrentChangeGreen"
                      :current-page="currentPageGreen"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="greenPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="greenFriendpageTotal">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="自建分组" name="five">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <span>请选择分组:</span>
                  <el-select clearable v-model="value" @change = "optionValueChange" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.fGroupName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <div style="margin-top:50px;">
                    <div class="greenFriend" :key="index" v-for="(item,index) in selfGroup">
                      <div class="friendAvater"><img style="width:100%;height:100%;border-radius:50%;" :src="item.headPortaitSrc" alt="图片"></div>
                      <span style="margin-left:50px;line-height:50px;">用户名:{{item.userName}}</span>
                      <span style="margin-left:50px;line-height:50px;">添加时间:
                        <span>{{item.created}}</span>
                      </span>
                  </div>
                  </div>
                </div>
              </div>
              <!-- <div class="greenFriend" :key="index" v-for="(item,index) in selfGroup">
                <div class="friendAvater"></div>
                <span style="margin-left:50px;line-height:50px;">用户名</span>
                <span style="margin-left:50px;line-height:50px;">添加时间:
                  <span>2015-10-12</span>
                </span>
              </div> -->
              <!-- <div class="block"> -->
                <!-- <el-pagination
                  @size-change="handleSizeChangeSelf"
                  @current-change="handleCurrentChangeSelf"
                  :current-page="currentPageSelf"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="40">
                </el-pagination>
              </div> -->
            </el-tab-pane>
          </el-tabs>
				</el-tab-pane>
				<!-- <el-tab-pane label="物流发票信息" name="fourth">
					<div class="logistics">
						<p class="header">收获地址</p>
						<div class="content">
							<p v-for="(item,index) in addrs" :key="index">
                <span style="margin-right:55px;">地址{{index + 1}}:</span>
                <span>{{item.address + ',' +item.tel+ ',' +item.name}}</span>
                <span v-if="index == 0" style="float:right;"><el-button size="mini">默认</el-button></span>
              </p>
						</div>
						<p class="header">发票信息</p>
						<div class="content rise">
							<p v-for="(item, index) in rises" :key="index"><i class="w70">信息{{index + 1}}：</i><i>发票抬头：</i>{{item.company}} <br />
							<i class="w70"></i><i>纳税人识别号：</i>{{item.num}}
							<span v-if="index == 0" style="float:right;"><el-button size="mini">默认</el-button></span></p>
						</div>
						<p class="header">收票地址</p>
						<div class="content">
							<p v-for="(item,index) in getAddrs" :key="index">
                <span style="margin-right:55px;">地址{{index + 1}}:</span>
                <span>{{item.address + ',' +item.tel+ ',' +item.name}}</span>
                <span v-if="index == 0" style="float:right;"><el-button size="mini">默认</el-button></span>
                <span v-if="index !== 0" style="float:right;"><el-button size="mini">创建</el-button></span>
              </p>
						</div>
					</div>
				</el-tab-pane> -->
			</el-tabs>
		</div>
		<!-- <div class="btnGroup">
			<el-button type="info" @click="resetPassword">重置密码</el-button>
			<el-button type="info">封禁</el-button>
			<el-button type="info">查看账户信息</el-button>
		</div> -->
	</section>
</template>
<script>
// =====自建分组 ==================基本信息=============互动=====================其他属性========全部好友=================一度好友==========二度好友==============自建分组=================绿名单好友=========我的分组列表
import { socialearchSelfGroup, getSocialBasicInfo, socialInteractionInfo, socialOtherAttr, findAllSocialFriends, socialFindOneFriend, socialFindTwoFriend, socialSearchSelfGroup, greenSocialFriend, socialGroupList } from '@/api/members'
export default {
  data() {
    return {
      // 总条数
      allFriendpageTotal: '', // 全部好友总页数
      oneFriendpageTotal: '', // 全部好友总页数
      twoFriendpageTotal: '', // 全部好友总页数
      greenFriendpageTotal: '', // 全部好友总页数
      selfFriendpageTotal: '', // 全部好友总页数
      totalFriendCount: '', // 好友数
      // 当前页数
      currentPageOnce: 1, // 一度
      currentPageTotal: 1, // 全部
      currentPageTwo: 1, // 二度
      currentPageGreen: 1, // 绿名单
      currentPageSelf: 1, // 自建

      // 每页条数
      totalPageSize: 10, // 一度
      onePageSize: 10, // 一度
      twoPageSize: 10, // 一度
      greenPageSize: 10, // 一度
      selfPageSize: 10, // 一度

      params: {}, // 接口参数
      options: [],
      value: '',
      allFriendList: [], //全部好友
      onceFriendList: [], // 一度好友
      thirdFriendList: [], // 二度好友
      greenFriendList: [], // 绿名单好友
      selfGroup: [], // 自建分组
      activeName: 'first',
      activeFriendName: 'first',
      info: { // 保存基本信息
        phone: '', //	手机号
        userName: '', //	用户名
        userId: '', //	用户ID
        headPortaitSrc: '', //	用户头像
        source: '', //	来源
        leave: '', //	等级
        role: '', // 	角色
        qq: '', //QQ号
        weixin: '', //	微信号
        lineOfCredit: '' //	信用额度
      },
       // 保存互动信息
      interaction: {
        numberOfFriends: '', //	好友数
        peopleValue: '', //	人脉值
        angelValue: '', //	天使值
        numberOfCircle: '', //	圈子数
        groupNumber: '', //	群数
        energyValue: '', //	能量值
        numberOfHairLight: '', //	发灯数
        numberOfLamps: '' //	点灯数
      },
       // 其他属性
      otherAttribute: {
        numberOfFriends: '', //	好友数
        peopleValue: '', //	人脉值
        angelValue: '', //	天使值
        numberOfCircle: '', //	圈子数
        groupNumber: '', //	群数
        energyValue: '', //	能量值
        numberOfHairLight: '', //	发灯数
        numberOfLamps: '' //	点灯数
      },
      addrs: [
        {address:'dnskgjljgxklfjhk',tel:45465465,name:'name'},
        {address:'dnskgjljgxklfjhk',tel:45465465,name:'name'}
      ],
      getAddrs: [
        {address:'dnskgjljgxklfjhk',tel:45465465,name:'name'},
        {address:'dnskgjljgxklfjhk',tel:45465465,name:'name'}
      ],
      rises: [
        {company:'公司名',num:45465465},
        {company:'公司名',num:45465465}
      ]
    }
  },
  methods: {
    // 自建分组值变化事件
    optionValueChange(data) {
      this.getGroupList()
      console.log('值变化')
    },
    // 重置密码事件
    // resetPassword () {
    //   this.getSocialBasicMess()
    // },
    /*
    *查询社交基本信息-接口
    * */
    getSocialBasicInfo (parama) {
      getSocialBasicInfo (parama)
      .then (res => {
        this.info = res
        this.$message.success('获取基本信息成功')
      })
      .catch(() => {
        this.$message.error('获取基本信息失败')
      })
    },
      // 互动信息接口
    getSocialinteractInfo (parama) {
      socialInteractionInfo (parama)
      .then (res => {
        this.interaction = res
        this.$message.success('获取互动信息成功')
      })
      .catch(() => {
        this.$message.error('获取互动信息失败')
      })
    },
      // 其他属性-接口
    getSocialOther (parama) {
      socialOtherAttr (parama)
      .then (res => {
        this.otherAttribute = res
        if(res.sex == 0){
        	res.sex = '男'
        }else if(res.sex == 1){
        	res.sex = '女'
        }
        this.$message.success('获取其他属性成功')
      })
      .catch(() => {
        this.$message.error('获取其他属性失败')
      })
    },
      // 全部好友-接口
    getAllFriend (parama) {
      var obj = {}
      obj.memberId = this.$route.params.id
      obj.pageSize = this.totalPageSize
      obj.pageNum = this.currentPageTotal
      findAllSocialFriends (obj)
      .then (res => {
        console.log(res)
        this.allFriendList = res.data
        this.allFriendpageTotal = Number(res.totalSize)
        // totalSize 总条数
        this.$message.success('获取全部好友成功')
      })
      .catch(() => {
        this.$message.error('获取全部好友失败')
      })
    },
      // 一度好友-接口
    getoneFriend (parama) {
      var obj = {}
      obj.memberId = this.$route.params.id
      obj.pageSize = this.onePageSize
      obj.pageNum = this.currentPageOnce
      socialFindOneFriend (obj)
      .then (res => {
        // totalSize 总条数
        this.onceFriendList = res.data
        this.oneFriendpageTotal = Number(res.totalSize)
        this.$message.success('获取一度好友成功')
      })
      .catch(() => {
        this.$message.error('获取一度好友失败')
      })
    },
    /**
     * 获取二度好友--接口
    */
    getTwoFriend (parama) {
      var obj = {}
      obj.memberId = this.$route.params.id
      obj.pageSize = this.twoPageSize
      obj.pageNum = this.currentPageTwo
      socialFindTwoFriend(obj)
      .then(res => {
        console.log(res)
        this.thirdFriendList = res.data
        this.twoFriendpageTotal = Number(res.totalSize)
        this.$message.success('获取二度好友成功')
      })
      .catch(() => {
        this.$message.error('获取二度好友失败')
      })
    },
    /**
     *  自建分组-社交
    */
    getSelfGroup (parama) {
      var obj = {}
      obj.memberId = this.$route.params.id
      socialGroupList(obj)
      .then(res => {
        console.log(res)
        this.options = res
        this.$message.success('获取自建分组成功')
      })
      .catch(() => {
        this.$message.error('获取自建分组失败')
      })
    },
    /**
     *  绿名单好友-社交greenSocialFriend
    */
    getGreenFriend () {
      var obj = {}
      obj.memberId = this.$route.params.id
      obj.pageSize = this.greenPageSize
      obj.pageNum = this.currentPageGreen
      greenSocialFriend(obj)
      .then(res => {
        this.greenFriendpageTotal = Number(res.totalSize)
        this.greenFriendList = res.data
        console.log(res)
        this.$message.success('获取绿名单好友成功')
      })
      .catch(() => {
        this.$message.error('获取绿名单好友失败')
      })
    },
    /**
     *  我的分组列表-社交
    */
    getGroupList () {
// memerId	会员ID
// fGroupsId	分组ID
// pageNum	当前页
// pageSize	没页显示条数
      var obj = {}
      obj.memberId = this.$route.params.id
      obj.fGroupsId = '2'
      obj.pageSize = this.totalPageSize
      obj.pageNum = this.currentPageTotal
      socialearchSelfGroup(obj)
      .then(res => {
        this.selfGroup = res.data
        console.log(res)
        this.$message.success('获取分组列表成功')
      })
      .catch(() => {
        this.$message.error('获取分组列表失败')
      })
    },
    // 一度好友翻页事件
    handleSizeChangeOnce(val) {
      this.onePageSize = val
      this.getoneFriend()
    },
    handleCurrentChangeOnce(val) {
      this.currentPageOnce = val
      this.getoneFriend()
    },
    // 全部好友翻页事件
    handleSizeChangeTotal(val) {
      this.totalPageSize = val
      this.getAllFriend()
    },
    handleCurrentChangeTotal(val) {
      this.handleCurrentChangeTotal = val
      this.getAllFriend()
    },
    // 二度好友翻页事件
    handleSizeChangeTwo(val) {
      this.handleCurrentChangeTwo = val
      this.getTwoFriend()
    },
    handleCurrentChangeTwo(val) {
      this.currentPageTwo = val
      this.getTwoFriend()
    },
    // 绿名单好友翻页事件
    handleSizeChangeGreen(val) {
      this.greenPageSize = val
      this.getGreenFriend()
    },
    handleCurrentChangeGreen(val) {
      this.currentPageGreen = val
      this.getGreenFriend()
    },
    // 自建分组 翻页事件
    handleSizeChangeSelf(val) {
    },
    handleCurrentChangeSelf(val) {
    },
    // manage tab切换事件
    handleClick(tab, event) {
      console.log(this.activeName)
      if (this.activeName == 'first') {
        this.getSocialBasicInfo(this.params) // 基本信息
      } else if (this.activeName == 'second') {
        this.getSocialinteractInfo(this.params) // 获取社交互动信息
      } else if (this.activeName == 'third') {
        this.getSocialOther(this.params) // 获取社交-其他属性信息
      } else if (this.activeName == 'five') {
        this.getAllFriend() // 获取社交-全部好友
      }
    },
    // friend tab切换事件
    handleFriendClick(tab, event) {
      console.log(this.activeFriendName)
      if (this.activeFriendName == 'first') {
        this.getAllFriend()
      } else if (this.activeFriendName == 'second') {
        this.getoneFriend() // 获取一度好友
      } else if (this.activeFriendName == 'third') {
        this.getTwoFriend() // 获取二度好友
      } else if (this.activeFriendName == 'fourth') {
        this.getGreenFriend() // 获取绿名单好友
      } else if (this.activeFriendName == 'five') {
        this.getSelfGroup() // 获取自建分组
      }
    },
    resumeDetail () {
      console.log("简历详情")
      this.$router.push('/staff/privateResume')
    }
  },
  mounted () {
    var id = this.$route.params.id
    // this.params.memberId = id
    this.params.memberId = id
    this.getSocialBasicInfo(this.params) // 获取社交基本信息
  },
}
</script>

<style scoped lang="scss">
.resumeDetail{
  margin-left:20px;
  cursor: pointer;
  color:blue;
}
.resumeDetail:hover{
  color:#0099CC;
}
.tabs {
  width: 70%;
  margin: 20px;
}
.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
  height: 0;
}

.fl {
  float: left;
  width: 50%;
  display: block;
  box-sizing: border-box;
  padding: 30px 0 0 30px;
  i {
    font-style: normal;
    display: inline-block;
    width: 20%;
  }
  span {
    display: inline-block;
  }
  img {
    display: inline-block;
    width: 60px;
    height: 60px;
    position: relative;
    top: 20px;
  }
}
.logistics {
  .header {
    font-size: 18px;
    font-weight:bold;
    background: #f1f1f1;
    padding: 10px;
  }
  .content {
    margin: 20px;
    p {
      :first-child{
        font-size: 14px;
        font-weight: bold;
      }
      // position: relative;
    }
    // span {
    //   display: block;
    //   position: absolute;
    //   width: 60px;
    //   height: 20px;
    //   top: 0;
    //   bottom: 0;
    //   margin: auto;
    //   right: 100px;
    //   font-size: 12px;
    //   line-height: 20px;
    //   text-align: center;
    // }
    i {
      font-style: normal;
      display: inline-block;
      width: 190px;
      line-height: 30px;
    }
    .w70 {
      width: 100px;
    }
  }
  .rise p {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
}
.el-tabs {
  min-height: 600px;
}
.btnGroup {
  margin: 20px;
}
// ta的好友的样式
.friendAvater{
  height:50px;
  width:50px;
  border:1px solid gray;
  border-radius: 50%;
  float: left;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.friendColumn, .onceFriend, .greenFriend, .twoFriend{
  display: inline-block;
  width: 500px;
  margin-top:20px;
}
.onceFriend:nth-child(2n), .twoFriend:nth-child(2n), .greenFriend:nth-child(2n), .friendColumn:nth-child(2n){
  margin-left:30px;
}
.block{
  position: absolute;
  bottom: 20px;
  // left: 60px;
  text-align: center;
}
.el-tab-pane{
  position: relative;
}
.friendWrapperAllFriend{
  width:1000px;
  overflow: auto;
}
.friendWrapper{
  height:600px;
  // overflow-x: scroll;
  min-width:950px;
  width: 1300px;
}
</style>
