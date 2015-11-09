export default class InputComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="form-group">
                <label >{this.props.label}</label>
                <input className='form-control' {...this.props}/>
            </div>
        );
    }
}
