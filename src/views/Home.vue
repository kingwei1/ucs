<template>
  <div class="home">
	<el-container>
	  <el-header class="header">
		  <span>UCS</span>
		  <div style="float: right;font-size: 16px;">
			  <span style="margin: 20px;">{{userName}}</span>
			  <span style="cursor: pointer;" @click="login" v-if="userName == ''">登录</span>
			  <span style="cursor: pointer;" @click="logout" v-else>退出</span>
		  </div>
	  </el-header>
	  <el-container>
	    <el-aside  class="aside" width='200px'>
	    	<el-scrollbar style="height: 100%">
				<LeftMenu></LeftMenu>
	    	</el-scrollbar>
	    </el-aside>
	    <el-main class="main">
	    	<el-scrollbar style="height: 100%">
	    		<router-view></router-view>
	    	</el-scrollbar>
	    </el-main>
	  </el-container>
	</el-container>
	<!-- 电话弹框 -->
	<call-dialog></call-dialog>
	<!-- 登录弹框 -->
	<my-dialog :flag='dialogTitle' :dialogVisible='dialogVisible' @close='dialogVisible=false' ></my-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import LeftMenu from "../components/LeftMenu";
import callDialog from '../components/callDialog'
import myDialog from '../components/myDialog'

export default {
  name: 'home',
  components: {
    LeftMenu,callDialog,myDialog
  },
  data(){
	  return{
		  dialogTitle:'登录',
		  dialogVisible:false,
	  }
  },
  computed:{
	 ...mapState(['userName'])
  },
  methods:{
	 login(){
		 this.dialogVisible = true;
	 },
	 logout(){
		 this.$confirm('是否退出当前登录?', '提示', {
		 	confirmButtonText: '是',
		 	cancelButtonText: '否',
		 	type: 'warning'
		 }).then(() => {
		 	this.$vdcp.logout();
		 });
	 }
  }
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	.header {
		height: 70px;
		line-height: 70px;
		font-size: 26px;
		color: white;
	    /* background-color: #009943; */
		background-image: linear-gradient(130deg, #009943, 50%, rgb(4, 190, 254));
		/* background-image: linear-gradient(to right, #E94E65, #15A892 20%, #A89215 80%, #1574A8); */
		/*font-weight: bold;*/
	}
	.aside{
		 background-color: #FFF;
		 height: calc(100vh - 60px);
	}
	.main{
		background: #FAFAFA;
		height: calc(100vh - 60px);
	}
</style>
