import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { now } from '../../lib/TimeBase';
import { Users } from '../../models';
import { getFreshToken } from '../../lib/LoginBase';

export default {
    /**
     * @params account : 帳號
     * @params pwd : 密碼
     * @params name : 暱稱
    * **/
    user : (req, res, next) => {
        var data = {};

        const name = req.body.name;
        const account = req.body.account;
        const pwd = req.body.pwd;

        if(_.isUndefined(account)){
            req.error = ErrorManager.GetDBSearchError("FB_ID 不可為空");
            next();
        }else if(_.isUndefined(name)){
            req.error = ErrorManager.GetDBSearchError("暱稱不可為空");
            next();
        }else{
            var query = _.pick(req.body, 'fb_id', 'account');
            Users
            .show(query)
            .then((user) => {
                if(_.isNull(user)){
                    query.created_time = now();
                    query.name = name;
                    query.pwd = (_.isUndefined(pwd)) ? null : pwd;
                    return Users.commit(query);
                }else{
                    throw ErrorManager.GetDBSearchError('使用者已存在');
                }
            }).then(() => {
                return Users.show(query);
            }).then((user) => {
                var token = getFreshToken(user);
                req.result = {
                    token : token,
                    _id : user.id,
                };
                req.message='建立會員成功';
                next();
            }).catch((err) => {
                req.error = err;
                next();
            });
        }
    }
};
