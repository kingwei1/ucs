<template>
	<!--来电弹窗-->
	<el-dialog :visible.sync="callVisible" width="20%" :title="calltitle" :modal="false" :close-on-click-modal="false"
	 :modal-append-to-body="false" @close="closeDialog">
		<div align="center" style="margin-top:-20px;">
			<el-row style="margin:10px;">通话号码:{{phoneNumber}}</el-row>
			<el-row style="margin:10px;">通话时长:{{callTime}}</el-row>
			<el-row style="margin-top: 50px">
				<el-button v-if="callState == 2" type="primary" @click="answer">接听</el-button>
				<el-button v-if="callState == 2 || callState == 3" type="danger" @click="hangup">挂断</el-button>
			</el-row>
			<!-- <el-row style="margin-top: 50px" v-if="callClass==''">正在尝试进行呼叫，请等待系统请求呼叫资源</el-row> -->
		</div>
	</el-dialog>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		name: "callDialog",
		data() {
			return {
				callVisible:false,
				calltitle: "通话信息",
			}
		},
		computed: {
			...mapState(['callState', 'phoneNumber','callTime']),
		},
		watch:{
			  callState(curVal, oldVal){	
				  console.log(curVal, oldVal);
				  if(curVal == 1){	
					 this.callVisible = false; 
				  }else{
					 this.callVisible = true; 
					 console.log(this.callVisible);
					 if(curVal == 2){			 
					    this.calltitle = '来电呼叫'; 
				     }else if(curVal == 3){			 
					    this.calltitle = '通话中'; 
				     }else if(curVal == 4){			 
					    this.calltitle = '已挂断'; 
				     }else if(curVal == 5){			 
					    this.calltitle = '未接来电'; 
				     }
				  }
			  }
		},
		created() {

		},
		methods: {
			//接听方法
			answer() {
                 this.$vdcp.answer();	
			},
			//挂断方法
			hangup() {
				this.$confirm('是否结束当前通话?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					type: 'warning'
				}).then(() => {
					this.$vdcp.release();	
				});
			},
			closeDialog(){
				this.$store.dispatch('setCallState',1);
			}
		}
	}
</script>

<style scoped>
	>>>.el-input__inner {
		color: #606266;
		font-size: inherit;
		font-weight: inherit;
		text-align: center;
	}

	>>>.el-input__inner {
		color: #76D672;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
	}

	.call-menu-box {
		width: 300px;
		position: absolute;
		top: 0;
		left: 100%;
		z-index: 20;
		background: #fff;
		box-sizing: border-box;
		height: 100%;
		/* overflow: auto; */
		/* box-shadow: 0 1px 3px rgba(0,0,0,.3); */
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .3);
	}

	.call-menu-box-main {
		width: 300px;
		height: 40px;
		line-height: 40px;
		position: relative;
		/* border-top:1px solid #333;
    border-bottom:1px solid #333; */
		border-bottom: 1px solid rgba(0, 0, 0, .3);
		box-sizing: border-box;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.mycontent-box {
		padding: 10px 5px;
		text-align: justify;
		word-break: break-all;
		text-indent: 2em;

	}

	.call-menu-box-main.oy-position-box {
		position: relative;
		z-index: 40;
		background: #fff;

	}

	.myscroll-box {
		height: 100%;
		padding-top: 42px;
		overflow: auto;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 30;
		background: #fff;

	}

	.myscroll-box.oy-active {
		padding-top: 0;
	}

	.call-menu-box-main-img {
		display: inline-block;
		width: 26px;
		height: 26px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		/* background-image: url(../assets/back.png); */
		margin: 7px 0;
	}

	/* .call-menu-box-main:last-child{
    border-bottom: none;
  } */
</style>
