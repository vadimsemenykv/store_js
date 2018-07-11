/** Common */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/** Components */
import {Card, CardBody, CardHeader, CardTitle, Col, Container, Row} from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SideMenu from '../../components/SideMenu';
import CreateOrderForm from '../../components/catalog/CreateOrderForm';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/CatalogCreate.sass';


class CatalogOrdersCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, currencies, collections } = this.props;

        return (
            <Row className="gray-container">
                <Col>
                    <Header user={user} topLinks={header.top} bottomLinks={header.bottom} />
                    <Container className="cm-container wrapper">
                        <Row>
                            <SideMenu/>
                            <Col lg={{ size: '8', offset: 1 }} md={{ size: '12' }} className="cm-bordered cm-content content" >
                                <h4 className="content-title">Create New Buy / Sell Order</h4>
                                <Card>
                                    <CardHeader>Create New Order</CardHeader>
                                    <CardBody>
                                        <CardTitle tag="h6">Please follow our instructions to Create a New Market Order:</CardTitle>
                                        <Row>
                                            <Col className="text-secondary form-description pad-free">
                                                Using this form you are able to create a New Buy Sell Order,
                                                that will be posted to the OTC Order Book.
                                                Your Order will be filled by a Client agreeing to your price,
                                                or through our Offer process, where Clients have an opportunity to send you an Offer,
                                                at which point in turn,
                                                you would to accept or decline the offer.
                                                Acceptance of the Offer results in a binding Contract between the Merchant and the Client.
                                                A binding Contract also is created when a Client accepts your price outright, as is.
                                                When a Contract is created, the Order is removed from the Order Book.
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pad-free">
                                                <CreateOrderForm
                                                    id="create-order"
                                                    currencies={currencies}
                                                    collections={collections}
                                                />
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

CatalogOrdersCreate.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    collections: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        extraLinks: state.extraLinks,
        currencies: state.currencies,
        collections: state.collections
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogOrdersCreate);
