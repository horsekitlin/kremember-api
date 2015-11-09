import constants from '../contants';
import Flux from 'flux';

var Dispatcher = Flux.Dispatcher;
var AppDispatcher = new Dispatcher();
$.extend( AppDispatcher, {
    handleMemberAction: function(action) {
        var payload = {
            source: 'Member',
            action: action
        };
        this.dispatch(payload);
    },
    handleUsersAction: function(action) {
        var payload = {
            source: 'Users',
            action: action
        };
        this.dispatch(payload);
    },
    handleViewsAction: function(action) {
        var payload = {
            source: 'Views',
            action: action
        };
        this.dispatch(payload);
    }
});

export default AppDispatcher;

