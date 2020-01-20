import axios from 'axios' // 引入axios
import url from '../../../public/config' // 引入axios
import NProgress from "nprogress";
import { Notification,Message, MessageBox, Loading } from 'element-ui'

const apiUrl = url.config.apiUrl;

const instance = axios.create({
  baseURL: apiUrl, //设置基础路径
  headers: {
  },
  transformResponse: [function (data) {}],
});

// http request 拦截器
instance.interceptors.request.use(
config => {
  NProgress.start()
  return config
},
err => {
  return Promise.reject(err)
}
)
// response 拦截器
let MessageBoxshow = true;
instance.interceptors.response.use(
response => {
  NProgress.done()
  let data;

  if(response.data === undefined){
    try {
     data =JSON.parse(response.request.responseText)//将返回的字段转为JSON,可以和后台约定
    } catch(e) {
      data =response.request.responseText
    }
  }
  else{
    data = response.data;
  }
  if (data.errorcode == '10002' || data.errorcode == '10004') {
    if(MessageBoxshow){
      MessageBox.alert(data.msg, '提示', { //多个接口同时请求，会弹出多次弹窗，目前最方便是定义MessageBoxshow变量，但是太low不治本 ，这是bug，未解决？
        confirmButtonText: '确定',
        callback: () => {
         
        }
      });
      MessageBoxshow=false;
    }
  }else {
    MessageBoxshow=true;
    return data
  }

},
error => {
  return Promise.reject(error)
})

export default function $axios (options) {
  return new Promise((resolve, reject) => {
    
    //请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false
      })
      .catch((error) => {
        reject(error)
        //Notification.warning('网络连接延时!');
      })
  })
}
