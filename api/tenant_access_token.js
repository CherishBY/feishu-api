// 获取tenant access token
const axios = require('axios');
module.exports = async (req, res) => {
  try {
    const data = {
      app_id: 'cli_a726d69f89b15013',
      app_secret: 'IYWLrVKqguwwI8tMStpWgeIzgjkFZnsw',
    };

    // const response = await axios.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
    //   {
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: data
    //   }
    // );

    const response = await axios({
      url: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
      method: 'post',
      data: data
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}