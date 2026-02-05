/**
 * 完整修改后的代码 - 路径触发 + 终极修复版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-123-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 只有路径包含 123 时才吐出节点内容
    if (path.includes('123')) {
        // 这里的 vlessPath 是给代理软件连接用的后端路径，必须是这个长路径
        const vlessPath = '/.netlify/functions/vless';
        
        // 构造 VLESS 链接
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(vlessPath)}#${encodeURIComponent(NODE_NAME)}`;
        
        // 使用 Buffer 转换为 Base64 编码
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

    // 默认路径返回一个简单的提示页面
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1>服务正常</h1><p>请在链接后加上 /123 获取节点。</p>"
    };
};
