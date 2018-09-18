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
        const {onDataClick} = this.props;
        const clickedEntity = e.target.innerText;

        console.log(type)
        console.log(clickedEntity)

        onDataClick(clickedEntity, type);
    }

    render() {
        const {activeTab, data, details, onDataClick, saturateDetails} = this.props;

        //for details tab
        if ( activeTab === 'details') {
            return <Details entitiesType={activeTab} details={details} onDataClick={onDataClick} saturateDetails={saturateDetails}/>
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

        //for entities list
        if (data instanceof Array){
            return (
                <ul className="tabData" onClick={(e) => this.onEntitiesClick(e, activeTab)}>
                    {data.map( (item,index) => {
                        const value = item.name || item.title;
                        return <li key={index}>{value}</li>
                    })}
                </ul>
            )
        }
    }
}
export default TabData