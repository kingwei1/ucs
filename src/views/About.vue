<template>
	<div class="about">
		<h1>服务概览</h1>
		<el-row type="flex" class="row-bg box" justify="space-between">
			<el-col :span="5" v-for="item in stateList" :key='item.id' style="position: relative;cursor: pointer;" @click.native="clickCard(item)">
				<el-card shadow="hover" :class="{success:item.state == '已连接',fail:item.state == '连接失败',warning:item.state == '未设置'}" >
					<i :class="item.icon" style="color: #FFFFFF;font-size: 50px;"></i>
					<div class="box2">
						<div>{{item.name}}</div>
						<div>{{item.state}}</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'about',
		components: {

		},
		data() {
			return {
				stateList: [{
						id: 1,
						icon: 'el-icon-phone',
						state: '未连接',
						name: '电话',
						path:'/phone'
					},
					{
						id: 2,
						icon: 'el-icon-s-comment',
						state: '未连接',
						name: '短信',
						path:'/sms'
					},
					{
						id: 3,
						icon: 'el-icon-s-custom',
						state: '未连接',
						name: '会议',
						path:'/meeting'
					},
					{
						id: 4,
						icon: 'el-icon-receiving',
						state: '未连接',
						name: '传真',
						path:'/fax'
					}
				],
			}
		},
		methods: {   //监听方法click事件等
		    clickCard(item){
				 this.$router.push(item.path)
			}
		},
		created(){
			this.$http.testPhoneConnection().then((res) => {
				 console.log(res);
				 if(res.errorcode == 0){
					 this.stateList[0].state = '已连接'
				 }else{
					 this.stateList[0].state = res.msg;
				 }
			}).catch((err) =>{
                 console.log(err)
			});

			this.$http.testSmsConnection().then((res) => {
				 console.log(res);
				 if(res.errorcode == 0){
					 this.stateList[1].state = '已连接'
				 }else{
					 this.stateList[1].state = res.msg;
				 }
			}).catch((err) =>{
                 console.log(err)
			});
			
			this.$http.testConferenceConnection().then((res) => {
				 console.log(res);
				 if(res.errorcode == 0){
					 this.stateList[2].state = '已连接'
				 }else{
					 this.stateList[2].state = res.msg;
				 }
			}).catch((err) =>{
                 console.log(err)
			});

			this.$http.testFaxConnection().then((res) => {
				 console.log(res);
				 if(res.errorcode == 0){
					 this.stateList[3].state = '已连接'
				 }else{
					 this.stateList[3].state = res.msg;
				 }
			}).catch((err) =>{
                 console.log(err)
			});
			
		}
		
	}
</script>

<style lang="scss">
	@import '../style/mixin';

	.box {
		margin: 20px 0;
	}

	.success {
		background-color: #67C23A;
	}

	.fail {
		background: #F56C6C;
	}
    .warning{
		background: #e6a23c;;
	}
	.box2 {
		@include center;

		& div:nth-child(1) {
			font-size: 16px;
		}
		& div:nth-child(2) {			
			font-size: 20px;			
		}
		& div{
			color: #FFFFFF;
			margin: 15px;
		}

	}
</style>
