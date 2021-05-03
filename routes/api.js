const express = require('express');
const router = express.Router();
const http = require('http');

router.post('/:slug', (req, res, next) => {
    const url = 'http://localhost:8000' + req.url;
    http.get(url, (resp) => {
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
