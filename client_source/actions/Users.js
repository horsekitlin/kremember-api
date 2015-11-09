import Dispatcher from '../dispatcher';
import Constants from '../contants';

export default {
    Login : (data) => {
        Dispatcher.handleUsersAction({
            actionType : Constants.Users.FBLOGIN,
            data : data
        });
    }
};
