<template>
  <div class="wrapper">
    <div class="pushWrapperHead">
      <h1>精准推荐</h1>
    </div>
    <!-- <div style="height:20px;background:#A2E0E0;"></div> -->
    <div class="clearfix" style="height:50px;background:#D7D7D7; line-height:50px; color:white;">
      <div style="height:100%; width:400px;float:left;">
        <span style="margin-left:20px; font-size:20px;font-weight:bold;color:#A7A7A7;">精准推荐-商品列表</span>
        <!-- <i class="el-icon-d-arrow-right" style="margin-left:200px; font-weight:bold;font-size:20px"></i> -->
      </div>
      <div style="float:right; margin-right:50px;">
        <span style="color:black; font-weight:bold;">推荐点击：</span>
        <el-button type="primary" @click="sortClick" round>排行</el-button>
      </div>
    </div>
    <div class="tableList">
      <el-form ref="form" :inline='true' :model="form" label-width="80px">
        <el-form-item label="场景选择" prop="scene">
          <el-select v-model="form.scene" placeholder="请选择场景" clearable>
              <el-option
                v-for="item in sceneRegion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌选择" prop="brand">
          <el-select v-model="form.brand" placeholder="请选择活动区域" clearable>
              <el-option
                v-for="item in brandRegion"
                :key="item.brandId"
                :label="item.brandName"
                :value="item.brandId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品查询" prop="search">
          <el-input placeholder="请输入关键字,商品ID" clearable v-model="form.search"></el-input>
        </el-form-item>
        <!--<el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startDay" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="margin-left:10px;" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endDay" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>-->


			  <el-form-item class="block" label="活动时间" prop="time">
			    <el-date-picker
			      v-model="time"
			      type="datetimerange"
			      @change = "timeChange"
			      :picker-options="pickerOptions2"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right">
			    </el-date-picker>
			  </el-form-item>


        <el-form-item label="一级品类" prop="firstType">
          <el-select v-model="form.firstType" placeholder="请选择一级品类" @change="oneCahnge" clearable>
              <el-option
                v-for="item in linkageRegionOne"
                :key="item.cid"
                :label="item.categoryName"
                :value="item.cid">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级品类" prop="secondType" v-if="issecond" @change="twoCahnge">
          <el-select v-model="form.secondType" placeholder="请选择活动区域" clearable>
              <el-option
                v-for="item in linkageRegionTwo"
                :key="item.cid"
                :label="item.categoryName"
                :value="item.cid">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级品类" prop="thirdType" v-if="isThird">
          <el-select v-model="form.thirdType" placeholder="请选择活动区域" clearable>
              <el-option
                v-for="item in linkageRegionThree"
                :key="item.cid"
                :label="item.categoryName"
                :value="item.cid">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查看</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="pushTable">
     <el-table stripe :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column prop="commodityScene" label="页面场景" :formatter="sceneStatus"></el-table-column>
        <el-table-column prop="commodityId" label="商品ID"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" :formatter="formatter"></el-table-column>
        <el-table-column prop="commodityFirstType" label="商品品类"></el-table-column>
        <el-table-column prop="commodityBrand" label="商品品牌"></el-table-column>
        <el-table-column prop="commodityRecCount" label="推荐人数" sortable></el-table-column>
        <el-table-column prop="commodityClickCount" label="点击人数" sortable></el-table-column>
        <el-table-column prop="commodityBuyCount" label="购买人数" sortable></el-table-column>
        <el-table-column prop="commodityRecScale" label="推荐点击比" sortable></el-table-column>
        <el-table-column prop="commodityRecBuyScale" label="推荐购买比" sortable></el-table-column>
        <el-table-column prop="commoditySalesVolume" label="销量排名" sortable></el-table-column>
        <el-table-column fixed="right" label="手动推荐" width="120">
          <template slot-scope="scope">
             <!--<el-switch v-model="isRec" active-value="1" inactive-value="0" @change="aa"></el-switch>-->
             <el-button v-if="scope.row.isRec == '0'" size="mini" type="success" @click="openClick(scope.row)">开启</el-button>
             <el-button v-if="scope.row.isRec == '1'" size="mini" type="info" @click="closeClick(scope.row)">关闭</el-button>
            <!-- <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData4)"
              type="text"
              size="small">
              	移除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center; padding:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
	//====品牌下拉列表====品类联动======查询=======开启和关闭按钮
