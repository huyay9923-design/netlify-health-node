/**
 * Netlify 终极换血版 - 尝试更换 UUID 绕过标记
 */
const UUID = '550e8400-e29b-41d4-a716-446655440000'; // 更换了全新的 UUID
const NODE_NAME = 'Netlify-New-ID';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 网页提取逻辑
    if (path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}&sni=${host}#${encodeURIComponent(NODE_NAME)}`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    // 极其精简的响应，模拟正常网页
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: "OK" 
    };
};
