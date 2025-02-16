// 获取tenant access token
const axios = require('axios');
module.exports = async (req, res) => {
  try {
    const response = await axios({
      url: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
      method: 'post',
      data: req.body
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}