<template>
  <div class="voiceCall">
    <h1>语音呼叫</h1>
	<el-row :gutter='20' style="margin-top: 20px;">
	  <el-col :span="10">
		  <el-input v-model="deviceId" placeholder="请输入手持终端或调度台用户对应的融合通讯账号"></el-input>
	  </el-col>
	  <el-col :span="6">
		 <el-button type="primary" plain @click='openMonitor'>呼叫</el-button>	
	  </el-col>
	</el-row>
  </div>
</template>

<script>
export default {
    name: "voiceCall",
    data() {
      return {       
		deviceId:'',
      }
    },
    methods: {
		openMonitor(){
			if(!this.deviceId){
				this.$message.warning('请输入手持终端或调度台用户对应的融合通讯账号');
			}else{
				this.$vdcp.dialVoice(this.deviceId);
			}
		},
    }
  }
</script>


<style>

</style>
