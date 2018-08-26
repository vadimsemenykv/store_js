/** Common */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../actions/UserActions';

/** Components */
import {Button, Card, CardBody, CardHeader, Col, Container, CustomInput, Label, Row} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import PropTypes from "prop-types";

class CatalogContractsCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    handleCancel() {
        fetch('/api/catalog/contracts/free-reservation', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                order: {_id: this.props.order._id}
            })
        })
            .then((response) => response.json())
            .then((response) => {
                window.location.replace('/catalog');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSubmit() {
        const url = '/api/catalog/contracts/create';
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                orderId: this.props.order._id
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    window.location.replace('/my/contracts');
                } else {
                    console.log(response.error);
                }
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { header, footer, user, order } = this.props;

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h4 className="content-title">Contract Form - Buy / Sell</h4>
                                <Card>
                                    <CardHeader>Contract Details</CardHeader>
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
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Price:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>${order.price}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Quantity:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>{order.quantity}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="label float-right">Order total:</Label></Col>
                                            <Col xs={{ size: 7, offset: 0 }}>${order.totalPrice}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                I, Client ID: <span className={'font-weight-bold'}>{user._id.toString()}</span>, agree to enter,
                                                execute and fully settle the Order ID: <span className={'font-weight-bold'}>{order._id.toString()}</span>,
                                                according to Price and Quantity as specified above by the Merchant ID: <span className={'font-weight-bold'}>{order.owner.toString()}</span>,
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
                                                {/* <Row className="">*/}
                                                {/* <Col xs={{ size: 9 }} >*/}
                                                {/* <div className="text-secondary success" >*/}
                                                {/* I have the legal authority to authorize payment of funds, and or to authorize or delivery of grains per contract above.*/}
                                                {/* </div>*/}
                                                {/* </Col>*/}
                                                {/* <Col xs={{ size: 3 }} >*/}
                                                {/* <CustomInput onChange={::this.handleChangeCheck} name="checkHaveLegalAuthority" id="checkHaveLegalAuthority" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />*/}
                                                {/* </Col>*/}
                                                {/* </Row>*/}
                                                {/* <Row className="">*/}
                                                {/* <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to comply with XYZ Inc. grain inventory or Funds/Credit Verification Procedure.</div></Col>*/}
                                                {/* <Col xs={{ size: 3 }} >*/}
                                                {/* <CustomInput onChange={::this.handleChangeCheck} name="checkAgreeVerification" id="checkAgreeVerification" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />*/}
                                                {/* </Col>*/}
                                                {/* </Row>*/}
                                                {/* <Row className="">*/}
                                                {/* <Col xs={{ size: 9 }} ><div className="text-secondary success" >I agree to the XYZ Inc. KYC Policy, and will satisfy all KYC requirements.</div></Col>*/}
                                                {/* <Col xs={{ size: 3 }} >*/}
                                                {/* <CustomInput onChange={::this.handleChangeCheck} name="checkPolicyAgreement" id="checkPolicyAgreement" type="checkbox" className="cm-hidden-text" inline bsSize="lg" label="" />*/}
                                                {/* </Col>*/}
                                                {/* </Row>*/}
                                            </Col>
                                        </Row>
                                        <Row className={'payment-description'}>
                                            <Col>
                                                <div className={'rules mb-4'}>
                                                    <div>
                                                        As evidence of my legal binding, unconditional commitment to executing the contract above,
                                                        I agree to pay a non-refundable transaction fee of $50.00 CAD.
                                                    </div>
                                                    <div>
                                                        This payment serves as my legal signature and evidence to entering this contract.
                                                    </div>
                                                </div>
                                                <div className={'action-buttons'}>
                                                    <Row className={'no-gutters'}>
                                                        <Col sm={{ size: 8 }} className={'mb-3'}>
                                                            <Button onClick={::this.handleCancel} className={'float-right'} color={'warning'}>Cancel</Button>
                                                        </Col>
                                                        <Col sm={{ size: 4 }}>
                                                            <Button onClick={::this.handleSubmit} className={'float-right'} color={'success'}>Create Contract</Button>
                                                        </Col>
                                                    </Row>
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
        order: state.order
    };
}

CatalogContractsCreate.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContractsCreate);
