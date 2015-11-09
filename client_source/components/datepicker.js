require('../../node_modules/react-datepicker/dist/react-datepicker.min.css');
import Datepicker from 'react-datepicker';

export default class DatepickerComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return  (
            <div>
                <label>{this.props.label}</label>
                <Datepicker
                        {...this.props}/>
            </div>
        );
    }
}
