<template>
  <div>
    <div class="create" style="text-align: left;margin: 20px;">
      <el-button type="primary" @click="newDlsg = true">创建特权</el-button>
    </div>
    <hr style="border: none;height: 2px;border-bottom: 1px solid #ccc;" />
    <el-row style="margin: 20px;background: #f1f1f1;padding: 0 10px;box-sizing: border-box;box-shadow: 0 0 0 #ccc;border-radius: 10px;min-height: 500px;"  :gutter="10">
      <el-col :span="4">
        <p style="font-size: 18px;font-weight: bold;line-height: 36px;">特权管理</p>
        <el-tree :data="treeData" style="margin-bottom: 40px;" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="btnGroup" style="text-align: right;">
          <el-button type="success" @click="openclick">批量启用</el-button>
          <el-button type="info" @click="closeclick">批量停用</el-button>
          <el-button type="primary" @click="newCondition">新增限制条件</el-button>
        </div>
        <div class="create">
          <el-table :data="data" border style="width: 100%" stripe @selection-change="selectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="特权ID" width="170"></el-table-column>
            <el-table-column prop="name" label="特权名称"></el-table-column>
            <el-table-column prop="privilegeImage" label="图标">
            	<template slot-scope="scope">
            		<img :src="scope.row.privilegeImage" style="width: 40px;height: 40px;display: block;"/>
            	</template>
            </el-table-column>
            <el-table-column prop="conditionsType" label="限制条件" :formatter="conditStatus"></el-table-column>
            <el-table-column prop="conditionsNumber" label="限制数量"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="useType" label="类型" width="100" :filters="typeChange"
            	:filter-method="filterTag" filter-placement="bottom-end">
				      <template slot-scope="scope">
				        <el-tag
				          disable-transitions>{{scope.row.useType | useTypeStatus}}</el-tag>
				      </template>
            </el-table-column>

            <el-table-column :formatter="formatterStatus" prop="status" label="当前状态"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
              	<el-button @click="detailk(scope.row)" type="text" size="mini">详情</el-button>
        				<el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        				<el-button @click="open(scope.row)" type="text" size="mini">启用</el-button>
        				<el-button @click="sendClick(scope.row)" type="text" size="mini">赠送</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 创建特权弹出框 -->
  	<el-dialog
      title="创建特权"
      :visible.sync="newDlsg"
      width="30%">
      <div>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px"  Content-Type = multipart/form-data>
          <el-form-item prop="programaLevel" label="栏目级别：">
            <el-select v-model="form.programaLevel" placeholder="请选择栏目级别">
              <el-option
                v-for="item in programaLevels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-if="form.programaLevel === '2'" v-model="form.privilegeId" placeholder="请选择一级栏目">
              <el-option
                v-for="item in programaBelongs"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.programaLevel === '2'" prop="privilegeName" label="栏目名称：">
            <el-input  style="width: 200px;" v-model.trim="form.privilegeName" placeholder="请输入栏目名称" clearable></el-input>
          </el-form-item>
          <el-form-item v-else prop="name" label="栏目名称：">
            <el-input  style="width: 200px;" v-model.trim="form.name" placeholder="请输入栏目名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFirstList">确 定</el-button>
        <el-button @click="newDlsg = false">取 消</el-button>
      </span>
    </el-dialog>



   <!--新增弹框-->
    <el-dialog
      title="新增限制条件"
      :visible.sync="addDlsg"
      width="40%">
      <div>
        <el-form ref="addForm" :model="addForm" label-width="120px" Content-Type = multipart/form-data>
        	<el-form-item prop="privilegeTypeName" label="特权名称：">
            <el-input  style="width: 200px;" v-model="addForm.jsonData.privilegeTypeName" placeholder="请输入栏目名称" disabled></el-input>
          </el-form-item>
                  <el-form-item prop="" label="限制条件：">
            <el-select
              v-model="addForm.jsonData.conditionsType"
              :disabled="false"
              placeholder="请选择">
              <el-option
                v-for="item in conditionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
				<el-form-item prop="useType" label="特权类型：">
					<el-select v-model="addForm.jsonData.useType" placeholder="请选择">
              <el-option
                v-for="item in useTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
					</el-select>
				</el-form-item>
          <el-row style="position: relative;">
            <el-col :span="10">
              <el-form-item prop="conditionsNumber" label="限制数量：">
                <el-input style="width: 160px;" placeholder="" v-model="addForm.jsonData.numberPrices[0].conditionsNumber" v-on:input="inputNumCheck" maxlength="7"clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="price" label="价格：">
                <el-input style="width: 160px;" placeholder="" v-model="addForm.jsonData.numberPrices[0].price" v-on:input="inputNumCheck" maxlength="7" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="remarks" label="说明：">
            <el-input v-model.trim="addForm.jsonData.remarks" placeholder="请输入说明" type="textarea" clearable resize="none" autosize="true" style="width:80%"></el-input>
          </el-form-item>

         	<el-form-item prop="" label="自定义图标：">
           	<el-upload
              class="avatar-uploader"
              :disabled="form.programaLevel === '2'"
              :auto-upload="true"
              ref="iconUpload"
              :before-upload="beforeIconUpload"
              list-type="picture-card" enctype="multipart/form-data">
              <el-button size="small" type="text">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不超过2M，支持格式：JPG、JPEG、PNG、BMP，最多上传1张。</div>
            </el-upload>
            	<img :src="addForm.jsonData.privilegeImage" alt="" style="width:150px;height:150px;display:block;position: absolute;top:0px;left:23%;"/>
          </el-form-item>

          <!--<el-form-item prop="" label="自定义图标：">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                with-credentials
                name="file"
                :action="uploadUrl()"
                :on-error="uploadError"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                enctype="multipart/form-data">
                <div class="loadingIcon">
                  <span v-if="showNoticeUploading" class="loadingtip el-icon-loading"></span>
                  <img v-if="imageUrl" :src="noticeImageUrl" class="avatar">
                  <i v-if="!showNoticeUploading && !imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
          </el-form-item>-->

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSecondList">确 定</el-button>
        <el-button @click="addDlsg = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--赠送特权弹框-->
			<el-dialog title="赠送" :visible.sync="dialogFormVisible" width="15%">
			  <el-form :model="sendForm">
			    <el-form-item label="特权：" :label-width="formLabelWidth">
			      <el-input v-model.trim="sendForm.name" auto-complete="off" disabled></el-input>
			    </el-form-item>
			    <el-form-item label="用户：" :label-width="formLabelWidth">
						<el-input v-model.trim="sendForm.user.mId" auto-complete="off" placeholder="请输入用户ID" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sendTrue">确 定</el-button>
			  </div>
			</el-dialog>
  </div>
