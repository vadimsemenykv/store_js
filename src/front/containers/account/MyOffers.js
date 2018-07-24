/** Common */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as OfferActions from '../../actions/OfferActions';

/** Components */
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader, CardFooter
} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import OfferItem from '../../components/account/OfferItem';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';

class MyOffers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, listOffers } = this.props;
        const { startAcceptingOffer, declineOffer, declineAndProposeNewOffer } = this.props.offerActions;

        const renderOfferItem = (index, offer, user, declineOffer, startAcceptingOffer, declineAndProposeNewOffer) => {
            return (
                <OfferItem
                    key={index} offer={offer} user={user}
                    declineFunc={declineOffer}
                    acceptFunc={startAcceptingOffer}
                    declineAndProposeNewFunc={declineAndProposeNewOffer}
                />
            );
        };

        const receivedOffersTpl = listOffers.map((offer, index) => {
            if (offer.merchant.toString() === user._id.toString() && offer.status === 'active') {
                return renderOfferItem(index, offer, user, declineOffer, startAcceptingOffer, declineAndProposeNewOffer);
            }
            return '';
        });
        const sentOffersTpl = listOffers.map((offer, index) => {
            if (offer.client.toString() === user._id.toString() && offer.status === 'active') {
                return renderOfferItem(index, offer, user, declineOffer, startAcceptingOffer, declineAndProposeNewOffer);
            }
            return '';
        });
        const expiredDeclinedOffersTpl = listOffers.map((offer, index) => {
            if (offer.status !== 'active') {
                return renderOfferItem(index, offer, user, declineOffer, startAcceptingOffer, declineAndProposeNewOffer);
            }
            return '';
        });

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col
                                lg={{ size: '8', offset: 1 }} md={{ size: '12' }}
                                className="cm-bordered cm-content content"
                            >
                                <h4 className={'content-title'}>My Offers</h4>
                                <Card>
                                    <CardHeader>My Received Offers</CardHeader>
                                    <CardBody>
                                        {receivedOffersTpl}
                                    </CardBody>
                                    <CardFooter className={'text-secondary'}>
                                        This dashboard shows all of the Offers that you received from Clients,
                                        with an offer of a new price. Using the offers platform, only price can be offered, not the quantity.
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>My Sent Offers</CardHeader>
                                    <CardBody>
                                        {sentOffersTpl}
                                    </CardBody>
                                    <CardFooter className={'text-secondary'}>
                                        This dashboard shows all of the Offers that you sent to Merchants, offering them a new price.
                                    </CardFooter>
                                </Card>
                                <Card>
                                    <CardHeader>Expired, Declined, and Retracted Offers</CardHeader>
                                    <CardBody>
                                        {expiredDeclinedOffersTpl}
                                    </CardBody>
                                    <CardFooter className={'text-secondary'}>
                                        This dashboard shows all of the Offers that Expired, Declined or Retracted.
                                    </CardFooter>
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

MyOffers.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    listOffers: PropTypes.array.isRequired,
    offerActions: PropTypes.any,
    changedAt: PropTypes.string
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listOffers: state.listOffers.list,
        changedAt: state.listOffers.changedAt
    };
}

function mapDispatchToProps(dispatch) {
    return {
        offerActions: bindActionCreators(OfferActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
