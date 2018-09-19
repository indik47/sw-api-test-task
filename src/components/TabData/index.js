import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';
import Details from '../Details';

class TabData extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        data: PropTypes.instanceOf(Array),
        isSorted: PropTypes.bool.isRequired,
        details: PropTypes.instanceOf(Object) || PropTypes.instanceOf(Array),
        onDataClick: PropTypes.func.isRequired,
        saturateDetails: PropTypes.func.isRequired,
        onSearchInput: PropTypes.func.isRequired,
        onSortClick: PropTypes.func.isRequired,
    };

    onEntitiesClick(e, type) {
        const {onDataClick} = this.props;
        const clickedEntity = e.target.innerText;

        onDataClick(clickedEntity, type);
    }

    render() {
        const {activeTab, data, isSorted, details, onDataClick, saturateDetails, onSearchInput, onSortClick} = this.props;
        //
        // //details tab
        // if ( activeTab === 'details') {
        //     return <Details activeTab={activeTab} details={details} onDataClick={onDataClick} saturateDetails={saturateDetails}/>
        // }

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
                    <input id='search' type="text" onChange={(e) => onSearchInput(e)}/>
                    <ul className="tabData" onClick={(e) => this.onEntitiesClick(e, activeTab)}>
                        {data.map( (item,index) => {
                            const value = item.name || item.title;
                            return <li key={index}>{value}</li>
                        })}
                    </ul>
                    <button id='sort' onClick={onSortClick}> {isSorted ? `Unsort` : `Sort`} </button>

                    {/*//details tab*/}
                    {/*if ( activeTab === 'details')*/}
                    {(activeTab === 'details') ?
                    // {
                    <Details activeTab={activeTab} details={details} onDataClick={onDataClick} saturateDetails={saturateDetails}/>
                    // }
                    : <div/>}
                </React.Fragment>
            )
        }
    }
}
export default TabData