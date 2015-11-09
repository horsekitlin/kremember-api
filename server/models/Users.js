import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";

class UsersClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
let UserSchema = new Schema({
    group : {
        type : Number,
        enum : [0, 1, 2, 3, 4],
        default : 3
    },
    name : {
        type : String,
        required : true
    },
    fb_id : {
        type : String,
        required : true
    },
    created_time : {
        type : Number,
        required : true
    }
});
let Users = new UsersClass("user", UserSchema);

export default Users;

