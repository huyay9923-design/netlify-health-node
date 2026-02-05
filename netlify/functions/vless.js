/**
 * 完整修改后的代码 - 路径触发 + 修复连接版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Final-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 判断访问路径是否包含 123
    if (path.includes('123')) {
        // 关键：软件连接时必须使用的标准后端路径
        const vlessPath = '/.netlify/functions/vless';
        
        // 构造 VLESS 链接
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(vlessPath)}#${encodeURIComponent(NODE_NAME)}`;
        
        // 转换为 Base64 输出
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
        body: "<h1>Service Running</h1><p>Append /123 to URL to get node.</p>"
    };
};
