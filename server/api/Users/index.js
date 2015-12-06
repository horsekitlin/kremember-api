import Login from './Login';
import Create from './Create';
import { Router } from 'express';

var UserGroups = Router();

UserGroups.route("/login/v1/")
    .post(Login.user);

UserGroups.route('/created/v1/')
    .post(Create.user);

export default UserGroups;
