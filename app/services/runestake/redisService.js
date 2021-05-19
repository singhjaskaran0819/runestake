'use strict';

const CONFIG = require('../../config');
const REDIS = require('redis').createClient({
	port: CONFIG.REDIS.PORT,
	host: CONFIG.REDIS.HOST
});
let redisService = {};

/**
 * function to save data on redis 
 */
redisService.saveDataInRedis = (key, data) => {
	REDIS.set(key.toString(), JSON.stringify(data));
	return;
};

/**
* function to get data from redis 
*/
redisService.getDataFromRedis = async (key) => {
	key = key.toString();
	let value = await new Promise((resolve, reject) => {
		REDIS.get(key, function (err, value) {
			return resolve(JSON.parse(value))
		});
	});
	console.log("asdf", value)
	return value;
};

/**
* function to delete a key data from redis
*/
redisService.deleteDataFromRedis = (key) => {
	REDIS.del(key, function (err, response) {
		return response;
	});
}

module.exports = redisService;