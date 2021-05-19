'use strict';

const { userModel  } = require(`../../models`);
const { hashPassword } = require(`../../utils/utils`);
const userService = {};

/**
 * function to find a user.
 * @param {*} criteria 
 * @param {*} projection 
 * @returns 
 */
userService.getUser = async (criteria, projection) => {
    return await userModel.findOne(criteria, projection).lean();
};

/**
 * function to soft delete a user.
 * @param {*} criteria 
 * @returns 
 */
userService.softDeleteUser = async (criteria) => {
    return await userModel.updateOne(criteria, { $set: { isDeleted: true } });
};

/**
 * function to delete a user.
 * @param {*} criteria 
 * @returns 
 */
userService.deleteUser = async (criteria) => {
    return await userModel.deleteOne(criteria);
};

/**
 * function to update a user.
 * @param {*} criteria 
 * @param {*} dataToUpdate
 * @returns 
 */
userService.deleteUser = async (criteria, dataToUpdate, projection, options) => {
    return await userModel.findOneAndUpdate(criteria, dataToUpdate, projection, options);
};

/**
 * function to register a new user.
 */
userService.registerNewUser = async (payload) => {
    if (payload.email && payload.email != "") {
        payload.email = payload.email.toString().toLowerCase();
    }
    payload.password = await hashPassword(payload.password);
    let user = await new userModel(payload).save();
    return user.toObject();
};
module.exports = userService;