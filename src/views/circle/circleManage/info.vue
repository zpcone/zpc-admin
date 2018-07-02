 <!--圈组信息-->
<template>
	<section>
		<div class="create">
    <el-button type="primary" icon="el-icon-plus" @click="create">创建圈子</el-button>
		</div>
		<!-- 筛选条件 -->
			<el-form class="mb20"
				style="background: #f1f1f1;padding: 20px 0;"
				ref="defultFrom"
        v-model="defultFrom"
				label-width="140px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="渠道：" prop="channelType">
							<el-radio-group v-model="defultFrom.channelType" @change="channelChange">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">电商</el-radio-button>
								<el-radio-button label="2">社交</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="快速查看：" prop="quickLook">
							<el-radio-group v-model="defultFrom.quickLook" @change="searchTimeChange(1)">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">今天</el-radio-button>
								<el-radio-button label="2">昨天</el-radio-button>
								<el-radio-button label="3">最近七天</el-radio-button>
								<el-radio-button label="4">最近30天</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="圈状态：" prop="circleStatus">
							<el-radio-group v-model="defultFrom.circleStatus">
								<el-radio-button label="">全部</el-radio-button>
								<el-radio-button label="1">正常</el-radio-button>
								<el-radio-button label="2">冻结</el-radio-button>
							</el-radio-group>
						</el-form-item>

			<!--<el-form-item label="圈类型：">
              <el-cascader
                clearable
                :options="circleTypeOption"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>-->
			<el-form-item label="圈类型：">
				<el-select placeholder="请选择" v-model="defultFrom.categoryCode" clearable>
					<el-option v-for="item in circleTypeOption" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode">
					</el-option>
				</el-select>
            </el-form-item>

			<!--<el-form-item label="创建方式：" v-if="isChannelDis">
              <el-cascader
                clearable
                :options="optionsCreatedType"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-form-item>-->
			<el-form-item label="创建方式：" v-if="isChannelDis1">
				  <el-select v-model="defultFrom.createType" placeholder="请选择">
				    <el-option-group
				      v-for="group in typeOptions1"
				      :key="group.label"
				      :label="group.label">
				      <el-option
				        v-for="item in group.options1"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				      <el-option
				        v-for="item in group.options2"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				      <el-option
				        v-for="item in group.options3"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				      <el-option
				        v-for="item in group.options4"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				    </el-option-group>
				  </el-select>
            </el-form-item>
			<el-form-item label="创建方式：" v-if="isChannelDis2">
				  <el-select v-model="defultFrom.createType" placeholder="请选择">
				    <el-option-group
				      v-for="group in typeOptions2"
				      :key="group.label"
				      :label="group.label">
				      <el-option
				        v-for="item in group.options1"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				      <el-option
				        v-for="item in group.options2"
				        :key="item.id"
				        :label="item.typeNmae"
				        :value="item.id">
				      </el-option>
				    </el-option-group>
				  </el-select>
            </el-form-item>
					</el-col>
					<el-col :span="14">
            <!--<el-form-item label="创建时间" required>
              <el-col :span="11">
                <el-form-item prop="createBeginDate">
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" v-model="defultFrom.createBeginDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col style="margin-left:15px;" :span="1">-</el-col>
              <el-col :span="11">
                <el-form-item prop="createEndDate">
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" v-model="defultFrom.createEndDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>-->
            <el-form-item label="创建时间" prop="time">
				    <el-date-picker
				      v-model="time"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']"
				      @change="searchTimeChange(2)">
				    </el-date-picker>
			</el-form-item>
			<el-form-item label="圈名称：" prop="circleName">
        <el-input placeholder="请输入圈名称"  clearable class="searchInput" v-model="defultFrom.circleName"></el-input>
      </el-form-item>
      <el-form-item label="圈ID：" prop="circleId">
        <el-input placeholder="请输入圈ID" clearable class="searchInput" v-model="defultFrom.circleId"></el-input>
      </el-form-item>
           	<!--<el-form-item label="会员名称："  prop="memberName">
              <el-input class="searchInput" disabled v-model="defultFrom.memberName"></el-input>
            </el-form-item>
            <el-form-item label="会员ID：" prop="memberId">
              <el-input class="searchInput" disabled v-model="defultFrom.memberId"></el-input>
            </el-form-item>-->
        <el-form-item label="圈人数：" prop="groupNumMin">
          <div class="clearfix">
            <div class="fl">
              <el-row>
                <el-col :span="11">
                  <el-input placeholder="请输入开始人数。" type="number" v-model="defultFrom.circleMinNumber" :min="0"></el-input>
                </el-col>
                <el-col :span="2" style="text-align: center;">-</el-col>
                <el-col :span="11">
                  <el-input placeholder="请输入结束人数。" type="number" v-model="defultFrom.circleMaxNumber" :min="0"></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="圈层级：" prop="groupNumMin">
          <div class="clearfix">
            <div class="fl">
              <el-row>
                <el-col :span="11">
                  <el-input placeholder="请输入起始层级。" type="number" :min="0" v-model="defultFrom.minHierarchy"></el-input>
                </el-col>
                <el-col :span="2" style="text-align: center;">-</el-col>
                <el-col :span="11">
                  <el-input placeholder="请输入结束层级。" type="number" :min="0" v-model="defultFrom.maxHierarchy"></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
					</el-col>
				</el-row>
				<hr style="height: 2px;border: none;border-top: 1px dashed #ccc;"/>
				<el-form-item style="margin: 15px 0;text-align: center;">
					<el-button style="min-width: 120px;" type="success" icon="el-icon-search" @click="search('defultFrom')">查找</el-button>
          <el-button style="min-width: 120px;" type="primary" icon="el-icon-setting" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>

			<!-- 排序 + 分页 -->
			<div class="setting" style="margin: 20px;">
				<!--排序 + 全选 + 已选中项数-->
				<!-- <span>圈列表排序：</span> -->
				<!-- <el-select placeholder="请选择" v-model="searchForm.sortBy">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
				<span>当前选中{{chooseLen}}项</span>
				<el-button type="danger" @click="openConfirmModal('冻结圈')">冻结圈</el-button>
				<el-button type="success" @click="openConfirmModal('解冻圈')">解冻圈</el-button>
				<!-- <el-button type="primary" @click="groupToCircle = true">手动平行裂变圈</el-button> -->
				<el-button v-if="defultFrom.channelType !== '2'" type="primary" @click="handParallelChange">手动平行裂变圈</el-button>
				<!-- <el-button type="warning" @click="circleChange=true">手动纵向裂变圈</el-button> -->
				<el-button v-if="defultFrom.channelType !== '2'" type="warning" @click="handPortaitChange">手动纵向裂变圈</el-button>
				<!-- <el-button type="primary" @click="viewChart">查看圈谱</el-button> -->
				<el-button v-if="defultFrom.channelType !== '2'" type="primary" @click="relevanceShop">关联商品</el-button>
			</div>
			<div class="table" style="margin: 20px;min-height: 100px;">
				<el-table @selection-change="selectionChange" border :data="tableData" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="circleId" label="圈ID" width="170"></el-table-column>
					<el-table-column prop="circleName" label="圈名称"></el-table-column>
					<el-table-column prop="hierarchy" label="圈层级"></el-table-column>
					<el-table-column prop="circleOwnerName" label="圈主"></el-table-column>
          <!-- 渠道类型（1－电商平台，2－社交平台） -->
					<el-table-column prop="channelType" label="渠道" :formatter="formatterType"
          ></el-table-column>
					<el-table-column prop="circleType" label="圈类型"></el-table-column>
					<!-- <el-table-column prop="circleLabel" label="圈标签"></el-table-column> -->
					<el-table-column sortable prop="memberNum" label="圈人数"></el-table-column>
					<!-- <el-table-column sortable prop="personalValue" label="人脉值"></el-table-column> -->
					<!-- <el-table-column prop="angelvalue" label="天使值"></el-table-column> -->
					<el-table-column sortable prop="lightNumber" label="接灯数"></el-table-column>
					<el-table-column sortable prop="sendLightNumber" label="发灯数"></el-table-column>
					<el-table-column sortable prop="beansTotalNumber" label="豆总数"></el-table-column>
					<el-table-column sortable prop="beansAverageValue" label="豆均值"></el-table-column>
					<el-table-column sortable prop="coinTotalValue" label="币总数"></el-table-column>
					<el-table-column sortable prop="coinAverageValue" label="币均值"></el-table-column>
					<!-- <el-table-column prop="coinaveragen" label="变现次数">??</el-table-column> -->
					<!-- <el-table-column prop="coinaveragen" label="变现金额">??</el-table-column> -->
					<el-table-column prop="createType" label="创建方式"></el-table-column>
					<el-table-column prop="status" :formatter="formatterStatus" label="冻结状态"></el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination center">
		        <el-pagination
		          @size-change="handleSizeChange"
		          @current-change="handleCurrentChange"
		          :current-page="defultFrom.pageNum"
		          :page-sizes="[5, 10, 15, 20]"
		          :page-size="defultFrom.pageSize"
		          layout="total, sizes, prev, pager, next, jumper"
		          :total="totalPage">
		        </el-pagination>
			</div>
		<!--冻结 解冻-->
		<confirmModal :confirmSetting="confirmSetting" @confirmOk="confirmOk" ></confirmModal>
		<!--手动纵向裂变圈 对话框-->
		<el-dialog
			title="手动纵向裂变圈"
			:visible.sync="circleChange"
			width="50%">
			<div>
				<!--请选择商品标签-->
				<p >已选择所有裂变的圈子</p>
        <div style="vertical-align:middle; margin-bottom:10px;">
          <el-checkbox disabled v-model="checked">{{zongxiangLbShow.id}}</el-checkbox>
          <img class="imgHead" :src="zongxiangLbShow.circleHead" alt="头像">
          <span style="margin-left:10px;">{{zongxiangLbShow.circleName}}</span>
        </div>
				<el-table :data="zongxiangLbData" @selection-change="handleSelectionChange">
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="商品SPU ID" prop="categoryOrSpuId"></el-table-column>
					<el-table-column label="签值商品名称" prop="categoryOrSpuName"></el-table-column>
					<!-- <el-table-column label="商品标签" prop=""></el-table-column> -->
					<el-table-column label="购买人数" prop="buyNums"></el-table-column>
					<!-- <el-table-column label="购买人" prop="circleMembers">
						<template slot-scope="scope">
						</template>
					</el-table-column> -->
				</el-table>
			</div>
			<span slot="footer">
				<el-button @click="circleChange = false">取消</el-button>
				<el-button type="info" @click="tijiao">提交</el-button>
			</span>
		</el-dialog>
    <!-- 下边是关联商品的弹出框 -->
    <el-dialog
      title="选择商品"
      :visible.sync="selectShopdialogVisible"
      width="700px">
      <div style="height:80px;">
        <div style="width:30%; height:100%;float:left;">
        </div>
        <div style="width:70%; height:100%;float:right;">
          <el-form inline="true" ref="relevanceForm" :model="relevanceForm" label-width="80px">
            <el-form-item style="width: 280px;" label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="relevanceForm.skuName"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form>
        </div>
      </div>
      <div style="width:100%;height:100%;margin:0 auto; ">
        <div style="font-size:16px;font-weight:bold;">已经关联商品</div>
        <div style="width:100%;height:300px;margin-top: 10px;overflow-y: scroll;">
			<div class="table" style="width:100%;height:300px;">
				<el-table @selection-change="yesRelevanceChange" border :data="saveAlreadyShop" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="categoryOrSpuName" label="商品名称"></el-table-column>
					<el-table-column prop="categoryOrSpuId" label="商品ID" width="170"></el-table-column>
					<el-table-column prop="productImage" label="商品图标">
						<template slot-scope="scope">
							<img :src="scope.row.productImage" alt="" height="40" width="40" />
						</template>
					</el-table-column>
					<!-- <el-table-column prop="buyNums" label="购买人数"></el-table-column> -->
				</el-table>
			</div>
        </div>
      </div>


      <div style="width:100%;height:320px;margin:0 auto; ">
        <div style="font-size:16px;font-weight:bold;">未关联商品</div>
        <div style="width:100%;height:300px;margin-top: 10px;overflow-y: scroll;">
			<div class="table" style="width:100%;height:300px;">
				<el-table @selection-change="noRelevanceChange" border :data="saveNotShop" style="width:100%">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="categoryOrSpuName" label="商品名称"></el-table-column>
					<el-table-column prop="categoryOrSpuId" label="商品ID" width="170"></el-table-column>
					<el-table-column prop="productImage" label="商品图标">
						<template slot-scope="scope">
							<img :src="scope.row.productImage" alt="" height="40" width="40" />
						</template>
					</el-table-column>
					<el-table-column prop="buyNums" label="购买人数"></el-table-column>
				</el-table>
			</div>
        </div>
		<!--<div class="pagination center">
			<el-pagination
			  @size-change="handleSizeChange"
			  @current-change="relevanceHandleCurrentChange"
			  :current-page.sync="relevanceForm.pageNumber"
			  :page-size="relevanceForm.pageSize"
			  layout="total, prev, pager, next, jumper"
			  :total="relevanceTotalPage">
			</el-pagination>
		</div>  -->
      </div>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="relevanceCancel">取 消 关 联</el-button>
        <el-button type="primary" @click="relevanceSave">确 定 关 联</el-button>
      </span>

    </el-dialog>


	<el-dialog
			title="手动平行裂变圈"
			:visible.sync="groupToCircle"
			width="30%">
      <div style="border-bottom:1px solid #909399;padding-bottom:20px;">
        <span style="font-size:16px;">已选择所要裂变的圈子</span>
      </div>
			<div style="margin-top:20px; line-height:30px;border-bottom:1px solid #909399;padding-bottom:20px;vertical-align:middle;">
        <el-checkbox disabled v-model="checked">{{handChangeInfo.circleId}}</el-checkbox>
        <div style="height:30px;width:30px;border-radius:50%;display:inline-block;">
          <img :src="handChangeInfo.circleHead" style="width:30px;height:30px;vertical-align: top;" alt="头像">
        </div>
         <el-button round size="mini">{{handChangeInfo.circleName}}</el-button>
				<!--已选择的圈子-->
				<!--请选择商品标签-->
				<!--列表-->
			</div>
			<span slot="footer">
				<!-- <el-button type="info" @click="groupToCircle = false">提交</el-button> -->
				<el-button type="info" @click="saveLevelChange">提交</el-button>
				<el-button @click="groupToCircle = false">取消</el-button>
			</span>
		</el-dialog>
		<!--创建类型 对话框-->
		<el-dialog
			title="创建圈子类型"
			:visible.sync="circleSep"
			width="40%">
			<div style="text-align: center;">
				<el-button v-if="this.defultFrom.channelType == '1'" @click="createCircle('Product')">基于商品</el-button>
				<!--<el-button v-if="!isSocialContact" @click="createCircle('Shop')">基于店铺</el-button>-->
				<el-button v-if="isSocialContact" @click="createCircle('Scene')">基于场景</el-button>
				<el-button v-if="isSocialContact" @click="createCircle('Road')">基于同路人</el-button>
				<!--<el-button v-if="isSocialContact" @click="createCircle('Glass')">基于滤镜</el-button>-->
				<el-button v-if="this.defultFrom.channelType == ''"  @click="createCircle('Self')">自定义</el-button>
			</div>
			<span slot="footer"></span>
		</el-dialog>
	</section>

