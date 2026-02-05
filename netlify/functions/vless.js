/**
 * Netlify 终极逃生版 - 修复强制断开与协议警告
 */
const UUID = '550e8400-e29b-41d4-a716-446655440000'; // 确保与你截图中的一致

exports.handler = async function(event, context) {
    const host = event.headers.host;

    // 网页提取逻辑：访问域名/123
    if (event.path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        // 链接里强制带上 sni，确保你导入时不会漏掉
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}&sni=${host}#Netlify-IPv4-Fixed`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    // 极其精简的响应：不带任何可能引起网关怀疑的 Header
    return {
        statusCode: 200,
        body: "Ready" 
    };
};
