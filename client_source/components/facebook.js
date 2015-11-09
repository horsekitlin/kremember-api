require('../scss/facebook.scss');

export default class Facebook extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.responseApi = this.responseApi.bind(this);
        this.propsTypes = {
            appId : React.PropTypes.string,
            loginHandler : React.PropTypes.func
        };
        this.defaultProps = {
            autoLoad : true
        };
    }
    render(){
        return (
            <div>
                <button
                className={this.props.class
                    ? this.props.class
                    : 'facebook-login'}
                onClick = {this.handleClick}>
                FaceBook Login
                </button>
                <div id="fb-root"></div>
            </div>
        );
    }
    responseApi(authResponse){
        FB.api('/me', function(response) {

        response.status = 'connected';
        response.accessToken = authResponse.accessToken;
        response.expiresIn = authResponse.expiresIn;
        response.signedRequest = authResponse.signedRequest;

        if (_.isFunction(this.props.loginHandler)) {
          this.props.loginHandler(response);
        }
      }.bind(this));
    }
    checkLoginState(response) {
        if (!_.isUndefined(response.authResponse)){
            this.responseApi(response.authResponse);
        } else {
            if ( this.props.loginHandler ) {
                this.props.loginHandler(
                    { status: response.status }
                );
            }
        }
    }
    handleClick(e) {
        var valueScope = this.props.scope || 'public_profile, email, user_birthday';
        FB.login(this.checkLoginState,
                 { scope: valueScope });
    }
    componentDidMount(){
    }
}
