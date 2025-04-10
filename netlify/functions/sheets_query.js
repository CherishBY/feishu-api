const api = require('../../api');

exports.handler = async (event, context) => {
  // 只允许POST请求
  if (!api.isPOST(event)) {
    return api.methodError();
  }

  try {
    // 解析请求体
    const params = api.parseParams(event);
    const { spreadsheetToken, accessToken } = params;

    // 验证参数
    if (!spreadsheetToken || !accessToken) {
      return api.paramsError('spreadsheetToken', 'accessToken');
    }

    // 查询表格数据
    const response = await api.get(`/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/query`,accessToken);

    const data = await response.json();

    // 请求失败处理
    api.responseFail(response, data);

    // 返回成功
    return api.success(data);
  } catch (error) {
    return api.catchError(error);
  }
};