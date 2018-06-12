/** Common */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import LoginFormValidator from './../validation/registrationFormRules'

/** Components */
import {Form, FormGroup, Label, Input, Button, FormFeedback, Alert} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clearStart: true,
            email: '',
            password: '',
            interacted: {},
            serverValidationError: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(LoginForm.validate(this.state)).length > 0) {
            this.setState({interacted: {firstName: true, email: true, password: true}, clearStart: false});
            return false;
        }

        const loginUrl = this.props.loginUrl;
        fetch(loginUrl, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    window.location.replace(response.redirect);
                }

                this.setState({serverValidationError: response.validationErrors});
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

    render () {
        const id = this.props.id;
        const serverErrors = this.state.serverValidationError
            ? <div className='alert-holder' ><Alert key={0} color="danger">{ this.state.serverValidationError }</Alert></div>
            : '';
        const errors = this.state.clearStart ? [] : LoginForm.validate(this.state);

        return (

            <Form id={id} >
                { serverErrors }
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
                    { this.state.interacted.email ? LoginForm.formateFormErrorFeedback("email", errors) : "" }
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={ ::this.handleChangeInput }
                        onBlur={ ::this.handleFocusOut }
                        invalid={ this.state.interacted.password && !!errors["password"] }
                    />
                    { this.state.interacted.password ? LoginForm.formateFormErrorFeedback("password", errors) : "" }
                </FormGroup>
                <Button type="submit" onClick={::this.handleSubmit} disabled={!!this.state.serverValidationError} >Login</Button>
            </Form>
        );
    }
};

LoginForm.propTypes = {
    id: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired
};
LoginForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
LoginForm.validate = (fields) => {
    return LoginFormValidator.run(fields);
};