import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  // 阻止直接通过GET方法访问
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Method Not Allowed',
        msg: '请求方式不合法，请使用post'
      })
    };
  }

  // 验证请求来源（可选但推荐）
  const allowedOrigins = ['https://your-domain.netlify.app'];
  const origin = event.headers['origin'] || event.headers['Origin'];

  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Forbidden',
        msg: '非法请求源'
      })
    };
  }

  // 从环境变量获取凭证
  const APP_ID = process.env.FEISHU_APP_ID;
  const APP_SECRET = process.env.FEISHU_APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '飞书应用凭证未配置' })
    };
  }

  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: APP_ID,
        app_secret: APP_SECRET
      })
    });

    const data = await response.json();

    // 检查飞书API返回的错误
    if (data.code && data.code !== 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: '飞书API错误',
          details: data
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: '内部服务器错误',
        details: error.message
      })
    };
  }
};