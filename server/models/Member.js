import Collection from "../lib/MongoBase";
import { Schema } from "mongoose";

class MemberClass extends Collection{
    constructor(name, schema){
        super(name, schema);
    }
}
const PostSchema = new Schema({
    created_time : {
        type : Number
    },
    full_picture : {
        type : String
    },
    icon : {
        type : String
    },
    picture : {
        type : String
    },
    updated_time : {
        type : Number
    },
    message : {
        type : String
    },
    link : {
        type : String
    },
    from  : {
        id : {
            type : String
        },
        name : {
            type : String
        }
    }
});
let MemberSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    poster : {
        uid : {
            type : String
        },
        name : {
            type : String
        }
    },
    content : {
        type : String,
        required : true
    },
    posts : [PostSchema],
    created_time : {
        type : Number,
        required : true
    }
});
let Member = new MemberClass("member", MemberSchema);

export default Member;

