// 获取tenant access token
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const appID = req.query.app_id;
    const appSecret = req.query.app_secret;

    const response = await axios.get(`https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/`,
      {
        method: 'POST',
        mode: 'no-cors',
        data: JSON.stringify({
          app_id: appID,
          app_secret: appSecret
        })
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};