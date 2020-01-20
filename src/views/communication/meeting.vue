<template>
  <div class="about">
    <h1>会议</h1>
	<div style="width:500px;margin: 20px;">
	  <el-form :model="ruleForm"  ref="ruleForm" label-width="150px" class="demo-ruleForm">
	    <el-form-item label="会议名称" prop="meetingName" :rules="[{ required: true, message: '会议名称不能为空'}]" >
	      <el-input  v-model="ruleForm.meetingName" placeholder="请输入会议名称" ></el-input>
	    </el-form-item>
	    <el-form-item label="参会对象类型" prop="objType">
	       <el-radio-group v-model="ruleForm.objType" @change="changeObjType">
	           <el-radio :label="1">设备</el-radio>
	           <el-radio :label="2">用户</el-radio>
	           <el-radio :label="3">通讯录</el-radio>
	         </el-radio-group>
	    </el-form-item>
	    <el-form-item label="入会方式" prop="partType">
	       <el-radio-group v-model="ruleForm.partType">
	           <el-radio :label="4">视频会议</el-radio>
	           <el-radio :label="3">语音会议</el-radio>
	         </el-radio-group>
	    </el-form-item>
		<el-form-item :label="objIdTitle" prop="objId" :rules="[{ required: true, message: objIdTitle+'不能为空'}]">
		  <el-input  v-model="ruleForm.objId" placeholder=""></el-input>
		</el-form-item>
		<el-form-item :label="objNameTitle" prop="objName" :rules="[{ required: true, message: objNameTitle+'不能为空'}]">
		  <el-input  v-model="ruleForm.objName" placeholder=""></el-input>
		</el-form-item>
		<el-form-item :label="partSnoTitle" prop="partSno" :rules="[{ required: true, message: partSnoTitle+'不能为空'}]">
		  <el-input  v-model="ruleForm.partSno" placeholder=""></el-input>
		</el-form-item>
		<el-form-item>
		    <el-button type="primary" plain @click="submitForm('ruleForm')">召开会议</el-button>
		    <el-button  plain @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	  </el-form>
	</div>
  </div>
</template>

<script>

  export default {
    name: "passwordManagement",
    data() {
      return {
        ruleForm: {
          meetingName: "",
		  objType:1,
		  partType:4,
          objId: "",
          objName: "",	
		  partSno:""
        },
		objIdTitle:'设备编号',
		objNameTitle:'设备名称',
		partSnoTitle:'设备代码的值',
      }
    },
    methods: {
      //提交方法
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
             console.log(this.ruleForm);
			 this.$vdcp.createConf(this.ruleForm.meetingName,this.ruleForm);

          } else {
            return false;
          }
        });
      },
      //重置表单方法
      resetForm(formName) {
        this.$refs[formName].resetFields();
		this.changeObjType(1);
      },
	  changeObjType(val){
		 console.log(val);
		 if(val == 1){
			 this.objIdTitle = '设备编号';
			 this.objNameTitle = '设备名称';
			 this.partSnoTitle = '设备代码的值';
		 }else if(val == 2){
			 this.objIdTitle = '融合通讯用户id';
			 this.objNameTitle = '用户姓名';
			 this.partSnoTitle = '融合通讯账号';
		 }else{
			 this.objIdTitle = '通讯录人员编号';
			 this.objNameTitle = '通讯录人员名称';
			 this.partSnoTitle = '电话号码';
		 }
	  }
    }
  }
</script>

