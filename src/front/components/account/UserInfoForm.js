/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountAccessFormValidation from '../../forms/AccountAccesForm';

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
import CompletionBar from "../CompletionBar";

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/UserInfoForm.sass';
import {RingLoader} from "react-spinners";

export default class UserInfoForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            clearStart: true,
            interacted: {},
            ...this.getClearUserState()
        };
    };

    getClearUserState() {
        const user = this.props.user;
        const address = user.address ? user.address : {};

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            company: user.company,
            dateOfBirth: user.dateOfBirth,

            addressCountry: address.country,
            addressStreet: address.street,
            addressOther: address.other,
            addressCity: address.city,
            addressState: address.state,
            addressZip: address.zip,

            phone: user.phone,
            primaryEmail: user.primaryEmail,
            secondaryEmail: user.secondaryEmail
        }
    }

    changeEditMode(e) {
        e.preventDefault();
        this.setState({ isEditMode: !this.state.isEditMode, clearStart: true, interacted: {}, ...this.getClearUserState()});
    }

    handleSubmit(e) {
        e.preventDefault();

        // if (Object.getOwnPropertyNames(this.validate()).length > 0) {
        //     this.setState({interacted: {password: true}, clearStart: false});
        //     return false;
        // }

        this.props.changeInfo(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                company: this.state.company,
                dateOfBirth: this.state.dateOfBirth,

                address: {
                    country: this.state.addressCountry,
                    street: this.state.addressStreet,
                    other: this.state.addressOther,
                    city: this.state.addressCity,
                    state: this.state.addressState,
                    zip: this.state.addressZip,
                },

                phone: this.state.phone,
                primaryEmail: this.state.primaryEmail,
                secondaryEmail: this.state.secondaryEmail
            }
        );

        return false;

        const url = this.props.submitUrl;
        fetch(url, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: { name: 'access_form', data: {password: this.state.password} }
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.setState({isEditMode: false});
                } else {
                    this.setState({serverValidationError: response.validationErrors});
                }
            })
            .catch(error => console.log(error));
    }

    handleChangeInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, clearStart: false, serverValidationError: ''});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}, clearStart: false});
        this.forceUpdate();
    }

    validate() {
        return AccountAccessFormValidation.runValidation({password: this.state.password});
    }

    render() {
        const errors = this.state.clearStart ? [] : [];
        const id = this.props.id;

        let buttonGroup = '';
        if (!this.state.isEditMode) {
            buttonGroup = <div><Button onClick={::this.changeEditMode} color="warning">Edit</Button></div>;
        } else {
            buttonGroup = (
                <div>
                    <Button onClick={::this.handleSubmit} color="success">Save</Button>{' '}
                    <Button onClick={::this.changeEditMode} color="warning">Cancel</Button>
                </div>
            );
        }

        const renderInput = (function (name, label,  placeholder, type = 'text') {
            const value = this.state[name] ? this.state[name] : '';
            let tpl = '';
            if (!this.state.isEditMode) {
                tpl = <Col><div className='form-text value'>{ value }</div></Col>;
            } else {
                tpl =  (
                    <Col>
                        <Input type={type}
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
                <div className='sweet-loading'>
                    <RingLoader
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                <Row className="completion-bar">
                    <Col xs={{ size: 6 }} ><div className="label text-secondary success">Your Account Registration is</div></Col>
                    <Col xs={{ size: 6 }} className={'bar-wrapper'}>
                        <CompletionBar maxValue={11} doneValue={3}/>
                    </Col>
                    <Col xs={{ size: 0 }} >{''}</Col>
                </Row>
                { renderInput('firstName', 'First Name', 'Enter First Name') }
                { renderInput('lastName', 'Last Name', 'Enter Last Name') }
                { renderInput('company', 'Company', 'Enter Company') }
                { renderInput('dateOfBirth', 'Date of Birth', 'Enter Date of Birth', 'date') }
                { renderInput('addressCountry', 'Country', 'Enter Country') }
                { renderInput('addressStreet', 'Street', 'Enter Street') }
                { renderInput('addressOther', 'Other (If Applicable)', 'Enter Other (If Applicable)') }
                { renderInput('addressCity', 'City', 'Enter City') }
                { renderInput('addressState', 'Province / State', 'Enter Province / State') }
                { renderInput('addressZip', 'Postal Code / Zip', 'Enter Postal Code / Zip') }
                { renderInput('phone', 'Phone', 'Enter Phone') }
                { renderInput('primaryEmail', 'Primary Email', 'Enter Primary Email') }
                { renderInput('secondaryEmail', 'Secondary Email', 'Enter Secondary Email') }

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