</template>

<script>
	import { getTreeData,testMessage,limitList,addFirstLevel,addSecondLevel,openMore,detail,addSecondLevelAll,edit,searchId,sendPriv,
	addSecondLevelAllWithoutFile} from '@/api/right'
	let selectionIds = []
  export default {
    data() {
      return {
      	dialogFormVisible: false,
      	saveTreeId: '', // 保存二级treeId
     		data: [],
     		ids : [],
     		viewAndEditSencondId: '',
     		status: '',
     		treeId: '',
        newDlsg: false,
        typeChange: [
        		{
        			text: '等级赠送',
        			value: 1
        		},
        		{
        			text: '活动赠送',
        			value: 2
        		},
        		{
        			text: '手工赠送',
        			value: 3
        		},
        		{
        			text: '购买获得',
        			value: 4
        		}
        ],
        form: {
        	name: '',
          programaLevel: '1',
    			channelId: 1,
    			privilegeId: '',
    			privilegeTypeId: '',
    			conditionsType: '',
    			remarks: '',
        	useType: '',
					numberPrices: [{
						conditionsNumber:1,
						price:10
					}]
        },
//      form: {
//      	name: '',
//        programaLevel: '1',
//  			channelId: 1,
//  			privilegeId: '',
//  			privilegeTypeId: '',
//  			privilegeTypeName: '',
//  			conditionsType: '',
//  			remarks: '',
//      	useType: '',
//					numberPrices: [{
//						conditionsNumber:1,
//						price:10
//					}]
//      },
        // 新增
        addDlsg: false,
        dialogVisible: false,
				addForm: {
        	jsonData: {
        		privilegeImage: '',
        		channelId: 1,
        		privilegeId: '',
        		privilegeTypeId: '',
        		privilegeTypeName: '',
        		remarks: '',
        		useType: '',
						numberPrices: [{
							conditionsNumber:1,
							price:10
						}]
        	}
        },
        choose: [],
        sendForm: {
        	user: {
	        	//mId: '435849580504899584',
	        	mId: '',
	        	channelId: '',
	        	privilegeId: '',
	        	activityId: 1
        	}
        },
        programaLevels: [
          {
            label: '一级栏目',
            value: '1'
          },
          {
            label: '二级栏目',
            value: '2'
          }
        ],
        programaBelongs: [],
        useTypes: [
          {
            label: '等级赠送',
            value: '1'
          },
          {
            label: '活动赠送',
            value: '2'
          },
          {
            label: '手工赠送',
            value: '3'
          },
          {
            label: '购买获得',
            value: '4'
          }
        ],
        conditionsType: [
          {
            label: '圈子数量',
            value: '1'
          },
          {
            label: '好友数量',
            value: '2'
          },
          {
            label: '查看次数',
            value: '3'
          },
          {
            label: '圈子路由次数',
            value: '4'
          },
          {
            label: '提现额度',
            value: '5'
          },
          {
            label: '许愿灯数量',
            value: '6'
          },
          {
            label: '圈主数量',
            value: '7'
          },
          {
            label: '发言时长',
            value: '8'
          },
          {
            label: '访客数量',
            value: '9'
          },
          {
            label: '次数',
            value: '10'
          },
          {
            label: '金额',
            value: '11'
          },
          {
            label: '商品数量',
            value: '12'
          },
          {
            label: '拼主数量',
            value: '13'
          },
          {
            label: '盈币数量',
            value: '14'
          }
        ],
				inputNum: true,
        treeData: [
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        iconFile:{}
      }
    },
    filters: {
    	useTypeStatus(val,row){
    			//console.log(row)
    		if(val === 1){
					    return '等级赠送'
				}else if(val === 2){
				      return '活动赠送'
				}else if(val === 3){
				      return '手工赠送'
				}else if(val === 4){
				      return '购买获得'
				}
    	}
    },
    methods: {
			inputNumCheck () {
				let reg = new RegExp(/^[0-9]*$/)
				if(!reg.test(this.addForm.jsonData.numberPrices[0].conditionsNumber) || !reg.test(this.addForm.jsonData.numberPrices[0].price)){
					this.inputNum = false
				}else{
					this.inputNum = true
				}
			},
      handleAvatarSuccess(res, file) {
        console.log('成功')
      },
      //新增限制条件的按钮
      newCondition () {
				if(!this.addForm.jsonData.privilegeId || !this.saveTreeId || !this.addForm.jsonData.privilegeTypeName){
						this.$message.warning('请选择左侧特权类型！')
				}else{
      			this.addDlsg = true
				}
      },
    	formatterStatus (row, column) {
    		if (row.status == '1') {
    			return "已启用"
    		} else if (row.status == '2') {
    			return '已禁用'
    		}
    	},
  	filterTag(value, row) {
//		console.log('value:' + value) // value 是 filterChange 的value
  		//console.log(row)
      return row.useType === parseInt(value);
    },

    // 列表限制条件过滤
    conditStatus(row){
      if(row.conditionsType === 1){
        return '圈子数量'
      }else if(row.conditionsType === 2){
        return '好友数量'
      }else if(row.conditionsType === 3){
        return '查看次数'
      }else if(row.conditionsType === 4){
        return '圈子路由次数'
      }else if(row.conditionsType === 5){
        return '提现额度'
      }else if(row.conditionsType === 6){
        return '许愿灯数量'
      }else if(row.conditionsType === 7){
        return '圈主数量'
      }else if(row.conditionsType === 8){
        return '发言时长'
      }else if(row.conditionsType === 9){
        return '数量'
      }else if(row.conditionsType === 10){
        return '次数'
      }else if(row.conditionsType === 11){
        return '金额'
      }else if(row.conditionsType === 12){
        return '商品数量'
      }else if(row.conditionsType === 13){
        return '拼主数量'
      }else if(row.conditionsType === 14){
        return '盈币数量'
      }
    },
			// 特权首页加载和列表展示
			handleQuery(){
    		this.programaBelongs = []
    		getTreeData({channelId:'1'})
    		.then(res => {
          this.newDlsg = false
          let data = res.data.data
//        console.log(data)
          // 获取一级菜单的name名   变为label  放进数组中
          let arrTemp = []
          for(let i=0;i<data.length;i++){
            data[i].label = data[i].name
            if(!data[i].parentId){
              this.programaBelongs.push(data[i])
              data[i].children = new Array()
              arrTemp.push(data[i])
            }
          }
          //判断属于二级菜单的话，
          for(let m=0;m<data.length;m++){
					  if(data[m].parentId){
              for(let n=0;n<arrTemp.length;n++){
                if(arrTemp[n].id === data[m].parentId){
                  arrTemp[n].children.push(data[m])
              	}
            	}
         		}
          }
          this.treeData = arrTemp
    		}).catch(error => {
          console.log(error)
      })
    	},

  		handleRemove(file, fileList) {
        console.log('移除')
      },

    	handlePreview(file) {
//      console.log(file);
      },

			//新增弹框的删除限制数量和价格
     	delLimit(index){
				this.addForm.jsonData.numberPrices.splice(index,1)
      },

      //创建弹框的删除限制数量和价格
      delLimitfirst(index){
				this.form.numberPrices.splice(index,1)
      },

			//点击一级和二级栏目渲染右侧限制条件列表
      handleNodeClick(data) {
	      if(data.parentId){
      		this.saveTreeId = data.id  // 点击时候保存二级id
					this.addForm.jsonData.privilegeTypeName = data.name // 二级名字
					this.addForm.jsonData.privilegeTypeId = data.id
					this.viewAndEditSencondId = data.id
      		let treeId = data.id
					this.send (treeId)
	      }else if(!data.parentId){
	      	this.addForm.jsonData.privilegeId = data.id // 一级id
	      }
      },

      // 刷新列表---请求
			send (treeId) {
      	limitList(
      		{
      			pageNum:1,
      			pageSize:10,
      			channelId:1,
      			privilegeTypeId:treeId
      		}
      	).then(res => {
      		this.data = res.data.data
      		}).catch(error => {
          console.log(error)
       })
      },

      //赠送按钮
      sendClick (row) {
      	//console.log(row)
      	this.dialogFormVisible = true
      	this.sendForm.name = row.name
      	this.sendForm.user.privilegeId = row.id
      	this.sendForm.user.channelId = row.channelId
      	//查询用户id（只是调试时候用一下，以后就从别的页面查询复制过来，用作特权赠送）
      	//searchId({
      		//keyword: '测试',
      		//pageNum: 1,
      		//pageSize: 10
      	//}).then(res => {
      		//console.log(res)
      	//})
      },

      //赠送弹框的确定按钮
      sendTrue () {
      	sendPriv(this.sendForm.user).then(res => {
      		//console.log(res)
      		if(res.data.success == true && res.status == '200'){
      			   this.$message({
                message: '赠送成功!',
                type: 'success'
              })
      			 this.dialogFormVisible = false
      			 this.send (this.saveTreeId)
      		}
      	})
      },
      //创建特权弹框的确定按钮，用来创建一级和二级栏目的
      addFirstList () {
      	let level = this.form.programaLevel
				if (level == "1") {
          var status = '1'
          var arr = this.treeData
          arr.forEach(el => {
            if (el.name == this.form.name) {
              status = '2'
              this.form.name = ''
              return
            }
          })
          if (status == '2') {
            this.$message({
              message: 'sorry命名已存在,请重新命名!',
              type: 'error'
            })
          } else if (status == '1') {
          	 if(!this.form.name){
          	 	this.$message.warning('创建失败，栏目名称不能为空！')
          	 	return
          	 }else{
		          	 	var obj = {}
		          	 	obj.channelId = 1
		          	 	obj.name = this.form.name
		          	 	addFirstLevel(obj).then(res => {
		          	 	  this.$message({
		          	 	    message: '创建成功!',
		          	 	    type: 'success'
		          	 	  })
		          	 	  this.handleQuery ()
		          	 	  this.newDlsg = false
		          	 	  this.form.name = ''
		          	 	})
          	 }
          }
      	}

					if (level == "2") {
		          var status = '1'
		          var arr = this.treeData
		          for(let i=0;i<arr.length;i++){
		          		for(let k=0;k<arr[i].children.length;k++){
		          			if(arr[i].children[k].name == this.form.privilegeName){
						              status = '2'
						              this.$message.warning('该命名已存在,请重新命名!')
						              this.form.privilegeName = ''
						              return
		          			}
		          		}
		          }
							 if (status == '1') {
			          	 if(!this.form.privilegeName || !this.form.privilegeId){
				          	 	this.$message.warning('栏目名称和一级栏目不能为空！')
				          	 	return
			          	 } else {
						            var obj = {}
						            obj.channelId = 1
						            obj.privilegeName = this.form.privilegeName
						            obj.privilegeId = this.form.privilegeId
						            addSecondLevel(obj).then(res => {
						            	if(res.data.success == true && res.status == 200){
								            this.$message({
								              message: '创建成功!',
								              type: 'success'
								            })
								            this.handleQuery ()
								            this.newDlsg = false
								            this.form.privilegeName = ''
						            	}
						           })
			          	 }
		         }
					}
      },

			//批量启用按钮    获取当前行特权条件的id数组
			selectionChange(selection){
				this.choose = selection
				//存id
				selectionIds = []
				for(let i=0;i<selection.length;i++){
					selectionIds.push(selection[i].id)
				}
			},

			//批量启用按钮   点击发送请求
			openclick(){
				if (!selectionIds.length) {
					this.$message.warning('启用失败，请选择特权条件！')
					return
				}
				for(let i=0;i<this.choose.length;i++){
					if(this.choose[i].status == '1'){
						this.$message.warning('选项中包含已启用项，请重新选择！')
						return
					}
				}
				openMore({
					ids : JSON.stringify(selectionIds) ,
					channelId : 1 ,
					status : 1
				}).then(res => {
//					alert("启用成功")
					this.$message.success('启用成功!')
					this.send(this.saveTreeId)
//					this.data.status = '已启用'
				})
			},

			//单个启用
			open (row) {
				//console.log(row)
				if(row.status == '1'){
					this.$message.warning('当前状态已启用，请勿重复操作！')
					return
				}else{
						let arr = []
						arr.push(row.id)
						openMore({
							ids : JSON.stringify(arr),
							channelId : 1 ,
							status : 1
						}).then(res => {
		      		if(res.data.success == true && res.status == '200'){
		      			   this.$message.success('启用成功!')
		      		}
							this.send(this.saveTreeId)
						})
						}
				},

			//批量禁用按钮
			closeclick(){
				if (!selectionIds.length) {
					this.$message.warning('禁用失败，请选择特权条件')
				}else{
						for(let i=0;i<this.choose.length;i++){
							if(this.choose[i].status == '2'){
								this.$message.warning('选项中包含已禁用项，请重新选择！')
								return
							}
						}
						openMore({
							ids : JSON.stringify(selectionIds) ,
							channelId : 1 ,
							status : 2
						}).then(res => {
							this.$message.success('禁用成功')
							this.send (this.saveTreeId)
		//					this.status = '已禁用'
						})
				}
			},

    	// 跳转详情查看页面
    	detailk(row){
				let detailkId=row.id
				let conditionsType = row.conditionsType
				let privilegeTypeId = row.privilegeTypeId
    		this.$router.push(
    			{
    				path:'/right/detail',
    				query:{
    					id : detailkId,
	 						channelId : 1,
	 						conditionsType: conditionsType,
	 						privilegeTypeId: privilegeTypeId
    				}
    			}
    		)
    	},

    	editQuery () {
					let query = this.$router.currentRoute.query
					this.viewAndEditSencondId = query.viewAndEditSencondId
					if(this.viewAndEditSencondId){
			      	limitList(
			      		{
			      			pageNum:1,
			      			pageSize:10,
			      			channelId:1,
			      			privilegeTypeId:this.viewAndEditSencondId
			      		}
			      	).then(res => {
			      		this.data = res.data.data
			      		}).catch(error => {
			          console.log(error)
			       })
					}
    	},

    	//  点击 详情编辑
    	edit(row){
    		let editId = row.id
				let conditionsType = row.conditionsType
				let privilegeTypeId = row.privilegeTypeId
//  		let remarks = row.remarks
//  		let conditionsNumber = row.conditionsNumber
//  		let price = row.price
    		this.$router.push(
    			{
    				path:'/right/edit',
    				query:{
	 						channelId : 1,
	 						id : editId,
	 						conditionsType: conditionsType,
	 						privilegeTypeId: privilegeTypeId,
//	 						remarks : remarks,
//	 						conditionsNumber : conditionsNumber,
//	 						price :price
    				}
    			}
    		)
    	},

			//图片上传  6.22之后
	    beforeIconUpload(file){
	    	var _this = this
	    	let fd = new FormData()
	    	fd.append('file',file)
					addSecondLevelAll(fd).then(res =>{
						if(res.status == 200){
							_this.$message.success('图片上传成功！')
							_this.addForm.jsonData.privilegeImage = res.data
						}else{
							_this.$message.success('图片上传失败，请重试！')
						}
					})
	    },
	     //新增特权条件弹框的确定按钮 6.22之后
			addSecondList () {
				if(!this.addForm.jsonData.conditionsType || !this.addForm.jsonData.useType || !this.addForm.jsonData.remarks) {
					this.$message.warning('全部为必填')
				}else if(this.addForm.jsonData.privilegeImage == ''){
					this.$message.warning('请先上传图片！')
				}else if(this.inputNum == false){
					this.$message.warning('价格和数量必须为正整数！')
				}else if(this.addForm.jsonData.numberPrices[0].conditionsNumber == 0){
					this.$message.warning('数量必须大于0！')
				}else if(this.addForm.jsonData.numberPrices[0].conditionsNumber == '' || this.addForm.jsonData.numberPrices[0].price == ''){
					this.$message.warning('数量和价格不能为空！')
				}else{
						addSecondLevelAllWithoutFile(this.addForm.jsonData).then(res => {
							if(res.status == '200'){
									this.$message.success('添加特权限制条件成功')
									this.handleQuery()
									this.addDlsg = false
									this.addForm.jsonData = {
					        		channelId: 1,
					        		privilegeId: '',
					        		privilegeTypeId: '',
					        		privilegeTypeName: '',
					        		remarks: '',
					        		useType: '',
											numberPrices: [{
												conditionsNumber:1,
												price:10
											}]
									}						
							}
						})
				}
			},	    
	    
			
    	//新增特权条件按钮  用来发起文件上传请求  6.22之前
//			addSecondList(){
//				var _this = this
//				if(!_this.addForm.jsonData.conditionsType || !_this.addForm.jsonData.useType || !_this.addForm.jsonData.numberPrices || !_this.addForm.jsonData.remarks || _this.inputNum == false) {
//					_this.$message.warning('全部为必填,限制数量必须为正整数！')
//					return
//				}
//					_this.$refs.iconUpload.submit()
//			},			
			
			
			// 新增特权条件弹框    用来处理文件上传并传参  6.22之前
//	    beforeIconUpload(file){
//	    	var _this = this
//	    	let fd = new FormData()
//	    	fd.append('file',file)
//	    	fd.append('jsonData',JSON.stringify(this.addForm.jsonData))
//					addSecondLevelAll(fd).then(res =>{
//						if(res.data.success == true && res.status == 200){
//							_this.$message.success('添加特权限制条件成功')
//							_this.handleQuery()
//							_this.addDlsg = false
//							_this.addForm.jsonData = {
//			        		channelId: 1,
//			        		privilegeId: '',
//			        		privilegeTypeId: '',
//			        		privilegeTypeName: '',
//			        		remarks: '',
//			        		useType: '',
//									numberPrices: [{
//										conditionsNumber:1,
//										price:10
//									}]
//							}
//						}
//					})
//	    }
    },
    mounted(){
  		this.handleQuery()
  		this.editQuery()
    }
  }
</script>

<style scoped lang="scss">
  .create,.btnGroup{
    margin: 15px 0;
  }
</style>
<style>
  .el-tree{
    padding: 20px 10px;
  }
  .el-tree-node__content{
    height: 40px;
  }

</style>
