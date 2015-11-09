import Dispatcher from '../dispatcher';
import Constants from '../contants';
import Users from './Users';
import Member from './Member';
import { Notifier } from '../stores';

Notifier.dispatchToken = Dispatcher.register((evt) => {
    switch(evt.action.actionType){
        case Constants.Users.FBLOGIN:
            Users.Login(evt.action.data);
            break;
        case Constants.Member.CREATED:
            Member.Create(evt.action.data);
            break;
        case Constants.Member.LIST:
            Member.List();
            break;
        default:
            console.log("Home");
    }
});

export default Notifier;
