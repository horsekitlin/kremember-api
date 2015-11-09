import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";

class LogsClass extends Collection{

    constructor(name, schema){

        super(name, schema);

    }

}

let Logs = new LogClass("log", new Schema({

    status : {
        type : Number,
        required : true
    },

    message : {
        type : String,
        required : true
    },

    errors : [],

    error : {},

    method : {
        type : String,
        default : "POST"
    },

    route : {
        type : String
    }

}));

export default Error;
