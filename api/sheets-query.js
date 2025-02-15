import axios from 'axios';

module.exports = async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        const spreadsheetToken = 'Tx0bsaPXFhVbvqtKhSKcxhjdnue'; // 替换为你的电子表格 Token

        const response = await axios.get(
			`https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadsheetToken}/sheets/query`,
            {
				mode:'no-cors',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};