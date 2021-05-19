"use strict";

const HELPERS = require("../../helpers");
const SERVICES = require('../../services');
const { compareHash, encryptJwt, convertIdToMongooseId } = require(`../../utils/utils`);
const { MESSAGES, ERROR_TYPES, NORMAL_PROJECTION } = require('../../utils/constants');
const _ = require('lodash');

/***************************
 ***** User controller *****
 ***************************/

let userController = {};

async function getJwtForUser(userId) {
	const dataForJwt = { id: userId, date: Date.now() };
	const token = encryptJwt(dataForJwt);
	return token;
};

/**
 * function to get server response.
 */
userController.getServerResponse = async () => {
	return HELPERS.responseHelper.createSuccessResponse(MESSAGES.SERVER_IS_WORKING_FINE);
};

/**
 * function to register new user.
 */
userController.registerNewUser = async (payload) => {
	let user = await SERVICES.userService.getUser({ email: payload.email, isDeleted: false }, NORMAL_PROJECTION);
	if (user) {
		return HELPERS.responseHelper.createErrorResponse(MESSAGES.USER_ALREADY_EXIST, ERROR_TYPES.BAD_REQUEST);
	} else {
		let newUser = await SERVICES.userService.registerNewUser(payload);
		// generate jwt for authentications.
		const token = await getJwtForUser(newUser._id)
		// session for new user
		await SERVICES.sessionService.createSession({
			accessToken: token,
			userId: newUser._id,
		});
		delete newUser.createdAt;
		delete newUser.updatedAt;
		delete newUser.__v;
		delete newUser.password;
		return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.USER_REGISTERED_SUCCESSFULLY), { user: newUser, token });
	}
};

/**
 * function to login a user.
 */
userController.login = async (payload) => {
	// check is user exists in the database with provided email or not.
	let user = await SERVICES.userService.getUser({ email: payload.email }, NORMAL_PROJECTION);
	// if user exists then compare the password that user entered.
	if (user) {
	// compare user's password.
		if (compareHash(payload.password, user.password)) {
			//create jwt token for user.
			const token = await getJwtForUser(user._id);
			//! delete old user session (single session login)
			await SERVICES.sessionService.removeSession({userId: convertIdToMongooseId(user._id)});
			// createn session for new user
			await SERVICES.sessionService.createSession({ accessToken: token, userId: user._id, });
			return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.LOGGED_IN_SUCCESSFULLY), { token});
		}
		throw HELPERS.responseHelper.createErrorResponse(MESSAGES.INVALID_PASSWORD, ERROR_TYPES.BAD_REQUEST);
	}
	throw HELPERS.responseHelper.createErrorResponse(MESSAGES.INVALID_EMAIL, ERROR_TYPES.BAD_REQUEST);
};

/**
 * function to update a user.
 */
userController.updateUser = async (payload) => {
	let data = {};
	return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.USER_UPDATED_SUCCESSFULLY), { data });
};

/**
 * function to get a user.
 */
userController.getUserProfile = async (payload) => {
	let data = {};
	return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.USER_PROFILE_FETCHED_SUCCESSFULLY), { data });
}

/* export userController */
module.exports = userController;