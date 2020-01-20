<template>
  <div class="videoMonitor">
    <h1>视频监控</h1>
	<el-row :gutter='20' style="margin-top: 20px;">
	  <el-col :span="10">
		  <el-input v-model="deviceId" placeholder="请输入监控设备的id"></el-input>
	  </el-col>
	  <el-col :span="6">
		 <el-button type="primary" plain @click='openMonitor'>打开监控</el-button>	
	     <el-button  plain @click='enterMatrix'>打开矩形监控</el-button>	
	  </el-col>
	</el-row>
  </div>
</template>

<script>
export default {
    name: "videoMonitor",
    data() {
      return {       
		deviceId:'',
      }
    },
    methods: {
		openMonitor(){
			if(!this.deviceId){
				this.$message.warning('请输入监控设备的id');
			}else{
				this.$vdcp.openMonitor(this.deviceId);
			}
		},
		enterMatrix(){
			this.$vdcp.enterMatrix();
		}
    }
  }
</script>


<style>

</style>
