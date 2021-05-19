'use strict';

const CONFIG = require('../../config');

/********************************
 **** Managing all the models ***
 ********* independently ********
 ********************************/

module.exports = {
    userModel: require('./runestake/userModel'),
    sessionModel : require('./runestake/sessionModel')
};