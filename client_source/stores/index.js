import Users from './Users';
import Member from './Member';

//取得廣播功能
var EventEmitter = require('events').EventEmitter;

var Notifier = new EventEmitter();

$.extend(Notifier, {
    //do something
    reloadpage : function(){
        this.emit('ReloadPage');
    },

    loadingpage : function(){
        this.emit('LoadingPage');
    }
});

export default {
    Notifier : Notifier,
    Users : Users,
    Member : Member
};
