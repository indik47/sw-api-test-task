import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemSimple from "../ListItemSimple";
import ListItemDetails from "../ListItemDetails";

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
        const {details} = this.props;
        const liArray = [];

        for (const [key, value] of Object.entries(details) ) {

            //case when value is an array of URLs
            if (value instanceof Array){
                if (value.length === 0) { continue; }  // skip empty entries in database

                liArray.push(
                    <ListItemDetails key={key} keyStr={key} value={value} onDetailsClick={(e) => this.onDetailsClick(e)}/>
                )
            }
            //case when property is simple key:value
            else {
                    liArray.push(
                        <ListItemSimple key={key} keyStr={key} value={value}/>
                    )
                }
        }

        return (
            <ul>
                {liArray}
            </ul>
        )
    }
}

export default Details;