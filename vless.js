/**
 * Netlify Standard Function - VLESS 日本节点订阅生成器
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; // 你的连接密码
const NODE_NAME = 'Netlify-Japan-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    
    // 生成 VLESS 链接
    // 路径指向 Netlify 标准函数的默认路径：/.netlify/functions/vless
    const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=%2F.netlify%2Ffunctions%2Fvless#${encodeURIComponent(NODE_NAME)}`;
    
    // 返回 Base64 编码，方便小火箭等软件直接订阅
    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*" 
        },
        body: btoa(vlessLink)
    };
};