import XW from './dist/XW.js'
import g from '../../../public/config.js'
import store from '../../store/index';
import { Message, MessageBox } from "element-ui";

const config = g.config;
const xw = new XW({
  // 写入一些配置，此处可以配置将使用融合通讯中台的哪些服务，例如话务接报、音视频会议等
  meeting: true, // 是否开启音视频会议接口及事件，默认为true，即开启
  phone: true, // 是否开启电话接口及事件，默认为true，即开启
  IM:true, // 是否开启IM消息接口及事件，默认为true，即开启
  monitor: true, // 是否开启监控接口及事件，默认为true，即开启
  pointToPointCall: true  // 是否开启点对点呼叫接口及事件，默认为true，即开启
});

/***
 * 登录 
 **/ 
async function login(userAccount,password,path){
  console.log('调用登录',userAccount,password,path);  
  console.log({path});
  const connectResult = await xw.connect({
     path // 需要传入中台服务的代理路径http://172.25.193.131:81
  });
  let status = Number(connectResult.status);
  if(status !== 200){
	 Message.error(errorCheck[status]); 
  }
  let loginResult = await xw.login({userAccount,password}); 
  let state = Number(loginResult.status);
  if(state == 200){
	 Message.success('登录成功');
	 store.dispatch('setUserName',userAccount);
	 //listen();
  }else{
	 Message.error(errorCheck[state]); 
	 console.log(errorCheck[state]);
  }
}

/***
 * 登出 
 **/ 
