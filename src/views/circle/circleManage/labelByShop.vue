<template>
  <section>
    <div class="m20">
      <!-- <el-button type="primary" @click="back">返回</el-button>
      <el-button type="success" @click="save">保存</el-button> -->
    </div>
    <div class="m20">
      <p class="title">系统自定义滤镜标签</p>
      <div>
        <el-input style="width:200px;" v-model="input" placeholder="请输入标签名称"></el-input>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" plain>置顶</el-button>
        <el-button type="primary" plain>取消置顶</el-button>
      </div>
      <div class="clearfix" style="margin: 20px 0;border: 1px solid #ccc;padding: 20px;border-radius: 10px;">
        <el-checkbox-group v-model="systemLabel">
          <el-checkbox
            class="checkBoxItem"
            style="display: inline-block;width: 20%;box-sizing: border-box;margin-left: 0;margin-bottom:20px;"
            v-for="(item,index) in systemLabels" :label="item.label" :key="index">{{item.value}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <p class="title">会员自定义滤镜标签</p>
      <div style="margin-bottom:20px;">
        <el-input style="width:200px;" v-model="memberFrom.lableName" placeholder="请输入标签名称"></el-input>
        <el-button type="primary" @click="memberDefineFilterLable">搜索</el-button>
        <el-button type="primary" plain @click="memberLabelTop">置顶</el-button>
        <el-button type="primary" plain @click="cancelMemberLabelTop">取消置顶</el-button>
      </div>
      <el-table :data="customMemberfrilterData"
         border stripe style="width: 100%"
         @selection-change="memberFilterSelectionChange"
         >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="lableName" label="标签名称"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column
          prop="tag"
          label="标识"
          width="150">
          <template slot-scope="scope" v-if="scope.row.sort == 1">
            <i class="el-icon-caret-top" style="color:red;"></i>
            <el-button type="success" size="mini">置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p style="text-align: center;">
        <el-button type="text">查看更多</el-button>
      </p>


      <p class="title">圈内已有滤镜圈</p>
      <div style="margin-bottom:20px;">
        <el-input style="width:200px;" v-model="haveFrom.lableName" placeholder="请输入标签名称"></el-input>
        <el-button type="primary" @click="haveSearch">搜索</el-button>
        <el-button type="primary" plain @click="havingFilterLabelTop">置顶</el-button>
        <el-button type="primary" plain @click="cancelHavingFilterLabelTop">取消置顶</el-button>
      </div>
      <el-table :data="haveFilter" border stripe @selection-change="havingFilterSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="crowdId" label="群ID"></el-table-column>
        <el-table-column prop="crowdName" label="群名称"></el-table-column>
        <el-table-column prop="filterLableName" label="对应滤镜标签名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column
          prop="tag"
          label="标识"
          width="150">
          <template slot-scope="scope"  v-if="scope.row.sort == 1">
            <i class="el-icon-caret-top" style="color:red;"></i>
            <el-button type="success" size="mini">置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float:right; margin:20px;">
        <el-pagination
          @size-change="havingFilterhandleSizeChange"
          @current-change="havingFilterhandleCurrentChange"
          :current-page="haveFrom.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="haveFrom.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="havingFilterTotalpage">
        </el-pagination>
      </div>
      <!-- <p style="text-align: center;">
        <el-button type="text">查看更多</el-button>
      </p> -->
    </div>
  </section>
</template>

<script>
// 查询会员自定义滤镜标签======================================================会员自定义滤镜标签置顶=======圈内滤镜置顶
import { searchMemberDefineFilterLable, getLabelSysCuom,searchHaveFilter, memberDefineFilterLableTop, searchHaveFilterTop } from '@/api/circle/info'
  export default{
    data(){
      return{
        // 系统滤镜
        sysFrom: {
          circleId: '3',
          labelName: '',
          pageSize: '5',
          pageNum: '1'
        },
        // 会员滤镜
        memberFrom: {
          circleId: '1439398572098498560',
          memberId: '1',
          lableName: '',
          pageSize: '5',
          pageNum: '1'
        },
        // 已有滤镜
        haveFrom: {
          circleId: '1',
          lableName: '',
          pageSize: '5',
          pageNum: '1'
        },
        haveArr: [],
        memberArr: [],
        haveOriginArr: [],
        memberOriginArr: [],
        havingFilterTotalpage: '',
        form:{},
        sort:[],
        // 系统自定义字段
        systemLabel:[],
        systemLabels:[
          {
            label:'1',
            value:'同乡'
          },
          {
            label:'2',
            value:'同乡'
          }
        ],

        customMemberfrilterData: [{}], // 会与自定义滤镜标签的table data
        haveFilter: [{}]
      }
    },
    methods:{
      save() {
        var arr = ['1','2','3','4','5']
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == '1') {
            continue
          }
          console.log('hgodjhg')
        }
        console.log('下边的步骤')
      },
      haveSearch() {
        this.getHaveFiletrCircle()
      },
      // 圈内滤镜--点击置顶事件
      havingFilterLabelTop() {
        var obj = {}
        obj.status = '1'
        obj.lables = this.haveArr
        console.log('圈内滤镜置顶')
        var status = false
        if(this.haveArr.length > 0) {
          this.haveOriginArr.forEach(el => {
            if (el.sort == '1') {
              status = true
            }
          })
          if (!status) {
            this.threeTop(obj)
          } else {
          this.$message.warning('选择项包含置顶项，请重新选择。')
          }
        } else {
          this.$message.warning('请选择置项')
        }
      },
      // 圈内取消置顶
      cancelHavingFilterLabelTop() {
        var obj = {}
        obj.status = '0'
        obj.lables = this.haveArr
        console.log('取消圈内滤镜置顶')
        var status = false
        if(this.haveArr.length > 0) {
          this.haveOriginArr.forEach(el => {
            if (el.sort !== '1') {
              status = true
            }
          })
          if (!status) {
            this.threeTop(obj)
          } else {
          this.$message.warning('选择项包含非置顶项，请重新选择。')
          }
        } else {
          this.$message.warning('请选择置项')
        }
      },
      // 圈内滤镜置顶
      threeTop(data){
        searchHaveFilterTop(data)
          .then(res => {
            this.$message.success('置顶成功')
            this.getHaveFiletrCircle()
          })
          .catch(() => {
            this.$message.error('置顶失败')
          })
      },
      // 会员自定义滤镜置顶
      memberLabelTop() {
        var obj = {}
        obj.status = '1'
        obj.lables = this.memberArr
        var status = false
        console.log('会员自定义滤镜置顶')
        if(this.memberArr.length > 0) {
          this.memberOriginArr.forEach(el => {
            if (el.sort == '1') {
              status = true
            }
          })
          if (!status) {
            this.twoTop(obj)
          } else {
          this.$message.warning('勾选项不能包含置顶项')
          }
        } else {
          this.$message.warning('请选择置项')
        }
      },
      cancelMemberLabelTop() {
        var obj = {}
        obj.status = '0'
        obj.lables = this.memberArr
        var status = false
        console.log('会员自定义滤镜置顶')
        if(this.memberArr.length > 0) {
          this.memberOriginArr.forEach(el => {
            if (el.sort == '0') {
              status = true
            }
          })
          if (!status) {
            this.twoTop(obj)
          } else {
          this.$message.warning('勾选项不能包含非置顶项')
          }
        } else {
          this.$message.warning('请选择置项')
        }
      },
      twoTop(data) {
        memberDefineFilterLableTop(data)
        .then(res => {
          this.$message.success('置顶成功')
          this.memberDefineFilterLable()
        })
        .catch(() => {
          this.$message.error('置顶成功')
        })
      },
      // 获取系统自定义滤镜标签接口
      getLabelSysCuom() {
        this.systemLabels = []
        getLabelSysCuom(this.customFrom)
        .then(res => {
          res.data.forEach(ele => {
            var obj = {}
            obj.id = ele.id
            obj.value = ele.labelName
            this.systemLabels.push(obj)
          })
          this.$message.success('获取系统自定义标签成功')
        })
        .catch(() => {
          this.$message.error('获取系统自定义标签失败')
        })
      },
      memberDefineFilterLable() {
        searchMemberDefineFilterLable(this.memberFrom)
        .then(res => {
          this.customMemberfrilterData = res.data
          this.$message.success('获取滤镜标签成功')
        })
        .catch(() => {
          this.$message.error('获取滤镜标签失败')
        })
      },
      getHaveFiletrCircle() {
        searchHaveFilter(this.haveFrom)
        .then(res => {
          this.havingFilterTotalpage = Number(res.totalSize)
          this.haveFilter = res.data
          this.$message.success('获取滤镜标签成功')
        })
        .catch(() => {
          this.$message.error('获取滤镜标签失败')
        })
      },
      havingFilterhandleCurrentChange(val) {
        this.haveFrom.pageNum = val
        this.getHaveFiletrCircle()
      },
      havingFilterhandleSizeChange(val) {
        this.haveFrom.pageSize = val
        this.getHaveFiletrCircle()
      },
      havingFilterSelectionChange(val) {
        console.log(val)
        this.haveOriginArr = val
        this.haveArr = []
        val.forEach(ele => {
          this.haveArr.push(ele.id)
        })
        console.log(this.haveArr)
      },
      memberFilterSelectionChange(val) {
        console.log(val)
        this.memberOriginArr = val
        this.memberArr = []
        val.forEach(ele => {
          this.memberArr.push(ele.id)
        })
        console.log(this.memberArr)
      }
    },
    mounted () {
      this.memberDefineFilterLable()
      this.getHaveFiletrCircle()
      this.getLabelSysCuom()
    }
  }
</script>

<style scoped lang="scss">
.m20{
  margin: 20px;
}
</style>
