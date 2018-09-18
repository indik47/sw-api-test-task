import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';
import {fetchUrls} from '../../utils'

class Details extends Component {
    static propTypes = {
        details: PropTypes.instanceOf(Object).isRequired,
    };

    state = {
        details: this.props.details
    };

    componentWillReceiveProps(){
        this.setState({
            details: this.props.details
        })
    }

    onDetailsClick(e) {
        const {saturateDetails} = this.props;
        const url = e.target.dataset.url;

        fetchUrls([url])
            .then(data => {
                saturateDetails(data[0]);
            })
    }

    render() {
        const {details} = this.state;

        const liArray = [];

        for (let key in details) {
            const value = details[key];

            if (value instanceof Array){
                liArray.push(
                    <li key={key} className='details'>
                        <b>{`${key}: `}</b>
                        {(value[0] instanceof Object)
                                ?
                                value.map( (obj, i) =>
                                    <span key={i} data-url={`${obj.url}`} onClick={(e) => this.onDetailsClick(e)}>
                                        {`${obj.title || obj.name}`}
                                        <span className={'whitespace'}> </span>
                                    </span>)
                                :
                                (<span className='sweet-loading'>
                                    <MoonLoader className='spinner' sizeUnit={"px"} size={10} color={'#65d5ae'} loading={true}/>
                                </span>)}
                    </li>
                )

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