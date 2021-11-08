import React, {Component} from 'react';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChenge = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className={'d-flex mt-3'}
                    onSubmit={this.onSubmit}>
                <input type="text" className='form-control'
                        placeholder='What needs to be done'
                        onChange={this.onLabelChenge} 
                        value={this.state.label} />
                <button className={'btn btn-warning ms-1'}
                        >AddToDo</button>
            </form>
        );
    } 
}; 