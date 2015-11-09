import moment from 'moment';

export default class Post extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='col-xs-12 col-md-6 col-md-4'>
                <a className='thumbnail'
                    href="#">
                    <div>
                        <img src='http://ppt.cc/6s8CS@.jpg'/>
                        <span className="help-block">
                            {moment(this.props.post.created_time * 1000).format('YYYY-MM-DD A hh:mm:ss')}
                        </span>
                    </div>
                    <hr />
                        <p>
                            {this.props.post.title}
                        </p>
                </a>
                <div className="col-xs-2 col-md-2 col-lg-2">
                    <a className='thumbnail' href="#"> 分享 </a>
                </div>
                <div className="col-xs-2 col-md-2 col-lg-2">
                    <a className='thumbnail' href="#"> 留言 </a>
                </div>
            </div>
        );
    }
}
