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
    FormFeedback, CustomInput
} from 'reactstrap';
import ToggleSwitcher from "../ToggleSwitcher";

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/CreateOrderForm.sass';
import '../../styles/Common.sass';

export default class CreateOrderForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            clearStart: true,
            interacted: {},
            confirms: {}
        };
    };

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

    handleChangeCheck(e) {
        const currentValue = !!this.state.confirms[e.target.name] ;
        this.setState({confirms: {...this.state.confirms, [e.target.name]: !currentValue}});
    }

    validate() {
        return AccountAccessFormValidation.runValidation({password: this.state.password});
    }

    render() {
        // const errors = this.state.clearStart ? [] : this.validate();
        const id = this.props.id;
        const checksPassed = Object.getOwnPropertyNames(this.state.confirms).length === 4;
        // const user = this.props.user;

        // let passwordInput, buttonGroup = '';
        // if (!this.state.isEditMode) {
        //     passwordInput = <div className='form-text value'>••••••••</div>;
        //     buttonGroup = <div><Button onClick={::this.changeEditMode} color="warning">Edit</Button></div>;
        // } else {
        //     buttonGroup = (
        //         <div>
        //             <Button onClick={::this.handleSubmit} color="success">Save</Button>{' '}
        //             <Button onClick={::this.changeEditMode} color="warning">Cancel</Button>
        //         </div>
        //     );
        //     passwordInput = (
                {/*<Row>*/}
                    {/*<Col>*/}
                        {/*<Row className={'password-input'}>*/}
                            {/*<Col>*/}
                                {/*<Input type={ this.state.likePassword ? "password" : "text" }*/}
                                       {/*name="password"*/}
                                       {/*placeholder="Enter password"*/}
                                       {/*onChange={ ::this.handleChangeInput }*/}
                                       {/*onBlur={ ::this.handleFocusOut }*/}
                                       {/*invalid={ this.state.interacted.password && !!errors["password"] }*/}
                                {/*/>*/}
                                {/*{ this.state.interacted.password ? AccessForm.formateFormErrorFeedback("password", errors) : "" }*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                            {/*<Col>*/}
                                {/*<ToggleSwitcher label={ this.state.likePassword ? "Show password" : "Hide password"} onChange={::this.handleSwitcher}/>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
        //     );
        // }

        return (
            <Form id={id} className='create-order'>
                <Row className="main-form">
                    <Col>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Type</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input type="select" name="select">
                                        <option value="buy" >Buy</option>
                                        <option value="sell">Sell</option>
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Currency</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input type="select" name="select">
                                        <option value="fdsewffdfd32r3" >USD</option>
                                        <option value="fw4f3e5g5grgrge">CAD</option>
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Colection</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input type="select" name="select">
                                        <option value="sdffvfdvdvfdvd4fwf">Corn</option>
                                        <option value="us78sfndf78sd87fsd">Maize</option>
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Price</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input type="text" name="text"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><div className='form-text float-right'>Price - "Offer Only"</div></Col>
                                <Col xs={{ size: 8 }}>
                                    <CustomInput id="user[notify][when_c]" type="checkbox" className="cm-hidden-text checkbox" inline bsSize="lg" label="" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Quantity</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input text="select" name="text"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className='form-text label float-right'>Order Total</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input text="select" name="text"/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className='confirms'>
                    <Col>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. Standard Contract Terms.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput onChange={::this.handleChangeCheck} name="checkTermsAgreement" id="checkTermsAgreement" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} >
                                <div className="text-secondary success" >
                                    I have the legal authority to authorize payment of funds, and or to authorize or delivery of grains per contract above.
                                </div>
                            </Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput onChange={::this.handleChangeCheck} name="checkHaveLegalAuthority" id="checkHaveLegalAuthority" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to comply with XYZ Inc. grain inventory or Funds/Credit Verification Procedure.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput onChange={::this.handleChangeCheck} name="checkAgreeVerification" id="checkAgreeVerification" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. KYC Policy, and will satisfy all KYC requirements.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput onChange={::this.handleChangeCheck} name="checkPolicyAgreement" id="checkPolicyAgreement" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button disabled={!checksPassed} color={checksPassed ? "success" : "secondary"}>Submit</Button>
            </Form>
        );
    }
}

CreateOrderForm.propTypes = {
    id: PropTypes.string.isRequired
};

CreateOrderForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
};
