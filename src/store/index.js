import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  
	  callState:1, //状态 1 关闭弹框  2 来电呼叫 3 通话中 4 正常通话的挂断 5 未接来电 （呼叫中功能第三方未实现）
	  phoneNumber:'', //来电号码/呼叫号码	 
	  callTime:'00:00:00', //通话时间
	  userName:'', //当前登录的用户名
  },
  actions: {
  	  setCallState(ctx,callState){
  		  ctx.commit('setCallState',callState)
  	  },
	  setPhoneNumber(ctx,phoneNumber){
  		  ctx.commit('setPhoneNumber',phoneNumber)
  	  },
	  setcallTime(ctx,callTime){
  		  ctx.commit('setcallTime',callTime)
  	  },
	  setUserName(ctx,userName){
	     ctx.commit('setUserName',userName)
	  },
  },
  mutations: {
	  setCallState(state,callState){
	      state.callState = callState;
	  },
	  setPhoneNumber(state,phoneNumber){
	      state.phoneNumber = phoneNumber;
	  },
	  setcallTime(state,callTime){
	      state.callTime = callTime;
	  },
	  setUserName(state,userName){
	      state.userName = userName;
	  },
  },  
  /* modules: {
  } */
})
