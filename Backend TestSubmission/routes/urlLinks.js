const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToLongUrl } = require('../Controllers/urlcontroller');
router.post('/shorten', createShortUrl);
router.get('/shortcode', redirectToLongUrl);
module.exports = router;
