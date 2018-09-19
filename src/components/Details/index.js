import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';

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

        for (let key in details) {
            const value = details[key];

            //case when value is an array of URLs
            if (value instanceof Array){
                if (value.length === 0) { continue; }

                liArray.push(
                    <li key={key} className='details'>
                        <b>
                            {`${key}: `}
                        </b>
                        {(value[0] instanceof Object)
                                ?
                                value.map( (obj, i) =>
                                    <span key={i} data-id={i} data-entity={key} data-url={`${obj.url}`} onClick={(e) => this.onDetailsClick(e)}>
                                        {`${obj.title || obj.name}`}
                                    </span>)
                                :
                                //spinner fetching time
                                (<span className='sweet-loading'>
                                    <MoonLoader className='spinner' sizeUnit={"px"} size={10} color={'#65d5ae'} loading={true}/>
                                </span>)}
                    </li>
                )
            //case when value is simple key:value
            } else {
                liArray.push(
                    <li key={key}>
                        <b>{key}</b>
                        {`: ${value}`}
                    </li>
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