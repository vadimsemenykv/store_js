/** Common */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import validator from 'validator';
import RegistrationFormValidator from './../validation/registrationFormRules'

/** Components */
import { Form, FormGroup, Label, FormFeedback, Input, Button } from 'reactstrap';
import ToggleSwitcher from './ToggleSwitcher';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';

/** Actions */
// import * as FormErrorsActions from "../actions/FormErrorsActions";
// import formErrors from "../reducers/formErrors";

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clearStart: true,
            likePassword: true,
            firstName: '',
            email: '',
            password: '',
            interacted: {},
            serverValidationErrors: {}
        };
    }

    handleSwitcher() {
        this.setState({ likePassword: !this.state.likePassword});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(RegisterForm.validate(this.state)).length > 0) {
            this.setState({interacted: {firstName: true, email: true, password: true}, clearStart: false});
            return false;
        }

        fetch('/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({serverValidationErrors: response.validationErrors});
            })
            .catch(error => console.log(error));
    }

    handleChangeInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        let serverValidationErrors = this.state.serverValidationErrors;
        serverValidationErrors[name] = false;
        this.setState({[name]: value, clearStart: false, serverValidationErrors: serverValidationErrors});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}, clearStart: false});
        this.forceUpdate();
    }

    render () {
        const id = this.props.id;
        const errors = this.state.serverValidationErrors
            ? this.state.serverValidationErrors
            : this.state.clearStart ? [] : RegisterForm.validate(this.state);

        return (
            <Form id={id} >
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="Enter Name"
                        onChange={ ::this.handleChangeInput }
                        onBlur={ ::this.handleFocusOut }
                        invalid={ this.state.interacted.firstName && !!errors["firstName"] }
                    />
                    { this.state.interacted.firstName ? RegisterForm.formateFormErrorFeedback("firstName", errors) : "" }
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={ ::this.handleChangeInput }
                        onBlur={ ::this.handleFocusOut }
                        invalid={ this.state.interacted.email && !!errors["email"] }
                    />
                    { this.state.interacted.email ? RegisterForm.formateFormErrorFeedback("email", errors) : "" }
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type={ this.state.likePassword ? "password" : "text" }
                        name="password"
                        placeholder="Enter password"
                        onChange={ ::this.handleChangeInput }
                        onBlur={ ::this.handleFocusOut }
                        invalid={ this.state.interacted.password && !!errors["password"] }
                    />
                    { this.state.interacted.password ? RegisterForm.formateFormErrorFeedback("password", errors) : "" }
                </FormGroup>
                <ToggleSwitcher label={ this.state.likePassword ? "Show password" : "Hide password"} onChange={::this.handleSwitcher}/>
                <Button type="submit" onClick={::this.handleSubmit}>Register</Button>
            </Form>
        );
    }
}

RegisterForm.propTypes = {
    id: PropTypes.string.isRequired
};

RegisterForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};

RegisterForm.validate = (fields) => {
    return RegistrationFormValidator.run(fields);
};

function mapStateToProps(state) {
    return {
        // formErrors: state.formErrors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // formErrorsActions: bindActionCreators(FormErrorsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)