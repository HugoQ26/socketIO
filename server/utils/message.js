var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        joinedAt: moment().valueOf()
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        joinedAt: moment().valueOf()
        // joinedAt: new Date().toLocaleString()
    }
};


module.exports = {generateMessage, generateLocationMessage};