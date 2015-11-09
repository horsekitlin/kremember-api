import Created from './Created';
import Search from './Search';
import { Router } from 'express';
import { checkPermision } from '../../lib/LoginBase';

var MemberGroups = Router();

MemberGroups.route("/created/v1/")
    .post(checkPermision, Created.member);

MemberGroups.route('/list/v1/')
    .post(checkPermision, Search.member);

export default MemberGroups;
