/** Common */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as OrderActions from '../../actions/OrderActions';

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
import OrderItem from '../../components/account/OrderItem';

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
        const { changeOrderStatus, changeOrder } = this.props.orderActions;

        const buyOrdersTpl = listOrders.map((item, index) => {
            if (item.status === 'active' && item._type === 'buy') {
                return <OrderItem key={index} order={item} changeStatus={changeOrderStatus} changeOrder={changeOrder}/>;
            }
            return '';
        });
        const sellOrdersTpl = listOrders.map((item, index) => {
            if (item.status === 'active' && item._type === 'sell') {
                return <OrderItem key={index} order={item} changeStatus={changeOrderStatus} changeOrder={changeOrder}/>;
            }
            return '';
        });
        const deactivatedOrdersTpl = listOrders.map((item, index) => {
            if (item.status === 'deactivated') {
                return <OrderItem key={index} order={item} changeStatus={changeOrderStatus} changeOrder={changeOrder}/>;
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
    listOrders: PropTypes.array.isRequired,
    orderActions: PropTypes.any,
    changedAt: PropTypes.string
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listOrders: state.listOrders.list,
        changedAt: state.listOrders.changedAt
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderActions: bindActionCreators(OrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
