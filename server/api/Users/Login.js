import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { Users } from '../../models';
import { now } from '../../lib/TimeBase';
import { getFreshToken } from '../../lib/LoginBase';

export default {
    user : (req, res, next) => {
        /**
         *  @params fb_id : Facebook ID
         *  @params name : Facebook nick name
        * **/
        var data = {};

        if(_.isUndefined(req.body.fb_id)){
            req.error = ErrorManager.GetDBSearchError("FB_ID 不可為空");
            next();
        }else if(_.isUndefined(req.body.name)){
            req.error = ErrorManager.GetDBSearchError("暱稱不可為空");
            next();
        }else{
            Users
            .show({fb_id : req.body.fb_id})
            .then((user) => {
                if(_.isNull(user)){
                    return Users.commit({
                        fb_id : req.body.fb_id,
                        name : req.body.name,
                        created_time : now()
                    });
                }else{
                    return Users.pass();
                }
            }).then(() => {
                return Users
                .show({fb_id : req.body.fb_id});
            }).then((user) => {
                var token = getFreshToken(user);
                req.result = {
                    token : token
                };
                req.message='登入成功';
                next();
            }).catch((err) => {
                req.error = err;
                next();
            });
        }
    }
};
