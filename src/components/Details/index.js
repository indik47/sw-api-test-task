import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItemSimple from "../ListItemSimple";
import ListItemDetails from "../ListItemDetails";
import './styles.css'

class Details extends Component {
  static propTypes = {
    details: PropTypes.instanceOf(Object).isRequired,
    closeDetails: PropTypes.func.isRequired,
    detailsClassName: PropTypes.string.isRequired,
  };

  DetailsTitle = () => {
    const {details, closeDetails} = this.props;

    return (
      <h3 className="details__title">
        {details.name || details.title}
        <button className="details__close-btn"
                onClick={closeDetails}/>
      </h3>
    )
  };

  onDetailsClick(e) {
    const {saturateDetails} = this.props;

    const entity = e.target.dataset.entity;
    const id = e.target.dataset.id;
    const data = this.props.details[entity][id];

    saturateDetails(data);
  }

  render() {
    const {details, detailsClassName} = this.props;
    const {DetailsTitle} = this;
    const detailsItems = [];

    for (const [key, value] of Object.entries(details)) {

      //case when value is an array of URLs or homeword (1 URL)
      if (value instanceof Array || key === 'homeworld') {
        if (value.length === 0) {
          continue;
        }  // skip empty entries in database

        detailsItems.push(<ListItemDetails key={key}
                                           keyStr={key}
                                           value={value}
                                           onDetailsClick={(e) => this.onDetailsClick(e)}/>)
      }
      //case when property is simple key:value
      else {
        detailsItems.push(<ListItemSimple key={key}
                                          keyStr={key}
                                          value={value}/>)
      }
    }

    return (
      <div className={detailsClassName}>
        <DetailsTitle/>
        <ul>{detailsItems}</ul>
      </div>
    )
  }
}

export default Details;