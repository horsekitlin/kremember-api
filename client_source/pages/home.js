import PageBase from '../utils/PageBase';
import { Navbar, Post } from '../components';
import Stores from '../stores';
import Actions from '../actions';

class Login extends PageBase {
    constructor(props){
        super(props);
        const user = Stores.Users.detail();
        const posts = Stores.Member.listAll();
        Actions.Member.List();
        this.state = {
            self : user,
            posts : posts,
        };
    }
    componentDidMount(){
        var self = this.state.self;
        if(_.isUndefined(self)
            || _.isUndefined(self.token)){
            location.href = '/public/login.html';
        }
    }
    render(){
        return (
            <div className='row'>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Navbar />
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    {this.state.posts.map((post, index) => {
                        return (<div key={'post' + index}>
                            <Post post = {post}/>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('container'));
