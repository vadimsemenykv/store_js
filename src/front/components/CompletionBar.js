/** Common */
import React, { Component } from 'react';
import PropTypes from "prop-types";

/** Components */
import { Progress } from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CompletionBar.sass';

export default class CompletionBar extends Component {
    render () {
        const valueText = this.props.customValueText
            ? this.props.customValueText
            : `${this.props.doneValue}/${this.props.maxValue} Complete`;
        return (
            <div className={'bar-wrapper'}>
                <div className={'value text-center'}><div>{ valueText }</div></div>
                <Progress multi>
                    <Progress
                        bar color="success"
                        value={ this.props.doneValue }
                        max={ this.props.maxValue }
                    />
                    <Progress
                        bar color="warning"
                        value={ this.props.doneValue ? this.props.maxValue - this.props.doneValue : 0 }
                        max={ this.props.maxValue }
                    />
                    <Progress
                        bar color="danger"
                        value={ this.props.doneValue > 0 ? 0 : this.props.maxValue }
                        max={ this.props.maxValue }
                    />
                </Progress>
            </div>
        );
    }
}

CompletionBar.propTypes = {
    customValueText: PropTypes.string,
    maxValue: PropTypes.number.isRequired,
    doneValue: PropTypes.number.isRequired
};