const api = require('../../api');

exports.handler = async function (event, context) {
  // 阻止直接通过GET方法访问
  if (!api.isPOST(event)) {
    return api.methodError();
  }

  // 从环境变量获取凭证
  const APP_ID = process.env.APP_ID;
  const APP_SECRET = process.env.APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '飞书应用凭证未配置' })
    };
  }

  try {
    const response = await api.post(
      '/auth/v3/tenant_access_token/internal/',
      {
        app_id: APP_ID,
        app_secret: APP_SECRET
      });

    const data = await response.json();

    // 请求失败处理
    api.responseFail(response, data);

    // 返回成功
    return api.success(data);
  } catch (error) {
    return api.catchError(error);
  }
};