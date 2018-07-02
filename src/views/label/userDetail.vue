<template>
  <div class="wrapper">
    <div class="wrapperHead">
      <el-form ref="form" :inline="true" :model="form" label-width="120px">
        <!-- <el-form-item label="关键字查询:">
          <el-input class="inputWidth" v-model="form.name" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="用户标签:">
          <el-input v-model="form.region" placeholder="请输入用户标签"></el-input>
        </el-form-item>
        <el-form-item label="宏定义查询:">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> <br> -->
        <el-form-item label="渠道类型:">
          <el-select disabled  class="selectWidth" v-model="form.channelId" placeholder="">
            <el-option label="电商" value="1"></el-option>
            <el-option label="社交" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄:">
          <el-input disabled class="inputWidth" placeholder="" v-model="form.age"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户行业:">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> <br> -->
        <el-form-item label="用户ID:">
          <el-input disabled class="inputWidth" v-model="form.mId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="用户性别:">
          <el-select disabled class="selectWidth" v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户职业:">
          <el-input disabled class="inputWidth" v-model="form.occupation" placeholder=""></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户专业:">
          <el-input disabled class="inputWidth" v-model="form.specialty" placeholder=""></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input disabled placeholder="" class="inputWidth" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="生日:">
          <el-input disabled placeholder="" class="inputWidth" v-model="form.birthday"></el-input>
        </el-form-item>
        <el-form-item label="户籍所在地:">
          <el-input disabled placeholder="" class="inputWidth" v-model="form.hometown"></el-input>
          <!-- <el-select class="selectWidth" v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="当前所在地:">
          <el-input disabled class="inputWidth" placeholder="" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="教育水平:">
          <el-input disabled placeholder="" class="inputWidth" v-model="form.school"></el-input>
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="用户昵称:">
          <el-input disabled class="inputWidth" placeholder="" v-model="form.nickName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="当前所在地">
          <el-select class="selectWidth" v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="多用户平台">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="line"></div>
    <el-form ref="form" :inline="true" :model="searchForm">
      <el-form-item>
        <el-input style="width:300px;" v-model="form.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button disabled type="primary" @click="submitForm('numberValidateForm')">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tree" style="padding-left:400px;">
      <el-tree
        :data="data3"
        show-checkbox
        @node-click="handleNodeClick"
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]">
      </el-tree>
    </div>
    <div class="userDetail">
      <el-button @click="lookUserBehavior" type="primary">查看用户行为</el-button>
      <el-button type="primary" disabled>查看相似用户</el-button>
    </div>
  </div>
</template>

