<template>
	<div class="my-phone-right-main">
		<!-- <div class="my-phone-right-main-user">
       <div class="my-fax-list-box">
           <div class="my-fax-list1" v-for="(item,index) in peopleList" :key="index">
                <div class="my-fax-list1-left-box">
                    <span class="my-fax-list1-left">{{index+1}}</span>
                    <div class="my-fax-list1-right">{{item.name}}</div>
                </div>
                 <div class="my-fax-list1-left-box">
                    <i class="my-fax-list1-delete el-icon-delete" @click="myDelete(index)"></i>
                    <div class="my-fax-list1-right-left">{{item.mobile}}</div>
                  
                </div>
                
            </div>
        </div>         
      </div> -->

		<div class="sendMsg">
			<el-row :gutter='20'>
				<el-col :span="15">
					<el-input v-model="phoneNumber" placeholder="请输入号码，多个号码使用“，”隔开"></el-input>
				</el-col>
				<el-col :span="4">
					<el-button>发送</el-button>
				</el-col>
			</el-row>
			<el-row style="margin: 20px 5px;height: 200px">
				<el-input v-model="smsContent" type="textarea" placeholder="请输入短信内容" resize="none" show-word-limit maxlength="500"
				 :autosize="{minRows: 8,maxRows:8}"></el-input>
			</el-row>
		</div>

		<my-dialog :flag='dialogTitle' :dialogVisible='dialogVisible'></my-dialog>
	</div>
</template>

<script>
	import myDialog from '../../components/myDialog'
	export default {
		name: 'sms',
		components: {
			myDialog
		},
		data() {
			return {
				dialogTitle: '添加号码',
				dialogVisible: false,
				dialogData: '',
				phoneNumber: '',
				smsContent: ''
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
