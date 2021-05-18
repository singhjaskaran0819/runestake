
const CONFIG = require('../../config');
/********************************
 **** Managing all the services ***
 ********* independently ********
 ********************************/
module.exports = {
    swaggerService: require(`./runestake/swaggerService`),
    authService: require(`./runestake/authService`),
    sessionService: require(`./runestake/sessionService`),
    socketService: require(`./runestake/socketService`),
    fileUploadService: require(`./runestake/fileUploadService`)
};