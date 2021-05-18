"use strict";

const _ = require('lodash');
const HELPERS = require("../../helpers");
const { MESSAGES, ERROR_TYPES, NORMAL_PROJECTION, EMAIL_TYPES } = require('../../utils/constants');
const SERVICES = require('../../services');
const fs = require('fs');
const {
	compareHash,
	hashPassword,
	encryptJwt,
	createResetPasswordLink,
	createAccountRestoreLink,
	sendEmail,
	renderTemplate
} = require(`../../utils/utils`);

/***************************
 ***** User controller *****
 ***************************/
let userController = {};

/* export userController */
module.exports = userController;