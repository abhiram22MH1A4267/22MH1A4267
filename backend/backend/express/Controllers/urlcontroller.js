const Url = require('../Models/longurlmodel');
const crypto = require('crypto');
const createShortUrl = async (req, res) => {
  try {
    const { longUrl, shortcode, validity } = req.body;
    let code = shortcode || crypto.randomBytes(4).toString('hex');
    const exists = await Url.findOne({ shortCode: code });
    if (exists) return res.status(409).json({ error: 'Shortcode already in use' });
    const expiresAt = new Date(Date.now() + (validity || 30) * 60000);
    const newUrl = new Url({ longUrl, shortCode: code, expiresAt });
    await newUrl.save();
    res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${code}` });
  } 
  catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const redirectToLongUrl = async (req, res) => {
  try { 
    const { shortCode } = req.params;
    const urlDoc = await Url.findOne({ shortCode: shortCode });
    if (!urlDoc) return res.status(404).json({ error: 'Shortcode not found' });
    if (new Date() > urlDoc.expiresAt) return res.status(410).json({ error: 'Shortcode expired' });

    res.redirect(urlDoc.longUrl);
  }
   catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createShortUrl, redirectToLongUrl };