import { getbrand,brandLinkage,searchList,openAndClosePort } from '@/api/pushBack/pushBack'
import { parseTime } from '@/utils'
export default {
  components:{},
  props:{},
  data(){
    return {
	    pickerOptions2: {
	      shortcuts: [{
	        text: '最近一周',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	          picker.$emit('pick', [start, end]);
	        }
	      }, {
	        text: '最近一个月',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	          picker.$emit('pick', [start, end]);
	        }
	      }, {
	        text: '最近三个月',
	        onClick(picker) {
	          const end = new Date();
	          const start = new Date();
	          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	          picker.$emit('pick', [start, end]);
	        }
	      }]
	    },
    	time: [],
    	isRec: '0',
    	currentPage: 1,
    	totalSize: '',
    	//品牌选择的下拉
    	brandRegion: [
    		{
    			brandId: '',
    			brandName: ''
    		}
    	],
    	//一级品类下拉
    	linkageRegionOne: [
    		{
    			cid: '',
    			categoryName: ''
    		}
    	],
    	//二级品类下拉
    	linkageRegionTwo: [
    		{
    			cid: '',
    			categoryName: ''
    		}
    	],
    	//三级品类下拉
    	linkageRegionThree: [
    		{
    			cid: '',
    			categoryName: ''
    		}
    	],
    	//场景选择下拉
    	sceneRegion: [
    		{
    			value: '0',
    			label: '首页'
    		},
    		{
    			value: '1',
    			label: '购物车'
    		},
    		{
    			value: '2',
    			label: '支付成功'
    		},
    		{
    			value: '3',
    			label: '趣赚首页'
    		}
    	],
    	issecond: false,
    	isThird: false,
      tableData: [{name:'1212'},{name:'5454'}],
      form: {
        scene: '',
        brand: '',
        search: '',
        startDay: '',
        endDay: '',
        firstType: '',
        secondType: '',
        thirdType: '',
        //startRow: 1,
        //endRow: 10
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods:{
  	//格式化时间
  	timeChange (data) {
  		if(data){
  			this.form.startDay = parseTime(data[0])
  			this.form.endDay = parseTime(data[1])
  		}else{
  			this.form.startDay = ''
  			this.form.endDay = ''
  		}
  	},
  	//手动推荐---关闭
  	closeClick (row) {
      console.log(row)
  		let commodityId = row.commodityId + ''
  		let isRec = '0'
  		this.openAndClose(commodityId,isRec)
  	},
  	//手动推荐---开启
  	openClick (row) {
      console.log(row)
  		let commodityId = row.commodityId + ''
  		let isRec = '1'
  		this.openAndClose(commodityId,isRec)
  	},
  	//手动推荐--关闭和开启公用接口
  	openAndClose (id,status) {
  		openAndClosePort({
			commodityId: id,
			isRec:status
  		}).then(res => {
  			if(res.status == '200'){
  				this.$message.success('操作成功！')
  				this.onSubmit()
  			}
  		})
  	},
  	//表格页面场景的过滤
  	sceneStatus (row) {
  		if(row.commodityScene == ''){
  			return '全部'
  		}else if(row.commodityScene == '0'){
  			return '首页'
  		}else if(row.commodityScene == '1'){
  			return '购物车'
  		}else if(row.commodityScene == '2'){
  			return '支付成功'
  		}else if(row.commodityScene == '3'){
  			return '趣赚首页'
  		}
  	},
  	handleCurrentChange (val) {
  		this.form.pageNum = val
  		this.onSubmit()
  	},
  	handleSizeChange (val) {
  		this.form.pageSize = val
  		this.onSubmit()
  	},
  	//页面刷新  品牌下拉列表渲染
  	handleQuery () {
  		getbrand({}).then(res => {
	  			this.brandRegion = []
	  			for(let i=0;i<res.length;i++){
	  				let obj = {}
	  				obj.brandId = res[i].brandId
	  				obj.brandName = res[i].brandName
	  				this.brandRegion.push(obj)
	  			}
  		})
  	},

  	//一级品类下拉列表渲染
  	handleLinkageOne () {
  		brandLinkage({parentId:'0'}).then(res => {
					this.linkageRegionOne = []
					for(let i=0;i<res.length;i++){
						let obj = {}
						obj.cid = res[i].cid
						obj.categoryName = res[i].categoryName
						this.linkageRegionOne.push(obj)
					}
	  	})
  	},

  	//一级品类点击渲染二级品类
  	oneCahnge (val) {
  		if (val) {
	  		let parentId = val + ''
	  		this.form.secondType = ''
	  		brandLinkage({parentId:parentId}).then(res => {
						this.linkageRegionTwo = []
						for(let i=0;i<res.length;i++){
							let obj = {}
							obj.cid = res[i].cid
							obj.categoryName = res[i].categoryName
							this.linkageRegionTwo.push(obj)
						}
						this.issecond = true
		  	})
  		} else {
  			this.linkageRegionTwo = []
  			this.form.secondType = ''
  		}
  	},

  	//二级品类点击渲染三级品类
  	twoCahnge (val) {
  		if(val){
	  		let parentId = val + ''
	  		this.form.thirdType = ''
	  		brandLinkage({parentId:parentId}).then(res => {
						this.linkageRegionThree = []
						for(let i=0;i<res.length;i++){
							let obj = {}
							obj.cid = res[i].cid
							obj.categoryName = res[i].categoryName
							this.linkageRegionThree.push(obj)
						}
						this.isThird = true
		  	})
  		}else{
  			this.linkageRegionThree = []
  			this.form.thirdType = ''
  		}
  	},

  	//推荐点击排行  按钮
  	sortClick () {
  		this.$router.push('/accuratePush/recommendClickSort')
  	},

  	//查看按钮
    onSubmit () {
    	searchList(this.form).then(res => {
    		this.tableData = res.data.data
    		this.totalSize = res.data.totalRecordCount
    	})
    }
  },
  mounted(){
  		 this.onSubmit()
       this.handleQuery()
       this.handleLinkageOne()
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    padding: 0 20px;
    .pushWrapperHead{
      color:#BCBCBC;
      line-height: 150px;
      height:150px;
      background: #D5EEFF;
      text-align: center;
    }
    .tableList{
      border-left:1px solid #CCCCCC;
      border-right:1px solid #CCCCCC;
      padding-top:20px;
    }
  }
</style>
