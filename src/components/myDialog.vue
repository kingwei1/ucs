<template>
<div id="dialogBox">
	<!--添加号码对话框-->
	<el-dialog v-if="flag=='添加号码'" :title="flag" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
		<el-input type="textarea" resize="none" :autosize="{minRows:4,maxRows:4}"  placeholder="请输入号码，多个号码使用“，”隔开"></el-input>
		<el-button @click='handleClose'>取 消</el-button>
		<el-button type="primary" >确 定</el-button>
	</el-dialog>
	
	<!--电话通话过程对话框-->
	<el-dialog v-if="flag=='通话中' || flag=='来电呼叫' || flag=='已挂断'" :title="flag" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
		<el-input type="textarea" resize="none" :autosize="{minRows:4,maxRows:4}"  placeholder="请输入号码，多个号码使用“，”隔开"></el-input>
		<el-button @click='handleClose'>取 消</el-button>
		<el-button type="primary" >确 定</el-button>
	</el-dialog>
	
	<!--电话通话过程对话框-->
	<el-dialog v-if="flag=='登录'" :title="flag" :visible.sync="dialogVisible" width="500px" :before-close="handleClose" center :close-on-click-modal='false'>
		<el-form :model="ruleForm"  ref="ruleForm" label-width="auto" class="demo-ruleForm">
		  <el-form-item label="用户" prop="userName" :rules="[{ required: true, message: '用户账号不能为空'}]" >
		    <el-input  v-model="ruleForm.userName" placeholder="请输入用户账号" ></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="passwrod" :rules="[{ required: true, message: '密码不能为空'}]" >
		    <el-input  v-model="ruleForm.passwrod" placeholder="请输入密码" ></el-input>
		  </el-form-item>
		  <el-form-item label="地址" prop="path" >
		    <el-input  v-model="ruleForm.path" placeholder="请输入通讯path路径" ></el-input>
		  </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click='handleClose'>取 消</el-button>
		  <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
		</span>
		
	</el-dialog>
</div>
</template>

<script>
	export default {
		name: "myDialog",
		components: {

		},
		props: ['flag', 'dialogVisible', 'datas'],
		data() {
			return {
               ruleForm: {
                 userName: "wangyong",
                 passwrod:"888888",
				 path:'http://172.25.193.102/ucc_server'
               },
			}
		},
		methods: {
			handleClose() {
				this.$emit('close');
			},
			submit(obj){
				this.$emit('submit');
			},
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			    console.log(valid)
			    if (valid) {
			       console.log(this.ruleForm);
				  this.$vdcp.login(this.ruleForm.userName,this.ruleForm.passwrod,this.ruleForm.path);
				  this.handleClose();			
			    } else {
			      return false;
			    }
			  });
			},
		}
	}
</script>

<style>
</style>
