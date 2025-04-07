// 模拟Netlify函数事件对象
const mockEvent = {
  httpMethod: 'POST',
  headers: {
    origin: 'http://localhost'
  }
};

// 模拟环境变量
process.env.APP_ID = 'cli_a726d69f89b15013';
process.env.APP_SECRET = 'IYWLrVKqguwwI8tMStpWgeIzgjkFZnsw';

// 导入你的函数
const { handler } = require('./netlify/functions/tenant_access_token');

// 执行测试
(async () => {
  try {
    const result = await handler(mockEvent);
    console.log('测试结果:', result);
  } catch (error) {
    console.error('测试失败:', error);
  }
})();