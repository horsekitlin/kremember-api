import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";

class ErrorClass extends Collection{

    constructor(name, schema){

        super(name, schema);
        this._schema = schema;

    }

}

let Errors = new Schema({

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

});

export default Error;
