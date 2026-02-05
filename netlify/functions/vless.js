/**
 * 完整修改后的代码 - 终极稳定性版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-One-Last-Try';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 网页提取逻辑：访问 /123 获取节点
    if (path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        // 关键：确保 path 经过编码且不包含多余字符
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}#${encodeURIComponent(NODE_NAME)}`;
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    // WebSocket 握手逻辑：直接返回空，缩短 Netlify 网关的判断时间
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "" 
    };
};
