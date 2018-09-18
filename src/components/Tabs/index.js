import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from '../Tab';

class Tabs extends Component {
    static propTypes = {
        mainTabs: PropTypes.instanceOf(Array).isRequired,
        otherTabs: PropTypes.instanceOf(Array).isRequired,
        onTabClick: PropTypes.func.isRequired,
    };

    render() {
        const {mainTabs, otherTabs, onTabClick} = this.props;
        const {activeTab} = this.props;

        return (
            <div className="tabs">
                <ul className="tab-list" onClick={(e) => onTabClick(e)}>
                    {mainTabs.map( tabName => {
                        return (
                            <Tab activeTab={activeTab} key={tabName} tabName={tabName}/>
                        );
                    })}
                    {otherTabs.map( tabName => {
                        return (
                            <Tab activeTab={activeTab} key={tabName} tabName={tabName} />
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Tabs;