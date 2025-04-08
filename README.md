## 飞书API中转云函数
- 主要用于请求在个人项目中出现跨域的情况

## 使用到的接口
1. https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal
2. https://open.feishu.cn/document/server-docs/docs/sheets-v3/spreadsheet-sheet/query?appId=cli_a726d69f89b15013
3. https://open.feishu.cn/document/server-docs/docs/sheets-v3/data-operation/reading-multiple-ranges

## 文件说明
### sheets
- 电子工作表
	- query：查询工作表
	- values_batch_get：获取工作表中多个电子表的信息
		- ranges：格式 —— d63f29!A1:G8【电子表id!表中信息的范围】

## 部署地址
- https://app.netlify.com/sites/feishu-api/deploys/

## 本地测试
- pnpm install
- node test.js [需手动修改test.js中的参数等]

## 部署出错
1. Dependencies installation error
- 暂时找不到出问题的地方，目前是依赖安装失败，可以尝试重新部署，或者手动安装依赖。
- 将xxx-lock.yaml文件删除，重新部署


安全建议：
- 缓存令牌避免频繁请求
- 安全性：
	- 添加API调用频率限制和实现简单的用户认证
	- 添加日志记录用以记录API的调用情况便于排查问题