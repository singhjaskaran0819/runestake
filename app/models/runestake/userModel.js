"use strict";
/************* Modules ***********/
const MONGOOSE = require('mongoose');
const { GENDER } = require('../../utils/constants');
const Schema = MONGOOSE.Schema;

/**************************************************
 ************* User Model or collection ***********
 **************************************************/
const userSchema = new Schema({
	email: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: Number, enum: [GENDER.OTHER, GENDER.MALE, GENDER.FEMALE] }
});

userSchema.set('timestamps', true);

module.exports = MONGOOSE.model('users', userSchema);
