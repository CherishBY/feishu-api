import axios from 'axios';

export async (req, res) => {
	try {
		console.log(req.headers);
		// 接口 headers
		const accessToken = req.headers['Authorization'];
		// 接口 参数
		// const range = req.query.range;
		const spreadSheetToken = req.query.spreadSheetToken
		
		const response = await axios.get(`https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadSheetToken}/sheets/query`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
		
		res.status(200).json(response.data);
	} catch(error) {
		console.log('error res', res);
		console.log('error', error);
		console.log('error status', res.status);
		res.status(500).json({error: error.message});
	}
}