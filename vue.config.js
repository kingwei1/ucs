var path = require('path')

function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 8080, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: { //代理跨域
			'/api': {
				target: 'http://www.example.org',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
				  '^/api': ''
				}
			}
		}
    },
	
	 chainWebpack: config => {
	    config.resolve.alias
		.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
	  }
	
}
