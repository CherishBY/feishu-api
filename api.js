const fetch = require('node-fetch');

class Api {
  constructor() {}
  get baseURL() {
    return 'https://open.feishu.cn/open-apis';
  }
  parseParams(event) {
    let params = event?.queryStringParameters||event?.data || event?.params || event?.body;
    if (typeof params === 'string') return JSON.parse(params);
    return params;
  }
  async post(path, body) {
    return await fetch(this.baseURL+path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  }
  async get(path, token) {
    return await fetch(this.baseURL+path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }
  isPOST(event) {
    return event.httpMethod === 'POST';
  }
  success(data) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(data)
    };
  }
  methodError() {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Method Not Allowed',
        details: '请求方式不合法，请使用post'
      })
    };
  }
  paramsError(...params) {
    const str = params.join(' and ');
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing required parameters',
        details: `Both ${str} are required`
      })
    };
  }
  responseFail(response, data) {
    if (!response.ok) {
      throw new Error(
        `飞书API请求失败: ${response.status} - ${data.msg || '未知错误'}`
      );
    }
  }
  catchError(error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: '函数内部错误',
        details: error.message
      })
    };
  }
}

module.exports = new Api();
