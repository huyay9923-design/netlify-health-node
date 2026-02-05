/**
 * 完整修改后的代码 - 路径触发版
 * 访问域名/123 即可获取节点
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Standard-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; // 获取用户访问的路径

    // 判断路径是否以 /123 结尾
    if (path.endsWith('/123')) {
        // 构造原始 VLESS 链接
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
        
        // 使用 Buffer 转换为 Base64 编码，解决 btoa 可能报错的问题
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

    // 如果路径不是 /123，则返回普通信息或空白
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "<h1>Service Running</h1><p>Please use the correct path to get the config.</p>"
    };
};
