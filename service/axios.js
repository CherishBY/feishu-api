const axios = require('axios');

const request = (options) => {
  const baseOptions = {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  };
  const config = Object.assign({}, baseOptions, options);
  const service = axios.create(config);

  return {
    get(config) {
      return service({
        ...config,
        method: 'get'
      });
    },
    post(config) {
      return service({
        ...config,
        method: 'post'
      });
    }
  }
};

export default request();