async function logout(){
  console.log('调用登出');   
  const result = await xw.logout();
  let state = Number(result.status);
  if(state == 200){
	 Message.success('登出成功');
	 store.dispatch('setUserName','');
	 /* xw.unListen('OnAnswerSuccess'); //取消监听电话来电事件
	 xw.unListen('OnReleaseSuccess'); //取消监听电话挂机事件
	 xw.unListen('OnLongNoAnswer'); //取消监听久未应答事件 */
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 电话事件监控 
 **/ 
let callId = ''; //呼叫标识，接听时候要用到
function listen(){
	console.log('监听来电呼叫显示');
   /***
   	  * 电话来电事件
   	  * callId	String	呼叫标识
   	  * caller	String	主叫号码(客户来电号码)
   	  * called	String	被叫号码
   	  **/ 
   	 xw.listen('OnAnswerRequest', params => { 
   	     callId = params.callId;
   	     let caller = params.caller;
   	     let called = params.called;
		 store.dispatch('setCallState',2);
		 store.dispatch('setPhoneNumber',caller);
		 timeStar();//开始计时来电时间
   	 })
   /***
   	* 电话挂机事件
   	* 通话状态由正常通话变成挂断状态后，当前用户会收到电话挂机事件。
     注意：任意一方主动挂机或意外中断都会收到此事件。
   	**/ 
   xw.listen('OnReleaseSuccess', params => { 
   	   store.dispatch('setCallState',4);
   	   timeEnd();//结束计时通话时间
   })
   /***
   	* 久未应答事件
   	* 当前用户收到电话来电事件后久不应答，呼叫超时挂断后会触发此事件。或者呼叫方在当前用户应答前主动挂断也会触发此事件
   	**/ 
   xw.listen('OnLongNoAnswer', params => { 
   	  store.dispatch('setCallState',5);
   	  timeEnd();//结束计时通话时间
   })
}

/***
 * 打开视频监控 
 * resId	string	必选	要打开的监控设备ID
 * name	string	非必选	查看监控的窗口名称，默认为 resId
 * number	非必选	监控窗口到屏幕左边的距离(单位：px)，默认 0
 * y	number	非必选	监控窗口到屏幕上边的距离(单位：px)，默认 0
 * width	number	非必选	监控窗口的宽度(单位：px)，默认 600
 * height	number	非必选	监控窗口的高度(单位：px)，默认 400
 **/ 
async function openMonitor(resId,name,number,y,width,height){
  console.log({resId});  
  let result = await xw.openMonitor({resId});	
  let state = Number(result.status);
  if(state == 200){
	 Message.success('监控成功打开'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 打开矩形监控 
 **/ 
async function enterMatrix(){
  let result = await xw.enterMatrix();	
  let state = Number(result.status);
  if(state == 200){
	 Message.success('打开矩形监控成功'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 创建音视频会议
 * meetingName	string	必选	会议名称
 * members	array	必选	参会人员列表信息，详见下表
  objType	int	必选	参会对象类型, 1-设备 2-用户 3-通讯录
  objId	String	必选	用户类型为1时，对应的是设备编号,用户类型为2时，对应的是星网账号,用户类型为3时，对应的是通讯录人员编号
  objName	String	必选	用户类型为1时，对应的是设备名称,用户类型为2时，对应的是用户姓名,用户类型为3时，对应的是通讯录人员名称
  partType	int	必选	入会方式, 3-语音入会 4-视频入会
  partSno	String	必选	会场标识,obj_type=1时，对应的设备代码的值, obj_type=2 时，对应的是星网账号，obj_type=3 时，对应的是电话号码
  
 **/ 
async function createConf(meetingName,members){
  console.log({meetingName,members})
  let result = await xw.createConf({meetingName,members});	
  let state = Number(result.status);
  if(state == 200){
	 Message.success('创建音视频会议成功'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 发起语音点呼
 * userAccount	string	必选	语音点呼的接收方，可以为手持终端或调度台用户对应的融合通讯账号
  向其他用户发起点对点语音呼叫，呼叫的对象可以为手持终端或者是在线的调度台用户，若呼叫不存在的用户号码或者不在线的用户则点呼不能发起成功。 
 **/ 
async function dialVoice(userAccount){
  console.log({userAccount})
  let result = await xw.dialVoice({userAccount});	
  let state = Number(result.status);
  if(state == 200){
	 Message.success('语音点呼成功'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 电话呼出
 * phoneNum	string	必选	PSTN/PLMN电话号
 * 返回状态 
  412：被呼方正忙
  413：被呼方拒绝接听
  421：呼叫方有未结束的相关通话
  422：呼叫方没有权限呼叫被呼方
  423：被呼方未接通前，呼叫方主动取消呼叫 *
 **/ 
async function callout(phoneNum){
  console.log({phoneNum})
  let result = await xw.callout({phoneNum});	
  let state = Number(result.status);  
  
  if(state == 200){
	 Message.success('电话呼出成功'); 
	 store.dispatch('setPhoneNumber',phoneNum);
	 store.dispatch('setCallState',3);
	 timeStar();//开始计时通话时间
  }else if(state == 421){
	 Message.error('您有未结束的相关通话'); 
  }else if(state == 422){
	 Message.error('您没有权限呼叫被呼方'); 
  }else if(state == 423){
	 Message.error('您没有权限呼叫被呼方'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 电话接听
 * callId	string	必选	呼叫标识，电话来电事件的参数中可以获取该标识
 **/ 
async function answer(){
  console.log({callId})  
  let result = await xw.answer({callId});	
  let state = Number(result.status);  
  if(state == 200){
	 Message.success('电话接听');
	 store.dispatch('setCallState',3);
	 timeStar();//开始计时通话时间
  }else if(state == 411){
	 Message.error('对方已挂断'); 
  }else if(state == 421){
	 Message.error('接听方有未结束的相关通话'); 
  }else{
	 Message.error(errorCheck[state]); 
  }
}

/***
 * 电话拒接 / 挂机
 **/ 
async function release(){	
  let result = await xw.release();	
  let state = Number(result.status);   
  if(state == 200){
	 Message.success('已挂断通话');
	 store.dispatch('setCallState',4);
	 timeEnd();//结束计时通话时间
  }else{
	 Message.error(errorCheck[state]); 
  }
}

let setTime;
/* 开始计时 */
function timeStar(){
	let time =  0;
	clearInterval(setTime);  //清除定时器
	setTime = setInterval(function(){
		store.dispatch('setcallTime',timeChange(time++));
	},1000);
}
/* 结束计时 */
function timeEnd(){
	clearInterval(setTime);  //清除定时器
}
/* 时间格式转换为00:00:00,参数1为1秒 */
function timeChange(t){
	
	    var NowtimeValue = t;
	
	    var nowH = parseInt(NowtimeValue / 3600);
	
	    var nowM = parseInt(NowtimeValue % 3600 / 60);
	
	    var nowS = parseInt(NowtimeValue % 60);
	
	    nowH < 10 ? nowH = "0" + nowH : nowH = nowH;
	
	    nowM < 10 ? nowM = "0" + nowM : nowM = nowM;
	
	    nowS < 10 ? nowS = "0" + nowS : nowS = nowS;
	    
	    return nowH + ":" + nowM + ":" + nowS;
}

export default  {
	login,
	logout,
	openMonitor,
	enterMatrix,
	createConf,
	dialVoice,
	callout,
	answer,
	release,
	timeEnd
}

const errorCheck = {
	200:'调用星网中台api成功',
	400:'调用星网中台api时入参数据格式不合法',
	401:'当前角色没有登录星网中台或处于忙碌状态',
	403:'当前登录的角色没有权限调用该星网中台api',
	404:'调用的星网中台 api 未开放，请联系管理员！',
	408:'请求星网中台服务器超时',
	409:'请求被取消！',
	410:'星网中台会话已过期！',
	411:'被呼方不在线',
	412:'被呼方正忙',
	413:'被呼方拒绝接听',
	414:'用户忙碌，请关掉其它通信任务再进行操作',
	415:'用户已离线，请切换到在线状态再进行操作',
	416:'不能呼叫自己',
	417:'呼叫失败',
	418:'挂断失败',
	500:'星网中台内部发生了未知错误，需要联系星网开发者',
	501:'登录失败了',
	502:'星网中台的服务器连接错误',
	511:'exe 程序启动失败。建议检查杀毒软件或操作系统是否禁用exe 的某些权限',
	512:'exe 程序所需的网卡端口被占用。建议检查12700端口是否被占用',
	513:'exe 程序异常中止',
	514:'exe 程序报错',
	521:'nats 服务未启动',
	522:'nats 服务启动出错',
	523:'nats 超过了最大连接数',
	531:'音视频会议服务未启动',
	532:'音视频会议超过了最大服务数',
	541:'vc 服务未启动',
	542:'vc 超过了最大服务数',
	551:'webService 服务出错',
	561:'打开监控失败',
	562:'打开监控超时',
	563:'打开矩阵监控失败',
	564:'打开矩阵监控超时'
}