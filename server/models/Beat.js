const mongoose = require('mongoose');

const BeatSchema = new mongoose.Schema(
   {
      title: {type: String, required: true},
      tags: {type: Array, required: true},
      img: {type: String, required: true},
      bpm: {type: String, required: true},
      key: {type: String, required: true},
      primary_mood: {type: String, required: true},
      secondary_mood: {type: String, required: true},
      mp3_tagged: {type: String, required: true},
      waw_untagged: {type: String, required: true},
      stems: {type: String},
      basic_licence: {type: Number, required: true},
      premium_licence: {type: Number},
      stem_licence: {type: Number},
   },
   {timestamps: true}
);

module.exports = mongoose.model('Beat', BeatSchema);