/**
 * 完整修改后的代码 - 路径触发 + 增强兼容版
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Japan-Standard'; // 节点名称

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 只有路径以 /123 结尾时才下发节点信息
    if (path.endsWith('/123')) {
        // 构造原始 VLESS 链接
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
        
        // 使用 Buffer 转换为 Base64 编码，确保在所有 Node.js 版本下都能正常提取
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

    // 访问其他路径时显示的信息
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1>Service Running</h1><p>Please access the correct path to retrieve your configuration.</p>"
    };
};
