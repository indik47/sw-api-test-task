import React, { Component } from 'react';
import ClipLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';


class TabData extends Component {

    static propTypes = {
        data: PropTypes.instanceOf(Array),
    };

    render() {
        const {data} = this.props;

        if (!data) {
            return (
                <div className='sweet-loading'>
                    <ClipLoader
                        className='spinner'
                        sizeUnit={"px"}
                        size={50}
                        color={'#65d5ae'}
                        loading={true}
                    />
                </div>);
        }

        if (data){
            return (
                <ul className="tabData">
                    {data.map( (item,index) => {
                        const value = item.name || item.title;
                        return <li key={index}>{value}</li>
                    })}
                </ul>
            )}
    }
}
export default TabData