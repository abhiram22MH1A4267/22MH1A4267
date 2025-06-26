const express = require('express');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: { 
     type: String,
     required: true 
    },
  shortCode: {
     type: String,
      unique: true 
    },
  createdAt: {
     type: Date, 
     default: Date.now
    },
    expiresAt: {
     type: Date, 
     required: true
    },
});
module.exports = mongoose.model('Url', urlSchema);
