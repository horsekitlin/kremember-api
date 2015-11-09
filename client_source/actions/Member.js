import Dispatcher from '../dispatcher';
import Constants from '../contants';

export default {
    Create : (data) => {
        Dispatcher.handleMemberAction({
            actionType : Constants.Member.CREATED,
            data : data
        });
    },
    List : () => {
        console.log(123);
        Dispatcher.handleMemberAction({
            actionType : Constants.Member.LIST,
        });
    }
};
