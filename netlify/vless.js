/**
 * 完整修改后的代码 - 默认区域版
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Default-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    
    // 生成 VLESS 订阅链接
    const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
    
    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*" 
        },
        // 输出 Base64 编码，方便导入
        body: btoa(vlessLink)
    };
};
