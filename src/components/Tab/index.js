import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        tabName: PropTypes.string.isRequired,
    };

    render() {
        const { props: { activeTab, tabName, }, } = this;

        let className = 'tab-list-item';

        if (activeTab === tabName) {
            className += ' tab-list-active';
        }

        return (
            <li className={className} >
                {tabName}
            </li>
        );
    }
}

export default Tab;