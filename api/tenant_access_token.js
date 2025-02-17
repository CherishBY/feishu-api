// 获取tenant access token
const request = require('../service/api');
const apiConfig = require('../service/contants');

module.exports = async (req, res) => {
  try {
    // const response = await axios({
    //   url: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
    //   method: 'post',
    //   data: req.body
    // });

    const response = await request.post({
      url: `${apiConfig}/auth/v3/tenant_access_token/internal/`,
      data: req.body
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}