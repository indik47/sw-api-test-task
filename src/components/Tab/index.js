import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../fonts/starwars-glyphicons/css/starwars-glyphicons.css'


class Tab extends Component {
    static propTypes = {
        tabName: PropTypes.string.isRequired,
        type: PropTypes.string,
        visitedTabs: PropTypes.instanceOf(Array),
    };

    render() {
        const { tabName, type, visitedTabs, icon, onTabClick } = this.props;

        let className = 'tab-list-item';

        if (type === tabName) {
            className += ' tab-list-active';
        }

        if (visitedTabs.includes(tabName)) {
            className += ' visited';
        }

        return (
            <li className={className} onClick={(e) => onTabClick(e)}>
                <i className={icon}/>
                {tabName}
            </li>
        );
    }
}

export default Tab;