const express = require('express');
const router = express.Router();
const httpProxy = require('http-proxy');
const https = require('https');

const proxy = httpProxy.createProxyServer({
    target: 'https://cbsmaps.ibb.gov.tr',
    secure: false,
});
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

router.post('/:slug/:slug/:slug/:slug/:slug/:slug/:slug', (req, res, next) => {
    const url = 'https://cbsmaps.ibb.gov.tr' + req.url + "&tkoen=";
    console.log(url);
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(JSON.parse(data));
        });
    });
});

module.exports = router;
