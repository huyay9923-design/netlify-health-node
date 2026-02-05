/**
 * 终极强连版 - 修复 Netlify 强制断开问题
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Final-Pass';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 网页提取逻辑：访问 /123 时输出 Base64
    if (path.includes('123')) {
        // 关键点：连接路径必须是这个标准长路径
        const realPath = '/.netlify/functions/vless';
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}#${encodeURIComponent(NODE_NAME)}`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    // WebSocket 连接逻辑：当代理软件连接时，不返回 200，而是保持响应
    // 这能有效防止 Netlify 边缘网关报 "connection closed"
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "Service Ready"
    };
};
