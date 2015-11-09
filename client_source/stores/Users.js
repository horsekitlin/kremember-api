import Base from '../utils/StoreBase';

class UsersStore extends Base {
    constructor(name){
        super(name);
    }
    login(resp){
        this.update('item', {
            id : resp.id,
            accessToken : resp.accessToken,
            name : resp.name
        });
    }
}

var Users = new UsersStore('users');

export default Users;
