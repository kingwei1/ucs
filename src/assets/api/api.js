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
    method: 'post',
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

export default {
    testPhoneConnection,
    testFaxConnection,
    testConferenceConnection,
    testSmsConnection,
    getSysSetting,
    updateSysSetting

}
