/**
 * 完整修改后的代码 - v2rayN 兼容路径版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-V2-Fix';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 判断访问路径是否包含 123 
    if (path.includes('123')) {
        // 重要：这是 Netlify 函数的真实内部路径，不能修改
        const realPath = '/.netlify/functions/vless';
        
        // 构造 VLESS 链接，确保 path 参数是 realPath 而不是带 123 的路径
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}#${encodeURIComponent(NODE_NAME)}`;
        
        // 转换为 Base64 
        const base64Link = Buffer.from(vlessLink).toString('base64');
        
        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "text/plain; charset=utf-8",
                "Access-Control-Allow-Origin": "*" 
            },
            body: base64Link
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1>Ready</h1><p>Please use /123 path.</p>"
    };
};
