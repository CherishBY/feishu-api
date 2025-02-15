import axios from 'axios';

export async (req, res) => {
	try {
        const accessToken = req.query.accessToken;
		const spreadSheetToken = req.query.spreadSheetToken
		
		const response = await axios.get(`https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadSheetToken}/sheets/query`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});
		
		res.status(200).json(response.data);
	} catch(error) {
		res.status(500).json({error: error.message});
	}
}