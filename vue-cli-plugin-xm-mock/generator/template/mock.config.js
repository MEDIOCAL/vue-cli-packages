module.exports = {
    // 代理,请求https://mocks.alibaba-inc.com/mock/api/list
    "/api/list": "https://mocks.alibaba-inc.com/mock",

    // api2 路径下所有请求读 swagger 内容
    "/api2/*": "swagger https://imp-daily.uc.test/ncrm/v2/api-docs",  // swagger
    
    // api2 路径下所有请求读取本地 mock 文件夹的 *.json 文件
    "/api3/*": "/mock",

    // 直接设置返回对象
    "/test11/*":  {
        status: 0,
        message: 'success'
    },
    // 设置 function 
    "/test22/*": function(req, state) {
        const param = req.query
        return {
            status: 0,
            result: {
                pageSize: param.pageSize,
                header: req.header,
                Cookie: state.Cookie
            }
        }
    },
    '/api/tags': {
      'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
    },
};