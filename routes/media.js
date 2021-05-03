const express = require('express');
const router = express.Router();
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8000',
});

router.get('/', (req, res, next) => {
    proxy.web(req, res, {
        target: 'http://localhost:8000', toProxy: false
    });
});

router.get('/:slug', (req, res, next) => {
    proxy.web(req, res, {
        target: 'http://localhost:8000', toProxy: false
    });
});

router.get('/:slug/:slug', (req, res, next) => {
    proxy.web(req, res, {
        target: 'http://localhost:8000', toProxy: false
    });
});

router.get('/:slug/:slug/:slug', (req, res, next) => {
    proxy.web(req, res, {
        target: 'http://localhost:8000', toProxy: false
    });
});

module.exports = router;
