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
import OrderItem from '../../components/account/OrderItem';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';

class MyContracts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        const { header, footer, user, listContracts } = this.props;
        const buyOrdersTpl = listContracts.map((item) => {
            if (item.status === 'active' && item._type === 'buy') {
                return <OrderItem key={item._id.toString()} order={item}/>;
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
                                {/*<Card>*/}
                                    {/*<CardHeader>Sell Orders</CardHeader>*/}
                                    {/*<CardBody>*/}
                                        {/*{sellOrdersTpl}*/}
                                    {/*</CardBody>*/}
                                {/*</Card>*/}
                                {/*<Card>*/}
                                    {/*<CardHeader>Deactivated Orders</CardHeader>*/}
                                    {/*<CardBody>*/}
                                        {/*{deactivatedOrdersTpl}*/}
                                    {/*</CardBody>*/}
                                {/*</Card>*/}
                            </Col>
                        </Row>
                    </Container>
                    <Footer links={footer} />
                </Col>
            </Row>
        );
    }
}

MyContracts.propTypes = {
    header: PropTypes.any.isRequired,
    footer: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    listContracts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        header: state.header,
        footer: state.footer,
        user: state.user,
        listContracts: state.listContracts
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyContracts);
