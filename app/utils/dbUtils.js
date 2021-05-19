'use strict';

const CONSTANTS = require('../utils/constants');
const MODELS = require('../models');
const { GENDER } = require('../utils/constants');

let dbUtils = {};

/**
 * function to check valid reference from models.
 */
dbUtils.checkValidReference = async (document, referenceMapping) => {
	for (let key in referenceMapping) {
		let model = referenceMapping[key];
		if (!!document[key] && !(await model.findById(document[key]))) {
			throw CONSTANTS.RESPONSE.ERROR.BAD_REQUEST(key + ' is invalid.');
		}
	}
};

/**
 * initial data
 */
dbUtils.addInitialData = async () => {
	let isAdminExists = await MODELS.userModel.countDocuments();
	if (!isAdminExists) {
		return await MODELS.userModel.create({
			email: 'admin@yopmail.com',
			firstName: 'Admin',
			gender: GENDER.MALE
		})
	}
	return true;
}

module.exports = dbUtils;