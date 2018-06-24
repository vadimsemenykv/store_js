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
import ToggleSwitcher from "../ToggleSwitcher";

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AccessForm.sass';

export default class AccessForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            isEditMode: false,
            likePassword: true,
            clearStart: true,
            interacted: {}
        };
    };

    changeEditMode(e) {
        e.preventDefault();
        this.setState({ isEditMode: !this.state.isEditMode, password: '', likePassword: true, clearStart: true, interacted: {}});
    }
    handleSwitcher() {
        this.setState({ likePassword: !this.state.likePassword });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(this.validate()).length > 0) {
            this.setState({interacted: {password: true}, clearStart: false});
            return false;
        }

        const url = this.props.submitUrl;
        fetch(url, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: { name: 'user_access_form', data: {password: this.state.password} }
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
        const errors = this.state.clearStart ? [] : this.validate();
        const id = this.props.id;
        const user = this.props.user;

        let passwordInput, buttonGroup = '';
        if (!this.state.isEditMode) {
            passwordInput = <div className='form-text value'>••••••••</div>;
            buttonGroup = <div><Button onClick={::this.changeEditMode} color="warning">Edit</Button></div>;
        } else {
            buttonGroup = (
                <div>
                    <Button onClick={::this.handleSubmit} color="success">Save</Button>{' '}
                    <Button onClick={::this.changeEditMode} color="warning">Cancel</Button>
                </div>
            );
            passwordInput = (
                <Row>
                    <Col>
                        <Row className={'password-input'}>
                            <Col>
                                <Input type={ this.state.likePassword ? "password" : "text" }
                                       name="password"
                                       placeholder="Enter password"
                                       onChange={ ::this.handleChangeInput }
                                       onBlur={ ::this.handleFocusOut }
                                       invalid={ this.state.interacted.password && !!errors["password"] }
                                />
                                { this.state.interacted.password ? AccessForm.formateFormErrorFeedback("password", errors) : "" }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ToggleSwitcher label={ this.state.likePassword ? "Show password" : "Hide password"} onChange={::this.handleSwitcher}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }

        return (
            <Form id={id} className='private-access-form'>
                <Row>
                    <Col xs={{ size: 4 }}><div className='form-text label float-right'>Email</div></Col>
                    <Col xs={{ size: 8 }}>
                        <div className='form-text value'>{ user.email }</div>
                    </Col>
                </Row>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Password</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <Row>
                    <Col xs={{ size: 4 }}><div className='form-text label float-right'>Unique User ID</div></Col>
                    <Col xs={{ size: 8 }}>
                        <div className='form-text value'>{ user._id.toString() }</div>
                    </Col>
                </Row>
                <Row className='form-btn-group'>
                    <Col xs={{ size: 4, offset: 8 }}>
                        { buttonGroup }
                    </Col>
                </Row>
            </Form>
        );
    }
}

AccessForm.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    submitUrl: PropTypes.string.isRequired
};

AccessForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
