import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { Users } from '../../models';
import { now } from '../../lib/TimeBase';
import { getFreshToken } from '../../lib/LoginBase';

export default {
    user : (req, res, next) => {
        /**
         *  @params fb_id : Facebook ID
         *  @params account : 帳號
         *  @params pwd : 密碼
        * **/
        var data = {};
        const query = _.pick(req.body, 'account', 'pwd', 'fb_id');

        console.log(req.body);
        if(_.isEmpty(query)){
            req.error = ErrorManager.GetEmptyReqError('輸入值不可為空');
            next();
        }else{
            Users
            .show(query)
            .then((user) => {
                if(_.isNull(user)){
                    throw ErrorManager.NotFoundError('使用者不存在');
                }else{
                    const token = getFreshToken(user);
                    req.result = {
                        token : token
                    };
                    req.message='登入成功';
                    next();
                }
            }).catch((err) => {
                req.error = err;
                next();
            });
        }
    }
};
