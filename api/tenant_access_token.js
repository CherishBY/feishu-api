// 获取tenant access token
const axios = require('axios');
export default async function handler(req, res) {
  try {
    const data = {
      api_id: 'cli_a726d69f89b15013',
      api_secret: 'IYWLrVKqguwwI8tMStpWgeIzgjkFZnsw',
    };

    const response = await axios.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
      data,
      {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}