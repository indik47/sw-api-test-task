import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Tab from '../Tab';
import DetailsTab from '../DetailsTab';

class Tabs extends Component {
    // static propTypes = {
    //     children: PropTypes.instanceOf(Array).isRequired,
    // }

        //
        // state = {
        //     activeTab: this.props.children[0].props.label,
        // };

    render() {
        const {mainTabs, otherTabs, onClickTabItem} = this.props;
        // const tabs = [...mainTabs, ...otherTabs];



        const {activeTab} = this.props;

        return (
            <div className="tabs">
                <ul className="tab-list" onClick={(e) => onClickTabItem(e)}>
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