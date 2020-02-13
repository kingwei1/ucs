import axios from './http' // 倒入 api
// import url from '../../../public/config' 

// const apiUrl = url.config.apiUrl;
/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */


// 判断电话
export const testPhoneConnection = data => {
  return axios({ 
    url: '/ucs/setting/testPhoneConnection',
    method: 'post',
    data
  })
};

// 判断传真
export const testFaxConnection = data => {
    return axios({ 
      url: '/ucs/setting/testFaxConnection',
      method: 'post',
      data
    })
  };
  // 判断会议
export const testConferenceConnection = data => {
    return axios({ 
      url: '/ucs/setting/testConferenceConnection',
      method: 'post',
      data
    })
  };
  // 判断短信
export const testSmsConnection = data => {
    return axios({ 
      url: '/ucs/setting/testSmsConnection',
      method: 'post',
      data
    })
  };

// 获取系统配置
export const getSysSetting = data => {
  return axios({ 
    url: '/ucs/setting/getSysSetting',
    method: 'get',
    data
  })
};
// 修改系统配置
export const updateSysSetting = data => {
  return axios({ 
    url: '/ucs/setting/updateSysSetting',
    method: 'post',
    data
  })
};
// 获取心跳配置
export const taskList = data => {
  return axios({ 
    url: '/ucs/task/taskList',
    method: 'get',
    data
  })
};
// 修改心跳配置状态
export const taskControl = data => {
  return axios({ 
    url: '/ucs/task/taskControl',
    method: 'post',
    data
  })
};
// 获取当前运行的心跳配置
export const running = data => {
  return axios({ 
    url: '/ucs/task/running',
    method: 'get',
    data
  })
};

export default {
    testPhoneConnection,
    testFaxConnection,
    testConferenceConnection,
    testSmsConnection,
    getSysSetting,
    updateSysSetting,
	taskList,
	taskControl,
	running

}
