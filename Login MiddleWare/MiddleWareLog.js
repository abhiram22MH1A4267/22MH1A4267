

const express = require('express');
const axios = require('axios');


const Log = async (stack, level, pkg, message) => {
  const TOKEN = process.env.LOG_TOKEN;
  if (!TOKEN) {
    console.warn('[Log] LOG_TOKEN missing – skipping external log');
    return;
  }
  axios.post('http://20.244.56.144/evaluation-service/logs',
    { stack, level, package: pkg, message },
    { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, timeout: 3_000 }
  ).catch(err => console.warn('[Log] Failed:', err.response?.data || err.message));
}


const logMiddleware = async (req, _res, next) => {
    const { stack, level, pkg, message } = req.body || {};
  Log(`${stack}, ${level}, ${pkg}, ${message}, ${req.method} ${req.originalUrl}`);
  next();
}


module.exports = { logMiddleware, Log };