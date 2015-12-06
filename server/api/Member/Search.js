import ErrorManager from '../../lib/ErrorManager';
import { Member } from '../../models';

export default {
    member : (req, res, next) => {
        /**
        * **/
        const user = req._login_required;
        Member
        .listAll({"poster.uid" : user.id})
        .then((posts) => {
            req.result = posts;
            req.message = '搜尋成功';
            next();
        }).catch((err) => {
            req.error = err;
            next();
        });
    }
};
