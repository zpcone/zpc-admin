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
						<div class="fl"><i>用户ID</i><span>{{info.userId}}</span></div>
						<div class="fl"><i>QQ号</i><span>{{info.qq}}</span></div>
						<div class="fl"><i>信用额度</i><span>{{info.lineOfCredit}}</span></div>
						<div class="fl"><i>微信号</i><span>{{info.weixin}}</span></div>
						<div class="fl" style="height:130px;">
              <i>用户头像</i>
              <img style="" :src="info.headPortaitSrc" alt="图片">
            </div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="互动信息" name="second">
					<div class="clearfix">
						<div class="fl"><i>好友数</i><span>{{interact.numberOfFriends}}</span></div>
						<div class="fl"><i>能量值</i><span>{{interact.energyValues}}</span></div>
						<div class="fl"><i>人脉值</i><span>{{interact.peopleValue}}</span></div>
						<div class="fl"><i>能量灯</i><span>{{interact.energyLight}}</span></div>
						<div class="fl"><i>天使值</i><span>{{interact.angelValue}}</span></div>
						<div class="fl"><i>发灯数</i><span>{{interact.numberOfHairLight}}</span></div>
						<div class="fl"><i>圈子数</i><span>{{interact.numberOfCircle}}</span></div>
						<div class="fl"><i>点灯数</i><span>{{interact.numberOfLamps}}</span></div>
						<div class="fl"><i>群数</i><span>{{interact.groupNumber}}</span></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="其他属性" name="third">
					<div class="clearfix">
						<div class="fl"><i>真实姓名</i><span>{{otherData.realName}}</span></div>
						<div class="fl"><i>生日</i><span>{{otherData.birthday}}</span></div>
						<div class="fl"><i>昵称</i><span>{{otherData.nickName}}</span></div>
						<div class="fl"><i>地区</i><span>{{otherData.regionId}}</span></div>
						<div class="fl"><i>性别</i><span>{{otherData.sex}}</span></div>
						<div class="fl"><i>学校</i><span>{{otherData.school}}</span></div>
						<div class="fl"><i>年龄</i><span>{{otherData.age}}</span></div>
						<div class="fl"><i>专业</i><span>{{otherData.specialty}}</span></div>
						<div class="fl"><i>公司名称</i><span>{{otherData.company}}</span></div>
						<div class="fl"><i>家乡</i><span>{{otherData.hometown}}</span></div>
						<div class="fl"><i>公司地址</i><span>{{otherData.companyAddress}}</span></div>
						<div class="fl"><i>职业</i><span>{{otherData.occupation}}</span></div>
						<div class="fl"><i>个人签名</i><span>{{otherData.personalSignature}}</span></div>
						<div class="fl"><i>兴趣</i><span>{{otherData.interest}}</span></div>
						<div class="fl"><i>邮箱</i><span>{{otherData.email}}</span></div>
						<!-- <div class="fl"><i>个人简历</i><span class="resumeDetail" @click="resumeDetail">详情</span></div> -->
					</div>
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
        <el-tab-pane label="TA的好友" name="five">
          <div style="height:30px;"></div>
          <span style="margin-left:50px;">TA的好友:
           <span style="color:red;">总人数{{totalFriendCount}}</span>
          人
          </span>
          <el-tabs style="margin:50px 0 0 50px;" v-model="activeFriendName" @tab-click="handleFriendClick">
            <el-tab-pane label="全部好友" name="first">
              <div class="friendWrapperAllFriend">
                <div class="friendWrapper">
                  <div class="friendColumn" :key="index" v-for="(item,index) in allFriendList">
                    <div class="friendAvater"> <img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:20px;line-height:50px;">{{item.userName}}</span>
                    <span style="margin-left:20px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <!-- 全部还有翻页 -->
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="totalFriend.pageNum"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="totalFriend.pageSize"
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
                    <div class="friendAvater"><img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:50px;line-height:50px;">{{item.userName}}</span>
                    <span style="margin-left:50px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="oneFriend.pageNum"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="oneFriend.pageSize"
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
                  <div class="twoFriend" :key="index" v-for="(item,index) in twoFriendList">
                    <div class="friendAvater"><img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:50px;line-height:50px;">{{item.userName}}</span>
                    <span style="margin-left:50px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="twoFriend.pageNum"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="twoFriend.pageSize"
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
                    <div class="friendAvater"><img :src="item.headPortaitSrc" alt="图片"></div>
                    <span style="margin-left:50px;line-height:50px;">{{item.userName}}</span>
                    <span style="margin-left:50px;line-height:50px;">添加时间:
                      <span>{{item.created}}</span>
                    </span>
                  </div>
                  <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="greenFriend.pageNum"
                      :page-sizes="[10, 20, 30, 50]"
                      :page-size="greenFriend.pageSize"
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
                  <el-select v-model="value" placeholder="请选择" @change="selfChangeList">
                    <el-option
                      v-for="item in selfGroupList"
                      :key="item.value"
                      :label="item.fGName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <div style="margin-top:50px;">
                    <div class="greenFriend" :key="index" v-for="(item,index) in selfGroupFriendList">
                      <div class="friendAvater"><img :src="item.headPortaitSrc" alt="图片"></div>
                      <span style="margin-left:50px;line-height:50px;">{{item.userName}}</span>
                      <span style="margin-left:50px;line-height:50px;">添加时间:
                        <span>{{item.created}}</span>
                      </span>
                  </div>
                  </div>
                </div>
              </div>
              <!-- <div class="friendWrapper">
                <div class="greenFriend" :key="index" v-for="(item,index) in selfGroup">
                  <div class="friendAvater"></div>
                  <span style="margin-left:50px;line-height:50px;">用户名</span>
                  <span style="margin-left:50px;line-height:50px;">添加时间:
                    <span>2015-10-12</span>
                  </span>
                </div>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPageSelf"
                    :page-size="selfPageSize"
                    layout="prev, pager, next, jumper"
                    :total="selfFriendpageTotal">
                  </el-pagination>
                </div>
              </div> -->
            </el-tab-pane>
          </el-tabs>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- <div class="btnGroup">
			<el-button type="info">重置密码</el-button>
			<el-button type="info">封禁</el-button>
			<el-button type="info">查看账户信息</el-button>
		</div> -->
	</section>
