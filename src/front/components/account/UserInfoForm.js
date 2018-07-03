/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfoFormValidation from "../../forms/UserInfoForm";
import moment from "moment";

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
import '../../styles/Common.sass';
import 'react-datepicker/dist/react-datepicker.css';

export default class UserInfoForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            clearStart: true,
            interacted: {},
            data: this.getClearUserState()
        };
    };

    getClearUserState() {
        const user = this.props.user;
        const address = user.address ? user.address : {};

        return {
            firstName: user.firstName ? user.firstName : '',
            lastName: user.lastName ? user.lastName : '',
            company: user.company ? user.company : '',
            dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth).utc().format("YYYY-MM-DD") : '',

            addressCountry: address.country ? address.country : '',
            addressStreet: address.street ? address.street : '',
            addressOther: address.other ? address.other : '',
            addressCity: address.city ? address.city : '',
            addressState: address.state ? address.state : '',
            addressZip: address.zip ? address.zip : '',

            phone: user.phone ? user.phone : '',
            primaryEmail: user.primaryEmail ? user.primaryEmail : '',
            secondaryEmail: user.secondaryEmail ? user.secondaryEmail : ''
        }
    }

    changeEditMode(e) {
        e.preventDefault();
        // console.log(this.inputHandlers);
        // this.inputHandlers.forEach(function (inputH) {
        //     inputH.resetValue();
        // });
        this.setState({ isEditMode: !this.state.isEditMode, clearStart: true, interacted: {}, data: this.getClearUserState()});
        // this.setState({isEditMode: !this.state.isEditMode});
        // this.inputHandlers.forEach(function (inputH) {
        //     inputH.resetValue();
        // })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.collectData();

        if (Object.getOwnPropertyNames(this.validate()).length > 0) {
            console.log(this.validate());
            this.setState({
                interacted: {
                    firstName: true,
                    lastName: true,
                    company: true,
                    dateOfBirth: true,

                    addressCountry: true,
                    addressStreet: true,
                    addressOther: true,
                    addressCity: true,
                    addressState: true,
                    addressZip: true,

                    phone: true,
                    primaryEmail: true,
                    secondaryEmail: true
                },
                clearStart: false
            });
            return false;
        }

        fetch(this.props.submitUrl, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: { name: 'user_info_form', data: data }
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.props.changeInfo(data);
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
        this.setState({data: {...this.state.data, [name]: value}, clearStart: false, serverValidationError: ''});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}, clearStart: false});
        this.forceUpdate();
    }

    collectData() {
        return {
            firstName: this.state.data.firstName,
            lastName: this.state.data.lastName,
            company: this.state.data.company,
            dateOfBirth: this.state.data.dateOfBirth ? this.state.data.dateOfBirth + "T00:00:00.000Z" : "",

            address: {
                country: this.state.data.addressCountry,
                street: this.state.data.addressStreet,
                // other: this.state.data.addressOther,
                // city: this.state.data.addressCity,
                // state: this.state.data.addressState,
                // zip: this.state.data.addressZip,
            },

            // phone: this.state.phone,
            // primaryEmail: this.state.primaryEmail,
            // secondaryEmail: this.state.secondaryEmail
        };
    }

    validate() {
        return UserInfoFormValidation.runValidation(this.collectData());
    }

    render() {
        const errors = this.state.clearStart ? [] : this.validate();
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

        const renderInput = (function (name, label,  placeholder, type = 'text', customValue = null) {
            const value = this.state.data[name] ? this.state.data[name] : '';
            let tpl = '';
            if (!this.state.isEditMode) {
                tpl = <Col><div className='form-text value'>{ customValue ? customValue : value }</div></Col>;
            } else {
                tpl =  (
                    <Col>
                        <Input type={type}
                               name={name}
                               placeholder={placeholder}
                               onChange={ ::this.handleChangeInput }
                               onBlur={ ::this.handleFocusOut }
                               value={value}
                               invalid={ this.state.interacted[name] && !!UserInfoForm.getErrorsForScope(name, errors) }
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
                        <Row>
                            <Col>
                                <CompletionBar maxValue={11} doneValue={3}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ size: 0 }} >{''}</Col>
                </Row>
                {/*<InputH label="First Name" name="firstName" value={this.props.user.firstName}*/}
                        {/*rules={UserInfoFormValidation.rules.firstName}*/}
                        {/*isEditMode={this.state.isEditMode}*/}
                        {/*reference={this.refStore.firstName}*/}
                        {/*placeholder="Enter First Name"*/}
                        {/*ref={ref => {this.inputHandlers.push(ref)}}*/}
                {/*/>*/}
                {/*<InputH label="Last Name" name="lastName" value={this.props.user.lastName}*/}
                        {/*rules={UserInfoFormValidation.rules.lastName}*/}
                        {/*isEditMode={this.state.isEditMode}*/}
                        {/*reference={this.refStore.lastName}*/}
                        {/*placeholder="Enter Last Name"*/}
                        {/*ref={ref => {this.inputHandlers.push(ref)}}*/}
                {/*/>*/}
                { renderInput('firstName', 'First Name', 'Enter First Name') }
                { renderInput('lastName', 'Last Name', 'Enter Last Name') }
                { renderInput('company', 'Company', 'Enter Company') }

                { renderInput('dateOfBirth', 'Date of Birth', 'Enter Date of Birth', 'date', this.state.data.dateOfBirth ? moment(this.state.data.dateOfBirth).format("MMM DD YYYY") : "") }

                { renderInput('addressCountry', 'Country', 'Enter Country') }
                { renderInput('addressStreet', 'Street', 'Enter Street') }
                {/*{ renderInput('addressOther', 'Other (If Applicable)', 'Enter Other (If Applicable)') }*/}
                {/*{ renderInput('addressCity', 'City', 'Enter City') }*/}
                {/*{ renderInput('addressState', 'Province / State', 'Enter Province / State') }*/}
                {/*{ renderInput('addressZip', 'Postal Code / Zip', 'Enter Postal Code / Zip') }*/}

                {/*{ renderInput('phone', 'Phone', 'Enter Phone', this.refStore.phone) }*/}
                {/*{ renderInput('primaryEmail', 'Primary Email', 'Enter Primary Email', this.refStore.primaryEmail) }*/}
                {/*{ renderInput('secondaryEmail', 'Secondary Email', 'Enter Secondary Email', this.refStore.secondaryEmail) }*/}

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

UserInfoForm.getErrorsForScope = (field, errors = []) => {
    const fieldPath = field.split(/(?=[A-Z])/);
    if (fieldPath.length == 1) {
        if (errors && errors[field] && errors[field][0]) {
            return errors[field][0];
        }
    } else {
        const scope = fieldPath.shift();
        if (errors[scope]) {
            let newFieldName = fieldPath.join();
            newFieldName = newFieldName.charAt(0).toLowerCase() + newFieldName.substr(1, newFieldName.length);
            return UserInfoForm.getErrorsForScope(newFieldName, errors[scope])
        }
    }
};
UserInfoForm.formateFormErrorFeedback = (field, errors = []) => {
    const errorForField = UserInfoForm.getErrorsForScope(field, errors);
    if (errorForField) {
        return <FormFeedback>{ errorForField }</FormFeedback>;
    }
};
