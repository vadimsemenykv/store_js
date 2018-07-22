/** Common */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import PropTypes from 'prop-types';

/** Components */
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    CustomInput,
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

class CatalogOffersAccept extends Component {
    handleSubmit() {
        fetch('/api/catalog/offers/accept', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({offer: {id: this.props.offer._id}})
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    window.location.replace('/my/contracts');
                } else {
                    //TODO show modal
                    console.log(response.error);
                }
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { header, footer, user, offer } = this.props;
        // const errors = this.validate();
        //
        // const price = this.state.data.price ? this.state.data.price : 0;
        // const quantity = this.props.order.quantity;
        // const totalPrice = !Number.isNaN(price * quantity) ? Math.round(price * quantity * 100) / 100 : 0;

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h4 className="content-title">Contract Form - Accept Offer</h4>
                                <Card>
                                    <CardHeader>Offer Details</CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Order ID:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.order._id.toString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Merchant User ID:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.client.toString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Type:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.order._type === 'buy' ? 'Buy' : 'Sell'}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Currency:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.order.currency.title}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Collection:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.order.categoryCollection.title}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Price:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.price}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Quantity:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.quantity}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Offer total:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{offer.totalPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                I, Client ID: <span className={'font-weight-bold'}>{offer.merchant.toString()}</span>,
                                                agree to enter, execute and fully settle the Order ID: <span className={'font-weight-bold'}>{offer.order._id.toString()}</span>,
                                                according to Price and Quantity as specified above by the Merchant ID: <span className={'font-weight-bold'}>{offer.client.toString()}</span>,
                                                based on the XYZ Inc. Standard Contract Terms.
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
                                                    <Button onClick={::this.handleSubmit} className={'float-right'} color={'success'}>Create Contract</Button>
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

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        extraLinks: state.extraLinks,
        currencies: state.currencies,
        collections: state.collections,
        offer: state.offer
    };
}

CatalogOffersAccept.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogOffersAccept);
