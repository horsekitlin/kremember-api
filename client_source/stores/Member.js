import Base from '../utils/StoreBase';

class MemberStore extends Base {
    constructor(name){
        super(name);
    }
}

var Member = new MemberStore('members');

export default Member;
