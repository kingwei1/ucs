<template>
  <div class="sidebar">
    <template v-for="item in items">
      <router-link :to="item.path" v-if="item.path">
        <el-menu-item v-if="item.children ==null || item.children.length == 0" :index="item.path">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link>
      <!-- 判断是否有二级路由 -->
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <Menu :items="item.children"/>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: "Menu",
  props: {
    items: Array
  },
  data() {
    return {
      
    };
  }
};
</script>
<style >
	.el-menu-item.is-active {
	   background-color: rgb(231, 235, 240) !important;
	}
</style>
