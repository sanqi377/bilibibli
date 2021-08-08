"use strict";
module.exports = {
    time: (date) => {
        let time = new Date(date);
        return time.getTime() / 1000;
    },
    toDay: () => {
        let time = new Date();
        let y, m, d;
        y = time.getFullYear();
        m = time.getMonth() + 1;
        d = time.getDate();
        if (m < 10)
            m = "0" + m;
        if (d < 10)
            d = "0" + d;
        return `${y}-${m}-${d}`;
    }
};
