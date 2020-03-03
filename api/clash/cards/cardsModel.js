'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  name: {
    type: String,
    required: 'Every card should have a name'
  },
  gameId: {
    type: Number,
    required: 'Every card should have ingame id'
  },
  maxLevel: {
    type: Number,
    enum: [8, 11, 13]
  },
  status: {
    type: String,
    enum: ["basic", "enriched"],
    default: "basic"
  }
});

module.exports = mongoose.model('ClashCards', CardSchema);
