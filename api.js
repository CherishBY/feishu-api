const fetch = require('node-fetch');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

class Api {
  constructor() {}
  get baseURL() {
    return 'https://open.feishu.cn/open-apis';
  }
  parseParams(event) {
    // 1. 解析请求方法和内容
    const { body, queryStringParameters } = event;

    // 2. 统一处理请求数据（兼容Fetch和Axios）
    let requestData = {};
    try {
      requestData = body ? JSON.parse(body) : {};
    } catch (e) {
      // 如果不是JSON格式，保持原始body
      requestData = body || {};
    }

    return {
      ...requestData,
      ...queryStringParameters
    };
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
      headers,
      body: JSON.stringify(data)
    };
  }
  methodError() {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method Not Allowed',
        details: '请求方式不合法，请使用post'
      })
    };
  }
  paramsError(...params) {
    const str = params.join(' 和 ');
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: '缺少必要参数',
        details: `需要提供${str}`
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
      headers,
      body: JSON.stringify({
        error: '函数内部错误',
        details: error.message
      })
    };
  }
}

module.exports = new Api();
