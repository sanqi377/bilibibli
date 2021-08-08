"use strict";
module.exports = {
    time: (date) => {
        let time = new Date(date);
        return time.getTime() / 1000;
    }
};
