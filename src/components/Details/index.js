import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemSimple from "../ListItemSimple";
import ListItemDetails from "../ListItemDetails";
import './styles.css'

class Details extends Component {
    static propTypes = {
        details: PropTypes.instanceOf(Object).isRequired,
    };

    onDetailsClick(e) {
        const {saturateDetails} = this.props;

        const entity = e.target.dataset.entity;
        const id = e.target.dataset.id;
        const data = this.props.details[entity][id];

        saturateDetails(data);
    }

    render() {
        const {details, closeDetails, detailsClassName} = this.props;
        const liArray = [];

        for (const [key, value] of Object.entries(details)) {
            //case when value is an array of URLs
        // || value.includes('http')) && !(key === 'url')
            if ( value instanceof Array || key === 'homeworld' ){
                // skip empty entries in database
                if (value.length === 0) { continue; }

                liArray.push(
                    <ListItemDetails key={key}
                                     keyStr={key}
                                     value={value}
                                     onDetailsClick={(e) => this.onDetailsClick(e)}/>
                )
            }
            //case when property is simple key:value
            else {
                liArray.push(
                    <ListItemSimple key={key}
                                    keyStr={key}
                                    value={value}/>
                )
            }
        }

        return (
            <div className={detailsClassName}>
                <h3 className="details__title" >
                        {details.name || details.title}
                        <button className="details__close-btn"
                                onClick={closeDetails}/>

                </h3>
                <ul>
                    {liArray}
                </ul>
            </div>
        )}
}

export default Details;