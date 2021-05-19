'use strict';

const { Joi } = require('../../../utils/joiUtils');
const { AVAILABLE_AUTHS } = require('../../../utils/constants')
const { getServerResponse, registerNewUser, login, updateUser, getUserProfile } = require('../../../controllers/runestake/userController');

let routes = [
	{
		method: 'GET',
		path: '/v1/serverResponse/',
		joiSchemaForSwagger: {
			group: 'User',
			description: 'Route to get server response (Is server working fine or not?).',
			model: 'SERVER'
		},
		handler: getServerResponse
	},
	{
		method: 'POST',
		path: '/v1/user/register',
		joiSchemaForSwagger: {
            body: {
                email: Joi.string().email().required().description('User\'s email.'),
                password: Joi.string().required().description('User\'s password.')
			},
			group: 'User',
			description: 'Route to register a new user.',
			model: 'Register'
		},
		auth: false,
		handler: registerNewUser
	},
	{
		method: 'POST',
		path: '/v1/user/login',
		joiSchemaForSwagger: {
            body: {
                email: Joi.string().email().required().description('User\'s email.'),
                password: Joi.string().required().description('User\'s password.')
			},
			group: 'User',
			description: 'Route to login a user.',
			model: 'Login'
		},
		auth: false,
		handler: login
	},
	{
		method: 'PUT',
		path: '/v1/user/update-user',
		joiSchemaForSwagger: {
			headers: {
				authorization: Joi.string().required()
			},
			body: {
				//data to update
			},
			group: 'User',
			description: 'Route to update a user.',
			model: 'UpdateUser'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: updateUser
	},
	{
		method: 'GET',
		path: '/v1/user/get-user',
		joiSchemaForSwagger: {
			headers: {
				authorization: Joi.string().required()
			},
			group: 'User',
			description: 'Route to get a user.',
			model: 'GetUser'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getUserProfile
	}
];
module.exports = routes;