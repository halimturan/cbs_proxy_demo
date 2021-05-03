const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const fetch = require("node-fetch");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'İBB Şehir Haritası', csrfToken: req.csrfToken() });
});

module.exports = router;
