/** Common */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import validator from 'validator';

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
            interacted: {}
        };
    }

    handleSwitcher() {
        this.setState({ likePassword: !this.state.likePassword});
    }

    rules() {
        return {
            firstName: [
                {
                    rule: value => validator.isByteLength(value, { min: 1 }),
                    message: "Name is required"
                },
                {
                    rule: value => validator.isByteLength(value, { min: 4 }),
                    message: "Name must be at least 4 characters"
                }
            ],
            email: [
                {
                    rule: value => validator.isByteLength(value, { min: 1 }),
                    message: "Email is required"
                },
                {
                    rule: value => validator.isEmail(value),
                    message: "Email is not valid"
                }
            ],
            password: [
                {
                    rule: value => validator.isByteLength(value, { min: 1 }),
                    message: "Password is required"
                },
                {
                    rule: value => validator.isByteLength(value, { min: 4 }),
                    message: "Password must be at least 4 characters"
                }
            ]
        };
    };

    validate() {
        let errors = {};
        const rules = this.rules();
        for (const field in rules) {
            for (let i = 0; i < rules[field].length; i++) {
                if (!rules[field][i].rule(this.state[field])) {
                    if (!errors[field]) {
                        errors[field] = [];
                    }
                    errors[field].push(rules[field][i].message)
                }
            }
        }

        return errors;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(this.validate()).length > 0) {
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
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })
        })
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    handleChangeInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value, clearStart: false});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}, clearStart: false});
        this.forceUpdate();
    }

    render () {
        const id = this.props.id;
        const errors = this.state.clearStart ? [] : this.validate();

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
                <Button type="submit" onClick={::this.handleSubmit}>Login</Button>
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
        // return errors[field].map(function (item, index) {
        //     return <FormFeedback key={index} >{ item }</FormFeedback>
        // });
    }
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