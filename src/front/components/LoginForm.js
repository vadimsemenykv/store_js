import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import PropTypes from "prop-types";

export default class LoginForm extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
        }).isRequired
    };

    render () {
        return (
            <Form>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        defaultValue={this.props.user.email}
                        placeholder="Enter login"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        defaultValue={this.props.user.password}
                        placeholder="Enter password"
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        );
    }
};