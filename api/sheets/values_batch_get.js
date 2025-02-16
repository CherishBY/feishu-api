// 获取表格文件中多个sheet的内容
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const accessToken = req.query.accessToken;
        const spreadsheetToken = req.query.spreadsheetToken; // 电子表格 Token
        const ranges = req.query.ranges;

        const response = await axios.get(
            `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${spreadsheetToken}/values_batch_get?ranges=${ranges}&valueRenderOption=ToString&dateTimeRenderOption=FormattedString`,
            {
                mode: 'no-cors',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                data: JSON.stringify({
                    ranges: ranges
                })
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};