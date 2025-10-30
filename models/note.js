const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new Schema({
     ownerId: { type: ObjectId, ref: User },
     title: { type: String },
     body: { type: String },
     isPrivate: { type: Boolean, default: false },
     tags: { type: [String] },
},
     { timestamps: true },
);
module.exports = mongoose.model('Note', noteSchema);