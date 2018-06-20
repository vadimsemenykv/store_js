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
import CompletionBar from "../CompletionBar";

export default class UserInfoForm extends Component{
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
                    <Col md={{ size: 6 }}>
                        <Input className={'password-input'}
                               type={ this.state.likePassword ? "password" : "text" }
                               name="password"
                               placeholder="Enter password"
                               onChange={ ::this.handleChangeInput }
                               onBlur={ ::this.handleFocusOut }
                               invalid={ this.state.interacted.password && !!errors["password"] }
                        />
                        { this.state.interacted.password ? AccessForm.formateFormErrorFeedback("password", errors) : "" }
                    </Col>
                    <Col md={{ size: 6 }}>
                        <ToggleSwitcher label={ this.state.likePassword ? "Show password" : "Hide password"} onChange={::this.handleSwitcher}/>
                    </Col>
                </Row>
            );
        }

        return (
            <Form id={id} className='user-info-form'>
                <Row className="completion-bar">
                    <Col xs={{ size: 6 }} ><div className="label text-secondary success">Your Account Registration is</div></Col>
                    <Col xs={{ size: 6 }} className={'bar-wrapper'}>
                        <CompletionBar maxValue={11} doneValue={3}/>
                    </Col>
                    <Col xs={{ size: 0 }} >{''}</Col>
                </Row>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>First Name</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Last Name</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Company</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Date of Birth</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Country</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Street</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Other (If Applicable)</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>City</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Province / State</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Postal Code / Zip</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Phone</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Primary Email</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Secondary Email</Label></Col>
                        <Col xs={{ size: 8 }}>
                            { passwordInput }
                        </Col>
                    </Row>
                </FormGroup>
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
    submitUrl: PropTypes.string.isRequired
};

UserInfoForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
