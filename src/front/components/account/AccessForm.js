/** Common */
import React, { Component } from 'react';
import PropTypes from "prop-types";

/** Components */
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    Button,
    CardBody,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavLink,
    Navbar,
    CardHeader,
    CardLink,
    Badge,
    Progress,
    CustomInput,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleSwitcher from "../ToggleSwitcher";
import '../../styles/AccessForm.sass';
import LoginForm from "../LoginForm";

export default class AccessForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            isEditMode: false,
            likePassword: true,
        };
    };

    changeEditMode(e) {
        e.preventDefault();
        this.setState({ isEditMode: !this.state.isEditMode});
    }
    handleSwitcher() {
        this.setState({ likePassword: !this.state.likePassword});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(LoginForm.validate(this.state)).length > 0) {
            this.setState({interacted: {firstName: true, email: true, password: true}, clearStart: false});
            return false;
        }

        const url = '/';
        fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    //TODO success
                    // window.location.replace(response.redirect);
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

    render() {
        const id = this.props.id;
        const user = this.props.user;

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
                            {
                                this.state.isEditMode
                                    ? <Row>
                                        <Col md={{ size: 6 }}>
                                            <Input className={'password-input'}
                                                   type={ this.state.likePassword ? "password" : "text" }
                                                   name="password"
                                                   placeholder="Enter password"
                                                // onChange={ ::this.handleChangeInput }
                                                // onBlur={ ::this.handleFocusOut }
                                                // invalid={ this.state.interacted.password && !!errors["password"] }
                                            />
                                        </Col>
                                        <Col md={{ size: 6 }}>
                                            <ToggleSwitcher label={ this.state.likePassword ? "Show password" : "Hide password"} onChange={::this.handleSwitcher}/>
                                        </Col>
                                    </Row>
                                    : <div className='form-text value'>••••••••</div>
                            }
                        </Col>
                    </Row>
                    {/*{ this.state.interacted.password ? LoginForm.formateFormErrorFeedback("password", errors) : "" }*/}
                </FormGroup>
                <Row>
                    <Col xs={{ size: 4 }}><div className='form-text label float-right'>Unique User ID</div></Col>
                    <Col xs={{ size: 8 }}>
                        <div className='form-text value'>{ user._id.toString() }</div>
                    </Col>
                </Row>
                <Row className='form-btn-group'>
                    <Col xs={{ size: 4, offset: 8 }}>
                        {
                            this.state.isEditMode
                                ? <div><Button color="success">Save</Button>{' '}<Button onClick={::this.changeEditMode} color="warning">Cancel</Button></div>
                                : <div><Button onClick={::this.changeEditMode} color="warning">Edit</Button></div>
                        }
                    </Col>
                </Row>
            </Form>
        );
    }
}

AccessForm.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};
