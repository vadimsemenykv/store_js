/** Common */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import PropTypes from 'prop-types';
import validator from 'validator';
import DefaultForm from '../../forms/DefaultForm';

/** Components */
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    CustomInput,
    FormFeedback,
    Input,
    Label,
    Row
} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';

class CatalogOffersCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            data: {
                price: this.props.basedOnOffer ? this.props.basedOnOffer.price : this.props.order.price
            },
            interacted: {
                price: false
            }
        };
    }

    handleSubmit() {
        const url = '/api/catalog/offers/create';
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                offer: {
                    order: {_id: this.props.order._id},
                    price: this.state.data.price,
                    basedOnOffer: this.props.basedOnOffer ? this.props.basedOnOffer._id.toString() : null
                }
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    window.location.replace('/my/offers');
                } else {
                    console.log(response.error);
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

    validate() {
        let validators = CatalogOffersCreate.rules();
        return DefaultForm.validate({price: '' + this.state.data.price}, validators);
    }

    render() {
        const { header, footer, user, order } = this.props;
        const errors = this.validate();

        const oldPrice = this.props.basedOnOffer ? this.props.basedOnOffer.price : this.props.order.price;
        const price = this.state.data.price ? this.state.data.price : 0;
        const quantity = this.props.order.quantity;
        const totalPrice = !Number.isNaN(price * quantity) ? Math.round(price * quantity * 100) / 100 : 0;

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h4 className="content-title">Contract Form - Send Offer</h4>
                                <Card>
                                    <CardHeader>Offer Details</CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Order ID:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order._id.toString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Merchant User ID:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order.owner.toString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Client User ID:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{user._id.toString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Type:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order._type === 'buy' ? 'Buy' : 'Sell'}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Currency:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order.currency.title}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Collection:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order.categoryCollection.title}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Old Price:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{ oldPrice }</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">New Price:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{ price }</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Quantity:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{quantity}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Order total:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{ totalPrice }</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                I, Client ID: <span className={'font-weight-bold'}>{user._id.toString()}</span>,
                                                propose and offer a new price of,
                                                <Row>
                                                    <Col xs={{ size: 4 }}>
                                                        <Input
                                                            type="text" name="price"
                                                            onChange={ ::this.handleChangeInput }
                                                            onBlur={ ::this.handleFocusOut }
                                                            value={this.state.data.price}
                                                            invalid={ this.state.interacted.price && !!errors.price }
                                                        />
                                                        { this.state.interacted.price ? CatalogOffersCreate.formateFormErrorFeedback('price', errors) : '' }
                                                    </Col>
                                                </Row>
                                                per each 1 unit, of the quantity as stated above.
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                If my price is accepted by the Merchant ID: <span className={'font-weight-bold'}>{order.owner.toString()}</span>,
                                                I agree to enter, execute and fully settle the Order ID: {order._id.toString()} above,
                                                based on the new price specified in this Offer, and XYZ Inc. Standard Contract Terms.
                                            </Col>
                                        </Row>
                                        <Row className={'links'}>
                                            <Col>
                                                <Row>
                                                    <Col><a href={'#'} className={'info-link'}>Please read our Standard Contract Terms</a></Col>
                                                </Row>
                                                <Row>
                                                    <Col><a href={'#'} className={'info-link'}>Please read our Inventory and Credit Verification Policy</a></Col>
                                                </Row>
                                                <Row>
                                                    <Col><a href={'#'} className={'info-link'}>Please read our KYC Policy</a></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className={'confirms'}>
                                            <Col>
                                                <Row className="">
                                                    <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. Standard Contract Terms.</div></Col>
                                                    <Col xs={{ size: 3 }} >
                                                        <CustomInput name="checkTermsAgreement" id="checkTermsAgreement" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                This offer is valid for a standard duration of 24 Hours from the time this offer is sent.
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                This offer can be retracted by the Client above, within the 24 hour period, without giving any reason or cause.
                                            </Col>
                                        </Row>
                                        <Row className={'payment-description'}>
                                            <Col>
                                                <div>
                                                    As evidence of my legal binding, unconditional commitment to executing the contract above,
                                                    I agree to pay a non-refundable transaction fee of $50.00 CAD.
                                                </div>
                                                <div>
                                                    This payment serves as my legal signature and evidence to entering this contract.
                                                </div>
                                                <div>
                                                    <Button onClick={::this.handleSubmit} className={'float-right'} color={'success'}>Send Offer</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Footer links={footer} />
                </Col>
            </Row>
        );
    }
}

CatalogOffersCreate.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
    return '';
};

CatalogOffersCreate.rules = () => {
    return {
        price: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Price is required'
            },
            {
                rule: (value) => validator.isDecimal(value, { min: 1 }),
                message: 'Price must be a decimal'
            }
        ]
    };
};


function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        extraLinks: state.extraLinks,
        currencies: state.currencies,
        collections: state.collections,
        order: state.order,
        basedOnOffer: state.offer
    };
}

CatalogOffersCreate.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    basedOnOffer: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogOffersCreate);
