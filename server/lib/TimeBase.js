import moment from "moment";
import _ from "lodash";

export default {
    now : () => {
        return moment().unix();
    },
    startOf : (timestamp, unit='days') => {
        return moment(timestamp * 1000).startOf(unit).unix();
    },
    endOf : (timestamp, unit='days') => {
        return moment(timestamp * 1000).endOf(unit).unix();
    },
    getTimeStamp : (str) => {
        return (_.isUndefined(str)) ? moment(str).unix() : moment().unix();
    },
    add : (number, unit) => {
        return moment().add(number, unit).unix();
    },
    format : (time, format="YYYY-MM-DD") => {
        return moment(time * 1000).format(format);
    }
};
