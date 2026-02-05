/**
 * 完整修改后的代码 - 绝对通畅版
 */
const UUID = 'd342d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-Standard-Node';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    
    // 这里的 path 必须和 Netlify 默认的函数访问路径严格一致
    const vlessPath = '/.netlify/functions/vless';
    
    // 构造节点链接
    const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(vlessPath)}#${encodeURIComponent(NODE_NAME)}`;
    
    // 编码输出
    const base64Link = Buffer.from(vlessLink).toString('base64');
    
    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*" 
        },
        body: base64Link
    };
};
