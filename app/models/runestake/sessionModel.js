"use strict";
/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

/**************************************************
 ************* Session Model or collection ***********
 **************************************************/

const sessionSchema = new Schema({
    userId: { type: MONGOOSE.Schema.Types.ObjectId },
    accessToken: { type: String },
    deviceToken: { type: String }
});

sessionSchema.set('timestamps', true);

module.exports = MONGOOSE.model('sessions', sessionSchema);



