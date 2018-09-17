var generateMessage = (from, text) => {
    return {
        from,
        text,
        joinedAt: new Date().toLocaleString()
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        joinedAt: new Date().toLocaleString()
    }
};


module.exports = {generateMessage, generateLocationMessage};