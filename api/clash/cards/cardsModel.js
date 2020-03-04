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
    required: 'Every card should have gameId'
  },
  maxLevel: {
    type: Number
  },
  iconUrls: {
    type: Object
  },
  status: {
    type: String,
    enum: ["basic", "enriched"],
    default: "basic"
  }
});

mongoose.model('ClashCards', CardSchema);
