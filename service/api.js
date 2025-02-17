const request = require('./axios');
const URL = 'https://open.feishu.cn/open-apis';

class API {
  async getToken(config) {
    return request.post({...config, url: `${URL}/auth/v3/tenant_access_token/internal`});
  }
}

export default new API();