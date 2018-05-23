import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        // this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }
    //
    // getValidationState() {
    //     const length = this.state.value.length;
    //     if (length > 10) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }
    //
    // handleChange(e) {
    //     this.setState({ value: e.target.value });
    // }

    render () {
        return (
            <Form>
                <FormGroup>
                    <Label>Login</Label>
                    <Input
                        type="email"
                        // value={this.state.value}
                        placeholder="Enter login"
                        // onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        // value={this.state.value}
                        placeholder="Enter password"
                        // onChange={this.handleChange}
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        );
    }
};