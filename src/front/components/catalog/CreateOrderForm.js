/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import DefaultForm from '../../forms/DefaultForm';

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

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/CreateOrderForm.sass';

export default class CreateOrderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clearStart: true,
            interacted: {},
            confirms: {},
            data: {
                type: 'buy'
            }
        };
    }

    collectData() {
        return {
            _type: this.state.data.type,
            currency: this.state.data.currency ? this.state.data.currency : '',
            categoryCollection: this.state.data.categoryCollection ? this.state.data.categoryCollection : '',
            offerOnly: !!this.state.data.offerOnly,
            price: this.state.data.offerOnly ? 0 : (this.state.data.price ? this.state.data.price : ''),
            quantity: this.state.data.quantity ? this.state.data.quantity : ''
        };
    }

    collectDataForValidation() {
        let data = this.collectData();
        delete data._type;
        delete data.offerOnly;
        if (this.state.data.offerOnly) {
            delete data.price;
        }
        return data;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (Object.getOwnPropertyNames(this.validate()).length > 0) {
            this.setState({
                interacted: {
                    currency: true,
                    categoryCollection: true,
                    price: true,
                    quantity: true
                },
                clearStart: false
            });
            return;
        }

        const url = '/api/catalog/orders/create';
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.collectData())
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    window.location.replace('/my/orders');
                } else {
                    this.setState({serverValidationError: response.validationErrors});
                }
            })
            .catch((error) => console.log(error));
    }

    handleChangeInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({data: {...this.state.data, [name]: value}, clearStart: false});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}, clearStart: false});
        this.forceUpdate();
    }

    handleChangeCheck(e) {
        const currentValue = !!this.state.confirms[e.target.name];
        this.setState({confirms: {...this.state.confirms, [e.target.name]: !currentValue}});
    }

    handleChangeCheckOfferOnly() {
        this.setState({data: {...this.state.data, offerOnly: !this.state.data.offerOnly}});
    }

    validate() {
        let validators = CreateOrderForm.rules();
        if (this.state.data.offerOnly) {
            delete validators.price;
        }
        return DefaultForm.validate(this.collectDataForValidation(), validators);
    }

    render() {
        const errors = this.state.clearStart ? [] : this.validate();
        const id = this.props.id;
        const checksPassed = Object.getOwnPropertyNames(this.state.confirms).length === 4;
        const price = this.state.data.price ? this.state.data.price : 0;
        const quantity = this.state.data.quantity ? this.state.data.quantity : 0;
        const totalPrice = !Number.isNaN(price * quantity) ? Math.round(price * quantity * 100) / 100 : 0;
        const offerOnly = this.state.data.offerOnly;

        const renderSelect = (options, inputName, placeHolder = 'Select', valueKey = '_id', labelKey = 'title') => {
            const optionsTpl = options.map((option, index) => {
                return <option key={index} value={option[valueKey]}>{option[labelKey]}</option>;
            });
            return (
                <Col xs={{ size: 8 }}>
                    <Input
                        type="select" name={inputName} defaultValue={''}
                        onChange={::this.handleChangeInput}
                        onBlur={::this.handleFocusOut}
                        invalid={ this.state.interacted[inputName] && !!errors[inputName] }
                    >
                        <option disabled value="">{placeHolder}</option>
                        {optionsTpl}
                    </Input>
                    { this.state.interacted[inputName] ? CreateOrderForm.formateFormErrorFeedback(inputName, errors) : '' }
                </Col>
            );
        };

        return (
            <Form id={id} className={'create-order'}>
                <Row className="main-form">
                    <Col>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className={'form-text label float-right'}>Type</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input
                                        type="select" name="type"
                                        onChange={ ::this.handleChangeInput }
                                        onBlur={ ::this.handleFocusOut }
                                    >
                                        <option value="buy" >Buy</option>
                                        <option value="sell">Sell</option>
                                    </Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className={'form-text label float-right'}>Currency</Label></Col>
                                {renderSelect(this.props.currencies, 'currency', 'Select currency')}
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className="form-text label float-right">Collection</Label></Col>
                                {renderSelect(this.props.collections, 'categoryCollection', 'Select grain collection')}
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className="form-text label float-right">Price</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input
                                        type="text" name="price" disabled={offerOnly}
                                        onChange={ ::this.handleChangeInput }
                                        onBlur={ ::this.handleFocusOut }
                                        invalid={ this.state.interacted.price && !!errors.price }
                                    />
                                    { this.state.interacted.price ? CreateOrderForm.formateFormErrorFeedback('price', errors) : '' }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><div className="form-text float-right">Price - "Offer Only"</div></Col>
                                <Col xs={{ size: 8 }}>
                                    <CustomInput
                                        id="offerOnly" type="checkbox" className="cm-hidden-text checkbox" inline bsSize="lg" label=""
                                        name="offerOnly"
                                        onChange={::this.handleChangeCheckOfferOnly}/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className="form-text label float-right">Quantity</Label></Col>
                                <Col xs={{ size: 8 }}>
                                    <Input text="select" name="quantity"
                                        onChange={ ::this.handleChangeInput }
                                        onBlur={ ::this.handleFocusOut }
                                        invalid={ this.state.interacted.quantity && !!errors.quantity }
                                    />
                                    { this.state.interacted.quantity ? CreateOrderForm.formateFormErrorFeedback('quantity', errors) : '' }
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs={{ size: 4 }}><Label className="form-text label float-right">Order Total</Label></Col>
                                <Col xs={{ size: 8 }} className={'total-value'}>
                                    {offerOnly ? '' : totalPrice}
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="confirms">
                    <Col>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. Standard Contract Terms.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput
                                    onChange={::this.handleChangeCheck} name="checkTermsAgreement" id="checkTermsAgreement"
                                    type="checkbox" className="cm-hidden-text" inline bsSize="lg" label=""
                                />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} >
                                <div className="text-secondary success" >
                                    I have the legal authority to authorize payment of funds, and or to authorize or delivery of grains per contract above.
                                </div>
                            </Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput
                                    onChange={::this.handleChangeCheck} name="checkHaveLegalAuthority" id="checkHaveLegalAuthority"
                                    type="checkbox" className="cm-hidden-text" inline bsSize="lg" label=""
                                />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to comply with XYZ Inc. grain inventory or Funds/Credit Verification Procedure.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput
                                    onChange={::this.handleChangeCheck} name="checkAgreeVerification" id="checkAgreeVerification"
                                    type="checkbox" className="cm-hidden-text" inline bsSize="lg" label=""
                                />
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. KYC Policy, and will satisfy all KYC requirements.</div></Col>
                            <Col xs={{ size: 3 }} >
                                <CustomInput
                                    onChange={::this.handleChangeCheck} name="checkPolicyAgreement" id="checkPolicyAgreement"
                                    type="checkbox" className="cm-hidden-text" inline bsSize="lg" label=""
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Button onClick={::this.handleSubmit} disabled={!checksPassed} color={checksPassed ? 'success' : 'secondary'}>Submit</Button>
            </Form>
        );
    }
}

CreateOrderForm.propTypes = {
    id: PropTypes.string.isRequired,
    currencies: PropTypes.array.isRequired,
    collections: PropTypes.array.isRequired
};

CreateOrderForm.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
    return '';
};

CreateOrderForm.rules = () => {
    return {
        _type: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Select type'
            }
        ],
        currency: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Select currency'
            }
        ],
        categoryCollection: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Select collection'
            }
        ],
        price: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Price is required'
            },
            {
                rule: (value) => validator.isDecimal(value, { min: 1 }),
                message: 'Price must be a decimal'
            }
        ],
        quantity: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Quantity is required'
            },
            {
                rule: (value) => validator.isInt(value, { min: 1 }),
                message: 'Quantity must be an integer and must be grater or equal 1'
            }
        ]
    };
};
