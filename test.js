// 模拟环境变量
process.env.APP_ID = '';
process.env.APP_SECRET = '';
token = 't-g10448mrYN7FZO22NVKCLOJTXO6I2NKNDNUEHQNO';

const data = {
  spreadsheetToken: '111',
  accessToken: token,
  ranges: 'YopQ1y!A1:C6'
}

// 模拟Netlify函数事件对象
const mockEvent = {
  httpMethod: 'POST',
  headers: {
    origin: 'http://localhost'
  },
  queryStringParameters: data,
  // body: JSON.stringify(data)
};

// 导入你的函数
const { handler } = require('./netlify/functions/sheets_query');

// 执行测试
(async () => {
  try {
    const result = await handler(mockEvent);
    console.log('测试结果:', result);
  } catch (error) {
    console.error('测试失败:', error);
  }
})();