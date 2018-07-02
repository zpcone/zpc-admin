<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb></breadcrumb>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<router-link class="inlineBlock" to="/">
					<el-dropdown-item>
						Home
					</el-dropdown-item>
				</router-link>
				<el-dropdown-item divided>
           <span @click="logoutAdmin" style="display:block;">LogOut</span>
					<!-- <a href="http://dev.oss.womaoapp.com/fwas-security-admin/logout" style="display:block;">LogOut</a> -->
					<!-- <span style="display:block;" @click="dropOut">LogOut</span> -->
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-menu>
</template>

<script>
// 登出
import { logOut } from '@/utils/path'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'


export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
    return {
      logoutUrl: '',
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    logoutAdmin() {
      logOut()
    },
    // 退出登录
    // logout() {
    //   logout({})
    //   .then(res => {
    //     this.$message.success('成功退出')
    //   })
    //   .catch(() => {
    //     this.$message.success('退出失败')
    //   })
    // },
    // toggleSideBar() {
    //   this.$store.dispatch('ToggleSideBar')
    // },
    dropOut() {
      logout({})
      .then(res => {
        this.$message.success('退出成功')
      })
      .catch(() => {
        this.$message.error('退出失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 50px;
		line-height: 50px;
		border-radius: 0px !important;
		.hamburger-container {
			line-height: 58px;
			height: 50px;
			float: left;
			padding: 0 10px;
		}
		.screenfull {
			position: absolute;
			right: 90px;
			top: 16px;
			color: red;
		}
		.avatar-container {
			height: 50px;
			display: inline-block;
			position: absolute;
			right: 35px;
			.avatar-wrapper {
				cursor: pointer;
				margin-top: 5px;
				position: relative;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
</style>
