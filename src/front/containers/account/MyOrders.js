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
import CatalogItem from '../../components/catalog/CatalogItem';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';

class MyOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, listOrders } = this.props;
        const buyOrdersTpl = listOrders.buy.map((item) => <CatalogItem key={item._id.toString()} order={item}/>);
        const sellOrdersTpl = listOrders.sell.map((item) => <CatalogItem key={item._id.toString()} order={item}/>);
        const deactivatedOrdersTpl = listOrders.deactivated.map((item) => <CatalogItem key={item._id.toString()} order={item}/>);

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
                                <h4 className={'content-title'}>My Orders</h4>
                                <Card>
                                    <CardHeader>Buy Orders</CardHeader>
                                    <CardBody>
                                        {buyOrdersTpl}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Sell Orders</CardHeader>
                                    <CardBody>
                                        {sellOrdersTpl}
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Deactivated Orders</CardHeader>
                                    <CardBody>
                                        {deactivatedOrdersTpl}
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

MyOrders.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    listOrders: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listOrders: state.listOrders
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
