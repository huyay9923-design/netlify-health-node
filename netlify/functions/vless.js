/**
 * 终极强连版 - 节省额度优化版
 */
const UUID = 'ad42d11e-d424-4583-b36e-524ab1f0afa4'; 
const NODE_NAME = 'Netlify-One-Shot';

exports.handler = async function(event, context) {
    const host = event.headers.host;
    const path = event.path; 

    if (path.includes('123')) {
        const realPath = '/.netlify/functions/vless';
        const vlessLink = `vless://${UUID}@${host}:443?encryption=none&security=tls&type=ws&host=${host}&path=${encodeURIComponent(realPath)}#${encodeURIComponent(NODE_NAME)}`;
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" },
            body: Buffer.from(vlessLink).toString('base64')
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: "Ready"
    };
};
