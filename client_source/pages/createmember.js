import PageBase from '../utils/PageBase';
import moment from 'moment';
import { Navbar, Datepicker, Input } from '../components';
import Stores from '../stores';
import Actions from '../actions';

class Login extends PageBase {
    constructor(props){
        super(props);
        var user = Stores.Users.detail();
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.getPosts = this.getPosts.bind(this);

        this.state = {
            startDate : moment(),
            endDate : moment(),
            posts : []
        };
    }
    handleStartChange(date){
        this.setState({
            startDate : date
        });
    }
    handleEndChange(date){
        this.setState({
            endDate : date
        });
    }
    getPosts(e){
        FB.login(() => {
            FB.api('/me/feed','get',
                   {
                        since : this.state.startDate.unix(),
                        until : this.state.endDate.unix(),
                        limit:100,
                        fields : 'message,created_time,full_picture,link,from,icon,name,object_id,picture,updated_time'
                   }, (resp) => {
                this.setState({
                    posts : resp.data
                });
            }.bind(this));
        }.bind(this), {scope:'user_posts'});
    }
    submit(e){
        e.preventDefault();
        let posts = _.map($('input[type="checkbox"]:checked'), (item) => {
            return JSON.parse(item.value);
        });
        let data = {
            title : $('#title').val(),
            content : $('#content').val(),
            posts : posts
        }
        Actions.Member.Create(data);
        console.log(data);
    }
    render(){
        return (
            <div className='row'>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Navbar />
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Datepicker
                        label='開始時間'
                        selected={this.state.startDate}
                        onChange={this.handleStartChange} />
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Datepicker
                        label='結束時間'
                        selected={this.state.endDate}
                        onChange={this.handleEndChange} />
                </div>
                <div className="col-xs-12 col-md-12 col-lg-12">
                    <Input
                        label=' '
                        type='button'
                        onClick={this.getPosts}
                        className='btn btn-primary btn-sm'
                        value='取得文章'/>
                </div>
                <hr />
                <form action="." onSubmit = {this.submit}>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Input
                            required={true}
                            label='標題'
                            id='title'
                            name='title'/>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <label>留言</label>
                        <textarea
                            required={true}
                            name="content"
                            id='content'
                            className='form-control'></textarea>
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        {this.state.posts.map((post, index) => {
                            return (
                                <div className="media" key={ 'post' + index } >
                                    <div className="media-left">
                                        <a href="#">
                                            <img src={post.picture} alt="Empty" />
                                        </a>
                                    </div>
                                    <div className="media-body">
                                        <Input type="checkbox" name='posts[]' value={JSON.stringify(post)}/>
                                        <h4 className="media-heading">{post.message}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Input type='submit' value='送出' className='btn btn-sm btn-primary'/>
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('container'));
