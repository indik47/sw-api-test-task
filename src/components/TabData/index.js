import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';
import Details from '../Details';

class TabData extends Component {
    static propTypes = {
        activeTab: PropTypes.string,
        data:  PropTypes.instanceOf(Array),
        details: PropTypes.instanceOf(Object) || PropTypes.instanceOf(Array),
        onDataClick: PropTypes.func.isRequired,
        saturateDetails: PropTypes.func.isRequired
    };

    onEntitiesClick(e, type) {
        e.preventDefault();
        const {onDataClick} = this.props;
        const clickedEntity = e.target.innerText;

        onDataClick(clickedEntity, type);
    }

    render() {
        const {activeTab, data, details, onDataClick, saturateDetails} = this.props;

        //details tab
        if ( activeTab === 'details') {
            return <Details activeTab={activeTab} details={details} onDataClick={onDataClick} saturateDetails={saturateDetails}/>
        }

        //spinner
        if (!data) {
            return (
                <div className='sweet-loading'>
                    <MoonLoader
                        className='spinner'
                        sizeUnit={"px"}
                        size={50}
                        color={'#65d5ae'}
                        loading={true}
                    />
                </div>);
        }

        //entities list
        if (data instanceof Array){
            return (
                <React.Fragment>
                    <label className='search__label' for="search">Search</label>
                    <input id='search' type="text"/>
                    <ul className="tabData" onClick={(e) => this.onEntitiesClick(e, activeTab)}>
                        {data.map( (item,index) => {
                            const value = item.name || item.title;
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                    <button id='sort'>sort</button>
                </React.Fragment>
            )
        }
    }
}
export default TabData