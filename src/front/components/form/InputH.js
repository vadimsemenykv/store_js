/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultForm from "../../forms/DefaultForm";

/** Components */
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InputH extends Component{
    constructor(props) {
        super(props);

        this.state = {
            interacted: this.props.interacted,
            value: this.props.value
        };
    };

    handleChangeInput(e) {
        const value = e.target.value;
        this.setState({value: value});
    }

    handleFocusOut() {
        this.setState({interacted: true});
        this.forceUpdate();
    }

    validate() {
        return DefaultForm.validate({name: this.state.value}, {name: this.props.rules})
    }

    resetValue() {
        console.log(this.props.value);
        this.setState({value: this.props.value});
    }

    render() {
        const errors = this.state.interacted ? this.validate() : [];
        const value = this.state.value;
        const type = this.props.type ? this.props.type : 'text';

        let tpl = '';
        if (!this.props.isEditMode) {
            tpl = <Col><div className='form-text value'>{ value }</div></Col>;
        } else {
            tpl =  (
                <Col>
                    <Input type={type} innerRef={this.props.reference}
                           name={this.props.name}
                           placeholder={this.props.placeholder}
                           onChange={ ::this.handleChangeInput }
                           onBlur={ ::this.handleFocusOut }
                           value={this.state.value}
                           invalid={ this.state.interacted && !!errors.name }
                    />
                    { this.state.interacted ? InputH.formateErrorFeedback('name', errors) : "" }
                </Col>
            );
        }

        return (
            <FormGroup>
                <Row>
                    <Col xs={{ size: 4 }}><Label className='form-text label float-right'>{this.props.label}</Label></Col>
                    <Col xs={{ size: 8 }}>
                        {tpl}
                    </Col>
                </Row>
            </FormGroup>
        );
    }
}

InputH.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    rules: PropTypes.array.isRequired,
    interacted: PropTypes.bool,
    isEditMode: PropTypes.bool.isRequired,
    reference: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired
};

InputH.formateErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
