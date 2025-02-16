// api/getTenantToken.js
export default async function handler(req, res) {
  // 确保请求方法是 POST
  if (req.method === 'POST') {
    try {
      // 从环境变量中获取 App ID 和 App Secret
      // const appId = process.env.FEISHU_APP_ID;
      // const appSecret = process.env.FEISHU_APP_SECRET;
      const body = req.body;
      const VITE_APP_ID=cli_a726d69f89b15013
      const VITE_APP_SECRET=IYWLrVKqguwwI8tMStpWgeIzgjkFZnsw

      // 调用飞书接口获取 tenant_access_token
      const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          app_id: VITE_APP_ID,
          app_secret: VITE_APP_SECRET
        })
      });

      console.log('>>>> response', response);
      const data = await response.json();

      // 检查飞书接口返回的状态码
      if (data.code !== 0) {
        return res.status(500).json({
          success: false,
          message: 'Failed to get tenant_access_token from Feishu API.',
          error: data.msg
        });
      }

      // 返回成功响应
      res.status(200).json({
        success: true,
        message: 'Tenant access token retrieved successfully!',
        token: data.tenant_access_token,
        expire: data.expire
      });
    } catch (error) {
      // 处理错误
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message
      });
    }
  } else {
    // 如果不是 POST 请求，返回 405 Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });
  }
}