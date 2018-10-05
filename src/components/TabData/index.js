import React, {Component} from 'react';
import Spinner from "../Spinner";
import PropTypes from 'prop-types';
import Details from '../Details';
import classNames from 'classnames'
import './styles.css';

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
    closeDetails: PropTypes.func.isRequired,
  };

  onEntitiesClick = e => {
    const {onDataClick} = this.props;
    const clickedEntity = e.target.innerText;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    onDataClick(clickedEntity);
  };

  TabDataItems = () => {
    const {data} = this.props;

    return (
      <ul className="tabData">
        {data.map((item, index) => {
          const value = item.name || item.title;
          return <li key={index} onClick={this.onEntitiesClick}>{value}</li>
        })}
      </ul>
    )
  };

  Utils = () => {
    const {isSorted, onSearchInput, onSortClick} = this.props;

    return (
      <div className='utils'>
        <input id='search' type="text" placeholder="Search.." onChange={(e) => onSearchInput(e)}/>
        <button id='sort' disabled={isSorted} onClick={(e) => onSortClick(e)}>Sort</button>
      </div>

    )
  };

  render() {
    const {activeTab, data, details, onDataClick, saturateDetails, closeDetails} = this.props;
    const {Utils, TabDataItems} = this;

    let entitiesClassName = classNames('entities-container', {[`full-width`]: activeTab !== 'details'});
    let detailsClassName = classNames('details-container', {[`full-width`]: activeTab === 'details'});

    //spinner while fetching data
    if (!data) {
      return <Spinner size={'big'}/>
    }

    return (
      <div className="main-inner">
        <div className={entitiesClassName}>

          <Utils/>
          <TabDataItems/>
        </div>

        {/*if details subtab is active */}
        {activeTab === 'details' ?
          <Details activeTab={activeTab}
                   details={details}
                   onDataClick={onDataClick}
                   saturateDetails={saturateDetails}
                   closeDetails={closeDetails}
                   detailsClassName={detailsClassName}/>
          : null
        }
      </div>
    )
  }
}

export default TabData