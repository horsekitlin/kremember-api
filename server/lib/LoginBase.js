/**
 * Login Manager
 *
 * **/
import jwt from "jwt-simple";
import Promise from 'bluebird';
import moment from "moment";
import { Users } from "../models";
import ErrorManager from "./ErrorManager";
import _ from "lodash";

class LoginBase{
    constructor(secrcykey="fjsdfhksahfkshfjdskfwidjfakldjfakjfkasjdfkjaslehodfhdasi", options = {}){
        this._secrcykey = secrcykey;
    }
    getFreshToken(data){
        const json = _.pick(data
                ,"name", "created_time", "fb_id", "_id");
        return jwt.encode(json, LoginManager._secrcykey);
    }
    decodeToken(token){
        try{
            return jwt.decode(token, LoginManager._secrcykey);
        }catch(err){
            throw ErrorManager.TokenOverTimeError("解碼失敗");
        }
    }
    checkPermision(req, res, next){
        var token = req.headers.token,
            now = moment().unix(),
            user, err;

        if(_.isEmpty(token)
                || _.isUndefined(token)){
            req.error = ErrorManager.TokenOverTimeError("Token 不可為空");
            next();
        }else{
            try{
                var query = jwt.decode(token, LoginManager._secrcykey);
            }catch(err){
                req.error = err.toString();
                next();
            }
            let userrs = Users
                .showById(query._id)
                .then((user) => {
                if(_.isNull(user)){
                    throw ErrorManager.NotFoundError("使用者不存在");
                }else{
                    req._login_required = user;
                    next();
                }
            }).catch((err) => {
                res.json(err);
            });
        }
    }
}

const LoginManager = new LoginBase();

export default LoginManager;