<script>
// 用户信息详情
import { peopleUserDetailedTree,peopleLabelDetailInfo } from '@/api/label/peopleLabelManage/peopleLabelSearch'
export default {
  components:{},
  props:{},
  data(){
    return {
// mId	用户id
// age	年龄
// birthday	生日
// realName	真实姓名
// nickName	昵称
// channelId	渠道
// sex	年龄
// regionId	地区
// school	学校
// specialty	专业
// hometown	家乡
// occupation	职业
      data3: [],
      searchForm: {
        name: ''
      },
      form: {
        mId: '', //	用户id	String
        age: '', //	年龄	Integer
        birthday: '', //	生日	Date
        userName: '', //	真实姓名	String
        nickName: '', //	昵称	String
        channelId: '', //	渠道	Long
        sex: '', //	年龄	Integer
        regionId: '', //	地区	Long
        school: '', //	学校	String
        specialt: '', //	专业	String
        hometown: '', //	家乡	String
        occupation: '' //	职业	String
      },
    }
  },
  methods:{
    lookUserBehavior () {
			this.$router.push(
				{
					path:'/label/behaviorStatisticsManage/singleUserbehaviorStatistics',
					query:{
						channel : this.form.channelId,
	 					mId : this.form.mId
					}
				}
			)	
    },
    handleNodeClick(data) {
      console.log(data)
    },
    getFormatterTree(canshu){
          var start = new Date().getTime();//起始时间
          //准备数据
          let testData = {
              "department": [
                  {
                      "departmentName": "测试1",
                      "departmentDesc": "盛达康网络",
                      "parentId": "",
                      "id": "594a28fb1c8652a01f0301"
                  }
              ]
          }
          var data = canshu // 数组
          let treedata = [] // 建空数组
          //查找最顶层-------一级部门
          let len = data.length
          for(let j=0;j<len;j++){
              data[j].expand = false
              if (data[j].propertyValue) {
                data[j].label = data[j].codeName + "：" + data[j].propertyValue
              } else {
                data[j].label = data[j].codeName
              }
              if(data[j].parentCode == "0"){
                  treedata.push({
                      "expand":true,
                      "label":data[j].codeName,
                      "labelCode":data[j].labelCode,
                      "parentCode":'0'
                  })
              }
          }
          console.log('TreeData:')
          //找到跟最高层id相关的子子孙孙，并给子孙添加lev
          var treedataLevs =[]
          for(let h=0,ls=treedata.length;h<ls;h++){
              treedataLevs.push({
                  treedataLev:sonsTree(data,treedata[h].labelCode)
              })
          }
          console.log(treedataLevs)
          for(let p=0,lq=treedataLevs.length;p<lq;p++) {
              var treedataLev = treedataLevs[p].treedataLev
              //找到最高层的lev
              var maxLev = 0
              for(let i=0,lt=treedataLev.length;i<lt;i++){
                  if(parseInt(treedataLev[i].lev) > maxLev){
                      maxLev = parseInt(treedataLev[i].lev)
                  }else{
                      maxLev = maxLev
                  }
              }
              //比较当前层和上一层的数据，然后做处理
              var needLev = maxLev
              var maxLevTree = []
              var maxLevTreePrev = []
              for(let m=0;m<maxLev;m++){
                  maxLevTree = getLevArr(treedataLev,needLev)
                  maxLevTreePrev = getLevArr(treedataLev,needLev-1)
                  for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
                      maxLevTreePrev[j].children = new Array()
                      for(var i=0,lm=maxLevTree;i<lm.length;i++){
                          if(maxLevTree[i].parentCode == maxLevTreePrev[j].labelCode){
                              maxLevTreePrev[j].children.push(maxLevTree[i])
                          }
                      }
                  }
                  needLev--
              }
              treedata[p].children = maxLevTreePrev
          }
          this.baseData = treedata
          //找出同一级的数据
          function getLevArr(arr,lev){
              var newarr = []
              for(let i=0,la=arr.length;i<la;i++){
                  //这里对arr 的children 做处理
                  arr.children = new Array()
                  if(parseInt(arr[i].lev) == lev){
                      newarr.push(arr[i])
                  }
              }
              return newarr
          }
          //给每个数据添加一个lev
          function sonsTree(arr,labelCode){
            var temp = [],lev=0;
            var forFn = function(arr, labelCode,lev){
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    if (item.parentCode == labelCode) {
                      // console.log('11')
                        item.lev=lev;
                        temp.push(item);
                        if(item.labelCode){
                          forFn(arr,item.labelCode,lev+1);
                        }
                    }

                }
            };
            forFn(arr, labelCode,lev);
            console.log(temp)
            return temp;
          }
          var end = new Date().getTime();//结束时间
          this.data3 = treedata
          console.log(this.data3)
          console.log("Tree初始化的时间是"+(end - start)+"ms")//返回函数执行需要时间
      },
    getTree () {
      var obj = {}
      obj.mId = this.$route.params.id
      obj.channelId = this.$route.params.channelId
      peopleUserDetailedTree(obj)
      .then(res => {
        console.log(res)
        this.getFormatterTree(res.data)
        console.log(res)
      })
      .catch(() => {

      })
    },
    getDetail() {
      var obj = {}
      obj.mId = this.$route.params.id
      obj.channelId = this.$route.params.channelId
      console.log(obj)
      peopleLabelDetailInfo(obj)
      .then(res => {
        console.log(res.data)
        this.form = res.data
        this.form.sex = String(this.form.sex)
        this.form.channelId = String(this.form.channelId)
      })
      .catch(() => {

      })
    }
  },
  created(){},
  mounted(){
    this.getDetail()
    this.getTree()
    // this.getDetail()
  }
}
</script>
<style lang="scss" scoped>
  .selectWidth{
    width:200px;
  }
  .inputWidth{
    width:200px;
  }
.wrapper{
  padding:20px;
  .wrapperHead{
    padding-top:20px;
    border-radius: 5px;
    height:350px;
    background: #F2F2F2;
  }
  .line{
    margin: 20px 0;
    border-bottom: 2px dashed #F2F2F2;
  }
  .userDetail{
    margin-top:20px;
    text-align: center;
  }
}
</style>
