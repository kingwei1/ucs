<template>
    <div class="phone">
		  <h1>拨打电话</h1>
          <div class="phoneNumberBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" @submit.native.prevent>
              <el-form-item prop="phoneNumber" class="phoneCall">
                <el-input v-model="ruleForm.phoneNumber" placeholder="请输入要拨打的号码" :validate-event="false"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="numList">
            <el-tag
              :key="item.id"
              v-for="item in ['1','2','3','4','5','6','7','8','9','*','0','#']"
              @click="addnum(item)"
              :disable-transitions="false"
              class="numTag"
            >
              {{item}}
            </el-tag>
          </div>
          <div class="bottomRow">
            <div class="numTag" style="background:#FAFAFA;"></div>
            <el-tag
              @click="handleDial('ruleForm')"
              :disable-transitions="false"
              class="dialTag"
            >
              <span class="el-icon-phone"></span>
            </el-tag>
            <el-tag
              @click="handleDeleteNum"
              :disable-transitions="false"
              class="numTag"
              style="background:#FAFAFA;"
              @mousedown.native="handleMouseDown"
              @mouseup.native="handleMouseUp"
            >
             <img src="../../assets/img/deletePhone.png" style="margin-top: 5px;"/>
            </el-tag>
          </div>
    </div>
</template>

<script>

    export default {
        name: "phone",
        components: {
			
		},
        data(){
		  let numberCheck=(rule,value,callback)  =>{
		        console.log(value)
		        let num1 = /^[1][2,3,4,5,7,8,9][0-9]{9}$/;   //手机号码校验
		        let num2 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;   //固定电话校验
		        if(!value.match(num1) && !value.match(num2)){
		          callback(new Error('请输入正确的电话号码!'));
		        }
		        callback();
		   };
          return{
            ruleForm:{
              phoneNumber:''
            },
            rules: {
              phoneNumber: [
                { validator: numberCheck, trigger: 'blur' }
              ]
            },
            seatNumber:'',//坐席号
            agent_id:"",
            conn:'',
          }
        },
        mounted(){
          
        },
        methods:{
          addnum(num) {
            if (this.ruleForm.phoneNumber.length <= 20) {
              this.ruleForm.phoneNumber += num
            }
          },
          handleDeleteNum() {
            if (this.ruleForm.phoneNumber.length !== 0) {
              this.ruleForm.phoneNumber = this.ruleForm.phoneNumber.substr(0, this.ruleForm.phoneNumber.length - 1)
            }
          },
          handleMouseDown() {
            this.timeId = setTimeout(() => {
              this.intervalId = setInterval(() => {
                this.ruleForm.phoneNumber = this.ruleForm.phoneNumber.substr(0, this.ruleForm.phoneNumber.length - 1)
              }, 50)
            }, 200)
          },
          handleMouseUp() {
            window.clearTimeout(this.timeId)
            window.clearInterval(this.intervalId)
          },
          handleDial(formName) {//拨号操作           
			this.$refs[formName].validate((valid) => {
			  console.log(valid)
			  if (valid) {
			       console.log(this.ruleForm.phoneNumber);
			       this.$vdcp.callout(this.ruleForm.phoneNumber);		
			  } else {
			    this.$message.error('请输入正确的号码');
			    return false;
			  }
			});
          },
        }
    }
</script>

<style scoped>
  .phone{
	  width: 500px;
  }
  .name{
    font-weight: bold;
    font-size: 25px;
  }
  .numList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .numTag {
    width: 80px;
    margin: 3px 7%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #666;
    font-size: 19px;
    border: none;
    background: #e5e5e5;
    user-select: none;
  }

  .numTag:active:focus, .numTag:active:hover {
    background-color: #d5d5d5;
  }

  .dialTag {
    text-align: center;
    width: 17.3333%;
    margin: 5px 4%;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    font-size: 25px;
    border: none;
    user-select: none;
    color: #fff;
    background: #4cd966;
  }

  .dialTag:active:focus, .dialTag:active:hover {
    background-color: #3cc956;
  }

  .bottomRow {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .icondelete:active:focus, .icondelete:active:hover {
    background-color: #d5d5d5;
  }
  .phoneNumberBox {
    margin: 20px 0;
  }

  .phoneNumberBox >>> .el-input {
    font-size: 20px;
  }
  .blue{
    /* box-sizing:border-box;  */
    border:2px solid #338FCC;
  }
  .details{
    border: 1px solid #ddd;
    margin-top:50px;
  }
  .details div{
    display: flex;
    align-items: center;
  }
  .details span{
    flex: 1;
    display: inline-block;
    padding:20px 10px;
  }
  
</style>
