const api = require('../../api');

exports.handler = async (event, context) => {
  // 只允许POST请求
  if (!api.isPOST(event)) {
    return api.methodError();
  }

  try {
    // 解析请求体
    const requestBody = JSON.parse(event.body);
    const { spreadsheetToken,accessToken, ranges } = requestBody;

    // 验证参数
    if (!spreadsheetToken || !accessToken || !ranges) {
      return api.paramsError('spreadsheetToken', 'accessToken','rangs');
    }

    // 查询表格数据
    const response = await api.get(`/sheets/v2/spreadsheets/${spreadsheetToken}/values_batch_get?ranges=${ranges}`,accessToken);

    const data = await response.json();

    // 请求失败处理
    api.responseFail(response, data);

    // 返回成功
    return api.success(data);
  } catch (error) {
    return api.catchError(error);
  }
};