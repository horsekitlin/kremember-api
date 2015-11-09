import Login from './Login';
import { Router } from 'express';

var UserGroups = Router();

UserGroups.route("/login/v1/")
    .post(Login.user);

export default UserGroups;
