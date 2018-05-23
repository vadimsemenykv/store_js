import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from './parts/LoginForm';
import RegisterForm from './parts/RegisterForm';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component {
    render () {
        return <Container>
            <Row>
                <Col md={{ size: '7', offset: 1 }} sm={{ size: '12' }}><LoginForm/></Col>
                <Col md={{ size: '4' }} sm={{ size: '12' }}><LoginForm/>{/*<RegisterForm/>*/}</Col>
            </Row>
        </Container>
    }
};