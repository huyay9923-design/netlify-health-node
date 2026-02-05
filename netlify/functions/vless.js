/**
 * 终极强连版 - 修复 Netlify 强制断开问题
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 网页提取逻辑：访问 /123 时直接输出节点
    if (path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}#Netlify-One-Shot`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    // WebSocket 连接响应：不做任何逻辑，直接返回空内容
    // 这能有效防止 Netlify 边缘网关因“逻辑过长”而掐断连接
    return {
        statusCode: 200,
        body: "" 
    };
};
