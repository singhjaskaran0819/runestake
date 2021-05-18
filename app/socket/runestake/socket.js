'use strict';

const SERVICES = require(`../../services`);
const HELPERS = require("../../helpers");
const { SOCKET_EVENTS, MESSAGES, ERROR_TYPES } = require('../../utils/constants');
let _ = require(`lodash`);

let socketConnection = {};

socketConnection.connect = (io) => {
    // io.use(SERVICES.authService.socketAuthentication);
    io.on(SOCKET_EVENTS.CONNECTION, async (socket) => {
        console.log('connection established', socket.handshake.query.userName.toUpperCase(), socket.id);

        /**
         * socket disconnect event.
         */
        socket.on(SOCKET_EVENTS.DISCONNECT, async (data) => {
            console.log('Disconnected socket id is ', data.userId);
            await SERVICES.socketService.removeUserSocketId(data.userId);
        });
    });
};

module.exports = socketConnection;