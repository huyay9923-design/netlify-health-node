const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Japan-Standard';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    
    // 生成标准的 VLESS 订阅链接
    const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
    
    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*" 
        },
        // 使用 Base64 编码输出，方便小火箭识别
        body: btoa(vlessLink)
    };
};
