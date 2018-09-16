var generateMessage = (from, text) => {
    return {
        from,
        text,
        joinedAt: new Date().toLocaleString()
    }
};

module.exports = {generateMessage};