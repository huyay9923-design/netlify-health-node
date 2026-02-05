/**
 * 完整修改后的代码 - 纯脚本万能提取版
 * 无需 netlify.toml 配置文件
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Standard-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    // 只要路径里包含 123 这个数字，就下发节点信息
    if (path.includes('123')) {
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
        
        // 使用 Buffer 转换为 Base64 确保提取成功
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

    // 否则返回普通提示
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1>服务已运行</h1><p>请在链接末尾加上 /123 来获取节点配置。</p>"
    };
};
