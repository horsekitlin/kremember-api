require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../scss/main.scss');
import Notifier from '../api';

export default class PageBase extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        Notifier.addListener('ReloadPage', this.reloadpage);
    }
    componentWillUnmount(){
        Notifier.removeChangeListener(this.reloadpage);
    }
    reloadpage(){
    }
}
