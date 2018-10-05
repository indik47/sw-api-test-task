import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab';
import './styles.css'

class Tabs extends Component {
    static propTypes = {
        mainTabs: PropTypes.instanceOf(Array).isRequired,
        otherTabs: PropTypes.instanceOf(Array).isRequired,
        visitedTabs: PropTypes.instanceOf(Array).isRequired,
        onTabClick: PropTypes.func.isRequired,
        activeTab: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    };

    render() {
        const {mainTabs, otherTabs, onTabClick, type, visitedTabs} = this.props;
        const icons = ["swg swg-sw-alt-2 swg-lg",
                       "swg swg-deathstar swg-lg",
                       "swg swg-atat swg-lg",
                       "swg swg-leia swg-lg",
                       "swg swg-akbar swg-lg",
                       "swg swg-falcon swg-lg"];

        return (
            <div className="tabs">

                <ul className="tab-list">
                    {mainTabs.map( (tabName, i) => {
                        return (
                            <Tab key={tabName}
                                 tabName={tabName}
                                 type={type}
                                 visitedTabs={visitedTabs}
                                 icon={icons[i]}
                                 onTabClick={onTabClick}/>
                        );
                    })}
                    {otherTabs.map( tabName => {
                        return (
                            <Tab key={tabName}
                                 tabName={tabName}
                                 visitedTabs={visitedTabs}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Tabs;