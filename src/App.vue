<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style type="text/css">
	.el-table__expanded-cell{
	  background: #e6effb;
	}
	.el-table thead tr th {
	  background: rgba(100,152,200,0.2);
	  color: #666;
	}
</style>
	