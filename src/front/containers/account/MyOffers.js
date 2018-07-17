/** Common */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/** Components */
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
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

        const receivedOffersTpl = listOffers.map((offer, index) => {
            if (offer.merchant === user._id.toString() && offer.status === 'active') {
                return <OfferItem key={index} offer={offer} user={user}/>;
            }
            return '';
        });
        const sentOffersTpl = listOffers.map((offer, index) => {
            if (offer.client === user._id.toString() && offer.status === 'active') {
                return <OfferItem key={index} offer={offer} user={user}/>;
            }
            return '';
        });
        const expiredDeclinedOffersTpl = listOffers.map((offer, index) => {
            if (offer.status !== 'active') {
                return <OfferItem key={index} offer={offer} user={user}/>;
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
                                </Card>
                                <Card>
                                    <CardHeader>My Sent Offers</CardHeader>
                                    <CardBody>
                                        {sentOffersTpl}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Expired, Declined, and Retracted Offers</CardHeader>
                                    <CardBody>
                                        {expiredDeclinedOffersTpl}
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

MyOffers.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    listOffers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listOffers: state.listOffers.list
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
