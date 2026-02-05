/**
 * 完整修改后的代码 - IPv4 兼容优化版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    if (path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}&sni=${host}#Netlify-IPv4-Fixed`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: "Service Ready"
    };
};
