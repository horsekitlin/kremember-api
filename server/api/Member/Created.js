import _ from 'lodash';
import ErrorManager from '../../lib/ErrorManager';
import { Member } from '../../models';
import { now } from '../../lib/TimeBase';

export default {
    member : (req, res, next) => {
        /**
         *  @params title : 標題
         *  @params content : 內容
         *  @params posts : 文章內容
        * **/
        var data = {};

        if(_.isUndefined(req.body.title)){
            req.error = ErrorManager.GetDBSearchError("標題 不可為空");
            next();
        }else if(_.isUndefined(req.body.content)){
            req.error = ErrorManager.GetDBSearchError("內容不可為空");
            next();
        }else if(_.isUndefined(req.body.posts)
                    || req.body.posts.length === 0){
            req.error = ErrorManager.GetDBSearchError("文章不可為空");
            next();
        }else{
            const user = req._login_required;

            let query = _.pick(req.body, "title", "content", "posts");
            query.created_time = now();
            query.poster = {
                uid : user.id,
                name : user.name
            };
            Member
            .commit(query)
            .then(() => {
                req.message = '既是新增成功';
                next();
            }).catch((err) => {
                req.error = err;
                next();
            });
        }
    }
};