</template>

<script>
// =========基本信息=============互动信息=========其他属性===========全部好友=============一度好友====================二度好友==================自建分组============绿名单好友===========我的分组列表
import { getMallBasicInfo, mallInteractionInfo, mallOtherAttr, findAllMallFriends, searchOnePointMallFriends, searchTwoPointMallFriends, selfMallCreatGroup, searchMallGreenFried, mallMemberGroupList } from '@/api/members'
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
      totalFriend: {
        pageNum: 1,
        pageSize: '10',
        memberId: this.$route.params.id,
      },
      oneFriend: {
        pageNum: 1,
        pageSize: '10',
        memberId: this.$route.params.id,
      },
      twoFriend: {
        pageNum: 1,
        pageSize: '10',
        memberId: this.$route.params.id,
      },
      greenFriend: {
        pageNum: 1,
        pageSize: '10',
        memberId: this.$route.params.id
      },
      selfFriend: {
        // pageNum: '1',
        // pageSize: '10',
        memberId: this.$route.params.id
      },
      selfFriendList: {
        pageNum: '1',
        pageSize: '10',
        fGroupsId: '1',
        memberId: this.$route.params.id
      },
      // currentPageOnce: 1, // 一度
      // currentPageTotal: 1, // 全部
      // currentPageTwo: 1, // 二度
      // currentPageGreen: 1, // 绿名单
      // currentPageSelf: 1, // 自建

      // // 每页条数
      // totalPageSize: 10, // 一度
      // onePageSize: 10, // 一度
      // twoPageSize: 10, // 一度
      // greenPageSize: 10, // 一度
      // selfPageSize: 10, // 一度
      params: {},
      activeFriendName: 'first',
      activeName: 'first',
      allFriendList: [], //全部好友
      onceFriendList: [], // 一度好友
      twoFriendList: [], // 二度好友
      greenFriendList: [], // 绿名单好友
      selfGroupList: [], // 自建分组
      selfGroupFriendList: [], // 自建分组内部的成员列表
      info: {
        phone: '', //	手机号
        userNam: '', //	用户名
        userId: '', //	用户ID
        headPortaitSrc: '', //	用户头像
        source: '', //	来源
        leave: '', //	等级
        role: '', // 	角色
        qq: '', //	QQ号
        weixin: '', //	微信号
        lineOfCredit: '' //	信用额度
      },
      interact: {
        numberOfFriends: '', //	好友数
        peopleValue: '', //	人脉值
        angelValue: '', //	天使值
        numberOfCircle: '', //	圈子数
        groupNumber: '', //	群数
        energyValue: '', //	能量值
        numberOfHairLight: '', //	发灯数
        numberOfLamps: '' //	点灯数
      },
      otherData: {},
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
    /**
     * 获取基本信息接口
     */
    getMallInfo (data) {
      getMallBasicInfo(data)
      .then(res => {
        this.info = res// 保存后台返回的参数
        this.$message.success('获取基本信息成功')
      })
      .catch(() => {
        this.$message.error('获取基本信息失败')
      })
    },
    /**
     * 查询互动信息的接口
     */
    getMallInteractInfo (data) {
      mallInteractionInfo(data)
      .then(res => {
        this.interact = res // 保存后台返回的参数
        this.$message.success('获取互动信息成功')
      })
      .catch(() => {
        this.$message.error('获取互动信息失败')
      })
    },
    /**
     *查询其他属性--接口
    */
    getMallOther (data) {
      mallOtherAttr(data)
      .then(res => {
        this.otherData = res // 保存后台返回的参数
        if(res.sex == 0){
        	res.sex = ''
        }else if(res.sex == 1){
        	res.sex = '女神'
        }else if(res.sex == 2){
        	res.sex = '男神'
        }else if(res.sex == 3){
        	res.sex = '保密'
        }
        this.$message.success('获取其他属性成功')
      })
      .catch(() => {
        this.$message.error('获取其他属性失败')
      })
    },
    /**
     *全部好友--接口
    */
    getAllFriend () {
      findAllMallFriends(this.totalFriend)
      .then(res => {
        this.allFriendList = res.data
        this.totalFriendCount = Number(res.totalSize)
        this.allFriendpageTotal = Number(res.totalSize)
        this.$message.success('获取全部好友成功')
      })
      .catch(() => {
        this.$message.error('获取全部好友失败')
      })
    },
    /**
     * 获取一度好友--接口
    */
    getOnePointFriend () {
      searchOnePointMallFriends(this.oneFriend)
      .then(res => {
        this.onceFriendList = res.data
        this.totalFriendCount = res.totalSize
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
    getTwoPointFriend () {
      searchTwoPointMallFriends(this.twoFriend)
      .then(res => {
        this.twoFriendList = res.data
        this.totalFriendCount = res.totalSize
        this.twoFriendpageTotal = Number(res.totalSize)
        console.log(res)
        this.$message.success('获取二度好友成功')
      })
      .catch(() => {
        this.$message.error('获取二度好友失败')
      })
    },
    /**
     * 绿名单好友--接口
    */
    getGreenFriend () {
      searchMallGreenFried(this.greenFriend)
      .then(res => {
        this.greenFriendList = res.data
        this.totalFriendCount = res.totalSize
        this.greenFriendpageTotal = Number(res.totalSize)
        console.log(res)
        this.$message.success('获取绿名单好友成功')
      })
      .catch(() => {
        this.$message.error('获取绿名单好友失败')
      })
    },
    /**
     * 自建分组--接口
    */
    getSelfCreatFriend (dta) {
      mallMemberGroupList(this.selfFriend)
      .then(res => {
        this.selfGroupList = res
        this.$message.success('获取自建分组成功')
      })
      .catch(() => {
        this.$message.error('获取自建分组失败')
      })
    },
    // 自建分组-option 值变化事件
    selfChangeList () {
      console.log('值变化')
      this.getMyGroupList()
    },
    /**
     * my分组--接口
    */
    getMyGroupList () {
      selfMallCreatGroup(this.selfFriendList)
      .then(res => {
        this.selfGroupFriendList = res.data
        this.$message.success('获取自建分组成功')
      })
      .catch(() => {
        this.$message.error('获取自建分组失败')
      })
    },
    // manage tab切换事件
    handleClick(tab, event) {
      console.log(this.activeName)
      if (this.activeName == 'first') {
        this.getMallInfo(this.params)
      } else if (this.activeName == 'second') {
        this.getMallInteractInfo(this.params)
      } else if (this.activeName == 'third') {
        this.getMallOther(this.params)
      } else if (this.activeName == 'five') {
        this.getAllFriend()
      }
    },
    // friend tab切换事件
    handleFriendClick(tab, event) {
      console.log(this.activeFriendName)
      if (this.activeFriendName == 'first') {
        this.getAllFriend() // 获取全部好友
      } else if (this.activeFriendName == 'second') {
        this.getOnePointFriend() // 获取一度好友
      } else if (this.activeFriendName == 'third') {
        this.getTwoPointFriend() // 获取二度好友
      } else if (this.activeFriendName == 'fourth') {
        this.getGreenFriend() // 获取绿名单好友
      } else if (this.activeFriendName == 'five') {
        this.getSelfCreatFriend() // 获取自建分组
      }
    },
    // 好友列表中翻页事件
    handleSizeChange(val) {
      if (this.activeFriendName == 'first') {
        this.totalFriend.pageSize = val
        this.getAllFriend()
      } else if (this.activeFriendName == 'second') {
        this.oneFriend.pageSize = val
        this.getOnePointFriend()
      } else if (this.activeFriendName == 'third') {
        this.twoFriend.pageSize = val
        this.getTwoPointFriend()
      } else if (this.activeFriendName == 'fourth') {
        this.greenFriend.pageSize = val
        this.getGreenFriend()
      } else if (this.activeFriendName == 'five') {
        this.selfFriend.pageSize = val
        this.getSelfCreatFriend()
      }
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      if (this.activeFriendName == 'first') {
        this.totalFriend.pageNum = val
        this.getAllFriend()
      } else if (this.activeFriendName == 'second') {
        this.oneFriend.pageNum = val
        this.getOnePointFriend()
      } else if (this.activeFriendName == 'third') {
        this.twoFriend.pageNum = val
        this.getTwoPointFriend()
      } else if (this.activeFriendName == 'fourth') {
        this.greenFriend.pageNum = val
        this.getGreenFriend()
      } else if (this.activeFriendName == 'five') {
        this.selfFriend.pageNum = val
        this.getSelfCreatFriend()
      }
    },
    resumeDetail () {
      console.log("简历详情")
      this.$router.push('/staff/privateResume')
    }
  },
  mounted () {
    // this.params.memberId = '435873218322980864'
    this.params.memberId = this.$route.params.id
    console.log(this.$route.params.id)
    this.getMallInfo(this.params)
  }
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
  margin-top:20px;
  width:500px;
}
.onceFriend:nth-child(2n), .twoFriend:nth-child(2n), .greenFriend:nth-child(2n), .friendColumn:nth-child(2n){
  margin-left:80px;
}
.block{
  position: absolute;
  bottom: 20px;
  left: 60px;
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
  min-width:950px;
  width: 1300px;
}
</style>
