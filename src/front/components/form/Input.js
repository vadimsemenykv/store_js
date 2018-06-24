/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from "react-dom";

/** Components */
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UserInfoForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            clearStart: true,
            interacted: false,
            value: this.props.value
        };
    };

    handleChangeInput(e) {
        const value = e.target.value;
        this.setState({value: value, clearStart: false});
    }

    handleFocusOut() {
        this.setState({interacted: true, clearStart: false});
        this.forceUpdate();
    }

    validate() {
        // return UserInfoFormValidation.runValidation({firstName: this.state.firstName});
    }

    render() {
        const error = this.state.clearStart ? [] : this.validate();
        const 

        const renderInput = (function (name, label,  placeholder, ref, type = 'text') {
            const value = this.state.value ? this.state.value : '';
            let tpl = '';
            if (!this.state.isEditMode) {
                tpl = <Col><div className='form-text value'>{ value }</div></Col>;
            } else {
                tpl =  (
                    <Col>
                        <Input type={type} innerRef={ref}
                               name={name}
                               placeholder={placeholder}
                               onChange={ ::this.handleChangeInput }
                               onBlur={ ::this.handleFocusOut }
                               value={value}
                               invalid={ this.state.interacted[name] && !!errors[name] }
                        />
                        { this.state.interacted[name] ? UserInfoForm.formateFormErrorFeedback(name, errors) : "" }
                    </Col>
                );
            }

            return (
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>{label}</Label></Col>
                        <Col xs={{ size: 8 }}>
                            {tpl}
                        </Col>
                    </Row>
                </FormGroup>
            );
        }).bind(this);

        return (
            <Form id={id} className='user-info-form'>
                <Row className="completion-bar">
                    <Col xs={{ size: 6 }} ><div className="label text-secondary success">Your Account Registration is</div></Col>
                    <Col xs={{ size: 6 }} className={'bar-wrapper'}>
                        <CompletionBar maxValue={11} doneValue={3}/>
                    </Col>
                    <Col xs={{ size: 0 }} >{''}</Col>
                </Row>
                { renderInput('firstName', 'First Name', 'Enter First Name', this.refStore.firstName) }
                { renderInput('lastName', 'Last Name', 'Enter Last Name', this.refStore.lastName) }
                { renderInput('company', 'Company', 'Enter Company', this.refStore.combine) }
                { renderInput('dateOfBirth', 'Date of Birth', 'Enter Date of Birth', this.refStore.dateOfBirth, 'date') }
                { renderInput('addressCountry', 'Country', 'Enter Country', this.refStore.address.country) }
                { renderInput('addressStreet', 'Street', 'Enter Street', this.refStore.address.street) }
                { renderInput('addressOther', 'Other (If Applicable)', 'Enter Other (If Applicable)', this.refStore.address.other) }
                { renderInput('addressCity', 'City', 'Enter City', this.refStore.address.city) }
                { renderInput('addressState', 'Province / State', 'Enter Province / State', this.refStore.address.state) }
                { renderInput('addressZip', 'Postal Code / Zip', 'Enter Postal Code / Zip', this.refStore.address.zip) }
                { renderInput('phone', 'Phone', 'Enter Phone', this.refStore.phone) }
                { renderInput('primaryEmail', 'Primary Email', 'Enter Primary Email', this.refStore.primaryEmail) }
                { renderInput('secondaryEmail', 'Secondary Email', 'Enter Secondary Email', this.refStore.secondaryEmail) }

                <Row className='form-btn-group'>
                    <Col xs={{ size: 4, offset: 8 }}>
                        { buttonGroup }
                    </Col>
                </Row>
            </Form>
        );
    }
}

UserInfoForm.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    submitUrl: PropTypes.string.isRequired,
    changeInfo: PropTypes.func.isRequired
};

UserInfoForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
