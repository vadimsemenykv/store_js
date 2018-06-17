import React from 'react';
import PropTypes from "prop-types";

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ToggleSwitcher.sass';

export default class ToggleSwitcher extends React.Component {
    render() {
        const label = this.props.label;
        const onChange = this.props.onChange;

        return (
            <div className="switch-wrapper">
                <label className="switch-toggler">
                    <input onChange={onChange} type="checkbox" />
                    <span className="slider round" />
                </label>
                <span className="switch-label">{ label }</span>
            </div>
        );
    }
}

ToggleSwitcher.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func
};