</template>

<script>
// =====	圈组信息管理=============查询圈子的基本信息=======基于商品创建圈子=========基于场景创建圈子
import {
  getCircleInfoManage,
  getCircleBasicManage,
  getBaseOnShopCreateCir,
  getBaseOnStoreCreateCir,
  updateCircleFreeze,
  updateUnCircleFreeze,
  levelHandChange,
  verticalChange,
  circleCreatFunc,
  getVerticalChangeList,
  relevanceShopList,
  saveProduct,
  cancelProduct,
  getLabelType
} from "@/api/circle/info";
import confirmModal from "../../circle/components/confirmModal";
import { parseTime } from "@/utils";
export default {
  watch: {
    time() {
      if (this.time) {
        if (this.time.length === 2) {
          this.defultFrom.createBeginDate = parseTime(this.time[0]);
          this.defultFrom.createEndDate = parseTime(this.time[1]);
        }
      } else {
        this.defultFrom.createBeginDate = "";
        this.defultFrom.createEndDate = "";
      }
    }
  },
  data() {
    return {
      getCheckedSbumit: [],
      typeOptions1: [
        {
          label: "后台创建",
          options1: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        },
        {
          label: "系统初始化",
          options2: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        },
        {
          label: "圈子裂变",
          options3: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        },
        {
          label: "群升级圈",
          options4: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        }
      ],
      typeOptions2: [
        {
          label: "后台创建",
          options1: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        },
        {
          label: "系统初始化",
          options2: [
            {
              id: "",
              typeNmae: ""
            }
          ]
        }
      ],
      time: [],
      isChannelDis1: false,
      isChannelDis2: false,
      //圈类型数组
      circleTypeOption: [
        {
          categoryName: "",
          categoryCode: ""
        }
      ],
      //关联商品返回的总条数
      relevanceTotalPage: "",
      //关联商品弹框的表单
      relevanceForm: {
        //      pageNumber: '1',
        //      pageSize: '3',
        circleId: "",
        skuName: ""
      },
      saveAlreadyShop: [], //已经关联商品列表的数组
      saveNotShop: [], //未关联商品列表的数组
      selectShopdialogVisible: false, // 关联商品弹框
      selectedOptions: [], //圈类型和创建方式双向绑定的数组
      zongxiangLbData: [], // 保存纵向裂变弹出框的列表数据
      zongxiangLbShow: {}, // 保存纵向裂变弹出框的列表数据
      checked: true,
      totalPage: "", // 首页总条数
      idsArray: [], //保存勾选的circleId的数组
      getChecked: [], // 保存所有勾选项内容
      handChangeInfo: {}, //手动平行裂变的表单
      //搜索表单
      defultFrom: {
        createType: "",
        categoryCode: "", //圈类型code
        channelType: "", //渠道
        circleStatus: "", //圈状态
        quickLook: "", //快速查看
        circleId: "",
        circleName: "",
        memberId: "",
        createBeginDate: "",
        createEndDate: "",
        circleMinNumber: "",
        circleMaxNumber: "",
        minHierarchy: "",
        maxHierarchy: "",
        pageNum: 1,
        pageSize: "5"
      },
      tijiaoForm: {}, //纵向裂变的表单
      chooseLen: 0,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      tableData: [],
      confirmSetting: {
        name: "",
        title: "",
        show: false
      },
      currentPage: 1,
      groupToCircle: false, //手动平行裂变圈
      tags: ["家", "公司", "生活", "购物", "音乐", "旅游", "游戏"],
      chooseTags: [],
      addTag: "",
      circleSep: false, //创建圈子类型
      circleChange: false, //手动纵向裂变圈
      isSocialContact: false,
      noProductId: [], //关联商品弹框中的未关联商品选中项ID数组
      yesProductId: [] //关联商品弹框中的已关联商品选中项ID数组
      // rules: {
      // pass: [
      //   { validator: validatePass, trigger: 'blur' }
      // ],
      // checkPass: [
      //   { validator: validatePass2, trigger: 'blur' }
      // ],
      // age: [
      //   { validator: checkAge, trigger: 'blur' }
      // ]
      // }
    };
  },
  components: {
    confirmModal
  },
  methods: {
    channelChange(val) {
      this.defultFrom.channelType = val;
      if (val == 1) {
        this.isChannelDis1 = true;
        this.isChannelDis2 = false;
        this.defultFrom.createType = "";
        circleCreatFunc({ channelType: val + "" })
          .then(res => {
            if (res.data != {} && res.status == "200") {
              this.typeOptions1[0].options1 = res.data.backVos;
              this.typeOptions1[1].options2 = res.data.systemInitVos;
              this.typeOptions1[2].options3 = res.data.fissionVos;
              this.typeOptions1[3].options4 = res.data.crowdToCircleVos;
            } else if (res.status == "500") {
              console.log("获取圈创建方式失败");
            }
          })
          .catch(() => {
            //this.$message.error('获取失败')
          });
      } else if (val == 2) {
        this.isChannelDis2 = true;
        this.isChannelDis1 = false;
        this.defultFrom.createType = "";
        circleCreatFunc({ channelType: val + "" })
          .then(res => {
            if (res.data != {} && res.status == "200") {
              this.typeOptions2[0].options1 = res.data.backVos;
              this.typeOptions2[1].options2 = res.data.systemInitVos;
            } else if (res.status == "500") {
              console.log("获取圈创建方式失败");
            }
          })
          .catch(() => {
            //this.$message.error('获取失败')
          });
      } else {
        this.isChannelDis1 = false;
        this.isChannelDis2 = false;
        this.defultFrom.createType = "";
      }
    },

    searchTimeChange(flag) {
      if (flag == 1) {
        this.defultFrom.createBeginDate = "";
        this.defultFrom.createEndDate = "";
        this.time = [];
      } else if (flag == 2) {
        this.defultFrom.quickLook = "";
      }
    },
    //圈组管理页面的列表勾选
    selectionChange(selection) {
      this.getChecked = selection;
      this.chooseLen = selection.length;
      this.idsArray = [];
      selection.forEach(ele => {
        this.idsArray.push(ele.circleId);
      });
    },

    //关联商品的按钮   2018.6.6 xiu
    relevanceShop() {
      //判断勾选项数组的长度
      if (this.getChecked.length == 1) {
        this.getRelevanceCopy();
      } else if (this.getChecked.length > 1) {
        this.$message.info("只能关联一项");
      } else {
        this.$message.info("请选择关联项");
      }
    },

    // 调用关联商品列表接口  2018.6.6 xiu
    getRelevanceData() {
      this.relevanceForm.circleId = this.getChecked[0].circleId;
      relevanceShopList(this.relevanceForm)
        .then(res => {
          if (res.status !== 200) {
            this.$message.error(res.errorMsg);
            return;
          }
          //渲染已经关联商品列表
          this.saveAlreadyShop = res.data.associatedProductVoList;
          //渲染未关联商品列表
          this.saveNotShop = res.data.noAssociatedProductVoList;
          this.relevanceTotalPage = Number(res.totalSize);
        })
        .catch(() => {
          this.$message.error("获取关联商品列表失败");
        });
    },
    // 重复
    getRelevanceCopy() {
      this.relevanceForm.circleId = this.getChecked[0].circleId;
      relevanceShopList(this.relevanceForm)
        .then(res => {
          if (res.status !== 200) {
            this.$message.error(res.errorMsg);
            return;
          }
          this.selectShopdialogVisible = true;
          //渲染已经关联商品列表
          this.saveAlreadyShop = res.data.associatedProductVoList;
          //渲染未关联商品列表
          this.saveNotShop = res.data.noAssociatedProductVoList;
          this.relevanceTotalPage = Number(res.totalSize);
        })
        .catch(() => {
          this.$message.error("获取关联商品列表失败");
        });
    },

    //未关联商品的勾选  2018.6.6 xiu
    noRelevanceChange(selection) {
      this.noProductId = [];
      for (let i = 0; i < selection.length; i++) {
        this.noProductId.push(selection[i].categoryOrSpuId);
      }
    },

    //已联商品的勾选  2018.6.6 xiu
    yesRelevanceChange(selection) {
      this.yesProductId = [];
      for (let i = 0; i < selection.length; i++) {
        this.yesProductId.push(selection[i].categoryOrSpuId);
      }
    },

    //确定关联按钮   2018.6.6 xiu
    relevanceSave() {
      if (this.noProductId.length == 0) {
        this.$message.warning("请勾选需要关联的商品！");
      } else {
        saveProduct({
          circleId: this.relevanceForm.circleId,
          productIds: this.noProductId
        }).then(res => {
          if (res.data == true && res.status == "200") {
            this.$message.success("关联成功！");
            this.selectShopdialogVisible = false;
            this.getRelevanceData();
            this.search();
          } else {
            this.$message.warning("关联失败！");
          }
        });
      }
    },

    //取消关联按钮   2018.6.6 xiu
    relevanceCancel() {
      if (this.yesProductId.length == 0) {
        this.$message.warning("请勾选取消关联的商品！");
      } else {
        cancelProduct({
          circleId: this.relevanceForm.circleId,
          productIds: this.yesProductId
        }).then(res => {
          if (res.data == true && res.status == "200") {
            this.$message.success("取消关联成功！");
            this.selectShopdialogVisible = false;
            this.getRelevanceData();
            this.search();
          } else {
            this.$message.warning("取消关联失败！");
          }
        });
      }
    },

    formatterStatus(row, column) {
      if (row.status == "1") {
        return "正常";
      } else if (row.status == "2") {
        return "冻结";
      }
    },
    // 关联商品弹框分页
    relevanceHandleCurrentChange(val) {
      this.relevanceForm.pageNumber = val;
      this.getRelevanceData();
    },
    handleSizeChange(val) {
      this.relevanceForm.pageSize = val;
      this.getRelevanceData();
    },
    onSubmit() {
      this.getRelevanceData();
    },

    // 级联选择事件
    handleChange(value) {
      //    console.log(this.selectedOptions)
      //    console.log(value)
    },
    // 纵向裂变勾选项事件
    handleSelectionChange(val) {
      this.getCheckedSbumit = val;
      var ids = [];
      val.forEach(el => {
        ids.push(el.categoryOrSpuId);
        this.tijiaoForm.level = el.level; // 新增参数  2018.6.25 xiu
        this.tijiaoForm.categoryName = el.categoryOrSpuName; // 新增参数  2018.6.25 xiu
      });
      this.tijiaoForm.categoryId = ids;
    },
    // 纵向裂变点击提交事件
    tijiao() {
      this.saveSubmit();
    },
    //页面加载获取创建方式 2018.6.7 xiu
    getCreatFuncData() {
      circleCreatFunc({ channelType: this.defultFrom.channelType })
        .then(res => {
          //      this.$message.success('获取成功')
        })
        .catch(() => {
          //      this.$message.error('获取失败')
        });
    },
    // 手动纵向裂变圈
    handPortaitChange() {
      var _this = this;
      if (_this.getChecked.length == 1) {
        var obj = {};
        obj.circleId = _this.getChecked[0].circleId;
        getVerticalChangeList(obj)
          .then(res => {
            if (res.status == "500034") {
              _this.$message.warning(res.errorMsg);
              return;
            }
            _this.zongxiangLbData = res.data.data.voList;
            _this.zongxiangLbShow = res.data.data.circleVo;
            _this.circleChange = true;
          })
          .catch(() => {});
        // this.handChangeInfo.circleId = this.getChecked[0].circleId
        // this.handChangeInfo.circleName = this.getChecked[0].circleName
        // this.handChangeInfo.circleHead = this.getChecked[0].circleHead
      } else if (_this.getChecked.length > 1) {
        _this.$message.info("只能裂变一项");
      } else {
        _this.$message.info("请选择裂变项");
      }
    },
    // 调用弹出框提交接口
    saveSubmit() {
      // this.tijiaoForm.categoryId
      if (!this.tijiaoForm.categoryId.length) {
        this.$message.info("请选择勾选项");
        return;
      }
      if (this.tijiaoForm.categoryId.length > 1) {
        this.$message.info("只能勾选一项");
        return;
      }
      if (this.getCheckedSbumit[0].isFisson == "1") {
        this.$message.warning("该类目已经裂变过，不能重复裂变！");
        return;
      }
      if (this.tijiaoForm.categoryId) {
        this.tijiaoForm.categoryId = this.tijiaoForm.categoryId[0];
        this.tijiaoForm.circleId = this.getChecked[0].circleId;
        //this.tijiaoForm.level = this.zongxiangLbShow.hierarchy  去掉换成列表中返回的 2018.6.25 xiu
        verticalChange(this.tijiaoForm)
          .then(res => {
            if (res.status !== 200) {
              this.$message.warning("该类目已经裂变过！");
              return;
            }
            this.circleChange = false;
            this.$message.success("提交成功");
            this.search();
          })
          .catch(() => {
            this.$message.error("提交失败");
          });
      } else {
        this.$message.warning("请选择裂变项");
      }
    },
    // 保存水平列表圈事件
    saveLevelChange() {
      var obj = {};
      obj.circleId = this.getChecked[0].circleId;
      levelHandChange(obj)
        .then(res => {
          this.groupToCircle = false;
          this.$message.success("裂变成功");
          this.search();
        })
        .catch(() => {
          this.$message.error("裂变失败");
        });
    },
    // 手动平行裂变圈事件
    handParallelChange() {
      if (this.getChecked.length == 1) {
        this.handChangeInfo.circleId = this.getChecked[0].circleId;
        this.handChangeInfo.circleName = this.getChecked[0].circleName;
        this.handChangeInfo.circleHead = this.getChecked[0].circleHead;
        this.groupToCircle = true;
      } else if (this.getChecked.length > 1) {
        this.$message.info("只能裂变一项");
      } else {
        this.$message.info("请选择裂变项");
      }
    },
    // table数据格式化
    formatterType(row, column) {
      if (row.channelType == "1") {
        return "电商";
      } else if (row.channelType == "2") {
        return "社交";
      }
    },
    create() {
      // 创建圈子
      this.circleSep = true;
    },
    createCircle(name) {
      this.$router.push("/circlemanage/manage/new/by" + name);
    },
    manageLabel() {
      if (this.idsArray.length > 0) {
        this.$router.push({
          path: "/circlemanage/manage/labelbyshop",
          query: {
            id: "name"
          }
        });
        //      this.$router.push('/circlemanage/info/labelBySocial')
      } else {
        this.$message.warning("请选择勾选项");
      }
    },
    // 详情页面的跳转 1电商 2社交
    handleDetail(index, row) {
      this.$router.push({
        path: "/circlemanage/manage/info/detail",
        query: {
          id: row.circleId,
          channelType: row.channelType,
          channelName: row.circleName
        }
      });
    },
    openConfirmModal(title) {
      if (this.idsArray.length > 0) {
        this.confirmSetting.title = title;
        this.confirmSetting.show = true;
      } else {
        this.$message.info("请选择勾选项");
      }
    },
    viewChart() {
      // 查看圈谱
    },

    // 冻结圈
    circleFreeze() {
      var obj = {};
      obj.ids = this.idsArray;
      updateCircleFreeze(obj)
        .then(res => {
          this.confirmSetting.show = false;
          this.search();
          this.$message.success("成功冻结");
        })
        .catch(() => {
          this.$message.error("冻结失败");
        });
    },
    // 解冻圈
    unCircleFreeze() {
      var obj = {};
      obj.ids = this.idsArray;
      updateUnCircleFreeze(obj)
        .then(res => {
          this.confirmSetting.show = false;
          this.search();
          this.$message.success("成功解冻");
        })
        .catch(() => {
          this.$message.error("解冻失败");
        });
    },
    // 自定义事件
    confirmOk(data) {
      if (data == "1") {
        console.log(this.getChecked);
        var freezeStatus = false;
        this.getChecked.forEach(ele => {
          if (ele.status == "2") {
            freezeStatus = true;
          }
        });
        if (freezeStatus) {
          this.$message.info("已选在冻结项,请重新选择");
          return;
        }
        this.circleFreeze();
      } else if (data == "2") {
        this.unCircleFreeze();
      }
    },
    handleSizeChange(index) {
      this.defultFrom.pageSize = index;
      this.searchTableList();
    },
    // 翻页事件
    handleCurrentChange(index) {
      this.defultFrom.pageNum = index;
      this.searchTableList();
    },
    // 点击查询事件
    search() {
      // console.log(this.defultFrom)
      // var obj = {}
      // // 1电商 2社交
      // obj.channelType = '2'
      // obj.circleStatus = ''
      // obj.pageNum = '1'
      // obj.pageSize = '5'
      // console.log(this[name])
      this.searchTableList();
    },
    searchTableList() {
      getCircleInfoManage(this.defultFrom)
        .then(res => {
          this.totalPage = Number(res.totalSize);
          this.tableData = res.data;
          //this.$message.success('查询成功')
        })
        .catch(() => {
          this.$message.error("查询失败");
        });
    },
    reset() {
      this.defultFrom.channelType = "";
      this.isChannelDis1 = false;
      this.isChannelDis2 = false;
      this.defultFrom.quickLook = "";
      this.defultFrom.circleStatus = "";
      this.defultFrom.categoryCode = "";
      this.defultFrom.createType = "";
      this.defultFrom.circleName = "";
      this.defultFrom.circleId = "";
      this.defultFrom.circleMinNumber = "";
      this.defultFrom.circleMaxNumber = "";
      this.defultFrom.minHierarchy = "";
      this.defultFrom.maxHierarchy = "";
      this.defultFrom.createBeginDate = "";
      this.defultFrom.createEndDate = "";
      this.time = [];
    },
    addNewTag() {
      if (!this.addTag) {
        this.$message.error("不能为空");
        return false;
      } else {
        if (this.tags.indexOf(this.addTag) > -1) {
          this.$message.error("标签已存在");
          return false;
        } else {
          this.tags.push(this.addTag);
          this.addTag = "";
        }
      }
    },
    submit() {
      // 申请成为圈
      this.groupToCircle = false;
    },

    //页面刷新渲染圈类型下拉 2018.6.7 xiu
    handelCircleType() {
      getLabelType({
        pageNum: "1",
        pageSize: "100",
        categoryName: ""
      }).then(res => {
        this.circleTypeOption = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj = {};
          obj.categoryName = res.data[i].categoryName;
          obj.categoryCode = res.data[i].categoryCode;
          this.circleTypeOption.push(obj);
        }
      });
    }
  },
  mounted() {
    this.search();
    this.handelCircleType();
  }
};
</script>

<style scoped>
.clearfix {
  zoom: 1;
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}

.fl {
  float: left;
}

.padLR15 {
  padding: 0 15px;
}

.searchInput.el-input {
  max-width: 300px;
}

.center {
  text-align: center;
}
.mb20 {
  margin-bottom: 20px;
}
.create {
  padding: 20px;
}
.el-tag {
  display: inline-block;
  width: 70px;
  text-align: center;
}
.imgHead {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
